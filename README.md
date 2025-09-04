# @generalworks/gw-front-common

generalworks inc. 向けの共通フロントエンドライブラリ（JSR配布）。

## エントリポイント
- `@generalworks/gw-front-common` → `core/mod.ts`
- `@generalworks/gw-front-common/core` → `core/mod.ts`
- `@generalworks/gw-front-common/solid` → `solid/mod.ts`
- `@generalworks/gw-front-common/solid/components` → `solid/components.ts`
- `@generalworks/gw-front-common/vue` → `vue/mod.ts`
- `@generalworks/gw-front-common/vue/components` → `vue/components.ts`
- `@generalworks/gw-front-common/vue/nuxt/module` → `vue/nuxt/module.ts`

## 使用方法

### Vue（Nuxtを使わない通常SPA）

1) Piniaの注入
```ts
// main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setPinia } from '@generalworks/gw-front-common/vue/pinia';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

// ライブラリにPiniaを提供（1回だけ）
setPinia(pinia);

app.mount('#app');
```

2) ストア/コンポーネントの利用
```ts
import { useLoading, useModal } from '@generalworks/gw-front-common/vue';
import { Loading, Modal, Notifications } from '@generalworks/gw-front-common/vue/components';

const loading = useLoading(); // setPinia済みなら引数不要
const modal = useModal();

loading.startLoading();
modal.open({ message: 'hello' });
```

テンプレート例：
```vue
<template>
  <Loading />
  <Modal />
  <Notifications />
  <!-- ... -->
  <button @click="onClick">OPEN</button>
  <button @click="onLoad">LOAD</button>
  <!-- ... -->
</template>
```

### Nuxt 3（モジュール注入）

nuxt.config.ts
```ts
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@generalworks/gw-front-common/vue/nuxt/module',
  ],
});
```

これで `$pinia` が自動でライブラリに注入され、`useLoading()` / `useModal()` をそのまま利用できます。`plugins/` に独自注入を追加する必要はありません。

コンポーネントは以下いずれかの方法で import できます。
例：
```ts
// Solid（推奨: バレル経由）
import { Loading, Modal, Notifications } from '@generalworks/gw-front-common/solid/components';

// Vue
// 直接パス指定（従来通り）
import Loading from '@generalworks/gw-front-common/vue/features/loading/components/Loading';
import Modal from '@generalworks/gw-front-common/vue/features/modal/components/Modal';
import Notifications from '@generalworks/gw-front-common/vue/features/notification/components/Notifications';

// もしくは index からの名前付き再エクスポート（推奨）
import { Loading, Modal, Notifications } from '@generalworks/gw-front-common/vue';
```

## 設計方針（Vue と Solid の分離）
// NOTE: 以前は `RefLike<T> = { value: T }` を用意していましたが、現在は Vue の `ref`/`Ref` に統一しています。
  - 例: `useLoading().isLoading.value`, `useModal().state.value` など
  - 目的: ランタイム依存を避けつつ Composition API 互換の使用感を維持
- Solid 専用層（`@generalworks/gw-front-common/solid`）は、Solid の Signal/Store 文化に合わせた独立実装（関数ベースAPI）を提供します。
  - 例: `createLoadingStore().isLoading`, `createModalStore().state`
  - Vue の Ref とは互換にしません（必要であれば薄いアダプタは実装可能ですが推奨しません）

双方で提供する機能は「ローディング・モーダル・通知」を中心に名称と挙動をできるだけ揃えますが、リアクティビティの型は各フレームワークに準拠します。

通信（fetch）に関して
- 本ライブラリはfetch/通信ユーティリティを提供しません。API BASE、X-Client-Id、認証ヘッダなど製品依存が強いため、各プロダクトのサービス層で実装してください。
- モック/本番の切替は、サービス層に小さなファクトリ（Config/Authプロバイダ注入）を設ける設計を推奨します。

## Nuxt 3 での自動インポート設定（任意）

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
注意（NuxtでTSXを使う場合・任意）
- Vue 側で TSX/JSX を使う場合に限り、`@vitejs/plugin-vue-jsx` を有効にしてください（Nuxt は内部で Vite を利用）。SFC（`.vue`）のみなら不要です。
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

注意（Solid の使用について）
- Solid の Loading は内部のグローバルストアで表示状態を管理します。`import { loadingStore } from '@generalworks/gw-front-common/solid'` を使い、`loadingStore.start()`/`loadingStore.stop()` で制御します。
  ```tsx
  import { Loading } from '@generalworks/gw-front-common/solid/components'
  import { loadingStore } from '@generalworks/gw-front-common/solid'

  function App() {
    const onLoad = async () => {
      loadingStore.start()
      try { /* ... */ } finally { loadingStore.stop() }
    }
    return <>
      <Loading />
      <button onClick={onLoad}>load</button>
    </>
  }
  ```
- Modal/Notifications は `modalStore`/`notificationStore` を直接操作します。
  ```tsx
  import { Modal, Notifications } from '@generalworks/gw-front-common/solid/components'
  import { modalStore, notificationStore } from '@generalworks/gw-front-common/solid'

  modalStore.open({ message: '確認しますか？' })
  notificationStore.add({ type: 'info', message: '保存しました', removeAfter: 3000 })
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
