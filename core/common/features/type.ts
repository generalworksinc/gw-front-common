export const isFunction = (functionToCheck: any): boolean => {
	if (functionToCheck === null || functionToCheck === undefined) {
		return false;
	}
	return {}.toString.call(functionToCheck) === '[object Function]';
};
