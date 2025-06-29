function random(n1, n2) {
	return Math.random() * (n2 - n1) + n1;
}
function round(n) {
	return Math.round(n);
}
function floor(n) {
	return Math.floor(n);
}
function abs(n) {
	return Math.abs(n);
}
function atan2(y, x) {
	return Math.atan2(y, x);
}
function sin(n) {
	return Math.sin(n);
}
function cos(n) {
	return Math.cos(n);
}
function tan(n) {
	return Math.tan(n);
}
function sqrt(n) {
	return Math.sqrt(n);
}
function dist(x1, y1, x2, y2) {
	return sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
function PI(n) {
	return n * Math.PI;
}
function radians(n) {
	return n * PI(1 / 180);
}
function sum(arr = [0, 0, 0]) {
	return arr.reduce((a, b) => a + b);
}
function average(arr = [0, 0, 0]) {
	return sum(arr) / arr.length;
}
/*
与えられた値が最大、最小内にあればRをtrue、なければfalseを返す。
constrainがtrueならRがtrueの場合はそのまま、falseの場合は最大、最小の中に収めた値を返す。
*/
function minmax(n = 0, min = "no", max = "no", constrain = false) {
	if (typeof min == "string" && typeof max == "string") {
		console.error("This error occurring minmax Function. by Tamura");
		return;
	}
	if (min < n && n < max) {
		if (constrain) return n;
		return true;
	} else {
		if (constrain) return abs(min - n) < abs(max - n) ? min : max;
		return false;
	}
}
