import clone from "clone";
import { camelToSnake, snakeToCamel, headLower } from "./string.ts";

export const deepFreeze = <T>(object: T): T => {
	const typeOfObject = typeof object;
	if (
		object === null ||
		(typeOfObject !== "object" && typeOfObject !== "function")
	) {
		console.log("object is not object", object, typeOfObject);
		return object;
	}
	Object.freeze(object as any);
	if (typeOfObject === "function") {
		return object;
	}

	for (const key in object as any) {
		const value = (object as any)[key];
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

export const replaceSnakeToCamel = (
	object: Record<string, any>,
): Record<string, any> => {
	return replaceKeys(object, snakeToCamel);
};

const replaceHeadLower = (object: Record<string, any>): Record<string, any> => {
	return replaceKeys(object, headLower);
};

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
		return obj as any;
	}
	let filterFunc: (key: string) => boolean;
	if (params && params.length > 0) {
		filterFunc = (key) => params.includes(key);
	} else {
		filterFunc = (_key) => true;
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

export const objectFilterFunc = (
	obj: Record<string, any>,
	func: (value: any) => boolean,
): Record<string, any> => {
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

const makeNewObject = (
	keyName: string,
	value: any,
	retObj: Record<string, any>,
): void => {
	if (keyName.indexOf(".") === 0) {
		retObj[(value as any)[keyName]] = value;
	} else {
		let targetKeyValue = value;
		for (const key of keyName.split(".")) {
			if (targetKeyValue == null) {
				break;
			}
			targetKeyValue = (targetKeyValue as any)[key];
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
			const value = (fromObject as any)[key];
			makeNewObject(keyName, value, retObj);
		}
		return retObj;
	}
};

// test-only export to improve coverage of internal helper
export const __test__replaceHeadLower = (object: Record<string, any>): Record<string, any> =>
	replaceHeadLower(object);

