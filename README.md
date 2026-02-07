# Guide Rsync

Documentation interactive et complète pour **rsync**, construite avec React, TypeScript et Tailwind CSS.

## Structure du Projet

```
rsync/
├── src/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── IntroSection.tsx
│   │   │   ├── InstallSection.tsx
│   │   │   ├── BasicUsageSection.tsx
│   │   │   ├── AdvancedSection.tsx
│   │   │   ├── RemoteSection.tsx
│   │   │   ├── AutomationSection.tsx
│   │   │   └── TroubleshootSection.tsx
│   │   ├── Badge.tsx
│   │   ├── CodeBlock.tsx
│   │   └── Layout.tsx
│   ├── index.tsx (Application principale)
│   ├── main.tsx (Point d'entrée)
│   └── index.css (Styles Tailwind)
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

L'application sera accessible sur `http://127.0.0.1:5173`

## Build

```bash
npm run build
```

## Fonctionnalités

- ✅ Architecture modulaire TypeScript
- ✅ Composants React réutilisables
- ✅ Thème sombre/clair
- ✅ Navigation responsive
- ✅ Copie de code en un clic
- ✅ Design moderne avec Tailwind CSS

## Sections

1. **Introduction** — Présentation de rsync, algorithme delta, cas d'usage
2. **Installation** — Guide multi-distribution (Debian, RHEL, Arch, macOS, WSL)
3. **Utilisation de base** — Syntaxe, options essentielles, trailing slash, exemples concrets
4. **Options avancées** — Filtrage, --delete, --backup, --link-dest, compression, checksum, bwlimit
5. **Transferts distants** — Mode SSH, clés SSH, mode daemon rsync, rsyncd.conf, comparatif SSH vs daemon
6. **Automatisation** — Cron, systemd timer, script de backup incrémental complet, logrotate
7. **Troubleshooting** — Dry-run, verbosité, erreurs courantes, optimisation, codes de sortie

## Technologies

- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS 3
- Lucide React (icônes)
