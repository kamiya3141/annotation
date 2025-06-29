function color(...args) {
	let retval = 0;
	if (args.length > 0) {
		if (args.length == 1 || args.length == 2) {
			if (typeof args[0] === "string") {
				retval = args[0];
			} else {
				retval =
					"rgb(" +
					args[0].toString() +
					"," +
					args[0].toString() +
					"," +
					args[0].toString() +
					")";
			}
		}
		if (args.length == 3) {
			retval =
				"rgb(" +
				args[0].toString() +
				"," +
				args[1].toString() +
				"," +
				args[2].toString() +
				")";
		}
		if (args.length == 4) {
			retval =
				"rgba(" +
				args[0].toString() +
				"," +
				args[1].toString() +
				"," +
				args[2].toString() +
				"," +
				(args[3] / 255).toString() +
				")";
		}
	}

	return retval;
}

function create_div(_id = "", _className = "", _pt = document.body) {
	let _div = document.createElement("div");
	_div.id = _id;
	_div.className = "my-div " + _className;
	_pt.appendChild(_div);
	_div = _pt.lastElementChild;
	return _div;
}

function num_to_px(n, ...args) {
	if (args.length == 1) {
		return `${n.toString()}${args[0]}`;
	} else {
		return `${n.toString()}px`;
	}
}
function num_to_per(n) {
	return String(n * 100) + "%";
}
function px_to_num(str) {
	return Number(str.replace("px", ""));
}
function num_to_px_many(...args) {
	let retval = [];
	for (let i = 0; i < args.length; i++) {
		if (Array.isArray(args[i])) {
			retval.push(num_to_px(args[i][0], args[i][1]));
		} else {
			retval.push(num_to_px(args[i]));
		}
	}
	return retval;
}
function px_to_num(n) {
	return Number(n.replace(/(px|em|%|deg)/, ""));
}

