/**
 * 数据导入配置
 */
Ext.lion.system.ImportSettingManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.ImportSettingManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.system.ImportSettingManager, Ext.lion.LionBusinessManager, {
	
	bussinessInit : function() {
		this.importTypes = {
			AUTO_ID : '0001',//自动生成ID
			AUTO_TIME : '0002',//填充当前时间
			AUTO_USER_ID : '0003',//填充登陆用户ID
			AUTO_USER_NAME : '0004',//填充登陆用户名
			CUSTOM_GEN : '0005',//自定义生成
			MAINID_COLUMN : '0011',//主表ID列
			GET_ORIGINAL : '0006',//取原始数据
			KEY_VALUE_CONVERT : '0007',//键值对转换
			OBJECT_CONVERT : '0008',//对象转换
			CUSTOM_CONVERT : '0009',//自定义转换
			TIME_CONBERT : '0010'//时间转换
		};
	},
	
	loadLineFormTable : function(editForm,tableName) {
		//将表名中的小写字母转换为大写字母
		tableName = Ext.util.Format.uppercase(tableName);
		
		editForm.findField('tableName').setValue(tableName);
		editForm.findField('tempTableName').setValue('TEMP_' + tableName);
		
		Ext.apply(this.dataLineGrid.store.baseParams, {
			tableName : tableName
		});
		this.dataLineGrid.store.load();
	},
	
	importTypeSelect : function(record) {
		var records = this.dataLineGrid.getSelections(false);
		if(record && record.get('id') && records && records.length > 0) {
			if(record.get('id') == this.importTypes.CUSTOM_GEN){//自定义生成
				records[0].set('methodName','customGen');
			} else if(record.get('id') == this.importTypes.CUSTOM_CONVERT){//自定义转换
				records[0].set('methodName','customConvert');
			} else if(record.get('id') == this.importTypes.TIME_CONBERT) {
				records[0].set('param','YYYY-MM-DD HH24:MI:SS');
			}
		}
	},
	
	checkLine : function() {
		var checkLine = false;
		var isLine = this.editForm.findField('isLine').getValue();
		if(isLine == '0') {
			checkLine = true;
		}
		
		var records = this.dataLineGrid.getStore().getRange();
		for(var i = 0; i < records.length; i++) {
			if(!this.checkLineValid(records[i], this.dataLineGrid, i)) {
				return false;
			}
			if(records[i].get('importType') == this.importTypes.MAINID_COLUMN) {
				checkLine = true;
			}
		}
		
		if(!checkLine) {
			Ext.MessageBox.minWidth = 390;
			Ext.MessageBox.show({
				title : '提示',
				msg : '子表导入需要将某一列的导入方式设置为"主表ID字段"',
				scope : this,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO
			});
			Ext.MessageBox.minWidth = 150;
		}
		
		return checkLine;
	},
	
	checkLineValid : function(record, dataGrid, rowIndex) {
		var valid = true;
		var msg = '';
		if(record.get('importType') == this.importTypes.CUSTOM_GEN){//自定义生成
			if(!record.get('methodName')) {
				msg = '自定义生成需设置"方法名称"';
				valid = false;
			}
		} else if(record.get('importType') == this.importTypes.GET_ORIGINAL){//取原始数据
			if(!record.get('excelColumn')) {
				msg = '取原始数据需设置"Excel列号"';
				valid = false;
			}
		} else if(record.get('importType') == this.importTypes.KEY_VALUE_CONVERT){//键值对转换
			if(!record.get('excelColumn') || !record.get('keyType')) {
				msg = '键值对换转需设置"Excel列号"和"键值对类型"';
				valid = false;
			}
		} else if(record.get('importType') == this.importTypes.OBJECT_CONVERT){//对象转换
			if(!record.get('excelColumn') || !record.get('results')
					|| !record.get('joinColumn') || !record.get('saveColumn')) {
				msg = '键值对换转需设置"Excel列号"、"结果集/表名"、"关联字段"和"保存字段"';
				valid = false;
			}
		} else if(record.get('importType') == this.importTypes.CUSTOM_CONVERT){//自定义转换
			if(!record.get('excelColumn') || !record.get('methodName')) {
				msg = '键值对换转需设置"Excel列号"和"方法名称"';
				valid = false;
			}
		} else if(record.get('importType') == this.importTypes.TIME_CONBERT){//时间转换
			if(!record.get('excelColumn') || !record.get('param')) {
				msg = '键值对换转需设置"Excel列号"并在"参数"中设置日期格式';
				valid = false;
			}
		}
		
		if(!valid) {
			dataGrid.getSelectionModel().selectRow(rowIndex);
			Ext.MessageBox.show({
				title : '提示',
				msg : '子表第' + (rowIndex + 1) + '行验证失败<br>原因为：' + msg,
				scope : this,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO
			});
		}
		
		return valid;
	}
	
});
