 /**
 * @description : 栏目管理
 * @date : 2013-03-28
 * @author : 周亚京
 */
Ext.lion.system.CatalogManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.CatalogManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.system.CatalogManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.roleId = 'noClick';
		
		if(this.listTree && this.listTree.items && this.listTree.items.items[0]) {
			this.listTree.items.items[0].on('beforeload',function(node, e){
				if(node.attributes.url){
					this.listTree.items.items[0].loader.dataUrl = node.attributes.url;
				}
			}, this);
			
			this.listTree.items.items[0].on('click',this.onTreeClick, this);
		}
		
		this.listTree.items.items[0].expandAll();
	},
	
	onTreeClick : function(node, e) {
		this.roleId = 'noClick';
		var nodeType = node.attributes.classType;
		if(nodeType){
            nodeType = nodeType.substring(nodeType.lastIndexOf('.')+1, nodeType.length);
            if(nodeType == 'Role') {
				this.query(this.queryForm, this.dataGrid, true, ['rolesObj.id'], ['='], [node.id]);
				this.queryForm.findField('roleId').setValue(node.id);
				
				this.roleId = node.id;
				this.roleName = node.text;
            }
		}
	},
	
	/**
	 * 覆盖父类保存方法
	 */
	saveObject : function(dataGrid) {
		if(!dataGrid) {
			dataGrid = this.dataGrid;
		}
		if(this.fireEvent('beforesave', this) && this.editForm) {
			var params = {};
			
			if(this.queryForm) {
				var roleId = this.queryForm.findField('roleId').getValue();
				params = {roleId : roleId};
			}
			
			this.editForm.save(params);
			this.editForm.on('aftersave', function() {
				if(this.fireEvent('aftersave', this)) {
					if(dataGrid) {
						if(dataGrid.xtype != "liontreegrid") {
							dataGrid.store.reload();
						} else {
							dataGrid.refreshRecord();
						}
					}
					
					if(this.editForm.ownerCt && this.editForm.ownerCt.close) {
						this.editForm.ownerCt.close();
					} else {
						if(this.editForm.ownerCt && this.editForm.ownerCt.ownerCt && this.editForm.ownerCt.ownerCt.close) {
							this.editForm.ownerCt.ownerCt.close();
						} else {
							this.editForm.form.reset();
						}
					}
				}
			}, this);
		}
	},
	
	catalogSetting : function() {
		if(this.roleId == 'noClick') {
			Ext.MessageBox.alert("提示","请先选择角色！");
			return false;
		}
		this.actionMode = '2';
		this.showWin({title : '栏目设置'}, 'system/catalog/catalogrole/list');
	},
	
	addCatalog : function() {
		var catalogRoles = this.catalogGrid.getStore().getRange();
		var ids = '';
		for (var i = 0; i < catalogRoles.length; i++) {
			ids += "'" + catalogRoles[i].get('catalog.id') + "',";
		}
		ids = ids.substring(0, ids.length- 1);
		
		var selectWin = new Ext.lion.LionSelectWindow({
			viewPathOfUi : 'system/catalog/list',
			hql : (ids ? " and obj.id not in (" + ids + ")" : "") + " and obj.enable = 1 ",
			title : '栏目选择',
			isGoOnBtn : false,
			forceSelection : false
		});
		
		selectWin.on('after_comfirm_click', function(records) {
			var RecordType = this.catalogGrid.getRecordType();
			for(var i = 0; i< records.length; i++) {
				var r = new RecordType({
					'role.id' : this.roleId,
					'role.name' : this.roleName,
					'catalog.id' : records[i].get('id'),
					'catalog.name' : records[i].get('name'),
					'width' : records[i].get('width'),
					'height' : records[i].get('height'),
					'showTitle' : '1',
					'border' : '1'
				});
				this.catalogGrid.store.add(r);
			}
		}, this);
	},
	
	delCatalog : function() {
		var records = this.catalogGrid.getSelections(true);
		if(records && records.length > 0) {
			var msg = '条';
			if(records.length > 1) {
				msg = '<font color="red"> ' + records.length + ' </font>' + msg;
			}
			Ext.MessageBox.minWidth = 230;
			var m = Ext.MessageBox.confirm("提示", "确定要删除这" + msg + "记录吗？",function(ret) {
				if (ret == 'yes') {
					this.catalogGrid.getStore().remove(records);
				}
			},this);
			Ext.MessageBox.minWidth = 150;
		}
	},
	
	saveSetting : function() {
		var records = this.catalogGrid.getStore().getRange();
		if(records.length > 0 && !this.catalogGrid.isValid()) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '数据输入不完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		}
		
		var catalogRole = [];
		for(var i = 0; i < records.length; i++) {
			catalogRole.push(records[i].data);
		}
		var params = Ext.apply({
			roleId : this.roleId
		},Ext.lion.LionParamsConvert(catalogRole,"catalogRoles"));
		
		Ext.Ajax.request({
			url : 'system/saveCatalogRole.html',
			method : 'post',
			params : params,
			scope : this,
			success : function(response,options) {
				var json = Ext.util.JSON.decode(response.responseText || "{}");
				if(json.success) {
					Ext.MessageBox.show({
						title : '提示',
						msg : '保存成功！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					this.catalogTbar.closeClick();
					this.query(this.queryForm, this.dataGrid, true, ['rolesObj.id'], ['='], [this.roleId]);
				} else {
					Ext.MessageBox.show({
						title : '提示',
						msg : '保存失败！<br>',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING ,
						scope : this
					});
				}
			}
		});
	}
});