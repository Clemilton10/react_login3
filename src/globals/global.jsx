export const strNumber = (n) => {
	if (!n || n == '' || isNaN(n)) {
		n = 0;
	} else {
		if (typeof n === 'string') {
			n = Number(n);
		}
	}
	return n;
};
export const isInt = (n) => {
	n = strNumber(n);
	return Math.round(n) == n;
};
export const isFloat = (n) => {
	n = strNumber(n);
	return Math.round(n) != n;
};
export const sleep = (tp) => {
	return new Promise((resolve) => setTimeout(resolve, tp));
};
