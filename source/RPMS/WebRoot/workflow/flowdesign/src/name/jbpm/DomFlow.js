DomFlow = function(domTree) {
	//this.objType = 'FLOW',
	this.domTree = domTree;
	this.nodes = new Ext.tree.TreeNode({id: 'nodes',allowDrag : false,allowDrop : false,text: '节点',iconCls: 'ff-elements-icon',expanded: true});
	this.tasksNode = new Ext.tree.TreeNode({id: 'tasks',allowDrag : false,allowDrop : false,type: 'tasks',text: '任务',iconCls: 'task-icon',expanded: true});
	this.eventsNode = new Ext.tree.TreeNode({id: 'events',allowDrag : false,allowDrop : false,type: 'events',text: '事件',iconCls: 'ff-events-icon',expanded: true});
    DomFlow.superclass.constructor.call(this,{
		id: fileId,
		obj: this,
		allowDrag : false,
    	allowDrop : false,
		expanded: true,
		text: '流程',
		iconCls: 'workflow-icon'//'dom-flow'
    }); 
    this.appendChild(this.nodes);
    this.appendChild(this.tasksNode);
 	this.appendChild(this.eventsNode);
 	
 	this.taskAmount = 0;
 	this.eventAmount = 0;
 	
 	this.domTasks = new Array();
 	this.domEvents = new Array();
 	
 	//this.flowTypeId = flowTypeId;
 	this.flowTypeName = bpName;
 	this.flowTypeCode = bpCode;
 	
 	this.tasksNode.on('contextmenu', this.onContextClick, this);
 	this.eventsNode.on('contextmenu', this.onContextClick, this);
 	
 	//this.on('click', this.onClick, this);
};

