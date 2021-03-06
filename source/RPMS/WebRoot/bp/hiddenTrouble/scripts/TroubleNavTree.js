/**
 * @file  WorkbenchNavTree.js
 * @author sunfbin
 * @date 2011-04-14
 * @description 工作台左侧导航面板的导航树
 */
TroubleNavTree = function(config){
	this.viewPanel = config.viewPanel;
	this.url = config.url;

    TroubleNavTree.superclass.constructor.call(this,  {
    	title : config.title,
        split:true,
        collapsible: true,
        margins:'0 0 0 0',
        cmargins:'0 0 0 0',
        rootVisible:true,
        border:false,
        lines:false,
        autoScroll:true,        
        collapseFirst:false,
        root: new Ext.tree.AsyncTreeNode({
        	id : '8a819ebc2ff1ac61012ff245d8c20002',
        	draggable : false,
			expanded : true,
			text : '所有隐患',
			code : 'all',
			createUrl : 'run/requestForm.html?formCode=hiddenTrouble&viewCode=ht_create&viewVersion=1.0&stateCode=ht_draft'
			,children : this.loadChildren(config)
        }),
        loader: new Ext.tree.TreeLoader({dataUrl : this.url})
	}); 
    
    this.on('click',this.onClick,this);
	this.on('load',this.initLoaded,this);
	this.on('contextMenu',this.showContextMenu,this);

};

Ext.extend(TroubleNavTree, Ext.tree.TreePanel, {
	initLoaded : function(node){
		this.onClick(node);//自动加载第一个节点的流程实例
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
		this.viewPanel.loadData(node);
    },
    
    showContextMenu : function(node,e){
     	var contextMenu = new Ext.menu.Menu();
     	if(node.isLeaf()){
     		contextMenu.add({
     			text : '新建'+node.attributes.text,
     			iconCls : 'create-icon',
     			scope : this,
     			handler : function(){
     				this.viewPanel.createBpi(node);
     			}
     		});
     	}else{
	     	contextMenu.add({
				text : $lang('bp.refresh'),
				iconCls : 'refresh-icon',
				scope : this,
				handler : this.refreshTree
			});
     	}
		e.preventDefault();
		contextMenu.node = node;
		contextMenu.showAt(e.getXY());
    },
    
    refreshTree : function(){
    	this.getRootNode().reload();
    },
	
	loadChildren : function(config){
		if(config.url){
//			return ;
		}
		switch (config.type){
			case 'personalTask' :
				var children = [{
					text : '催办',
					code : 'urgeTodo',
					leaf : true
//					,children : [{
//						text : '催办1',
//						code : 'urgeTodo',
//						leaf : true
//					},{
//						text : '催办2',
//						code : 'urgeTodo',
//						leaf : true
//					},{
//						text : '催办3',
//						code : 'urgeTodo',
//						leaf : true
//					}]
				}, {
					text : '未办',
					code : 'todo',
					leaf : true
				}, {
					text : '督办',
					code : 'watchTodo',
					leaf : true
				}, {
					text : '已办',
					code : 'havedone',
					leaf : true
				}];
				return children;
				break;
			case 'groupTask' :
				var children = [{
					text : '未办',
					code : 'todo',
					leaf : true
				}, {
					text : '已办',
					code : 'havedone',
					leaf : true
				}];
				return children;
				break;
			default :
				break;
		}
	}
});