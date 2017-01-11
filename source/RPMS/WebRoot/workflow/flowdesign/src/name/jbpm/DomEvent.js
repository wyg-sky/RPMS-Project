/*
 * 流程的事件/节点任务中事件/节点的事件的dom，用于生成dom上流程的事件/节点任务的事件/节点事件的节点，并放置event的属性
 * domObj - 流程，节点，任务
 */
DomEvent = function(domObj) {

	this.domObj = domObj;
	//this.objType = domObj.objType+'_EVENT';
	
    DomEvent.superclass.constructor.call(this,{
    	text: '事件',
    	iconCls: 'ff-events-icon',
    	id: domObj.id+'_event_'+domObj.getEventAmount(),
    	expanded: true,
    	allowDrag : false,
    	allowDrop : false,
    	obj: this
    }); 
    this.actionAmount = 0;
 	this.domActions = new Array();
 	this.on('contextmenu', this.onContextClick, this);
};

Ext.extend(DomEvent, Ext.tree.TreeNode,{
	addAction : function(domAction){
		if(domAction==null||!domAction.domEvent)
			domAction = new DomAction(this);
		this.appendChild(domAction);
		this.domActions.add(domAction);
		propertyPanel.addAction(domAction);//需要在propertyFormPanel中对设置action的tabpanel进行处理
	},
	removeAction : function(domAction){
		domAction.remove();
		this.domActions.remove(domAction);
		propertyPanel.removeAction(domAction);
	},
	getActionByIndex : function(index){
		return this.domActions.get(index);
	},
	removeEvent : function(){
		this.domObj.removeEvent(this);
	},
	setEventType : function(eventType){
		this.eventType = eventType;
	},
	getEventType : function(){
		return this.eventType;
	},
	getActionAmount : function(){//用于控制event中action的id，只增不减
		this.actionAmount = this.actionAmount+1;
		return this.actionAmount;
	},
	//设置右键
	onContextClick : function(node,e){
		var domTreeMenu = new Ext.menu.Menu({id : 'domTreeMenu'});
		var delEventItem = new Ext.menu.Item({text: '删除事件',iconCls: 'dom-delete'});
		var addActionItem = new Ext.menu.Item({text: '增加行为',iconCls: 'add-dom-action'});
		if(operType=='view'){
			delEventItem.disable(); 
			addActionItem.disable(); 
		}
		addActionItem.on('click',this.addAction,this);
		delEventItem.on('click',this.removeEvent,this);
		domTreeMenu.add(addActionItem);
		domTreeMenu.add(delEventItem);
		coords = e.getXY();
    	domTreeMenu.showAt([coords[0], coords[1]]);
	},
	showProperty : function(node,e){//展现
		var formPanel = propertyPanel.propertyFormPanel;
		var eventId = formPanel.findById('eventId');
		if(eventId&&eventId.value == node.id) return;
		propertyPanel.eventClick(this);
		this.valueProperty(formPanel);
	},
	valueProperty : function(formPanel){//赋值
		formPanel.findById('eventType').setValue(this.getEventType());
		//处理行为的类型
		for(var i=0;i<this.domActions.size();i++){//将event下的action循环显示在页面上
        	var domAction = this.getActionByIndex(i);
        	domAction.valueProperty(formPanel);
        }
	},
	saveProperty : function(formPanel){//保存
		this.setText(formPanel.findById('eventName').getValue());
		this.setEventType(formPanel.findById('eventType').getValue());
		//保存action属性
		for(var i=0;i<this.domActions.size();i++){//将event下的action循环保存
        	var domAction = this.getActionByIndex(i);
        	domAction.saveProperty(formPanel);
        }
	},
	convertDomToXML : function(jbpmDoc){
		var eventEL = jbpmDoc.createElement('event');
		eventEL.setAttribute('id',this.id);
		eventEL.setAttribute('name',this.text);
		eventEL.setAttribute('type',this.getEventType());
		//actions
		for(l=0;l<this.domActions.size();l++){
			var actionEL = this.domActions.get(l).convertDomToXML(jbpmDoc);
			eventEL.appendChild(actionEL);
		}
		return eventEL;
	},
	convertXMLToDom : function(jbpmDoc){
		var id = jbpmDoc.getAttribute('id');
		var name = jbpmDoc.getAttribute('name');
		var type = jbpmDoc.getAttribute('type');
		this.id = id;
		this.setText(name);
		this.setEventType(type);
		//actions
		var actions = jbpmDoc.getElementsByTagName('action');
		for(l= 0;l<actions.length;l++){
			var action = actions[l];
			var domAction = new DomAction(this);
			domAction.convertXMLToDom(action);
			this.addAction(domAction);
		}
	}
});


