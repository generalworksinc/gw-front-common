import {
	createComponent,
	createContext,
	type ParentComponent,
	useContext,
} from 'solid-js';

type StoreContextResult<T> = {
	Provider: ParentComponent;
	useStore: () => T;
	Context: ReturnType<typeof createContext<T>>;
};

export function createStoreContext<T>(
	createStoreValue: () => T,
): StoreContextResult<T> {
	const Context = createContext<T>();

	const Provider: ParentComponent = (props) => {
		const store = createStoreValue();
		return createComponent(Context, {
			value: store,
			get children() {
				return props.children;
			},
		});
	};

	return {
		Provider,
		useStore: () => useContext(Context),
		Context,
	};
}
