# Repository Guidelines

## Project Structure & Module Organization
- `core/`: Framework-agnostic utilities. Entrypoint `core/mod.ts` re-exports from `core/common/features/*`.
- `solid/`: Solid-specific components and stores (`features/*/{components,store}.ts[x]`). Public API via `solid/index.ts` and `solid/mod.ts`.
- `vue/`: Vue-specific components and stores mirroring Solid structure, exported via `vue/index.ts` and `vue/mod.ts`.
- `__tests__/`: Bun test files (`*.test.js`) targeting the exported TypeScript modules.
- Config: `package.json`, `jsr.json` (publish config), `biome.json` (lint/format), CI in `.github/workflows/`.

## Build, Test, and Development Commands
- Install: `bun install --no-save`
- Test: `bun test` (all tests), `bun test --coverage` (prints coverage)
- Lint: `bun run lint` (Biome check)
- Format: `bun run format` (Biome write)
- JSR dry-run: `bun run jsr:check`
Notes: Scripts assume Bun. CI enforces coverage; local failures should be fixed before PRs.

## Coding Style & Naming Conventions
- Language: TypeScript (+ TSX for components). ESM only (`type: module`).
- Formatting: Biome with single quotes and recommended rules; run before pushing.
- Files: Components `PascalCase.tsx` under `features/*/components/`. Stores/utilities in `store.ts`/`utils.ts`.
- Exports: Keep `core/mod.ts`, `solid/index.ts`, and `vue/index.ts` updated when adding modules.

## Testing Guidelines
- Runner: Bun test. Place specs in `__tests__/` as `*.test.js` (import from `core/mod.ts`, `solid`, `vue`).
- Coverage: CI requires ≥ 90% (see CI workflow). Prefer small, deterministic tests.
- Naming: `describe` blocks per feature; test observable behavior across public APIs.

## Commit & Pull Request Guidelines
- Commits: Imperative present; include scope where helpful.
  - Example: `feat(core): add deepFreeze safety for non-objects`
- PRs: Clear description, linked issue, and screenshots for UI changes. Note API changes in `README.md`/`MIGRATION.md`.
- Checks: PRs must pass Biome, tests, and coverage. Run `bun test --coverage` locally first.

## Security & Configuration Tips
- Do not commit secrets. Publishing requires `JSR_TOKEN` in GitHub Secrets.
- Respect peer deps (`solid-js`, `vue`, `dayjs`) and avoid importing framework internals in `core/`.
- For Vue TSX usage, enable `@vitejs/plugin-vue-jsx` as described in `README.md`.

