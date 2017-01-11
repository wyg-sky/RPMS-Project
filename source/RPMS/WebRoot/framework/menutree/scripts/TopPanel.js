TopPanel = function(config){
	Ext.apply(this,config);
	
	var topTbar = [{
		xtype : 'panel',
		frame : true,
		height : 76,
		html : '<div style="display: table-cell; text-align:center; vertical-align:middle;*display: block; height:60px;"><a href="http://www.snjt.com/" target="_blank"><img style="border: 0; vertical-align:middle;margin:auto 0;width:252px;" src="images/head/logo_title.png"/></a></div>'
	}, '', {
		xtype : 'buttongroup',
		title : '首页',
		items : [{
			text : '我的桌面',
			scale : 'large',
			icon : 'images/head/desktop.png',
			iconAlign : 'top',
			scope : this,
			handler : function() {
				if(modules[0].url) {
					FW.menuPanel.expand();
					FW.sendToModuleByUrl('首页',modules[0].url);
				}
			}
		}]
	}];
	
	Ext.Ajax.request({
		url : 'system/listShortCutsForUser.html',
		method : 'post',
		async : false,
		params : {
			userId : FW.userId,
			systemId : FW.moduleId
		},
		scope : this,
		success : function(response,options) {
			var json = Ext.util.JSON.decode(response.responseText || "{}");
			if(json.success) {
				if(json.custom && json.custom.length > 0) {
					var customTbar = {
						xtype : 'buttongroup',
						title : '我的快捷方式',
						defaults : {
							scale : 'large',
							iconAlign : 'top'
						},
						items : []
					};
					var moduleTbar = {
						xtype : 'buttongroup',
						defaults : {
							scale : 'large',
							iconAlign : 'top'
						},
						items : []
					};
					for(var i = 0; i < json.custom.length; i++) {
						if(json.custom[i].type == '0001') {
							var item = {
								text : json.custom[i].text,
								icon : json.custom[i].icon != 'null'?json.custom[i].icon:this.defaultIcon,
								clickUrl : json.custom[i].url,
								handler : function() {
									FW.menuPanel.collapse();
									FW.sendToModuleByUrl(this.text, this.clickUrl);
								}
							};
							if(moduleTbar.title && moduleTbar.title == json.custom[i].pname) {
								moduleTbar.items.push(item);
							} else {
								if(moduleTbar.items.length > 0) {
									Ext.apply(moduleTbar,{columns : moduleTbar.items.length});
									topTbar.push('');
									topTbar.push(moduleTbar);
								}
								moduleTbar = {
									xtype : 'buttongroup',
									title : json.custom[i].pname,
									defaults : {
										scale : 'large',
										iconAlign : 'top'
									},
									items : []
								};
								moduleTbar.items.push(item);
							}
						} else {
							var item = {
								text : json.custom[i].text,
								icon : json.custom[i].icon != 'null'?json.custom[i].icon:this.defaultIcon,
								clickUrl : json.custom[i].url,
								handler : function() {
									window.open(this.clickUrl);
								}
							};
							customTbar.items.push(item);
						}
					}
					if(moduleTbar.items.length > 0) {
						Ext.apply(moduleTbar,{columns : moduleTbar.items.length});
						topTbar.push('');
						topTbar.push(moduleTbar);
					}
					if(customTbar.items.length > 0) {
						Ext.apply(customTbar,{columns : customTbar.items.length});
						topTbar.push('');
						topTbar.push(customTbar);
					}
				}
				
				if(json.common && json.common.length > 0) {
					var commonTbar = {
						xtype : 'buttongroup',
						id : 'commonShortCut',
						hidden: true,
						title : '常用操作',
						defaults : {
							scale : 'large',
							iconAlign : 'top'
						},
						items : []
					};
					for(var i = 0; i < json.common.length; i++) {
						var item = {
							text : json.common[i].text,
							icon : json.common[i].icon != 'null'?json.common[i].icon:this.defaultIcon,
							clickUrl : json.common[i].url,
							handler : function() {
								FW.menuPanel.collapse();
								FW.sendToModuleByUrl(this.text, this.clickUrl);
							}
						};
						commonTbar.items.push(item);
					}
					Ext.apply(commonTbar,{columns : commonTbar.items.length});
					topTbar.push('');
					topTbar.push(commonTbar);
				}
			}
		}
	});
	
	TopPanel.superclass.constructor.call(this,{
		id : 'topPanel_Id',
		region : 'north',
		layout : 'form',
		collapsible : false,
		autoScroll : true,
		border : false,
		bodyStyle : 'border-width:0 0 0 0;',
		title : '<span style="font-size:13px;font-family:Microsoft YaHei;"><img style="vertical-align:middle;" src="images/head/system_icon.gif">&nbsp;' + FW.organizationName + '-' + FW.moduleTitle + '</span>',
		tbar : new Ext.Toolbar({layout: 'toptoolbar', enableOverflow : false})
	});
	
	this.on('afterlayout', function() {
		this.collapseEl = 'tbar';
		this.slideAnchor = 'l';
	}, this);
	
	this.on('afterrender', function() {
		this.header.dom.style.cursor = 'pointer';
		this.header.dom.title='单击折叠/展开快捷方式';
        this.mon(this.header, 'click', this.triggerClick, this);
        this.getTopToolbar().el.dom.style.borderWidth = '0';
        this.wheelEl = this.getTopToolbar().el.child('.x-toolbar-right div');
        this.wheelEl.setWidth(this.getTopToolbar().el.getWidth() - 278);
        this.getTopToolbar().mon(this.wheelEl, 'mousewheel', this.onWheel, this);
        var width = 0;
        Ext.each(this.getTopToolbar().items.items, function(item){
        	if(item.items) {
        		Ext.each(item.items.items, function(i){
        			if(i.el) {
		        		this.scrollPosition.push(i.el.getX());
        			}
	        	}, this);
        	}
    		width = width + item.getWidth();
        }, this);
        if(FW.winWidth > this.getTopToolbar().el.getWidth()) {
        	width = FW.winWidth - width;
        	var n = width/58;
        	if(n >= 2) {
        		var commonShortCut = Ext.getCmp('commonShortCut');
        		if(commonShortCut) {
        			commonShortCut.show();
        		}
        	}
        }
        this.getTopToolbar().doLayout();
    }, this);
};

