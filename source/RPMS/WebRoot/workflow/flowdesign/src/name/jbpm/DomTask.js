/*
 * 节点任务的dom，用于生成dom上的节点任务的节点，并放置task的属性
 */
DomTask = function(domObj) {

	this.domObj = domObj;
	//this.objType = domObj.objType+'_TASK';
    DomTask.superclass.constructor.call(this,{
    	text: '任务',
    	iconCls: 'task-icon',
    	id: domObj.id+'_task_'+domObj.getTaskAmount(),
    	expanded: true,
    	allowDrag : false,
    	allowDrop : false,
    	obj: this
    }); 
    this.eventAmount = 0;
 	this.domEvents = new Array();
 	this.variables = new Array();//任务中的变量
 	this.on('contextmenu', this.onContextClick, this);
};

Ext.extend(DomTask, Ext.tree.TreeNode,{
	addEvent : function(domEvent){
		if(domEvent==null||!domEvent.domObj){//判断是否是DomEvent对象
			domEvent = new DomEvent(this);
			domEvent.addAction();
		}
		this.appendChild(domEvent);		
		this.domEvents.add(domEvent);
		
	},
	removeEvent : function(domEvent){
		domEvent.remove();
		this.domEvents.remove(domEvent);
	},
	removeTask : function(){
		this.domObj.removeTask(this);
	},
	getEventAmount : function(){
		this.eventAmount = this.eventAmount+1;
		return this.eventAmount;
	},
	//委派人
	setAssignmentType : function(assignmentType){//委派人设置方式
		this.assignmentType = assignmentType;
	},
	getAssignmentType : function(){
		return this.assignmentType;
	},
	setAssignmentConfigType : function(assignmentConfigType){//配置类型
		this.assignmentConfigType = assignmentConfigType;
	},
	getAssignmentConfigType : function(){
		return this.assignmentConfigType;
	},
	setAssignmentClass : function(assignmentClass){//CLASS
		this.assignmentClass = assignmentClass;
	},
	getAssignmentClass : function(){
		if(this.assignmentClass==null||this.assignmentClass == '')
			this.assignmentClass = 'com.dhcc.workflow.engine.handle.TaskAssignHandle';
		return this.assignmentClass;
	},
	setAssignmentValue : function(assignmentValue){//值(非Handler)
		this.assignmentValue = assignmentValue;
	},
	getAssignmentValue : function(){
		return this.assignmentValue;
	},
	/*setAssignmentZDType : function(assignmentZDType){//指定委派人的类型 人员 部门 职位
		this.assignmentZDType = assignmentZDType;
	},
	getAssignmentZDType : function(){
		return this.assignmentZDType;
	},
	setAssignmentZDValueDes : function(assignmentZDValueDes){
		this.assignmentZDValueDes = assignmentZDValueDes;
	},
	getAssignmentZDValueDes : function(){
		return this.assignmentZDValueDes;
	},*/
	setAssignmentZDValue : function(assignmentZDValue){
		this.assignmentZDValue = assignmentZDValue;
	},
	getAssignmentZDValue : function(){
		var assignmentZDValue = this.assignmentZDValue;
		var data = []; 
		var len = assignmentZDValue?assignmentZDValue.length:0;
		for(assI=0;assI<len;assI++){
			var r = assignmentZDValue.items[assI];
			data.push([r.get('id'),r.get('name'),r.get('type')]);
		}
		return data;
		//return this.assignmentZDValue;
	},
	
	//:~委派人
	//变量
	setControllerType : function(controllerType){//变量设置方式
		this.controllerType = controllerType;
	},
	getControllerType : function(){
		return this.controllerType;
	},
	setControllerConfigType : function(controllerConfigType){//配置类型
		this.controllerConfigType = controllerConfigType;
	},
	getControllerConfigType : function(){
		return this.controllerConfigType;
	},
	setControllerClass : function(controllerClass){
		this.controllerClass = controllerClass;
	},
	getControllerClass : function(){
		return this.controllerClass;
	},
	setVariables : function(variables){
		this.variables = variables;
	},
	getVariables : function(){
		var variables = this.variables;
		var data = []; 
		var len = variables.length;
		for(valiI=0;valiI<len;valiI++){
			var r = variables.items[valiI];
			//alert(r.get('mapName'));
			data.push([r.get('name'),r.get('mapName'),r.get('read'),r.get('write'),r.get('required')]);
		}
		return data;	
	},

	//变量:~
	/*setTaskUrl : function(taskUrl){//任务的url,挂接表单
		this.taskUrl = taskUrl;
	},
	getTaskUrl : function(){
		return this.taskUrl;
	},*/
	//设置右键
	onContextClick : function(node,e){
		var domTreeMenu = new Ext.menu.Menu({id : 'domTreeMenu'});
		var delTaskItem = new Ext.menu.Item({text: '删除任务',iconCls: 'dom-delete'});
		var addEventItem = new Ext.menu.Item({text: '增加事件',iconCls: 'add-dom-event'});
		if(operType=='view'){
			delTaskItem.disable(); 
			addEventItem.disable(); 
		}
		delTaskItem.on('click',this.removeTask,this);
		addEventItem.on('click',this.addEvent,this);
		domTreeMenu.add(addEventItem);
		domTreeMenu.add(delTaskItem);
		coords = e.getXY();
    	domTreeMenu.showAt([coords[0], coords[1]]);
	},
	showProperty : function(node,e){//单击DOM树上的任务节点,展现formpanel
		var formPanel = propertyPanel.propertyFormPanel;
		var taskId = formPanel.findById('taskId');
		if(taskId&&taskId.value == node.id) return;
		propertyPanel.taskClick(this);
		this.valueProperty(formPanel);//赋值
	},
	valueProperty : function(formPanel){//为form赋值
	
		var assignmentType = formPanel.findById('assignmentType');
		var assTypeValue = this.getAssignmentType();
		assignmentType.setValue(assTypeValue);
		assignmentType.fireEvent('select',assignmentType);
		
		//var assignmentZDType = formPanel.findById('assignmentZDType');
		//if(assignmentZDType) assignmentZDType.fireEvent('select',assignmentZDType);
		
		var controllerType = formPanel.findById('controllerType');
		var conTypeValue = this.getControllerType();
		controllerType.setValue(conTypeValue);
		controllerType.fireEvent('select',controllerType);
	},
	saveProperty : function(formPanel){//保存
		//alert(this);
		//委派设置
		var assignmentType = formPanel.findById('assignmentType').getValue();
		this.setAssignmentType(assignmentType);
		if(assignmentType=='Handler'){
			var assignmentConfigType = formPanel.findById('assignmentConfigType').getValue();
			var assignmentClass = formPanel.findById('assignmentClass').getValue();
			
			//var assignmentZDType = formPanel.findById('assignmentZDType').getValue();
			
			this.setAssignmentConfigType(assignmentConfigType);
			this.setAssignmentClass(assignmentClass);
			
			var assignmentZDGrid = formPanel.findById('assignmentZDGrid');
			var assignmentZDValues = assignmentZDGrid.getStore().data;
			this.setAssignmentZDValue(assignmentZDValues);
			//this.setAssignmentZDType(assignmentZDType);
			
			//if(formPanel.findById('assignmentZDValue')){
			//	var assignmentZDValue = formPanel.findById('assignmentZDValue').getValue();
			//	var assignmentZDValueDes = formPanel.findById('assignmentZDValue').getRawValue();
			//	this.setAssignmentZDValue(assignmentZDValue);
			//	this.setAssignmentZDValueDes(assignmentZDValueDes);
			//}

		}else if(assignmentType == 'Pooled Actors'){
			var assignmentZDGrid = formPanel.findById('assignmentZDGrid');
			var assignmentZDValues = assignmentZDGrid.getStore().data;
			this.setAssignmentZDValue(assignmentZDValues);
			
			
			
			//var assignmentZDType = formPanel.findById('assignmentZDType').getValue();
			//this.setAssignmentZDType(assignmentZDType);
			
			//if(formPanel.findById('assignmentZDValue')){
				//var assignmentZDValue = formPanel.findById('assignmentZDValue').getValue();
				//var assignmentZDValueDes = formPanel.findById('assignmentZDValue').getRawValue();
				
				//this.setAssignmentZDValue(assignmentZDValue);
				//this.setAssignmentZDValueDes(assignmentZDValueDes);
			//}
			
		}else if(assignmentType!=''){
			var assignmentValue = formPanel.findById('assignmentValue').getValue();
			this.setAssignmentValue(assignmentValue);
		}
		//url
		//var taskURL = formPanel.findById('taskURL').getValue();
		//this.setTaskUrl(taskURL);
		//controller
		var controllerType = formPanel.findById('controllerType').getValue();
		this.setControllerType(controllerType);
		if(controllerType=='Default'){//grid
			var controllerGrid = formPanel.findById('controllerGrid');
			var variables = controllerGrid.getStore().data;
			this.setVariables(variables);
		}else if(controllerType == 'Custom'){
			var controllerConfigType = formPanel.findById('controllerConfigType').getValue();
			var controllerClass = formPanel.findById('controllerClass').getValue();
			this.setControllerConfigType(controllerConfigType);
			this.setControllerClass(controllerClass);
		}
	},
	convertDomToXML : function(jbpmDoc){
		var taskEL = jbpmDoc.createElement('task');
		taskEL.setAttribute('id',this.id);
		taskEL.setAttribute('name',this.text);
		//assignment
		var assType = this.getAssignmentType();
		if(assType!=null&&assType!=''){
			var assEl = jbpmDoc.createElement('assignment');
			assEl.setAttribute('type',assType);
			if(assType=='Handler'){
				assEl.setAttribute('config-type',this.getAssignmentConfigType());
				assEl.setAttribute('class',this.getAssignmentClass());
				
				var assignmentZDValue = this.getAssignmentZDValue();
				var paValue='',paDes='';
				for(assk=0;assk<assignmentZDValue.length;assk++){//0-id;1-name;2-type
					paValue += assignmentZDValue[assk][2]+':'+assignmentZDValue[assk][0]+',';
					paDes += assignmentZDValue[assk][1]+',';
				}
				if(!paValue==''){
					var assElZD = jbpmDoc.createElement('actors');
					assElZD.text = paValue.substring(0,paValue.length-1);
					assElZD.setAttribute('paDes',paDes.substring(0,paDes.length-1));
					assEl.appendChild(assElZD);
				}
				
				//if(this.getAssignmentZDType()!=null&&this.getAssignmentZDValue()!=null){
				//	var assElZD = jbpmDoc.createElement('actors');
				//	assElZD.text = this.getAssignmentZDType()+':'+this.getAssignmentZDValue();
				//	assElZD.setAttribute('paDes',this.getAssignmentZDValueDes());
				//	assEl.appendChild(assElZD);
				//}	
			}else if(assType=='Actor'){
				assEl.setAttribute('actor-id',this.getAssignmentValue());
			}else if(assType=='Expression'){
				assEl.setAttribute('expression',this.getAssignmentValue());
			}else if(assType=='Pooled Actors'){
				var assignmentZDValue = this.getAssignmentZDValue();
				var paValue=' ',paDes=' ';
				for(assk=0;assk<assignmentZDValue.length;assk++){//0-id;1-name;2-type
					paValue += assignmentZDValue[assk][2]+':'+assignmentZDValue[assk][0]+',';
					paDes += assignmentZDValue[assk][1]+',';
				}
				if(!paValue==''){
					assEl.setAttribute('pooled-actors',paValue.substring(0,paValue.length-1));
					assEl.setAttribute('paDes',paDes.substring(0,paDes.length-1));
				}
				//if(this.getAssignmentZDType()&&this.getAssignmentZDValue()){
				//	assEl.setAttribute('pooled-actors',this.getAssignmentZDType()+':'+this.getAssignmentZDValue());
				//	assEl.setAttribute('paDes',this.getAssignmentZDValueDes());
				//}
			}
			taskEL.appendChild(assEl);
		}
		//controller
		var conType = this.getControllerType();
		if(conType!=null&&conType!=''){
			var conEl = jbpmDoc.createElement('controller');
			conEl.setAttribute('type',conType);
			if(conType!=null&&conType!=''){
				if(conType=='Custom'){				
					conEl.setAttribute('config-type',this.getControllerConfigType());
					conEl.setAttribute('class',this.getControllerClass());
				}else if(conType=='Default'){
					var variables = this.getVariables();
					for(k=0;k<variables.length;k++){
						var variableEl = jbpmDoc.createElement('variable');
						var access = '';
						if(variables[k][2]) access = access+'read,';
						if(variables[k][3]) access = access+'write,';
						if(variables[k][4]) access = access+'required,';
						variableEl.setAttribute('name',variables[k][0]);
						if(access.length>0)
							access = access.substring(0,access.length-1);
						variableEl.setAttribute('access',access);
						conEl.appendChild(variableEl);
					}
				}
			}
			var variables = this.getVariables();
			taskEL.appendChild(conEl);
		}
		//events
		for(k=0;k<this.domEvents.size();k++){
			var eventEL = this.domEvents.get(k).convertDomToXML(jbpmDoc);
			taskEL.appendChild(eventEL);
		}
		return taskEL;
	},
	convertXMLToDom : function(jbpmDoc,path){
		var id = jbpmDoc.getAttribute('id');
		var path = path+"/task[@id='"+id +"']";
		var name = jbpmDoc.getAttribute('name');
		this.id = id;
		this.setText(name);
		//assignment
		var assignments = jbpmDoc.getElementsByTagName('assignment');
		if(assignments.length>0){
			var assignment = assignments[0];
			var assType = assignment.getAttribute('type');
			this.setAssignmentType(assType);
			if(assType=='Handler'){
				this.setAssignmentConfigType(assignment.getAttribute('config-type'));
				this.setAssignmentClass(assignment.getAttribute('class'));
				var actorsDoc = jbpmDoc.selectSingleNode(path+'/assignment/actors');
				if(actorsDoc){
					var paValue = actorsDoc.text;
					var paDes = actorsDoc.getAttribute('paDes');
					if(paValue!=null&&paValue!=''){
						var paValueAry = paValue.split(',');
						var paDesAry = paDes.split(',');
						var data = [];
						for(assK=0;assK<paValueAry.length;assK++){
							var paValueTemp = paValueAry[assK];
							data.push([paValueTemp.split(':')[1],paDesAry[assK],paValueTemp.split(':')[0]]);
						}
						var ds = new Ext.data.SimpleStore({
					    	fields: ['id','name','type'],
					        data: data
					    });
						this.setAssignmentZDValue(ds.data);
					}
				}
			}else if(assType=='Actor'){
				this.setAssignmentValue(assignment.getAttribute('actor-id'));
			}else if(assType=='Expression'){
				this.setAssignmentValue(assignment.getAttribute('expression'));
			}else if(assType=='Pooled Actors'){
				var paValue = assignment.getAttribute('pooled-actors');
				var paDes = assignment.getAttribute('paDes');
				if(paValue!=null&&paValue!=''){
					var paValueAry = paValue.split(',');
					var paDesAry = paDes.split(',');
					var data = [];
					for(assK=0;assK<paValueAry.length;assK++){
						var paValueTemp = paValueAry[assK];
						data.push([paValueTemp.split(':')[1],paDesAry[assK],paValueTemp.split(':')[0]]);
					}
					var ds = new Ext.data.SimpleStore({
				    	fields: ['id','name','type'],
				        data: data
				    });
					this.setAssignmentZDValue(ds.data);
					//this.setAssignmentZDType(pa.split(':')[0]);
					//this.setAssignmentZDValue(pa.split(':')[1]);
					           
				}
				//this.setAssignmentZDValueDes(assignment.getAttribute('paDes'));
			}
		}
		//controller
		var controllers = jbpmDoc.getElementsByTagName('controller');
		if(controllers.length>0){
			var controller = controllers[0];
			var conType = controller.getAttribute('type');
			this.setControllerType(conType);
			if(conType=='Custom'){	
				this.setControllerConfigType(controller.getAttribute('config-type'));	
				this.setControllerClass(controller.getAttribute('class'));		
			}else if(conType=='Default'){
				var variables = controller.getElementsByTagName('variable');
				var data = [];
				for(k=0;k<variables.length;k++){
					var variable = variables[k];
					var variableName = variable.getAttribute('name');
					//var variableMapName = variable.getAttribute('name');
					var access = variable.getAttribute('access');
					var read = false;
					var write = false;
					var required = false;
					var accessAry = access.split(',');
					for(p=0;p<accessAry.length;p++){
						if('read'==accessAry[p]) read = true;
						if('write'==accessAry[p]) write = true;
						if('required'==accessAry[p]) required = true;
					}
					data.push([variableName,'',read,write,required]);
				}
				var ds = new Ext.data.SimpleStore({
			    	fields: [{name: 'name'},{name: 'mapName'},{name: 'read',type: 'bool'},{name: 'write',type: 'bool'},{name: 'required',type: 'bool'}],
			        data: data
			    });
				this.setVariables(ds.data);
			}
		}
		//events
		var events = jbpmDoc.getElementsByTagName('event');
		for(k= 0;k<events.length;k++){
			var event = events[k];
			var domEvent = new DomEvent(this);
			domEvent.convertXMLToDom(event);
			this.addEvent(domEvent);
		}
	}
});

