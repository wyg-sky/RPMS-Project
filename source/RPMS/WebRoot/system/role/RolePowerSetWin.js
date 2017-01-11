/**
 * 模块与资源权限
 * @param {} config
 */
RolePowerSetWin = function(config) { 
	Ext.apply(this, config);
	var thisWin = this;

	var tree = new Ext.lion.LionTreeColumn({
		id : 'powerSetTree',
        border:false,
		height: 280,
		resizable:false,
        rootVisible:false,
        autoScroll:true,
        modal : true,
        columns:[{
			header:'模块权限',
			width:350,
			dataIndex:'name'
		},
			{
			header:'资源权限',
			width:300,
			dataIndex:'checkbox'//,
		}],

        loader: new Ext.tree.TreeLoader({
            dataUrl:'',
            baseParams : {roleId:this.roleId},
            uiProviders:{
                'col': Ext.lion.LionTreeColumnNodeUI
            },
            createNode : function(attr){
		        // apply baseAttrs, nice idea Corey!
		        if(this.baseAttrs){
		            Ext.applyIf(attr, this.baseAttrs);
		        }
		        if(this.applyLoader !== false && !attr.loader){
		            attr.loader = this;
		        }
		        if(Ext.isString(attr.uiProvider)){
		           attr.uiProvider = this.uiProviders[attr.uiProvider] || eval(attr.uiProvider);
		        }
		        if(attr.nodeType){
		            return new Ext.tree.TreePanel.nodeTypes[attr.nodeType](attr);
		        }else{
		            return new Ext.tree.AsyncTreeNode(attr);
		        }
		    }
        }),

        root: new Ext.tree.AsyncTreeNode({
        	id: 'tree-root',
            text:'powers'
        })
    });
    
	tree.on('beforeload',function(node){
		if(node.id=='tree-root')
			this.loader.dataUrl = 'system/listPowerTree.html';
		else 
			this.loader.dataUrl = 'system/listPowerTree.html?moduleParentId=' + node.id;
	});

	tree.on('leafclick',this.onClick,this);
	
	RolePowerSetWin.superclass.constructor.call(this,  {
		id: 'powerSetWin',
        layout:'fit',
        constrain : true,
		modal : true,
		iconCls : 'icon-module1',
        title: '['+this.roleName+']的模块与资源权限设置',
        width:680,
        height:500,
        closeAction:'close',
        buttonAlign : 'center',
        plain: true
    });
    
	this.add(tree);
   	this.addButton({text: '保存'},function(){thisWin.savePowerSet(thisWin);});
    this.addButton({text: '取消'},function(){thisWin.close();});
    
	tree.on('contextmenu',function(node,e) {
    	e.preventDefault();
	}, this);
	
    this.on('close', function() {
    	addCheckboxes = new Array();
		delCheckboxes = new Array();
		
		addModules = new Array();
		delModules = new Array();
    });
};

Ext.extend(RolePowerSetWin, Ext.Window, {
	
	 onClick : function (tree, node, e){
    	node.expand();
	 },
	savePowerSet : function(thisWin) {
		var roleId = thisWin.roleId;
		var checkboxs = document.getElementsByName("cb");
		addStr = arrayToString(addCheckboxes);
		delStr = arrayToString(delCheckboxes);

		addMStr = arrayToString(addModules);
		delMStr = arrayToString(delModules);
		Ext.Ajax.request({
			waitMsg : "正在保存信息",
			waitTitle : "提示",
			url : 'system/saveRolePower.html',
			method : 'POST',
			params : {
				roleId : roleId,
				addStr : addStr,
				delStr : delStr,
				addMStr : addMStr,
				delMStr : delMStr
			},
			success : function(response, options) {
				Ext.Msg.alert('提示', '保存成功！');
				thisWin.close();
			},
			failure : function() {
				Ext.Msg.alert('错误', '服务器出现错误请稍后再试！');
			}
		});
	}
});

var addCheckboxes = new Array();
var delCheckboxes = new Array();

var addModules = new Array();//增加的模块
var delModules = new Array();//删除的模块

