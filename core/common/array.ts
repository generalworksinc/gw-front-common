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
		for (const key of Object.keys(obj)) {
			retArray.push(obj[key]);
		}
		return retArray;
	}
};
