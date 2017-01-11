 /**
 * @description : 空白占位符组件
 * @date : 2012-12-21
 * @author : 王绪乐
 */
MenuLeftTree = function(config){
	Ext.apply(this,config);
	this.viewPanel = FW.mainPanel;
	var treeLoader = new Ext.tree.TreeLoader({dataUrl : this.url});
    MenuLeftTree.superclass.constructor.call(this, {
    	region : 'west',
    	title : config.title,
    	split:true,
        collapsible: true,
        margins:'0 0 0 0',
        cmargins:'0 0 0 0',
        rootVisible:false,
        border:false,
        lines:false,
        autoScroll:false,
        autoHeight:true,
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
            id:'toggle',
            qtip: '收起左侧列表',
            scope : this,
            handler : function(e, t, p, tc) {
                this.menuPanel.collapse();
            }
        }],
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
    	if(node){
		    if(node.isLeaf()){
			    return node;
		    }else{
			    node.expand();
			    return getFirstLeaf(node.firstChild);
		    }
    	} else {
            return null;
    	}
	};
	treeLoader.on('load',function(loader, node, response ){
		if(node) {
			var firstLeaf = getFirstLeaf(node);
    	    if(firstLeaf) {
				if(modules[0].url) {
					FW.sendToModuleByUrl('首页',modules[0].url);
					if(node.firstChild)
						node.firstChild.expand();
				} else {
	    	        firstLeaf.select();
	    	        this.onClick(firstLeaf);
				}
			} else {
			    Ext.Msg.alert('提示','您没有具体模块使用权限，请联系管理员！');
		    }
		} else {
			Ext.Msg.alert('提示','您没有具体模块使用权限，请联系管理员！');
		}
    },this);
};

Ext.extend(MenuLeftTree, Ext.tree.TreePanel,{
    onClick : function (node,e){
        if(node.isLeaf()){
        	this.viewPanel.removeAll(true);
        	this.viewPanel.title = node.text;
        	var url = node.attributes.url;
        	if (url.indexOf("?")>0) {
        		url = node.attributes.url+"&nodeName="+encodeURI(encodeURI(node.text));
        	} else {
        		url = node.attributes.url+"?nodeName="+encodeURI(encodeURI(node.text));
        	}
        	this.viewPanel.nodeId = node.id;
        	this.viewPanel.load({url: url,scripts:true});
        	this.viewPanel.doLayout();
        }else{
        	if(node.isExpanded()){
        		node.collapse();
        	}else {
        		node.expand();
        	}
        }
    }
});

//根据id加载模块。
function clickModuleById(moduleId) {
	var MenuLeftTree = Ext.getCmp('MenuLeftTree');
	var module = MenuLeftTree.getNodeById(moduleId);
	
	if(module) {
		module.select();
    	MenuLeftTree.onClick(module);
	}
}