/**
 * @description ：评议审核
 * @date ：2015-05-18
 * @author ：曹鹏程
 */

Ext.lion.rpms.ReviewAuditManager = function(config) {
    Ext.apply(this,config);
    Ext.lion.rpms.ReviewAuditManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.ReviewAuditManager, Ext.lion.LionBusinessManager, {
    bussinessInit : function() {
    	this.on({
			'beforesave' : {
				fn : function() {
					this.editForm.findField("status").setValue('0006');
				},
				scope : this
			},
		});
    },
    
    /**
     * 审批功能
     */
    approvePro : function(){
        var records = this.dataGrid.getSelections(true);
        if (records && records.length > 0) {
            if(records[0].get('status') !='0004'){
               Ext.MessageBox.show({
                   title : '系统提示',
                   msg : '只有等待审批的单据才能审批！',
                   buttons : Ext.MessageBox.OK,
                   icon : Ext.MessageBox.WARNING,
                   scope : this
               });
               return ;
            }
            this.actionMode = "2";
            this.editable = true;
            this.mainId = records[0].get(this.dataGrid.getFieldName("id"));
            if (this.fireEvent("beforeedit", this)) {
                var win = this.showEditWin({
                    title: "编辑信息"
                }, "1", this.editView);
                this.editForm.mainId = records[0].get(this.dataGrid.getFieldName("id"));
                this.editForm.editable = true;
                this.editForm.loadFormData({
                    id: this.editForm.mainId
                });
                if (this.lineGrids && this.lineGrids.length > 0) {
                    var line;
                    for (var i = 0; i < this.lineGrids.length; i++) {
                        line = this.lineGrids[i];
                        if (line && line.getStore().autoLoad) this.setQueryCondition(line, [line.fkName], ["="], [this.editForm.mainId])
                    }
                }
            }
        }
    }
    
});
