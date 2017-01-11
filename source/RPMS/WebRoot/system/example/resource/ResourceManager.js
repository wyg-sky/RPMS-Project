 /**
 * @description : 用户业务逻辑
 * @date : 2012-12-21
 * @author : 王绪乐
 */
Ext.lion.system.ResourceManager = function(config) {
	Ext.apply(this,config);
	
	Ext.lion.system.ResourceManager.superclass.constructor.call(this);
}

Ext.extend(Ext.lion.system.ResourceManager, Ext.lion.LionBusinessManager, {});