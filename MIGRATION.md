# MIGRATION GUIDE - @generalworks/gw_front_common

本ドキュメントは、既存の `front_common` および `features_common` を利用しているプロジェクトから、JSR配布の `@generalworks/gw_front_common` へ移行するための手順です。

## 0. 事前準備
- パッケージをインストール
```bash
bunx jsr add @generalworks/gw_front_common
# or
npm i npm:@jsr/generalworks__gw_front_common
```

## 1. import の置換
- 旧: `~/src/libs/front_common` → 新: `@generalworks/gw_front_common`
- 旧: `~/src/composables/features_common/...` → 新: `@generalworks/gw_front_common/vue`（Vue機能） または `@generalworks/gw_front_common/core/features`（純関数）

例:
```diff
- import { deepFreeze } from '~/src/libs/front_common'
+ import { deepFreeze } from '@generalworks/gw_front_common'

- import { useLoading } from '~/src/composables/features_common/loading'
+ import { useLoading } from '@generalworks/gw_front_common/vue'
```

## 2. 自動インポート設定
- Nuxt 3:
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
            '@generalworks/gw_front_common': ['*'],
            '@generalworks/gw_front_common/solid': ['*']
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
- Vue は `RefLike<T> = { value: T }` ベースのAPI（`useLoading` など）
- Solid は Signal/Store ベースのAPI（`createLoadingStore` など）
- 同名機能でも型はフレームワークに合わせて最適化。ランタイム互換ラッパは基本提供しない方針

## 4. 動作確認とテスト
- 置換後にユニットテストを再実行
- コンポーネント（Vue: `<Loading>` など）は自動登録が有効なら import 不要

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
