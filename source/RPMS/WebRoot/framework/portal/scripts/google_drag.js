// 工具类，使用Util的命名空间，方便管理
var Util = new Object();
var nowDragging;
// 获取http header里面的UserAgent，浏览器信息
Util.getUserAgent = navigator.userAgent;

// 是否是Gecko核心的Browser，比如Mozila、Firefox
Util.isGecko = Util.getUserAgent.indexOf("Gecko") != -1;

// 是否是Opera
Util.isOpera = Util.getUserAgent.indexOf("Opera") != -1;

// 获取一个element的offset信息，其实就是相对于Body的padding以内的绝对坐标
// 后面一个参数如果是true则获取offsetLeft，false则是offsetTop
// 关于offset、style、client等坐标的定义参考dindin的这个帖子：http://www.jroller.com/page/dindin/?anchor=pro_javascript_12
Util.getOffset = function(el, isLeft) {

	var retValue = 0;
	while (el != null) {
		retValue += el["offset"+ (isLeft ?"Left":"Top")];
		el = el.offsetParent;
	}
	return retValue;
};

// 将一个function（参数中的funcName是这个fuction的名字）绑定到一个element上，并且以这个element的上下文运行，其实是一种继承，这个可以google些文章看看
Util.bindFunction = function(el, fucName) {
	return function() {
		return el[fucName].apply(el, arguments);
	};
};

// 重新计算所有的可以拖拽的element的坐标，对同一个column下面的可拖拽图层重新计算它们的高度而得出新的坐标，防止遮叠
// 计算出来的坐标记录在pagePosLeft和pagePosTop两个属性里面
Util.re_calcOff = function(el) {
	for ( var i = 0; i < Util.dragArray.length; i++) {
		var ele = Util.dragArray[i];
		ele.elm.pagePosLeft = Util.getOffset(ele.elm, true);
		ele.elm.pagePosTop = Util.getOffset(ele.elm, false);
	}

	var nextSib = el.elm.nextSibling;
	while (nextSib) {
		nextSib.pagePosTop -= el.elm.offsetHeight;
		nextSib = nextSib.nextSibling;
	}
};

// 隐藏Google Ig中间那个table，也就是拖拽的容器，配合show一般就是刷新用，解决一些浏览器的怪癖
Util.hide = function() {
	Util.rootElement.style.display ="none";
};

// 显示Google Ig中间那个table，解释同上
Util.show = function() {
	Util.rootElement.style.display ="";
};

// 移动时显示的占位虚线框
ghostElement = null;

// 获取这个虚线框，通过dom动态生成
getGhostElement = function() {
	if (!ghostElement) {
		ghostElement = document.createElement("DIV");
		ghostElement.className ="modbox";
		ghostElement.backgroundColor ="";
		ghostElement.style.border ="2px dashed #aaa";
		ghostElement.innerHTML ="&nbsp;";
	}
	return ghostElement;
};

// 初始化可以拖拽的Element的函数，与拖拽无关的我去掉了
function draggable(el) {
	// 公用的开始拖拽的函数
	this._dragStart = start_Drag;
	// 公用的正在拖拽的函数
	this._drag = when_Drag;
	// 公用的拖拽结束的函数
	this._dragEnd = end_Drag;
	// 这个函数主要用来进行拖拽结束后的dom处理
	this._afterDrag = after_Drag;
	// 是否正在被拖动，一开始当然没有被拖动
	this.isDragging = false;
	// 将这个Element的this指针注册在elm这个变量里面，方便在自己的上下文以外调用自己的函数等，很常用的方法
	this.elm = el;
	// 触发拖拽的Element，在这里就是这个div上显示标题的那个div
	this.header = document.getElementById(el.id +"_h");
	// 对于有iframe的element拖拽不同，这里检测一下并记录
	this.hasIFrame = this.elm.getElementsByTagName("IFRAME").length > 0;
	// 如果找到了header就绑定drag相关的event
	if (this.header) {
		// 拖拽时的叉子鼠标指针
		this.header.style.cursor ="move";
		// 将函数绑定到header和element的this上，参照那个函数的说明
		Drag.init(this.header, this.elm);
		// 下面三个语句将写好的三个函数绑定给这个elemnt的三个函数钩子上，也就实现了element从draggable继承可拖拽的函数
		this.elm.onDragStart = Util.bindFunction(this,"_dragStart");
		this.elm.onDrag = Util.bindFunction(this,"_drag");
		this.elm.onDragEnd = Util.bindFunction(this,"_dragEnd");
	}
};

