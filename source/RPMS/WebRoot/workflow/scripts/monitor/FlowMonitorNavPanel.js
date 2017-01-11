FlowMonitorNavPanel = function() {
    this.flowMonitorTree = new FlowNavTree({
        root: new Ext.tree.AsyncTreeNode({
        			typeId: 'flowMonitorTree',
        			url: 'flow/bpTypeTree.html',
                    draggable: false
               })
    });
    
    var flowMonitorNavPanel = this;
    
    this.items = [{
        border : false,
        autoScroll : true,
        items : this.flowMonitorTree,
        iconCls : 'ff-flow-monitor-icon'
    }];
        
    FlowMonitorNavPanel.superclass.constructor.call(this, {
        region : 'west',
        title : $lang('workflow.flowNavPanel.flowMonitor')/*'流程监控'*/,
        split : true,
        width : 225,
        minSize : 175,
        maxSize : 400,
        collapsible : true,
        margins : '0 0 0 0',
        cmargins : '0 0 0 0',
        layout : 'fit',
        collapseMode : 'mini',
        lines : false,
        layoutConfig : {
            animate : true
        },
        items : this.items
    });
    //this.flowMonitorTree.on("load",this.initLoaded,this);
};

Ext.extend(FlowMonitorNavPanel, Ext.Panel,{
	/*initLoaded : function(node){
		this.flowMonitorTree.getRootNode().expand(true);
		if(node!=this.flowMonitorTree.getRootNode()){
			return;
		}
		if(!(node.item&&node.item(0)&&node.item(0).item(0))) return;
		this.flowMonitorTree.onClick(node.item(0).item(0));
	}*/
});




