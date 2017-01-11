/**
 * @description : 年度考核标准管理
 * @date : 2015-03-16 08:49:30
 * @author : 周强
 */

Ext.lion.rpms.InnovateYearCheckManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.InnovateYearCheckManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.InnovateYearCheckManager, Ext.lion.LionBusinessManager, {
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
