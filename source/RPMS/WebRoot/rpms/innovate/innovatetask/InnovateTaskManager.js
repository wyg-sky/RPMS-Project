/**
 * @description : 工作任务管理
 * @date : 2015-03-11 14:48:31
 * @author : 周强
 */

Ext.lion.rpms.InnovateTaskManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.InnovateTaskManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.InnovateTaskManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
		'showedit' : {
			fn : Ext.emptyFn,
			scope: this
		}
		});
	}
});
