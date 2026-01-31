const state = (globalThis.__sentryCalls ??= {
	breadcrumbs: [],
	messages: [],
	tags: {},
	contexts: {},
	user: null,
});

export const addBreadcrumb = (crumb) => {
	state.breadcrumbs.push(crumb);
};

export const captureMessage = (message, options) => {
	state.messages.push({ message, options });
};

export const withScope = (fn) => {
	const scope = {
		setUser: (user) => {
			state.user = user;
		},
		setTag: (key, value) => {
			state.tags[key] = value;
		},
		setContext: (key, value) => {
			state.contexts[key] = value;
		},
	};
	fn(scope);
};
