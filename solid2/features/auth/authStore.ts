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
