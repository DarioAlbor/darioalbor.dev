/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = { title: `404 — ${site.name}` };

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <p className="site-name">
          <a href="/">{site.name}</a>
        </p>
        <hr />
        <h1>404</h1>
        <p>There&apos;s nothing at this address. · No hay nada en esta dirección.</p>
        <p>
          <a href="/en/" hrefLang="en">Home</a> · <a href="/es/" hrefLang="es">Inicio</a>
        </p>
      </body>
    </html>
  );
}
