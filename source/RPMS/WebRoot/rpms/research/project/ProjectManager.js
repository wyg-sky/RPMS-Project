/**
 * @description : 项目立项管理
 * @date : 2015-03-10 13:59:17
 * @author : 曹鹏程
 */

Ext.lion.rpms.ProjectManager = function(config) {
    Ext.apply(this,config);
    Ext.lion.rpms.ProjectManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.ProjectManager, Ext.lion.LionBusinessManager, {
    bussinessInit : function() {
        this.on({
            'showadd' : {
                fn : this.setPlatCenter,
                scope: this
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
     * 合作协作单位
     * 新增按钮
     */
    addPartner : function(){
        var RecordType = this.partnerGrid.getRecordType();
        this.partnerGrid.store.add(new RecordType());
    },
    
    /**
     * 合作协作单位
     * 删除按钮
     */
    deletePartner : function(){
        var records = this.partnerGrid.getSelections(true);
        this.partnerGrid.store.remove(records);
    },
    
     /**
     * 项目人员
     * 新增按钮
     */
    addTalent : function(){
        var RecordType = this.talentGrid.getRecordType();
        this.talentGrid.store.add(new RecordType());
    },
    
    /**
     * 项目人员
     * 删除按钮
     */
    deleteTalent : function(){
        var records = this.talentGrid.getSelections(true);
        this.talentGrid.store.remove(records);
    },
    
    /**
     * 项目资金
     * 新增按钮
     */
    addFunds : function(){
    	var count = this.fundsGrid.store.getCount();
    	if(count<1){
    		var RecordType = this.fundsGrid.getRecordType();
            this.fundsGrid.store.add(new RecordType());
    	}
    },
    
    /**
     * 项目资金
     * 删除按钮
     */
    deleteFunds : function(){
        var records = this.fundsGrid.getSelections(true);
        this.fundsGrid.store.remove(records);
    },
    
    /**
     * 生成项目编号
     * 项目编号按年度（4）+项目级别（2）+分中心（2）+专业（2）+项目类型（2）+三位自动生成顺序号（3）
     */
    createProjectCode : function(){
    	if(this.actionMode == '1'){
    		//年度（4）
            var projectAnnual = this.editForm.findField("projectAnnual").getValue();
            //分中心（2）
            var platCenter = this.editForm.findField("platCenter.id").getValue();
            if(projectAnnual != ''  && platCenter != '' ){
                Ext.Ajax.request({
                    timeout: 600000,
                    url : 'rpms/createProjectCode.html',
                    method : 'post',
                    params : {projectAnnual : projectAnnual,platCenter:platCenter},
                    waitTitle : "请稍等",
                    waitMsg : '操作中.....',
                    scope : this,
                    success : function(response,options) {
                        var json = Ext.util.JSON.decode(response.responseText || "{}");
                        if(json.success) {
                            var code = json.code;
                            this.editForm.findField("projectCode").setValue(code);
                        } 
                        if(!json.success){
                        	
                        }
                    },
                    failure : function(response,options) {
                        Ext.MessageBox.show({
                            title : '失败',
                            msg : '生成项目编号失败！<br>',
                            buttons : Ext.MessageBox.OK,
                            fn : function(){},
                            icon : Ext.MessageBox.WARNING,
                            scope : this
                        });
                    }
                });
            }
    	}
    	
        
    },
    
    
    /**
     * 新增时设置分中心机构的值
     * 废弃不用 by yss 2016-10-28
     */
    setPlatCenter : function(){
//    	Ext.Ajax.request({
//            timeout: 600000,
//            url : 'rpms/getFirstCenter.html',
//            method : 'post',
//            params : {},
//            waitTitle : "请稍等",
//            waitMsg : '操作中.....',
//            scope : this,
//            success : function(response,options) {
//                var json = Ext.util.JSON.decode(response.responseText || "{}");
//                if(json.success) {
//                    var id = json.id;
//                    var name = json.name;
//                    this.editForm.findField("platCenter.id").setValue({id:id,text:name});
//                } 
//            },
//            failure : function(response,options) {
//            }
//        });
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
                   msg : '只有立项审查的单据才能审查！',
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
     * 退回
     */
    projectBackup : function(){
        var records = this.dataGrid.getSelections(true);
        if (records.length <= 0){
             Ext.MessageBox.show({
                    title : '提示',
                    msg : "请选择要退回的记录！",
                    buttons : Ext.MessageBox.OK,
                    icon : Ext.MessageBox.INFO,
                    scope : this
                });
            return ;
        }
        this.projectBackWindow = this.showWin({title:'请填写退回原因'}, 'rpms/research/project/backmsgwindow');
            
    },
    
    updateBackMsg : function() {
        var records = this.dataGrid.getSelectionModel().getSelections();
        var ids = '';
        for (var i = 0; i < records.length; i++) {
            ids += "'" + records[i].get('id') + "',";
        }
        ids = ids.substring(0, ids.length- 1);
        
        var backMsg = this.backmsgform.findField("backMsg").getValue();
        if(backMsg == ""){
             Ext.MessageBox.show({
                    title : '提示',
                    msg : '退回原因不可为空！',
                    buttons : Ext.MessageBox.OK,
                    icon : Ext.MessageBox.INFO,
                    scope : this
                });
            return;
        }
        this.backmsgform.form.submit({
            url: "rpms/updateProjectBackMsg.html",
            method: 'post',
            scope : this,
            params : {
                'ids' : ids,
                'backMsg' : backMsg
            },
            success: function(){
                this.projectBackWindow.close();
                this.dataGrid.store.load();
            },
            failure:function(form, action){
            	this.projectBackWindow.close();
                Ext.MessageBox.show({
                    title : '错误',
                    msg : '服务器出现错误请稍后再试！<br>',
                    buttons : Ext.MessageBox.OK,
                    fn : function(){},
                    icon : Ext.MessageBox.ERROR,
                    scope : this
                });
            }
        });
    },
    
    /**
     * 项目进度阶段
     * 新增按钮
     */
    addStages : function(){
        var RecordType = this.stageGrid.getRecordType();
        this.stageGrid.store.add(new RecordType());
    },
    
    /**
     * 项目进度阶段
     * 删除按钮
     */
    deleteStages : function(){
        var records = this.stageGrid.getSelections(true);
        this.stageGrid.store.remove(records);
    },
    
    /**
	 * 打印报表
	 */
	genReport : function() {		
		var rowselects =  this.dataGrid.getSelections(false);
		var ids='';
		for(var i=0;i<rowselects.length;i++) {
			ids = ids + "'" +rowselects[i].get("id")+"',";
		}
		if(ids != "") {
			ids = ids.substring(0,ids.length-1);
		}
		var projectCode = this.queryForm.findField('projectCode').getValue();//项目编号
		var projectName = this.queryForm.findField('projectName').getValue();//项目名称
		var projectAnnual = this.queryForm.findField('projectAnnual').getValue();//项目年度
		var proejctType = this.queryForm.findField('proejctType').getValue();//项目类型
		var platCenter = this.queryForm.findField('platCenter.id').getValue();//分中心
		var platInstitution = this.queryForm.findField('platInstitution.id').getValue();//机构
		var specialty = this.queryForm.findField('specialty.id').getValue();//专业
		var business = this.queryForm.findField('business.id').getValue();//业务
		var chargeDepartnent = this.queryForm.findField('chargeDepartnent.id').getValue();//专业审查部门
		var status = this.queryForm.findField('status').getValue();//状态
		var projectStage = this.queryForm.findField('projectStage').getValue();//项目目前进展
		var params = {
				id : ids,
				projectCode  :  projectCode,
				projectName : projectName,
				projectAnnual : projectAnnual,
				proejctType : proejctType,
				platCenter : platCenter,
				platInstitution : platInstitution,
				specialty : specialty,
				chargeDepartnent : chargeDepartnent,
				status : status,
				projectStage : projectStage,
				business : business
	    };
		var param = encodeURI(Ext.urlEncode(params));
		var src ="rpms/research/project/projectRpt.jsp?param="+param+"&id="+ids;
		var win = new Ext.Window({
			title : '项目统计报表',
			autoScroll : true,
			maximizable :true,
			layout : 'fit',
			html : "<iframe  frameborder='0' width='100%' height='100%' src="+src+"></iframe>",
			width : 1100,
			height : 550,
			constrain :true,
			constrainHeader : true
		});
		win.show();
	},
	
	/**
     * 认可
     */
    projectRK : function(){
        var records = this.dataGrid.getSelections(true);
        if (records.length <= 0){
             Ext.MessageBox.show({
                    title : '提示',
                    msg : "请选择要操作的记录！",
                    buttons : Ext.MessageBox.OK,
                    icon : Ext.MessageBox.INFO,
                    scope : this
                });
            return ;
        }
        this.projectRKWindow = this.showWin({title:'请填写退回原因'}, 'rpms/research/project/rkmsgwindow');
            
    },
    
    updateRKMsg : function() {
        var records = this.dataGrid.getSelectionModel().getSelections();
        var ids = '';
        for (var i = 0; i < records.length; i++) {
            ids += "'" + records[i].get('id') + "',";
        }
        ids = ids.substring(0, ids.length- 1);
        
        var rkType = this.rkmsgform.findField("rkType").getValue();
        if(rkType == ""){
             Ext.MessageBox.show({
                    title : '提示',
                    msg : '认可类型不可为空！',
                    buttons : Ext.MessageBox.OK,
                    icon : Ext.MessageBox.INFO,
                    scope : this
                });
            return;
        }
        var rkMsg = this.rkmsgform.findField("rkMsg").getValue();
        if(rkMsg == ""){
        	Ext.MessageBox.show({
        		title : '提示',
        		msg : '认可内容不可为空！',
        		buttons : Ext.MessageBox.OK,
        		icon : Ext.MessageBox.INFO,
        		scope : this
        	});
        	return;
        }
        this.rkmsgform.form.submit({
            url: "rpms/updateProjectBackMsg.html",
            method: 'post',
            scope : this,
            params : {
                'ids' : ids,
                'rkType' : rkType,
                'rkMsg' : rkMsg
            },
            success: function(){
                this.projectRKWindow.close();
                this.dataGrid.store.load();
            },
            failure:function(form, action){
            	this.projectRKWindow.close();
                Ext.MessageBox.show({
                    title : '错误',
                    msg : '服务器出现错误请稍后再试！<br>',
                    buttons : Ext.MessageBox.OK,
                    fn : function(){},
                    icon : Ext.MessageBox.ERROR,
                    scope : this
                });
            }
        });
    },
	
});
