ChatWin = function(config) {
	Ext.apply(this, config);
	
	this.htmlEditor = new Ext.lion.LionHtmlEditor({
		anchor : '98%',
		iframePad : 0,
		hideLabel : true
	});
	
	this.chatHistory = new Ext.Panel({
		region : 'center',
		html : '',
		autoScroll : true
	});
	
	ChatWin.superclass.constructor.call(this, {
		width: 500,
        height: 400,
        border: false,
        resizable : false,
        hidden: true,
        layout: 'border',
        closeAction: 'close',
        collapsible: false,
        constrain: true,
        iconCls: 'icon-chat-user',  
		items : [{
			region : 'east',
			split : true,
			border : true,
			width : 130,
			minSize : 100,
			maxSize : 200,
    		collapseMode : 'mini',
			constrain : true,
			layout : 'form',
			layoutConfig : {
				animate : true
			},
			items : [{
				xtype : 'panel',
				title : '对方信息',
				bodyStyle : 'border-width:0 0 1px 0;',
				height : 218,
				autoScroll : true,
				iconCls : 'icon-user',
				html : "<p>姓名：" + FW.onLineUsers[this.id].userName + "<br/>用户名：" + FW.onLineUsers[this.id].loginName + "<br/>IP：" + FW.onLineUsers[this.id].loginIp + "</p>"
			}, {
				xtype : 'panel',
				title : '个人信息',
				border : false,
				iconCls : 'icon-user',
				html : "<p>姓名：" + FW.userName + "<br/>用户名：" + FW.loginName + "<br/>IP：" + FW.loginIp + "</p>"
			}]
		}, {
			region : 'center',
			layout : 'border',
			border : true,
			items : [this.chatHistory, {
				region : 'south',
				layout : 'fit',
				height : 150,
				border : false,
				items : this.htmlEditor,
				bbar : ['->', {
					text : '清除',
					tooltip : '清除内容',
					iconCls : 'ff-clear-icon',
					scope : this,
					handler : function() {
						this.htmlEditor.reset();
					}
				}, '-', {
					text : '发送',
					tooltip : 'Ctrl+Enter',
					iconCls : 'new-send-icon',
					scope : this,
					handler : function() {
						this.sendMsg();
					}
				}]
			}]
		}]  
    });
    
    this.on('afterrender', function() {
    	this.htmlEditor.focus(true, 800);
    }, this)
};

Ext.extend(ChatWin, Ext.Window, {
	
	sendMsg : function() {
		PL.publish('system_chat', 'userId=' + globalValue.userId + '&userName=' + encodeURI(encodeURI(globalValue.userName)) + "&message=" +  encodeURI(encodeURI(this.htmlEditor.getValue())));
		this.showMsg(globalValue.userName, this.htmlEditor.getValue());
		this.htmlEditor.reset();
	},
	
	showMsg : function(userName, message) {
		var html = this.chatHistory.html + "<font size='2' color='blue'>&nbsp;"+ userName + "&nbsp;&nbsp;&nbsp;&nbsp;" +  new Date().format('Y-m-d H:i:s') + "</font><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + message + "<br/>" + (this.chatHistory.html? "" : "<br/>");
		this.chatHistory.body.update(html);
		this.chatHistory.html = html;
		var dom = this.chatHistory.body.dom;
		dom.scrollTop = dom.scrollHeight - dom.offsetHeight;
	}
});