import { createStore } from 'solid-js/store';
import { isServer } from 'solid-js/web';
import { makePersisted } from '@solid-primitives/storage';

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

const [store, setStore] = createStore<AuthUser>(defaultState);
const [persistedStore, persistedSetStore] = isServer
	? [store, setStore]
	: makePersisted([store, setStore], { name: 'authStore' });

export const resetAuth = (): void => {
	persistedSetStore({ ...defaultState });
};

export const isLoggedIn = (): boolean => persistedStore.id !== null;

export const authStore = {
	get: () => persistedStore,
	set: persistedSetStore,
	reset: resetAuth,
	isLoggedIn,
};

export default authStore;
