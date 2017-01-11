 /**
 * @description : 代码管理业务逻辑
 * @date : 2013-05-06
 * @author : 周亚京
 */
Ext.lion.system.CodeManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.CodeManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.system.CodeManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.expandQueryField();
		
		Ext.Ajax.request({
			url : 'system/listCodeType.html',
			method : 'post',
			params : {
				codeCd : 'sys_code_type',
				showType : showType
			},
			scope : this,
			success : function(response,options) {
				var json = Ext.util.JSON.decode(response.responseText || "{}");
				var codeType = json.codeType;
				if (json.success) {
					this.listCodeType.items.items[0].setRootNode({
						draggable : false,
						children : codeType
					});
				} else {
					var msg = json.msg || '<br>';
					Ext.MessageBox.show({
						title : '失败',
						msg : '获取代码类别失败！' + msg,
						buttons : Ext.MessageBox.OK,
						fn : function(){},
						icon : Ext.MessageBox.WARNING,
						scope : this
					});
				}
			},
			failure : function() {
				Ext.MessageBox.show({
					title : '失败',
					msg : '获取代码类别失败！',
					buttons : Ext.MessageBox.OK,
					fn : function(){},
					icon : Ext.MessageBox.ERROR,
					scope : this
				});
			}
		});
		
		this.listCodeType.items.items[0].on('beforeload',function(node, e){
			if(node.attributes.url) {
				if(this.queryKey) {
					this.listCodeType.items.items[0].loader.dataUrl = node.attributes.url
						+ "&queryKey=" + encodeURI(encodeURI(this.queryKey));
				} else {
					this.listCodeType.items.items[0].loader.dataUrl = node.attributes.url;
				}
			}
		}, this);
		
		this.listCodeType.items.items[0].on('click',this.onTypeTreeClick, this);
		
		this.codeId = 'noClick';
		
		this.on('beforegridedit', this.beforeGridEdit, this);
		this.on('beforegridview', this.beforeGridEdit, this);
		this.on('beforegridcopy', this.beforeGridEdit, this);
		this.on('beforeadd', this.beforeAdd, this);
		this.on('aftersave', this.gridReload, this);
	},
	
	renderColor : function(value, cell, record, rowindex, colIndex, store) {
		var color = record.get(this.manager.dataGrid.getFieldName('renderColor'));
		cell.attr = "style=color:" + color;
		return value;
	},
	
	onTypeTreeClick : function(node, e) {
		if(node.attributes.type == undefined || 'codeType' != node.attributes.type){
			this.query(this.queryForm, this.dataGrid, true, ['nodeId'], ['='], [node.id]);
			this.codeId = node.id;
		} else {
			this.codeId = 'noClick';
		}
		if(this.dataGrid.getGridForm()) {
			this.dataGrid.getGridPlugin().stopEditing(false);
		}
	},
	
	gridReload : function() {
		this.query(this.queryForm, this.dataGrid, true, ['nodeId'], ['='], [this.codeId]);
	},
	
	typeTreeReload : function(flag) {
		this.codeId = 'noClick';
		this.listCodeType.items.items[0].root.reload();
		if(flag == 'clear') {
			this.query(this.queryForm, this.dataGrid, true, ['nodeId'], ['='], [this.codeId]);
		}
	},
	
	beforeAdd : function() {
		if(this.codeId == 'noClick'){
			Ext.MessageBox.alert("提示","未选择代码，无法添加！");
			return false;
		}
	},
	
	beforeGridEdit : function() {
		this.dataGrid.getGridForm().findField('parent.id').tree.loader.dataUrl = 'system/listCodeLineTree.html?codeId='+this.codeId;
		if(this.dataGrid.getGridForm().findField('parent.id').loadOrNot && this.dataGrid.getGridForm().findField('parent.id').tree.root)
			this.dataGrid.getGridForm().findField('parent.id').tree.root.reload();
	},
	
	addCode : function() {
		this.actionMode = '1';
		this.editable = true;
		this.showWin({title : '新增代码'},'system/code/edit');
		this.editForm.on('aftersave',this.typeTreeReload,this);
	},
	
	editCode : function() {
		if(this.codeId == 'noClick'){
			Ext.MessageBox.alert("提示","请先选择记录！");
			return false;
		}
		this.actionMode = '2';
		this.editable = true;
		this.showWin({title : '编辑代码'},'system/code/edit');
		this.editForm.loadFormData({
			id : this.codeId
		});
		this.editForm.on('aftersave',this.typeTreeReload,this);
	},
	
	viewCode : function() {
		if(this.codeId == 'noClick'){
			Ext.MessageBox.alert("提示","请先选择记录！");
			return false;
		}
		this.actionMode = '3';
		this.editable = false;
		this.showWin({title : '查看代码'},'system/code/edit');
		this.editForm.loadFormData({
			id : this.codeId
		});
	},
	
	deleteCode : function() {
		if(this.codeId == 'noClick'){
			Ext.MessageBox.alert("提示","请先选择记录！");
			return false;
		}
		var m = Ext.MessageBox.confirm("提示", "确定要删除这一条记录吗？",function(ret) {
			if (ret == 'yes') {
				Ext.Ajax.request({
					url : 'system/deleteCode.html',
					method : 'post',
					params : {ids : this.codeId},
					scope : this,
					success : function(response,options) {
						var json = Ext.util.JSON.decode(response.responseText || "{}");
						var msg = json.msg || '<br>';
						if (json.success) {
							this.typeTreeReload('clear');
							Ext.MessageBox.show({
								title : '提示',
								msg : '删除成功！' + msg,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
						} else {
							Ext.MessageBox.show({
								title : '提示',
								msg : '删除失败！' + msg,
								buttons : Ext.MessageBox.OK,
								fn : function(){},
								icon : Ext.MessageBox.WARNING,
								scope : this
							});
						}
					},
					failure : function() {
						var json = Ext.util.JSON.decode(response.responseText || "{}");
					    var msg = json.msg || '<br>';
						Ext.MessageBox.show({
							title : '提示',
							msg : '删除失败！' + msg,
							buttons : Ext.MessageBox.OK,
							fn : function(){},
							icon : Ext.MessageBox.ERROR,
							scope : this
						});
					}
				});
			}
		},this);
	},
	
	queryCode : function(queryKey) {
		this.queryKey = queryKey;
		this.typeTreeReload('clear');
		
		if(this.queryKey) {
			this.listCodeType.items.items[0].expandAll();
		}
	}
});