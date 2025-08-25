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
