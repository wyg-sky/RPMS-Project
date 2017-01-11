FlowNavTree = function(config) {
    FlowNavTree.superclass.constructor.call(this, {
        //region:'center',
        split:true,
        collapsible: true,
        margins:'0 0 0 0',
        cmargins:'0 0 0 0',
        rootVisible:false,
        border:false,
        lines:false,
        autoScroll:true,        
        collapseFirst:false,
        root: config.root,
        loader: new Ext.tree.TreeLoader({dataUrl:''})
    }); 
    
    this.on('click',this.onClick,this)  
	this.on('beforeload',this.onBeforeload,this)  
    
};

Ext.extend(FlowNavTree, Ext.tree.TreePanel,{
	
	onClick: function(node, e){
		if(node.attributes.classType=='com.dhcc.workflow.engine.model.BusinessProcess'){
			var centerPanel = this.ownerCt.ownerCt.ownerCt.items.items[1];
			centerPanel.loadData(node);
		}else if(node.attributes.classType == null){
			var centerPanel = this.ownerCt.ownerCt.ownerCt.items.items[1];
			centerPanel.loadData(node);
		}
    },
    onBeforeload : function(node){
    	if(node.attributes.url)
    		this.loader.dataUrl = node.attributes.url+'?typeId='+node.attributes.typeId;
    	else if(node.attributes.dataUrl){
    		this.loader.dataUrl = node.attributes.dataUrl+'?typeId='+node.attributes.typeId;
    	}
    	
    }
	
});


