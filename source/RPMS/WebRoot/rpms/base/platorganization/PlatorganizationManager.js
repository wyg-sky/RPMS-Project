 /**
 * @description : 单位平台映射管理
 * @date : 2016-10-28
 * @author : 杨尚山
 */
Ext.lion.system.PlatorganizationManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.PlatorganizationManager.superclass.constructor.call(this);
}

Ext.extend(Ext.lion.system.PlatorganizationManager, Ext.lion.LionBusinessManager, {
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