function convert_per2px(__per, __base, __put = 0) {
	if (typeof __per == "string") __per = Number(__per.replace("%", ""));
	if (typeof __base == "string") __base = Number(__base.replace("px", ""));
	const ret = __per * __base / 100;
	return __put == 0 ? ret : String(__put) + "px";
}
function convert_px2per(__px, __base, __put = 0) {
	if (typeof __px == "string") __px = Number(__per.replace("px", ""));
	if (typeof __base == "string") __base = Number(__base.replace("px", ""));
	const ret = __px / __base * 100;
	return __put == 0 ? ret : String(__put) + "%";
}
function convert_per2per1(__per) {
	return Number(__per.replace("%", "")) / 100;
}
function convert_per12per(__per) {
	return `${String(__per * 100)}%`;
}
function css_calc_per(n1, n2, str) {
	n1 = Number(String(n1).replace("%", ""));
	n2 = Number(String(n2).replace("%", ""));
	let retval = 0;
	switch (str) {
		case "+":
			retval = n1 + n2;
			break;
		case "-":
			retval = n1 - n2;
			break;
		case "*":
			retval = n1 * n2;
			break;
		case "/":
			retval = n1 / n2;
			break;
		case "%":
			retval = n1 % n2;
			break;
		default:
			throw new Error("不正な演算子が指定されました。");
			break;
	}
	return `${String(retval)}%`;
}
function css_calc(...args) {
	if (args.length == 0) throw new Error("css_calcでargs.lengthの長さが0でした");
	let retarr = [];
	let n1, n2, str;
	for (let i = 0; i < args.length; i++) {
		[n1, str, n2] = args[i];
		let calcstr = "";
		if (n1.search(/(px|em|%|deg)/) == -1) {
			throw new Error("css_calcでn1の単位が見つかりませんでした");
		} else {
			calcstr = n1.slice(n1.search(/(px|em|%|deg)/, ""));
			n1 = Number(n1.replace(/(px|em|%|deg)/, ""));
		}
		if (typeof n2 == "string") {
			if (n2.search(/(px|em|%|deg)/) == -1) {
				throw new Error("css_calcでn2の単位が見つかりませんでした");
			} else {
				n2 = n2.replace(/(px|em|%|deg)/, "");
			}
		}
		let pushval = 0;
		switch (str) {
			case "+":
				pushval = n1 + n2;
				break;
			case "-":
				pushval = n1 - n2;
				break;
			case "*":
				pushval = n1 * n2;
				break;
			case "/":
				pushval = n1 / n2;
				break;
			case "%":
				pushval = n1 % n2;
				break;
			default:
				throw new Error("不正な演算子が指定されました。");
		}
		retarr.push(String(pushval) + calcstr);
	}
	return retarr;
}
function css_calc_all(...args) {
	if (args.length == 0) throw new Error("css_calc_allでargs.lengthの長さが0でした");
	let retarr = [];
	let arr1, arr2, str;
	for (let i = 0; i < args.length; i++) {
		[arr1, str, arr2] = args[i];
		arr1 = copy(arr1);
		arr2 = copy(arr2);
		if (arr1.length != arr2.length)
			throw new Error("css_calc_allでarr1.lengthとarr2.lengthの長さが違いました");
		let retarr2 = [];
		for (let j = 0; j < arr1.length; j++) {
			retarr2.push(css_calc([arr1[j], str, arr2[j]])[0]);
		}
		retarr.push(retarr2);
	}
	return retarr;
}
function css_om2col(str = "wh5") {
	if (str[str.length - 1].search(/[0-9]/) == -1 || str[str.length - 1] == "0") str += "5";
	let ret = "";
	switch (str.slice(0, -1)) {
		case "clr":
			ret = `clear`;
			break;
		case "wh":
			ret = `white${str[str.length - 1]}`;
			break;
		case "bk":
			ret = `black${str[str.length - 1]}`;
			break;
		case "rd":
			ret = `red${str[str.length - 1]}`;
			break;
		case "gr":
			ret = `green${str[str.length - 1]}`;
			break;
		case "bl":
			ret = `blue${str[str.length - 1]}`;
			break;
		case "yl":
			ret = `yellow${str[str.length - 1]}`;
			break;
		case "pp":
			ret = `purple${str[str.length - 1]}`;
			break;
		case "lb":
			ret = `lightblue${str[str.length - 1]}`;
			break;
		case "lg":
			ret = `lightgreen${str[str.length - 1]}`;
			break;
		case "ct":
			ret = `chartreuse${str[str.length - 1]}`;
			break;
		case "gy":
			ret = `gray${str[str.length - 1]}`;
			break;
		default:
			throw new Error("convert_css_omit2colorより、最初の二文字が何にも当てはまらなかったですわ");
	}
	return `var(--${ret})`;
}
function copy(__obj) {
	return deepCopy(__obj);
}
function deepCopy(obj) {
	if (obj === null || typeof obj !== "object") {
		return obj;
	}
	if (obj instanceof HTMLElement) {
		return obj;
	}
	const copy = Array.isArray(obj) ? [] : {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			copy[key] = deepCopy(obj[key]);
		}
	}
	return copy;
}
function write_append_args(obj, args) {
	obj = copy(obj);
	obj.args = args;
	return obj;
}
function width_height_repair(w, h) {
	let retval = [];
	if (w > h) {
		retval = [h * (16 / 9), h];
		if (retval[0] >= w) {
			retval = [w, w * (9 / 16)];
		}
		return [retval, "none"];
	} else {
		retval = [w, w * (9 / 16)];
		return [retval, "block"];
	}
}
const pre_global_dom_style = {
	global: ["inherit", "initial", "unset"],
	display: [
		"block",
		"contents",
		"flex",
		"flexbox",
		"flow-root",
		"grid",
		"inline",
		"inline-block",
		"inline-flex",
		"inline-flexbox",
		"inline-table",
		"list-item",
		"none",
		"ruby",
		"ruby-base",
		"ruby-base-container",
		"ruby-text",
		"ruby-text-container",
		"run-in",
		"table",
		"table-caption",
		"table-cell",
		"table-column",
		"table-column-group",
		"table-footer-group",
		"table-header-group",
		"table-row",
		"table-row-group",
		"-moz-box",
		"-moz-deck",
		"-moz-grid",
		"-moz-grid-group",
		"-moz-grid-line",
		"-moz-groupbox",
		"-moz-inline-box",
		"-moz-inline-grid",
		"-moz-inline-stack",
		"-moz-marker",
		"-moz-popup",
		"-moz-stack",
		"-ms-flexbox",
		"-ms-grid",
		"-ms-inline-flexbox",
		"-ms-inline-grid",
		"-webkit-box",
		"-webkit-flex",
		"-webkit-inline-box",
		"-webkit-inline-flex"
	],
	position: ["absolute", "fixed", "relative", "static", "sticky", "-ms-page", "-webkit-sticky"]
};

function l_json_parse(_key) {
	return JSON.parse(localStorage.getItem(_key));
}
function l_json_set(_key, _obj) {
	localStorage.setItem(_key, JSON.stringify(_obj));
	return l_json_parse(_key);
}
function s_json_parse(_key) {
	return JSON.parse(sessionStorage.getItem(_key));
}
function s_json_set(_key, _obj) {
	sessionStorage.setItem(_key, JSON.stringify(_obj));
	return s_json_parse(_key);
}
