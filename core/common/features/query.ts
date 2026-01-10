export const toQueryString = (data: Record<string, any>): string => {
	const params = new URLSearchParams();
	for (const [key, value] of Object.entries(data)) {
		if (value == null) continue;
		if (Array.isArray(value)) {
			for (const item of value) {
				if (item == null) continue;
				params.append(key, String(item));
			}
			continue;
		}
		params.set(key, String(value));
	}
	return params.toString();
};
