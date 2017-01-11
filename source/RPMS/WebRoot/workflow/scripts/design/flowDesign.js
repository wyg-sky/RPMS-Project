/**
 * 流程设计器入口
 * @type 
 */
var propertyPanel = null;
var viewport = null;
Ext.onReady(function(){

	init();		//位于flowDesignInit.js
	//画图区域panel
	var graphicPanel = new Ext.Panel({
		contentEl: 'designer',
		id: 'graphicPanel',
		region: 'center',
		layout:'fit'
	});
	//工作流定义的tab
	//控制查看工单和流程信息是否显示
	var hidePar = false;
	if('bpview'==playtype) hidePar = true;
	
	if(operType=='play'){
		var tbar = new Ext.Toolbar({
			items: [
			{text:'开始',iconCls:'x-tbar-page-next',handler: startPlayFlow /*位于flowDesignInit.js */},
				'-',
				{text:'停止',iconCls:'pause-icon',handler: endPlayFlow /*位于flowDesignInit.js */},
//				'-',
//				{text:'节点执行情况',iconCls: 'x-tbar-page-first',toggleHandler: nodeExecuteInfo,enableToggle: true,pressed: false},
				'->',
//				{text: '查看工单',iconCls: 'view-icon',hidden: hidePar,handler: showBpTask},
//				'-',
				{text: '流程信息',iconCls: 'workflow-icon',hidden: hidePar,handler: flowInfo}
			]
		});
		graphicPanel.elements += ',tbar';
		graphicPanel.topToolbar = tbar;
		
		
		propertyPanel = new Ext.TabPanel({
			id :  "propertyPanel",
			region:'south',
			split: true,
	    	activeTab : 0 ,
	    	height: 200,
	    	//autoHeight: true,
			flowInstanceId: flowInsId,
			hidden: true
			//height:100,
	    	//items : [flowLogPanel,slaLogPanel]//,loggersGrid
		});
		//var slaLogPanel = new Ext.Panel({
		//	title: 'SLA日志'
		//});
//		var slaLogPanel = new Ext.grid.GridPanel({
//			id: 'slaLogPanel',
//			//height: 200,
//			title: 'SLA日志',
//			loadMask: true,
//			ds: new Ext.data.Store({
//				autoLoad: true,
//				proxy: new Ext.data.HttpProxy({url: '../slm/slmHistorysByBpi.html'}), 	
//				baseParams : {'flowInstanceId': propertyPanel.flowInstanceId},
//				reader: new Ext.data.JsonReader({
//				    root: 'root', 
//					totalProperty: 'total', 
//					successProperty : 'success', 
//					fields: ["id", "bpi.code", "triggerTime", "target.code", "milestone.code","isOvertime"]
//				}) 
//			}),
//			cm: new Ext.grid.ColumnModel([
//				//{header: "ID", dataIndex: "id", hidden: true},
//				 {header: "实例", sortable: true, dataIndex: "bpi.code"}
//				, {header: "触发时间", sortable: true, dataIndex: "triggerTime"}	
//				, {header: "是否超时", sortable: true, dataIndex: "isOvertime"}		
//				, {header: "条款目标编号", sortable: true, dataIndex: "target.code"}
//				, {header: "触发里程碑编号", sortable: true, dataIndex: "milestone.code"}
//			]),
//			viewConfig: {forceFit:true}
//		});
		//alert(propertyPanel.flowInstanceId);
//		var flowLogPanel = new Ext.grid.GridPanel({
//			id: 'flowLogPanel',
//			//height: 200,
//			title: '执行日志',
//			loadMask: true,
//			ds: new Ext.data.Store({
//				autoLoad: true,
//				proxy: new Ext.data.HttpProxy({url: '../flow/loadNodeExecuteInfoList.html'}),
//				baseParams : {'flowInstanceId': propertyPanel.flowInstanceId},
//				reader: new Ext.data.JsonReader({
//					root: "root",
//					totalProperty: 'total',
//					fields: ["id","node","operation","operator","createdOn","comment"]
//				})
//			}),
//			cm: new Ext.grid.ColumnModel([
//				//{dataIndex:"id",hidden: true},
//				{header:"节点",dataIndex:"node"},
//				{header:"操作",dataIndex:"operation",width: 200},
//				{header:"操作人",dataIndex:"operator",renderer: function(val){return val.name}},
//				{header:"操作时间",dataIndex:"createdOn"},
//				{header:"说明",dataIndex:"comment"}
//			]),
//			viewConfig: {forceFit:true},
//			tbar: [{text: '显示全部',iconCls:'view-icon',handler: loadNodeExecuteInfoGrid}]
//		});
//		propertyPanel.add(flowLogPanel);
//		propertyPanel.add(slaLogPanel);
		//flowLogPanel.store.baseParams = {'flowInstanceId': propertyPanel.flowInstanceId};
		//flowLogPanel.store.load();
	}else
	propertyPanel = new PropertyPanel();
	//propertyPanel.domTree.fireEvent('click',propertyPanel.domTree.root);
	//整体布局
	viewport = new Ext.Viewport({
    	layout:'border',
    	items:[graphicPanel,propertyPanel]
	});
	//取消滚动条显示
	window.parent.Ext.Msg.hide();
});

