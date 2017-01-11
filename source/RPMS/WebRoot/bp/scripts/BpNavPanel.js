/**
 * 流程导航面板
 * @param {} typeCode 流程类型的code
 * @param {} bpView	流程中间的列表组件
 * @param {} uniqueCode	过滤器所需区域标识
 * @param {} bps 流程类型下的所有流程的id字符串
 */
BpNavPanel = function(typeCode,bpView,uniqueCode,bps) {	
	
	this.bps = bps ||[];
	this.setParams("bpView",bpView);
	this.setParams("typeCode",typeCode);
	this.setParams("uniqueCode",uniqueCode);
	this.setParams("bpReportPanel",bpView.reportPanel);
	var scope = this ;
	
	this.tabs = new Ext.Panel({
		region:'center',
		plain:true,
		border:false,
		layout : 'accordion',
		defaults:{border:false,autoScroll: true}//,
		/*items:[{
			title: $lang('bp.state'),
			layout:'fit',
			items:new BpNavTree({
					root: new Ext.tree.AsyncTreeNode({
								id: typeCode,
			        			url: 'bp/findByTypeCode.html',
			                    draggable: false
			               })
					})
		},{
			title: $lang('bp.definedByOwn'),
			layout:'fit',
			border: false,
            items:[
                 filterTreeList = new FilterITreeList(bpView,uniqueCode,"url:bp/myListByBp.html,children.*:bp/myListByBp.html")
			 ]
		}]*/
	});
	
//	this.tipPanel = new Ext.Panel({
//		title : $lang('bp.skill'),
//		region : 'south',
//		border : false,
//		height : 120,
//		minSize : 50,
//		bodyStyle : 'padding-bottom:15px;background:#eee;',
//		autoScroll : true,
//		collapsible:true,
//		collapseMode : 'mini',
//		collapsed : true,
//		html : $lang('bp.operationSkill')
//	});
	this.tipPanel = new BpHelpPanel();
	BpNavPanel.superclass.constructor.call(this, {
        layout : 'border',
		region : 'west',
		border : true,
		split : true,
		collapsible:true,
		collapseMode : 'mini',
//		margins : '2 0 5 5',
		width: 180,
        minSize: 180,
        maxSize: 280
	});
	
	
	
	this.add(this.tabs);
	this.add(this.tipPanel);
	this.initCmp.defer(100,this);
	this.on("beforedestroy",this._onDestroy,this);
};

Ext.extend(BpNavPanel, Ext.Panel,{
	_onDestroy : function(){
//		if(this.tabs){
//			Ext.destroy(this.tabs);
//			delete this.tabs;
//		}
//		if(this.tipPanel){
//			Ext.destroy(this.tipPanel);
//			delete this.tipPanel;
//		}
	},
	initCmp : function(){
		var bpView = this.getParamsValue('bpView');
		var uniqueCode = this.getParamsValue('uniqueCode');
		var bpReportPanel = this.getParamsValue('bpReportPanel');
		var responseStr = this.bps;
		for( var i=0;i<responseStr.length; i++ ){
			var bpFilterTreePanel = new BpFilterTreePanel(bpView,responseStr[i]);
			this.tabs.add(bpFilterTreePanel);
			
			bpFilterTreePanel.on("expand", function(ft) {
				var rootNode = ft.getRootNode();
				if(rootNode.childNodes[0]){
					bpView.loadData(rootNode.childNodes[0])
				} else {
					bpView.loadData(rootNode)
				}
				
				bpReportPanel.loadPortal(ft.getParamsValue("bpInfo").id);
				ft.expandPath(ft.getRootNode().getPath());
			});
			bpFilterTreePanel.on("click", function(node, e) {
				bpView.setParams('bpInfo', node.getOwnerTree().getParamsValue("bpInfo"));
				bpView.loadData(node);
				bpView.activate(bpView.mainTabPanel);
			});
		}
		
		var fristTreePanel = this.tabs.items.items[0];
		fristTreePanel.expandPath(fristTreePanel.getRootNode().getPath());
		fristTreePanel.on("load",function(node){
				if(node!=fristTreePanel.getRootNode())return;
				if(!(node.item&&node.item(0)))
					bpView.loadData(node)
				else 
					bpView.loadData(node.item(0));//自动加载第一个节点的流程实例
			});
			
		bpReportPanel.loadPortal(fristTreePanel.getParamsValue("bpInfo").id);
		bpView.setParams('bpInfo',fristTreePanel.getParamsValue("bpInfo"));
		this.doLayout();
	},
	/**
	 * 切换 tab 页事件
	 */
    tabchangeFn : function(tabPanel,tab){
    	tab.doLayout();
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
