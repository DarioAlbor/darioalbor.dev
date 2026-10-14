# darioalbor.dev

Personal site and blog of Darío Albor. Live at [darioalbor.dev](https://darioalbor.dev).

Static [Next.js](https://nextjs.org) export, in English and Spanish.

## Development

```bash
npm install
npm run dev
```

## Writing a post

Add a Markdown file to `content/posts/en/` and/or `content/posts/es/` using the same file name in both languages:

```md
---
title: Hello, world
date: 2026-10-14
summary: "One line about the post."
draft: true
---
```

Drafts show up in `npm run dev` and are left out of the build.

## Content

- `content/i18n.ts`: interface text for each language
- `content/cv.ts`: CV, work experience and skills
- `content/site.ts`: name, URL and links

## Deploy

Every push to `main` builds the site and uploads `out/` to the server over SFTP (`.github/workflows/deploy.yml`).
