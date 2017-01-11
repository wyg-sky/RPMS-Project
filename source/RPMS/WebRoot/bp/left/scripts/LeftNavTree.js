/**
 * @file  WorkbenchNavTree.js
 * @author sunfbin
 * @date 2011-04-14
 * @description 工作台左侧导航面板的导航树
 */
LeftNavTree = function(config){
	Ext.apply(this,config);

	var treeLoader = new Ext.tree.TreeLoader({dataUrl : this.url});
    LeftNavTree.superclass.constructor.call(this,  {
    	region : 'west',
    	title : config.title,
    	split:true,
        collapsible: true,
        margins:'0 0 0 0',
        cmargins:'0 0 0 0',
        rootVisible:false,
        border:false,
        lines:false,
        autoScroll:true,        
        collapseFirst:false,
        useArrows : true,
        root: new Ext.tree.AsyncTreeNode({
        	draggable : true,
			expanded : true,
			text : '根节点',
			code : 'all'
        }),
        loader : treeLoader
	}); 
    
    this.on('click',this.onClick,this);
    
    var getFirstLeaf = function(node){
		 if(node.isLeaf()){
			 return node;
		 }else{
			 node.expand();
			 return getFirstLeaf(node.firstChild);
		 }
	};
	treeLoader.on('load',function(loader, node, response ){
    	var firstLeaf = getFirstLeaf(node);
    	firstLeaf.select();
    	this.onClick(firstLeaf);
    },this)
};

Ext.extend(LeftNavTree,Ext.tree.TreePanel,{
    onClick : function (node,e){
        if(node.isLeaf()){
            if(!this.viewPanel.nodeId || this.viewPanel.nodeId != node.id){alert("123");
            	//销毁tablePanel
            	if(this.viewPanel.body.first()){
                    var panelId = this.viewPanel.body.first().id+"Id";
                    if(Ext.getCmp(panelId))
            		    Ext.getCmp(panelId).destroy();
            	}
            	
            	this.viewPanel.nodeId = node.sssssssid;
            	this.viewPanel.load({url: node.attributes.url,scripts:true});
            	this.viewPanel.doLayout();
     		}
        }else{
            return;
        }
    }
});