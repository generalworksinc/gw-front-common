// numeric utilities
export const numberWithCommas = (num: number | null | undefined): string => {
	if (num == null) return '';
	const parts = num.toString().split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return parts.join('.');
};
