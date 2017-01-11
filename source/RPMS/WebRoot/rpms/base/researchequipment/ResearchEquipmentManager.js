/**
 * @description : 创新设备管理
 * @date : 2015-03-09 16:47:04
 * @author : WangYG
 */

Ext.lion.rpms.ResearchEquipmentManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.ResearchEquipmentManager.superclass.constructor.call(this);
	this.myMask = new Ext.LoadMask(Ext.getBody(), {
		msg: '正在导入数据，这可能需要几分钟，请耐心等待......！',
		removeMask: true 
	});
};

Ext.extend(Ext.lion.rpms.ResearchEquipmentManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
			'showedit' : {
				fn : Ext.emptyFn,
				scope: this
			},
		   'beforeedit': {
                fn : this.isEditable,
                scope: this
            },
            'beforeview' :{
                fn : this.isViewable,
            scope: this
            }
		});
		
		this.dataGrid.on('celldblclick', function() {
			this.viewObject();
		}, this);
		
		this.listPlatTree.items.items[0].on('click',this.onPlatTreeClick, this);
	},
    /*
     * 单击左侧平台树方法 (只传入当前树节点的platId)
     */
	onPlatTreeClick : function(node, e) {
        this.clearQuery(this.queryForm, this.dataGrid, false);
        var params = {
            platId : node.id
        };
        Ext.apply(this.dataGrid.store.baseParams, params);
        this.dataGrid.store.reload();
    },
	
   /*onPlatTreeClick : function(node, e) {
        if(node.parentNode.parentNode ===null){  //如果为分中心
            this.queryForm.findField("platCenter.id").setValue({value:node.id,text:node.text});
            this.queryForm.findField("platInstitution.id").clearValue();
        } else {
            this.queryForm.findField("platCenter.id").setValue({value:node.parentNode.id,text:node.parentNode.text});
            this.queryForm.findField("platInstitution.id").setValue({value:node.id,text:node.text});
        }
        this.query();
    },*/
	
   isViewable : function(){
        var records = this.dataGrid.getSelections(true);
        if(records.length <= 0){
            Ext.MessageBox.alert("提示","请选择要查看的记录");
            return false;
        }else if(records.length >1){
            Ext.MessageBox.alert("提示","一次只能查看一条记录");
            return false;
        }
        return true;
    },
    
    isEditable : function() {
        var records = this.dataGrid.getSelections(true);
        if(records.length <= 0){
            Ext.MessageBox.alert("提示","请选择要编辑的记录");
            return false;
        }else if(records.length >1){
            Ext.MessageBox.alert("提示","一次只能编辑一条记录");
            return false;
        }
        return true;
    },  
    
    /*
     * 导入功能
     */
    importEquipment : function () {
        this.showWin({title:'导入'}, 'rpms/base/researchequipment/import');
    },
    /*
     * 导入功能
     * 保存按钮
     */
    saveImport: function(){
    	var fileName = this.importForm.findField("fileObject").getValue();
        if(fileName == ""){
             Ext.MessageBox.show({
                    title : '提示',
                    msg : '请选择文件！',
                    buttons : Ext.MessageBox.OK,
                    icon : Ext.MessageBox.INFO,
                    scope : this
                });
            return;
        }
        var importType = this.importForm.findField("importType").getValue();
        this.importForm.form.submit({
            url: "rpms/saveImportEquipment.html",
            method: 'post',
            waitTitle : "请稍等",
            waitMsg : '正在导入数据，这可能需要几分钟，请耐心等待......！',
            scope : this,
            params : {
            	importType : importType
            },
            success: function(form, action){
                var json = Ext.util.JSON.decode(action.response.responseText || "{}");
                Ext.Msg.alert('提示',json.msg);
                this.importForm.ownerCt.close();
                this.query();
            },
            failure:function(form, action){
                this.importForm.ownerCt.close();
                Ext.Msg.alert('错误','文档格式不正确！');
                this.query();
            }
        });
    }
	
});
