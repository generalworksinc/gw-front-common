# @generalworks/gw_front_common

generalworks inc. 向けの共通フロントエンドライブラリ（JSR配布）。

## エントリポイント
- `@generalworks/gw_front_common` → `core/index.ts`
- `@generalworks/gw_front_common/core` → `core/index.ts`
- `@generalworks/gw_front_common/solid` → `solid/index.ts`
- `@generalworks/gw_front_common/vue` → `vue/index.ts`

## 設計方針（Vue と Solid の分離）
- Vue3 専用層（`@generalworks/gw_front_common/vue`）は、Vue 本体に依存しない `RefLike<T> = { value: T }` でストアAPIを提供します。
  - 例: `useLoading().isLoading.value`, `useModal().state.value` など
  - 目的: ランタイム依存を避けつつ Composition API 互換の使用感を維持
- Solid 専用層（`@generalworks/gw_front_common/solid`）は、Solid の Signal/Store 文化に合わせた独立実装（関数ベースAPI）を提供します。
  - 例: `createLoadingStore().isLoading`, `createModalStore().state`
  - Vue の Ref とは互換にしません（必要であれば薄いアダプタは実装可能ですが推奨しません）

双方で提供する機能は「ローディング・モーダル・通知」を中心に名称と挙動をできるだけ揃えますが、リアクティビティの型は各フレームワークに準拠します。

## Nuxt 3 での自動インポート設定

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  components: {
    global: true,
    dirs: [
      'node_modules/@generalworks/gw_front_common/vue/features/loading',
      'node_modules/@generalworks/gw_front_common/vue/features/modal',
      'node_modules/@generalworks/gw_front_common/vue/features/notification',
    ]
  },
  imports: {
    imports: [
      { from: '@generalworks/gw_front_common', name: '*' },
      { from: '@generalworks/gw_front_common/vue', name: '*' },
    ],
    dts: true
  }
})
```

これで、テンプレートでは `<Loading>`, `<Modal>`, `<Notifications>` を直に使用でき、`script setup` では `useLoading` 等が自動インポートされます。

## スクリプト
- `bun test`
- `bun test --coverage`

## インストール（利用側）
- `bunx jsr add @generalworks/gw_front_common`
- または `npm i npm:@jsr/generalworks__gw_front_common`
