 /**
 * @description : 短信联系人管理
 * @date : 2013-03-29
 * @author : 周亚京
 */
Ext.lion.system.ContactsManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.ContactsManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.system.ContactsManager, Ext.lion.LionBusinessManager, {});