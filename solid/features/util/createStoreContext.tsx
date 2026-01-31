/** @jsxImportSource solid-js */
import { createContext, type ParentComponent, useContext } from 'solid-js';

type StoreContextResult<T> = {
	Provider: ParentComponent;
	useStore: () => T;
	Context: ReturnType<typeof createContext<T | undefined>>;
};

export function createStoreContext<T>(
	createStore: () => T,
): StoreContextResult<T> {
	const Ctx = createContext<T>();

	const Provider: ParentComponent = (props) => {
		const store = createStore();
		return <Ctx.Provider value={store}>{props.children}</Ctx.Provider>;
	};

	const useStore = () => {
		const v = useContext(Ctx);
		if (!v) throw new Error('StoreContext must be used within its Provider');
		return v;
	};

	return { Provider, useStore, Context: Ctx };
}
