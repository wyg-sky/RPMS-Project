/**
 * @description : 任务管理
 * @date : 2013-12-30 16:25:12
 * @author : 周亚京
 */
Ext.lion.system.CodeDutyManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.CodeDutyManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.system.CodeDutyManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		
	},
	
	addLineObject : function() {
		var RecordType = this.dataLineGrid.getRecordType();
		this.dataLineGrid.store.add(new RecordType());
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
					} else {
						e.set('tableName',json.tableName);
					}
				} else {
					if(isMain) {
						e.findField('tableName').setValue('');
					} else {
						e.set('tableName','');
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
	
	toGenerate : function(record) {
		FW.dutyId = record.get('id');
		FW.sendToModuleByUrl('生成类包', 'code/generator/generator.jsp');
	}
});
