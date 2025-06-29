class PointCircle {
	constructor(x, y, pt) {
		this.x = x;
		this.y = y;
		this.pt = pt;
		this.obj = document.createElement("div");
		this.obj.className = "my-div point-circle";
		this.pt.appendChild(this.obj);
		this.obj = this.pt.lastElementChild;
		this.gotoxy(this.x, this.y, "", "", "", "");
	}
	gotoxy(x, y, tar, bx, by, tf) {
		if (x != "n") this.x = x;
		this.obj.style.left = num_to_px(this.x);
		if (y != "n") this.y = y;
		this.obj.style.top = num_to_px(this.y);
		if (tar != "") {
			if (tf) {
				tar.style.left = num_to_px(this.x);
				tar.style.top = num_to_px(this.y);
			}
			tar.style.width = num_to_px(abs(this.x - px_to_num(bx)));
			tar.style.height = num_to_px(abs(this.y - px_to_num(by)));
		}
	}
}