function nodeExecuteInfo(button,pressed){
	if(pressed){
		propertyPanel.show();
		if(selectedMetaNodeModel)
			loadNodeExecuteInfoGrid(selectedMetaNodeModel.getText());
	}else{
		propertyPanel.hide();
	}
	viewport.doLayout();
}	

function loadNodeExecuteInfoGrid(nodeName){
	if(!propertyPanel.hidden&&propertyPanel.findById('flowLogPanel')){
		var gridStore = propertyPanel.findById('flowLogPanel').getStore();
		//Ext.Msg.alert('','http://localhost:8080/trunk/flowMonitor/loadNodeExecuteInfoList.html');
		gridStore.proxy =new Ext.data.HttpProxy({url: '../flow/loadNodeExecuteInfoList.html'});
		if(nodeName)
			gridStore.baseParams = {'flowInstanceId': propertyPanel.flowInstanceId,'nodeName': nodeName};
		else
			gridStore.baseParams = {'flowInstanceId': propertyPanel.flowInstanceId};
		gridStore.load();
		
		//jsonds.proxy = new Ext.data.HttpProxy({url: '../admin/users!groupsList.html?userid='+userid});
		//jsonds.load();
	}
}	
	
function showBpTask(){
	
	var selectedRow = window.parent.Ext.getCmp('play_panel').recordObj;
	var url = selectedRow.get('url')
	var id = selectedRow.get("id");
	var jbpmTaskInstanceID = selectedRow.get("jbpmTaskInstanceID");
	//alert(url);
	var taskWin = new window.parent.Ext.Window({
		id: 'taskWin',
		title : '工单信息',
        layout:'fit',
        width:590,
        height:335,
        resizable: false,
        closeAction:'close',
        buttonAlign : 'center',
        modal : true,
        plain: true
	});
	var p = new window.parent.BpWorkbenchPanel();
	taskWin.add(p);
	taskWin.show();
	p.load({
		url : url,
		params : {id:id,jbpmTaskInstanceID:jbpmTaskInstanceID},
		scope : this,
		scripts : true
	});
}
function flowInfo(){
	var selectedRow = window.parent.Ext.getCmp('play_panel').recordObj;
	var flowObj = selectedRow.get('bpDefFile');
	//alert(flowObj.version);
	var flowForm = new window.parent.Ext.FormPanel({
        labelWidth:85, 
        frame:false, 
        bodyStyle:'padding:5px 5px 0', 
        defaultType: 'textfield',
        autoHeight:true,
        border:false,
        reader:new Ext.data.JsonReader({
			root:"root", 
			fields:["name","version", "description"]
		}),
		items: [ 	
			{fieldLabel:'名称', cls: 'nobordertext',readOnly:true,id:'name',value: flowObj.name,anchor:'98%'}, 
			{fieldLabel:'版本', cls: 'nobordertext',readOnly:true,id:'version',value: flowObj.version, anchor:'98%'},
			{xtype: 'textarea',cls: 'nobordertext',readOnly:true,fieldLabel:'描述', id:'description',value: flowObj.description, anchor:'98%'}
		]
    });
	var flowInfoWin = new window.parent.Ext.Window({
		id: 'flowInfoWin',
		title : '流程信息',
        layout:'fit',
        width:300,
        height:165,
        resizable : false,
        closeAction:'close',
        buttonAlign : 'center',
        plain: true
	});
	flowInfoWin.add(flowForm);
	flowInfoWin.show();
}	
