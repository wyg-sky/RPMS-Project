MenuPanel = function(config){
	Ext.apply(this,config);
	var menuLeftTree = new MenuLeftTree({
    	iconCls: 'icon-menu-home',
		title:'功能列表',
		viewPanel:config.viewPanel,
		menuPanel : this,
		url:config.url,
		path:config.path
	});
	
    MenuPanel.superclass.constructor.call(this,{
    	id : 'menuPanel_Id',
        region : 'west',
        split : true,
        width : 195,
        minSize : 195,
        maxSize : 195,
        collapsible : false,
        autoScroll : true,
        collapseMode : 'mini',
        lines : false,
        items : [menuLeftTree]
    });
};

Ext.extend(MenuPanel,Ext.Panel, {
	triggerClick : function() {
		if(this.collapsed) {
			this.expand();
		} else {
			this.collapse();
		}
	}
});