/*
* DOM树上节点的对象模型，能够生成dom树上的节点，并存放节点属性信息
*/
DomNode = function(metaNodeModel,oper) {
	//this.objType = 'NODE',
	this.metaNodeModel = metaNodeModel;//图形化节点的信息
	
    DomNode.superclass.constructor.call(this,{
    	text: metaNodeModel.getText(),
    	iconCls: metaNodeModel.getIconCls(),
    	id: metaNodeModel.getID(),
    	expanded: true,
    	allowDrag : false,
    	allowDrop : false,
    	obj: this
    }); 
    
    //节点名不重复
    //metaNodeModel.setText(metaNodeModel.getText()+metaNodeModel.getID());
    //:~
    
    this.taskAmount = 0;
 	this.eventAmount = 0;
 	
 	this.domTasks = new Array();
 	this.domEvents = new Array();
 	//this.domTrans = new Array();
 	
 	this.taskNode = new DomTask(this);
	this.tasksNode = new Ext.tree.TreeNode({text: '任务',allowDrag : false,allowDrop : false,type: 'tasks',iconCls: 'task-icon',id: this.metaNodeModel.getID()+'_tasks',expanded: true});
	this.eventsNode = new Ext.tree.TreeNode({text: '事件',allowDrag : false,allowDrop : false,type: 'events',iconCls: 'ff-events-icon',id: this.metaNodeModel.getID()+'_events',expanded: true});
	this.transNode = new Ext.tree.TreeNode({text: '连线',allowDrag : false,iconCls: 'line-icon',id: this.metaNodeModel.getID()+'_trans',expanded: true});
	
	this.tasksNode.on('contextmenu', this.onContextClick, this);
	this.eventsNode.on('contextmenu', this.onContextClick, this);
	this.on('contextmenu', this.onContextClick, this);
	
	//this.on('click', this.onClick, this);
	
 	this.initDomNode(oper);
};

