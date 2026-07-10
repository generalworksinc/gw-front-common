import { createResettableStore } from '../store/resettableStore';

export interface AuthUser {
	id: string | null;
	email: string | null;
	fullName: string | null;
	firstName: string | null;
	lastName: string | null;
}

const defaultState: AuthUser = {
	id: null,
	email: null,
	fullName: null,
	firstName: null,
	lastName: null,
};

// createStore は渡したオブジェクトをクローンせず内部状態として使う。
// defaultState を直接渡すと書き込みで defaultState 自体が汚染され、
// reset() の初期値書き戻しが no-op になるため、必ずコピーを保持する。
const { store, set, reset } = createResettableStore(defaultState, {
	persist: { name: 'authStore' },
});

const isLoggedIn = (): boolean => store.id !== null;

export const authStore = {
	get: () => store,
	set,
	reset,
	isLoggedIn,
};

export type AuthStore = typeof authStore;
// default export removed to favor named imports
