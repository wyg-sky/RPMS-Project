/**
 * This the report panel
 * @author sixdayj
 * @since 2010.08.24
 * @param {} config
 */
WtbReportPanel = function(config){
	config = config || {};
	Ext.apply(this,config);
	WtbReportPanel.superclass.constructor.call(this);
};

Ext.extend(WtbReportPanel, Ext.Panel);

