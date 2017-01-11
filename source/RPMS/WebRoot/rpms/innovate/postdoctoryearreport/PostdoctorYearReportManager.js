/**
 * @description : 年报评估管理
 * @date : 2015-05-11 17:22:42
 * @author : 周强
 */

Ext.lion.rpms.PostdoctorYearReportManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.PostdoctorYearReportManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.PostdoctorYearReportManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
		'showedit' : {
			fn : Ext.emptyFn,
			scope: this
			}
		});
	}
});
