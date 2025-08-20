import clone from "clone";

export const isFunction = (functionToCheck: any): boolean => {
	if (functionToCheck === null || functionToCheck === undefined) {
		return false;
	}
	return {}.toString.call(functionToCheck) === "[object Function]";
};

/**
 * オブジェクトを全てのパラメータについて再帰的に遡って凍結します。
 * @param {Object} object オブジェクト
 * @template T The type of the object to freeze
 */
export const deepFreeze = <T>(object: T): T => {
	const typeOfObject = typeof object;
	if (
		object === null ||
		(typeOfObject !== "object" && typeOfObject !== "function")
	) {
		console.log("object is not object", object, typeOfObject);
		return object;
	}
	Object.freeze(object);
	if (typeOfObject === "function") {
		return object;
	}

	for (const key in object) {
		const value = object[key];
		if (
			!Object.hasOwn(object, key) ||
			typeof value !== "object" ||
			Object.isFrozen(value)
		) {
			continue;
		}
		deepFreeze(value);
	}
	return object;
};

export const isPlainObject = (obj: any): boolean => {
	return (
		typeof obj === "object" &&
		obj !== null &&
		obj.constructor === Object &&
		Object.prototype.toString.call(obj) === "[object Object]"
	);
};

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

export const replaceSnakeToCamel = (
	object: Record<string, any>,
): Record<string, any> => {
	return replaceKeys(object, snakeToCamel);
};

const replaceHeadLower = (object: Record<string, any>): Record<string, any> => {
	return replaceKeys(object, headLower);
};

export const replaceKeys = (
	object: any,
	func: (key: string) => string,
): any => {
	if (object === null || typeof object !== "object") {
		return object;
	}
	const replacedObj: Record<string, any> = {};
	for (const key in object) {
		const value = object[key];
		if (!Object.hasOwn(object, key)) {
			continue;
		}
		replacedObj[func(key)] = value !== null ? replaceKeys(value, func) : null;
	}
	return replacedObj;
};

// 数値の0以外のnull,空文字はundefinedに変換する
export const objectConvUndefined = (
	obj: Record<string, any>,
): Record<string, any> => {
	const o = clone(obj);
	for (const key of Object.keys(o)) {
		if (!o[key] || o[key] === 0) {
			o[key] = undefined;
		}
	}
	return o;
};

export const objectFilter = (
	obj: Record<string, any>,
	params?: string[],
	convSnakeCase = false,
	convCamelCase = false,
): Record<string, any> => {
	if (!isPlainObject(obj)) {
		return obj;
	}
	let filterFunc: (key: string) => boolean;
	if (params && params.length > 0) {
		filterFunc = (key) => params.includes(key);
	} else {
		filterFunc = (key) => true;
	}
	return Object.keys(obj)
		.filter(filterFunc)
		.reduce(
			(o, key) =>
				Object.assign(o, {
					[convSnakeCase
						? camelToSnake(key)
						: convCamelCase
							? snakeToCamel(key)
							: key]: objectFilter(
						obj[key],
						undefined,
						convSnakeCase,
						convCamelCase,
					),
				}),
			{} as Record<string, any>,
		);
};

export const objectFilterKey = (
	obj: Record<string, any>,
	params?: string[],
	keyFunc?: (key: string) => string,
): Record<string, any> => {
	// paramが空なら全てのキーを対象とする
	// TODO 再帰的でないので、階層深い場合にも対応できるようにしたい
	if (!params || params.length === 0) {
		params = Object.keys(obj);
	}
	return Object.keys(obj)
		.filter((key) => params!.includes(key))
		.reduce(
			(o, key) => {
				if (keyFunc) {
					return Object.assign(o, {
						[keyFunc(key)]: obj[key],
					});
				} else {
					return Object.assign(o, {
						[key]: obj[key],
					});
				}
			},
			{} as Record<string, any>,
		);
};

//valueに対して関数を適用し、フィルタリングする
export const objectFilterFunc = (
	obj: Record<string, any>,
	func: (value: any) => boolean,
): Record<string, any> => {
	// paramが空なら全てのキーを対象とする
	// TODO 再帰的でないので、階層深い場合にも対応できるようにしたい
	return Object.keys(obj)
		.filter((key) => func(obj[key]))
		.reduce(
			(o, key) =>
				Object.assign(o, {
					[key]: obj[key],
				}),
			{} as Record<string, any>,
		);
};

export const range = (from: number, to: number): number[] => {
	let ind = 0;
	const ret: number[] = [];
	while (ind <= to - from) {
		ret.push(from + ind);
		ind += 1;
	}
	return ret;
};

export const obj2Array = (obj: Record<string, any> | null): any[] => {
	const retArray: any[] = [];
	if (!obj) {
		return retArray;
	} else {
		// 修正: Object.keys(obj)はオブジェクトのキーの配列を返す
		// for...ofループでキーの配列を直接イテレートする
		for (const key of Object.keys(obj)) {
			retArray.push(obj[key]);
		}
		return retArray;
	}
};

export const cNull = (str: any): string => str || "";

export const isBlank = (str: any): boolean =>
	str === undefined || str === null || String(str).trim() === "";

export const strIns = (str: string, idx: number, val: string): string =>
	str.slice(0, idx) + val + str.slice(idx);

export const cardConv = (str: string): string => {
	return str
		.replace(/[ａ-ｚＡ-Ｚ０-９]/g, (s) =>
			String.fromCharCode(s.charCodeAt(0) - 65248),
		)
		.replace(/[-ー―−‐―]/g, "");
};

const makeNewObject = (
	keyName: string,
	value: any,
	retObj: Record<string, any>,
): void => {
	if (keyName.indexOf(".") === 0) {
		retObj[value[keyName]] = value;
	} else {
		//keyNameを.でsplitして、keyNameの値を取得する
		let targetKeyValue = value;
		for (const key of keyName.split(".")) {
			if (targetKeyValue == null) {
				break;
			}
			targetKeyValue = targetKeyValue[key];
		}
		if (targetKeyValue == null) {
			throw new Error("keyName is not found in object");
		}
		retObj[targetKeyValue] = value;
	}
};

export const objectifyByKeyParam = (
	fromObject: Record<string | number, any> | any[] | null,
	keyName = "id",
): Record<string | number, any> => {
	const retObj: Record<string | number, any> = {};
	if (!fromObject) {
		return retObj;
	} else if (Array.isArray(fromObject)) {
		for (const value of fromObject) {
			makeNewObject(keyName, value, retObj);
		}
		return retObj;
	} else {
		for (const key of Object.keys(fromObject)) {
			const value = fromObject[key];
			makeNewObject(keyName, value, retObj);
		}
		return retObj;
	}
};

export const sleep = (msec: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, msec));

// test-only export to improve coverage of internal helper
export const __test__replaceHeadLower = (object: Record<string, any>): Record<string, any> =>
	replaceHeadLower(object);