Ext.extend(DomNode, Ext.tree.TreeNode,{
	delNode : function(){
		var node = this;
		var m=Ext.MessageBox.confirm("提示","是否真的要删除此节点？",function(ret){
			if(ret=="yes"){
				xiorkFlow.getWrapper().getModel().removeMetaNodeModel(node.metaNodeModel);
				//alert(node.metaNodeModel);
			}
		});
	},
	addTask : function(domTask){
		if(domTask==null||!domTask.domObj)//判断是否是DomTask对象
			domTask = new DomTask(this);
		if(MetaNodeModel.TYPE_START_NODE==this.metaNodeModel.type)//开始节点的任务直接放置节点dom下
			this.appendChild(domTask);
		else
			this.tasksNode.appendChild(domTask);
		
		this.domTasks.add(domTask);
	},
	removeTask : function(domTask){
		domTask.remove();
		this.domTasks.remove(domTask);
	},
	addEvent : function(domEvent){
		if(domEvent==null||!domEvent.domObj){//判断是否是DomEvent对象
			domEvent = new DomEvent(this);
			domEvent.addAction();
		}
		this.eventsNode.appendChild(domEvent);		
		this.domEvents.add(domEvent);
		
	},
	removeEvent : function(domEvent){
		domEvent.remove();
		this.domEvents.remove(domEvent);
	},
	addTran : function(domTran){
		this.transNode.appendChild(domTran);
		//this.domTrans.add(domTran);
	},
	//removeTran : function(domTran){
	//	this.domTrans.remove(domTran);
	//},
	getTaskAmount : function(){
		this.taskAmount = this.taskAmount+1;
		return this.taskAmount;
	},
	getEventAmount : function(){
		this.eventAmount = this.eventAmount+1;
		return this.eventAmount;
	},
	setDescription : function(description){
		this.description = description;
	},
	getDescription : function(){
		return this.description;
	},
	//判断节点
	setDecisionHandlerType : function(decisionHandlerType){
		this.decisionHandlerType = decisionHandlerType;
	},
	getDecisionHandlerType : function(){
		return this.decisionHandlerType;
	},
	setDecisionHandlerExpression : function(decisionHandlerExpression){
		this.decisionHandlerExpression = decisionHandlerExpression;
	},
	setDecisionHandlerClass : function(decisionHandlerClass){
		this.decisionHandlerClass = decisionHandlerClass;
	}, 
	setDecisionHandlerConfigType : function(decisionHandlerConfigType){
		this.decisionHandlerConfigType = decisionHandlerConfigType;
	},
	getDecisionHandlerExpression : function(){
		return this.decisionHandlerExpression;
	}, 
	getDecisionHandlerClass : function(){
		return this.decisionHandlerClass;
	}, 
	getDecisionHandlerConfigType : function(){
		return this.decisionHandlerConfigType;
	},
	//:~
	//lingzj 09-7-11
	setSignal : function(signal){
		this.signal = signal;
	},
	getSignal : function(){
		return this.signal;
	},
	setCreateTasks : function(createTasks){
		this.createTasks = createTasks;
	},
	getCreateTasks : function(){
		return this.createTasks;
	},
	setEndTasks : function(endTasks){
		this.endTasks = endTasks;
	},
	getEndTasks : function(){
		return this.endTasks;
	},
	//:~
	//初始化DOM树上的节点，不同的节点下的task，event以及tran属性也不相同
	initDomNode: function(oper){	
		var nodeType = this.metaNodeModel.type;
		switch (nodeType) {
	      case MetaNodeModel.TYPE_START_NODE:
	      	//if('edit'!=oper)
	      		//this.addTask(this.taskNode);
			this.appendChild(this.eventsNode);
			this.appendChild(this.transNode);
	        break;
	      case MetaNodeModel.TYPE_END_NODE:
			this.appendChild(this.eventsNode);
	        break;
	      case MetaNodeModel.TYPE_FORK_NODE:
	      	this.appendChild(this.eventsNode);
			this.appendChild(this.transNode);
	        break;
	      case MetaNodeModel.TYPE_JOIN_NODE:
	      	this.appendChild(this.eventsNode);
			this.appendChild(this.transNode);
	        break;
	      case MetaNodeModel.TYPE_DECISION_NODE:
	      	this.appendChild(this.eventsNode);
			this.appendChild(this.transNode);
	        break;
	      default:
	      	if('edit'!=oper){
		      	this.appendChild(this.tasksNode);
		      	this.addTask(this.taskNode);
	      	}else
	      		this.appendChild(this.tasksNode);
			this.appendChild(this.eventsNode);
			this.appendChild(this.transNode);
	        break;
	    }
	},
	//设置右键
	onContextClick : function(node,e){
		var type = node.attributes.type;
		var domTreeMenu = new Ext.menu.Menu({id : 'domTreeMenu'});
		var addTaskItem = new Ext.menu.Item({text: '增加任务',iconCls: 'add-dom-task'});
		var addEventItem = new Ext.menu.Item({text: '增加事件',iconCls: 'add-dom-event'});
		var delNodeItem = new Ext.menu.Item({text: '删除节点',iconCls: 'dom-delete'});
		if(operType=='view'){
			addTaskItem.disable(); 
			addEventItem.disable(); 
			delNodeItem.disable();
		}
		addTaskItem.on('click',this.addTask,this);
		addEventItem.on('click',this.addEvent,this);
		delNodeItem.on('click',this.delNode,this);
		if('tasks'==type)
			domTreeMenu.add(addTaskItem);
		else if('events'==type)
			domTreeMenu.add(addEventItem);
		else{
			if(MetaNodeModel.TYPE_NODE==node.metaNodeModel.type||(MetaNodeModel.TYPE_START_NODE==node.metaNodeModel.type&&this.domTasks.size()<1))//任务节点或者任务数目是0的开始节点
				domTreeMenu.add(addTaskItem);
			domTreeMenu.add(addEventItem);
			domTreeMenu.add(delNodeItem);
		}
		coords = e.getXY();
    	domTreeMenu.showAt([coords[0], coords[1]]);
	},
	showProperty : function(node,e){//单击节点
		var formPanel = propertyPanel.propertyFormPanel;
		var nodeId = formPanel.findById('nodeId');
		if(nodeId&&nodeId.value == node.id) return; //如果点击的是当前显示的节点，就return
		propertyPanel.nodeClick(this);
		this.valueProperty(formPanel);//赋值
	},
	valueProperty : function(formPanel){//为form赋值
		if(MetaNodeModel.TYPE_NODE==this.metaNodeModel.type){//任务节点
			formPanel.findById('taskNodeSignal').setValue(this.getSignal());
			formPanel.findById('createTasks').setValue(this.getCreateTasks());
			formPanel.findById('endTasks').setValue(this.getEndTasks());
		}
		var decisionHandlerType = formPanel.findById('decisionHandlerType');
		//alert(decisionHandlerType);
		//alert(this.getDecisionHandlerType());
		if(decisionHandlerType){
			decisionHandlerType.setValue(this.getDecisionHandlerType());
			decisionHandlerType.fireEvent('select',decisionHandlerType);
		}
	},
	saveProperty : function(formPanel){//保存
		this.setText(formPanel.findById('nodeName').getValue());
		this.setDescription(formPanel.findById('nodeDescription').getValue());
		//alert(MetaNodeModel.TYPE_DECISION_NODE+'---'+this.metaNodeModel.type);
		if(MetaNodeModel.TYPE_NODE==this.metaNodeModel.type){//任务节点
			this.setSignal(formPanel.findById('taskNodeSignal').getValue());
			this.setCreateTasks(formPanel.findById('createTasks').getValue());
			this.setEndTasks(formPanel.findById('endTasks').getValue());
		}
		if(MetaNodeModel.TYPE_DECISION_NODE==this.metaNodeModel.type){//判断节点
			
			var decisionHandlerType = formPanel.findById('decisionHandlerType').getValue();
			
			this.setDecisionHandlerType(decisionHandlerType);
			//alert(this.getDecisionHandlerType());
			if('delegation'==decisionHandlerType){
				var decisionHandlerConfigType = formPanel.findById('decisionHandlerConfigType').getValue(); 
				var decisionHandlerClass =  formPanel.findById('decisionHandlerClass').getValue(); 
				this.setDecisionHandlerConfigType(decisionHandlerConfigType);
				this.setDecisionHandlerClass(decisionHandlerClass);
			}else if(decisionHandlerType!=''){
				var decisionHandlerExpression = formPanel.findById('decisionHandlerExpression').getValue(); 
				//alert(decisionHandlerExpression);
				this.setDecisionHandlerExpression(decisionHandlerExpression);
			}
		}
	},
	convertDomToXML : function(jbpmDoc){//生成节点的xml
		var nodeEL = jbpmDoc.createElement(this.metaNodeModel.elType);
		nodeEL.setAttribute('id',this.id);
		nodeEL.setAttribute('name',this.text);
		//lingzj 09-7-11 补充属性
		if(this.getSignal()!=null&&this.getSignal()!=''){
			nodeEL.setAttribute('signal',this.getSignal());
		}
		if(this.getCreateTasks()!=null&&this.getCreateTasks()!=''){
			nodeEL.setAttribute('create-tasks',this.getCreateTasks());
		}
		if(this.getEndTasks()!=null&&this.getEndTasks()!=''){
			nodeEL.setAttribute('end-tasks',this.getEndTasks());
		}
		//:~
		//description
		var description = this.getDescription();
		if(description!=null&&description!=''){
			var descriptionEL = jbpmDoc.createElement('description');
			descriptionEL.text = description;
			nodeEL.appendChild(descriptionEL);
		}
		//判断节点
		if(MetaNodeModel.TYPE_DECISION_NODE==this.metaNodeModel.type){
			var decisionHandlerType = this.getDecisionHandlerType();
			if(decisionHandlerType!=null&&decisionHandlerType!='')
				nodeEL.setAttribute('handlerType',decisionHandlerType);
			if('delegation'==decisionHandlerType){
				var handlerEL = jbpmDoc.createElement('handler');
				handlerEL.setAttribute('class',this.getDecisionHandlerClass()); 
				handlerEL.setAttribute('config-type',this.getDecisionHandlerConfigType()); 
				nodeEL.appendChild(handlerEL);
			}else if(decisionHandlerType!=''){
				if(this.getDecisionHandlerExpression() && this.getDecisionHandlerExpression().trim().length>3){//限制表达式的长度以确保表达式不为空   chenqing 10-5-19
					nodeEL.setAttribute('expression',this.getDecisionHandlerExpression());
				}
			}
		}
		//tasks
		for(j=0;j<this.domTasks.size();j++){
			var taskEL = this.domTasks.get(j).convertDomToXML(jbpmDoc);
			nodeEL.appendChild(taskEL);
		}
		//events
		for(j=0;j<this.domEvents.size();j++){
			var eventEL = this.domEvents.get(j).convertDomToXML(jbpmDoc);
			nodeEL.appendChild(eventEL);
		}
		//trans
		var trans = this.transNode.childNodes;//节点连线
		for(j=0;j<trans.length;j++){
			var domTran = trans[j].attributes.obj;
			var tranEL = domTran.convertDomToXML(jbpmDoc);
			nodeEL.appendChild(tranEL);
		}
		return nodeEL;
	},
	convertXMLToDom : function(jbpmDoc){
		var path = '/process-definition/'+this.metaNodeModel.elType+"[@id='"+ this.id +"']";
		var id = jbpmDoc.getAttribute('id');
		var name = jbpmDoc.getAttribute('name');
		this.id = id;
		this.setText(name);
		var description = null;
		var descriptionDoc = jbpmDoc.selectSingleNode(path+'/description');
		if(descriptionDoc){
			var description = descriptionDoc.text;
			this.setDescription(description);
		}
		//任务节点
		var taskNodeSignal = jbpmDoc.getAttribute('signal');
		var createTasks = jbpmDoc.getAttribute('create-tasks');
		var endTasks = jbpmDoc.getAttribute('end-tasks');
		if(taskNodeSignal){
			this.setSignal(taskNodeSignal);
		}
		if(createTasks){
			this.setCreateTasks(createTasks);
		}
		if(endTasks){
			this.setEndTasks(endTasks);
		}
		//:~
		//判断节点
		var handlerType = jbpmDoc.getAttribute('handlerType');
		if('delegation'==handlerType){
			this.setDecisionHandlerType(handlerType);
			var handlerDoc = jbpmDoc.selectSingleNode(path+'/handler');
			this.setDecisionHandlerClass(handlerDoc.getAttribute('class'));
			this.setDecisionHandlerConfigType(handlerDoc.getAttribute('config-type'));
		}else if('expression'==handlerType){
			this.setDecisionHandlerType(handlerType);
			this.setDecisionHandlerExpression(jbpmDoc.getAttribute('expression'));
		}
		//:~
		//tasks
		var tasks = jbpmDoc.selectNodes(path+'/task');
		for(j= 0;j<tasks.length;j++){
			var task = tasks[j];
			var domTask = new DomTask(this);
			domTask.convertXMLToDom(task,path);
			this.addTask(domTask);
		}
		//events
		var events = jbpmDoc.selectNodes(path+'/event');
		for(j= 0;j<events.length;j++){
			var event = events[j];
			var domEvent = new DomEvent(this);
			domEvent.convertXMLToDom(event);
			this.addEvent(domEvent);
		}
		
		//trans
		var trans = jbpmDoc.selectNodes(path+'/transition');
		for(j= 0;j<trans.length;j++){
			var tran = trans[j];
			var tranId = tran.getAttribute('id');
			var transitionModel = xiorkFlow.getWrapper().getModel().getMetaTranModelById(tranId);
			var domTran = new DomTran(transitionModel);
			domTran.convertXMLToDom(tran,path);
			this.transNode.appendChild(domTran);
		}
	}
});