Ext.extend(TopPanel, Ext.Panel, {
	scrollPosition: [],
	position: 0,
	defaultIcon: 'styles/default/images/guide/case4/featured.png',
	tbarCollapsed: false,
	
	triggerClick : function() {
//    	if(this.getTopToolbar().hidden) {
//    		this.expand();
//    	} else {
//    		this.collapse();
//    	}
    },
    
    expand : function() {
    	this.tbarCollapsed = false;
    	FW.topHeight = FW.topHeight + 82;
		this.getTopToolbar().show();
		this.getTopToolbar().el.slideIn('r', Ext.apply(this.createEffect(true, this.afterExpand, this),{duration : 0.25}));
        this.header.setStyle('border-width', '0 0 1');
        this.doLayout();
    	this.ownerCt.doLayout();
    },
    
    collapse : function() {
    	this.tbarCollapsed = true;
    	FW.topHeight = FW.topHeight - 82;
        this.header.setStyle('border-width', '0');
    	this.getTopToolbar().el.slideOut('l', Ext.apply(this.createEffect(true, this.afterExpand, this),{duration : 0.25}));
    	this.getTopToolbar().hide.defer(250, this.getTopToolbar());
        this.doLayout();
    	this.ownerCt.doLayout();
    },
    
    afterExpand : function(anim){
    	this.ownerCt.layout.north.originalZIndex = this.el.getStyle('z-index');
        this.collapsed = false;
        if(anim !== false){
            this[this.collapseEl].show(this.hideMode);
        }
        this.afterEffect(anim);
        if (this.deferLayout) {
            delete this.deferLayout;
            this.doLayout(true);
        }
        this.fireEvent('expand', this);
    },
        
	onWheel : function(e){
        e.stopEvent();
        var pos = this.getScrollPos(),
            sw = this.getScrollWidth()-this.getScrollArea();
        if(e.getWheelDelta() > 0) {
        	this.position =  this.position - 2;
        } else {
        	this.position =  this.position + 2;
        }
        if(this.position < 0) {
        	this.position = 0;
        } else {
        	if(this.position >= this.scrollPosition.length) {
        		this.position = this.scrollPosition.length - 1;
        	}
        }
		newpos = this.scrollPosition[this.position] - this.scrollPosition[0];
        if(sw < newpos) {
        	s = sw;
        	this.position =  this.position - 2;
        } else {
        	s = newpos;
        }
        if(s != pos){
            this.scrollTo(s, true);
        }
    },
    
    scrollTo : function(pos, animate){
    	this.wheelEl.scrollTo('left', pos, animate);
    },

    getScrollWidth : function(){
        return parseInt(this.wheelEl.dom.scrollWidth, 10) || 2000;
    },
    
    getScrollPos : function(){
        return parseInt(this.wheelEl.dom.scrollLeft, 10) || 0;
    },
    
    getScrollArea : function(){
        return parseInt(this.wheelEl.dom.clientWidth, 10) || 0;
    }
});

