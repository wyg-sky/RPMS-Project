/**
 * @description : 项目调度管理
 * @date : 2015-03-10 14:59:24
 * @author : 曹鹏程
 */

Ext.lion.rpms.ProjectDispatchManager = function(config) {
    Ext.apply(this,config);
    Ext.lion.rpms.ProjectDispatchManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.ProjectDispatchManager, Ext.lion.LionBusinessManager, {
    bussinessInit : function() {
		this.query();
        this.on({
            'showedit' : {
                fn : Ext.emptyFn,
                scope: this
            },
            'beforesave' : {
				fn : function() {
					var status = this.editForm.findField('status').getValue();
					var projectId  = this.editForm.findField('projectId.id').getValue();
					var projectStage  = this.editForm.findField('projectStage').getValue();
					var ysxjjxy  = this.editForm.findField('ysxjjxy').getValue();
					var investmentTotal  = this.editForm.findField('investmentTotal').getValue();
					if(status =='0003'){
						this.editForm.findField('status').setValue('0004');
						/**更改 项目立项管理模块 中对应记录的 项目进展阶段 状态*/
						Ext.Ajax.request({
							url : 'rpms/changeProjectStage.html',
							params : {
								projectId : projectId,
								ysxjjxy : ysxjjxy,
								investmentTotal : investmentTotal,
								projectStage : projectStage
							},
							scope : this,
							waitTitle : '请稍候',
							waitMsg : '设置中...',
							success:function(response){}
						});
						/**end*/
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
     * 获取最新调度项目
     */
    genNewDispatch : function(){
    	var dispatchMonth = this.queryForm.findField('dispatchMonth').getValue();
    	Ext.Ajax.request({
			url : 'rpms/genNewProjectDispatch.html',
			params : {
				dispatchMonth : dispatchMonth
			},
			scope : this,
			waitTitle : '请稍候',
			waitMsg : '设置中...',
			success:function(response){
				 var json = Ext.util.JSON.decode(response.responseText || "{}");
                 if(json.success) {
                	 this.dataGrid.getStore().reload();
                 } 
                 if(!json.success){
                	 var msg = json.msg;
                	 Ext.MessageBox.show({
                         title : '失败',
                         msg : msg,
                         buttons : Ext.MessageBox.OK,
                         fn : function(){},
                         icon : Ext.MessageBox.WARNING,
                         scope : this
                     });
                 }
			}
		});
    },
    
    //计算统计合计
    genTjhjSum : function(field,newValue,oldValue){
    	var nv = Math.round(newValue*1000000);
    	var ov = Math.round(oldValue*1000000);
    	if(isNaN(nv) || isNaN(ov)){
    		Ext.MessageBox.alert("提示", '请正确输入数字!');
    		field.setValue(oldValue);
    		return;
    	}
    	
    	var sum = this.manager.editForm.findField("tjhj").getValue();
    	sum = Math.round(sum*1000000) + Math.round(newValue*1000000) - Math.round(oldValue*1000000);
    	this.manager.editForm.findField("tjhj").setValue(sum/1000000);
    }
});
