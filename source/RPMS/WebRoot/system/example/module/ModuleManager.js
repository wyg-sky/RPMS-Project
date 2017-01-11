Ext.lion.ScriptLoader('ext/TreeGrid.js',false);
Ext.lion.CssLoader("ext/TreeGrid.css");	 
/**
 * @description : 用户业务逻辑
 * @date : 2012-12-21
 * @author : 王绪乐
 */
Ext.lion.system.ModuleManager = function(config) {
	Ext.apply(this,config);
	
	Ext.lion.system.ModuleManager.superclass.constructor.call(this);
}

Ext.extend(Ext.lion.system.ModuleManager, Ext.lion.LionBusinessManager, {});