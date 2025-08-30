import { makePersisted } from '@solid-primitives/storage';
import { createStore } from 'solid-js/store';
import { isServer } from 'solid-js/web';

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

const reset = (): void => {
	persistedSetStore({ ...defaultState });
};

const isLoggedIn = (): boolean => persistedStore.id !== null;

export default {
	get: () => persistedStore,
	set: persistedSetStore,
	reset,
	isLoggedIn,
};


