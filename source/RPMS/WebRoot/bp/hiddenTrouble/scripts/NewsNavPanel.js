NewsNavPanel = function(config){
	var personalTree = new NewsNavTree({
		title:'我的任务',
		type : 'personalTask',
		url : 'bp/bpTree.html',
		viewPanel : config.viewPanel
	});
	
	var groupTree = new NewsNavTree({
		title : '群组任务',
		type : 'groupTask',
		viewPanel : config.viewPanel
	});
	
	NewsNavPanel.superclass.constructor.call(this, {
        region : 'west',
//        title : '我的任务',//$lang('workflow.flowNavPanel.workflowManagement')/*'流程管理'*/,
        split : true,
        width : 225,
        minSize : 175,
        maxSize : 400,
        collapsible : false,
        layout : 'accordion',
        collapseMode : 'mini',
        lines : false,
        layoutConfig : {
            animate : true
        },
        items : [personalTree,groupTree]
    });
    this.on("beforedestroy",this._onDestroy,this);
};

Ext.extend(NewsNavPanel, Ext.Panel);