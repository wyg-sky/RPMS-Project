 /**
 * @description : 用户消息管理
 * @date : 2013-04-01
 * @author : 周亚京
 */
Ext.lion.system.UserNoticeManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.UserNoticeManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.system.UserNoticeManager, Ext.lion.LionBusinessManager, {
	/**
	 * @description : 重写grid查看gridViewObject方法，查看的同时将消息状态更改为已读
	 * @scope ：this
	 * @author : 周亚京
	 * @date : 2013-04-09 15:00:38
	 */
	gridViewObject : function(dataGrid){
		if(dataGrid.plugins) {
			this.editable = false;
			var records = dataGrid.getSelections(true);
			Ext.Ajax.request({
				url : 'system/changeUserNoticeStatus.html',
				method : 'post',
				params : {ids : records[0].get(this.dataGrid.objectName + '.id')},
				scope : this,
				success : function(response,options) {
					this.dataGrid.store.reload();
					if(this.fireEvent('beforegridview', this) && records) {
						dataGrid.plugins.editForm.runMode = '2';
						
						dataGrid.plugins.startEditing(records[0], 'look');
					}
				},
				failure : function() {
					Ext.MessageBox.show({
						title : '失败',
						msg : '标记失败 !',
						buttons : Ext.MessageBox.OK,
						fn : function(){},
						icon : Ext.MessageBox.ERROR,
						scope : this
					});
				}
			});
		} else {
			this.viewObject();
		}
	}
});