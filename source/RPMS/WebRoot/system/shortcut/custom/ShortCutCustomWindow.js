ShortCutCustomWindow = function(config){
	Ext.apply(this,config);
	
	var html = '<table align="center"><tr height="22">'
			+ '<td align="center"><font color="red" size="2">未授权的快捷方式</font></td><td></td><td align="center"><font color="red" size="2">已授权的快捷方式</font></td></tr><tr>'
			+ '<td><select name="unSelect" id="unSelect" multiple="multiple" style="height:230px;width:150px;" size=2 ondblclick="fromUnSelectToOnSelect()">'
			+ '</select></td>'
			+ '<td><table width="70px">'
			+ '<tr><td align="center" height="35px"><a href="javascript:moveToTopOfOnSelect();"><img src="images/shortcut/custom/move_top.png" width="22" height="22" title="置顶"></a></td></tr>'
			+ '<tr><td align="center" height="35px"><a href="javascript:moveUpOfOnSelect();"><img src="images/shortcut/custom/move_up.gif" width="16" height="16" title="上移"></a></td></tr>'
			+ '<tr><td align="center" height="35px"><a href="javascript:fromOnSelectToUnSelect(0);"><img src="images/shortcut/custom/move_left.gif" width="16" height="16" title="左移"></a></td></tr>'
			+ '<tr><td align="center" height="35px"><a href="javascript:fromUnSelectToOnSelect(0);"><img src="images/shortcut/custom/move_right.gif" width="16" height="16" title="右移"></a></td></tr>'
			+ '<tr><td align="center" height="35px"><a href="javascript:moveDownOfOnSelect();"><img src="images/shortcut/custom/move_down.gif" width="16" height="16" title="下移"></a></td></tr>'
			+ '<tr><td align="center" height="35px"><a href="javascript:moveToBottomOfOnSelect();"><img src="images/shortcut/custom/move_bottom.png" width="22" height="22" title="置底"></a></td></tr>'
			+ '</table></td>'
			+ '<td><select name="onSelect" id="onSelect" multiple="multiple" style="height:230px;width:150px;" size=2 ondblclick="fromOnSelectToUnSelect()">'
			+ '</select></td></tr>'
			+ '<tr><td align="center"><a href="javascript:fromUnSelectToOnSelectAll();"><img src="images/shortcut/custom/allmove_right.png" width="22" height="22" title="全部右移"></a></td><td></td>'
			+ '<td align="center"><a href="javascript:fromOnSelectToUnSelectAll();"><img src="images/shortcut/custom/allmove_left.png" width="22" height="22" title="全部左移"></a></td></table>';
	var style = "cls:'x-panel-inline-icon' width:16px;height:16px;background-repeat:no-repeat;background-position:0 0;vertical-align:middle;margin-right:4px;margin-top:-1px;margin-bottom:-1px;";
	ShortCutCustomWindow.superclass.constructor.call(this, {
		title : '<img src="images/head/shortcut.png" style="'+style+'">用户['+this.userName+']快捷方式自定义',
        layout : 'fit',
        html : html,
        width : 450,
        height : 350,
        border : false,
        closeAction : 'close',
        resizable : false,
        buttonAlign : 'center',
        modal : true,
        plain : true,
        buttons : [{
    		text : '保存',
    		width : 55,
    		scope : this,
    		iconCls : 'save-icon',
    		handler : this.submitForm
    	},{
    		text : '重置',
    		width : 55,
    		scope : this,
    		iconCls : 'reset-icon',
    		handler : function(){
    			this.loadData({userId:this.userId, systemId : this.systemId});
    		}
    	},{
    		text : '关闭',
    		width : 55,
    		scope : this,
    		iconCls : 'close-icon',
    		handler : this.close
    	}]
	});
	this.loadData({userId : this.userId, systemId : this.systemId});
};

