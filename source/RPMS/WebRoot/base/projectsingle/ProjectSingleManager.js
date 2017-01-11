 /**
 * @description : 单项工程界面Manager
 * @date : 2013-09-25
 * @author : 杨尚山
 */
Ext.lion.prds.ProjectSingleManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.prds.ProjectSingleManager.superclass.constructor.call(this);
	this.myMask = new Ext.LoadMask(Ext.getBody(), {
		msg: '正在导入数据，这可能需要几分钟，请耐心等待......！',
		removeMask: true 
	});
	this.dataGrid.on('celldblclick', function() {
	  	this.viewObject();
	}, this);
};

Ext.extend(Ext.lion.prds.ProjectSingleManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		
		this.on({
			'showedit' : {
				fn : Ext.emptyFn,
				scope: this
			},
			'beforeview' : {
				fn : this.viewObj,
				scope: this
			},
			'showview' : {
				fn : this.editObj,
				scope: this
			},
			'beforesave' : {
				fn : this.beforeSaveObj,
				scope : this
			}
		});
	},
	viewObj : function(){
		this.isView = true;
	},
	editObj : function(){
		this.isView = false;
	},
	printGrid : function() {
		var printWin = new Ext.lion.LionPrintWindow({
			printTitle : this.printTitle,
			isShowInfo : false,
			components : [this.dataGrid]
		});
	},
	/**
	 * 生成报表窗口
	 */
    reportProjectSingle : function() {
    	this.reportWin = this.showWin({title:'单项工程情况'}, 'base/projectsingle/report');
    },
    /**
     * 报表保存后处理
     */
    afterReportSave : function() {
        this.dataGrid.store.reload();
        this.reportWin.close();
        this.showTip(true,'保存成功！');
    },
    /**
     * 生成报表
     */
    queryProjectSingleReport : function() {
        var reportDate = this.reportQueryForm.findField('reportDate').getValue();
        var projectCd = this.reportQueryForm.findField('projectCd').getValue();
        var projectName = this.reportQueryForm.findField('projectName').getValue();
        var projectStatus = this.reportQueryForm.findField('projectStatus').getValue();
        var params = {
            reportDate : reportDate,
            projectCd : projectCd,
            projectName : projectName,
            projectStatus : projectStatus
        };
        var param = encodeURI(Ext.urlEncode(params));
        var src = "base/projectsingle/projectsingleRpt.jsp?"+param;
        this.reportPanel.body.update("<iframe  frameborder='0' width='100%' height='100%' src="+src+"></iframe>");
    },
	/**
	 * 销毁
	 */
    destroy : function() {
    	if(this.changepswForm) {
    	    this.changepswForm.destroy();
    	}
    	
    	Ext.lion.prds.ProjectSingleManager.superclass.destroy.call(this);
    },
    
	/**
	 * 保存前判断开始日期和结束日期
	 */
	beforeSaveObj : function(){
		var beginDate = this.editForm.findField("beginDate").getValue();
		var endDate = this.editForm.findField("endDate").getValue();
		if(beginDate > endDate){
			Ext.MessageBox.show({
				title : '提示',
				msg : '开始日期不能大于结束日期！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO,
				scope : this
			});
			return false;
		}
	}, 
    
    /**
	 * @description : 导入Excel
	 * @author : 辛尔青
	 * @date : 2013-11-07
	 */
    importProjectSingle : function () {
		this.showWin({title:'导入'}, 'base/projectsingle/import');
	},
	
	/**
	 * @description : 提交并判断条件
	 * @author : 辛尔青
	 * @date : 2013-11-07
	 */
	saveImport: function(){
		if(this.importForm.form.isValid()){
			var type = this.importForm.findField('importType').getGroupValue();
			if(type == '2') {
				Ext.MessageBox.confirm("提示", "确定要把原有的单项工程数据删除吗？",
					function(ret) {
						if (ret == 'yes') {
							this.importProjectSingles(type);
						}
					},this
				);
			} else {
				this.importProjectSingles(type);
			}
		} else {
		    Ext.MessageBox.show({
				title : '提示',
				msg : '信息未选择完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO,
				scope : this
			});
		}
	},
	
	/**
	 * @description : 导入数据
	 * @author : 辛尔青
	 * @date : 2013-11-07
	 */
	importProjectSingles : function(type) {
		this.importForm.form.submit({
			url: "system/upLoadDocument.html",
            method: 'post',
            waitTitle : "请稍等",
			waitMsg : '上传文件中.....',
            scope : this,
            params : {
            	'document.docType.id' : '2c9ffab7483409e70148352e641b0004',
            	'document.docFk' : '25f680b58df24711badae71a6eaf46be'
            },
            success: function(form, action) {
            	this.importForm.ownerCt.close();
				this.myMask.show();
            	Ext.Ajax.request({
            		timeout: 600000,
					url : 'base/importProjectSingle.html',
					method : 'post',
					params : {
						importType : type
					},
					waitTitle : "请稍等",
					waitMsg : '导入数据中.....',
					scope : this,
					async : false,
					success : function(response,options) {
                        var json = Ext.util.JSON.decode(response.responseText || "{}");
                        if(json.success) {
							Ext.MessageBox.show({
								title : '成功',
								msg : '导入数据成功！<br>',
								buttons : Ext.MessageBox.OK,
								fn : function(){},
								icon : Ext.MessageBox.INFO,
								scope : this
							});
                        } else {
							var msg = ',';
							if(json.msg == undefined || json.msg == 'null')
							    msg = '';
							else 
							    msg += json.msg;
							Ext.MessageBox.show({
								title : '失败',
								msg : '导入数据失败'+msg+'！<br>',
								buttons : Ext.MessageBox.OK,
								fn : function(){},
								icon : Ext.MessageBox.WARNING,
								scope : this
							});
                        }
                        this.myMask.hide();
						this.query();
					},
					failure : function(response,options) {
            			this.importForm.ownerCt.close();
					    this.myMask.hide();
						Ext.MessageBox.show({
							title : '失败',
							msg : '导入数据失败！<br>',
							buttons : Ext.MessageBox.OK,
							fn : function(){},
							icon : Ext.MessageBox.ERROR,
							scope : this
						});
					}
				});
            },
            failure:function(form, action){
            	this.importForm.ownerCt.close();
                this.myMask.hide();
				Ext.MessageBox.show({
					title : '错误',
					msg : '服务器出现错误请稍后再试！<br>',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR,
					scope : this
				});
            }
		});
	}
});