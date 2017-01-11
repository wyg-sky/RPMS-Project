LeftNavPanel = function(config){
	var lefTree = new LeftNavTree({
		title:'功能列表',
		viewPanel:config.viewPanel,
		url:config.url,
		path:config.path
	});
    LeftNavPanel.superclass.constructor.call(this,{
        region : 'west',
        split : true,
        width : 225,
        minSize : 175,
        maxSize : 400,
        collapsible : false,
        layout : 'accordion',
        collapseMode : 'mini',
        lines : false,
        layoutConfig : {
            animate : true
        },
        items : [lefTree]
    });
};

Ext.extend(LeftNavPanel,Ext.Panel);