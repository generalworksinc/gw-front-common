# リポジトリ運用ガイドライン

## プロジェクト構成とモジュール
- `core/`: フレームワーク非依存のユーティリティ。入口は `core/mod.ts`（`core/common/features/*` を再エクスポート）。
- `solid/`: Solid 向けのコンポーネント/ストア（`features/*/{components,store}.ts[x]`）。公開 API は `solid/index.ts` と `solid/mod.ts`。
- `vue/`: Vue 向けのコンポーネント/ストア（Solid と同構成）。`vue/index.ts` と `vue/mod.ts` から公開。
- `__tests__/`: Bun のテスト（`*.test.js`）。公開された TS モジュールを対象にします。
- 設定: `package.json`、`jsr.json`（公開設定）、`biome.json`（整形/静的解析）、CI は `.github/workflows/`。

## ビルド・テスト・開発コマンド
- インストール: `bun install --no-save`
- テスト: `bun test`（全テスト）、`bun test --coverage`（カバレッジ出力）
- Lint: `bun run lint`（Biome チェック）
- フォーマット: `bun run format`（Biome 書き込み）
- JSR ドライラン: `bun run jsr:check`
注意: Bun 前提のスクリプトです。CI はカバレッジ基準を強制します。ローカル失敗は PR 前に解消してください。

## コーディング規約と命名
- 言語: TypeScript（コンポーネントは TSX）。ESM のみ（`type: module`）。
- 整形/規約: Biome（シングルクォート + 推奨ルール）。push 前に実行。
- ファイル: コンポーネントは `features/*/components/` 配下の `PascalCase.tsx`。ストア/ユーティリティは `store.ts`/`utils.ts`。
- エクスポート: 追加時は `core/mod.ts`、`solid/index.ts`、`vue/index.ts` を更新。

### 型設計の方針（最小記述で型を効かせる）
- ストアの公開型は「実装から導出」する。
  - 例: `const store = { ... }` を実装し、`export type ModalStore = typeof store` を公開する。
  - これにより interface の二重定義を避け、実装と型の乖離を防ぐ。
- 共有型は必要最小限のみ export する。
- Vue のストアは `ref`/`Ref` を用いる（独自の `RefLike<T>` は廃止）。

### JSX/tsconfig の方針
- 既定の JSX ランタイムは Vue を使用（`tsconfig.build.json`: `jsx: preserve`, `jsxImportSource: "vue"`, `types: ["vue/jsx"]`）。
- Solid 配下は `tsconfig.solid.json` を用いて `jsxImportSource: "solid-js"` を上書きし、ファイル先頭の `/** @jsxImportSource solid-js */` を不要化。
- ライブラリ型生成は `vite-plugin-dts` を Vue/Core 用と Solid 用の2インスタンスで分割し、`rollupTypes: false`。

### エクスポート設計（ツリーシェイク/テスト互換）
- ストアとコンポーネントはエントリを分離。
  - Vue: `@.../vue`（stores）, `@.../vue/components`（components）
  - Solid: `@.../solid`（stores）, `@.../solid/components`（components）
- TSX を静的再エクスポートしないことで、ストアのみ利用時の不要な TSX 参照を回避。

### JSR 公開の注意
### ファイル命名（検索性を高める）
- ストアは `store.ts` のような汎名を避け、機能名を冠する。
  - 例: Notification ストア → `notificationStore.ts`
  - 例: Modal ストア → `modalStore.ts`（将来リネーム検討）
  - 例: Loading ストア → `loadingStore.ts`
- コンポーネントは `PascalCase.tsx`、ユーティリティは `utils.ts` を基本とする。

### フレームワーク別の再現方針
### ストアの関数命名（可読性第一）
- 状態取得は「意図が一目で分かる」動詞/疑問形を優先。
  - 真偽値: `isLoading()`, `isLoggedIn()`
  - 値取得: `getUser()`, `getState()` など、戻り値が具体的に分かる名前
- 変更系は動詞の現在形を使用。
  - `startLoading()`, `stopLoading()`, `open()`, `confirm()`, `close()`, `reset()`
- ライブラリ内で共通化しない（各機能の分かりやすさを優先）。
- 既存のアプリ実装（scheduler / clinicit）と齟齬がない範囲で命名を揃える。
- Vue: `clinicit_front/src/composables/features_common` の仕様・UI を忠実に再現する。
- Solid: `scheduler_front_solid/src/composables/features` の仕様・UI を忠実に再現する。
- API 表面の違いは最小化し、コンポーネント/ストア名と挙動を一致させる。
- `jsr.json` の `exports` は条件なしの文字列パスのみ（`types` は `package.json` 側で定義）。
- `publish.include: ["dist/**"]` を設定し、`.gitignore` は `vcs.useIgnoreFile: false` で無視。
- エントリ JS には対応する `.d.ts` を必ず生成（`dist/vue|solid|core` 下に出力）。

## テスト指針
- 実行: Bun test。`__tests__/` に `*.test.js` を配置（`core/mod.ts`、`solid`、`vue` から import）。
- カバレッジ: CI で 90%以上必須（CI ワークフロー参照）。小さく決定的なテストを推奨。
- 命名: 機能単位で `describe` を分け、公開 API の観測可能な振る舞いを検証。

## コミット／PR ガイドライン
- コミット: 命令形・現在形。必要に応じてスコープを付与。
  - 例: `feat(core): add deepFreeze safety for non-objects`
- PR: 説明を明確に、関連 Issue をリンク。UI 変更はスクリーンショットを添付。API 変更は `README.md`/`MIGRATION.md` に反映。
- チェック: Biome・テスト・カバレッジを通過必須。まずローカルで `bun test --coverage` を実行。

## セキュリティと設定のヒント
- シークレットはコミットしない。公開には GitHub Secrets の `JSR_TOKEN` が必要。
- `core/` ではフレームワーク内部へ依存しない。`solid-js`/`vue`/`dayjs` は peerDependencies を尊重。
- Vue の TSX 利用時は `README.md` 記載の `@vitejs/plugin-vue-jsx` を有効化。
