/**
 * @description : 论文评比管理
 * @date : 2015-03-16 09:20:38
 * @author : 周强
 */

Ext.lion.rpms.ThesisApplicationManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.ThesisApplicationManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.ThesisApplicationManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
		'showedit' : {
			fn : Ext.emptyFn,
			scope: this
		}
		});
		this.listPlatTree.items.items[0].on('click',this.onPlatTreeClick, this);
	},
	/*
	 * 点击平台树
	 */
	onPlatTreeClick : function(node, e) {
		if(node.parentNode.parentNode ===null){  //如果为分中心
			this.queryForm.findField("platCenter.id").setValue({value:node.id,text:node.text});
			this.queryForm.findField("platInstitution.id").clearValue();
		} else {
			this.queryForm.findField("platCenter.id").setValue({value:node.parentNode.id,text:node.parentNode.text});
			this.queryForm.findField("platInstitution.id").setValue({value:node.id,text:node.text});
		}
		this.query();
	},
	setThesis:function(record){
		this.editForm.findField('publicationName').setValue(record[0].get('periodicalName'));
		this.editForm.findField('cn').setValue(record[0].get('periodicalCn'));
		this.editForm.findField('issn').setValue(record[0].get('periodicalIssn'));
		this.editForm.findField('publicationDate').setValue(record[0].get('realeaseDate'));
		this.editForm.findField('pubNum').setValue(record[0].get('pubNum'));
		this.editForm.findField('pubdate').setValue(record[0].get('pubtime'));
	},
	changeStatus:function(property,value,tip){
		var selected = this.dataGrid.getSelections(true);
		var length = selected.length;
		if(!selected || length == 0){
			return;
		}
		if(value ==='0002'){  //上报
			for(index =0;index < length; index++){
				var status = selected[index].get('status');
				if(status > '0002' &&  status!='0004'){
					Ext.Msg.alert("提示","数据已上报,无法重上报");
					return;
				}
			}
		} else if(value ==='0003'){  //审批
			for(index =0;index < length; index++){
				var status = selected[index].get('status');
				if(status === '0004'){
					Ext.Msg.alert("提示","打回的数据无法审批");
					return;
				}
				
				if(status > '0003' &&  status!='0004'){
					Ext.Msg.alert("提示","数据已审批,不能重复审批");
					return;
				}
			}
		}else if(value ==='0004'){  //打回
			for(index =0;index < length; index++){
				var status = selected[index].get('status');
				if(status >= '0003' && status!=="0004"){
					Ext.Msg.alert("提示","已审批的数据无法打回");
					return;
				}
			}
		}
		
		Ext.lion.rpms.ThesisApplicationManager.superclass.changeStatus.call(this,property,value,tip);
	},
	
	/**
	 * 获奖form
	 */
	awardShow:function(){
		this.actionMode = "2";
		this.editable = true;
		var selected = this.dataGrid.getSelections(true);
		
		if(!selected || selected.length == 0){
			return;
		}
		if(selected[0].get("status")==="0005"){
			Ext.Msg.alert("提示","该论文获奖信息修改请到论文管理模块");
			return;
		}
		
		if(selected[0].get("status")!=="0003"){
			Ext.Msg.alert("提示","只有状态为审批通过的才能录入获奖信息");
			return;
		}
		
		var mainId = selected[0].get(this.dataGrid.getFieldName("id"));
		if(selected && selected.length > 0){
			this.showWin({title:'获奖'},"rpms/thesis/thesisapplication/awardedit");
			this.awardEditForm.loadFormData({
				id : mainId
			});
		};
	},
	/**
	 * 获奖
	 */
	award:function(){
		var statusField = this.awardEditForm.findField("status");
			statusField.setValue("0005");//0005已获奖
		if(this.awardEditForm.getForm().isValid()){
			Ext.Msg.confirm("提示","保存成功后，论文获奖信息将被存入相应的论文管理中，如需修改请到论文管理",
				function(btn){
					if(btn==="yes"){
						this.awardEditForm.on("aftersave", function () {
							this.manager.dataGrid.getStore().reload();
							this.findParentByType("window").close();
						});
						//保存提交
						this.awardEditForm.save(this.getLineGrids());
					}
			},this);
			
		} else {
			return;
		}
	},
	getLineGrids:function(){
		/**
		 * 以下代码拷贝自Ext.lion.LionBusinessManager  提交子表数据
		 */
		var D={};
		if (this.lineGrids && this.lineGrids.length > 0) {
			var _;
			for (var B = 0; B < this.lineGrids.length; B++) {
				_ = this.lineGrids[B];
				var E = _.getStore().getRange();
				if (E.length > 0 && !_.isValid()) {
					Ext.MessageBox.show({
						title : "\u63d0\u793a",
						msg : "\u5b50\u8868\u6570\u636e\u8f93\u5165\u4e0d\u5b8c\u6574\uff01<br>",
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING,
						scope : this
					});
					return
				}
				var C = [];
				for (var F = 0; F < E.length; F++) {
					if (this.awardEditForm.runMode == "3") {
						E[F].set(_.getFieldName("id"), null);
						E[F].set(_.getFieldName(_.fkName), null)
					}
					C.push(E[F].data)
				}
				var A = _.lineName;
				if (_.autoMain != false)
					A = this.objectName + "." + A;
				Ext.apply(D, Ext.lion.LionParamsConvert(C, A))
			}
		}
		return D;
	}
});
