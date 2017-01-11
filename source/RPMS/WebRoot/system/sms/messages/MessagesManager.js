 /**
 * @description : 短信管理
 * @date : 2013-03-29
 * @author : 周亚京
 */
Ext.lion.system.MessagesManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.MessagesManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.system.MessagesManager, Ext.lion.LionBusinessManager, {});