ChatMain = function(config) {
	Ext.apply(this, config);
	
	this.onLineTree = new Ext.tree.TreePanel({
		id : 'online-tree',
		title : '在线用户',
		iconCls : 'icon-online',
		loader : new Ext.tree.TreeLoader(),
		rootVisible : false,
		lines : false,
		autoScroll : true,
		tools : [{
			id : 'refresh',
			scope : this,
			on : {
				scope : this,
				click : function() {
					this.refreshOnLine();
				}
			}
		}],
		root : new Ext.tree.AsyncTreeNode({
			id : 'online_id',
			text : 'Online',
			children : [{
				text : '系统',
				iconCls : 'icon-user-manager',
				expanded : true,
				children : this.sysGroup
			}, {
				text : '用户',
				iconCls : 'icon-user-plain',
				expanded : true,
				children : this.userGroup
			}]
		})
	});
	
	this.onLineTree.on('click',this.onTreeClick,this);
		
	ChatMain.superclass.constructor.call(this,  {
		title : '即时通讯',
		width : 180,
		height : 400,
		minWidth : 180,
		minHeight : 300,
		minimizable : true,
		iconCls : 'icon-chat',
		shim : false,
		closeAction : 'hide',
		animCollapse : false,
		constrainHeader : true,
		tbar : ['->', "当前用户：<font color='red'>" + FW.userName + "</font>"],
		layout : 'accordion',
		border : false,
		layoutConfig : {
			animate : false
		},
		items : [this.onLineTree, {
			title : '设置',
			iconCls : 'icon-setting',
			html : '<p>系统设置.</p>',
			autoScroll : true
		}]
	});
	
	this.windows = new Ext.WindowGroup();
	this.on({
        'minimize': {
        	scope : this,
            fn: this.minimizeWin
        }
    });
    
    this.on('show', function() {this.refreshOnLine()}, this);
};

Ext.extend(ChatMain, Ext.Window, {
	onLineTree : null,
	sysGroup : [],
	userGroup : [],
	
	onTreeClick : function(node,e) {
		if (node.isLeaf()) {
			if(node.id != FW.userId) {
	        	this.showChatWin(node);
			} else {
				Ext.MessageBox.show({
					title : '提示',
					msg : '对不起，不能和自己聊天！',
					buttons : Ext.MessageBox.OK,
					fn : function(){},
					icon : Ext.MessageBox.INFO,
					scope : this
				});
			}
        } else {
        	if(node.isExpanded()) {
        		node.collapse();
        	} else {
        		node.expand();
        	}
        }
	},
	
	showChatWin : function(node, message) {
		var win = new ChatWin({
    		id : node.id,
    		manager: this.windows,
    		title : "[" + node.text + '] 聊天窗口'
    	});
    	win.show();
    	if(message) {
    		win.showMsg(node.text, message);
    	}
	},
	
	minimizeWin : function() {
        this.minimized = true;
        this.hide();
    },
    
    refreshOnLine : function() {
    	Ext.Ajax.request({
			url : 'framework/loadOnLineUser.html',
			method : 'post',
			scope : this,
			success : function(response, options) {
				var json = Ext.util.JSON.decode(response.responseText || "{}");
				if(json) {
					FW.onLineUsers = json;
					this.sysGroup = [], this.userGroup = [];
			    	for(var id in FW.onLineUsers) {
			    		if(FW.onLineUsers[id].loginName == 'admin') {
			    			this.sysGroup.push({
			    				id : FW.onLineUsers[id].userId,
			    				text : FW.onLineUsers[id].userName,
								iconCls : 'icon-user',
								leaf : true
			    			});
			    		} else {
			    			this.userGroup.push({
			    				id : FW.onLineUsers[id].userId,
			    				text : FW.onLineUsers[id].userName,
								iconCls : 'icon-user',
								leaf : true
			    			});
			    		}
			    	}
			    	
			    	var tree = this.onLineTree;
			    	tree.body.mask('Loading', 'x-mask-loading');
					tree.setRootNode(new Ext.tree.AsyncTreeNode({
						text : 'Online',
						children : [{
							text : '系统',
							iconCls : 'icon-user-manager',
							expanded : true,
							children : this.sysGroup
						}, {
							text : '用户',
							iconCls : 'icon-user-plain',
							expanded : true,
							children : this.userGroup
						}]
					}));
					tree.root.collapse(true, false);
					setTimeout(function() {
						tree.body.unmask();
						tree.root.expand(true, true);}, 200);
				}
			}
    	});
    }
});