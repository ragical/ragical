# Ragical

This is the Ragical web accessibility [turborepo](https://turbo.build).

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `ragical-docs`: a [Next.js](https://nextjs.org/) app
- `ragical-web`: another [Next.js](https://nextjs.org/) app
- `ragical-crawler`: gRPC [crawler](https://github.com/a11ywatch/crawler) in Rust tuned for performance
- `ragical-access`: gRPC [accessibility](https://github.com/ragical/ragical-intel) service
- `ragical-core`: API [core](https://github.com/ragical/ragical-core) and entrypoint to Ragical
- `ragical-intel`: gRPC [AI](https://github.com/ragical/ragical-intel) service for alt tags and etc

- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```sh
pnpm run dev
# open http://localhost:3000/ in your browser
```