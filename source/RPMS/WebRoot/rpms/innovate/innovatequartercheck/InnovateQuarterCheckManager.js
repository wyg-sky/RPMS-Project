/**
 * @description : 季度检查项目管理
 * @date : 2015-03-12 13:39:57
 * @author : 周强
 */

Ext.lion.rpms.InnovateQuarterCheckManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.InnovateQuarterCheckManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.InnovateQuarterCheckManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.query();
		this.on({
		'showedit' : {
			fn : Ext.emptyFn,
			scope: this
		}
		});
	}
});
