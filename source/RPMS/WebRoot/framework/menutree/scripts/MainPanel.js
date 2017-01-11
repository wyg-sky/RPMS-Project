MainPanel = function(config){
    MainPanel.superclass.constructor.call(this, {
    	id : 'mainPanel_id',
    	region : 'center',
    	layout : 'fit',
    	border : false,
        bodyStyle: 'padding:0px 0px 0px 0px',
        autoDestroy : true
    });
    
};
Ext.extend(MainPanel, Ext.Panel,{
    
});