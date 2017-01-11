ImportDataWindow = function(config){
	Ext.apply(this,config);
	
	var settingId = new Ext.lion.LionHiddenField({
		hidden : true,
		name : 'settingId',
		value : this.settingId
	});
	
	var mainId = new Ext.lion.LionHiddenField({
		hidden : true,
		name : 'mainId',
		value : this.mainId ? this.mainId : ''
	});
	
	var warning = new Ext.form.Label({
		html : '请确保导入文件符合标准格式<br>' + (this.precautions || ''),
		style : 'color : red;'
	});
	
	var template = new Ext.form.Label({
		html : this.docId ? ("<a href='system/downloadDocument.html?id="+this.docId+"'><font color='green'>模板下载</font></a>") : "无模版"
	});
	
	var excelFile = new Ext.form.TextField({
		fieldLabel : "选择文件",
		inputType : 'file',
		name : 'excel',
		allowBlank : false
	});
	
	var notClear = new Ext.lion.LionRadio({
		name : 'isClear',
		fieldLabel : '是否清空数据',
		boxLabel : '保留原有数据',
		checked : true,
		inputValue : '0'
	});
	
	var clear = new Ext.lion.LionRadio({
		name : 'isClear',
		fieldLabel : '',
		boxLabel : '清空原有数据',
		allowBlank : true,
		inputValue : '1'
	});
	
	var fieldSet = new Ext.form.FieldSet({
		border : false,
		layout : 'form',
		autoHeight : true,
		defaults : {
			border : false,
			layout : "column",
			labelAlign : "right",
			labelWidth : 90
		},
		items : [{
			defaults : {
				border : false,
				layout : "form",
				columnWidth : 1
			},
			items : [
				{items : [excelFile]},
				{items : [notClear]},
				{items : [clear]},
				{items : [warning]},
				{items : [template]},
				{items : [settingId]},
				{items : [mainId]}
			]
		}]
	});
	
	this.importForm = new Ext.form.FormPanel({
		border : false,
		fileUpload : true,
		items : [fieldSet]
	});
	
	ImportDataWindow.superclass.constructor.call(this, {
		title : this.title ? this.title : '数据导入',
		width : this.width ? this.width : 400,
		height : this.height,
		autoHeight : true,
		resizable : false,
		autoScroll : true,
		closable : true,
		constrain : true,
		modal : true,
		bodyStyle : 'padding:5px 5px 5px 5px',
		items : [this.importForm],
		buttonAlign : 'center',
		buttons : [{
			text : '确定',
			scope : this,
			iconCls : 'save-icon',
			handler : this.submitForm
		},{
			text : '关闭',
			scope : this,
			iconCls : 'close-icon',
			handler : this.close
		}]
	});
};

Ext.extend(ImportDataWindow, Ext.lion.LionWindow, {
	
	submitForm : function(){
		if(!this.importForm.form.isValid()) {
			Ext.Msg.alert('提示', '请先选择文件！');
			return;
		}
		
		this.importForm.form.submit({
			url : 'system/importData.html',
			method : 'post',
			waitTitle : "请稍等",
			waitMsg : '正在导入数据，这可能需要几分钟，请耐心等待......！',
			scope : this,
			success : function(form, action){
				this.close();
				var json = Ext.util.JSON.decode(action.response.responseText || "{}");
				var msg = json.msg || '<br>';
				
				Ext.MessageBox.minWidth = 230;
				Ext.MessageBox.show({
					title : '提示',
					msg : '导入成功！<br>' + msg,
					scope : this,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.INFO
				});
				Ext.MessageBox.minWidth = 150;
				
				if(this.dataGrid) {
					if(this.dataGrid.xtype != "liontreegrid") {
						this.dataGrid.store.reload();
					} else {
						this.dataGrid.refreshRecord();
					}
				}
			},
			failure : function(form, action){
				var json = Ext.util.JSON.decode(action.response.responseText || "{}");
				var msg = json.msg || "加载数据错误，请稍后重试！";
				Ext.MessageBox.show({
					title : '提示',
					msg : '导入失败！<br>' + msg,
					scope : this,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
				this.close();
			}
		});
	}

});
