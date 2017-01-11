/**
 * @description : 项目评议
 * @date : 2015-03-10 15:56:38
 * @author : 曹鹏程
 */

Ext.lion.rpms.ProjectReviewManager = function(config) {
    Ext.apply(this,config);
    Ext.lion.rpms.ProjectReviewManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.ProjectReviewManager, Ext.lion.LionBusinessManager, {
    bussinessInit : function() {
        this.on({
            'showedit' : {
                fn : Ext.emptyFn,
                scope: this
            },
            'beforesave' : {
				fn : function() {
					var status = this.editForm.findField('status').getValue();
					var temp = this.editForm.findField('temp').getValue();
					if(temp!=1){
						if(status =='0003'){
							this.editForm.findField('status').setValue('0004');
						}
						if(status =='0004'){
							this.editForm.findField('status').setValue('0005');
						}
						if(status =='0006'){
							this.editForm.findField('status').setValue('0005');
						}
					}
				},
				scope : this
			}
        });
//        this.listPlatTree.items.items[0].on('click',this.onPlatTreeClick, this);
    },
    
    onPlatTreeClick : function(node, e) {
        this.clearQuery(this.queryForm, this.dataGrid, false);
        var params = {
                platId  : node.id
        };
        Ext.apply(this.dataGrid.store.baseParams,params);
        this.dataGrid.store.reload();
    },
    //添加人才信息
    addTalent : function(){
        var selectWin = new Ext.lion.LionSelectWindow({
            viewPathOfUi : 'rpms/base/researchtalent/list',
            width : 900,
            title : '验收专家组明细'
        });
        selectWin.on('after_comfirm_click', function(records) {
            var RecordType = this.dataLineGrid.getRecordType();
            var str = "";
            for(var i = 0; i< records.length; i++) {
                var bool = false;
                var recordstemp = this.dataLineGrid.getStore().getRange();
                for(var k = 0; k < recordstemp.length; k++){
                    var str1 = "";
                    if(recordstemp[k].get('talentId.id') == records[i].get('id')){
                        bool = true;
                        str1 = recordstemp[k].get('talentId.id');
                        str += str1 + ',';
                    }
                }
                
                if(!bool){
                    var r = new RecordType({
                        'mainId' : this.mainId,
                        'talentId.id' : records[i].get('id'),
                        'talentId.talentName' : records[i].get('talentName'),
                        'talentId.position' : records[i].get('position'),
                        'talentId.grade' : records[i].get('grade'),
                        'talentId.title' : records[i].get('title'),
                        'talentId.discipline' : records[i].get('discipline')
                    });
                    this.dataLineGrid.store.add(r);
                }
                
            }
            if(str.length>1){
                str = str.substring(0,str.length-1);
                var st = "专家已存在不能再重复添加!";
                Ext.MessageBox.alert("提示",st);
            }
                
        }, this);
    
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
                   msg : '只有等待中心审核的单据才能审核！',
                   buttons : Ext.MessageBox.OK,
                   icon : Ext.MessageBox.WARNING,
                   scope : this
               });
               return ;
            }
            this.actionMode = "2";
            this.editable = true;
            this.approve = false;
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
            this.approve = true;
        }
    },
    
    /**
     * 完成功能
     */
    completePro : function(){
        var records = this.dataGrid.getSelections(true);
        this.approve = false;
        if (records && records.length > 0) {
            if(records[0].get('status') !='0004'&&records[0].get('status') !='0006'){
               Ext.MessageBox.show({
                   title : '系统提示',
                   msg : '只有等待审批和专家已审批的单据才能完成！',
                   buttons : Ext.MessageBox.OK,
                   icon : Ext.MessageBox.WARNING,
                   scope : this
               });
               return ;
            }
            this.actionMode = "2";
            this.editable = true;
            this.acceptanceT = false;
            this.mainId = records[0].get(this.dataGrid.getFieldName("id"));
            if (this.fireEvent("beforeedit", this)) {
                var win = this.showEditWin({
                    title: "编辑信息"
                }, "1", this.editView);
                this.editForm.mainId = records[0].get(this.dataGrid.getFieldName("id"));
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
            this.acceptanceT = true;
        }
    },
    
    /**
     * 成果录入功能
     */
    inputPro : function(){
        var records = this.dataGrid.getSelections(true);
        this.approve = false;
        if (records && records.length > 0) {
            this.actionMode = "2";
            this.editable = true;
            this.approve = true
            this.inputinto = false;
            this.mainId = records[0].get(this.dataGrid.getFieldName("id"));
            if (this.fireEvent("beforeedit", this)) {
                var win = this.showEditWin({
                    title: "编辑信息"
                }, "1", "rpms/research/projectreview/achievementedit");
                this.editForm.mainId = records[0].get(this.dataGrid.getFieldName("id"));
                this.editForm.loadFormData({
                    id: this.editForm.mainId
                });
                this.editForm.on('load',function(){
                	this.editForm.findField("temp").setValue("1");
                },this);
                if (this.lineGrids && this.lineGrids.length > 0) {
                    var line;
                    for (var i = 0; i < this.lineGrids.length; i++) {
                        line = this.lineGrids[i];
                        if (line && line.getStore().autoLoad) this.setQueryCondition(line, [line.fkName], ["="], [this.editForm.mainId])
                    }
                }
            }
            this.inputinto = true;
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
    },
    
    
    /**
     * 查看功能
     */
    viewObject : function(){
        var records = this.dataGrid.getSelections(true);
            this.actionMode = "3";
            this.editable = false;
            this.approve = true;
            this.inputinto = false;
            this.mainId = records[0].get(this.dataGrid.getFieldName("id"));
            if (this.fireEvent("beforeview", this)) {
                var win = this.showEditWin({
                    title: "查看信息"
                }, "2", this.editView);
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
            this.inputinto = true;
            this.approve = true;
    }
    
});
