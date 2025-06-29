let page_frame = document.getElementById("page-frame");
let image_frame = document.getElementById("image-frame");
let image_frame_box = document.getElementById("image-frame-box");
let loading_show = document.getElementById("loading-show");
let stop_show = document.getElementById("stop-show");
let img = document.createElement("img");
img.id = "frame-img";
img.className = "gray-true";
image_frame_box.insertBefore(img, image_frame_box.firstElementChild);
img = document.getElementById("frame-img");
let img_canvas = document.getElementById("image-frame-canvas");
let ptcc_box_count = 0;
let ptcc_box;

let GLOBAL_FLAG = false;

let ok_btn = document.getElementById("ok-button");
//ok_btn.setAttribute("aria-disabled", "true");
const ok_btn_sct_text = "(左ダブルクリック)";
const ok_btn_base_text = `${ok_btn.innerHTML}:${ok_btn_sct_text}`;
ok_btn.innerHTML = ok_btn_base_text;
let send_btn = document.getElementById("send-button");
send_btn.setAttribute("aria-disabled", "true");
let delete_btn = document.getElementById("delete-button");
delete_btn.setAttribute("aria-disabled", "true");
let stop_btn = document.getElementById("stop-button");

let MONO_MODE = false;
let GRAY_MODE = false;

let MONO_INFO =
	s_json_parse("MONO") == null ? s_json_set("MONO", { status: MONO_MODE }) : s_json_parse("MONO");
let GRAY_INFO =
	s_json_parse("GRAY") == null ? s_json_set("GRAY", { status: GRAY_MODE }) : s_json_parse("GRAY");

if (MONO_INFO.status == false) MONO_MODE = false;
if (GRAY_INFO.status == false) GRAY_MODE = false;

if (img != null) img.className = GRAY_MODE ? "gray-true" : "gray-false";

//あらゆるキー操作を無効化
document.addEventListener("keydown", e => {
	e.preventDefault();
});
document.addEventListener("keyup", e => {
	e.preventDefault();
	const k = String(e.key).toLowerCase();
	if (k == "control") {
		MONO_MODE = !MONO_MODE;
		MONO_INFO = s_json_set("MONO", { status: MONO_MODE });
		if (img != null && org_src != "" && mono_src != "")
			img.src = MONO_MODE ? mono_src : org_src;
	} else if (k == "shift") {
		GRAY_MODE = !GRAY_MODE;
		GRAY_INFO = s_json_set("GRAY", { status: GRAY_MODE });
		if (img != null) img.className = GRAY_MODE ? "gray-true" : "gray-false";
	} else if (k == "alt") {
		current_color_tf = !current_color_tf;
		[...document.querySelectorAll(".ptcc-box")].forEach(elem => {
			elem.style.border = `1px solid ${!current_color_tf
				? css_om2col("wh5")
				: css_om2col("bk5")}`;
		});
	}
});
let mouseX, mouseY;
let mousePressed = false;

let org_src = "";
let mono_src = "";
let current_color_tf = true;

img_canvas.addEventListener("mousemove", e => {
	if (mousePressed && ok_btn.innerHTML == ok_btn_base_text) {
		if (e.button != "0") return;
		if (e.target == e.currentTarget) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		} else {
			const rect = img_canvas.getBoundingClientRect();
			const __x = e.pageX - rect.left;
			const __y = e.pageY - rect.top;
			if (__x < px_to_num(img_canvas.style.width)) mouseX = __x;
			if (__y < px_to_num(img_canvas.style.height)) mouseY = __y;
		}
		if (e.target == image_frame || e.target == image_frame_box) {
			mouseX =
				mouseX / px_to_num(img_canvas.style.width) < 0.5
					? 1
					: px_to_num(img_canvas.style.width) - 1;
			mouseY =
				mouseY / px_to_num(img_canvas.style.height) < 0.5
					? 1
					: px_to_num(img_canvas.style.height) - 1;
		}
		stop_btn.setAttribute("aria-disabled", "true");
	}
});
img_canvas.addEventListener("mousedown", e => {
	if (e.button == "1" && delete_btn.getAttribute("aria-disabled") == "false") delete_btn.click();
	if (e.button != "0") return;
	if (
		(e.target == img_canvas || img_canvas.contains(e.target)) &&
		ok_btn.innerHTML == ok_btn_base_text
	) {
		mousePressed = true;
		if (e.target == e.currentTarget) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		} else {
			const rect = img_canvas.getBoundingClientRect();
			const __x = e.pageX - rect.left;
			const __y = e.pageY - rect.top;
			if (__x < px_to_num(img_canvas.style.width)) mouseX = __x;
			if (__y < px_to_num(img_canvas.style.height)) mouseY = __y;
		}
	}
});
document.oncontextmenu = () => {
	if (send_btn.getAttribute("aria-disabled") == "false") send_btn.click();
	return false;
};
img_canvas.addEventListener("dblclick", e => {
	if (e.button == "0" && ok_btn.getAttribute("aria-disabled") == "false") ok_btn.click();
});