Ext.layout.TopToolbarLayout = Ext.extend(Ext.layout.ToolbarLayout, {
	type: 'toptoolbar',
	tableHTML: [
        '<table cellspacing="0" class="x-toolbar-ct">',
            '<tbody>',
                '<tr>',
                    '<td class="x-toolbar-left1" align="left">',
                        '<table cellspacing="0">',
                            '<tbody>',
                                '<tr class="x-toolbar-left-row"></tr>',
                            '</tbody>',
                        '</table>',
                    '</td>',
                    '<td class="x-toolbar-right" align="left"><div title="鼠标滚轮翻页" alt="鼠标滚轮翻页" style="overflow:hidden;width:800px;">',
                        '<table cellspacing="0" class="x-toolbar-right-ct">',
                            '<tbody>',
                                '<tr>',
                                    '<td>',
                                        '<table cellspacing="0">',
                                            '<tbody>',
                                                '<tr class="x-toolbar-right-row"></tr>',
                                            '</tbody>',
                                        '</table>',
                                    '</td>',
                                    '<td>',
                                        '<table cellspacing="0">',
                                            '<tbody>',
                                                '<tr class="x-toolbar-extras-row"></tr>',
                                            '</tbody>',
                                        '</table>',
                                    '</td>',
                                '</tr>',
                            '</tbody>',
                        '</table>',
                    '</div></td>',
                '</tr>',
            '</tbody>',
        '</table>'
    ].join(""),
    
	onLayout : function(ct, target) {
        
        if (!this.leftTr) {
            var align = ct.buttonAlign == 'center' ? 'center' : 'left';

            target.addClass('x-toolbar-layout-ct');
            target.insertHtml('beforeEnd', String.format(this.tableHTML, align));

            this.leftTr   = target.child('tr.x-toolbar-left-row', true);
            this.rightTr  = target.child('tr.x-toolbar-right-row', true);
            this.extrasTr = target.child('tr.x-toolbar-extras-row', true);

            if (this.hiddenItem == undefined) {
                
                this.hiddenItems = [];
            }
        }

        var side     = ct.buttonAlign == 'right' ? this.rightTr : this.leftTr,
            items    = ct.items.items,
            position = 0;

        
        for (var i = 0, len = items.length, c; i < len; i++, position++) {
            c = items[i];

			if (!c.rendered) {
                c.render(this.insertCell(c, side, position));
                this.configureItem(c);
            } else {
                if (!c.xtbHidden && !this.isValidParent(c, side.childNodes[position])) {
                    var td = this.insertCell(c, side, position);
                    td.appendChild(c.getPositionEl().dom);
                    c.container = Ext.get(td);
                }
            }
            
            if (i == 1) {
                side   = this.rightTr;
                position = -1;
            }
        }

        
        this.cleanup(this.leftTr);
        this.cleanup(this.rightTr);
        this.cleanup(this.extrasTr);
        this.fitToSize(target);
    }
});
Ext.Container.LAYOUTS.toptoolbar = Ext.layout.TopToolbarLayout;