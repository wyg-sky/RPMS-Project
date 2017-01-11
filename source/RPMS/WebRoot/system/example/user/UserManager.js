 /**
 * @description : 用户业务逻辑
 * @date : 2012-12-21
 * @author : 王绪乐
 */
Ext.lion.system.UserManager = function(config) {
	Ext.apply(this,config);
	
	Ext.lion.system.UserManager.superclass.constructor.call(this);
}

Ext.extend(Ext.lion.system.UserManager, Ext.lion.LionBusinessManager, {});