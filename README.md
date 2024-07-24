# phaser-game

This is my opinionated TypeScript project template. It uses [Vite](https://vitejs.dev/) as a build tool, and configures some helpful external tools and GitHub workflows (see below)

## Scripts

- `yarn dev` - Start dev server
- `yarn build` - Build production bundle
- `yarn preview` - Locally preview the production build
- `yarn typecheck` - Check type correctness
- `yarn format` - Format with [Prettier](https://prettier.io/)
- `yarn lint` - Lint JS with [ESLint](https://eslint.org/) and TS with [typescript-eslint](https://typescript-eslint.io/)
- `yarn lint:style` - Lint CSS with [Stylelint](https://stylelint.io/)

Last four scripts run automatically on every commit using [Husky](https://typicode.github.io/husky/)

## Workflows

- `.github/workflows/init.yml` - When creating new repository from this template, it replaces `phaser-game` with the new repository's name.
- `.github/workflows/sync.yml` - When there are new changes to this template, it automatically creates a PR to merge them into all repositories created from this template

**NOTE**: By default GitHub Actions are not allowed to create PRs. To enable this, go to `Settings > Actions > General > Allow GitHub Actions to create and approve pull requests`
