RightViewPanel = function(config){
    RightViewPanel.superclass.constructor.call(this, {
    	id : 'rightViewPanel_id',
    	region : 'center',
    	layout : 'fit',
    	border : false,
        bodyStyle: 'padding:0px 0px 0px 0px',
        autoDestroy : true
    });
    
};
Ext.extend(RightViewPanel,Ext.Panel,{
    
});