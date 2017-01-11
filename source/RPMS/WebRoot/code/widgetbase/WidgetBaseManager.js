
Ext.lion.system.WidgetBaseManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.WidgetBaseManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.system.WidgetBaseManager, Ext.lion.LionBusinessManager, {
	
	addLineObject : function() {
		var RecordType = this.dataLineGrid.getRecordType();
		var sortorder = this.dataLineGrid.getStore().getRange().length + 1;
		var r = new RecordType({
			'mainId' : this.mainId,
			'sortOrder' : sortorder
		});
		this.dataLineGrid.store.add(r);
	},
	
	defaultWidgetSetting : function() {
		this.manager.showWin({title : '默认组件设置'}, 'code/widgetbase/defaultlist');
	},
	
	addDefaultWidget : function() {
		var RecordType = this.manager.defaultGrid.getRecordType();
		var sortorder = this.manager.defaultGrid.getStore().getRange().length + 1;
		var r = new RecordType({
			'sortOrder' : sortorder
		});
		this.manager.defaultGrid.store.add(r);
	},
	
	saveDefaultWidgetSetting : function() {
		var records = this.manager.defaultGrid.getStore().getRange();
		if(records.length > 0 && !this.manager.defaultGrid.isValid()) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '数据输入不完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		}
		
		var params = [];
		for(var i = 0; i < records.length; i++) {
			params.push(records[i].data);
		}
		var params = Ext.lion.LionParamsConvert(params,"defaultWidgets");
		
		Ext.Ajax.request({
			url : 'system/saveDefaultWidgets.html',
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
				} else {
					Ext.MessageBox.show({
						title : '提示',
						msg : '保存失败！<br>',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING ,
						scope : this
					});
				}
				this.manager.defaultTbar.closeClick();
			}
		});
	}
	
});