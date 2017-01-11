/**
 * 系统风格
 * @param {} config
 */
SystemThemeWindow = function(config){
	Ext.apply(this,config);
	var treeLoader = new Ext.tree.TreeLoader({dataUrl : 'system/listThemeTree.html'});
	this.clickNodeId = 'noClick';

	this.styleTree = new Ext.tree.TreePanel({
    	title : "系统风格",
    	iconCls: 'icon-menu-home',
        region : 'west',
        split : true,
        margins:'0 0 0 0',
        height : 450,
        width : 130,
        minSize : 130,
        maxSize : 130,
        rootVisible:false,
        autoScroll : true,
        border:false,
        lines:false,
        collapseFirst:false,
        useArrows : true,
        tools:[{
            id:'refresh',
            qtip: '刷新功能列表',
            scope : this,
            handler : function(e, t, p, tc) {
                this.styleTree.root.reload();
            }
        },{
            id:'pin',
            qtip: '展开所有模块',
            scope : this,
            handler : function(e, t, p, tc) {
            	t.hide();
            	p.getTool('unpin').show();
            	this.styleTree.expandAll();
            }
        },{
            id:'unpin',
            qtip: '收起所有模块',
            scope : this,
            hidden : true,
            handler : function(e, t, p, tc) {
            	t.hide();
            	p.getTool('pin').show();
            	this.styleTree.collapseAll();
            }
        }],
        root: new Ext.tree.AsyncTreeNode({
        	draggable : true,
			expanded : true,
			text : '系统风格',
			code : 'all'
        }),
        loader : treeLoader
	}); 
    
    this.styleTree.on('click', this.onClick, this);
    var getFirstLeaf = function(node){
    	if(node){
		    if(node.isLeaf()){
			    return node;
		    } else {
			    node.expand();
			    return getFirstLeaf(node.firstChild);
		    }
    	} else {
            return null;
    	}
	};
    treeLoader.on('load',function(loader, node, response ){
		if(node) {
			this.styleTree.expandAll();
    	    var firstLeaf = getFirstLeaf(node);
    	    if(firstLeaf) {
    	        firstLeaf.select();
    	        this.onClick(firstLeaf);
    	    } else {
			    Ext.Msg.alert('提示','您没有具体模块使用权限，请联系管理员！');
		    }
		} else {
			Ext.Msg.alert('提示','您没有具体模块使用权限，请联系管理员！');
		}
    },this)
    
    this.rightPanel = new Ext.Panel({
    	layout : 'fit',
        region : 'center'
    })
    
	SystemThemeWindow.superclass.constructor.call(this, {
		title : '系统风格定义',
        layout : 'border',
		iconCls : 'icon-win-systemstyle',
        width : 800,
        height : 373,
        border : false,
        closeAction : 'close',
        resizable : false,
        buttonAlign : 'center',
        modal : true,
        plain : true,
        items : [this.styleTree, this.rightPanel],
        tbar : ['->', {
    		text : '保存',
    		width : 55,
    		scope : this,
    		iconCls : 'save-icon',
    		handler : this.save
    	}, '-', {
    		text : '关闭',
    		width : 55,
    		scope : this,
    		iconCls : 'close-icon',
    		handler : this.close
    	}]
	});
};

Ext.extend(SystemThemeWindow, Ext.Window,{
	onClick : function(node, e) {
		if (node.isLeaf()) {
			this.rightPanel.body.update("<img src='" + node.attributes.imageUrl + "' width='100%'/>");
			this.clickNodeId = node.attributes.id;
			this.code = node.attributes.code;
        } else {
        	if (node.isExpanded()) {
        		node.collapse();
        	} else {
        		node.expand();
        	}
        	this.clickNodeId = 'noClick';
		}
	},
	
	save : function() {
		if(this.clickNodeId == 'noClick'){
			Ext.Msg.alert('提示','您尚未选择系统风格！');
			return;
		}
		Ext.Ajax.request({
			url : 'system/changeThemeSetting.html',
			method : 'post',
			params : {
				themeId : this.clickNodeId,
				userId : this.userId
			},
			scope : this,
			success : function(response,options) {
				Ext.MessageBox.show({
					title : '成功',
					msg : '系统风格修改成功！',
					buttons : Ext.MessageBox.OK,
					fn : function(){
						this.close();
						if(this.code.substr(0, 1) == '1') {
							isRefresh =  true;
							window.location.href = FW.rootUrl + "desktop.jsp";
						} else {
							isRefresh =  true;
							window.location.href = FW.rootUrl + "main.jsp";
						}
					},
					icon : Ext.MessageBox.INFO,
					scope : this
				});
			},
			failure : function() {
				Ext.MessageBox.show({
					title : '失败',
					msg : '修改失败 !',
					buttons : Ext.MessageBox.OK,
					fn : function(){},
					icon : Ext.MessageBox.ERROR,
					scope : this
				});
			}
		});
	}
});