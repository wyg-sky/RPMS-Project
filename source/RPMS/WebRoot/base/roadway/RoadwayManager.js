 /**
 * @description : 巷道信息界面Manager
 * @date : 2013-09-16
 * @author : 辛尔青
 */
Ext.lion.prds.RoadwayManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.prds.RoadwayManager.superclass.constructor.call(this);
	this.myMask = new Ext.LoadMask(Ext.getBody(), {
		msg: '正在导入数据，这可能需要几分钟，请耐心等待......！',
		removeMask: true 
	});
};

Ext.extend(Ext.lion.prds.RoadwayManager, Ext.lion.LionBusinessManager, {
	
	/**
	 * @description : 历史数据查询
	 * @scope ：this.listtbar
	 * @author : 辛尔青
	 * @date : 2013-9-18上午09:28:26
	 */
	queryHistory : function() {
		Ext.lion.ScriptLoader('base/roadwayhistory/RoadwayHistoryManager.js', false);
		new Ext.lion.base.RoadwayHistoryManager({
			showByMain : false,
			winTitle : '历史数据查询',
			winHeight : 400,
			winWidth : 990,
			viewPath : 'base/roadwayhistory/list'
		});
	},
	
	/**
	 *  生成报表
	 */
	reportRoadway : function(){
  		this.reportWin = this.showWin({title:'巷道信息报表'}, 'base/roadwayreport/report');
    },
    
    //报表保存完成之后刷新grid，关闭window
    afterReportSave : function() {
    	this.dataGrid.store.reload();
    	this.reportWin.close();
    	this.showTip(true, '保存成功！');
    },
    
    /**
	 *  报表查询
	 */
    queryReport : function(){
		var reportStatus = this.reportQueryform.findField('reportStatus').getValue();
		var produceStatus = this.reportQueryform.findField('produceStatus').getValue();
		var isValid = this.reportQueryform.findField('isValid').getValue();
		var roadwayType = this.reportQueryform.findField('roadwayType').getValue();
		var reportDate = this.reportQueryform.findField('reportDate').getValue();
		var params = {
			reportStatus : reportStatus,
			produceStatus : produceStatus,
			isValid : isValid,
			roadwayType:roadwayType,
			reportDate : reportDate
	    };
		var param = encodeURI(Ext.urlEncode(params));//URLDecoder.decode(equiKind,"UTF-8");
		var load ="base/roadway/roadwayRpt.jsp?"+param;
		this.reportPanel.body.update("<iframe  frameborder='0' width='100%' height='100%' src="+load+"></iframe>");
    },
    
    /**
	 * @description : 删除巷道
	 * @author : 辛尔青
	 * @date : 2013-10-21
	 */
	deleteRoadway: function(){
		var records = this.manager.dataGrid.getSelections(true);
		if(records && records.length > 0) {
			var roadwayNames = '';
			for (var i = 0; i < records.length; i++) {
				var valid = records[i].get(this.manager.dataGrid.getFieldName('valid'));
				if(valid == '1') {
					roadwayNames += records[i].get(this.manager.dataGrid.getFieldName('roadwayName')) + ",";
				}
			}
			roadwayNames = roadwayNames.substring(0, roadwayNames.length- 1);
			if(roadwayNames != null && roadwayNames != ""){
				Ext.Msg.alert('提示',"巷道：'"+'<font color="red"> ' + roadwayNames + ' </font>'+" '不允许删除，只允许删除无效数据！");
				return;
			} else {
				this.manager.deleteObject();
			}
		}
	},
	
	/**
	 * @description : 导入Excel
	 * @author : 辛尔青
	 * @date : 2013-10-21
	 */
    importRoadway : function () {
		this.showWin({title:'导入'}, 'base/roadway/import');
	},
	
	/**
	 * @description : 提交并判断条件
	 * @author : 辛尔青
	 * @date : 2013-10-21
	 */
	saveImport: function(){
		if(this.importForm.form.isValid()){
			var type = this.importForm.findField('importType').getGroupValue();
			if(type == '2') {
				Ext.MessageBox.confirm("提示", "确定要把原有的巷道信息数据删除吗？",
					function(ret) {
						if (ret == 'yes') {
							this.importRoadways(type);
						}
					},this
				);
			} else {
				this.importRoadways(type);
			}
		} else {
		    Ext.Msg.alert('提示','信息未选择完整！');
		}
	},
	
	/**
	 * @description : 导入数据
	 * @author : 辛尔青
	 * @date : 2013-10-21
	 */
	importRoadways : function(type) {
		this.importForm.form.submit({
			url: "system/upLoadDocument.html",
            method: 'post',
            waitTitle : "请稍等",
			waitMsg : '上传文件中.....',
            scope : this,
            params : {
            	'document.docType.id' : '2c9ffab8480b049101480b27cf3e0004',
            	'document.docFk' : '00f680b58df24711badae71a6eaf46ee'
            },
            success: function(form, action) {
            	this.importForm.ownerCt.close();
				this.myMask.show();
            	Ext.Ajax.request({
            		timeout: 600000,
					url : 'base/importRoadway.html',
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
							icon : Ext.MessageBox.WARNING,
							scope : this
						});
					}
				});
            },
            failure:function(form, action){
            	this.importForm.ownerCt.close();
                this.myMask.hide();
				Ext.Msg.alert('错误','服务器出现错误请稍后再试！');
            }
		});
	}
});