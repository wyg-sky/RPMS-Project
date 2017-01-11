 /**
 * @description : 设备仓库基本信息
 * @date : 2013-03-28
 * @author : 张义
 */
Ext.lion.base.StorageManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.base.StorageManager.superclass.constructor.call(this);
	this.myMask = new Ext.LoadMask(Ext.getBody(), {
		msg: '正在导入数据，这可能需要几分钟，请耐心等待......！',
		removeMask: true 
	});
	this.dataGrid.on('celldblclick', function() {
	  	this.viewObject();
	}, this);
};

Ext.extend(Ext.lion.base.StorageManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
			'showedit' : {
				fn : Ext.emptyFn,
				scope: this
			},
			'showcopy' : {
				fn : this.editFormCopyInit,
				scope: this
			},
			'beforeview' : {
				fn : this.viewObj,
				scope: this
			},
			'showview' : {
				fn : this.editObj,
				scope: this
			}
		});
		this.on('cellclick', function(grid, rowIndex, columnIndex, e) {
	        var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
	        if (fieldName == grid.getFieldName('edit')) {
	            this.manager.gridEditObject(this);
	        } else {
	        	if (fieldName == grid.getFieldName('look')) {
	            	this.manager.gridViewObject(this);
	        	} else {
		        	if (fieldName == grid.getFieldName('copy')) {
	                	this.manager.gridCopyObject(this);
		        	}
		        }
	        }
	    }, this);
	},
	viewObj : function(){
		this.isView = true;
	},
	editObj : function(){
		this.isView = false;
	},
	/**
	 * 新增子表
	 */
	addLineObject : function(){
		
		var selectWin = new Ext.lion.LionSelectWindow({
			width : 1100,
			height : 550,
			viewPathOfUi : 'base/storage/listuser',
			title : '人员选择'
		});
		
		selectWin.on('after_comfirm_click', function(records) {
			var RecordType = this.dataLineGrid.getRecordType();
			var str = ""; //记录重复添加的设备编号
			for(var i = 0; i< records.length; i++) {
				var bool = false;
				var recordstemp = this.dataLineGrid.getStore().getRange();
				for(var k = 0; k < recordstemp.length; k++){
					var str1 = "";
					if(recordstemp[k].get('custodianUser.id') == records[i].get('id')){
						bool = true;
						str1 = recordstemp[k].get('custodianUser.userName');
						str += str1 + ',';
					}
				}
				
				if(!bool){
					var r = new RecordType({
						'mainId' : this.mainId,
						'custodianUser.id' : records[i].get('id'),
						'custodianUser.userName' : records[i].get('userName'),
						'department.id' : records[i].get('department.id'),
						'department.name' : records[i].get('department.name'),
						'phonenum' : records[i].get('mobile'),
						'email' : records[i].get('email'),
						'remark' :''
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
	
	editFormCopyInit : function() {
		this.editForm.on('load', function() {
		    this.editForm.findField('storageCd').load();
		    this.editForm.findField('createUser').setValue(FW.userName);
		    this.editForm.findField('createTime').setValue(new Date().format('Y-m-d H:i:s'));
		    this.editForm.findField('modifyUser').setValue(FW.userName);
		    this.editForm.findField('modifyTime').setValue(new Date().format('Y-m-d H:i:s'));
		}, this);
	},
	
	/**
	 * 保存方法
	 */
	saveObject : function() {
		var records = this.dataLineGrid.getStore().getRange();
		if(null == records || records.length <=0){
			Ext.MessageBox.show({
				title : '提示',
				msg : '子表没有录入数据，请录入完整数据！<br>',
				buttons : Ext.MessageBox.OK,
				fn : function(){},
				icon : Ext.MessageBox.WARNING ,
				scope : this
			});
			return;
		} else {
			if(this.fireEvent('beforesave', this) && this.editForm) {
				var params = null;
				if(this.dataLineGrid) {//保存子表信息
					var records = this.dataLineGrid.getStore().getRange();
					var line = [];
					for(var i=0;i<records.length;i++){
					    if(this.editForm.runMode == '3'){//复制
		                    records[i].set("id", null);
		                }
						line.push(records[i].data);
					}
					params = Ext.lion.LionParamsConvert(line, "businessObject.storageLine", true);
				}
				
				this.editForm.save(params);
				this.editForm.on('aftersave', function() {
					if(this.fireEvent('aftersave', this)) {
						if(this.dataGrid) {
							this.dataGrid.store.load();
						}
						this.editForm.ownerCt.close();
					}
				}, this);
			}
		}
	},
	
	/**
	 * 展开/收起主表信息
	 */
	expandEditForm  : function(){
		if (this.editForm.hidden) {
			this.editForm.show();
			this.editForm.ownerCt.doLayout();
			this.dataLineGrid.ownerCt.doLayout();
        } else {
			this.editForm.hide();
			this.editForm.ownerCt.doLayout();
			this.dataLineGrid.ownerCt.doLayout();
        }
	},
	
	/**
	 * @description : 导入Excel
	 * @scope ：this.listTbar
	 * @author : 李超
	 * @date : 2013-11-12上午09:28:26 
	 */
	importStorageLine : function () {
		this.showWin({title:'导入'}, 'base/storage/importline');
	},
	
	/**
	 * @description : 提交并判断条件
	  * @author : 李超
	 * @date : 2013-11-12上午09:28:26 
	 */
	saveImportLine: function(){
		if(this.importForm.form.isValid()){
			var type = this.importForm.findField('importType').getGroupValue();
			if(type == '1') {
				Ext.MessageBox.confirm("提示", "确定要把原有的数据删除吗？",
					function(ret) {
						if (ret == 'yes') {
							this.importStorageLines(type);
						}
					},this
				);
			} else {
				this.importStorageLines(type);
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
	 * @author : 李超
	 * @date : 2013-11-12上午09:28:26 
	 */
	importStorageLines : function(type) {
		this.importForm.form.submit({
			url: "system/upLoadDocument.html",
            method: 'post',
            waitTitle : "请稍等",
			waitMsg : '上传文件中.....',
            scope : this,
            params : {
            	'document.docType.id' : '2c9ffab7483409e70148352db9970003',
            	'document.docFk' : '88fab0b58df24711badae71a6eaf46cc'
            },
            success: function(form, action) {
            	this.importForm.ownerCt.close();
				this.myMask.show();
            	Ext.Ajax.request({
            		timeout: 600000,
					url : 'base/importStorageLine.html',
					method : 'post',
					params : {
						importType : type,
						mainId : this.mainId
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
								fn : function(){
									this.dataLineGrid.store.load();
									this.getDaySum.defer(300,this);
								},
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
	},
	/**
	 * @description : 导入Excel
	 * @scope ：this.listTbar
	 * @author : 李超
	 * @date : 2013-11-12上午09:28:26 
	 */
	importStorage : function () {
		this.showWin({title:'导入'}, 'base/storage/import');
	},
	
	/**
	 * 提交并判断条件
	 */
	saveImport: function(){
		if(this.importForm.form.isValid()){
			var type = this.importForm.findField('importType').getGroupValue();
			var code = "";
			var sysId = this.importForm.findField('importSysId').getGroupValue();
			if(type == '1') {
				Ext.MessageBox.confirm("提示", "确定要把原有的设备台账数据删除吗？",
					function(ret) {
						if (ret == 'yes') {
							this.importStorages(type, code, sysId);
						}
					},this
				);
			} else {
				this.importStorages(type, code, sysId);
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
	 * 导入数据
	 */
	importStorages : function(type, code, sysId) {
		this.importForm.form.submit({
			url: "system/upLoadDocument.html",
            method: 'post',
            waitTitle : "请稍等",
			waitMsg : '上传文件中.....',
            scope : this,
            params : {
            	'document.docType.id' : '2c9ffab7483409e70148352db9970003',
            	'document.docFk' : '6ab680b58df24711badae71a6adf46bb'
            },
            success: function(form, action) {
            	this.importForm.ownerCt.close();
				this.myMask.show();
            	Ext.Ajax.request({
            		timeout: 600000,
					url : 'base/importStorage.html',
					method : 'post',
					params : {
						importType : type,
						importCode : code,
						importSysId : sysId	
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