/**
 * @description ：内部报奖管理
 * @date ：2015-05-18
 * @author ： 曹鹏程
 */

Ext.lion.rpms.InternalAwardManager = function(config) {
    Ext.apply(this,config);
    Ext.lion.rpms.InternalAwardManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.InternalAwardManager, Ext.lion.LionBusinessManager, {
    bussinessInit : function() {
    	this.on({
	    	'beforedelete' : {
				fn : function() {
					var records = this.dataGrid.getSelections(true);
					for (var i = 0; i < records.length; i++) {
						var status = records[0].get(this.dataGrid
								.getFieldName('status'));
						if (status != '0001'&&status != '0000') {
							Ext.MessageBox.alert("提示",
									" 只有“已退回或待申报”的数据才可以删除！");
							return false;
						}
					}
				},
				scope : this
			},
			'beforeview' : function(){
				this.approve = true;
			},
	    	'beforeedit' : {
				fn : function() {
					var roleCode = "false";
					Ext.Ajax.request({
						url : 'rpms/isAllRole.html',
						params : { 
							loginame : FW.userId
						},
						async : false,
						scope : this,
						success : function(response){
							var json = Ext.util.JSON.decode(response.responseText || "{}");
							roleCode = json.code;
						}});
					var t = roleCode.indexOf('INTERNALAWARD');//判断字符串中是否包含某字符
					if(t >= 0){
						this.approve = false;
					}
					if(!(t >= 0)){
						var records = this.dataGrid.getSelections(true);
						for (var i = 0; i < records.length; i++) {
							var status = records[0].get(this.dataGrid.getFieldName('status'));
							if (status == '0002' || status ==  '0003' || status ==  '0004' || status ==  '0005') {
								Ext.MessageBox.alert("提示",
										" 状态为“中心待审核,专家待审核,专家已审核,报奖已完成”的记录不允许编辑!");
								return false;
							}
						}
					}
				},
				scope : this
			}
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
				}else if(value == '0002' && valid != '0001'&&valid != '0000'){
					Ext.MessageBox.alert("提示","只有奖项待申报的数据才可以申报！");
				    return false; 
				}else if(value == '0003' && valid != '0002'){
					Ext.MessageBox.alert("提示","只有中心待审核的数据才可以审批！");
				    return false; 
				} else if(value == '0005' && valid != '0003'&&valid != '0004'){
					Ext.MessageBox.alert("提示","只有待审核和已审核的数据才可以审批！");
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
		this.editForm.findField("platCenter.id").setValue({text:record[0].get('platCenter.platName'),value:record[0].get('platCenter.id')});
		this.editForm.findField("platInstitution.id").setValue({text:record[0].get('platInstitution.platName'),value:record[0].get('platInstitution.id')});
		this.editForm.findField("organization.id").setValue({text:record[0].get('organization.name'),value:record[0].get('organization.id')});
		this.editForm.findField("specialty.id").setValue({text:record[0].get('specialty.specialtyName'),value:record[0].get('specialty.id')});
		this.editForm.findField("achievementLevel").setValue(record[0].get('achievementLevel'));
		this.editForm.findField("projectId.reviewMechanism").setValue(record[0].get('reviewMechanism'));
	},
	
	/**
     * 审批功能
     */
    approvePro : function(){
        var records = this.dataGrid.getSelections(true);
        if (records && records.length > 0) {
            if(records[0].get('status') !='0002'){
               Ext.MessageBox.show({
                   title : '系统提示',
                   msg : '只有中心待审核的单据才能审核！',
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
    
    backpotion  : function(property, value, tip) {
    	this.actionMode = "2";
    	this.editable = true;
    	this.thisWin = this.showWin({title:'退回'},"rpms/research/internalaward/back");
    },
    
    back : function(){
    	var ids = "";
		var records = this.dataGrid.getSelections(true);
		var reason = this.backeditForm.findField("backReason").getValue();
		if(records && records.length > 0){
			for(var i = 0; i < records.length ; i++) {
				ids += records[i].get(this.dataGrid.getFieldName('id')) + ',';
			}
			ids = ids.substring(0, ids.length- 1);
			Ext.Ajax.request({
				url : 'rpms/backReasonAwards.html',
				params : {
					ids : ids,
					reason : reason
				},
				scope : this,
				waitTitle : '请稍候',
				waitMsg : '设置中...',
				success:function(response){
					this.dataGrid.getStore().reload();
					this.thisWin.close();
				}
			});
	    }
    }
    
});
