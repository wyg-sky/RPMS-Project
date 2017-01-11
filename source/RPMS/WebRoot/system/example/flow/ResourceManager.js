 /**
 * @description : 资源业务逻辑
 * @date : 2012-12-21
 * @author : 王绪乐
 */
Ext.lion.system.FlowResourceManager = function(config) {
	Ext.apply(this,config);
	
	Ext.lion.system.FlowResourceManager.superclass.constructor.call(this);
}

Ext.extend(Ext.lion.system.FlowResourceManager, Ext.lion.LionWorkFlowManager, {});