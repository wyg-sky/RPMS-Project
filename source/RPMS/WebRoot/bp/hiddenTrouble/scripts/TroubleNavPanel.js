TroubleNavPanel = function(config){
	var personalTree = new TroubleNavTree({
		title:'我的任务',
		type : 'personalTask',
		url : 'bp/bpTree.html',
		viewPanel : config.viewPanel
	});
	
	var groupTree = new TroubleNavTree({
		title : '群组任务',
		type : 'groupTask',
		viewPanel : config.viewPanel
	});
	
	TroubleNavPanel.superclass.constructor.call(this, {
        region : 'west',
        title : '隐患管理',//$lang('workflow.flowNavPanel.workflowManagement')/*'流程管理'*/,
        split : true,
        width : 225,
        minSize : 175,
        maxSize : 400,
        collapsible : true,
        margins : '0 0 0 0',
        cmargins : '0 0 0 0',
        layout : 'accordion',
        collapseMode : 'mini',
        lines : false,
        layoutConfig : {
            animate : true
        },
        items : [personalTree , groupTree ]
    });
    this.on("beforedestroy",this._onDestroy,this);
};

Ext.extend(TroubleNavPanel, Ext.Panel, {
	_onDestroy : function(){
	},
	/**
	 * 切换 tab 页事件
	 */
    tabchangeFn : function(tabPanel,tab){
    	tab.doLayout();
    },
    
    setParams : function(key,value){
    	
    	if( this.paramsMap == null ){
    		this.paramsMap = {};
    	}
    	
    	this.paramsMap[key] = value;
    },
    
    getParamsValue : function(key){
    	
    	if( this.paramsMap == null ){
    		this.paramsMap = {};
    	}
    	return this.paramsMap[key];
    }
});