image_frame.addEventListener("mouseup", e => {
	mousePressed = false;
	stop_btn.setAttribute("aria-disabled", "false");
});

let my_url = "";
[
	page_frame.style.width,
	page_frame.style.height,
	document.getElementById("error-show").style.display
] = w_h_dis(window.innerWidth, window.innerHeight);
img_canvas.style.width = image_frame.style.width = page_frame.style.width;
img_canvas.style.height = image_frame.style.height = page_frame.style.height;
image_frame_box.style.width = num_to_px(px_to_num(image_frame.style.width) * (90 / 100));
image_frame_box.style.height = num_to_px(px_to_num(image_frame.style.height) * (90 / 100));
window.addEventListener("resize", function() {
	[
		page_frame.style.width,
		page_frame.style.height,
		document.getElementById("error-show").style.display
	] = w_h_dis(window.innerWidth, window.innerHeight);
	image_frame.style.width = page_frame.style.width;
	image_frame.style.height = page_frame.style.height;
	image_frame_box.style.width = num_to_px(px_to_num(image_frame.style.width) * (90 / 100));
	image_frame_box.style.height = num_to_px(px_to_num(image_frame.style.height) * (90 / 100));
});
function create_div(_id = "", _className = "", _pt = document.body) {
	let _div = document.createElement("div");
	_div.id = _id;
	_div.className = "my-div " + _className;
	_div.style.border = `1px solid ${!current_color_tf ? css_om2col("wh5") : css_om2col("bk5")}`;
	_pt.appendChild(_div);
	_div = _pt.lastElementChild;
	return _div;
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
function w_h_dis(mw, mh) {
	let w, h, str;
	[[w, h], str] = width_height_repair(
		Number(String(mw).replace("px", "")),
		Number(String(mh).replace("px", ""))
	);
	w = num_to_px(w);
	h = num_to_px(h);
	return [w, h, str];
}
//禁止画面を複製
//const error_show_clone = document.getElementById("error-show").cloneNode(true);

//20fpsに設定(FPSやめられないんだけどぉぉぉぉぉぉぉぉ！！！！！！！！！！！！！！！！！！！)
const frame_rate = 20;

//data.jsonを読み込み、現在あるフォルダと、その中の画像名を表示
const dir0 = "data0";
let dir1 = ""; //初期デバッグ状態ではimg-group
let dir2 = ""; //初期デバッグ状態で一番最初はpeople
let image_dir = "";
let text_dir = "";
let json_dir = "";
let file_number = undefined;
const base_url = location.href.substring(0, location.href.lastIndexOf("/"));
const script_php_url = `${base_url}/script.php`;
console.log(script_php_url);
const data_json_url = add_slash([base_url, dir0, "data.json"]);
let annotation = {
	p1: undefined,
	p2: undefined,
	x1: 0.0,
	y1: 0.0,
	x2: 0.9,
	y2: 0.9,
	cx: 0.0,
	cy: 0.0,
	data: []
};

async function load_data_json() {
	const dtjs = await fetch(`${data_json_url}?nocache=${Math.random() * 19194545}`, {
		method: "GET"
	});
	const data = await dtjs.json();
	dir1 = data.dir_base_name;
	image_dir = data.image_dir_name;
	text_dir = data.text_dir_name;
	json_dir = data.json_dir_name;
	setTimeout(await setup(data), 1);
}

load_data_json();

function add_slash(arr = ["a", "b"], tf = false) {
	let _str = tf ? "/" : "";
	for (let i = 0; i < arr.length; i++) {
		_str += (i == 0 ? "" : "/") + arr[i];
	}
	return _str;
}
async function check_json_data(
	_arr = [base_url],
	_dir2 = dir2,
	_n = 1,
	_n_max = 10,
	_check_attr = "a",
	_check_word = "b"
) {
	if (_n > _n_max) return false;
	_arr_new = copy(_arr);
	_arr_new.push(`${_dir2} (${_n}).json`);
	const _my_url = encodeURI(add_slash(_arr_new));
	const _res = await fetch(_my_url + "?nocache=" + String(Math.random() * 19194545), {
		method: "GET"
	});
	const _data = await _res.json();
	if (_data[_check_attr] == _check_word) {
		return _n;
	} else {
		return await check_json_data(_arr, _dir2, _n + 1, _n_max, _check_attr, _check_word);
	}
}
function width_height_repair2(w = innerWidth, h = innerHeight, asp = 16 / 9) {
	let retval = [];
	if (w > h) {
		retval = [h * asp, h];
		if (retval[0] >= w) {
			retval = [w, w * (1 / asp)];
		}
		return [retval, "none"];
	} else {
		retval = [w, w * (1 / asp)];
		return [retval, "block"];
	}
}

let __INFO__ = s_json_parse("info");
let true_dir1 = "0";
if (__INFO__ != null && __INFO__ != undefined)
	[true_dir1, json_dir, dir2, numnum, current_color_tf] = __INFO__;
let canvas = document.getElementById("NO-CANVAS");
let ctx = canvas.getContext("2d", { willReadFrequently: true });

async function setup(_data) {
	let numnum = 1;
	for (let i = Number(true_dir1.slice(-1)); i < _data.dirs.length; i++) {
		if (__INFO__ != null && __INFO__ != undefined)
			[true_dir1, json_dir, dir2, numnum, current_color_tf] = __INFO__;
		true_dir1 = dir1 + String(i);
		dir2 = _data.dirs[i].name;
		const res = await check_json_data(
			[base_url, dir0, true_dir1, json_dir],
			dir2,
			numnum,
			Number(_data.dirs[i].n_of),
			"edit",
			"none"
		);
		file_number = res;
		if (file_number != false) {
			dir1 = true_dir1;
			break;
		} else {
			s_json_set("info", [true_dir1, json_dir, dir2, 1, current_color_tf]);
			__INFO__ = s_json_parse("info");
		}
	}
	if (file_number == false) {
		exist_obj(stop_show);
	} else {
		const edit_data = {
			base_url: base_url,
			dir0: dir0,
			dir1: dir1,
			dir2: dir2,
			dir_json: json_dir,
			dir_text: text_dir,
			num: String(file_number),
			text: "change-text",
			json: JSON.stringify({ edit: "edit" })
		};
		fetch(`${script_php_url}?nocache=${Math.random() * 19194545}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8"
			},
			body: JSON.stringify(edit_data)
		});
		my_url = encodeURI(
			add_slash([base_url, dir0, dir1, image_dir, `${dir2} (${file_number}).jpg`])
		);
		img.src = `${my_url}?nocache=${Math.random() * 19194545}`;
		org_src = `${my_url}?nocache=${Math.random() * 19194545}`;
		img.addEventListener(
			"load",
			function() {
				console.log(img.src);
				let w, h;
				[[w, h], _str] = width_height_repair2(
					px_to_num(image_frame_box.style.width),
					px_to_num(image_frame_box.style.height),
					img.width / img.height
				);
				img.style.width = img_canvas.style.width = num_to_px(w);
				img.style.height = img_canvas.style.height = num_to_px(h);
				canvas.width = w;
				canvas.height = h;
				img.style.width = num_to_px(canvas.width);
				img.style.height = num_to_px(canvas.height);
				exist_obj(image_frame);
				annotation.p1 = new PointCircle(0, 0, img_canvas);
				ptcc_box = create_div("ptcc-box" + String(ptcc_box_count), "ptcc-box", img_canvas);
				let all_image_num_per = 0;

				all_image_num_per += Number(file_number);

				document.getElementById(
					"image-frame-box"
				).title = `${dir2} (${file_number}).jpg \n${all_image_num_per}/653`;
				s_json_set("info", [true_dir1, json_dir, dir2, file_number, current_color_tf]);
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

				const imageData = ctx.getImageData(
					0,
					0,
					Number(canvas.width),
					Number(canvas.height)
				);
				const canvas_data = imageData.data;

				for (let i = 0; i < canvas_data.length; i += 4) {
					const red = canvas_data[i];
					const green = canvas_data[i + 1];
					const blue = canvas_data[i + 2];
					const grayscale = red * 0.3 + green * 0.59 + blue * 0.11;
					canvas_data[i] = canvas_data[i + 1] = canvas_data[i + 2] =
						grayscale < 128 ? 0 : 255;
					//canvas_data[i + 3] = 255;
				}

				ctx.putImageData(imageData, 0, 0);
				mono_src = canvas.toDataURL();
				if (MONO_INFO && MONO_INFO.status == true) {
					img.src = mono_src;
					img.addEventListener(
						"load",
						function() {
							setTimeout(function() {
								setInterval(draw, 1000 / frame_rate);
								exist_obj(loading_show, false);
							}, 1);
						},
						{ once: true }
					);
				} else {
					setTimeout(function() {
						setInterval(draw, 1000 / frame_rate);
						exist_obj(loading_show, false);
					}, 1);
				}
			},
			{ once: true }
		);
	}
}
function exist_obj(_obj, tf = true) {
	_obj.style.display = tf ? "block" : "none";
}
//アノテーションの形式(クラスID, X中心、Y中心、W、H)
ok_btn.addEventListener("click", function() {
	if (ok_btn.getAttribute("aria-disabled") == "true") return;
	if (ok_btn.innerHTML == ok_btn_base_text) {
		if (annotation.p2 == undefined) {
			annotation.p1.gotoxy(
				mouseX == undefined ? 0 : mouseX,
				mouseY == undefined ? 0 : mouseY,
				ptcc_box,
				img_canvas.style.width,
				img_canvas.style.height,
				true
			);
			annotation.x1 = annotation.p1.x / px_to_num(img.style.width);
			annotation.y1 = annotation.p1.y / px_to_num(img.style.height);
			annotation.p2 = new PointCircle(
				px_to_num(img.style.width),
				px_to_num(img.style.height),
				img_canvas
			);
			mouseX = mouseY = undefined;
		} else {
			annotation.p2.gotoxy(
				mouseX == undefined ? px_to_num(img.style.width) : mouseX,
				mouseY == undefined ? px_to_num(img.style.height) : mouseY,
				ptcc_box,
				num_to_px(annotation.p1.x),
				num_to_px(annotation.p1.y),
				false
			);
			annotation.x2 = annotation.p2.x / px_to_num(img.style.width);
			annotation.y2 = annotation.p2.y / px_to_num(img.style.height);
			annotation.cx = annotation.x1 + (annotation.x2 - annotation.x1) / 2;
			annotation.cy = annotation.y1 + (annotation.y2 - annotation.y1) / 2;
			img_canvas.children[img_canvas.children.length - 3].remove();
			img_canvas.children[img_canvas.children.length - 1].remove();
			annotation.data.push(
				`${dir1
					.match(/[0-9.]+/g)
					.slice(-1)[0]} ${annotation.cx} ${annotation.cy} ${annotation.x2 -
					annotation.x1} ${annotation.y2 - annotation.y1}`
			);
			annotation.x1 = annotation.y1 = annotation.x2 = annotation.y2 = annotation.cx = annotation.cy = 0;
			annotation.p2 = undefined;
			annotation.p1.x = annotation.p1.y = 0;
			ptcc_box.style.backgroundColor = css_om2col("lg3");

			ok_btn.innerHTML = `続ける:${ok_btn_sct_text}`;
			send_btn.setAttribute("aria-disabled", "false");
		}
	} else {
		annotation.p1 = new PointCircle(0, 0, img_canvas);
		ok_btn.innerHTML = ok_btn_base_text;
		send_btn.setAttribute("aria-disabled", "true");
		ptcc_box_count++;
		ptcc_box = create_div("ptcc-box" + String(ptcc_box_count), "ptcc-box", img_canvas);
	}
});
send_btn.addEventListener("click", function() {
	if (send_btn.getAttribute("aria-disabled") == "true") return;
	exist_obj(loading_show, true);
	const __data = {
		base_url: base_url,
		dir0: dir0,
		dir1: dir1,
		dir2: dir2,
		dir_json: json_dir,
		dir_text: text_dir,
		num: String(file_number),
		text: annotation.data.join("\n"),
		json: JSON.stringify({ edit: "end" })
	};
	fetch(`${script_php_url}?nocache=${Math.random() * 19194545}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8"
		},
		body: JSON.stringify(__data)
	}).then(() => {
		GLOBAL_FLAG = true;
		//alert("ページをリロードします");
		s_json_set("info", [true_dir1, json_dir, dir2, file_number, current_color_tf]);
		__INFO__ = s_json_parse("info");
		location.reload();
	});
});
delete_btn.addEventListener("click", function() {
	if (delete_btn.getAttribute("aria-disabled") == "true") return;
	if (annotation.data.length > 0) {
		annotation.data.splice(annotation.data.length - 1, 1);
		img_canvas.children[img_canvas.children.length - 1].remove();
	}
});
stop_btn.addEventListener("click", function() {
	if (stop_btn.getAttribute("aria-disabled") == "true") return;
	const edit_data = {
		base_url: base_url,
		dir0: dir0,
		dir1: dir1,
		dir2: dir2,
		dir_json: json_dir,
		dir_text: text_dir,
		num: String(file_number),
		text: "change-text",
		json: JSON.stringify({ edit: "none" })
	};
	fetch(`${script_php_url}?nocache=${Math.random() * 19194545}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8"
		},
		body: JSON.stringify(edit_data)
	}).then(() => {
		location.replace("https://www.google.co.jp/");
	});
});
window.addEventListener("beforeunload", function() {
	if (GLOBAL_FLAG == false) {
		const edit_data = {
			base_url: base_url,
			dir0: dir0,
			dir1: dir1,
			dir2: dir2,
			dir_json: json_dir,
			dir_text: text_dir,
			num: String(file_number),
			text: "change-text",
			json: JSON.stringify({ edit: "none" })
		};
		fetch(`${script_php_url}?nocache=${Math.random() * 19194545}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8"
			},
			body: JSON.stringify(edit_data)
		});
	}
});
function draw() {
	if (annotation.data.length > 0 && ok_btn.innerHTML != ok_btn_base_text) {
		delete_btn.setAttribute("aria-disabled", "false");
	} else {
		delete_btn.setAttribute("aria-disabled", "true");
	}
	if (mousePressed) {
		if (annotation.p2 == undefined) {
			annotation.p1.gotoxy(
				mouseX,
				mouseY,
				ptcc_box,
				img_canvas.style.width,
				img_canvas.style.height,
				true
			);
			ok_btn.setAttribute("aria-disabled", "false");
		} else {
			annotation.p2.gotoxy(
				mouseX,
				mouseY,
				ptcc_box,
				num_to_px(annotation.p1.x),
				num_to_px(annotation.p1.y),
				false
			);
		}
	}
}
/*
	これは先生のせいで使わなくなったコードたちだよ、供養しないと、、、うぅ、、、（泣）
		const sel1 = document.getElementById("n_dir-id");
		const sel2 = document.createElement("select");
		for (let i = 0; i < data.dirs.length; i++) {
			const opt = document.createElement("option");
			opt.value = i;
			opt.innerHTML = String(data.dir_base_name);
			sel1.appendChild(opt);
			sel2.id = `${data.dirs[i].name}-id`;
			if (i > 0) sel2.style.display = "none";
			const box = document.getElementById("images_select_box-id");
			box.appendChild(sel2);
			for (let j = 0; j < Number(data.dirs[i].n_of); j++) {
				const opt2 = document.createElement("option");
				opt2.value = j;
				opt2.innerHTML = `${data.dirs[i].name + String(j + 1)}.png`;
				sel2.appendChild(opt2);
			}
		}
		sel1.addEventListener("change", function() {
			for (let i = 0; i < box.children.length; i++) {
				if (Number(sel1.selected.value) == i) {
					console.error(sel1.selected.innerHTML);
					dir1 = sel1.selected.innerHTML;
					dir2 = data.dirs[sel1.selected.value].name;
					box.children[i].style.display = "block";
				} else {
					box.children[i].style.display = "none";
				}
			}
		});
		sel2.addEventListener("change", function() {
			console.error(sel1.ariaSelected.innerHTML);
			const num = Number(sel2.selected.value) + 1;
			const data = {
				dir0: dir0,
				dir1: dir1,
				dir2: dir2,
				dir_json: String(data.json_dir_name),
				dir_text: String(data.text_dir_name),
				num: num,
				text: "",
				json: JSON.stringify({ edit: "now" })
			};
			fetch(`${script_php_url}?nocache=${Math.random() * 19194545}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8"
				},
				body: JSON.stringify(data)
			}).then(() => {
				fetch(`${base_url}/${dir0}/${dir1}/${data.image_dir_name}/${dir2} (${num}).png`, {
					method: "GET"
				})
					.then(res => res.blob())
					.then(blob => {
						img = document.createElement("img");
						img.src = URL.createObjectURL(blob);
						img.onload = function() {
							[[img.style.width, img.style.height], error_show_clone.style.display] = width_height_repair2(
								img.width,
								img.height,
								Number(px_to_num(image_frame.style.width) / px_to_num(image_frame.style.height))
							);
							image_frame.appendChild(img);
							info_frame.style.display = "none";
							image_frame.style.display = "block";
						};
					});
			});
		});
		*/
