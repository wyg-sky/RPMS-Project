//下拉框过滤
Array.prototype.filter = function(kw) {
	var arr = [], arrIndex = 0;
	for (var i = 0; i < this.length; i++)
		if (this[i].lastIndexOf(kw) >= 0)
			arr[arrIndex++] = this[i];
	return arr;
}

function $(Id) {
	if ('object' == typeof(Id))
		return Id;
	else if ('string' == typeof(Id))
		return document.getElementById(Id);
	else
		return null;
}

function getAbsPos(o) {
	var p = {};
	p.x = o.offsetLeft;
	p.y = o.offsetTop;
	while (o = o.offsetParent) {
		p.x += o.offsetLeft;
		p.y += o.offsetTop;
	}
	return p;
}
var mousePosition = "over";
function SelectAutoComplete(selId, txtId) {
	this.sel = document.getElementById(selId);
	this.txt = document.getElementById(txtId);
	this.oldValue = this.txt.value;
	this.options = [];
//	for (var i = 0; i < this.sel.options.length; i++) {
//		this.options[this.options.length] = this.sel.options[i].text;
//	}
	this.pop = document.createElement('div');
	var p = getAbsPos(this.sel);
	this.pop.style.left = p.x + 'px';
	this.pop.style.top = p.y + this.sel.offsetHeight + 1 + 'px';
	this.pop.className = 'selectautocomplete';
	document.body.appendChild(this.pop);
	this.addIE6Iframe = function() {
		if (document.all && /msie 6/i.test(navigator.userAgent)) {
			var ifr = document.createElement('iframe');
			ifr.src = 'javascript:false';
			ifr.style.position = 'absolute';
			ifr.style.position.visibility = 'inherit';
			ifr.style.top = ifr.style.left = '0px';
			ifr.style.width = this.pop.offsetWidth + 'px';
			ifr.style.height = this.pop.offsetHeight + 'px';
			ifr.style.zIndex = -1;
			ifr.style.filter = 'alpha(opacity=0)';
			this.pop.appendChild(ifr);
		}
	}
	this.autocomplete = function() {
		if (this.txt.value == '')
			this.pop.style.display = 'none';
		else {
			this.options = [];
			for (var i = 0; i < this.sel.options.length; i++) {
		        this.options[this.options.length] = this.sel.options[i].text;
			}
			var arr = this.options.filter(this.txt.value), dv;
			if (arr.length == 0)
				this.pop.style.display = 'none';
			else {
				while (this.pop.firstChild)
					this.pop.removeChild(this.pop.firstChild);
				this.pop.style.width = 'auto';
				for (var i = 0; i < arr.length; i++) {
					dv = document.createElement('div');
					dv.innerHTML = arr[i];
					dv.onmouseover = function() {
						this.className = 'focus';
						mousePosition = "over";
					};
					dv.onmouseout = function() {
						this.className = '';
						mousePosition = "out";
					};
					dv.onclick = (function(me) {
						return function() {
							me.setSelected(this.innerText);
						}
					})(this);
					this.pop.appendChild(dv);
				}
				this.pop.style.display = 'block';
				if (this.pop.offsetWidth < this.sel.offsetWidth)
					this.pop.style.width = this.sel.offsetWidth - 8 + 'px';
				this.addIE6Iframe();
			}
		}
	}
	this.setSelected = function(t) {
		//    	var temp = t.replace(/-/g,"");alert("00"+t+"00");
		for (var i = 0; i < this.sel.options.length; i++) {
			if (t == this.sel.options[i].text) {
				this.sel.selectedIndex = i;//alert("00"+this.sel.options[i].text.replace(/-/g, "")+"00");
				this.txt.value = t;
				this.oldValue = this.txt.value;
				break;
			}
		}
		if(this.oldValue != this.txt.value) {
			this.txt.value = this.oldValue;
		}
		this.pop.style.display = 'none';
		this.sel.onchange();
	}
	this.txt.onblur = (function(me) {
		return function() {
			if(mousePosition == "out") {
			    me.setSelected(me.txt.value);
			}
		}
	})(this);
	this.txt.onfocus = (function(me) {
		return function() {
			//是不是对文本框里的数据进行替换
			if(me.sel.reg) {
			    me.txt.value = me.txt.value.replace(eval(me.sel.reg), "");
			}
			mousePosition = "out";
			me.txt.select();
//			me.autocomplete();
		}
	})(this);
	this.txt.onkeyup = this.txt.onclick = (function(me) {
		return function() {
			mousePosition = "out";
			me.autocomplete();
		}
	})(this);
}
// 可输入先拉框
function combox(obj, select) {
	this.obj = obj
	this.id = select;
	this.select = document.getElementById(select);
	/* 要转换的下拉框 */
}

/* 初始化对象 */
combox.prototype.init = function() {
	var inputbox = "<input   id='combox_" + this.id + "'   name='combox_"
			+ this.name + "'   onchange='" + this.obj + ".find()'   onblur='"
			+ this.obj + ".addItem(this.value)'   "
	inputbox += "style='position:absolute;width:"
			+ (this.select.offsetWidth - 16) + ";height:"
			+ this.select.offsetHeight + ";left:" + getL(this.select) + ";top:"
			+ getT(this.select) + "'>"
	document.write(inputbox)
	with (this.select.style) {
		left = getL(this.select)
		top = getT(this.select)
		position = "absolute"
		width = this.select.offsetWidth
		height = this.select.offsetHeight
		clip = "rect(0   " + (this.select.offsetWidth) + "   "
				+ this.select.offsetHeight + "   "
				+ (this.select.offsetWidth - 18) + ")"
		/* 切割下拉框 */
	}
	this.select.onchange = new Function(this.obj + ".change()")
	this.select.onresize = new Function(this.obj + ".resize()")
	this.change()

}
//window : onresize = function() {
//	location.reload()
//}
/* 初始化结束 */

// //////对象事件定义///////
combox.prototype.find = function() {
	/* 当搜索到输入框的值时,下拉框自动定位 */
	var inputbox = document.getElementById("combox_" + this.id)
	with (this.select) {
		for (i = 0; i < options.length; i++)
			if (options[i].text.indexOf(inputbox.value) == 0) {
				selectedIndex = i
				this.change();
				break;
			}
	}
}

combox.prototype.change = function() {
	/* 定义下拉框的onchange事件 */
	var inputbox = document.getElementById("combox_" + this.id)
	inputbox.value = this.select.options[this.select.selectedIndex].text;
	with (inputbox) {
		select();
		focus()
	};
}

combox.prototype.addItem = function(str) {
	var findText = false
	for (i = 0; i < this.select.length; i++)
		if (this.select.options[i].text.indexOf(str) == 0) {
			findText = true;
			break
		}
	if (!findText) {
		this.select.options[this.select.length] = new Option(str, str)
		this.select.value = str
	}
}

// //////对象事件结束///////

/* 公用定位函数(获取控件绝对坐标) */
function getL(e) {
	var l = e.offsetLeft;
	while (e = e.offsetParent)
		l += e.offsetLeft;
	return l
}
function getT(e) {
	var t = e.offsetTop;
	while (e = e.offsetParent)
		t += e.offsetTop;
	return t
}
