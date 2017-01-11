 /**
 * @description : 单位业务逻辑
 * @date : 2012-12-21
 * @author : 王绪乐
 */
Ext.lion.system.OrganizationManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.OrganizationManager.superclass.constructor.call(this);
}

Ext.extend(Ext.lion.system.OrganizationManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.dataGrid.store.load({callback : function(){this.dataGrid.store.expandParentNode(this.dataGrid.store,'');}, scope : this});
		
		this.on('beforeadd', function() {
			var records = this.dataGrid.getSelections(false);
			if(records && records.length > 0) {
				this.parentId = records[0].get(this.dataGrid.getFieldName('id'));
				this.parentName = records[0].get(this.dataGrid.getFieldName('name'));
			} else {
				this.parentId = '';
				this.parentName = '';
			}
		}, this);
	}
});