// 下面就是draggable里面用到的那4个function
// 公用的开始拖拽的函数

function start_Drag() {
	// 重置坐标，实现拖拽以后自己的位置马上会被填充的效果
	Util.re_calcOff(this);
	// 记录原先的邻居节点，用来对比是否被移动到新的位置
	this.origNextSibling = this.elm.nextSibling;
	// 获取移动的时候那个灰色的虚线框
	var _ghostElement = getGhostElement();
	// 获取正在移动的这个对象的高度
	var offH = this.elm.offsetHeight;
	if (Util.isGecko) {
		// 修正gecko引擎的怪癖吧
		offH -= parseInt(_ghostElement.style.borderTopWidth) * 2;
	}

	// 获取正在移动的这个对象的宽度
	var offW = this.elm.offsetWidth;
	// 获取left和top的坐标
	var offLeft = Util.getOffset(this.elm, true);
	var offTop = Util.getOffset(this.elm, false);
	// 防止闪烁，现隐藏
	Util.hide();

	// 将自己的宽度记录在style属性里面
	this.elm.style.width = offW +"px";
	// 将那个灰框设定得与正在拖动的对象一样高，比较形象
	_ghostElement.style.height = offH +"px";
	// 把灰框放到这个对象原先的位置上
	this.elm.parentNode.insertBefore(_ghostElement, this.elm.nextSibling);
	// 由于要拖动必须将被拖动的对象从原先的盒子模型里面抽出来，所以设定position为absolute，这个可以参考一下css布局方面的知识
	this.elm.style.position ="absolute";
	// 设置zIndex，让它处在最前面一层，当然其实zIndex=100是让它很靠前，如果页面里有zIndex>100的，那……
	this.elm.style.zIndex = 100;
	// 由于position=absolute了，所以left和top实现绝对坐标定位，这就是先前计算坐标的作用，不让这个模型乱跑，要从开始拖动的地方开始移动
	this.elm.style.left = offLeft +"px";
	this.elm.style.top = offTop +"px";
	// 坐标设定完毕，可以显示了，这样就不会闪烁了
	Util.show();

	// 这里本来有个ig_d.G，没搞明白干什么用的，不过没有也可以用，谁知道麻烦告诉我一声，不好意思
	// 还没有开始拖拽，这里做个记号
	this.isDragging = false;
	
	return false;
};

// 在拖拽时的相应函数，由于绑定到鼠标的move这个event上，所以会传入鼠标的坐标clientX, clientY
function when_Drag(clientX, clientY) {
	// 刚开始拖拽的时候将图层变透明，并标记为正在被拖拽
	if (!this.isDragging) {
		this.elm.style.filter ="alpha(opacity=70)";
		this.elm.style.opacity = 0.7;
		this.isDragging = true;
	}

	// 被拖拽到的新的column（当然也可以是原来那个）
	var found = null;
	// 最大的距离，可能是防止溢出或者什么bug
	var max_distance = 100000000;
	// 遍历所有的可拖拽的element，寻找离当前鼠标坐标最近的那个可拖拽元素，以便后面插入
	for ( var i = 0; i < Util.dragArray.length; i++) {
		var ele = Util.dragArray[i];
		// 利用勾股定理计算鼠标到遍历到的这个元素的距离
		var distance = Math.sqrt(Math.pow(clientX - ele.elm.pagePosLeft, 2)
				+ Math.pow(clientY - ele.elm.pagePosTop, 2));
		// 自己已经浮动了，所以不计算自己的
		if (ele == this) {
			continue;
		}

		// 如果计算失败继续循环
		if (isNaN(distance)) {
			continue;
		}

		// 如果更小，记录下这个距离，并将它作为found
		if (distance < max_distance) {
			max_distance = distance;
			found = ele;
		}
	}

	// 准备让灰框落脚
	var _ghostElement = getGhostElement();

	// 如果找到了另外的落脚点
	if (found != null && _ghostElement.nextSibling != found.elm) {
		// 找到落脚点就先把灰框插进去，这就是我们看到的那个灰框停靠的特效，有点像吸附的感觉，哈哈
		found.elm.parentNode.insertBefore(_ghostElement, found.elm);
		if (Util.isOpera) {
			// Opera的现实问题，要隐藏/显示后才能刷新出变化
			document.body.style.display ="none";
			document.body.style.display ="";
		}
	}
};