Ext.extend(ShortCutCustomWindow, Ext.Window,{
	
	loadData : function(params){
		Ext.Ajax.request({
			url : 'system/listShortCutsForCustom.html',
			method : 'POST',
			params : params,
			scope : this,
			success : function(response, options) {
				var data = Ext.util.JSON.decode(response.responseText || "{}").root;
				var t = Ext.util.JSON.decode(response.responseText || "{}").total;
				var i = 0;
				var objUn = document.getElementById('unSelect');
				var objOn = document.getElementById('onSelect');
				while(objUn.options.length > 0){
					objUn.options.remove(objUn.options.length-1);
				}
				while(objOn.options.length > 0){
					objOn.options.remove(objOn.options.length-1);
				}
				while(data[i] != null){
					var datai = data[i];
					if(datai[2] == '0'){
						objUn.add(new Option(datai[1], datai[0]));
					} else {
						objOn.add(new Option(datai[1], datai[0]));
					}
					i = i + 1;
				}
			},
			failure : function(response, options) {
				Ext.MessageBox.show({
					title : '错误',
					msg : "载入数据失败!<br>",
					buttons : Ext.MessageBox.OK,
					fn : function(){},
					icon : Ext.MessageBox.ERROR,
					scope : this
				});
			}
		});
	},
	
	submitForm : function(){
		var objOn = document.getElementById('onSelect');
		var i = 0;
		var ids = '';
		while(objOn.options[i] != null){
			ids = ids + objOn.options[i].value + ',';
			i = i + 1;
		}
		Ext.Ajax.request({
			url : 'system/saveShortCutsForUser.html',
			method : 'POST',
			params : {shortCutIds : ids, userId : this.userId, systemId : this.systemId},
			scope : this,
			success : function(response, options) {
				Ext.MessageBox.alert("提示", "保存成功！");
				this.close();
			},
			failure : function(response, options) {
				Ext.MessageBox.show({
					title : '错误',
					msg : "保存失败!<br>",
					buttons : Ext.MessageBox.OK,
					fn : function(){},
					icon : Ext.MessageBox.ERROR,
					scope : this
				});
			}
		});
	}
});

//左移，从已选框中将数据移至未选框中,意义为将一个快捷方式从桌面移除
function fromOnSelectToUnSelect(type){
	var objOn = document.getElementById('onSelect');
	var objUn = document.getElementById('unSelect');
	if(type == '0' && objOn.selectedIndex == '-1'){
		Ext.MessageBox.alert("提示", "未选中数据，无法左移！");
		return;
	}
	var i = 0;
	while(i < objUn.options.length){
		objUn.options[i].selected = false;
		i = i + 1;
	}
	i = 0;
	while(i < objOn.options.length){
		if(objOn.options[i].selected){
			var val = objOn.options[i].value;
			var text = objOn.options[i].text;
			objUn.add(new Option(text,val));
			objUn.options[objUn.options.length-1].selected = true;
		}
		i = i + 1;
	}
	while(i > 0){
		if(objOn.options[i-1].selected){
			objOn.options.remove(i-1);
		}
		i = i - 1;
	}
};

//全部左移
function fromOnSelectToUnSelectAll(){
	var objOn = document.getElementById('onSelect');
	var length = objOn.options.length;
	if(length == 0){
		Ext.MessageBox.alert("提示", "无数据，无法全部左移！");
		return;
	}
	var i = 0;
	while(i < length){
		objOn.options[i].selected = true;
		i = i + 1;
	}
	this.fromOnSelectToUnSelect(1);
};

//右移，从未选框中将数据移至已选框中,意义为添加一个快捷方式至桌面
function fromUnSelectToOnSelect(type){
	var objUn = document.getElementById('unSelect');
	var objOn = document.getElementById('onSelect');
	if(type == '0' && objUn.selectedIndex == '-1'){
		Ext.MessageBox.alert("提示", "未选中数据，无法右移！");
		return;
	}
	var i = 0;
	while(i < objOn.options.length){
		objOn.options[i].selected = false;
		i = i + 1;
	}
	i = 0;
	while(i < objUn.options.length){
		if(objUn.options[i].selected){
			var val = objUn.options[i].value;
			var text = objUn.options[i].text;
			objOn.add(new Option(text,val));
			objOn.options[objOn.options.length-1].selected = true;
		}
		i = i + 1;
	}
	while(i > 0){
		if(objUn.options[i-1].selected){
			objUn.options.remove(i-1);
		}
		i = i - 1;
	}
};

