
Ext.lion.system.GeneratorManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.GeneratorManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.system.GeneratorManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		if(FW.dutyId != null) {
			this.dutyId = FW.dutyId;
			delete FW.dutyId;
			
			var editForm = this.baseInfo.items.items[1];
			editForm.form.load({
				url : 'system/loadMainInfoFormDutyId.html',
				params : {dutyId : this.dutyId},
				scope : this
			});
			
			var dataGrid = this.baseInfo.items.items[3];
			Ext.apply(dataGrid.store.baseParams,{
				dutyId : this.dutyId
			});
			dataGrid.store.load();
		}
	},
	
	loadTableInfo : function(e,tableName,isMain) {
		Ext.Ajax.request({
			url : 'system/loadTableInfo.html',
			method : 'post',
			params : {tableName : tableName},
			scope : this,
			success : function(response,options) {
				var json = Ext.util.JSON.decode(response.responseText || "{}");
				if(json.success) {
					if(isMain) {
						e.findField('tableName').setValue(json.tableName);
						e.findField('moduleName').setValue(json.moduleName);
						e.findField('packageName').setValue(json.packageName);
						e.findField('className').setValue(json.className);
						e.findField('classRemark').setValue(json.classRemark);
					} else {
						e.set('tableName',json.tableName);
						e.set('className',json.className);
						e.set('classRemark',json.classRemark);
					}
				} else {
					if(isMain) {
						e.findField('tableName').setValue('');
						e.findField('moduleName').setValue('');
						e.findField('packageName').setValue('');
						e.findField('className').setValue('');
						e.findField('classRemark').setValue('');
					} else {
						e.set('tableName','');
						e.set('className','');
						e.set('classRemark','');
					}
					Ext.MessageBox.show({
						title : '失败',
						msg : json.msg,
						buttons : Ext.MessageBox.OK,
						fn : function(){},
						icon : Ext.MessageBox.WARNING,
						scope : this
					});
				}
			}
		});
	},
	
	loadColumnInfo : function(editForm, dataGrid) {
		var records = dataGrid.getStore().getRange();
		if(records.length > 0 && !dataGrid.isValid()) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '子表数据输入不完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return ;
		}
		if(editForm.form.isValid()) {
			while(this.items[0].items.length > 1) {
				this.items[0].remove(this.items[0].items.items[1]);
			}
			
			var newMainPanel = new Ext.lion.LionPanel({
				title : editForm.findField('classRemark').getValue() + "_主表列信息",
				viewPath : 'code/generator/columnInfo/list'
			});
			Ext.apply(newMainPanel.items.items[1].store.baseParams, {
				tableName : editForm.findField('tableName').getValue(),
				extendsClassPath : editForm.findField('extendsClassPath').getValue()
			});
			this.items[0].add(newMainPanel);
			newMainPanel.items.items[1].store.on('load', function(){
				this.items[0].activate(newMainPanel);
			},this);
			newMainPanel.items.items[1].store.load();
			
			for(var i = 0; i < records.length; i++) {
				var newLinePanel = new Ext.lion.LionPanel({
					title : records[i].get('classRemark') + "_子表列信息",
					viewPath : 'code/generator/columnInfo/list'
				});
				Ext.apply(newLinePanel.items.items[1].store.baseParams, {
					tableName : records[i].get('tableName'),
					extendsClassPath : records[i].get('extendsClassPath')
				});
				this.items[0].add(newLinePanel);
				newLinePanel.items.items[1].store.load();
			}
			
			var toolBar = this.items[0].items.items[this.items[0].items.length-1].items.items[0];
			toolBar.addButton([new Ext.Toolbar.Separator(),{
				text : '完成',
				iconCls : 'save-icon',
				handler : this.complete,
				scope : this
			}]);
		} else {
			Ext.MessageBox.show({
				title : '提示',
				msg : '本页内容尚未完成，无法进行下一步！',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING
			});
		}
	},
	
	complete : function() {
		var params = {};
		
		if(this.dutyId != null) {
			Ext.apply(params,{
				dutyId : this.dutyId
			});
		}
		
		var baseForm = this.baseInfo.items.items[1];
		var lineGrid = this.baseInfo.items.items[3];
		var mainColumnGrid = this.items[0].items.items[1].items.items[1];
		
		var lineRecords = lineGrid.getStore().getRange();
		if(lineRecords.length > 0 && !lineGrid.isValid()) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '子表数据输入不完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return ;
		}
		var lineList = [];
		for(var i = 0; i < lineRecords.length; i++) {
			lineList.push(lineRecords[i].data);
		}
		Ext.apply(params, Ext.lion.LionParamsConvert(lineList,"businessObject.children"));
		
		var mainColumnRecords = mainColumnGrid.getStore().getRange();
		if(mainColumnRecords.length > 0 && !mainColumnGrid.isValid()) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '列表数据输入不完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return ;
		}
		var mainColumnList = [];
		for(var i = 0 ;i < mainColumnRecords.length; i++) {
			mainColumnList.push(mainColumnRecords[i].data);
		}
		Ext.apply(params, Ext.lion.LionParamsConvert(mainColumnList,"businessObject.columns"));
		
		for(var i = 0; i < lineRecords.length; i++) {
			var lineParams = {};
			
			var lineRecord = [lineRecords[i].data];
			Ext.apply(lineParams, Ext.lion.LionParamsConvert(lineRecord,'businessObject.children'));
			
			var lineColumnGrid = this.items[0].items.items[i+2].items.items[1];
			var lineColumnRecords = lineColumnGrid.getStore().getRange();
			if(lineColumnRecords.length > 0 && !lineColumnGrid.isValid()) {
				Ext.MessageBox.show({
					title : '提示',
					msg : '列表数据输入不完整！<br>',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING ,
					scope : this
				});
				return ;
			}
			var lineColumnList = [];
			for(var j = 0; j < lineColumnRecords.length; j++) {
				lineColumnList.push(lineColumnRecords[j].data);
			}
			Ext.apply(lineParams, Ext.lion.LionParamsConvert(lineColumnList,"businessObject.columns"));
			
			baseForm.form.submit({
				url : 'system/saveLineTable.html',
				method : 'post',
				params : lineParams,
				scope : this,
				async : false,
				waitTitle : '请稍候',
				waitMsg : '正在保存...',
				failure : function(form, action) {
					Ext.MessageBox.show({
						title : '提示',
						msg : '子表文件生成失败！',
						buttons : Ext.MessageBox.OK,
						fn : function(){},
						icon : Ext.MessageBox.ERROR,
						scope : this
					});
				}
			});
		}
		
		baseForm.form.submit({
			url : 'system/saveMainTable.html',
			method : 'post',
			params : params,
			scope : this,
			waitTitle : '请稍候',
			waitMsg : '正在保存...',
			success : function(form, action) {
				var json = Ext.util.JSON.decode(action.response.responseText || "{}");
				var msg = json.msg ? json.msg : "";
				var m = Ext.MessageBox.confirm("提示", msg + "类文件生成成功，是否继续生成页面文件？",function(ret) {
					if (ret == 'yes') {
				    	FW.sendToModuleByUrl('生成页面', 'code/generatepage/generatepage.jsp');
					} else if(!this.isServer){
						var toolBar = this.items[0].items.items[this.items[0].items.length-1].items.items[0];
						toolBar.addButton([new Ext.Toolbar.Separator(),{
							text : '打包下载所有文件',
							iconCls : 'download-icon',
							handler : function() {
								window.open('system/downloadAllFiles.html');
							},
							scope : this
						}]);
						this.items[0].doLayout();
					}
				},this);
			},
			failure : function(form, action) {
				Ext.MessageBox.show({
					title : '提示',
					msg : "生成文件出错！",
					buttons : Ext.MessageBox.OK,
					fn : function(){},
					icon : Ext.MessageBox.ERROR,
					scope : this
				});
			}
		});
	}
	
});