/**
 * @description : 外部项目申报
 * @date : 2015-03-10 14:27:23
 * @author : 曹鹏程
 */

Ext.lion.rpms.ProjectReportManager = function(config) {
    Ext.apply(this,config);
    Ext.lion.rpms.ProjectReportManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.ProjectReportManager, Ext.lion.LionBusinessManager, {
    bussinessInit : function() {
        this.on({
            'showedit' : {
                fn : Ext.emptyFn,
                scope: this
            },
            'beforesave' : {
				fn : function() {
					var status = this.editForm.findField('status').getValue();
					if(status =='0003'){
						this.editForm.findField('status').setValue('0004');
					}
				},
				scope : this
			}
        });
        this.listPlatTree.items.items[0].on('click',this.onPlatTreeClick, this);
    },
    
    onPlatTreeClick : function(node, e) {
        this.clearQuery(this.queryForm, this.dataGrid, false);
        var params = {
                platId  : node.id
        };
        Ext.apply(this.dataGrid.store.baseParams,params);
        this.dataGrid.store.reload();
    },
    
     /**
     * 审批功能
     */
    approvePro : function(){
        var records = this.dataGrid.getSelections(true);
        if (records && records.length > 0) {
            if(records[0].get('status') !='0003'){
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
    },
    
     /**
     * 项目明细
     * 新增按钮
     */
    addItem : function(){
        var RecordType = this.itemGrid.getRecordType();
        this.itemGrid.store.add(new RecordType());
    },
    
    /**
     * 项目明细
     * 删除按钮
     */
    deleteItem: function(){
        var records = this.itemGrid.getSelections(true);
        this.itemGrid.store.remove(records);
    }
    
});
