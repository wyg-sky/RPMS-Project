/**
 * @file  MenuTree.js
 * @author 王绪乐
 * @date 2012-07-14
 * @description 左侧导航面板的导航树
 */
MenuTree = function(config){
	Ext.apply(this,config);
	
	var treeLoader = new Ext.tree.TreeLoader({dataUrl : this.url});

	MenuTree.superclass.constructor.call(this,  {
    	id : 'menu_tree_id',
    	title : "功能列表",
    	iconCls: 'icon-menu-home',
    	layout : 'fit',
        region : 'west',
        split : true,
        width : 160,
        height : 540,
        //collapsible : true,
        autoScroll : true,
        collapseMode : 'mini',
        margins:'0 0 0 0',
        rootVisible:true,
        border:true,
        lines:false,
        collapseFirst:false,
        useArrows : true,
        tools:[{
            id:'refresh',
            qtip: '刷新功能列表',
            scope : this,
            handler : function(e, t, p, tc) {
                this.root.reload();
            }
        },{
            id:'pin',
            qtip: '展开所有模块',
            scope : this,
            handler : function(e, t, p, tc) {
            	t.hide();
            	p.getTool('unpin').show();
            	this.expandAll();
            }
        },{
            id:'unpin',
            qtip: '收起所有模块',
            scope : this,
            hidden : true,
            handler : function(e, t, p, tc) {
            	t.hide();
            	p.getTool('pin').show();
            	this.collapseAll();
            }
        },{
            id:'gear',
            qtip: '锁定-隐藏',
            scope : this,
            handler : function(e, t, p, tc) {
            	if(leftOrRight == 0) {
            		leftOrRight = 1;
            	} else {
            		leftOrRight = 0;
            		hideMenu();
            	}
            }
        }],
        root: new Ext.tree.AsyncTreeNode({
        	draggable : true,
			expanded : true,
			icon : 'images/portal/icon/model-home.png',
			text : FW.moduleTitle,
			code : 'all'
        }),
        loader : treeLoader
	}); 
    
    this.on('click',this.onClick,this);
    
    treeLoader.on('load', function(tree, node, response) {
    	FW.menuNodeJson = response.responseData || Ext.decode(response.responseText);
    }, this);
};

Ext.extend(MenuTree, Ext.tree.TreePanel, {
    onClick : function (node,e){
        if (node.isLeaf()) {
        	var module = MyDesktop.getModule('mainWindow');
            if (module) {
            	module.moduleId = node.id;
            	module.moduleName = node.text;
            	module.moduleUrl = FW.rootUrl + node.attributes.url;
            	module.moduleImgUrl = node.attributes.icon;
            	module.winTarget = 'menu-tree';
                module.createWindow();
            }
        } else {
        	if(node.isExpanded()) {
        		node.collapse();
        	} else {
        		node.expand();
        	}
        }
	}
});