function synchClick(checkbox){
	var tree = Ext.getCmp('powerSetTree');
	var checkboxs = document.getElementsByName("cb");
	if(checkbox.attributes["otype"].value=='M'){
		var moduleId = checkbox.id.split('_')[0];
		var operType = checkbox.id.split('_')[1];
		
		var mNode = tree.getNodeById(moduleId);
		var urlObj;
		switch(operType){
			case '0001':
				urlObj = mNode.attributes.cUrls;
				break;
			case '0002':
				urlObj = mNode.attributes.rUrls;
				break;
			case '0003':
				urlObj = mNode.attributes.uUrls;
				break;
			case '0004':
				urlObj = mNode.attributes.dUrls;
				break;
		}
		urlObj.check = urlObj.all;
		var urlAll = urlObj.all;
		var urlAry = urlAll.substring(0,urlAll.length-1).split(',');
		for(var i=0; i<urlAry.length; i++ ){
			//true 放入增加数组中,并从删除数组中去掉 false 从增加数组中删除 并从删除数组中增加
			checkboxesAry(checkbox.checked,urlAry[i]);
			var cObj = document.getElementById(moduleId+'_'+urlAry[i]+'_'+operType);
			if(cObj){
				cObj.checked = checkbox.checked;
			} 
		}
	} else {
		var flag = true;
		var id = checkbox.id;
		var moduleId = checkbox.id.split('_')[0];
		var resourceId = checkbox.id.split('_')[1];
		var operType = checkbox.id.split('_')[2];
		var mNode = tree.getNodeById(moduleId);
		var urlObj;
		switch(operType){
			case '0001':
				urlObj = mNode.attributes.cUrls;
				break;
			case '0002':
				urlObj = mNode.attributes.rUrls;
				break;
			case '0003':
				urlObj = mNode.attributes.uUrls;
				break;
			case '0004':
				urlObj = mNode.attributes.dUrls;
				break;
		}
		if(checkbox.checked==false){
			urlObj.check = urlObj.check.replace(resourceId+',','');
			document.getElementById(moduleId+'_'+operType).checked=false;
		}else{
			urlObj.check = urlObj.check+resourceId+',';
			if(urlObj.check.split(',').length==urlObj.all.split(',').length)
				document.getElementById(moduleId+'_'+operType).checked= true;
		}
		checkboxesAry(checkbox.checked,resourceId);
	}
}

//点击模块checkbox
function mCheckboxClick(checkbox, moduleId){
	var tree = Ext.getCmp('powerSetTree');
	var mNode = tree.getNodeById(moduleId);
	
	var checkbox_C = document.getElementById(moduleId+'_0001');
	var checkbox_R = document.getElementById(moduleId+'_0002');
	var checkbox_U = document.getElementById(moduleId+'_0003');
	var checkbox_D = document.getElementById(moduleId+'_0004');
	if(checkbox_C) checkbox_C.disabled = (!checkbox.checked);
	if(checkbox_R) checkbox_R.disabled = (!checkbox.checked);
	if(checkbox_U) checkbox_U.disabled = (!checkbox.checked);
	if(checkbox_D) checkbox_D.disabled = (!checkbox.checked);
	
	if(!checkbox.checked){//模块不选中，操作不选中,addModules中去掉，delModules中添加
		if(checkbox_C){ checkbox_C.checked = false;synchClick(checkbox_C);}
		if(checkbox_R){ checkbox_R.checked = false;synchClick(checkbox_R);}
		if(checkbox_U){ checkbox_U.checked = false;synchClick(checkbox_U);}
		if(checkbox_D){ checkbox_D.checked = false;synchClick(checkbox_D);}
		
		if(!mNode.leaf) {
			removeAllChildren(mNode);
		}
		
		if(delModules.indexOf(moduleId) == -1) delModules.add(moduleId);
		if(addModules.indexOf(moduleId) > -1) addModules.remove(moduleId);
	} else {//模块选中，,addModules中添加，delModules中去掉
		selectAllParent(moduleId);
		
		if(!mNode.leaf) {
			if(mNode.expanded) {
				selectChild(mNode);
			} else {
				mNode.expand(false, false, selectChild);
			}
		}
		
		if(addModules.indexOf(moduleId) == -1) addModules.add(moduleId);
		if(delModules.indexOf(moduleId) > -1) delModules.remove(moduleId);
	}
}

