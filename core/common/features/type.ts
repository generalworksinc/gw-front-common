export const isFunction = (functionToCheck: any): boolean => {
	if (functionToCheck === null || functionToCheck === undefined) {
		return false;
	}
	return {}.toString.call(functionToCheck) === '[object Function]';
};

export type AsyncReturn<T extends (...args: any[]) => any> = Promise<
	Awaited<ReturnType<T>>
>;

export type Promisify<T> = Promise<Awaited<T>>;
