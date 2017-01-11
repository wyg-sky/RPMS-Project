/**
 * @description ：通知管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */

Ext.lion.rpms.ProjectFileManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.ProjectFileManager.superclass.constructor.call(this);
	this.dataGrid.on('onload', function() {
	}, this);
};

Ext.extend(Ext.lion.rpms.ProjectFileManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
			'beforedelete' : {
				fn : function() {
					var records = this.dataGrid.getSelections(true);
					for (var i = 0; i < records.length; i++) {
						var status = records[0].get(this.dataGrid
								.getFieldName('status'));
						if (status != '0001') {
							Ext.MessageBox.alert("提示",
									" 只有“未下发”的数据才可以删除！");
							return false;
						}
					}
				},
				scope : this
			},
			'beforeedit' : {
				fn : function() {
					var records = this.dataGrid.getSelections(true);
					for (var i = 0; i < records.length; i++) {
						var status = records[0].get(this.dataGrid
								.getFieldName('status'));
						if (status != '0001') {
							Ext.MessageBox.alert("提示",
									" 只有“未下发”的数据才可以修改！");
							return false;
						}
					}
				},
				scope : this
			},
			'showgridedit' : {
				fn : this.editLineObject,
				scope : this
			},
			'showgridview' : {
				fn : this.viewLineObject,
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
					url : 'base/changeProjectFileStatus.html',
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
						/**
						 * 推送系统消息
						 */
						if(value == '0003'){
							Ext.Ajax.request({
								url : 'rpms/sendNoticeForPFile.html',
								params : {
									ids : ids  
								},
								scope : this,
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
	 * 新增子表的方法 ： 可同时添加多行
	 */
	addLineObject : function() {
		var selectWin = new Ext.lion.LionSelectWindow({
			width : 1100,
			height : 550,
			viewPathOfUi : 'system/organization/list',
			title : '选择通知接收单位'
		});
		
		selectWin.on('after_comfirm_click', function(records) {
			var RecordType = this.dataLineGrid.getRecordType();
			var str = ""; //记录重复添加的单位ID
			for(var i = 0; i< records.length; i++) {
				var bool = false;
				var recordstemp = this.dataLineGrid.getStore().getRange();
				for(var k = 0; k < recordstemp.length; k++){
					var str1 = "";
					if(recordstemp[k].get('receiveUnit.id') == records[i].get('id')){
						bool = true;
						str1 = recordstemp[k].get('receiveUnit.name');
						str += str1 + ',';
					}
				}
				if(!bool){
					var r = new RecordType({
						'id':'',
						'mainId' : this.mainId,
						'receiveUnit.id' : records[i].get('id'),
						'receiveUnit.name' : records[i].get('name'),
						'receivePeople.id' : '',
						'receivePeople.userName' : '',
						'fileStatus' : '0001',
						'isArchived' : '0',
						'fileReceipt' : ''
					});
					this.dataLineGrid.store.add(r);
				}
			}
			if(str.length>1){
				str = str.substring(0,str.length-1);
				var st = "单位‘ "+str+" ’已经存在不能再重复添加!";
				Ext.MessageBox.alert("提示",st);
			}
				
		}, this);
	},
	
	/**
	 * 编辑子表的方法
	 */
	editLineObject : function(){
		this.dataLineGrid.getGridForm().hide();
		this.dataLineGrid.plugins.hide();
		var record = this.dataLineGrid.getSelections(true);
		this.mainId = record[0].get("id");
		if(this.mainId == ''){
			Ext.MessageBox.show({
				title : '提示',
				msg : '还未反馈，请稍后查看！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO,
				scope : this
			});
		}else{
			this.editLineWin = this.showWin({title:"编辑通知回执"}, 'rpms/research/projectfile/editline');
			this.loadLineObject(record);
		}
	},
	/**
	 * 保存子表的方法
	 */
	saveLineObject : function(){
		Ext.Ajax.request({
			url : 'rpms/saveProjectFileLine.html',
			params : {
				id : this.editLineForm.findField("id").getValue() ,  
				receiveUnit : this.editLineForm.findField("receiveUnit.id").getValue(),
				fileChecktime : this.editLineForm.findField("fileChecktime").getValue(),
				fileReceipt : this.editLineForm.findField("fileReceipt").getValue()
			},
			scope : this,
			waitTitle : '请稍候',
			waitMsg : '设置中...',
			success:function(response){
				var json = Ext.util.JSON.decode(response.responseText || "{}");
                if(json.success) {
					Ext.MessageBox.show({
						title : '成功',
						msg : '保存成功！<br>',
						buttons : Ext.MessageBox.OK,
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
						msg : '保存失败'+msg+'！<br>',
						buttons : Ext.MessageBox.OK,
						fn : function(){},
						icon : Ext.MessageBox.WARNING,
						scope : this
					});
                }
			}});
			
		var record = this.dataLineGrid.getSelections(true);
		record[0].set('id',this.editLineForm.findField("id").getValue());
		record[0].set('mainId',this.editLineForm.findField("mainId").getValue());
		record[0].set('receiveUnit.id',this.editLineForm.findField("receiveUnit.id").getValue());
		record[0].set('receiveUnit.name',this.editLineForm.findField("receiveUnit.id").getText());
		record[0].set('receivePeople.id',this.editLineForm.findField("receivePeople.id").getValue());
		record[0].set('receivePeople.userName',this.editLineForm.findField("receivePeople.id").getValue());
		record[0].set('fileStatus',this.editLineForm.findField("fileStatus").getValue());
		record[0].set('fileChecktime',this.editLineForm.findField("fileChecktime").getValue());
		record[0].set('fileReceipt',this.editLineForm.findField("fileReceipt").getValue());
//		this.dataLineGrid.store.load();
		this.dataLineGrid.store.commitChanges();
		this.editLineWin.hide();
	},
	/**
	 * 查看子表
	 */
	viewLineObject : function(record){
		this.dataLineGrid.getGridForm().hide();
		this.dataLineGrid.plugins.hide();
		var record = this.dataLineGrid.getSelections(true);
		this.mainId = record[0].get("id");
		if(this.mainId == ''){
			Ext.MessageBox.show({
				title : '提示',
				msg : '还未反馈，请稍后查看！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO,
				scope : this
			});
		}else{
			this.editLineWin = this.showWin({title:"编辑通知回执"}, 'rpms/research/projectfile/editline');
			this.loadLineObject(record);
		}
	},
	/**
	 * 加载子表的方法
	 */
	loadLineObject : function(record){
		this.editLineForm.findField("id").setValue(record[0].get("id"));
		this.editLineForm.findField("mainId").setValue(record[0].get("mainId"));
		this.editLineForm.findField("receiveUnit.id").setValue({value:record[0].get("receiveUnit.id"),text:record[0].get("receiveUnit.name")});
		this.editLineForm.findField("receivePeople.id").setValue({value:FW.id,text:FW.userName});
		this.editLineForm.findField("fileStatus").setValue("0002");
		this.editLineForm.findField("fileChecktime").setValue(new Date().format('Y-m-d H:i:s'));
		this.editLineForm.findField("fileReceipt").setValue(record[0].get("fileReceipt"));
	},
	closeClick : function (){
		 this.manager.dataGrid.store.load();
		 this.closeClick();
	}
	/**
	 * 保存方法
	 */
/*	saveObject : function() {
		var records = this.dataLineGrid.getStore().getRange();
		if (this.fireEvent('beforesave', this) && this.editForm) {
			var params = null;
			if (this.dataLineGrid.isValid()) {// 保存子表信息
				var records = this.dataLineGrid.getStore().getRange();
				var line = [];
				for (var i = 0; i < records.length; i++) {
					line.push(records[i].data);
				}
				params = Ext.lion.LionParamsConvert(line,
						"businessObject.projectFileLine", true);
			} else {
				Ext.MessageBox.show({
							title : '提示',
							msg : '子表数据输入不完整！<br>',
							buttons : Ext.MessageBox.OK,
							fn : function() {
							},
							icon : Ext.MessageBox.WARNING,
							scope : this
						});
				return;
			}
			this.editForm.save(params);
			this.editForm.on('aftersave', function() {
				if (this.fireEvent('aftersave', this)) {
					if (this.dataGrid) {
						this.dataGrid.store.load();
					}
					this.editForm.ownerCt.close();
				}
			}, this);
		}
	}*/
});
