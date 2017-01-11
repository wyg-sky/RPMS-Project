/**
 * 部门数据权限
 * @param {} config
 */
DataPowerOfDeptSetWin = function(config){
	Ext.apply(this,config);
	var conn = Ext.lib.Ajax.getConnectionObject().conn;
	conn.open("GET", 'system/getDataPowerOfDept.html?roleId='+this.roleId, false);
	conn.send(null);
	if(conn.responseText == "{success:false}"){
		 Ext.Msg.alert('提示', '加载数据失败！');
		 return ;
	} else {
		this.value = conn.responseText;
	};
	
	var root = new Ext.tree.AsyncTreeNode({id:'rootNode',text:'所有部门'});
	this.departMentTreePanel = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'system/listDepartmentTree.html',
       	 	listeners : {},
       	 	baseAttrs : {
				uiProvider : Ext.lion.LionTreeCheckNodeUI
			}
		}),
		autoScroll : true,
		rootVisible : false,
   	 	root : root,
        tools:[{
            id:'refresh',
            qtip: '刷新功能列表',
            scope : this,
            handler : function(e, t, p, tc) {
                this.departMentTreePanel.root.reload();
            }
        },{
            id:'pin',
            qtip: '展开所有模块',
            scope : this,
            handler : function(e, t, p, tc) {
            	t.hide();
            	p.getTool('unpin').show();
            	this.departMentTreePanel.expandAll();
            }
        },{
            id:'unpin',
            qtip: '收起所有模块',
            scope : this,
            hidden : true,
            handler : function(e, t, p, tc) {
            	t.hide();
            	p.getTool('pin').show();
            	this.departMentTreePanel.collapseAll();
            }
        }]
	});
	root.on('load',function(node){(function() {
		var cascadeExpand = function(node){
			node.expand();
			if(node.childNodes.length>0){
				for(var i=0;i<node.childNodes.length;i++){
					cascadeExpand(node.childNodes[i]);
				}
			}
		};
		cascadeExpand(node);
		this.setValue(this.value);
	}).defer(300,this);},this);
	this.departMentTreePanel.on('contextmenu',function(node,e) {
    	e.preventDefault();
	}, this);
	
	this.askForCheckedChildren = true;
	this.isChechedChildren = true;
	
	this.departMentTreePanel.on('check',function(node){
		if(node.attributes.checked){
			if(node.childNodes && node.childNodes.length > 0) {
				if(this.askForCheckedChildren) {
					Ext.MessageBox.show({
						title : '提示',
						msg : '是否级联选中当前节点的所有子节点？',
						buttons : {ok : '是', yes:'全部选是', no : '否', cancel : '全部选否'},
						closable : false,
						scope : this,
						icon : Ext.MessageBox.INFO,
						fn : function(btn) {
							if(btn == 'ok') {
								this.cascadeCheckChildNode(node);
							} else if(btn == 'yes') {
								this.cascadeCheckChildNode(node);
								this.askForCheckedChildren = false;
								this.isChechedChildren = true;
							} else if(btn == 'cancel') {
								this.askForCheckedChildren = false;
								this.isChechedChildren = false;
							}
						}
					});
				} else if(this.isChechedChildren) {
					this.cascadeCheckChildNode(node);
				}
			}
		}
	},this);
	
	DataPowerOfDeptSetWin.superclass.constructor.call(this, {
        title: '['+this.roleName+']的部门数据权限设置',
        width:500,
        height:500,
		constrain : true,
		iconCls : 'icon-module1',
		layout : 'fit',
		modal : true,
		autoScroll : true,
		defaults : {
			border : false
		},
		buttonAlign : 'center',
		buttons : [{
			text : '保存',
			handler : this.save,
			scope : this
		}, {
			text : '关闭',
			handler : this.close,
			scope : this
		}],
		items:[this.departMentTreePanel]
	});
};
Ext.extend(DataPowerOfDeptSetWin, Ext.Window,{
	checkNode : function(node){
		node.getUI().markChecked();
	},
	
	cascadeCheckChildNode : function(node) {
		for(var i = 0; i < node.childNodes.length; i++){
			node.childNodes[i].getUI().markChecked();
			this.cascadeCheckChildNode(node.childNodes[i]);
		}
	},
	
	initChecked : function(node){
		if(this.value.indexOf(node.id) != -1){
			node.getUI().markChecked();
 		}
		if(!node.isLeaf()){
			for(var i=0;i<node.childNodes.length;i++ ){
				if(this.value.indexOf(node.childNodes[i].id) != -1){
					node.childNodes[i].getUI().markChecked();
		 		}
			}
		}
	},
	setValue : function(v){
		if(v.length > 0) {
			var checkNode = function(node,value){
				if(value.indexOf(node.id) != -1){
					node.getUI().markChecked();
				}
				if(node.childNodes.length>0){
					for(var i=0;i<node.childNodes.length;i++){
						checkNode(node.childNodes[i],value);
					}
				}else{
					return ;
				}
			};
			checkNode(this.departMentTreePanel.root,v);
		}
	},
	
	/*
	 * 保存功能
	 */
	save : function(){
		var nodes = this.departMentTreePanel.getChecked();
		var departmentIds = "";
		for(var i = 0;i<nodes.length;i++){
			departmentIds += (nodes[i].id + ",");
		}
		
		if(departmentIds.length>0){
			departmentIds = departmentIds.substring(0, departmentIds.length-1);
		}
		
		Ext.Ajax.request({
            url : 'system/saveDataPowerOfDept.html',
            method : 'POST',
            scope : this,
            params : {departmentIds : departmentIds, roleId : this.roleId},
            success : function(response, options){
            	var json = Ext.util.JSON.decode(response.responseText || "{}");
                if (json.success) {
                	Ext.MessageBox.show({
						title : '提示',
						msg : '保存成功！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
                	this.close();
                } else {
                	Ext.MessageBox.show({
						title : '提示',
						msg : '保存失败！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
                }
            }
        });
	}
});