// 拖拽完毕
function end_Drag() {

	// 拖拽完毕后执行后面的钩子，执行after_Drag()，如果布局发生了变动了就记录到远程服务器，保存你拖拽后新的布局顺序
	if (this._afterDrag() && (Drag.obj.id== nowDragging.id)) {
		var order = {};
		// 所拖动元素的ID
		order.id = nowDragging.id;
		// 原相邻下一个元素ID 最后一个元素ID为空
		// order.oid = Util.dragArray[i].origNextSibling.id;
		// 退拽后下一个相邻元素ID 最后一个元素ID为空
		order.nnextid = nowDragging.nextSibling.id;
		// 新父节点ID
		order.pid = nowDragging.parentElement.id;

		$.ajax({
			type : 'POST',
			url : 'changeOrder.html',
			data : order
		});
		// remote call to save the change
	}
	return true;
};

// 拖拽后的执行钩子

function after_Drag() {
	nowDragging = this.elm;
	var returnValue = false;
	// 防止闪烁
	Util.hide();
	// 把拖拽时的position=absolute和相关的那些style都消除
	this.elm.style.position ="";
	this.elm.style.width ="";
	this.elm.style.zIndex ="";
	this.elm.style.filter ="";
	this.elm.style.opacity ="";

	// 获取灰框
	var ele = getGhostElement();
	// 如果现在的邻居不是原来的邻居了
	if (ele.nextSibling != this.origNextSibling) {
		// 把被拖拽的这个节点插到灰框的前面
		ele.parentNode.insertBefore(this.elm, ele.nextSibling);
		// 标明被拖拽了新的地方
		returnValue = true;
	}

	// 移除灰框，这是这个灰框的生命周期应该就结束了
	ele.parentNode.removeChild(ele);

	// 修改完毕，显示
	Util.show();

	if (Util.isOpera) {
		// Opera的现实问题，要隐藏/显示后才能刷新出变化
		document.body.style.display ="none";
		document.body.style.display ="";
	}
	return returnValue;
};

