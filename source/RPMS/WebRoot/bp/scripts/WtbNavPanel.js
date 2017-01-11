/**
 * This is the navigation of worktable
 * @author sixdayj
 * @since 2010.08.24 
 * @param {} config
 */
WtbNavPanel = function(config) {	
	config = config || {};
	Ext.apply(this,config);
	
	WtbNavPanel.superclass.constructor.call(this);
	
};

Ext.extend(WtbNavPanel, Ext.Panel,{
	layout : 'fit',
	columnWidth : .13,
    border: false,
    initComponent : function(){
		var separationPanel = {
	        border: false,
	        height: 5
	    }
	    
		var navPanel = {
	        layout:'accordion',
	        collapsible : false,
	        autoHeight : true,
	        border : true,
//	        bodyCfg : {
//				cls : 'x-panel-body-nav'
//			},
	        layoutConfig:{
	            collapseFirst : false,
	            hideCollapseTool: true,
	            animate:false
	        },
	        items : this._initProccessCard()
	    };
    
	    var shortCutsPanel = {
	        height: 120,
	        title: '快捷操作',
	        bodyStyle:'padding:5px 5px 5px 5px ', 
	        html : ['<table cellspacing=2 cellpadding=2 width="100%">',
					  '<tr height=24>',
					     '<td colspan=6 style="color: #336666;font-size: 9pt; font-weight: bold; border-bottom: 1px solid #0000ff" align= left>发起请求<td>',
					  '</tr>',
					   '<tr height=24>',
					     '<td style="font-size: 9pt;  "><a class="nounderlinenocolorchange" href="#">服务请求</a><td>',
					     '<td style="font-size: 9pt;  "><a class="nounderlinenocolorchange" href="#">事故请求</a><td>',
	                     '<td style="font-size: 9pt;  "><a class="nounderlinenocolorchange" href="#">问题请求</a><td>',
					   '</tr>',
	                   '<tr height=24>',
	                     '<td style="font-size: 9pt;  "><a class="nounderlinenocolorchange" href="#">变更请求</a><td>',
	                     '<td style="font-size: 9pt;  "><a class="nounderlinenocolorchange" href="#">发布请求</a><td>',
	                   '</tr>',
					  '</table>'].join("")
	    }
    	this.items = [navPanel,separationPanel,shortCutsPanel];
    	WtbNavPanel.superclass.initComponent.call(this);
    	
    },
    _initProccessCard : function(){
    	var nav = [];
    	var isfirst = true;
		var tools = [{
				id : 'gear',
				handler : this._setting,
				scope : this
			},{
				id : 'help',
				handler : this._setting,
				scope : this
			}
		]
		for(var i=0;i<this.bps.length;i++){
			var config = Ext.apply({
				bp : this.bps[i],
				border : false,
				autoScroll : true,
				autoHeight : true,
				collapsed : false,
				bodyStyle:'padding:2px 0px 2px 0px ',
				defaults : {
					border : false//,
//					bodyStyle:'padding:2px 5px 2px 3px '
				},
				tools : tools
			},this.bps[i]);
			var filterTree = new WtbNavTree(config);
			filterTree.on("click",this._onTreeClick,this);
			if(isfirst){
				filterTree.on("load",this.initLoaded,this);
				isfirst = false;
			}
			nav.push(filterTree);
			filterTree = null;
		}
		return nav;
	},
	initLoaded : function(node){
		this._onTreeClick(node);//自动加载第一个节点的流程实例
	},
	_onTreeClick : function(node,e){
		var centerPanel = this.ownerCt.items.items[2];
		centerPanel.loadData(node);
	}
	
    
});

/**
 * WtbNavTree
 * @author sixdayj
 * @since 2010.0824
 * @param {} config
 */
WtbNavTree = function(config) {
	config = config || {};
	Ext.apply(this,config);
    
    WtbNavTree.superclass.constructor.call(this); 
    
//    this.on('beforeload',this.onBeforeload,this);
//    this.on('load',this.initLoaded,this);
    this.expandPath(this.getRootNode().getPath());
};

Ext.extend(WtbNavTree, Ext.tree.TreePanel,{
    collapsible : true,
    margins : '0 0 0 0',
    cmargins : '0 0 0 0',
    rootVisible : true,
    border : false,
    lines : true,
    autoScroll : true,        
    collapseFirst : false,
    animate : false,
	initComponent : function(){
		this.root =  new Ext.tree.AsyncTreeNode({
			draggable: false,
			expandable : true,
			text : "全部",
			iconCls : 'add-related-ci-icon'
		});
		this.loader = new Ext.tree.TreeLoader({
			dataUrl:'admin/showMyFilter.html',
			method:"GET",
			baseParams:{
				moduleId : this.code,
				setUrlAction : "url:bp/myListByBp.html,children.*:bp/myListByBp.html"
			}
		});
		
		WtbNavTree.superclass.initComponent.call(this);
		
		this.on('contextMenu',this.showContextMenu,this);
	},
	getBp : function(){
		return this.bp;
	},
	reloadDataFn : function(params){
		var scope = this;
		var root = this.getRootNode();
		var treeLoad = this.getLoader();
		if( params!=null ){
			treeLoad.baseParams = params;
		}
		treeLoad.load(root, function(){});
	    this.expandAll();  
	},
    onBeforeload : function(node){
		this.loader.dataUrl = "#";
    },
//    onRender : function(ct,inx){
//    	//this.expandAll();
//	},
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