function selectChild(mNode) {
	for(var i = 0; i < mNode.childNodes.length; i++) {
		var childNode = mNode.childNodes[i];
		if(childNode.leaf) {
			var checkbox_C = document.getElementById(childNode.id+'_0001');
			var checkbox_R = document.getElementById(childNode.id+'_0002');
			var checkbox_U = document.getElementById(childNode.id+'_0003');
			var checkbox_D = document.getElementById(childNode.id+'_0004');
			if(checkbox_C) checkbox_C.disabled = false;
			if(checkbox_R) checkbox_R.disabled = false;
			if(checkbox_U) checkbox_U.disabled = false;
			if(checkbox_D) checkbox_D.disabled = false;
			
			if(!document.getElementById(childNode.id+'_mCheckbox').checked) {
				document.getElementById(childNode.id+'_mCheckbox').checked = true;
				if(addModules.indexOf(childNode.id) == -1) addModules.add(childNode.id);
				if(delModules.indexOf(childNode.id) > -1) delModules.remove(childNode.id);
			}
		}
	}
}

function removeChild(node) {
	for(var i = 0; i < node.childNodes.length; i++) {
		var childNode = node.childNodes[i];
		
		var checkbox_C = document.getElementById(childNode.id+'_0001');
		var checkbox_R = document.getElementById(childNode.id+'_0002');
		var checkbox_U = document.getElementById(childNode.id+'_0003');
		var checkbox_D = document.getElementById(childNode.id+'_0004');
		if(checkbox_C){checkbox_C.disabled = true;checkbox_C.checked = false;synchClick(checkbox_C);}
		if(checkbox_R){checkbox_R.disabled = true;checkbox_R.checked = false;synchClick(checkbox_R);}
		if(checkbox_U){checkbox_U.disabled = true;checkbox_U.checked = false;synchClick(checkbox_U);}
		if(checkbox_D){checkbox_D.disabled = true;checkbox_D.checked = false;synchClick(checkbox_D);}
		
		document.getElementById(childNode.id+'_mCheckbox').checked = false;
		if(delModules.indexOf(childNode.id) == -1) delModules.add(childNode.id);
		if(addModules.indexOf(childNode.id) > -1) addModules.remove(childNode.id);
		
		if(!childNode.leaf) {
			removeAllChildren(childNode);
		}
	}
}

function removeAllChildren(node) {
	if(node.expanded) {
		removeChild(node);
	} else {
		node.expand(false, false, removeChild);
	}
}

function selectAllParent(moduleId) {
	var checkbox_C = document.getElementById(moduleId+'_0001');
	var checkbox_R = document.getElementById(moduleId+'_0002');
	var checkbox_U = document.getElementById(moduleId+'_0003');
	var checkbox_D = document.getElementById(moduleId+'_0004');
	if(checkbox_C) checkbox_C.disabled = false;
	if(checkbox_R) checkbox_R.disabled = false;
	if(checkbox_U) checkbox_U.disabled = false;
	if(checkbox_D) checkbox_D.disabled = false;
	
	var moduleParentId = document.getElementById(moduleId+'_mCheckbox').getAttribute("moduleparentid");
	if(moduleParentId != "") {
		document.getElementById(moduleParentId+'_mCheckbox').checked = true;
		selectAllParent(moduleParentId);
		if(addModules.indexOf(moduleParentId) == -1) addModules.add(moduleParentId);
		if(delModules.indexOf(moduleParentId) > -1) delModules.remove(moduleParentId);
	}
}

function checkboxesAry(checked, resourceid){
	if(checked == true){
		if(addCheckboxes.indexOf(resourceid)==-1) addCheckboxes.add(resourceid);
		if(delCheckboxes.indexOf(resourceid)>-1) delCheckboxes.remove(resourceid);
	} else {
		if(delCheckboxes.indexOf(resourceid)==-1) delCheckboxes.add(resourceid);
		if(addCheckboxes.indexOf(resourceid)>-1) addCheckboxes.remove(resourceid);
	}
}

function arrayToString(ary){
	var aryStr = "";
	for (var i = 0; i < ary.length; i++) {
		 aryStr+=ary[i]+',';
    }
    if(aryStr.length>0) aryStr = aryStr.substring(0,aryStr.length-1);
    return aryStr;
}