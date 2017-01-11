/**
 * @description ：项目报奖
 * @date ：2015-03-09
 * @author ：王圣磊
 */

Ext.lion.rpms.ProjectAwardManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.ProjectAwardManager.superclass.constructor.call(this);
	this.dataGrid.on('onload', function() {
	}, this);
};

Ext.extend(Ext.lion.rpms.ProjectAwardManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
			'beforedelete' : {
				fn : function() {
					var records = this.dataGrid.getSelections(true);
					for (var i = 0; i < records.length; i++) {
						var status = records[0].get(this.dataGrid
								.getFieldName('status'));
						if (status != '0001' && status != '0004') {
							Ext.MessageBox.alert("提示",
									" 只有“未上报”的数据才可以删除！");
							return false;
						}
					}
				},
				scope : this
			},
			'beforeedit' : {
				fn : function() {
					this.checkflag = true;
					var records = this.dataGrid.getSelections(true);
					for (var i = 0; i < records.length; i++) {
						var status = records[0].get(this.dataGrid.getFieldName('status'));
								
						if(Ext.isAllowed('rpms_projectawards_otheradd') && (status == '0002' ||status == '0003')){
							this.checkflag = false;
						}else{
							this.checkflag = true;
						}
					}
				},
				scope : this
			},
	        'beforeadd' : {
	            fn:function(){
					 this.checkflag = true;
	            },
	            scope:this
	        },
	        'showadd' : {
	            fn:function(){
					 this.checkflag = true;
	            },
	            scope:this
	        },
	        'beforeview' : {
	            fn:function(){
					 this.checkflag = false;
	            },
	            scope:this
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
				}else if(value == '0002' && valid != '0001' && valid != '0004'){
					Ext.MessageBox.alert("提示","只有未上报或已打回的数据才可以上报！");
				    return false; 
				}else if(value == '0003' && valid != '0002'){
					Ext.MessageBox.alert("提示","只有已上报的数据才可以审批！");
				    return false; 
				}else if(value == '0004' && valid != '0002'){
					Ext.MessageBox.alert("提示","只有已上报的数据才可以打回！");
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
		this.editForm.findField("organizations.id").setValue({text:record[0].get('organization.name'),value:record[0].get('organization.id')});
		this.editForm.findField("platCenter.id").setValue({text:record[0].get('platCenter.platName'),value:record[0].get('platCenter.id')});
		this.editForm.findField("platInstitutions.id").setValue({text:record[0].get('platInstitution.platName'),value:record[0].get('platInstitution.id')});
		this.editForm.findField("specialty.id").setValue({text:record[0].get('specialty.specialtyName'),value:record[0].get('specialty.id')});
		this.editForm.findField("projectId.achievementLevel").setValue(record[0].get('achievementLevel'));
		this.editForm.findField("projectId.reviewMechanism").setValue(record[0].get('reviewMechanism'));
	},
		/**
	 * excel导出
	 * @param {} G
	 * @param {} C
	 * @param {} I
	 */
	exportData : function(G, C, I) {
		var manager = this;
		var A = G;
		if (A.querySql) {
			window.open("system/exportData.html?" + Ext.urlEncode(A));
			return
		}
		var _ = {};
		if (A.isLine && A.isLine == true) {
			if (!C) {
				Ext.MessageBox.show({
							title : "提示",
							msg : "子表导出时请传入子表列表对象！",
							buttons : Ext.MessageBox.OK,
							fn : function() {
							},
							icon : Ext.MessageBox.WARNING,
							scope : this
						});
				return
			}
			if (I) {
				var E = C.store.baseParams.queryFields, F = C.store.baseParams.operatorValues, $ = C.store.baseParams.fieldValues;
				_ = this.getQueryCondition(I, E, F, $)
			} else
				Ext.apply(_, C.store.baseParams)
		} else {
			if (!C)
				C = this.dataGrid;
			if (!I)
				I = this.queryForm;
			E = C.store.baseParams.queryFields, F = C.store.baseParams.operatorValues, $ = C.store.baseParams.fieldValues;
			_ = this.getQueryCondition(I, E, F, $)
		}
		
		if (!A.viewPath)
			A.viewPath = C.viewPath;
		var D = Ext.create({
					xtype : "lioneditorgrid",
					viewPath : A.viewPath,
					editable : false,
					allowPage : true,
					showLookButton : false,
					showEditButton : false,
					showCopyButton : false,
					showDeleteButton : false,
					height : 500,
					manager : manager
				});
		_.limit = FW.pageSize;
		if (_.queryFields && _.queryFields.length == 0) {
			delete _.queryFields;
			delete _.operatorValues;
			delete _.fieldValues
		}
		
		Ext.apply(D.store.baseParams, _);
		Ext.apply(A, D.store.baseParams);
		var B = this.getGridColumnInfo(D);
		if (B.propertys.length > 0)
			Ext.apply(A, B);

		var H = this.addToWin(D, {
					title : "导出预览",
					width : 1000,
					height : 563,
					buttonAlign : "center",
					buttons : [{
								text : "整页导出",
								iconCls : "confirm-icon",
								handler : function() {
									delete A.limit;
									//console.log(Ext.urlEncode(A));
									manager.openPostWindow("system/exportData.html", A)
									// window.open("system/exportData.html?" +
									// Ext.urlEncode(A));
									H.close()
								}
							}, {
								text : "分页导出",
								iconCls : "confirm-icon",
								handler : function() {
									A.start = D.toolbars[0].cursor;
									A.limit = D.store.baseParams.limit;
									manager.openPostWindow("system/exportData.html", A)
									// window.open("system/exportData.html?" +
									// Ext.urlEncode(A));
									H.close()
								}
							}, {
								text : "取消",
								iconCls : "close-icon",
								handler : function() {
									H.close()
								}
							}]
				})
	},
	openPostWindow : function(url, data, name) {
		var manager = this;
		var tempForm = document.createElement("form");

		tempForm.id = "tempForm1";

		tempForm.method = "post";

		tempForm.action = url;

		tempForm.target = name;
		for (var p in data) {
			if (p == "headers" 
				|| p == "keyTypes" 
				|| p == "queryFields" 
				|| p == "operatorValues" 
				|| p == "fieldValues" 
				|| p == "propertys") {
				continue;
			}
			var hideInput = document.createElement("input");
			hideInput.type = "hidden";
			hideInput.name = p;
			hideInput.value = data[p];
			tempForm.appendChild(hideInput);
		}

		var headers = data.headers;
		var keyTypes = data.keyTypes;
		var propertys = data.propertys;
		var queryFields = data.queryFields;
		var operatorValues = data.operatorValues;
		var fieldValues = data.fieldValues;
		manager.addFields(tempForm,propertys,"propertys");
		manager.addFields(tempForm,keyTypes,"keyTypes");
		manager.addFields(tempForm,headers,"headers");
		manager.addFields(tempForm,queryFields,"queryFields");
		manager.addFields(tempForm,operatorValues,"operatorValues");
		manager.addFields(tempForm,fieldValues,"fieldValues");
		//console.log(tempForm);
		document.body.appendChild(tempForm);

		//兼容
		if (document.all) {
			tempForm.fireEvent("onsubmit");
		} else {
			var evt = document.createEvent('HTMLEvents');
			evt.initEvent('onsubmit', true, true);
			tempForm.dispatchEvent(evt);
		}

		tempForm.submit();

		document.body.removeChild(tempForm);
	},
	
	addFields:function(form,data,name){
		if(typeof(data) == "undefined" || data == null){
			return;
		}
		for (var i = 0; i < data.length; i++) {

			var hideInput = document.createElement("input");

			hideInput.type = "hidden";

			hideInput.name = name;

			hideInput.value = data[i];

			form.appendChild(hideInput);
		}
	}
});
