/**
 * @description ：成果管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */

Ext.lion.rpms.ResearchEvaluateManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.ResearchEvaluateManager.superclass.constructor.call(this);
	this.dataGrid.on('onload', function() {
	}, this);
};

Ext.extend(Ext.lion.rpms.ResearchEvaluateManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
	}
});
