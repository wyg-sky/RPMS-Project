 /**
 * @description : 系统F风格定义界面逻辑类
 * @date : 2013-03-31
 * @author : xuehp
 */
Ext.lion.system.ThemeManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.ThemeManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.system.ThemeManager, Ext.lion.LionBusinessManager, {
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