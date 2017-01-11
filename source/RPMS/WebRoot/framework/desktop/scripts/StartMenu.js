Ext.namespace("Ext.ux");
Ext.ux.StartMenu = Ext.extend(Ext.menu.Menu, {
    initComponent: function(config) {
    	Ext.ux.StartMenu.superclass.initComponent.call(this, config);

        var tools = this.toolItems;
        this.toolItems = new Ext.util.MixedCollection();
        if(tools){
            this.addTool.apply(this, tools);
        }
        
        this.on('afterrender', this.showMenu, this);
    },

    // private
    onRender : function(ct, position){
        Ext.ux.StartMenu.superclass.onRender.call(this, ct, position);
        var el = this.el.addClass('ux-start-menu');

        var header = el.createChild({
        	tag: "div",
        	cls: "x-window-header x-unselectable x-panel-icon "+this.iconCls
        });

		this.header = header;

		var headerText = header.createChild({
			tag: "span",
			cls: "x-window-header-text"
		});
		var tl = header.wrap({
			cls: "ux-start-menu-tl"
		});
		var tr = header.wrap({
			cls: "ux-start-menu-tr"
		});
		var tc = header.wrap({
			cls: "ux-start-menu-tc"
		});

		this.menuBWrap = el.createChild({
			tag: "div",
			cls: "x-window-body x-border-layout-ct ux-start-menu-body"
		});
		
		var ml = this.menuBWrap.wrap({
			cls: "ux-start-menu-ml"
		});
		
		var mc = this.menuBWrap.wrap({
			cls: "x-window-mc ux-start-menu-bwrap"
		});

		this.menuPanel = this.menuBWrap.createChild({
			tag: "div",
			cls: "x-panel x-border-panel ux-start-menu-apps-panel"
		});
		
		this.toolsPanel = this.menuBWrap.createChild({
			tag: "div",
			cls: "x-panel x-border-panel ux-start-menu-tools-panel"
		});
		
//		this.picPanel = el.createChild({
//			tag: "div",
//			cls: "x-panel x-border-panel"
//		});
		
//		var img = document.createElement("img");
//        img.src = FW.rootUrl + "images/systemicon.png";
////        img.width = "55px";
////        img.height = "70px";
//        this.picPanel.dom.appendChild(img);

		var bwrap = ml.wrap({cls: "x-window-bwrap"});
		var bc = bwrap.createChild({
			tag: "div",
			cls: "ux-start-menu-bc"
		});
		
		var bl = bc.wrap({
			cls: "ux-start-menu-bl x-panel-nofooter"
		});
		
		var br = bc.wrap({
			cls: "ux-start-menu-br"
		});

        this.ul.appendTo(this.menuPanel);

        var toolsUl = this.toolsPanel.createChild({
        	tag: "ul",
        	cls: "x-menu-list"
        });

        this.mon(toolsUl, 'click', this.onClick, this);
        this.mon(toolsUl, 'mouseover', this.onMouseOver, this);
        this.mon(toolsUl, 'mouseout', this.onMouseOut, this);

        this.items.each(function(item){
            item.parentMenu = this;
        }, this);

        this.toolItems.each(
        	function(item){
	            var li = document.createElement("li");
	            li.className = "x-menu-list-item";
	            toolsUl.dom.appendChild(li);
	            item.render(li);
                item.parentMenu = this;
        }, this);

        this.toolsUl = toolsUl;

//        this.el.setStyle('padding', '50px 0 0 0 ');
        this.menuBWrap.setStyle('position', 'relative');
        this.menuBWrap.setHeight(this.height - 28);
        this.menuBWrap.setWidth(253);

        this.menuPanel.setStyle({
        	padding: '2px',
        	position: 'absolute',
        	overflow: 'auto'
        });

        this.toolsPanel.setStyle({
        	padding: '110px 4px 2px 2px',
        	position: 'absolute',
        	overflow: 'auto'
        });
        
//        this.picPanel.setStyle({
//        	margin: '-50px 4px 2px 2px',
//        	position: 'absolute',
//        	overflow: 'auto',
//        	zIndex: '9800000',
//        	float: 'right'
//        });

        this.setTitle(this.title);
    },

    // private
    findTargetItem : function(e){
        var t = e.getTarget(".x-menu-list-item", this.ul,  true);
        if(t && t.menuItemId){
        	if(this.items.get(t.menuItemId)){
            	return this.items.get(t.menuItemId);
            }else{
            	return this.toolItems.get(t.menuItemId);
            }
        }
    },

    show : function(el, pos, parentMenu){
        this.parentMenu = parentMenu;
        if(!this.el){
            this.render();
        }
		
        this.fireEvent("beforeshow", this);
        this.showAt(this.el.getAlignToXY(el, pos || this.defaultAlign), parentMenu, false);
        var tPanelWidth = 100;
        var box = this.menuBWrap.getBox();
        this.menuPanel.setWidth(box.width-tPanelWidth);
        this.menuPanel.setHeight(box.height);

        this.toolsPanel.setWidth(tPanelWidth);
        this.toolsPanel.setX(box.x+box.width-tPanelWidth);
        this.toolsPanel.setHeight(box.height);
        
//        this.picPanel.setX(box.x+box.width-tPanelWidth);
//        this.picPanel.setY(box.x+box.width-tPanelWidth);
    },

    addTool : function(){
        var a = arguments, l = a.length, item;
        for(var i = 0; i < l; i++){
            var el = a[i];
            if(el.render){ // some kind of Item
                item = this.addToolItem(el);
            }else if(typeof el == "string"){ // string
                if(el == "separator" || el == "-"){
                    item = this.addToolSeparator();
                }else{
                    item = this.addText(el);
                }
            }else if(el.tagName || el.el){ // element
                item = this.addElement(el);
            }else if(typeof el == "object"){ // must be menu item config?
                item = this.addToolMenuItem(el);
            }
        }
        return item;
    },

    addToolSeparator : function(){
        return this.addToolItem(new Ext.menu.Separator({itemCls: 'ux-toolmenu-sep'}));
    },

    addToolItem : function(item){
        this.toolItems.add(item);
        if(this.ul){
            var li = document.createElement("li");
            li.className = "x-menu-list-item";
            this.ul.dom.appendChild(li);
            item.render(li, this);
            this.delayAutoWidth();
        }
        return item;
    },

    addToolMenuItem : function(config){
        if(!(config instanceof Ext.menu.Item)){
            if(typeof config.checked == "boolean"){ // must be check menu item config?
                config = new Ext.menu.CheckItem(config);
            }else{
                config = new Ext.menu.Item(config);
            }
        }
        return this.addToolItem(config);
    },

    setTitle : function(title, iconCls){
        this.title = title;
        this.header.child('span').update(title);
        return this;
    },
    
    showMenu : function() {
    	var scope = this;
//    	if(FW.menuNodeJson) {
//    		items  = [];
//    		var treeLoader = new Ext.tree.TreeLoader();
//    		var node = new Ext.tree.TreeNode({id : 'starttree-root', text : '功能菜单'}) ;
//    		node.beginUpdate();
//            for(var i = 0, len = FW.menuNodeJson.length; i < len; i++){
//                var n = treeLoader.createNode(FW.menuNodeJson[i]);
//                if(n){
//                    var tree = new Ext.tree.TreePanel({
//				        title: n.text,
//				        rootVisible:false,
//				        split : true,
//				        autoScroll : true,
//				        collapseMode : 'mini',
//				        collapseFirst : false,
//				        border:true,
//				        lines:true,
//				        root: n
//				    });
//				    
//				    tree.on('beforeexpand', function() {
//				    	if(!this.hasChildNodes()) {
//				    		var module = MyDesktop.getModule('mainWindow');
//				            if (module) {
//				            	module.moduleId = this.id;
//				            	module.moduleName = this.text;
//				            	module.moduleUrl = FW.rootUrl + this.attributes.url;
//            					module.moduleImgUrl = this.attributes.icon;
//				                module.createWindow();
//				                scope.hide();
//				            }
//				    		return false;
//				    	}
//				    }, n);
//				    
//				    tree.on('click', function (node,e){
//				        if(node.isLeaf()){
//				        	var module = MyDesktop.getModule('mainWindow');
//				            if (module) {
//				            	module.moduleId = node.id;
//				            	module.moduleName = node.text;
//				            	module.moduleUrl = FW.rootUrl + node.attributes.url;
//            					module.moduleImgUrl = node.attributes.icon;
//				                module.createWindow();
//				                scope.hide();
//				            }
//				        }else{
//				        	if(node.isExpanded()){
//				        		node.collapse();
//				        	}else {
//				        		node.expand();
//				        	}
//				        }
//					}, tree);
//					
//				    tree.on('afterrender', function (){
//				    	var hdspan = this.header.child('span.' + this.headerTextCls);
//	                    if (hdspan) {
//	                        Ext.DomHelper.insertBefore(hdspan.dom, {
//	                            tag:'img', alt: n.text, title : n.text, src: FW.rootUrl + this.getRootNode().attributes.icon, cls:'x-panel-inline-icon '
//	                        });
//	                    }
//					}, tree);
//				    
//				    items.add(tree);
//                }
//            }
//            node.endUpdate();
    		
//    		var menuPanel = new Ext.Container({
//				renderTo : 'startmenu-tree',
//				border : false,
//				animCollapse : true,
//				layout:'accordion',
//				width : 190,
//			    height : 518,
//				items: items
//			});
//    	}
		this.menuPanel.load({url : 'framework/desktop/introduction.jsp',nocache: true});
    }
});