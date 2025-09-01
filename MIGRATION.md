# MIGRATION GUIDE - @generalworks/gw-front-common

本ドキュメントは、既存の `front_common` および `features_common` を利用しているプロジェクトから、JSR配布の `@generalworks/gw-front-common` へ移行するための手順です。

## 0. 事前準備
- パッケージをインストール
```bash
bunx jsr add @generalworks/gw-front-common
# or
npm i npm:@jsr/generalworks__gw-front-common
```

## 1. import の置換
- 旧: `~/src/libs/front_common` → 新: `@generalworks/gw-front-common` または `@generalworks/gw-front-common/core`
- 旧: `~/src/composables/features_common/...` → 新: `@generalworks/gw-front-common/vue`（Vue機能）

例:
```diff
- import { deepFreeze } from '~/src/libs/front_common'
+ import { deepFreeze } from '@generalworks/gw-front-common'

- import { useLoading } from '~/src/composables/features_common/loading'
+ import { useLoading } from '@generalworks/gw-front-common/vue'
```

## 2. 自動インポート設定
- Nuxt 3:
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  components: {
    global: true,
    dirs: [
      'node_modules/@generalworks/gw-front-common/vue/features/loading',
      'node_modules/@generalworks/gw-front-common/vue/features/modal',
      'node_modules/@generalworks/gw-front-common/vue/features/notification',
    ]
  },
  imports: {
    imports: [
      { from: '@generalworks/gw-front-common', name: '*' },
      { from: '@generalworks/gw-front-common/vue', name: '*' },
    ],
    dts: true
  }
})
```
- SolidStart:
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

## 3. Vue と Solid の違い（互換方針）
- **Vue** は `ref`/`Ref` ベースのAPI（例: `useLoading().isLoading` をテンプレートでそのまま参照可）
- **Solid** は Signal/Store ベースのAPI。現状はコンポーネントの提供が中心で、ストアAPIは今後拡充予定です。
  - Loading は `<Loading show />` のように `show` props でも制御可能です。
  - Modal/Notifications は `store` props を要求します。現時点ではアプリ側で簡易ストアを用意して渡してください（将来、公式ストアAPIを公開予定）。
  - 例（Solid 用の最小モーダルストア例）:
  ```ts
  type ModalOptions = { message?: string; html?: string };
  function createModalStore() {
    const [state, setState] = createSignal({ isOpen: false, isConfirm: false, options: {} as ModalOptions });
    return {
      state: state(),
      open: (opt?: ModalOptions) => setState({ isOpen: true, isConfirm: false, options: opt ?? {} }),
      confirm: (opt?: ModalOptions) => setState({ isOpen: true, isConfirm: true, options: opt ?? {} }),
      yes: () => setState({ isOpen: false, isConfirm: false, options: {} }),
      no: () => setState({ isOpen: false, isConfirm: false, options: {} }),
      close: () => setState({ isOpen: false, isConfirm: false, options: {} }),
    };
  }
  ```

## 4. 動作確認とテスト
- 置換後にユニットテストを再実行
- コンポーネント（Vue: `<Loading>` など）は自動登録が有効なら import 不要。もしくは `@generalworks/gw-front-common/vue` から名前付き import も可能です。

## 5. サブモジュールの削除（任意）
- すべての置換が完了したら、旧サブモジュールを削除
```bash
# 例
# git submodule deinit src/libs/front_common
# git rm -f src/libs/front_common
# rm -rf .git/modules/src/libs/front_common
```

## 6. 既知の注意点
- Solid で TSXコンポーネントを利用する場合は、ビルド設定で JSX ランタイムが有効であること
- SSR環境では Vue/Signal のランタイム差異に注意（UIはCSRで使用するのが安全）

