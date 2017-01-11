 /**
 * @description : 操作日志管理
 * @date : 2014-07-29
 * @author : 周亚京
 */
Ext.lion.system.OperateLogManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.OperateLogManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.system.OperateLogManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		
	},
	
	deleteLastYearLogs : function() {
		var m = Ext.MessageBox.confirm("提示", "确定要删除一年前的日志记录吗？",function(ret) {
			if (ret == 'yes') {
				Ext.Ajax.request({
					url : 'system/deleteLastYearLogs.html',
					method : 'post',
					scope : this,
					success : function(response,options) {
						var json = Ext.util.JSON.decode(response.responseText || "{}");
						if (json.success) {
							Ext.MessageBox.show({
								title : '提示',
								msg : '删除成功！',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
							this.dataGrid.store.load();
						} else {
							Ext.MessageBox.show({
								title : '提示',
								msg : '删除失败！',
								buttons : Ext.MessageBox.OK,
								fn : function(){},
								icon : Ext.MessageBox.ERROR,
								scope : this
							});
						}
					},
					failure : function() {
						Ext.MessageBox.show({
							title : '提示',
							msg : '删除失败！',
							buttons : Ext.MessageBox.OK,
							fn : function(){},
							icon : Ext.MessageBox.ERROR,
							scope : this
						});
					}
				});
			}
		},this);
	},
	
	deleteLastMonthLogs : function() {
		var m = Ext.MessageBox.confirm("提示", "确定要删除一月前的日志记录吗？",function(ret) {
			if (ret == 'yes') {
				Ext.Ajax.request({
					url : 'system/deleteLastMonthLogs.html',
					method : 'post',
					scope : this,
					success : function(response,options) {
						var json = Ext.util.JSON.decode(response.responseText || "{}");
						if (json.success) {
							Ext.MessageBox.show({
								title : '提示',
								msg : '删除成功！',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
							this.dataGrid.store.load();
						} else {
							Ext.MessageBox.show({
								title : '提示',
								msg : '删除失败！',
								buttons : Ext.MessageBox.OK,
								fn : function(){},
								icon : Ext.MessageBox.ERROR,
								scope : this
							});
						}
					},
					failure : function() {
						Ext.MessageBox.show({
							title : '提示',
							msg : '删除失败！',
							buttons : Ext.MessageBox.OK,
							fn : function(){},
							icon : Ext.MessageBox.ERROR,
							scope : this
						});
					}
				});
			}
		},this);
	},
	
	deleteAllLogs : function() {
		var m = Ext.MessageBox.confirm("提示", "确定要清空日志记录吗？",function(ret) {
			if (ret == 'yes') {
				Ext.Ajax.request({
					url : 'system/deleteAllLogs.html',
					method : 'post',
					scope : this,
					success : function(response,options) {
						var json = Ext.util.JSON.decode(response.responseText || "{}");
						if (json.success) {
							Ext.MessageBox.show({
								title : '提示',
								msg : '删除成功！',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
							this.dataGrid.store.load();
						} else {
							Ext.MessageBox.show({
								title : '提示',
								msg : '删除失败！',
								buttons : Ext.MessageBox.OK,
								fn : function(){},
								icon : Ext.MessageBox.ERROR,
								scope : this
							});
						}
					},
					failure : function() {
						Ext.MessageBox.show({
							title : '提示',
							msg : '删除失败！',
							buttons : Ext.MessageBox.OK,
							fn : function(){},
							icon : Ext.MessageBox.ERROR,
							scope : this
						});
					}
				});
			}
		},this);
	}
	
});