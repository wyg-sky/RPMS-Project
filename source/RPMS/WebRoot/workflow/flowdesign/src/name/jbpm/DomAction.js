/*
 * 行为的dom，用于生成dom上的行为的节点，并放置action的属性
 */
DomAction = function(domEvent) {

	this.domEvent = domEvent;

    DomAction.superclass.constructor.call(this,{
    	text: '行为',
    	iconCls: 'ff-action-icon',
    	id: domEvent.id+'_action_'+domEvent.getActionAmount(),
    	allowDrag : false,
    	allowDrop : false,
    	obj: this
    }); 
 	this.on('contextmenu', this.onContextClick, this);
};

Ext.extend(DomAction, Ext.tree.TreeNode,{
	removeAction: function(){
		var actionSize = this.domEvent.domActions.size();
		if(actionSize<2){
			Ext.Msg.alert('提示','事件中至少要保留一个行为！');
			return false;
		}
		this.domEvent.removeAction(this);
	},
	setActionType : function(actionType){//行为类型
		this.actionType = actionType;
	},
	getActionType : function(){
		return this.actionType;
	},
	setActionConfigType : function(actionConfigType){
		this.actionConfigType = actionConfigType;
	},
	getActionConfigType : function(){
		return this.actionConfigType;
	},
	setActionClass : function(actionClass){
		this.actionClass = actionClass;
	},
	getActionClass : function(){
		if(this.actionClass==null||this.actionClass == '')
			this.actionClass = 'com.dhcc.workflow.engine.handle.TaskEventHandle';
		return this.actionClass;
	},
	setExpression : function(expression){
		this.expression = expression;
	},
	getExpression : function(){
		return this.expression;
	},
	setActionUrl : function(actionUrl){//action 的url,挂接表单
		this.actionUrl = actionUrl;
	},
	getActionUrl : function(){
		return this.actionUrl;
	},
	setActionUrlDes : function(actionUrlDes){
		this.actionUrlDes = actionUrlDes;
	},
	getActionUrlDes : function(){
		return this.actionUrlDes;
	},
	//设置右键
	onContextClick : function(node,e){
		var domTreeMenu = new Ext.menu.Menu({id : 'domTreeMenu'});
		var delActionItem = new Ext.menu.Item({text: '删除行为',iconCls: 'dom-delete'});
		if(operType=='view'){
			delActionItem.disable(); 
		}
		delActionItem.on('click',this.removeAction,this);
		domTreeMenu.add(delActionItem);
		coords = e.getXY();
    	domTreeMenu.showAt([coords[0], coords[1]]);
	},
	showProperty : function(node,e){//单击事件,如果当前是对应的event，就高亮显示行为的tab
		var formPanel = propertyPanel.propertyFormPanel;
		var eventId = formPanel.findById('eventId');
		if(eventId!=null && (this.domEvent.id == eventId.value)){//是包含这个action的event的formpanel
			var actionTab = formPanel.findById('actionTab');
			actionTab.activate('actionTab_'+this.id);
		}
	},
	valueProperty : function(formPanel){//为form赋值
		var actionType = formPanel.findById(this.id+'_actionType');
		var actionTypeValue = this.getActionType();
		actionType.setValue(actionTypeValue);
		actionType.fireEvent('select',actionType);
		//url
		var actionTab = formPanel.findById('actionTab');
		actionTab.activate('actionTab_'+this.id);
		var actionUrl = formPanel.findById(this.id+'_actionUrl');
		if(this.getActionUrl()){
			actionUrl.setValue({id:this.getActionUrl(),text:this.getActionUrlDes()});
		}
		
	},
	saveProperty : function(formPanel){//保存
		this.setText(formPanel.findById(this.id+'_actionName').getValue());
		//url
		var actionUrl = formPanel.findById(this.id+'_actionUrl').getValue();
		//alert(actionUrl);
		//alert(formPanel.findById(this.id+'_actionUrl').getRawValue());
		//alert('c');
		var actionUrlDes = formPanel.findById(this.id+'_actionUrl').getRawValue();
		this.setActionUrlDes(actionUrlDes);
		this.setActionUrl(actionUrl);
		//type
		var actionType = formPanel.findById(this.id+'_actionType').getValue();
		this.setActionType(actionType);
		if(actionType=='Handler'){
			var actionConfigType = formPanel.findById(this.id+'_actionConfigType').getValue();
			var actionClass = formPanel.findById(this.id+'_actionClass').getValue();
			this.setActionConfigType(actionConfigType);
			this.setActionClass(actionClass);
		}else if(actionType=='Expression'){
			var expression = formPanel.findById(this.id+'_actionExpression').getValue();
			this.setExpression(expression);
		}
	},
	convertDomToXML : function(jbpmDoc){//dom转为xml
		var actionEL = jbpmDoc.createElement('action');
		actionEL.setAttribute('id',this.id);
		actionEL.setAttribute('name',this.text);
		//URL
		var url = this.getActionUrl();
		if(url!=null&&url!=''){
			var regS = new RegExp("&","g");
			url = url.replace(regS,"--")
			var urlEL = jbpmDoc.createElement('url');
			urlEL.setAttribute('des',this.getActionUrlDes());
			var urlData = jbpmDoc.createCDATASection(url);
			urlEL.appendChild(urlData);
			actionEL.appendChild(urlEL);
		}
		//actionType
		var actionType = this.getActionType();
		actionEL.setAttribute('type',actionType);
		if(actionType=='Handler'){
			actionEL.setAttribute('config-type',this.getActionConfigType());
			actionEL.setAttribute('class',this.getActionClass());
		}else if(actionType=='Expression'){
			actionEL.setAttribute('expression',this.getExpression());
		}
		return actionEL;
	},
	convertXMLToDom : function(jbpmDoc){
		var id = jbpmDoc.getAttribute('id');
		var name = jbpmDoc.getAttribute('name');
		var type = jbpmDoc.getAttribute('type');
		this.id = id;
		this.setText(name);
		this.setActionType(type);
		//url
		var urls = jbpmDoc.getElementsByTagName('url');
		if(urls.length>0){
			var url = urls[0];
			this.setActionUrl(url.text);
			this.setActionUrlDes(url.getAttribute('des'));
		}
		//actionType
		if(type=='Handler'){
			this.setActionConfigType(jbpmDoc.getAttribute('config-type'));
			this.setActionClass(jbpmDoc.getAttribute('class'));
		}else if(type=='Expression'){
			this.setExpression(jbpmDoc.getAttribute('expression'));
		}
	}
});


