 /**
 * @description : 单点连接业务逻辑
 * @date : 2012-12-21
 * @author : xuehp
 */
Ext.lion.system.SingleSystemManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.SingleSystemManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.system.SingleSystemManager, Ext.lion.LionBusinessManager, {});