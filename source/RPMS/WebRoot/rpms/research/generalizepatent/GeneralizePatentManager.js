/**
 * @description ：专利推广管理
 * @date ：2015-03-09
 * @author ：周强
 */

Ext.lion.rpms.GeneralizePatentManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.GeneralizePatentManager.superclass.constructor.call(this);
	this.dataGrid.on('onload', function() {
	}, this);
};
Ext.extend(Ext.lion.rpms.GeneralizePatentManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
			'showview' : {
				fn : function(){
					this.uploadFileGrid.getStore().on('beforeload',function(){
						 this.setQueryCondition(this.uploadFileGrid,["obj.docType.id","obj.docFk"],['=','='],['2c9082b34d468170014d50e16aa6048b',this.mainId]);
					},this);
				},
				scope: this
			},
			'showedit' : {
				fn : function(){
					this.uploadFileGrid.getStore().on('beforeload',function(){
						 this.setQueryCondition(this.uploadFileGrid,["obj.docType.id","obj.docFk"],['=','='],['2c9082b34d468170014d50e16aa6048b',this.mainId]);
					},this);
				},
				scope: this
			}
		});
		//this.listPlatTree.items.items[0].on('click',this.onPlatTreeClick, this);
	},
	
	query:function(E, B, A, _, C, D){
		var params = this.queryForm.getForm().getValues();
//		if(params.spreadType == '' || params.spreadType == null){
//			this.dataGrid.store.baseParams.hql = " and(obj.spreadType is null or obj.spreadType is not '0003')";
//		} else {
//			delete this.dataGrid.store.baseParams.hql;
//		}
		Ext.lion.rpms.GeneralizePatentManager.superclass.query.call(this,E, B, A, _, C, D);
	},
	/**
	 * 更新保护状态
	 */
	changeProtectStatus:function(){
		var protectDate = this.editForm.findField('protectDate').getValue();
		var statusField =  this.editForm.findField('valid');
		var date = new Date(protectDate);
		if(date.getTime() > new Date().getTime() || protectDate == null){
			statusField.setValue("0001");//保护中
		} else {
			statusField.setValue("0002");//保护到期
		}
	},
	
	clearQuery : function (A, _, $) {
		if (!A)
			A = this.queryForm;
		if (!_)
			_ = this.dataGrid;
		if (A)
			A.form.reset();
		delete _.store.baseParams.queryFields;
		delete _.store.baseParams.operatorValues;
		delete _.store.baseParams.fieldValues;
		this.dataGrid.store.baseParams.hql = " and(obj.spreadType is null or obj.spreadType is not '0003')";
		if ($ != false)
			_.store.load()
	},
	
	spreadShow:function(){
		this.actionMode = "2";
		this.editable = true;
		var selected = this.dataGrid.getSelections(true);
		
		if(!selected || selected.length == 0){
			return;
		}
		var mainId = selected[0].get(this.dataGrid.getFieldName("id"));
		if(selected && selected.length > 0){
			this.showWin({title:'推广'},"rpms/research/generalizepatent/speadedit");
			this.spreadEeditForm.loadFormData({
				id : mainId
			});
		};
	
	},
	spread:function(){
		if(this.spreadEeditForm.getForm().isValid()){
			this.spreadEeditForm.on("aftersave", function () {
				this.manager.dataGrid.getStore().reload();
				this.findParentByType("window").close();
			});
			this.spreadEeditForm.save();
		};	
	}
	/*
	 * 点击平台树
	 */
	/*onPlatTreeClick : function(node, e) {
		if(node.parentNode.parentNode ===null){  //如果为分中心
			this.queryForm.findField("platCenter.id").setValue({value:node.id,text:node.text});
			this.queryForm.findField("platInstitution.id").clearValue();
		} else {
			this.queryForm.findField("platCenter.id").setValue({value:node.parentNode.id,text:node.parentNode.text});
			this.queryForm.findField("platInstitution.id").setValue({value:node.id,text:node.text});
		}
		this.query();
	}*/
});
