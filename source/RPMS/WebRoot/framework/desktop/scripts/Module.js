Ext.app.Module = function(config){
    Ext.apply(this, config);
    Ext.app.Module.superclass.constructor.call(this);
    this.init();
}

Ext.extend(Ext.app.Module, Ext.util.Observable, {
	moduleId : '',
	moduleName : '',
	moduleUrl : '',
	moduleImgUrl : '',
	winWidth : 1000,
	winHeight : 610,
    init : Ext.emptyFn
});