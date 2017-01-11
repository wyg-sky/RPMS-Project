/**
 * @description ：内部报奖审核
 * @date ：2015-05-20
 * @author ：曹鹏程
 */

Ext.lion.rpms.AwardAuditManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.AwardAuditManager.superclass.constructor.call(this);
	this.dataGrid.on('onload', function() {
	}, this);
};

Ext.extend(Ext.lion.rpms.AwardAuditManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
			'beforeedit' : {
				fn : function() {
					this.checkflag = true;
					var records = this.dataGrid.getSelections(true);
					for (var i = 0; i < records.length; i++) {
						var status = records[0].get(this.dataGrid
								.getFieldName('status'));
						if (status != '0003') {
							Ext.MessageBox.alert("提示",
									" 只有专家待审核的数据才可以审核！");
							return false;
						}
					}
				},
				scope : this
			},
			'beforesave' : {
				fn : function() {
					this.editForm.findField("status").setValue('0004');
				},
				scope : this
			},
		});
	},
	
	/**
 	 * 处理状态
 	 */
	changeStatus : function(property, value, tip) {
		var ids = "";
		var records = this.dataGrid.getSelections(true);
		if(records && records.length > 0){
			for(var i = 0; i < records.length ; i++) {
				var valid =  records[i].get(this.dataGrid.getFieldName('status'));
				if(value == valid) {
					Ext.MessageBox.alert("提示","状态相同，无需修改！");
				    return false; 
				}else if(value == '0002' && valid != '0001'){
					Ext.MessageBox.alert("提示","只有未上报的数据才可以上报！");
				    return false; 
				}else if(value == '0003' && valid != '0002'){
					Ext.MessageBox.alert("提示","只有已上报的数据才可以审批！");
				    return false; 
				} else {
					ids += records[i].get(this.dataGrid.getFieldName('id')) + ',';
				}
			}
			ids = ids.substring(0, ids.length- 1);
			var msg = '条';
			if(records.length > 1) {
				msg = '<font color="red"> ' + records.length + ' </font>' + msg;
			}
			Ext.MessageBox.minWidth = 230;
			Ext.MessageBox.confirm("提示", "确定要"+tip+"这"+msg+"记录吗？",function(ret){
			if(ret == "yes"){
				Ext.Ajax.request({
					url : 'base/changeProjectAwardStatus.html',
					params : {
						ids : ids ,  
						property : property ,  
						value : value
					},
					scope : this,
					waitTitle : '请稍候',
					waitMsg : '设置中...',
					success:function(response){
						var json = Ext.util.JSON.decode(response.responseText || "{}");
						if(value == '0003'){//插入荣誉管理库
							Ext.Ajax.request({
								url : 'rpms/insertAwards.html',
								params : {
									ids : ids  
								},
								scope : this,
								waitTitle : '请稍候',
								waitMsg : '设置中...',
								success:function(response){}
							});
						}
						this.dataGrid.store.load();
					}});
				}
			},this);
		}
	},
	
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
						'score' : records[i].get('score')
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
	},
	
	/**
	 * 明细表赋值
	 * @param {} record
	 */
	setProject : function(record) {
		this.editForm.findField("projectId.achievementName").setValue(record[0].get('achievementName'));
		this.editForm.findField("projectId.platCenter.platName").setValue(record[0].get('platCenter.platName'));
		this.editForm.findField("projectId.platInstitution.platName").setValue(record[0].get('platInstitution.platName'));
		this.editForm.findField("projectId.organization.name").setValue(record[0].get('organization.name'));
		this.editForm.findField("projectId.specialty.specialtyName").setValue(record[0].get('specialty.specialtyName'));
		this.editForm.findField("projectId.achievementLevel").setValue(record[0].get('achievementLevel'));
	}
});