// 可拖拽Element的原形，用来将event绑定到各个钩子，这部分市比较通用的，netvibes也是基本完全相同的实现
// 这部分推荐看dindin的这个，也会帮助理解，http://www.jroller.com/page/dindin/?anchor=pro_javascript_12
var Drag = {
	// 对这个element的引用，一次只能拖拽一个Element
	obj : null,
	// element是被拖拽的对象的引用，elementHeader就是鼠标可以拖拽的区域
	init : function(elementHeader, element) {
		// 将start绑定到onmousedown事件，按下鼠标触发start
		elementHeader.onmousedown = Drag.start;
		// 将element存到header的obj里面，方便header拖拽的时候引用
		elementHeader.obj = element;
		// 初始化绝对的坐标，因为不是position=absolute所以不会起什么作用，但是防止后面onDrag的时候parse出错了
		if (isNaN(parseInt(element.style.left))) {
			element.style.left ="0px";
		}

		if (isNaN(parseInt(element.style.top))) {
			element.style.top ="0px";
		}

		// 挂上空Function，初始化这几个成员，在Drag.init被调用后才帮定到实际的函数，可以参照draggable里面的内容
		element.onDragStart = new Function();
		element.onDragEnd = new Function();
		element.onDrag = new Function();
	},

	// 开始拖拽的绑定，绑定到鼠标的移动的event上
	start : function(event) {
		var element = Drag.obj = this.obj;
		// 解决不同浏览器的event模型不同的问题
		event = Drag.fixE(event);
		// 看看是不是左键点击
		if (event.which != 1) {
			// 除了左键都不起作用
			return true;
		}

		// 参照这个函数的解释，挂上开始拖拽的钩子
		element.onDragStart();
		// 记录鼠标坐标
		element.lastMouseX = event.clientX;
		element.lastMouseY = event.clientY;
		// 将Global的event绑定到被拖动的element上面来
		document.onmouseup = Drag.end;
		document.onmousemove = Drag.drag;
		return false;
	},

	// Element正在被拖动的函数
	drag : function(event) {
		// 解决不同浏览器的event模型不同的问题
		event = Drag.fixE(event);
		// 看看是不是左键点击
		if (event.which == 0) {
			// 除了左键都不起作用
			return Drag.end();
		}

		// 正在被拖动的Element
		var element = Drag.obj;
		// 鼠标坐标
		var _clientX = event.clientY;
		var _clientY = event.clientX;
		// 如果鼠标没动就什么都不作
		if (element.lastMouseX == _clientY && element.lastMouseY == _clientX) {
			return false;
		}

		// 刚才Element的坐标
		var _lastX = parseInt(element.style.top);
		var _lastY = parseInt(element.style.left);
		// 新的坐标
		var newX, newY;
		// 计算新的坐标：原先的坐标+鼠标移动的值差
		newX = _lastY + _clientY - element.lastMouseX;
		newY = _lastX + _clientX - element.lastMouseY;
		// 修改element的显示坐标
		element.style.left = newX +"px";
		element.style.top = newY +"px";

		// 记录element现在的坐标供下一次移动使用
		element.lastMouseX = _clientY;
		element.lastMouseY = _clientX;

		// 参照这个函数的解释，挂接上Drag时的钩子
		element.onDrag(newX, newY);
		return false;
	},

	// Element正在被释放的函数，停止拖拽
	end : function(event) {
		// 解决不同浏览器的event模型不同的问题
		event = Drag.fixE(event);
		// 解除对Global的event的绑定
		document.onmousemove = null;
		document.onmouseup = null;

		// 先记录下onDragEnd的钩子，好移除obj
		var _onDragEndFuc = Drag.obj.onDragEnd();
		// 拖拽完毕，obj清空
		Drag.obj = null;
		return _onDragEndFuc;
	},

	// 解决不同浏览器的event模型不同的问题
	fixE : function(ig_) {
		if (typeof ig_ =="undefined") {
			ig_ = window.event;
		}

		if (typeof ig_.layerX =="undefined") {
			ig_.layerX = ig_.offsetX;
		}

		if (typeof ig_.layerY =="undefined") {
			ig_.layerY = ig_.offsetY;
		}

		if (typeof ig_.which =="undefined") {
			ig_.which = ig_.button;
		}

		return ig_;
	}
};

// 下面是初始化的函数了，看看上面这些东西怎么被调用
var _IG_initDrag = function(el) {
	// column那个容器，在google里面就是那个table布局的tbody，netvibes用的<div>
	Util.rootElement = el;
	var trs = Util.rootElement.tBodies[0].rows.length;
	var counter = 0;
	// 用来存取可拖拽的对象
	Util.dragArray = new Array();
	for(var n = 0; n < trs; n++) {
		// 这个tbody的行
		Util._rows = Util.rootElement.tBodies[0].rows[n];
	
		// 列，google是3列，其实也可以更多
		Util.column = Util._rows.cells;
	
		for ( var i = 0; i < Util.column.length; i++) {
	
			// 搜索所有的column
			var ele = Util.column[i];
	
			for ( var j = 0; j < ele.childNodes.length; j++) {
				// 搜索每一column里面的所有element
				var ele1 = ele.childNodes[j];
				// 如果是div就把它初始化为一个draggable对象
				if (ele1.tagName =="DIV") {
					Util.dragArray[counter] = new draggable(ele1);
					counter++;
				}
			}
		}
	}
};

// google的页面里可以拖动的部分的id是"t_1"
// 挂载到onload，载入完毕执行。不过实际上google没有用onload。
// 而是写在页面最下面，异曲同工吧，也许直接写在页面是种怪癖，或者也有可能是兼容性考虑。
// 请将下面两条被注释掉的代码加，到你自己下载的一个google ig页面里面，把里面的所有其余script删除，挂上这个js也可以拖拽了，哈哈
// _table=document.getElementById("t_1");
// window.onload = _IG_initDrag(_table);
// 其实看懂这些代码对学习javascript很有益，希望对大家能有帮助

