/**
 * @description : 博士后课题管理
 * @date : 2015-03-16 09:09:33
 * @author : 周强
 */

Ext.lion.rpms.PostdoctorTopicManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.PostdoctorTopicManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.PostdoctorTopicManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
		'showedit' : {
			fn : Ext.emptyFn,
			scope: this
		}
		});
	}
});
