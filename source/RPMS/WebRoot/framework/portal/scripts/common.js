/**
 * 该函数用来生成联动下拉框
 * 
 * @param {}
 *            sql
 * @param {}
 *            sel 要生成下拉框的Object对象
 * @param {}
 *            flag 是否生成全部或者空Option
 * @param {}
 *            blank true：生成空Option false：生成全部Option
 */
function selectItem(sql, sel, flag, blank) {
	var curURL = "";
	curURL = getContextPath() + "/bi/getSelectItem.html?sql=" + sql;

	var xmlhttp =null;
	
	if(window.XMLHttpRequest){
	   xmlhttp=new window.XMLHttpRequest();
 	}
 	else if(window.ActiveXObject){
	   xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
 	}

	xmlhttp.open("POST", curURL, false);
	xmlhttp.send();
	var str = xmlhttp.responseText;

	var items = strToArray(str, "$");
	if (items.length > 0) {
		clearOption(sel);
	}
	if (flag) {
		if (blank) {
			var selItem = new Option(" ", // The text property
					"", // The value property
					true, // The defaultSelected property
					false);
		} else {
			var selItem = new Option("全部", // The text property
					"", // The value property
					true, // The defaultSelected property
					false);
		}
		sel.options[sel.options.length] = selItem;
	}
	for (var i = 0; i < items.length; i++) {
		var item = items[i];

		if (item != "" && item.length > 2) {
			var values = item.split(",");
			var selItem = new Option(values[0], // The text property
					values[1], // The value property
					true, // The defaultSelected property
					false);
			sel.options[sel.options.length] = selItem;
		}
	}

}

// 将一个用$分隔的字符串转换成一个数组。
function strToArray(str, s) {
	var re = str.split(s);
	return re;
}

// 清空给定的下拉列表
function clearOption(obj) {
	obj.options.length = 0
}

/**
 * 获取应用的上下文
 * 
 * @return {}
 */
function getContextPath() {
	var contextPath = document.location.pathname;
	var index = contextPath.substr(1).indexOf("/");
	contextPath = contextPath.substr(0, index + 1);
	delete index;
	return contextPath;
}