//全部右移
function fromUnSelectToOnSelectAll(){
	var objUn = document.getElementById('unSelect');
	var length = objUn.options.length;
	if(length == 0){
		Ext.MessageBox.alert("提示", "无数据，无法全部右移！");
		return;
	}
	var i = 0;
	while(i < length){
		objUn.options[i].selected = true;
		i = i + 1;
	}
	this.fromUnSelectToOnSelect(1);
};

//上移，将已选框中的一条数据上移一个位置
function moveUpOfOnSelect(){
	if(this.singleSelectOrNot("上移")){
		var objOn = document.getElementById('onSelect');
		var index = objOn.selectedIndex;
		if(index == '0'){
			Ext.MessageBox.alert("提示", "已移至顶端，无法继续上移！");
		}else{
			var val = objOn.options[index].value;
			var text = objOn.options[index].text;
			
			objOn.options[index] = new Option(objOn.options[index-1].text,objOn.options[index-1].value);
			objOn.options[index-1] = new Option(text,val);
			objOn.options[index-1].selected = true;
		}
	}
};

//下移，将已选框中的一条数据下移一个位置
function moveDownOfOnSelect(){
	if(this.singleSelectOrNot("下移")){
		var objOn = document.getElementById('onSelect');
		var index = objOn.selectedIndex;
		var dis = objOn.options.length - index;
		if(dis == '1'){
			Ext.MessageBox.alert("提示", "已移至底端，无法继续下移！");
		}else{
			var val = objOn.options[index].value;
			var text = objOn.options[index].text;
			
			objOn.options[index] = new Option(objOn.options[index+1].text,objOn.options[index+1].value);
			objOn.options[index+1] = new Option(text,val);
			objOn.options[index+1].selected = true;
		}
	}
};

//置顶，将已选框中的一条数据置顶
function moveToTopOfOnSelect(){
	if(this.singleSelectOrNot("置顶")){
		var objOn = document.getElementById('onSelect');
		var index = objOn.selectedIndex;
		if(index == '0'){
			Ext.MessageBox.alert("提示", "已移至顶端，无需再次置顶！");
		}else{
			var val = objOn.options[index].value;
			var text = objOn.options[index].text;
			
			var i = index;
			while(i > 0){
				objOn.options[i] = new Option(objOn.options[i-1].text,objOn.options[i-1].value);
				i = i - 1;
			}
			
			objOn.options[0] = new Option(text,val);
			objOn.options[0].selected = true;
		}
	}
};

//置底，将已选框中的一条数据置底
function moveToBottomOfOnSelect(){
	if(this.singleSelectOrNot("置底")){
		var objOn = document.getElementById('onSelect');
		var index = objOn.selectedIndex;
		var dis = objOn.options.length - index;
		if(dis == '1'){
			Ext.MessageBox.alert("提示", "已移至底端，无须再次置底！");
		}else{
			var val = objOn.options[index].value;
			var text = objOn.options[index].text;
			
			objOn.options.remove(index);
			
			objOn.add(new Option(text,val));
			objOn.options[objOn.options.length-1].selected = true;
		}
	}
};

//判断是否单选
function singleSelectOrNot(text){
	var objOn = document.getElementById('onSelect');
	var i = 0;
	var j = 0;
	while(i < objOn.options.length){
		if(objOn.options[i].selected){
			j = j + 1;
		}
		i = i + 1;
	}
	if(j == 0){
		Ext.MessageBox.alert("提示", "请选中一条记录，再执行" + text + "操作！");
		return false;
	}
	if(j > 1){
		Ext.MessageBox.alert("提示", text + "操作时只能选中一条记录！");
		return false;
	}
	return true;
};