/**
 * 流程导航树
 * @param {} conf
 */
BpNavTree = function(conf) {
	
	var config = {
        split:true,
        collapsible: true,
        margins:'0 0 0 0',
        cmargins:'0 0 0 0',
        rootVisible:false,
        border:false,
        lines:false,
        autoScroll:true,        
        collapseFirst:false,
        loader: new Ext.tree.TreeLoader({dataUrl:''})
	}
	
    Ext.apply(config,conf);
    
    BpNavTree.superclass.constructor.call(this, config); 
    
    this.on('click',this.onClick,this);
	this.on('beforeload',this.onBeforeload,this);
	this.on('load',this.initLoaded,this);
	this.on('contextMenu',this.showContextMenu,this);
};

Ext.extend(BpNavTree, Ext.tree.TreePanel,{
	initLoaded : function(node){
		if(node!=this.getRootNode())return;
		if(!(node.item&&node.item(0))) return;
		this.onClick(node.item(0));//自动加载第一个节点的流程实例
	},
	reloadDataFn : function(params){
		var scope = this;
		var root = this.getRootNode();
		var treeLoad = this.getLoader();
		if( params!=null )
		treeLoad.baseParams = params;
		treeLoad.load(root, function(){});
	    this.expandAll();  
	},
	
	onClick: function(node, e){
		/*if(node.getDepth() == 1)
			node.url = "bp"+'?nodeId='+node.id;
		else if(node.isLeaf())
		   	node.url = "leaf"+'?nodeId='+node.id;
		alert(node.url);*/
		//Ext.getCmp('bp-view-tabs').loadData(node);
		var centerPanel = this.ownerCt.ownerCt.ownerCt.ownerCt.items.items[1];
		centerPanel.loadData(node);
    },
    
    onBeforeload : function(node){
    		this.loader.dataUrl = node.attributes.url+'?nodeId='+node.id;
    },
    
    showContextMenu : function(node,e){
     	var contextMenu = new Ext.menu.Menu();
     	contextMenu.add({
					text : $lang('bp.refresh'),
					iconCls : 'refresh-icon',
					scope : this,
					handler : this.refreshTree
			});
		e.preventDefault();
		contextMenu.node = node;
		contextMenu.showAt(e.getXY());
    },
    
    refreshTree : function(){
    	this.getRootNode().reload();
    }
    
    
	
});
