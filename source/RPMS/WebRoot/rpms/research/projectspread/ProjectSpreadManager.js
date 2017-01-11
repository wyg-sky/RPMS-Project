/**
 * @description : 项目推广管理
 * @date : 2015-03-12 15:01:49
 * @author : WangYG
 */

Ext.lion.rpms.ProjectSpreadManager = function(config) {
	Ext.apply(this, config);
	Ext.lion.rpms.ProjectSpreadManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.ProjectSpreadManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
			'showedit' : {
                fn : function() {
                    this.showQuoteDocuments();
                },
                scope : this
            },
            'showview' : {
                fn : function() {
                    this.showQuoteDocuments();
                },
                scope : this
            },
			'beforedelete' : {
				/*fn : function() {
					var records = this.dataGrid.getSelections(true);
					for (var i = 0; i < records.length; i++) {
						var status = records[i].get(this.dataGrid.getFieldName('status'));
						if (status == '0002' || status == '0003') {
							Ext.MessageBox.alert("提示"," 只有“未上报”或“已打回”的数据才可以删除！");
							return false;
						}
					}
				},*/
				fn : Ext.emptyFn,
				scope : this
			},
			'beforeedit' : {
				/*fn : function() {
					var records = this.dataGrid.getSelections(true);
					for (var i = 0; i < records.length; i++) {
						var status = records[i].get(this.dataGrid.getFieldName('status'));
						if (status == '0002' || status == '0003') {
							Ext.MessageBox.alert("提示"," 只有“未上报”或“已打回”的数据才可以修改！");
							return false;
						}
					}
				},*/
				fn : Ext.emptyFn,
                scope : this
			}
		});
		
		this.dataGrid.on('celldblclick', function() {
				this.viewObject();
		}, this);
		
	},
	
 	/**
	 * @description : 上报之前的验证
	 * @date : 2015-03-12 15:01:49
	 * @author : WangYG
	 */
/* 	changeStatus : function(property, value, tip) {
		var ids = "";
		var records = this.dataGrid.getSelections(true);
		if(records && records.length > 0){
			for(var i = 0; i < records.length ; i++) {
				var valid =  records[i].get(this.dataGrid.getFieldName('status'));
				if(value == valid) {
					Ext.MessageBox.alert("提示","状态相同，无需修改！");
				    return false; 
				}else if(value == '0002' && valid == '0003'){
					Ext.MessageBox.alert("提示","只有“未上报”或“已打回”的数据才可以上报！");
				    return false; 
				}else if(value == '0003' && valid != '0002'){
					Ext.MessageBox.alert("提示","只有“已上报”的数据才可以审批！");
				    return false; 
				} else if(value == '0004' && valid != '0002'){
				    Ext.MessageBox.alert("提示","只有“已上报”的数据才可以打回！");
                    return false; 
				}else{
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
					url : 'base/changeProjectSpreadStatus.html',
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
						this.dataGrid.store.load();
					}});
				}
			},this);
		}
	},*/
	
	/**
	 * @description : 获取指定id的成果管理实体信息
	 * @date : 2015-05-13 15:01:49
	 * @author : WangYG
	 */
	getProjectInfo : function() {
		var projectId = this.editForm.findField("projectId.id").getValue();
		var json = '';
		Ext.Ajax.request({
			//url : 'rpms/getProjectInfo.html',
			url : 'rpms/getResearchAchievementInfo.html',
			method : 'POST',
			params : {
				projectId : projectId
			},
			scope : this,
			success : function(response) {
				json = Ext.util.JSON.decode(response.responseText || "{}");
				var achievementName = json.root[0].achievementName ? json.root[0].achievementName : "";
				var organization = json.root[0].organization ? json.root[0].organization : "{}";
				var platCenter = json.root[0].platCenter ? json.root[0].platCenter : "{}";
				var platInstitution = json.root[0].platInstitution ? json.root[0].platInstitution : "{}";
				var specialty = json.root[0].specialty ? json.root[0].specialty : "{}";
				var business = json.root[0].business ? json.root[0].business : "{}";
				var achievementLevel = json.root[0].achievementLevel ? json.root[0].achievementLevel : "";
				var certificationDate = json.root[0].certificationDate ? json.root[0].certificationDate : "";
				var type = json.root[0].type ? json.root[0].type : "";
				var reviewMechanism = json.root[0].reviewMechanism ? json.root[0].reviewMechanism : "";
				var introduction = json.root[0].introduction ? json.root[0].introduction : "";
				
				this.editForm.findField("achievementName").setValue(achievementName);
				this.editForm.findField("type").setValue(type);
				this.editForm.findField("reviewMechanism").setValue(reviewMechanism);
				this.editForm.findField("organization.id").setValue({"value" : organization.id, "text" : organization.name});
				this.editForm.findField("platCenter.id").setValue({"value" : platCenter.id, "text" : platCenter.platName});
				this.editForm.findField("platInstitution.id").setValue({"value" : platInstitution.id, "text" : platInstitution.platName});
				this.editForm.findField("specialty.id").setValue({"value" : specialty.id, "text" : specialty.specialtyName});
				this.editForm.findField("business.id").setValue({"value" : business.id, "text" : business.specialtyName});
				this.editForm.findField("achievementLevel").setValue(achievementLevel);
				this.editForm.findField("certificationDate").setValue(certificationDate);
				this.editForm.findField("introduction").setValue(introduction);
				this.quoteDocuments.fkId = projectId;//将文档附件的外键ID关联成要插入的成果管理实体ID
				/*
                Ext.apply(this.quoteDocuments.store.baseParams, {
                    queryFields : ['obj.docFk'],
                    operatorValues : ['='],
                    fieldValues : ['projectId']
                });
				*/
				this.quoteDocuments.store.load();
				//this.uploadFileGrid.store.on('load',this.setProjectDocInfo, this);
			},
			failure : function(response,options) {
				Ext.MessageBox.show({
					title : '失败',
					msg : '获取成果信息失败,请联系管理员！<br>',
					buttons : Ext.MessageBox.OK,
					fn : function(){},
					icon : Ext.MessageBox.ERROR,
					scope : this
				});
			}
		});
	},
	/**
	 * @description : 置空附件ID和docFk（插入指定id的成果管理实体信息时）重新设置文档附件列表中文档附件的信息。
     * @date : 2015-05-13 15:01:49
     * @author : WangYG
	 */
	/*setProjectDocInfo : function() {
            var records = this.uploadFileGrid.store.getRange();
            for(var i=0 ; i < records.length; i++){
                records[i].set(this.uploadFileGrid.getFieldName('id'),"");
                records[i].set(this.uploadFileGrid.getFieldName('docFk'),"");
            }
            this.uploadFileGrid.store.commitChanges();
    },*/
    /**
     * @description : 显示引用的文档附件(传入ID，文档列表加载文档信息)
     * @date : 2015-05-25 15:01:49
     * @author : WangYG
     */
    showQuoteDocuments : function(){
    	var records = this.dataGrid.getSelections(true);
    	var projectId =  records[0].get(this.dataGrid.getFieldName('projectId.id'));
        this.quoteDocuments.fkId = projectId;
        this.quoteDocuments.store.load();
    }
});
