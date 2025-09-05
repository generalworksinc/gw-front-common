# Solid コンポーネントライブラリ実装メモ

以下は、Solid コンポーネントライブラリを安全に公開・利用するための注意点と実践的な対策を、わかりやすくまとめたチェックリスト／テンプレです。

- **目的**: SSR 環境（build 時の server）とクライアント（ブラウザ）でリアクティビティを壊さず使えるライブラリ設計

---

- **1) エントリ設計（exports）を明確に**
  - UI（ブラウザ実装）は常にブラウザ向けエントリ（index.js）を指すようにする。
  - サーバ専用ロジックは `./solid/server/*` のように別サブパスで管理。
  - package.json の `exports` はブラウザ版と node/server を正しく分ける。

  例（components をブラウザ版に固定）:
  ```json
  "./solid/components": {
    "types": "./dist/solid/components/index.d.ts",
    "browser": "./dist/solid/components/index.js",
    "default": "./dist/solid/components/index.js"
  }
  ```

- **2) ビルド設定（tsup 等）**
  - ブラウザUIを unbundle（bundle:false）で配布すると、消費側の bundler が解決してくれる。依存を external にしておく。
  - ただし SSR 側で server.js を読ませない運用にするなら、`server_entry` を出さない。逆に SSR 対応が必要なら server 出力も用意する。

- **3) Solid の単一インスタンス保証**
  - ライブラリとアプリで `solid-js` が重複するとシグナルが別インスタンス化され、リアクティブが効かない。
  - 消費側では Vite の `resolve.dedupe = ['solid-js']` を設定する。
  - パッケージが node_modules に重複していないか `npm ls solid-js` で確認。

- **4) client-only コンポーネントの安全な公開**
  - ライブラリ内で `@solidjs/start` に依存させると型やビルド問題が起きやすい。
  - 対策: SSR 安全な「薄いラッパー」を公開し、実体は `onMount` / 動的 import (`import('./client')`) で読み込む。

  簡単なラッパー例:
  ```tsx
  // components_clientonly.tsx
  import { createSignal, onMount } from 'solid-js';
  import { Dynamic } from 'solid-js/web';
  const gw = () => import('./components_real');
  function makeLazy(name){
    return (props)=>{
      const [C,setC]=createSignal(null);
      onMount(async()=>{ const m=await gw(); setC(()=>m[name]); });
      return <Dynamic component={C()} {...props} />;
    }
  }
  export const Notifications = makeLazy('Notifications');
  ```

- **5) コンポーネント内のリアクティブ設計**
  - `For` の `each` には配列（または accessor の結果）を渡す。`each={() => ...}` のような関数は不可。
  - 配列を reactive に扱う場合は `const list = createMemo(() => store.get().list);` を用意し、`<For each={list()}>` とする。
  - DOM に反映されない場合は、store が別インスタンスか `each` の渡し方を疑う。

- **6) props と動的 import の注意**
  - ラッパー経由で動的 import をするときは、`<Dynamic component={Loaded} {...props} />` のように props をそのまま渡す。
  - レンダ関数などで props を保持する閉包を作ると、意図しない参照喪失が起きることがある。

- **7) 開発ワークフロー（推奨）**
  - 内製／同一組織であればモノレポで TSX 生のままインポートするのが最もストレスが少ない。
  - 外部配布はビルド物で公開する。公開後は消費側で `resolve.dedupe` を必ず指定する。

- **8) トラブルシュートのチェックリスト**
  1. `console.log` でライブラリ側とアプリ側の store の `===` を確認
  2. `npm ls @generalworks/gw-front-common` で依存の重複を調べる
  3. For に渡す値が accessor/配列になっているか確認
  4. ラッパーから実体に props が流れているか（Dynamic を使うと安全）

---

必要なら、上記をリポジトリ内に `SOLID_COMPONENT.md` として追加します（要望があればサンプルコードをさらに増やします）。
