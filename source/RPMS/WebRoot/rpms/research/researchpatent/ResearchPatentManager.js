/**
 * @description ：专利管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */

Ext.lion.rpms.ResearchPatentManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.ResearchPatentManager.superclass.constructor.call(this);
	this.dataGrid.on('onload', function() {
	}, this);
};
Ext.extend(Ext.lion.rpms.ResearchPatentManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		//this.listPlatTree.items.items[0].on('click',this.onPlatTreeClick, this);
	},
	
	columnRender:function(value, metaData, record, rowIndex, colIndex, store){
		if(record.get('protectedAlert')==='0001'){
			metaData.attr = 'style="color:red;"';
		}
		return value;
	},
	
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
	},*/

	/**
	 * 新增子表
	 */
	addLineObject : function(){
		var selectWin = new Ext.lion.LionSelectWindow({
			width : 900,
			height : 550,
			viewPathOfUi : 'rpms/base/researchtalent/list',
			title : '人员选择'
		});
		selectWin.on('after_comfirm_click', function(records) {
			var RecordType = this.dataLineGrid.getRecordType();
			var str = ""; //记录重复添加的人员
			for(var i = 0; i< records.length; i++) {
				var bool = false;
				var recordstemp = this.dataLineGrid.getStore().getRange();
				for(var k = 0; k < recordstemp.length; k++){
					var str1 = "";
					if(recordstemp[k].get('talentId.id') == records[i].get('id')){
						bool = true;
						str1 = recordstemp[k].get('talentId.talentName');
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
				var st = "姓名为‘ "+str+" ’已经存在不能再重复添加!";
				Ext.MessageBox.show({
					title : '提示',
					msg : st+'<br>',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.INFO,
					scope : this
				});
			}
				
		}, this);
	}
});
