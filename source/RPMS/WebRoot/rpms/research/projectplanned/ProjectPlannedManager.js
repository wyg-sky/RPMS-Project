/**
 * @description ：项目规划Action类
 * @date ：2015-03-09
 * @author ：王圣磊
 */

Ext.lion.rpms.ProjectPlannedManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.ProjectPlannedManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.ProjectPlannedManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
			'showedit' : {
				fn : Ext.emptyFn,
				scope: this
			},
			'beforeedit' : {
				fn : function() {
					var records = this.dataGrid.getSelections(true);
					for (var i = 0; i < records.length; i++) {
						var valid = records[0].get(this.dataGrid
								.getFieldName('valid'));
						if (valid != '1') {
							Ext.MessageBox.alert("提示",
									" 只有“有效”的数据才可以修改！");
							return false;
						}
					}
				},
				scope : this
			},
			'beforedelete' : {
				fn : function() {
					var records = this.dataGrid.getSelections(true);
					for (var i = 0; i < records.length; i++) {
						var valid = records[0].get(this.dataGrid
								.getFieldName('valid'));
						if (valid != '0') {
							Ext.MessageBox.alert("提示",
									" 只有“无效”的数据才可以删除！");
							return false;
						}
					}
				},
				scope : this
			}
		});
	}
});