Ext.extend(DomFlow, Ext.tree.TreeNode,{//Async
	addTask : function(domTask){//添加一个任务
		if(domTask==null||!domTask.domObj)
			domTask = new DomTask(this);
		this.tasksNode.appendChild(domTask);
		this.domTasks.add(domTask);
	},
	removeTask : function(domTask){
		domTask.remove();
		this.domTasks.remove(domTask);
	},
	addEvent : function(domEvent){//添加一个事件，默认带一个行为
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
	setFlowTypeName : function(flowTypeName){
		this.flowTypeName = flowTypeName;
	},
	getFlowTypeName : function(){
		return this.flowTypeName;
	},
	setFlowTypeCode : function(flowTypeCode){
		this.flowTypeCode = flowTypeCode;
	},
	getFlowTypeCode : function(){
		return this.flowTypeCode;
	},
	setCreateUrl : function(createUrl){
		this.createUrl = createUrl;
	},
	getCreateUrl : function(){
		return this.createUrl;
	},
	setCreateUrlDes : function(createUrlDes){
		this.createUrlDes = createUrlDes;
	},
	getCreateUrlDes : function(){
		return this.createUrlDes;
	},
	setUpdateUrl : function(updateUrl){
		this.updateUrl = updateUrl;
	},
	getUpdateUrl : function(){
		return this.updateUrl;
	},
	setUpdateUrlDes : function(updateUrlDes){
		this.updateUrlDes = updateUrlDes;
	},
	getUpdateUrlDes : function(){
		return this.updateUrlDes;
	},
	//viewUrl
	setViewUrl : function(viewUrl){
		this.viewUrl = viewUrl;
	},
	getViewUrl : function(){
		return this.viewUrl;
	},
	setViewUrlDes : function(viewUrlDes){
		this.viewUrlDes = viewUrlDes;
	},
	getViewUrlDes : function(){
		return this.viewUrlDes;
	},
	//templateUrl
	setTemplateUrl : function(templateUrl){
		this.templateUrl = templateUrl;
	},
	getTemplateUrl : function(){
		return this.templateUrl;
	},
	setTemplateUrlDes : function(templateUrlDes){
		this.templateUrlDes = templateUrlDes;
	},
	getTemplateUrlDes : function(){
		return this.templateUrlDes;
	},
	//printPageUrl
	setPrintPageUrl : function(printPageUrl){
		this.printPageUrl = printPageUrl;
	},
	getPrintPageUrl : function(){
		return this.printPageUrl;
	},
	setPrintPageUrlDes : function(printPageUrlDes){
		this.printPageUrlDes = printPageUrlDes;
	},
	getPrintPageUrlDes : function(){
		return this.printPageUrlDes;
	},
	//homeUrl
	getHomeUrl : function(){
		return this.homeUrl;
	},
	setHomeUrl : function(homeUrl){
		this.homeUrl = homeUrl;
	},
	setHomeUrlDes : function(homeUrlDes){
		this.homeUrlDes = homeUrlDes;
	},
	getHomeUrlDes : function(){
		return this.homeUrlDes;
	},
	/*流程草案状态设置 20090417 --yangming --开始*/
	setDraftState : function(draftState){
		this.draftState = draftState;
	},
	getDraftState : function(){
		return this.draftState;
	},
	/*流程草案状态设置 20090417 --yangming --结束*/
	/*setFlowTypeId : function(flowTypeId){
		this.flowTypeId = flowTypeId;
	},
	getFlowTypeId : function(){
		return this.flowTypeId;
	},
	*/
	//设置右键
	onContextClick : function(node,e){
		var type = node.attributes.type;
		var domTreeMenu = new Ext.menu.Menu({id : 'domTreeMenu'});
		var addTaskItem = new Ext.menu.Item({text: '增加任务',iconCls: 'add-dom-task'});
		var addEventItem = new Ext.menu.Item({text: '增加事件',iconCls: 'add-dom-event'});
		if(operType=='view'){
			addTaskItem.disable(); 
			addEventItem.disable(); 
		}
		addTaskItem.on('click',this.addTask,this);
		addEventItem.on('click',this.addEvent,this);
		if('tasks'==type)
			domTreeMenu.add(addTaskItem);
		else if('events'==type)
			domTreeMenu.add(addEventItem);
		coords = e.getXY();
    	domTreeMenu.showAt([coords[0], coords[1]]);
	},
	showProperty : function(node,e){//展现
		var formPanel = propertyPanel.propertyFormPanel;
		var flowId = formPanel.findById('flowId');
		if(flowId) return;
		propertyPanel.flowClick(this);
		
		//createUrl
		var createUrl = formPanel.findById('createUrl');
		if(this.getCreateUrl()){
			createUrl.setValue({id:this.getCreateUrl(),text:this.getCreateUrlDes()});
		}
		//updateUrl
		var updateUrl = formPanel.findById('updateUrl');
		if(this.getUpdateUrl()){
			updateUrl.setValue({id:this.getUpdateUrl(),text:this.getUpdateUrlDes()});
		}
		//viewUrl
		var viewUrl = formPanel.findById('viewUrl');
		if(this.getViewUrl()){
			viewUrl.setValue({id:this.getViewUrl(),text:this.getViewUrlDes()});
		}
		//templateUrl
		var templateUrl = formPanel.findById('templateUrl');
		if(this.getTemplateUrl()){
			templateUrl.setValue({id:this.getTemplateUrl(),text:this.getTemplateUrlDes()});
		}
		//printPageUrl
		var printPageUrl = formPanel.findById('printPageUrl');
		if(this.getPrintPageUrl()){
			printPageUrl.setValue({id:this.getPrintPageUrl(),text:this.getPrintPageUrlDes()});
		}
		//homeUrl
		var homeUrl = formPanel.findById('homeUrl');
		if(this.getHomeUrl()){
			homeUrl.setValue({id:this.getHomeUrl(),text:this.getHomeUrlDes()});
		}
	},
	saveProperty : function(formPanel){//保存
		this.setText(formPanel.findById('flowName').getValue());
		this.setDescription(formPanel.findById('flowDescription').getValue());
		//createUrl
		var createUrl = formPanel.findById('createUrl').getValue();
		var createUrlDes = formPanel.findById('createUrl').getRawValue();
		this.setCreateUrlDes(createUrlDes);
		this.setCreateUrl(createUrl);
		//updateUrl
		var updateUrl = formPanel.findById('updateUrl').getValue();
		var updateUrlDes = formPanel.findById('updateUrl').getRawValue();
		this.setUpdateUrlDes(updateUrlDes);
		this.setUpdateUrl(updateUrl);
		//viewUrl
		var viewUrl = formPanel.findById('viewUrl').getValue();
		var viewUrlDes = formPanel.findById('viewUrl').getRawValue();
		this.setViewUrlDes(viewUrlDes);
		this.setViewUrl(viewUrl);
		//templateUrl
		var templateUrl = formPanel.findById('templateUrl').getValue();
		var templateUrlDes = formPanel.findById('templateUrl').getRawValue();
		this.setTemplateUrlDes(templateUrlDes);
		this.setTemplateUrl(templateUrl);
		//printPageUrl
		var printPageUrl = formPanel.findById('printPageUrl').getValue();
		var printPageUrlDes = formPanel.findById('printPageUrl').getRawValue();
		this.setPrintPageUrlDes(printPageUrlDes);
		this.setPrintPageUrl(printPageUrl);
		//homeUrl
		var homeUrl = formPanel.findById('homeUrl').getValue();
		var homeUrlDes = formPanel.findById('homeUrl').getRawValue();
		this.setHomeUrlDes(homeUrlDes);
		this.setHomeUrl(homeUrl);
		//流程草案状态设置 20090417 --yangming
		this.setDraftState(formPanel.findById('draftState').getValue());
	},
	convertDomToXML : function(jbpmDoc){
		var flowEL = jbpmDoc.createElement('process-definition');
		flowEL.setAttribute('id',this.id);
		flowEL.setAttribute('fileName',this.text);
		flowEL.setAttribute('name',this.getFlowTypeCode());
		flowEL.setAttribute('typeName',this.getFlowTypeName());
		//description
		var description = this.getDescription();
		if(description!=null&&description!=''){
			var descriptionEL = jbpmDoc.createElement('description');
			descriptionEL.text = description;
			flowEL.appendChild(descriptionEL);
		}
		//createUrl
		var createUrl = this.getCreateUrl();
		if(createUrl!=null&&createUrl!=''){
			var regS = new RegExp("&","g");
			createUrl = createUrl.replace(regS,"--")
			var createUrlEL = jbpmDoc.createElement('createUrl');
			createUrlEL.setAttribute('des',this.getCreateUrlDes());
			var createUrlData = jbpmDoc.createCDATASection(createUrl);
			createUrlEL.appendChild(createUrlData);
			flowEL.appendChild(createUrlEL);
		}
		//updateUrl
		var updateUrl = this.getUpdateUrl();
		if(updateUrl!=null&&updateUrl!=''){
			var regS = new RegExp("&","g");
			updateUrl = updateUrl.replace(regS,"--")
			var updateUrlEL = jbpmDoc.createElement('updateUrl');
			updateUrlEL.setAttribute('des',this.getUpdateUrlDes());
			var updateUrlData = jbpmDoc.createCDATASection(updateUrl);
			updateUrlEL.appendChild(updateUrlData);
			flowEL.appendChild(updateUrlEL);
		}
		//viewUrl
		var viewUrl = this.getViewUrl();
		if(viewUrl!=null&&viewUrl!=''){
			var regS = new RegExp("&","g");
			viewUrl = viewUrl.replace(regS,"--")
			var viewUrlEL = jbpmDoc.createElement('viewUrl');
			viewUrlEL.setAttribute('des',this.getViewUrlDes());
			var viewUrlData = jbpmDoc.createCDATASection(viewUrl);
			viewUrlEL.appendChild(viewUrlData);
			flowEL.appendChild(viewUrlEL);
		}
		//templateUrl
		var templateUrl = this.getTemplateUrl();
		if(templateUrl!=null&&templateUrl!=''){
			var regS = new RegExp("&","g");
			templateUrl = templateUrl.replace(regS,"--")
			var templateUrlEL = jbpmDoc.createElement('templateUrl');
			templateUrlEL.setAttribute('des',this.getTemplateUrlDes());
			var templateUrlData = jbpmDoc.createCDATASection(templateUrl);
			templateUrlEL.appendChild(templateUrlData);
			flowEL.appendChild(templateUrlEL);
		}
		//printPageUrl
		var printPageUrl = this.getPrintPageUrl();
		if(printPageUrl!=null&&printPageUrl!=''){
			var regS = new RegExp("&","g");
			printPageUrl = printPageUrl.replace(regS,"--")
			var printPageUrlEL = jbpmDoc.createElement('printPageUrl');
			printPageUrlEL.setAttribute('des',this.getPrintPageUrlDes());
			var printPageUrlData = jbpmDoc.createCDATASection(printPageUrl);
			printPageUrlEL.appendChild(printPageUrlData);
			flowEL.appendChild(printPageUrlEL);
		}
		//homeUrl
		var homeUrl = this.getHomeUrl();
		if(homeUrl!=null&&homeUrl!=''){
			var regS = new RegExp("&","g");
			homeUrl = homeUrl.replace(regS,"--");
			var homeUrlEL = jbpmDoc.createElement('homeUrl');
			homeUrlEL.setAttribute('des',this.getHomeUrlDes());
			var homeUrlData = jbpmDoc.createCDATASection(homeUrl);
			homeUrlEL.appendChild(homeUrlData);
			flowEL.appendChild(homeUrlEL);
		}
		//流程草案状态设置 20090417 --yangming --开始
		var draftState = this.getDraftState();
		if(draftState){
			var draftStateEL = jbpmDoc.createElement('draftState');
			var draftStateData = jbpmDoc.createCDATASection(draftState);
			draftStateEL.appendChild(draftStateData);
			flowEL.appendChild(draftStateEL);
		}
		//流程草案状态设置 20090417 --yangming --结束
		//nodes
		var nodes = this.nodes.childNodes;//流程节点的集合
		for(var i=0;i<nodes.length;i++){
			var domNode = nodes[i].attributes.obj;
			var nodeEL = domNode.convertDomToXML(jbpmDoc);
			flowEL.appendChild(nodeEL);
		}
		//events
		for(var i=0;i<this.domEvents.size();i++){
			var eventEL = this.domEvents.get(i).convertDomToXML(jbpmDoc);
			flowEL.appendChild(eventEL);
		}
		//tasks
		for(var i=0;i<this.domTasks.size();i++){
			var taskEL = this.domTasks.get(i).convertDomToXML(jbpmDoc);
			flowEL.appendChild(taskEL);
		}
		return flowEL;
	},
	convertXMLToDom : function(jbpmDoc){
		var name = jbpmDoc.getAttribute('fileName');
		this.setText(name);
		//var flowTypeId = jbpmDoc.getAttribute('typeId');
		//this.setFlowTypeId(flowTypeId);
		var flowTypeName = jbpmDoc.getAttribute('typeName');
		var flowTypeCode = jbpmDoc.getAttribute('name');
		this.setFlowTypeName(flowTypeName);
		this.setFlowTypeCode(flowTypeCode);
		var description = null;
		var descriptionDoc = jbpmDoc.selectSingleNode('/process-definition/description');
		if(descriptionDoc){
			var description = descriptionDoc.text;
			this.setDescription(description);
		}
		//createUrl
		var createUrls = jbpmDoc.getElementsByTagName('createUrl');
		if(createUrls.length>0){
			var createUrl = createUrls[0];
			this.setCreateUrl(createUrl.text);
			this.setCreateUrlDes(createUrl.getAttribute('des'));
		}
		//updateUrl
		var updateUrls = jbpmDoc.getElementsByTagName('updateUrl');
		if(updateUrls.length>0){
			var updateUrl = updateUrls[0];
			this.setUpdateUrl(updateUrl.text);
			this.setUpdateUrlDes(updateUrl.getAttribute('des'));
		}
		//viewUrl
		var viewUrls = jbpmDoc.getElementsByTagName('viewUrl');
		if(viewUrls.length>0){
			var viewUrl = viewUrls[0];
			this.setViewUrl(viewUrl.text);
			this.setViewUrlDes(viewUrl.getAttribute('des'));
		}
		//templateUrl
		var templateUrls = jbpmDoc.getElementsByTagName('templateUrl');
		if(templateUrls.length>0){
			var templateUrl = templateUrls[0];
			this.setTemplateUrl(templateUrl.text);
			this.setTemplateUrlDes(templateUrl.getAttribute('des'));
		}
		//printPageUrl
		var printPageUrls = jbpmDoc.getElementsByTagName('printPageUrl');
		if(printPageUrls.length>0){
			var printPageUrl = printPageUrls[0];
			this.setPrintPageUrl(printPageUrl.text);
			this.setPrintPageUrlDes(printPageUrl.getAttribute('des'));
		}
		//homeUrl
		var homeUrls = jbpmDoc.getElementsByTagName('homeUrl');
		if(homeUrls.length>0){
			var homeUrl = homeUrls[0];
			this.setHomeUrl(homeUrl.text);
			this.setHomeUrlDes(homeUrl.getAttribute('des'));
		}
		
		//流程草案状态设置 20090417 --yangming --开始
		var draftStateDoc = jbpmDoc.selectSingleNode('/process-definition/draftState');
		if(draftStateDoc){
			var draftState = draftStateDoc.text;
			this.setDraftState(draftState);
		}
		
		//流程草案状态设置 20090417 --yangming --结束
		
		//只有flow需要在解析是直接置入form数据
		//alert(fileId);
		propertyPanel.propertyFormPanel.findById('domId').setValue(fileId);
		propertyPanel.propertyFormPanel.findById('flowId').setValue(fileId);
		propertyPanel.propertyFormPanel.findById('flowName').setValue(name);
		propertyPanel.propertyFormPanel.findById('createUrl').setValue({id: this.getCreateUrl(),text:this.getCreateUrlDes()});
		//propertyPanel.propertyFormPanel.findById('createUrl').setValue(this.getCreateUrl()+'_'+this.getCreateUrlDes());
		propertyPanel.propertyFormPanel.findById('updateUrl').setValue({id: this.getUpdateUrl(),text:this.getUpdateUrlDes()});
		propertyPanel.propertyFormPanel.findById('viewUrl').setValue({id: this.getViewUrl(),text:this.getViewUrlDes()});
		propertyPanel.propertyFormPanel.findById('templateUrl').setValue({id: this.getTemplateUrl(),text:this.getTemplateUrlDes()});
		propertyPanel.propertyFormPanel.findById('printPageUrl').setValue({id: this.getPrintPageUrl(),text:this.getPrintPageUrlDes()});
		propertyPanel.propertyFormPanel.findById('homeUrl').setValue({id: this.getHomeUrl(),text:this.getHomeUrlDes()});
		//propertyPanel.propertyFormPanel.findById('flowTypeId').setValue(flowTypeId);
		//propertyPanel.propertyFormPanel.findById('flowTypeName').setValue(flowTypeName);
		propertyPanel.propertyFormPanel.findById('flowDescription').setValue(this.getDescription());
		
		//流程草案状态设置 20090417 --yangming --开始
		propertyPanel.propertyFormPanel.findById('draftState').setValue(this.getDraftState());
		//events
		var events = jbpmDoc.selectNodes('/process-definition/event');
		for(var i= 0;i<events.length;i++){
			var event = events[i];
			var domEvent = new DomEvent(this);
			domEvent.convertXMLToDom(event);
			this.addEvent(domEvent);
		}
		//tasks
		var tasks = jbpmDoc.selectNodes('/process-definition/task');
		for(var i= 0;i<tasks.length;i++){
			var task = tasks[i];
			var domTask = new DomTask(this);
			domTask.convertXMLToDom(task);
			this.addTask(domTask);
		}
		//nodes
		var metaNodeModels = xiorkFlow.getWrapper().getModel().getMetaNodeModels();
		for(var i=0;i<metaNodeModels.size();i++){
			var metaNodeModel = metaNodeModels.get(i);
			var node = jbpmDoc.selectSingleNode("/process-definition/" + metaNodeModel.elType + "[@id='"+ metaNodeModel.getID() +"']"); 
			var domNode = new DomNode(metaNodeModel,'edit');
			domNode.convertXMLToDom(node);
			this.nodes.appendChild(domNode);
		}
	}
});


