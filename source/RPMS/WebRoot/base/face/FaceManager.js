 /**
 * @description : 工作面信息界面Manager
 * @date : 2013-09-16
 * @author : 辛尔青
 */
Ext.lion.base.FaceManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.base.FaceManager.superclass.constructor.call(this);
	this.myMask = new Ext.LoadMask(Ext.getBody(), {
		msg: '正在导入数据，这可能需要几分钟，请耐心等待......！',
		removeMask: true 
	});
};

Ext.extend(Ext.lion.base.FaceManager, Ext.lion.LionBusinessManager, {
	
	/**
	 * @description : 历史数据查询
	 * @author : 辛尔青
	 * @date : 2013-9-18
	 */
	queryHistory : function() {
		Ext.lion.ScriptLoader('base/facehistory/FaceHistoryManager.js', false);
		new Ext.lion.base.FaceHistoryManager({
			showByMain : false,
			winTitle : '历史数据查询',
			winHeight : 450,
			winWidth : 990,
			viewPath : 'base/facehistory/list'
		});
	},
	
	/**
	 *  生成报表
	 */
	reportFace : function(){
  		this.reportWin = this.showWin({title:'工作面信息报表'}, 'base/facereport/report');
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
		var reportDate = this.reportQueryform.findField('reportDate').getValue();
		var params = {
			reportStatus : reportStatus,
			produceStatus : produceStatus,
			isValid : isValid,
			reportDate : reportDate
	    };
		var param = encodeURI(Ext.urlEncode(params));//URLDecoder.decode(equiKind,"UTF-8");
		var load ="base/face/faceRpt.jsp?"+param;
		this.reportPanel.body.update("<iframe  frameborder='0' width='100%' height='100%' src="+load+"></iframe>");
    },
    
    /**
	 * @description : 删除工作面
	 * @author : 辛尔青
	 * @date : 2013-10-18
	 */
	deleteFace: function(){
		var records = this.manager.dataGrid.getSelections(true);
		if(records && records.length > 0) {
			var faceNames = '';
			for (var i = 0; i < records.length; i++) {
				var valid = records[i].get(this.manager.dataGrid.getFieldName('valid'));
				if(valid == '1') {
					faceNames += records[i].get(this.manager.dataGrid.getFieldName('faceName')) + ",";
				}
			}
			faceNames = faceNames.substring(0, faceNames.length- 1);
			if(faceNames != null && faceNames != ""){
				Ext.Msg.alert('提示',"工作面：'"+'<font color="red"> ' + faceNames + ' </font>'+" '不允许删除，只允许删除无效数据！");
				return;
			} else {
				this.manager.deleteObject();
			}
		}
	},
	
	/**
	 * @description : 导入Excel
	 * @author : 辛尔青
	 * @date : 2013-10-18
	 */
    importFace : function () {
		this.showWin({title:'导入'}, 'base/face/import');
	},
	
	/**
	 * @description : 提交并判断条件
	 * @author : 辛尔青
	 * @date : 2013-10-18
	 */
	saveImport: function(){
		if(this.importForm.form.isValid()){
			var type = this.importForm.findField('importType').getGroupValue();
			if(type == '2') {
				Ext.MessageBox.confirm("提示", "确定要把原有的工作面信息数据删除吗？",
					function(ret) {
						if (ret == 'yes') {
							this.importFaces(type);
						}
					},this
				);
			} else {
				this.importFaces(type);
			}
		} else {
		    Ext.Msg.alert('提示','信息未选择完整！');
		}
	},
	
	/**
	 * @description : 导入数据
	 * @author : 辛尔青
	 * @date : 2013-10-18
	 */
	importFaces : function(type) {
		this.importForm.form.submit({
			url: "system/upLoadDocument.html",
            method: 'post',
            waitTitle : "请稍等",
			waitMsg : '上传文件中.....',
            scope : this,
            params : {
            	'document.docType.id' : '2c9ffab8480b049101480b24af170002',
            	'document.docFk' : '99f680b58df24711badae71a6eaf46dd'
            },
            success: function(form, action) {
            	this.importForm.ownerCt.close();
				this.myMask.show();
            	Ext.Ajax.request({
            		timeout: 600000,
					url : 'base/importFace.html',
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