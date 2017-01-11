/**
 * 流程管理的中间区域容器 （需要拆分）
 */
FlowMonitorCtViewPanel = function(){
	
	FlowMonitorCtViewPanel.superclass.constructor.call(this, {
//		id : 'flow-tabs',
		activeTab : 0,
		region : 'center',
		margins : '0 0 0 0',
		resizeTabs : true,
		tabWidth : 150,
		minTabWidth : 120,
		enableTabScroll : true,
		plugins : new Ext.ux.TabCloseMenu(),
		border : true,
		items : {
//			id : 'flow-main-view',
			layout : 'fit',
			title : '流程监控',
			hideMode : 'offsets',
			border : false,
			items : [{
//				id : 'flow-center-view',
				layout : 'fit',
				tabTip : 'none',
				border : false
			}]
		}
	});
//	this.loadFlowViewPanel();
};


Ext.extend(FlowMonitorCtViewPanel, Ext.TabPanel, {
	/**
	 * 加载流程监控首页
	 */
	loadFlowMonitorHomePanel : function(){
//			var flowMonitorHomePanel = new FlowMonitorHomePanel(this);
//			this.items.first().setTitle('流程监控首页');
//			this.loadToWorkPanel(flowMonitorHomePanel);
	},

	/**
	 * 添加面板
	 * @param {} workPanel
	 */
	addNewWorkPanel : function(workPanel,tabTitle){
		var panelId = workPanel.getId();
		if (this.sViewCompId&&this.tViewCompId){
			if(this.sViewCompId==panelId){
				this.remove(this.sViewCompId);
				this.sViewCompId=panelId;
			}else if(this.tViewCompId==panelId){
				this.remove(this.tViewCompId);
				this.tViewCompId=panelId;
			}
		}
		if(!this.sViewCompId){
			this.sViewCompId = panelId;
		}else if(!this.tViewCompId){
			this.tViewCompId = panelId;
		}
		var closable = {closable : true}
		Ext.apply(workPanel,closable);
		this.add(workPanel);
		this.getItem(panelId).setTitle(tabTitle);
		this.ownerCt.doLayout();
      	this.activate(this.getItem(panelId));
	},
	/**
	 * 加载主面板
	 * 
	 * @param {} workPanel
	 */
	loadToWorkPanel : function(workPanel) {
		var cv = this.items.first().items.first();
		if (cv.compId) {
			cv.remove(cv.compId);
		}
		cv.compId = workPanel.getId();
		cv.add(workPanel);
		cv.ownerCt.doLayout();
        this.activate(this.items.items[0]);
	},
	/**
	 * 加载展现
	 * @param {} node
	 */
	loadData : function(node) {
		var flowPanel = null;
		flowPanel = new FlowMonitorViewPanel(this, node);
		this.items.first().setTitle($lang('workflow.flowViewPanel.flowMonitor', node.text)/* '流程('+node.text+')监控' */);
		
		if (this.sViewCompId) {
			this.remove(this.sViewCompId);
		}
		if (this.tViewCompId) {
			this.remove(this.tViewCompId);
		}
		this.loadToWorkPanel(flowPanel);
	}
});