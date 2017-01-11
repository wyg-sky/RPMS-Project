/*
* 放置工作流dom树和属性设置form的panel对象，外部操作的入口
*/
PropertyPanel = function(){
	//放置工作流dom树的panel
	this.domTree = new DomTree();
	this.propertyFormPanel = new PropertyFormPanel();
	this.propertyFormPanel.flowProperty(this.domTree.root); //对form的初始化，显示flow的属性
	PropertyPanel.superclass.constructor.call(this,{
		id: 'propertyPanel',
		region: 'east',
		layout: 'border',
		split:true,
		animCollapse: false,
		collapsible:true,
		collapseMode:'mini',
		width: 300,
		minSize: 175,
		maxSize: 400,
		items: [this.domTree,this.propertyFormPanel]
	});

};

Ext.extend(PropertyPanel, Ext.Panel, {
	addNode : function(metaNodeModel){//添加节点
		this.domTree.addNode(metaNodeModel);
	},
	addTran : function(transitionModel){//添加连线
		this.domTree.addTran(transitionModel);
	},
	addAction : function(domAction){//增删action在属性区域对action的tabpanel的处理
		this.propertyFormPanel.addAction(domAction);
	},
	removeAction : function(domAction){
		this.propertyFormPanel.removeAction(domAction);
	},
	tranClick : function(domTran){//单击连线
		this.propertyFormPanel.tranProperty(domTran);
		this.doLayout();
	},
	flowClick : function(domFlow){//单击连线
		this.propertyFormPanel.flowProperty(domFlow);
		this.doLayout();
	},
	eventClick : function(domEvent){//单击事件
		this.propertyFormPanel.eventProperty(domEvent);
		this.doLayout();
	},
	taskClick : function(domTask){//单击任务
		this.propertyFormPanel.taskProperty(domTask);
		this.doLayout();
	},
	nodeClick : function(domNode){//单击节点
		this.propertyFormPanel.nodeProperty(domNode);
		this.doLayout();
	},
	modelClick : function(model){//点击图形化区域上的节点
		var nodeId = model.getID();
		var node = this.domTree.getNodeById(nodeId);
		node.fireEvent('click',node);
		
		/////
		/*var treeHeight = this.domTree.getInnerHeight();
		var oldNodePos = this.domTree.nodePos;
		var newNodePos = Ext.get(node.getUI().elNode).getY();
		//this.domTree.nodePos = newNodePos;
		alert(treeHeight+'==='+oldNodePos+'==='+newNodePos+'==='+this.domTree.getEl().dom.scrollTop);
		if(newNodePos<0){//节点位置是负数
			//this.domTree.body.scrollTo('top',newNodePos+oldNodePos);
		}else if(newNodePos>treeHeight){
			this.domTree.body.scrollTo('top',newNodePos);
		}
		this.domTree.nodePos = Ext.get(node.getUI().elNode).getY();*/
	},
	delModel : function(model){
		var nodeId = model.getID();
		var node = this.domTree.getNodeById(nodeId);
		//如果当前formpanel显示的是被删除的节点，那么就转到flow的属性
		var form = this.propertyFormPanel.findById('domId');
		if(form!=null&&(form.getValue()==nodeId)){
			this.domTree.root.fireEvent('click',this.domTree.root);
		}
		node.remove();
	},
	getFlowName : function(){
		return this.domTree.root.text;
	},
	getFlowId : function(){
		return this.domTree.root.id;
	},
	getFlowTypeName : function(){
		return this.domTree.root.attributes.obj.getFlowTypeName();
	},
	
	getFlowDescription : function(){
		return this.domTree.root.attributes.obj.getDescription();
	},
	convertDomToXML : function(jbpmDoc){//生成jbpm的xml文件
		return this.domTree.convertDomToXML(jbpmDoc);
	},
	convertXMLToDom : function(jbpmDoc){
		this.domTree.convertXMLToDom(jbpmDoc);
	},
	beforeSave : function(){
		var nodeId = this.propertyFormPanel.findById('domId').value;
		var node = this.domTree.getNodeById(nodeId);
		node.attributes.obj.saveProperty(this);
	},
	setFlowId : function(flowId){
		fileId = flowId;
	}
});



