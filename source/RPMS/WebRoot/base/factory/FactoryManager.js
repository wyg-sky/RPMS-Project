 /**
 * @description : 油脂供应商
 * @date : 2013-08-29
 * @author : 曹鹏程
 */
Ext.lion.base.FactoryManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.base.FactoryManager.superclass.constructor.call(this);
	this.myMask = new Ext.LoadMask(Ext.getBody(), {
		msg: '正在导入数据，这可能需要几分钟，请耐心等待......！',
		removeMask: true 
	});
	this.dataGrid.on('celldblclick', function() {
	  	this.viewObject();
	}, this);
};

Ext.extend(Ext.lion.base.FactoryManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.queryForm.findField("valid").setValue("1");
		this.queryForm.findField("groupValid").setValue("1");
		this.query();
		this.on({
			'showedit' : {
				fn : Ext.emptyFn,
				scope: this
			},
			'showcopy' : {
				fn : this.editFormCopyInit,
				scope: this
			},
			'beforecopy' : {
				fn : function() {
					var records = this.dataGrid.getSelectionModel().getSelections();
				    var flag = true;
				    for(var i = 0; i < records.length; i++){
			        	var status = records[i].get('dataType');
		            	if(status =='0001'){
		            		flag = false;
		         		}
			        }
			        if(flag ==false){
	                	Ext.MessageBox.show({
							title : '提示',
							msg : '数据类型为公共的记录不能复制！<br>',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.INFO,
							scope : this
						});
			        	return false; 
			        }
				},
				scope: this
			},
			'beforedelete' : {
				fn : function() {
					var records = this.dataGrid.getSelectionModel().getSelections();
				    var flag = true;
				    for(var i = 0; i < records.length; i++){
			        	var status = records[i].get('dataType');
		            	if(status =='0001'){
		            		flag = false;
		         		}
			        }
			        if(flag ==false){
	                	Ext.MessageBox.show({
							title : '提示',
							msg : '数据类型为公共的记录不能删除！<br>',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.INFO,
							scope : this
						});
			        	return false; 
			        }
				},
				scope: this
			},
			'beforeedit' : {
				fn : function(){
					var records = this.dataGrid.getSelectionModel().getSelections();
				    var flag = true;
				    for(var i = 0; i < records.length; i++){
			        	var status = records[i].get('dataType');
		            	if(status =='0001'){
		            		flag = false;
		         		}
			        }
			        if(flag ==false){
	                	Ext.MessageBox.show({
							title : '提示',
							msg : '数据类型为公共的记录不能编辑！<br>',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.INFO,
							scope : this
						});
			        	return false; 
			        }
				},
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
		
	},
	viewObj : function(){
		this.isView = true;
	},
	editObj : function(){
		this.isView = false;
	},
	/**
	 * 复制时编码重新生成
    */
	editFormCopyInit : function() {
		this.editForm.on('load', function() {
		    this.editForm.findField('factoryCd').load();
		}, this);
	},
	/**
	 * 新增子表的方法
	 */
	addLineObject : function() {
		var RecordType = this.dataLineGrid.getRecordType();
		var r = new RecordType({
			'mainId' : this.mainId
		});
		this.dataLineGrid.store.add(r);
	},
		
   //查询
	query : function(isClear, queryFields, operatorValues, fieldValues) {
		if(!queryFields) {
			queryFields = [];
			operatorValues = [];
			fieldValues = [];
		}
		
		if(isClear == true) {
			this.clearQuery();
		} else {
			this.queryForm.findBy(function(item){
				if(item.isLoad != false) {
					var queryField = '';
					if(item.queryField) {
						queryField = item.queryField;
					} else {
						var queryObject = this.queryForm.queryObject? this.queryForm.queryObject + '.' : 'obj.'
						if(item.name) {
							queryField = queryObject + item.name;
						} else {
							if(item.hiddenName) {
								queryField = queryObject + item.hiddenName;
							}
						}
					}
					
					if(queryField) {
		        		var value = item.getValue();
		        		if(!Ext.isEmpty(value)) {
							queryFields.push(queryField);
							if(item.operator) {
								operatorValues.push(item.operator);
			        			fieldValues.push(value);
							} else {
								operatorValues.push('like');
			        			fieldValues.push('%'+value + '%');
							}
						}
					}
				}
		        return true;
		    }, this);
		}
	    
	    if(queryFields.length > 0) {
			Ext.apply(this.dataGrid.store.baseParams, {
				queryFields : queryFields,
				operatorValues : operatorValues,
				fieldValues : fieldValues
			});
	    } else {
	    	delete this.dataGrid.store.baseParams.queryFields;
	    	delete this.dataGrid.store.baseParams.operatorValues;
	    	delete this.dataGrid.store.baseParams.fieldValues;
	    }
	    
		this.dataGrid.store.load();
	},
	
	/**
	 * @description : 修改记录
	 * @author : 辛尔青
	 * @date : 2013-10-29下午04:28:26
	 */
	changeStatus : function(property, value, tip) {
		var records = this.dataGrid.getSelections(true);
		var ids = "";
		if(records && records.length > 0) {
			for(var i = 0; i < records.length ; i++) {
				var valid =  records[i].get(this.dataGrid.getFieldName('valid'));
				var dataType =  records[i].get(this.dataGrid.getFieldName('dataType'));
				if("0001" == dataType){
					Ext.MessageBox.show({
						title : '提示',
						msg : "数据类型为公共的记录不能"+tip+"！"+'<br>',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO,
						scope : this
					});
			        return false; 
				} else {
					if (value == valid) {
						Ext.MessageBox.show({
							title : '提示',
							msg : '状态相同，无需修改！<br>',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.INFO,
							scope : this
						});
						return false;
					} else {
						ids += records[i].get(this.dataGrid.getFieldName('id')) + ',';
					}
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
					url : 'base/changeFactoryStatus.html',
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
	 * @author : lc
	 * @date : 2013-11-12上午09:28:26 
	 */
	importFactory : function () {
		this.showWin({title:'导入'}, 'base/factory/import');
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
							this.importFactorys(type, code, sysId);
						}
					},this
				);
			} else {
				this.importFactorys(type, code, sysId);
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
	importFactorys : function(type, code, sysId) {
		this.importForm.form.submit({
			url: "system/upLoadDocument.html",
            method: 'post',
            waitTitle : "请稍等",
			waitMsg : '上传文件中.....',
            scope : this,
            params : {
            	'document.docType.id' : '2c9ffaf9481f9e80014833ff173e003b',
            	'document.docFk' : '7bb680b58df24711badae71a6eaf46bb'
            },
            success: function(form, action) {
            	this.importForm.ownerCt.close();
				this.myMask.show();
            	Ext.Ajax.request({
            		timeout: 600000,
					url : 'base/importFactory.html',
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