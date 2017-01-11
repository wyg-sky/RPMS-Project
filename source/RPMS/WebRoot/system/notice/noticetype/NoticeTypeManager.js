 /**
 * @description : 消息类型管理
 * @date : 2013-04-01
 * @author : 周亚京
 */
Ext.lion.system.NoticeTypeManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.NoticeTypeManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.system.NoticeTypeManager, Ext.lion.LionBusinessManager, {
	/**
	 * 覆盖父类的方法
	 */
	addLineObject : function(){
		var selectWin = new Ext.lion.LionSelectWindow({
			viewPathOfUi : 'system/role/list',
			hql : FW.isAdmin? "" : (" and obj.id in (select ur.role.id from UserRole as ur where ur.user.id='" + FW.userId + "')"),
			title : '角色选择'
		});
		
		selectWin.on('after_comfirm_click', function(records) {
			var RecordType = this.dataLineGrid.getRecordType();
			for(var i = 0; i< records.length; i++) {
				var r = new RecordType({
					'id' : records[i].get('id'),
					'name' : records[i].get('name'),
					'roleType' : records[i].get('roleType')
				});
				this.dataLineGrid.store.add(r);
			}
		}, this);
	}
});