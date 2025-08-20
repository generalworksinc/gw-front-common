# @generalworks/gw-front-common

generalworks inc. 向けの共通フロントエンドライブラリ（JSR配布）。

## エントリポイント
- `@generalworks/gw-front-common` → `core/index.ts`
- `@generalworks/gw-front-common/core` → `core/index.ts`
- `@generalworks/gw-front-common/solid` → `solid/index.ts`
- `@generalworks/gw-front-common/vue` → `vue/index.ts`

## 設計方針（Vue と Solid の分離）
- Vue3 専用層（`@generalworks/gw-front-common/vue`）は、Vue 本体に依存しない `RefLike<T> = { value: T }` でストアAPIを提供します。
  - 例: `useLoading().isLoading.value`, `useModal().state.value` など
  - 目的: ランタイム依存を避けつつ Composition API 互換の使用感を維持
- Solid 専用層（`@generalworks/gw-front-common/solid`）は、Solid の Signal/Store 文化に合わせた独立実装（関数ベースAPI）を提供します。
  - 例: `createLoadingStore().isLoading`, `createModalStore().state`
  - Vue の Ref とは互換にしません（必要であれば薄いアダプタは実装可能ですが推奨しません）

双方で提供する機能は「ローディング・モーダル・通知」を中心に名称と挙動をできるだけ揃えますが、リアクティビティの型は各フレームワークに準拠します。

## Nuxt 3 での自動インポート設定

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  components: {
    global: true,
    extensions: ['vue', 'tsx'],
  },
  imports: {
    imports: [
      { from: '@generalworks/gw-front-common', name: '*' },
      { from: '@generalworks/gw-front-common/vue', name: '*' },
    ],
    dts: true
  }
})
注意（NuxtでTSXを使う場合）
- `@vitejs/plugin-vue-jsx` を有効にしてください（Nuxtは内部でViteを利用）。
  ```ts
  // nuxt.config.ts
  import vueJsx from '@vitejs/plugin-vue-jsx'
  export default defineNuxtConfig({
    vite: { plugins: [vueJsx()] },
    components: { global: true, extensions: ['vue', 'tsx'] },
  })
  ```
```

これで、テンプレートでは `<Loading>`, `<Modal>`, `<Notifications>` を直に使用でき、`script setup` では `useLoading` 等が自動インポートされます。

## SolidStart での自動インポート設定

```ts
// app.config.ts
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            '@generalworks/gw-front-common': ['*'],
            '@generalworks/gw-front-common/solid': ['*']
          }
        ],
        dts: true,
        eslintrc: { enabled: true }
      })
    ]
  }
})
```

```tsx
// 例: routes/index.tsx
export default function Page() {
  const loading = createLoadingStore()
  const modal = createModalStore()
  const notification = createNotificationStore()

  return (
    <div>
      <Loading />
      <Modal store={modal} />
      <Notifications store={notification} />
    </div>
  )
}
```

## スクリプト
- `bun test`
- `bun test --coverage`

## インストール（利用側）
- `bunx jsr add @generalworks/gw-front-common`
- または `npm i npm:@jsr/generalworks__gw-front-common`

## 公開フロー（JSR）
1. `package.json` の `version` を更新（セマンティックバージョニング）
2. タグを作成して push
```bash
git tag v0.1.0
git push origin v0.1.0
```
3. GitHub Actions `Release (JSR Publish)` が実行され、テスト後に `bunx jsr publish` で公開

事前にリポジトリの Secrets に `JSR_TOKEN` を設定してください。
