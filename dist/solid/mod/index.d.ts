import * as solid_js_store from 'solid-js/store';
import { SetStoreFunction } from 'solid-js/store';
export { L as LoadingStore, M as ModalStore, c as NotificationItem, b as NotificationPosition, d as NotificationState, N as NotificationStore, a as NotificationType, l as loadingStore, m as modalStore, n as notificationStore } from '../../notificationStore-D5jcCcnB.js';
import { ParentComponent, createContext } from 'solid-js';

interface AuthUser {
    id: string | null;
    email: string | null;
    fullName: string | null;
    firstName: string | null;
    lastName: string | null;
}
declare const authStore: {
    get: () => AuthUser;
    set: solid_js_store.SetStoreFunction<AuthUser>;
    reset: () => void;
    isLoggedIn: () => boolean;
};
type AuthStore = typeof authStore;

type AsyncFunction = (...args: any[]) => Promise<any>;
type SyncFunction = (...args: any[]) => any;
/**
 * ユーザー操作（クリック等）の連打ガード専用ヘルパー。
 *
 * グローバルローディング表示を開始し、実行中は後続操作を無効化する。
 * isLoading 中に呼ばれた場合は何も実行せず `false` を返すため、呼び出し側は
 * スキップされ得ることを前提にする。
 *
 * 初期ロード・リアクティブなデータ取得には使わないこと。無関係なロードと排他され、
 * 取得処理が黙って消える可能性がある。データ取得はコンポーネント/ストアの
 * ローカルな読み込み状態で管理する。
 *
 * Solid 2.0 の microtask バッチ化による影響はない。
 */
declare const eventWithLoading: (func: AsyncFunction | SyncFunction, ...params: any[]) => Promise<any>;
/** eventWithLoading をイベントハンドラ化するヘルパー。 */
declare const awaitLoadingWith: (asyncFn: () => Promise<void>) => () => Promise<any>;

type ResettableStoreOptions = {
    /** 指定するとクライアントで localStorage（または storage）へ永続化する */
    persist?: {
        name: string;
        storage?: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
    };
};
/**
 * リセット可能（+任意で永続化）なストアを作るファクトリ。
 *
 * createStore の2つの罠を構造的に回避する:
 * 1. createStore は初期値をクローンしない → 内部でディープコピーして保持するため、
 *    呼び出し側の defaultState がストア書き込みで汚染されることがない
 * 2. reset() は保持しておいた初期スナップショットを reconcile で書き戻すため、
 *    「汚染された初期値の書き戻し no-op」が起きない
 *
 * 永続化は makePersisted と異なり「set 直後の同期読み戻し」に依存しない
 * （microtask で遅延して書き込む）。Solid 2.0 の microtask バッチ化
 * （読み取りは flush まで旧値）でも正しい値が永続化される。
 */
declare function createResettableStore<T extends object>(defaultState: T, options?: ResettableStoreOptions): {
    store: T;
    set: SetStoreFunction<T>;
    reset: () => void;
};

/** @jsxImportSource solid-js */

type StoreContextResult<T> = {
    Provider: ParentComponent;
    useStore: () => T;
    Context: ReturnType<typeof createContext<T | undefined>>;
};
declare function createStoreContext<T>(createStore: () => T): StoreContextResult<T>;

export { type AuthStore, type AuthUser, type ResettableStoreOptions, authStore, awaitLoadingWith, createResettableStore, createStoreContext, eventWithLoading };
