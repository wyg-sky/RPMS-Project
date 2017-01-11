/**
 * 流程右侧报表面板
 * @param {} config
 */
BpReportPanel = function(config){
	config = config||{};
	Ext.apply(config,{
       	tbar : new Ext.Toolbar({
	    	height : 24,
	    	items : [{text : '&nbsp;' , xtype : 'tbtext'}]
	    }),
        items : [{
        		columnWidth : 1,
        		style : 'padding:2px 0 0 1px',
        		border : false
        	}]
	});
	Ext.apply(this,config);
//	
//	//流程状态饼图
//    this.statusPieChartPanel = new Ext.ux.OpenFlashChartPanel({
//    	layout : 'fit',
//    	chartURL : 'ext/extension/ofc/open-flash-chart.swf',
//    	border : false
//    });
//    
////月开启关闭柱状图
//    this.statisticsBarChartPanel = new Ext.ux.OpenFlashChartPanel({
//    	layout : 'fit',
//		chartURL : 'ext/extension/ofc/open-flash-chart.swf',
//		border : false
//    });
	
	BpReportPanel.superclass.constructor.call(this,config);
	this.on("beforedestroy",this._onDestroy,this);
};

Ext.extend(BpReportPanel, Ext.ux.Portal,{
	layout : 'fit',
	_onDestroy : function(){
		if(this.statusPieChartPanel){
			Ext.destroy(this.statusPieChartPanel);
			delete this.statusPieChartPanel;
		}
		if(this.mounthCreateLineChartsPanel){
			Ext.destroy(this.mounthCreateLineChartsPanel);
			delete this.mounthCreateLineChartsPanel;
		}
		return true;
	},
	loadPortal : function(bpId){
		if(!this.statusPieChartPanel){
			this.statusPieChartPanel = new Ext.ux.MediaPanel.Flash({
				layout : 'fit',
				height : (document.body.clientHeight-168)/2,
				border : false,
		        autoWidth: true,
		        collapsible:true,
		        border:false,  
		        listeners : {'afterInited' : {
					        fn: this.afterInitedFn,
					        scope: this
				    	}
				}, 
		        mediaCfg:{
					mediaType:'SWF',
					url: 'ext/extension/amchart/ampie.swf',
					width:'100%',
					height:'100%',
					controls:true,
					start:true,
					params: {
				 	wmode: 'transparent',
					flashVars: {
						path : 'ext/extension/amchart/',  
						data_file: 'flow/currentProcessStatus.html?processId='+bpId, 
						settings_file: 'FVSD_RUNTIMESPACE/ServiceValue/ReportSetting/workflow_piechart_setting.xml' 
					}
		         }
		       }
			});
			this.items.first().add(this.statusPieChartPanel);
		}else{
			var mediaCfg = {
			        mediaType:'SWF',
			        url: 'ext/extension/amchart/ampie.swf',
			        width:'100%',
			        height:'100%',
			        controls:true,
			        start:true,
			        params: {
			        	wmode: 'transparent',
			        	flashVars :{
							path : 'ext/extension/amchart/',  
							data_file: 'flow/currentProcessStatus.html?processId='+bpId, 
							settings_file: 'FVSD_RUNTIMESPACE/ServiceValue/ReportSetting/workflow_piechart_setting.xml' 
						}
			       }
			 };
			this.statusPieChartPanel.renderMedia(mediaCfg);
		}
		
		if(!this.mounthCreateLineChartsPanel){
			this.mounthCreateLineChartsPanel = new Ext.ux.MediaPanel.Flash({
			        xtype: 'flashpanel',
			        autoWidth: true,
			        border:false,
			        height : (document.body.clientHeight-168)/2,
			        mediaCfg:{
			         mediaType:'SWF',
			         url: 'ext/extension/amchart/amcolumn.swf',
			         width:'100%',
				     height:'100%',
			         controls:true,
			         start:true,
			         params: {
			         	wmode: 'transparent',
			         	flashVars: {
			         		path : 'ext/extension/amchart/',  
			         		data_file: 'flow/processCreateByMonths.html?processId='+bpId, 
			         		settings_file: 'FVSD_RUNTIMESPACE/ServiceValue/ReportSetting/workflow_columnchart_setting.xml' 
			         	}
			         }
			       }
			    });
			this.items.first().add(this.mounthCreateLineChartsPanel);
		}else{
			var mediaCfg = {
			        mediaType:'SWF',
			        url: 'ext/extension/amchart/amcolumn.swf',
			        width:'100%',
			        height:'100%',
			        controls:true,
			        start:true,
			        params: {
			        	wmode: 'transparent',
			        	flashVars :{
			         		path : 'ext/extension/amchart/',  
			         		data_file: 'flow/processCreateByMonths.html?processId='+bpId, 
			         		settings_file: 'FVSD_RUNTIMESPACE/ServiceValue/ReportSetting/workflow_columnchart_setting.xml' 
			         	}
			       }
			 };
			this.mounthCreateLineChartsPanel.renderMedia(mediaCfg);
		}
		
		this.doLayout();
	},
	afterInitedFn : function(){
//		this.statusPieChartPanel.getSWFObject.setParam("labels.label[0].text",bpId)
	},
	setParams : function(key,value){
    	
    	if( this.paramsMap == null ){
    		this.paramsMap = {};
    	}
    	
    	this.paramsMap[key] = value;
    },
    
    getParamsValue : function(key){
    	
    	if( this.paramsMap == null ){
    		this.paramsMap = {};
    	}
    	return this.paramsMap[key];
    }
});

