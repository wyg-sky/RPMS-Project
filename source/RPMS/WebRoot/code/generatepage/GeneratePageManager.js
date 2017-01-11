
Ext.lion.system.GeneratePageManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.GeneratePageManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.system.GeneratePageManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		Ext.Ajax.request({
			url : 'system/checkGenerateInfo.html',
			method : 'post',
			scope : this,
			success : function(response,options) {
				var json = Ext.util.JSON.decode(response.responseText || "{}");
				if(json.success) {
					var m = Ext.MessageBox.confirm("提示", "是否根据类包信息生成组件？",function(ret) {
						if(ret == 'yes') {
							this.dataGrid.store.load();
						}
					},this);
				} else {
					Ext.MessageBox.show({
						title : '提示',
						msg : '请先生成类包！<br>',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING ,
						scope : this
					});
					FW.sendToModuleByUrl('生成类包', 'code/generator/generator.jsp');
				}
			}
		});
	},
	
	addLine : function(dataGrid) {
		var RecordType = dataGrid.getRecordType();
		var r = new RecordType();
		dataGrid.store.add(r);
	},
	
	addLineObject : function(dataGrid, widgetId, widgetType, className, paramKey, paramValue) {
		if(!dataGrid) {
			dataGrid = this.dataLineGrid;
		}
		
		var hql = "and ( (obj.type is null and obj.widgetId is null) ";
		if(widgetId != null) {
			hql += "or obj.widgetId.id = '" + widgetId + "' ";
		}
		if(widgetType != null) {
			hql += "or obj.type = '" + widgetType + "' ";
		}
		
		var propertyWindow = new Ext.lion.LionSelectWindow({
			title : '属性选择',
			singleSelect : false,
			viewPathOfUi : 'code/property/list',
			hql : hql + ") "
		});
		
		if(paramKey != null || paramValue != null || className != null) {
			Ext.apply(propertyWindow.items.items[2].store.baseParams,{
				paramKey : paramKey,
				paramValue : paramValue,
				className : className
			});
		}
		
		propertyWindow.on('after_comfirm_click', function(records) {
			var RecordType = dataGrid.getRecordType();
			for(var i = 0; i < records.length; i++) {
				var r = new RecordType({
					'paramName' : records[i].get('propertyName'),
					'paramPath' : records[i].get('propertyPath'),
					'paramType' : records[i].get('propertyType'),
					'paramValue' : records[i].get('defaultValue')
				});
				dataGrid.store.add(r);
			}
		}, this);
	},
	
	deleteObject : function(dataGrid, deleteFile) {
		if(!dataGrid) {
			dataGrid = this.dataGrid;
		}
		var records = dataGrid.getSelections(true);
		if(records && records.length > 0) {
			var msg = '条';
			if(records.length > 1) {
				msg = '<font color="red"> ' + records.length + ' </font>' + msg;
			}
			
			Ext.MessageBox.minWidth = 230;
			var m = Ext.MessageBox.confirm("提示", "确定要删除这" + msg + "记录吗？",function(ret) {
				if (ret == 'yes') {
					for(var i = 0; i < records.length; i++){
						if(deleteFile) {
							Ext.Ajax.request({
								url : 'system/deleteWidgetFile.html',
								method : 'post',
								async : false,
								params : {viewPath : records[i].get('viewPath')},
								scope : this,
								success : function(response,options) {
									var json = Ext.util.JSON.decode(response.responseText || "{}");
									if(!json.success) {
										return;
									}
								}
							});
						}
						dataGrid.store.remove(records[i]);
					}
				}
			},this);
			Ext.MessageBox.minWidth = 150;
		}
	},
	
	completeWidget : function() {
		if(!this.editForm.form.isValid()) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '表单数据输入不完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		}
		
		var records = this.dataLineGrid.getStore().getRange();
		if(records.length > 0 && !this.dataLineGrid.isValid()) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '参数数据输入不完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		}
		
		var objectName = '';
		var viewPath = '';
		var region = '';
		var param = [];
		for(var i = 0; i < records.length; i++) {
			if('object' == records[i].get('paramPath')) {
				objectName = records[i].get('paramValue');
			}
			if('viewPath' == records[i].get('paramPath')) {
				viewPath = records[i].get('paramValue');
			}
			if('region' == records[i].get('paramPath')) {
				region = records[i].get('paramValue');
			}
			param.push(records[i].data);
		}
		
		if(viewPath.length > 0) {
			if(viewPath.substring(viewPath.length - 1, viewPath.length) == '/') {
				Ext.MessageBox.show({
					title : '提示',
					msg : '请将viewPath属性值填写完整！<br>',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING ,
					scope : this
				});
				return;
			}
		}
		
		var vpRecords = this.dataGrid.getStore().getRange();
		for(var i = 0; i < vpRecords.length; i++) {
			if(viewPath == vpRecords[i].get('viewPath')) {
				Ext.MessageBox.show({
					title : '提示',
					msg : 'viewPath属性值与其它组件重复，请修改！<br>',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING ,
					scope : this
				});
				return;
			}
		}
		
		var xtype = this.editForm.findField('xtype').getValue();
		var type = this.editForm.findField('type').getValue();
		
		var params = Ext.lion.LionParamsConvert(param,"widgetParams");
		Ext.apply(params, {xtype : xtype});
		
		var widgetXml = '未生成';
		Ext.Ajax.request({
			url : 'system/makeUpParamsToWidget.html',
			method : 'post',
			async : false,
			params : params,
			scope : this,
			success : function(response,options) {
				widgetXml = response.responseText;
			}
		});
		
		var fileExist = '0';
		var allowCover = '1';
		Ext.Ajax.request({
			url : 'system/decideViewPath.html',
			method : 'post',
			async : false,
			params : {viewPath : viewPath},
			scope : this,
			success : function(response,options) {
				var json = Ext.util.JSON.decode(response.responseText || "{}");
				if(json.success) {
					fileExist = json.fileExist;
					allowCover = json.allowCover;
				}
			}
		});
		
		if(fileExist == '0' && type == '0004') {
			Ext.Ajax.request({
				url : 'system/generateTbarByTemplate.html',
				method : 'post',
				async : false,
				params : {
					viewPath : viewPath,
					widgetId : this.editForm.findField('widget.id').getValue(),
					desc : this.editForm.findField('name').getValue()
				},
				scope : this,
				success : function(response,options) {
					var json = Ext.util.JSON.decode(response.responseText || "{}");
					if(json.success) {
						fileExist = '1';
					}
				}
			});
		}
		
		var RecordType = this.dataGrid.getRecordType();
		var r = new RecordType({
			'name' : this.editForm.findField('name').getValue(),
			'objectName' : objectName,
			'widget.id' : this.editForm.findField('widget.id').getValue(),
			'widget.name' : this.editForm.findField('widget.id').getText(),
			'xtype' : xtype,
			'type' : type,
			'viewPath' : viewPath,
			'region' : region,
			'fileExist' : fileExist,
			'allowCover' : allowCover,
			'widgetStatus' : '<font color="red">未引用</font>',
			'xml' : widgetXml
		});
		this.dataGrid.store.add(r);
		this.editForm.ownerCt.close();
		
		if(fileExist == '1' && allowCover == '1') {
			var m = Ext.MessageBox.confirm("提示", "文件已生成，是否预览并修改代码？",function(ret) {
				if (ret == 'yes') {
					this.showPreViewWindow(viewPath);
				}
			},this);
		}
	},
	
	widgetSave : function(dataGrid, dataLineGrid) {
		var records = dataLineGrid.getStore().getRange();
		var widgetParams = [];
		for(var i=0;i<records.length;i++){
			widgetParams.push(records[i].data);
		}
		
		var params = Ext.lion.LionParamsConvert(widgetParams,"widgetParams");
		
		var record = dataGrid.getSelections(false);
		Ext.apply(params, {xtype : record[0].get('xtype')});
		
		Ext.Ajax.request({
			url : 'system/makeUpParamsToWidget.html',
			method : 'post',
			params : params,
			scope : this,
			success : function(response,options) {
				record[0].set('xml',response.responseText);
			}
		});
	},
	
	addFormToGrid : function() {
		var records = this.dataGrid.getSelections(true);
		if(records && records.length == 2) {
			var gridPath = '';
			var formPath = '';
			var formRecordIndex = 0;
			var gridName = '';
			if(records[0].get('type') == '0002' && records[1].get('type') == '0003') {
				if(records[0].get('fileExist') != '1') {
					Ext.MessageBox.show({
						title : '提示',
						msg : '列表组件文件未生成，无法添加！<br>',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING ,
						scope : this
					});
					return;
				}
				gridPath = records[0].get('viewPath');
				gridName = records[0].get('name');
				formPath = records[1].get('viewPath');
				formRecordIndex = 1;
			} else if(records[1].get('type') == '0002' && records[0].get('type') == '0003') {
				if(records[1].get('fileExist') != '1') {
					Ext.MessageBox.show({
						title : '提示',
						msg : '列表组件文件未生成，无法添加！<br>',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING ,
						scope : this
					});
					return;
				}
				gridPath = records[1].get('viewPath');
				gridName = records[1].get('name');
				formPath = records[0].get('viewPath');
				formRecordIndex = 0;
			} else {
				Ext.MessageBox.show({
					title : '提示',
					msg : '请选择一个列表组件和一个表单组件！<br>',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING ,
					scope : this
				});
				return;
			}
			
			Ext.Ajax.request({
				url : 'system/addFormToGrid.html',
				method : 'post',
				params : {
					gridPath : gridPath,
					formPath : formPath
				},
				scope : this,
				success : function(response,options) {
					var json = Ext.util.JSON.decode(response.responseText || "{}");
					if(json.success) {
						Ext.MessageBox.show({
							title : '提示',
							msg : '整合成功！',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.INFO
						});
						records[formRecordIndex].set('widgetStatus', '<font color="blue">已整合至' + gridName + '</font>');
					}
				}
			});
		} else {
			Ext.MessageBox.show({
				title : '提示',
				msg : '请选择两个组件！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		}
	},
	
	generateList : function() {
		var records = this.dataGrid.getSelections(true);
		if(records && records.length > 0) {
			for(var i = 0; i < records.length; i++) {
				if(records[i].get('fileExist') == '0') {
					Ext.MessageBox.show({
						title : '提示',
						msg : '存在未生成文件的组件，无法生成布局！<br>',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING ,
						scope : this
					});
					return;
				}
				if(records[i].get('type') == '') {
					Ext.MessageBox.show({
						title : '提示',
						msg : '请勿选择布局文件进行布局！<br>',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING ,
						scope : this
					});
					return;
				}
			}
		}
		
		this.showWin({title : '生成布局'}, 'code/generatepage/pageinfo/list');
		var RecordType = this.widgetsGrid.getRecordType();
		for(var i = 0; i < records.length; i++) {
			var r = new RecordType({
				'name' : records[i].get('name'),
				'objectName' : records[i].get('objectName'),
				'xtype' : records[i].get('xtype'),
				'viewPath' : records[i].get('viewPath'),
				'region' : records[i].get('region'),
				'xml' : records[i].get('xml')
			});
			this.widgetsGrid.store.add(r);
		}
	},
	
	generatePage : function() {
		if(!this.pageForm.form.isValid()) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '表单数据输入不完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		}
		var viewPath = this.pageForm.findField('viewPath').getValue();
		if(viewPath.substring(viewPath.length - 1, viewPath.length) == '/') {
			Ext.MessageBox.show({
				title : '提示',
				msg : '请将文件路径填写完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		}
		var vpRecords = this.dataGrid.getStore().getRange();
		for(var i = 0; i < vpRecords.length; i++) {
			if(viewPath == vpRecords[i].get('viewPath')) {
				Ext.MessageBox.show({
					title : '提示',
					msg : 'viewPath属性值与其它组件重复，请修改！<br>',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING ,
					scope : this
				});
				return;
			}
		}
		
		var type = this.pageForm.findField('type').getValue();
		var typeName =  this.pageForm.findField('type').getText();
		var params = {
			type : type,
			viewPath : viewPath
		};
		if(this.listPageViewPath != null) {
			Ext.apply(params, {listPageViewPath : this.listPageViewPath});
		}
		if(this.editPageViewPath != null) {
			Ext.apply(params, {editPageViewPath : this.editPageViewPath});
		}
		
		var widgetRecords = this.widgetsGrid.getStore().getRange();
		if(widgetRecords.length > 0 && !this.widgetsGrid.isValid()) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '组件参数数据输入不完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		}
		var widgetContents = [];
		for(var i = 0; i < widgetRecords.length; i++) {
			widgetContents.push(widgetRecords[i].data);
		}
		Ext.apply(params, Ext.lion.LionParamsConvert(widgetContents,"widgetContents"));
		
		var paramRecords = this.paramsGrid.getStore().getRange();
		if(paramRecords.length > 0 && !this.paramsGrid.isValid()) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '布局参数数据输入不完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		}
		var widgetParams = [];
		for(var i = 0; i < paramRecords.length; i++) {
			widgetParams.push(paramRecords[i].data);
		}
		Ext.apply(params, Ext.lion.LionParamsConvert(widgetParams,"widgetParams"));
		
		Ext.Ajax.request({
			url : 'system/generatePage.html',
			method : 'post',
			params : params,
			scope : this,
			success : function(response,options) {
				var json = Ext.util.JSON.decode(response.responseText || "{}");
				if(json.success) {
					var records = this.dataGrid.getSelections(true);
					for(var i = 0; i < records.length; i++) {
						records[i].set('widgetStatus', '<font color="blue">已生成' + typeName + '</font>');
					}
					if(type == 'list') {
						this.listPageViewPath = viewPath;
					} else if(type == 'edit') {
						this.editPageViewPath = viewPath;
					}
					var RecordType = this.dataGrid.getRecordType();
					var r = new RecordType({
						'name' : typeName,
						'objectName' : type,
						'widget.id' : '',
						'widget.name' : typeName,
						'xtype' : '',
						'type' : '',
						'viewPath' : viewPath,
						'region' : '',
						'fileExist' : '1',
						'allowCover' : '1',
						'widgetStatus' : '<font color="blue">' + typeName + '文件</font>',
						'xml' : ''
					});
					this.dataGrid.store.add(r);
					
					//关闭窗口
					this.pagetbar.closeClick();
					
					var m = Ext.MessageBox.confirm("提示", "生成布局成功，是否预览并修改代码？",function(ret) {
						if (ret == 'yes') {
							this.showPreViewWindow(viewPath);
						}
					},this);
				}
			}
		});
	},
	
	showGenerateFileWin : function(record) {
		var name = record.get('name');
		var type = record.get('type');
		if(type == '0001') {
			this.showWin({title : '生成' + name + '文件'}, 'code/generatepage/panelinfo/list');
		} else if(type == '0002' || type == '0003') {
			this.showWin({title : '生成' + name + '文件'}, 'code/generatepage/widgetinfo/list');
			
			var widgetId = record.get('widget.id');
			Ext.apply(this.widgetParamsGrid.store.baseParams, {
				widgetId : widgetId
			});
		} else if(type == '0004') {
			this.showWin({title : '生成' + name + '文件'}, 'code/generatepage/tbarinfo/list');
			
			var viewPath = record.get('viewPath');
			Ext.apply(this.tbarsGrid.store.baseParams, {
				viewPath : viewPath
			});
			this.tbarsGrid.store.load();
		}
	},
	
	generateFile : function(record) {
		var type = record.get('type');
		if(type == '' || type == null) {
			return;
		}
		var fileExist = record.get('fileExist');
		var allowCover = record.get('allowCover');
		if(fileExist == '1') {
			if(allowCover == '1') {
				var m = Ext.MessageBox.confirm("提示", "确定要重新生成，覆盖原有文件吗？",function(ret) {
					if (ret == 'yes') {
						this.showGenerateFileWin(record);
					}
				},this);
			} else {
				Ext.MessageBox.show({
					title : '提示',
					msg : '引用其他模块文件，无法覆盖生成！<br>',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING ,
					scope : this
				});
			}
		} else {
			this.showGenerateFileWin(record);
		}
	},
	
	generateTbar : function() {
		var records = this.dataGrid.getSelections(true);
		var params = {
			viewPath : records[0].get('viewPath'),
			widgetDesc : records[0].get('name')
		};
		
		var tbarsRecords = this.tbarsGrid.getStore().getRange();
		if(tbarsRecords.length > 0 && !this.tbarsGrid.isValid()) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '按钮数据输入不完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		}
		var widgetContents = [];
		for(var i = 0; i < tbarsRecords.length; i++) {
			widgetContents.push(tbarsRecords[i].data);
		}
		Ext.apply(params, Ext.lion.LionParamsConvert(widgetContents,"widgetContents"));
		
		Ext.Ajax.request({
			url : 'system/generateTbar.html',
			method : 'post',
			params : params,
			scope : this,
			success : function(response,options) {
				var json = Ext.util.JSON.decode(response.responseText || "{}");
				if(json.success) {
					records[0].set('fileExist', '1');
					
					//关闭窗口
					this.tbarsTbar.closeClick();
					
					var m = Ext.MessageBox.confirm("提示", "生成文件成功，是否预览并修改代码？",function(ret) {
						if (ret == 'yes') {
							this.showPreViewWindow(records[0].get('viewPath'));
						}
					},this);
				}
			}
		});
	},
	
	generateWidget : function() {
		if(!this.widgetForm.form.isValid()) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '表单数据输入不完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		}
		
		var records = this.dataGrid.getSelections(true);
		var params = {
			widgetId : records[0].get('widget.id'),
			viewPath : records[0].get('viewPath'),
			widgetDesc : records[0].get('name'),
			className : this.widgetForm.findField('className.id').getValue()
		};
		
		var columnRecords = this.columnsGrid.getStore().getRange();
		if(columnRecords.length > 0 && !this.columnsGrid.isValid()) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '列数据输入不完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		}
		var columns = [];
		for(var i = 0; i < columnRecords.length; i++) {
			columns.push(columnRecords[i].data);
		}
		Ext.apply(params, Ext.lion.LionParamsConvert(columns,"columns"));
		
		var paramRecords = this.widgetParamsGrid.getStore().getRange();
		if(paramRecords.length > 0 && !this.widgetParamsGrid.isValid()) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '组件参数数据输入不完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		}
		var widgetParams = [];
		for(var i = 0; i < paramRecords.length; i++) {
			widgetParams.push(paramRecords[i].data);
		}
		Ext.apply(params, Ext.lion.LionParamsConvert(widgetParams,"widgetParams"));
		
		Ext.Ajax.request({
			url : 'system/generateWidget.html',
			method : 'post',
			params : params,
			scope : this,
			success : function(response,options) {
				var json = Ext.util.JSON.decode(response.responseText || "{}");
				if(json.success) {
					records[0].set('fileExist', '1');
					
					//关闭窗口
					this.widgettbar.closeClick();
					
					var m = Ext.MessageBox.confirm("提示", "生成文件成功，是否预览并修改代码？",function(ret) {
						if (ret == 'yes') {
							this.showPreViewWindow(records[0].get('viewPath'));
						}
					},this);
				}
			}
		});
	},
	
	generatePanel : function() {
		var records = this.dataGrid.getSelections(true);
		var params = {
			widgetId : records[0].get('widget.id'),
			viewPath : records[0].get('viewPath'),
			widgetDesc : records[0].get('name')
		};
		
		var panelRecords = this.panelParamsGrid.getStore().getRange();
		if(panelRecords.length > 0 && !this.panelParamsGrid.isValid()) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '组件参数数据输入不完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		}
		var widgetParams = [];
		for(var i = 0; i < panelRecords.length; i++) {
			widgetParams.push(panelRecords[i].data);
		}
		Ext.apply(params, Ext.lion.LionParamsConvert(widgetParams,"widgetParams"));
		
		Ext.Ajax.request({
			url : 'system/generateWidget.html',
			method : 'post',
			params : params,
			scope : this,
			success : function(response,options) {
				var json = Ext.util.JSON.decode(response.responseText || "{}");
				if(json.success) {
					records[0].set('fileExist', '1');
					
					//关闭窗口
					this.panelParamsTbar.closeClick();
					
					var m = Ext.MessageBox.confirm("提示", "生成文件成功，是否预览并修改代码？",function(ret) {
						if (ret == 'yes') {
							this.showPreViewWindow(records[0].get('viewPath'));
						}
					},this);
				}
			}
		});
	},
	
	downloadAllFiles : function() {
		window.open('system/downloadAllFiles.html');
	},
	
	preview : function(record) {
		if(record.get('fileExist') == '0') {
			Ext.MessageBox.show({
				title : '提示',
				msg : '文件尚未生成，无法预览！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		}
		if(record.get('allowCover') == '0') {
			Ext.MessageBox.show({
				title : '提示',
				msg : '引用其他模块文件，无法预览！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
		}
		this.showPreViewWindow(record.get('viewPath'));
	},
	
	showPreViewWindow : function(viewPath) {
		this.showWin({title : '预览代码'}, 'code/generatepage/preview/preview');
		Ext.Ajax.request({
			url : 'system/readFileByViewPath.html',
			method : 'post',
			params : {viewPath : viewPath},
			scope : this,
			success : function(response,options) {
				this.previewForm.findField('viewPath').setValue(viewPath);
				this.previewForm.findField('fileContent').setValue(response.responseText);
			}
		});
	},
	
	showPreviewUiWindow : function(record) {
		if(record.get('fileExist') == '0') {
			Ext.MessageBox.show({
				title : '提示',
				msg : '文件尚未生成，无法预览！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		}
		
		var xtype = record.get('xtype');
		if(xtype) {
			this.winWidth = 650;
			this.winHeight = 300;
			var item = Ext.create({
				manager : this,
				xtype : xtype,
				viewPath : record.get('viewPath')
			});
			this.addToWin(item, {title : '预览界面'});
			delete this.winWidth;
			delete this.winHeight;
		} else {
			var lionUiManager = new Ext.lion.LionUiManager({
				showByMain : false,
				winWidth : 650,
				winHeight : 300,
				title : '预览界面',
				viewPath : record.get('viewPath')
			});
		}
	},
	
	saveFile : function() {
		this.previewForm.form.submit({
			url : this.previewForm.submitUrl,
			method : 'post',
			scope : this,
			waitTitle : '请稍候',
			waitMsg : '正在保存...',
			success : function(form, action) {
				var json = Ext.util.JSON.decode(action.response.responseText || "{}");
				var msg = json.msg || '<br>';
				Ext.MessageBox.show({
					title : '提示',
					msg : "保存成功！" + msg,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.INFO
				});
				this.previewTbar.closeClick();
			},
			failure : function(form, action) {
				var json = Ext.util.JSON.decode(action.response.responseText || "{}");
				var msg = json.msg || '<br>';
				Ext.MessageBox.show({
					title : '提示',
					msg : '保存失败！' + msg,
					buttons : Ext.MessageBox.OK,
					fn : function(){},
					icon : Ext.MessageBox.ERROR,
					scope : this
				});
				this.previewTbar.closeClick();
			}
		});
	}
});