<?php

declare(strict_types=1);

const RECIPIENTS = ['es' => 'hola@darioalbor.dev', 'en' => 'hi@darioalbor.dev'];
const MIN_SECONDS = 3;
const RATE_LIMIT_SECONDS = 60;

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function finish(int $status, bool $ok, string $lang): never
{
    global $wantsJson;
    if ($wantsJson) {
        http_response_code($status);
        header('Content-Type: application/json');
        echo json_encode(['ok' => $ok]);
    } else {
        header('Location: /' . $lang . '/contact/?' . ($ok ? 'sent=1' : 'error=1'), true, 303);
    }
    exit;
}

function turnstileOk(string $token, string $ip): bool
{
    $secretFile = dirname(__DIR__, 2) . '/private/turnstile-secret';
    if ($token === '' || !is_readable($secretFile)) {
        return false;
    }
    $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'secret' => trim((string)file_get_contents($secretFile)),
            'response' => $token,
            'remoteip' => $ip,
        ]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
    ]);
    $result = json_decode((string)curl_exec($ch), true);
    curl_close($ch);
    return is_array($result) && ($result['success'] ?? false) === true
        && ($result['hostname'] ?? '') === 'darioalbor.dev';
}

$lang = ($_POST['lang'] ?? '') === 'en' ? 'en' : 'es';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    finish(405, false, $lang);
}

$startedAt = (int)($_POST['t'] ?? 0);
if (($_POST['website'] ?? '') !== '' || $startedAt <= 0 || (time() * 1000 - $startedAt) < MIN_SECONDS * 1000) {
    finish(200, true, $lang);
}

$clean = fn(string $s): string => trim(str_replace(["\r", "\n", "\0"], ' ', $s));
$name = mb_substr($clean((string)($_POST['name'] ?? '')), 0, 100);
$email = mb_substr($clean((string)($_POST['email'] ?? '')), 0, 200);
$message = mb_substr(trim(str_replace("\0", '', (string)($_POST['message'] ?? ''))), 0, 5000);

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    finish(422, false, $lang);
}

$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';

if (!turnstileOk((string)($_POST['cf-turnstile-response'] ?? ''), $ip)) {
    finish(403, false, $lang);
}
$stamp = sys_get_temp_dir() . '/darioalbor-contact-' . hash('sha256', $ip);
if (is_file($stamp) && time() - (int)filemtime($stamp) < RATE_LIMIT_SECONDS) {
    finish(429, false, $lang);
}
touch($stamp);

$to = RECIPIENTS[$lang];
$subject = mb_encode_mimeheader('[darioalbor.dev] Mensaje de ' . $name, 'UTF-8');
$body = "Nombre: {$name}\nCorreo: {$email}\nIdioma: {$lang}\nIP: {$ip}\n\n{$message}\n";
$headers = implode("\r\n", [
    'From: darioalbor.dev <' . $to . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$sent = mail($to, $subject, $body, $headers, '-f' . $email);
finish($sent ? 200 : 500, $sent, $lang);
