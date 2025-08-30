import authStore from './authStore';

export interface AuthEnv {
	getToken: () =>
		| Promise<string | null | undefined>
		| string
		| null
		| undefined;
	setToken: (token: string) => void | Promise<void>;
	removeToken: () => void | Promise<void>;
}

export const createAuthUser = (env: AuthEnv) => {
	const $login = async (
		token: string,
		userId: string,
		email: string,
		fullName: string,
		firstName: string,
		lastName = '',
	): Promise<void> => {
		await env.setToken(token);
		await authStore.set({ id: userId, email, fullName, firstName, lastName });
	};

	const $logout = async (navigate?: (path: string) => void): Promise<void> => {
		await env.removeToken();
		authStore.reset();
		if (navigate) navigate('/signin');
	};

	const getAccessTokenFromApp = async (): Promise<
		string | null | undefined
	> => {
		return await env.getToken();
	};

	const authCheck = async (): Promise<{
		accessToken: string | null | undefined;
	}> => {
		const accessToken = await getAccessTokenFromApp();
		if (!accessToken) {
			authStore.reset();
			return { accessToken: null };
		}
		return { accessToken };
	};

	return { $login, $logout, authCheck, getAccessTokenFromApp };
};
