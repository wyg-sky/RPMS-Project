 /**
 * @description : 单位业务逻辑
 * @date : 2012-12-21
 * @author : 王绪乐
 */
Ext.lion.system.DepartmentManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.DepartmentManager.superclass.constructor.call(this);
	
	this.setQueryCondition(this.dataGrid, ['obj.organization.id'], ['='], [FW.organizationId]);
}

Ext.extend(Ext.lion.system.DepartmentManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.dataGrid.store.on('load', function() {
			this.dataGrid.store.expandParentNode(this.dataGrid.store,'');
		}, this);
		
		this.listOrgTree.items.items[0].loader.on('load',function(loader, node, response ){
			if(node && node.firstChild) {
				node.firstChild.select();
    	        this.onOrgTreeClick(node.firstChild);
			}
	    },this)
	    
		this.listOrgTree.items.items[0].on('click',this.onOrgTreeClick, this);
		
		this.on('beforeadd', function() {
			var records = this.dataGrid.getSelections(false);
			if(records && records.length > 0) {
				this.parentId = records[0].get(this.dataGrid.getFieldName('id'));
				this.parentName = records[0].get(this.dataGrid.getFieldName('name'));
				this.organizationId = records[0].get(this.dataGrid.getFieldName('organization.id'));
				this.organizationName = records[0].get(this.dataGrid.getFieldName('organization.name'));
			} else {
				this.parentId = '';
				this.parentName = '';
				this.organizationId = '';
				this.organizationName = '';
			}
		}, this);
	},
	
	/**
	 * 单位选择后，清空部门选择框
	 */
	orgtreeSelect : function(depttree){
		depttree.setValue({id:"",text :""});
	},
	
	onOrgTreeClick : function(node, e) {
		this.clearQuery(this.queryForm, this.dataGrid, false);
		this.query(this.queryForm, this.dataGrid, false, ['obj.organization.id'], ['='], [node.id]);
	}
	
});