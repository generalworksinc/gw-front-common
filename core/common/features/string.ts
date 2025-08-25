export const camelToSnake = (p: string): string =>
	p.replace(/([A-Z])/g, (s) => `_${s.charAt(0).toLowerCase()}`);

export const snakeToCamel = (p: string): string =>
	p.replace(/_./g, (s) => s.charAt(1).toUpperCase());

export const snakeToCamelHeadUpper = (p: string): string => {
	const camel = snakeToCamel(p);
	return camel.substring(0, 1).toUpperCase() + camel.substring(1);
};

export const headLower = (p: string): string => {
	return p.substring(0, 1).toLowerCase() + p.substring(1);
};

export const headUpper = (p: string): string => {
	return p.substring(0, 1).toUpperCase() + p.substring(1);
};

export const cNull = (str: any): string => str || '';

export const isBlank = (str: any): boolean =>
	str === undefined || str === null || String(str).trim() === '';

export const strIns = (str: string, idx: number, val: string): string =>
	str.slice(0, idx) + val + str.slice(idx);

export const cardConv = (str: string): string => {
	return str
		.replace(/[ａ-ｚＡ-Ｚ０-９]/g, (s) =>
			String.fromCharCode(s.charCodeAt(0) - 65248),
		)
		.replace(/[-ー―−‐―]/g, '');
};
