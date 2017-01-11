
/**
 * <p>Title:  </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function FlowModelConverter() {
}

//
FlowModelConverter.convertModelToXML = function (model) {
    var doc = XMLDocument.newDomcument();

	//root
    var workflowProcessNode = doc.createElement(FlowModelConverter.NODE_ROOT);
    doc.documentElement = workflowProcessNode;
	
    //
    var activitiesNode = doc.createElement(FlowModelConverter.NODE_ACTIVITIES);
    workflowProcessNode.appendChild(activitiesNode);

    //metaNodes
    var metaNodeModels = model.getMetaNodeModels();
    for (var i = 0; i < metaNodeModels.size(); i++) {
        var metaNodeModel = metaNodeModels.get(i);
  
        var activitieNode = FlowModelConverter.convertMetaNodeModelToXML(metaNodeModel, doc);
        activitiesNode.appendChild(activitieNode);
    }
    
    //
    var transitionsNode = doc.createElement(FlowModelConverter.NODE_TRANSITIONS);
    workflowProcessNode.appendChild(transitionsNode);

    //
    var transitionModels = model.getTransitionModels();
    for (var i = 0; i < transitionModels.size(); i++) {
        var transitionModel = transitionModels.get(i);
        var transitionNode = FlowModelConverter.convertTransitionModelToXML(transitionModel, doc);
        transitionsNode.appendChild(transitionNode);
    }

    //
    return doc;
};
FlowModelConverter.convertMetaNodeModelToXML = function (metaNodeModel, doc) {
    var activitieNode = doc.createElement(FlowModelConverter.NODE_ACTIVITIE);

    //
    activitieNode.setAttribute(FlowModelConverter.ATTR_ACTIVITIE_ID, metaNodeModel.getID());
    activitieNode.setAttribute(FlowModelConverter.ATTR_ACTIVITIE_TYPE, metaNodeModel.type);
    activitieNode.setAttribute(FlowModelConverter.ATTR_ACTIVITIE_NAME, metaNodeModel.getText());
    activitieNode.setAttribute(FlowModelConverter.ATTR_ACTIVITIE_X_COORD, metaNodeModel.getPosition().getX());
    activitieNode.setAttribute(FlowModelConverter.ATTR_ACTIVITIE_Y_COORD, metaNodeModel.getPosition().getY());
    activitieNode.setAttribute(FlowModelConverter.ATTR_ACTIVITIE_WIDTH, metaNodeModel.getSize().getWidth());
    activitieNode.setAttribute(FlowModelConverter.ATTR_ACTIVITIE_HEIGHT, metaNodeModel.getSize().getHeight());

    //
    return activitieNode;
};
FlowModelConverter.convertTransitionModelToXML = function (transitionModel, doc) {
    var transitionNode = doc.createElement(FlowModelConverter.NODE_TRANSITION);

    //
    transitionNode.setAttribute(FlowModelConverter.ATTR_TRANSITION_ID, transitionModel.getID());
    transitionNode.setAttribute(FlowModelConverter.ATTR_TRANSITION_NAME, transitionModel.getText());
    transitionNode.setAttribute(FlowModelConverter.ATTR_TRANSITION_FROM, transitionModel.getFromMetaNodeModel().getID());
    transitionNode.setAttribute(FlowModelConverter.ATTR_TRANSITION_TO, transitionModel.getToMetaNodeModel().getID());
    transitionNode.setAttribute(FlowModelConverter.ATTR_TRANSITION_POINTS, transitionModel.getPoints());////

    //
    return transitionNode;
};
//LINGZJ 生成jbpm的xml文件
FlowModelConverter.convertModelToJBPMXML = function(model){
	var jbpmDoc = XMLDocument.newDomcument();
	jbpmDoc = propertyPanel.convertDomToXML(jbpmDoc);
	return jbpmDoc;
}
FlowModelConverter.handleNodeTpe = function(nodeType){
	var elementNode;
	//判断节点类型
	switch (nodeType) {
      case 'START_NODE':
      	elementNode = FlowModelConverter.WORKFLOW_START_NODE;
        break;
      case 'DECISION_NODE':
      	elementNode = FlowModelConverter.WORKFLOW_DECISION_NODE;
        break;
      case 'END_NODE':
      	elementNode = FlowModelConverter.WORKFLOW_END_NODE;
        break;
      case 'FORK_NODE':
      	elementNode = FlowModelConverter.WORKFLOW_FORK_NODE;
        break;
      case 'JOIN_NODE':
      	elementNode = FlowModelConverter.WORKFLOW_JOIN_NODE;
        break;
      case 'NODE':
      	elementNode = FlowModelConverter.WORKFLOW_NODE;
        break;
    }
    return elementNode;
}
FlowModelConverter.convertMetaNodeModelToJBPMXML = function(metaNodeModel,jbpmDoc,Ext){
	var nodeID = metaNodeModel.getID();
	//节点的tabpanel
	var cesouthPropertiesTabPanel = Ext.getCmp('cesouthPropertiesTabPanel_'+nodeID);
	//节点属性的panel
	var nodePropertiesPanel = cesouthPropertiesTabPanel.findById('nodePropertiesPanel_'+nodeID);
	//节点类型
	var nodeType = nodePropertiesPanel.getSource()['类型'];
	var elementNode = FlowModelConverter.handleNodeTpe(nodeType);
	var activitieNode = jbpmDoc.createElement(elementNode);
	activitieNode.setAttribute(FlowModelConverter.WORKFLOW_NODE_ID,nodePropertiesPanel.getSource()['ID']);
	activitieNode.setAttribute(FlowModelConverter.WORKFLOW_NODE_NAME,nodePropertiesPanel.getSource()['名称']);
	//如果是判断节点，那么还要置入 handler和expression属性
	if(nodeType=='DECISION_NODE'){
		activitieNode.setAttribute(FlowModelConverter.WORKFLOW_DECISION_NODE_HANDLER,nodePropertiesPanel.getSource()['Handler']);
		activitieNode.setAttribute(FlowModelConverter.WORKFLOW_DECISION_NODE_EXPRESSION,nodePropertiesPanel.getSource()['Expression']);
	}
	//节点下的任务
	//var tasks = cesouthPropertiesTabPanel.findByType('tabpanel');
	var tasks = cesouthPropertiesTabPanel.items;
	for(var i=0;i<tasks.length;i++){
		var task = tasks.items[i];
		var taskID = window.parent.getNodeIdByPanelId(task.getId());
		if(taskID==nodeID) continue;
		var taskElement = jbpmDoc.createElement(FlowModelConverter.WORKFLOW_TASK);
		//任务中的事件
		//var events = task.findByType('tabpanel');
		var events = task.items;
		for(j=0;j<events.length;j++){
			var event = events.items[j];
			var eventID = window.parent.getNodeIdByPanelId(event.getId());
			if(eventID==taskID){
				//任务的基本属性
				var taskProperties = task.findById('nodeTaskPropertyGrid_'+taskID);
				taskElement.setAttribute(FlowModelConverter.WORKFLOW_TASK_ID,taskID);
				taskElement.setAttribute(FlowModelConverter.WORKFLOW_TASK_NAME,taskProperties.getSource()['名称']);
				var taskAssignmentElement = jbpmDoc.createElement(FlowModelConverter.WORKFLOW_TASK_ASSIGNMENT);
				//根据委派类型控制属性
				var assignmentType = taskProperties.getSource()['委派类型'];
				taskAssignmentElement.setAttribute(FlowModelConverter.WORKFLOW_TASK_ASSIGNMENT_TYPE,assignmentType);
				if(assignmentType=='Handler'){
					taskAssignmentElement.setAttribute(FlowModelConverter.WORKFLOW_TASK_ASSIGNMENT_CLASSNAME,taskProperties.getSource()['委派CLASS']);
					taskAssignmentElement.setAttribute(FlowModelConverter.WORKFLOW_TASK_ASSIGNMENT_CONFIGTYPE,taskProperties.getSource()['委派配置类型']);
				}else if(assignmentType=='Pooled Actors'){
					taskAssignmentElement.setAttribute('pooled-actors',window.parent.getAppointAss(taskID));//taskProperties.getSource()['指定委派人']
					taskAssignmentElement.setAttribute('appointAss',taskProperties.getSource()['指定委派人']);
				}else if(assignmentType=='Swimlane'){
					taskAssignmentElement.setAttribute('swimlane',window.parent.getAppointAss(taskID));
					taskAssignmentElement.setAttribute('appointAss',taskProperties.getSource()['指定委派人']);
				}else if(assignmentType=='Actor'){
					taskAssignmentElement.setAttribute('actor-id',window.parent.getAppointAss(taskID));
					taskAssignmentElement.setAttribute('appointAss',taskProperties.getSource()['指定委派人']);
				}else if(assignmentType=='Expression'){
					taskAssignmentElement.setAttribute('expression',window.parent.getAppointAss(taskID));
					taskAssignmentElement.setAttribute('appointAss',taskProperties.getSource()['指定委派人']);
				}
				//:~
				
				taskElement.appendChild(taskAssignmentElement);
				var taskControllerElement = jbpmDoc.createElement(FlowModelConverter.WORKFLOW_TASK_CONTROLLER);
				var taskControllerVariableElement = jbpmDoc.createElement(FlowModelConverter.WORKFLOW_TASK_CONTROLLER_VARIABLE);
				taskControllerVariableElement.setAttribute(FlowModelConverter.WORKFLOW_TASK_CONTROLLER_VARIABLE_NAME,taskProperties.getSource()['ControllerName']);
				taskControllerVariableElement.setAttribute(FlowModelConverter.WORKFLOW_TASK_CONTROLLER_VARIABLE_ACCESS,taskProperties.getSource()['ControllerAccess']);
				taskControllerElement.appendChild(taskControllerVariableElement);
				taskElement.appendChild(taskControllerElement);
				continue;
			}
			//事件基本属性
			var eventElement = jbpmDoc.createElement(FlowModelConverter.WORKFLOW_EVENT);
			//var eventProperties = event.findById('nodeTaskEventPropertyGrid_'+eventID);

			//事件中的行为
			//var actions = event.findByType('propertygrid');
			var actions = event.items;
			for(k=0;k<actions.length;k++){
				var action = actions.items[k];
				var actionID = window.parent.getNodeIdByPanelId(action.getId());
				if(actionID==eventID){
					var eventProperties = event.findById('nodeTaskEventPropertyGrid_'+eventID);
					eventElement.setAttribute(FlowModelConverter.WORKFLOW_EVENT_ID,eventID);
					eventElement.setAttribute(FlowModelConverter.WORKFLOW_EVENT_TYPE,eventProperties.getSource()['事件类型']);
					continue;
				}
				//行为属性
				var actionProperties = action.findById('nodeTaskEventActionGrid_'+actionID);
				var actionElement = jbpmDoc.createElement(FlowModelConverter.WORKFLOW_ACTION);
				actionElement.setAttribute(FlowModelConverter.WORKFLOW_ACTION_ID,actionID);
				//不同类型的行为的xml
				var actionType = action.getSource()['行为类型'];
				actionElement.setAttribute(FlowModelConverter.WORKFLOW_ACTION_TYPE,actionType);
				if(actionType=='Handler'){
					actionElement.setAttribute(FlowModelConverter.WORKFLOW_ACTION_CLASSNAME,action.getSource()['行为CLASS']);
					actionElement.setAttribute(FlowModelConverter.WORKFLOW_ACTION_CONFIGTYPE,action.getSource()['行为配置类型']);				
				}else{
					actionElement.setAttribute('expression',action.getSource()['Expression']);
				}
				//:~
				

				var actionUrlElement = jbpmDoc.createElement(FlowModelConverter.WORKFLOW_ACTION_URL);
				//用正则表达式替换特殊符号
				var urlString = action.getSource()['URL'];
				var regS = new RegExp("&","g");
				urlString = urlString.replace(regS,"--")
				//:~
				var actionUrl = jbpmDoc.createCDATASection(urlString);
				actionUrlElement.appendChild(actionUrl);
				
				//actionUrlElement.text="aaa";//<![CDATA["+action.getSource()['URL']+"]]>
				//alert("1  "+actionUrlElement.text);
				actionElement.appendChild(actionUrlElement);
				
				eventElement.appendChild(actionElement);
			}
			taskElement.appendChild(eventElement);
		}
		activitieNode.appendChild(taskElement);
	}
	//alert("3  "+activitieNode.xml);
	return activitieNode;
	
}
//:~
//lingzj加入rep参数
FlowModelConverter.convertXMLToModel = function (doc,initModel,rep) {
    if (!doc) {
        return null;
    }
    var model = initModel;
    if (!model) {
        model = new FlowModel();
    }


	    var activitieNodes = doc.getElementsByTagName("Activitie");
	    //alert(rep);
	    for (var i = 0; i < activitieNodes.length; i++) {
	        var activitieNode = activitieNodes[i];
	        //lingzj rep
	        //if(rep==1){
		     //   if(i<2)
		    //   	activitieNode.setAttribute("flag",1);
	       //	}
	       //lingzj 加入工作流再现标记
	        var metaNodeModel = FlowModelConverter.convertXMLToMetaNodeModel(activitieNode);
	        
	        model.addMetaNodeModel(metaNodeModel);
	       
	    }
	
	    //
	    var transitionNodes = doc.getElementsByTagName("Transition");
	    for (var i = 0; i < transitionNodes.length; i++) {
	        var transitionNode = transitionNodes[i];
	        //transitionNode.setAttribute("flag",1);
	        var transitionModel = FlowModelConverter.convertXMLToTransitionModel(transitionNode, model);
	        model.addTransitionModel(transitionModel);
	    }

    //
    return model;
};
//lingzj 解析工作流定义xml的方法
FlowModelConverter.convertXMLToTabs = function (doc) {
    if (!doc) {
        alert('未能获得指定文件，请与管理员联系');
    }
    propertyPanel.convertXMLToDom(doc)

		
};
//解析节点
FlowModelConverter.convertNode = function(ntype,flowObj){
		var elementNode = FlowModelConverter.handleNodeTpe(ntype);
		var Ext = window.parent.Ext;
		var domTree = Ext.getCmp('domPanel');
		//节点
	    var nodeObj = flowObj.getElementsByTagName(elementNode);
	    for(j=0;j<nodeObj.length;j++){
	    	var nodeID = nodeObj[j].getAttribute(FlowModelConverter.WORKFLOW_NODE_ID);
		    var nodeName = nodeObj[j].getAttribute(FlowModelConverter.WORKFLOW_NODE_NAME);
		    //判断节点
		    var nodeHandler='';
		    var nodeExpression='';
		    if(ntype=='DECISION_NODE'){
		    	nodeHandler=nodeObj[j].getAttribute(FlowModelConverter.WORKFLOW_DECISION_NODE_HANDLER);
		    	nodeExpression=nodeObj[j].getAttribute(FlowModelConverter.WORKFLOW_DECISION_NODE_EXPRESSION);
		    }
		    window.parent.addNode(nodeID,nodeName,ntype,nodeHandler,nodeExpression);
		    //任务
		    var treeNode = domTree.getNodeById(nodeID);
		    var nodeTaskObj = nodeObj[j].getElementsByTagName(FlowModelConverter.WORKFLOW_TASK);
		    for(k=0;k<nodeTaskObj.length;k++){
		    	var nodeTaskID = nodeTaskObj[k].getAttribute(FlowModelConverter.WORKFLOW_TASK_ID);
		    	var nodeTaskName = nodeTaskObj[k].getAttribute(FlowModelConverter.WORKFLOW_TASK_NAME);
		    	window.parent.addNodeTask(treeNode);
		    	//taskPanel
		    	//var nodeTaskPanel = Ext.getCmp('nodeTaskPanel_'+nodeTaskID);
		    	var nodeTaskPropertyGrid = Ext.getCmp('nodeTaskPropertyGrid_'+nodeTaskID); 
		    	//Assignment
		    	var nodeTaskAssignmentObj = nodeTaskObj[k].getElementsByTagName(FlowModelConverter.WORKFLOW_TASK_ASSIGNMENT);
		    	for(r=0;r<nodeTaskAssignmentObj.length;r++){
		    		var nodeTaskAssignmentType = nodeTaskAssignmentObj[r].getAttribute(FlowModelConverter.WORKFLOW_TASK_ASSIGNMENT_TYPE);
		    		
		    		nodeTaskPropertyGrid.store.getById('名称').set('value',nodeTaskName);
		    		nodeTaskPropertyGrid.store.getById('委派类型').set('value',nodeTaskAssignmentType);
		    		
		    		//根据委派类型，确定委派信息
					if(nodeTaskAssignmentType=='Handler'){
						var nodeTaskAssignmentClassName = nodeTaskAssignmentObj[r].getAttribute(FlowModelConverter.WORKFLOW_TASK_ASSIGNMENT_CLASSNAME);
		    			var nodeTaskAssignmentConfigType = nodeTaskAssignmentObj[r].getAttribute(FlowModelConverter.WORKFLOW_TASK_ASSIGNMENT_CONFIGTYPE);
						nodeTaskPropertyGrid.store.getById('委派CLASS').set('value',nodeTaskAssignmentClassName);
		    			nodeTaskPropertyGrid.store.getById('委派配置类型').set('value',nodeTaskAssignmentConfigType);
					}else if(nodeTaskAssignmentType=='Pooled Actors'){
						nodeTaskPropertyGrid.store.getById('指定委派人').set('value',nodeTaskAssignmentObj[r].getAttribute('appointAss'));
						var appointAss = nodeTaskAssignmentObj[r].getAttribute('pooled-actors');
						appointAss = appointAss.substr(appointAss.indexOf(':')+1);
						window.parent.setComboValue('appointAssignment'+nodeTaskID,appointAss);
					}else if(nodeTaskAssignmentType=='Swimlane'){
						nodeTaskPropertyGrid.store.getById('指定委派人').set('value',nodeTaskAssignmentObj[r].getAttribute('appointAss'));
						var appointAss = nodeTaskAssignmentObj[r].getAttribute('swimlane');
						appointAss = appointAss.substr(appointAss.indexOf(':')+1);
						window.parent.setComboValue('appointAssignment'+nodeTaskID,appointAss);
					}else if(nodeTaskAssignmentType=='Actor'){
						nodeTaskPropertyGrid.store.getById('指定委派人').set('value',nodeTaskAssignmentObj[r].getAttribute('appointAss'));
						var appointAss = nodeTaskAssignmentObj[r].getAttribute('actor-id');
						appointAss = appointAss.substr(appointAss.indexOf(':')+1);
						window.parent.setComboValue('appointAssignment'+nodeTaskID,appointAss);
					}else if(nodeTaskAssignmentType=='Expression'){
						nodeTaskPropertyGrid.store.getById('指定委派人').set('value',nodeTaskAssignmentObj[r].getAttribute('appointAss'));
						var appointAss = nodeTaskAssignmentObj[r].getAttribute('Expression');
						appointAss = appointAss.substr(appointAss.indexOf(':')+1);
						window.parent.setComboValue('appointAssignment'+nodeTaskID,appointAss);
					}
		    		//:~
		    	}
		    	//Controller
		    	var nodeTaskControllerObjs = nodeTaskObj[k].getElementsByTagName(FlowModelConverter.WORKFLOW_TASK_CONTROLLER);
		    	for(g=0;g<nodeTaskControllerObjs.length;g++){
					var nodeTaskControllerVariableObjs = nodeTaskControllerObjs[g].getElementsByTagName(FlowModelConverter.WORKFLOW_TASK_CONTROLLER_VARIABLE);
					for(h=0;h<nodeTaskControllerVariableObjs.length;h++){
						var nodeTaskControllerVariableObj = nodeTaskControllerVariableObjs[g];
						var nodeTaskControllerVariableObjName = nodeTaskControllerVariableObj.getAttribute(FlowModelConverter.WORKFLOW_TASK_CONTROLLER_VARIABLE_NAME);
						var nodeTaskControllerVariableObjAccess = nodeTaskControllerVariableObj.getAttribute(FlowModelConverter.WORKFLOW_TASK_CONTROLLER_VARIABLE_ACCESS);
						nodeTaskPropertyGrid.store.getById('ControllerName').set('value',nodeTaskControllerVariableObjName);
		    			nodeTaskPropertyGrid.store.getById('ControllerAccess').set('value',nodeTaskControllerVariableObjAccess);
			    	}
		    	}
		    	//:~
		    	
		    	//事件
		    	var treeNodeTask = domTree.getNodeById(nodeTaskID);
		    	var nodeTaskEventObj = nodeTaskObj[k].getElementsByTagName(FlowModelConverter.WORKFLOW_EVENT);
		    	for(m=0;m<nodeTaskEventObj.length;m++){
		    		var nodeTaskEventID = nodeTaskEventObj[m].getAttribute(FlowModelConverter.WORKFLOW_EVENT_ID);
		    		var nodeTaskEventType = nodeTaskEventObj[m].getAttribute(FlowModelConverter.WORKFLOW_EVENT_TYPE);
		    		window.parent.addNodeTaskEvent(treeNodeTask);
		    		//eventPanel
		    		var nodeTaskEventPanel = Ext.getCmp('nodeTaskEventPanel_'+nodeTaskEventID);
		    		var nodeTaskEventPropertyGrid = nodeTaskEventPanel.findById('nodeTaskEventPropertyGrid_'+nodeTaskEventID);
		    		nodeTaskEventPropertyGrid.store.getById('事件类型').set('value',nodeTaskEventType);
		    		//行为
		    		var treeNodeTaskEvent = domTree.getNodeById(nodeTaskEventID);
		    		var nodeTaskEventActionObj = nodeTaskEventObj[m].getElementsByTagName(FlowModelConverter.WORKFLOW_ACTION);
		    		for(n=0;n<nodeTaskEventActionObj.length;n++){
		    			var nodeTaskEventActionID = nodeTaskEventActionObj[n].getAttribute(FlowModelConverter.WORKFLOW_ACTION_ID);
		    			var nodeTaskEventActionType = nodeTaskEventActionObj[n].getAttribute(FlowModelConverter.WORKFLOW_ACTION_TYPE);
		    			
		    			window.parent.addNodeTaskEventAction(treeNodeTaskEvent);
		    			var nodeTaskEventActionGrid = nodeTaskEventPanel.findById('nodeTaskEventActionGrid_'+nodeTaskEventActionID);
		    			nodeTaskEventActionGrid.store.getById('行为类型').set('value',nodeTaskEventActionType);
		    			//根绝行为类型，解析行为
		    			if(nodeTaskEventActionType=='Handler'){
			    			var nodeTaskEventActionClassName = nodeTaskEventActionObj[n].getAttribute(FlowModelConverter.WORKFLOW_ACTION_CLASSNAME);
			    			var nodeTaskEventActionConfigType = nodeTaskEventActionObj[n].getAttribute(FlowModelConverter.WORKFLOW_ACTION_CONFIGTYPE);
		    				nodeTaskEventActionGrid.store.getById('行为CLASS').set('value',nodeTaskEventActionClassName);
		    				nodeTaskEventActionGrid.store.getById('行为配置类型').set('value',nodeTaskEventActionConfigType);
		    			}else{
		    				nodeTaskEventActionGrid.store.getById('Expression').set('value',nodeTaskEventActionObj[n].getAttribute('expression'));
		    			}
		    			
		    			//URL
		    			var nodeTaskEventActionUrlObjs = nodeTaskEventActionObj[n].getElementsByTagName(FlowModelConverter.WORKFLOW_ACTION_URL);
		    			for(z=0;z<nodeTaskEventActionUrlObjs.length;z++){
		    				var nodeTaskEventActionUrlObj = nodeTaskEventActionUrlObjs[z];
		    				
		    				//用正则表达式替换特殊符号
							var urlString = nodeTaskEventActionUrlObj.text;
							//var regS = new RegExp("--","g");
							//urlString = urlString.replace(regS,"&")
							//:~
		    				nodeTaskEventActionGrid.store.getById('URL').set('value',urlString);
		    			}
		    		}
		    	}
		    }
		    //连线 addTransition
		    var nodeTransitionObj = nodeObj[j].getElementsByTagName(FlowModelConverter.WORKFLOW_TRANSITION);
		    for(s=0;s<nodeTransitionObj.length;s++){
		    	
				var nodeTransitionID = nodeTransitionObj[s].getAttribute(FlowModelConverter.WORKFLOW_TRANSITION_ID);
				//var transitionModel = wrapper.getModel().getMetaTranModelById(nodeTransitionID);
				//alert(wrapper.getModel());
				window.parent.addTransition(nodeTransitionID,nodeID);
				var nodeTransitionName = nodeTransitionObj[s].getAttribute(FlowModelConverter.WORKFLOW_TRANSITION_NAME);
				var transitionTaskPanel = Ext.getCmp('nodeTaskPanel_'+nodeTransitionID);
				transitionTaskPanel.store.getById('名称').set('value',nodeTransitionName);
				
				
				
				var nodeTransitionDes = nodeTransitionObj[s].getElementsByTagName(FlowModelConverter.WORKFLOW_TRANSITION_DESCRIPTION)[0];
				if(nodeTransitionDes!=null){
					var nodeTransitionDescription = nodeTransitionDes.text;				
					//处理description的url
					var strPos = nodeTransitionDescription.indexOf('stateCode');
					if(strPos>0){
						var nodeTransitionState = nodeTransitionDes.getAttribute('transtate');
						var nodeTransitionStateName = nodeTransitionDes.getAttribute('transtatename');
						transitionTaskPanel.store.getById('迁移URL').set('value',nodeTransitionDescription.substr(0,strPos-1));
						window.parent.setComboValue('transtatecombo'+nodeTransitionID,nodeTransitionState);
						//alert(nodeTransitionState+"    "+nodeTransitionStateName);
						transitionTaskPanel.store.getById('状态').set('value',nodeTransitionStateName);
					}else
						transitionTaskPanel.store.getById('迁移URL').set('value',nodeTransitionDescription);
				}
				//:~
		    }
	    }
	    //name

};
//解析连接线
FlowModelConverter.convertTran = function(tasknode){
	var transitions = tasknode.getElementsByTagName("transition");
	for(m=0;m<transitions.length;m++){
		var tntranname = transitions[m].getAttribute("name");
	    var tntranid = transitions[m].getAttribute("id");
	    var tntranfrom = transitions[m].getAttribute("from");
	    var tntranto = transitions[m].getAttribute("to");
	    var tntranfromid = transitions[m].getAttribute("fromid");
	    var tntrantoid = transitions[m].getAttribute("toid");
		window.parent.addTabTran(tntranid,tntranfrom,tntranto,tntranfromid,tntrantoid);
		window.parent.nodetabs.getComponent(tntranid).getComponent("tid_"+tntranid).setValue(tntranname);
	}
};
//解析节点的task部分
FlowModelConverter.convertTask = function(ntask,ntid){
	for(var i=1;i<ntask.length;i++){
	    	window.parent.addFieldSet(window.parent.nodetabs.getComponent(ntid));
	    }
	    for(var i=0;i<ntask.length;i++){
	    	var ii = i+1;
	    	
	    	var nft = window.parent.nodetabs.getComponent(ntid).getComponent("task_"+ntid+"_"+ii);
	    	var taskname = ntask[i].getAttribute("name");
	    	
	    	//assignment
	    	var assO = ntask[i].getElementsByTagName("assignment");
	    	var actors = assO[0].getAttribute("pooled-actors");
	    	var nclass = assO[0].getAttribute("class");
	    	var nct=assO[0].getAttribute("config-type");
	    	
	    	//event
	    	var eventO = ntask[i].getElementsByTagName("event");
	    	var event_ = eventO[0].getAttribute("type");
	    	
	    	//action
	    	var actionO = eventO[0].getElementsByTagName("action");
	    	
	    	var action_ = actionO[0].getAttribute("class");
	    	var actiontype = actionO[0].getAttribute("config-type");
	    	//url
	    	var url_ = actionO[0].getElementsByTagName("url")[0].text;
	    	//置入数据
	    	
	    	//alert("taskname_"+stid+"_"+i+"  : "+nf.getComponent("task_2_1").getComponent("taskname_2_1"));
	    	
	    	nft.getComponent("taskname_"+ntid+"_"+ii).setValue(taskname);
			//alert(actors);
	    	if(actors==null||actors==""){
	    		nft.getComponent("tass_"+ntid+"_"+ii).setValue("自定义");
	    		nft.getComponent("nclass_"+ntid+"_"+ii).setValue(nclass);
	    		nft.getComponent("nct_"+ntid+"_"+ii).setValue(nct);
	    	}else{
	    		nft.getComponent("actors_"+ntid+"_"+ii).setValue(actors);
	    	}    	
	    	nft.getComponent("event_"+ntid+"_"+ii).setValue(event_);
	    	nft.getComponent("action_"+ntid+"_"+ii).setValue(action_);
	    	nft.getComponent("actiontype_"+ntid+"_"+ii).setValue(actiontype);
	    	nft.getComponent("url_"+ntid+"_"+ii).setValue(url_);
	    	
	    }
};
FlowModelConverter.convertXMLToMetaNodeModel = function (node) {
    var metaNodeModel = null;
    var type = node.getAttribute(FlowModelConverter.ATTR_ACTIVITIE_TYPE);
    //lingzj工作流再现标记
    //var flag = node.getAttribute("flag");
    //:~
    switch (type) {
      case MetaNodeModel.TYPE_NODE:
        metaNodeModel = new NodeModel();
        //lingzj工作流再现标记
        //metaNodeModel.setFlag(flag);
        //:~
        break;
      case MetaNodeModel.TYPE_DECISION_NODE:
        metaNodeModel = new DecisionNodeModel();
        //lingzj工作流再现标记
        //metaNodeModel.setFlag(flag);
        //:~
        break;
      case MetaNodeModel.TYPE_START_NODE:
        metaNodeModel = new StartNodeModel();
        //lingzj工作流再现标记
        //metaNodeModel.setFlag(flag);
        //:~
        break;
      case MetaNodeModel.TYPE_END_NODE:
        metaNodeModel = new EndNodeModel();
        //lingzj工作流再现标记
        //metaNodeModel.setFlag(flag);
        //:~
        break;
      case MetaNodeModel.TYPE_FORK_NODE:
        metaNodeModel = new ForkNodeModel();
        //lingzj工作流再现标记
        //metaNodeModel.setFlag(flag);
        //:~
        break;
      case MetaNodeModel.TYPE_JOIN_NODE:
        metaNodeModel = new JoinNodeModel();
        //lingzj工作流再现标记
        //metaNodeModel.setFlag(flag);
        //:~
        break;
    }
    if (!metaNodeModel) {
        return null;
    }

    //
    var id = eval(node.getAttribute(FlowModelConverter.ATTR_ACTIVITIE_ID));

    metaNodeModel.setID(id);
    
    //
    var name = node.getAttribute(FlowModelConverter.ATTR_ACTIVITIE_NAME);
    metaNodeModel.setText(name);

    //
    var xCoordinate = eval(node.getAttribute(FlowModelConverter.ATTR_ACTIVITIE_X_COORD));
    var yCoordinate = eval(node.getAttribute(FlowModelConverter.ATTR_ACTIVITIE_Y_COORD));
    metaNodeModel.setPosition(new Point(xCoordinate, yCoordinate));

    //
    var width = eval(node.getAttribute(FlowModelConverter.ATTR_ACTIVITIE_WIDTH));
    var height = eval(node.getAttribute(FlowModelConverter.ATTR_ACTIVITIE_HEIGHT));
    metaNodeModel.setSize(new Dimension(width, height));

    //
    return metaNodeModel;
};
FlowModelConverter.convertXMLToTransitionModel = function (node, model) {
    var fromID = node.getAttribute(FlowModelConverter.ATTR_TRANSITION_FROM);
    fromMetaNodeModel = FlowModelConverter.getMetaNodeModel(model, fromID);
    var toID = node.getAttribute(FlowModelConverter.ATTR_TRANSITION_TO);
    toMetaNodeModel = FlowModelConverter.getMetaNodeModel(model, toID);
    var points = node.getAttribute(FlowModelConverter.ATTR_TRANSITION_POINTS);///
    //
    var id = eval(node.getAttribute(FlowModelConverter.ATTR_TRANSITION_ID));
    //
    var name = node.getAttribute(FlowModelConverter.ATTR_TRANSITION_NAME);
    name = name ? name : "";
	//lingzj工作流再现标记
    //var flag = node.getAttribute("flag");
    //:~
    //
    var transitionModel = new TransitionModel(fromMetaNodeModel, toMetaNodeModel, id);
	//lingzj工作流再现标记
    //transitionModel.setFlag(flag);
    //:~
	//
    
	transitionModel.setPoints(points);
	transitionModel.setDFPoints(points);
	transitionModel.setText(name);
    //
    return transitionModel;
};
FlowModelConverter.getMetaNodeModel = function (model, id) {
    var metaNodeModels = model.getMetaNodeModels();
    for (var i = 0; i < metaNodeModels.size(); i++) {
        var metaNodeModel = metaNodeModels.get(i);
        if (metaNodeModel.getID() == id) {
            return metaNodeModel;
        }
    }
};

//static
FlowModelConverter.NODE_ROOT = "WorkflowProcess";

//
FlowModelConverter.NODE_ACTIVITIES = "Activities";
FlowModelConverter.NODE_ACTIVITIE = "Activitie";
FlowModelConverter.ATTR_ACTIVITIE_ID = "id";
FlowModelConverter.ATTR_ACTIVITIE_TYPE = "type";
FlowModelConverter.ATTR_ACTIVITIE_NAME = "name";
FlowModelConverter.ATTR_ACTIVITIE_X_COORD = "xCoordinate";
FlowModelConverter.ATTR_ACTIVITIE_Y_COORD = "yCoordinate";
FlowModelConverter.ATTR_ACTIVITIE_WIDTH = "width";
FlowModelConverter.ATTR_ACTIVITIE_HEIGHT = "height";

//
FlowModelConverter.NODE_TRANSITIONS = "Transitions";
FlowModelConverter.NODE_TRANSITION = "Transition";
FlowModelConverter.ATTR_TRANSITION_ID = "id";
FlowModelConverter.ATTR_TRANSITION_NAME = "name";
FlowModelConverter.ATTR_TRANSITION_FROM = "from";
FlowModelConverter.ATTR_TRANSITION_TO = "to";

//LINGZJ   JBPM
FlowModelConverter.WORKFLOW_ROOT = "process-definition";
FlowModelConverter.WORKFLOW_ROOT_XMLNS = "xmlns";
FlowModelConverter.WORKFLOW_ROOT_NAME = "name";
FlowModelConverter.WORKFLOW_ROOT_TYPE = "type";
FlowModelConverter.WORKFLOW_ROOT_DESCRIPTION = "description";

FlowModelConverter.WORKFLOW_START_NODE = "start-state";
FlowModelConverter.WORKFLOW_END_NODE = "end-state";
FlowModelConverter.WORKFLOW_NODE = "task-node";
FlowModelConverter.WORKFLOW_DECISION_NODE = "decision";
FlowModelConverter.WORKFLOW_FORK_NODE = "fork";
FlowModelConverter.WORKFLOW_JOIN_NODE = "join";

FlowModelConverter.ATTR_TRANSITION_POINTS = "points";

FlowModelConverter.WORKFLOW_NODE_ID = "id";
FlowModelConverter.WORKFLOW_NODE_NAME = "name";

FlowModelConverter.WORKFLOW_DECISION_NODE_HANDLER = "handler";
FlowModelConverter.WORKFLOW_DECISION_NODE_EXPRESSION = "expression";

FlowModelConverter.WORKFLOW_TASK = "task";
FlowModelConverter.WORKFLOW_TASK_ID = "id";
FlowModelConverter.WORKFLOW_TASK_NAME = "name";

FlowModelConverter.WORKFLOW_TASK_ASSIGNMENT = "assignment";
FlowModelConverter.WORKFLOW_TASK_ASSIGNMENT_TYPE = "type";
FlowModelConverter.WORKFLOW_TASK_ASSIGNMENT_CLASSNAME = "class";
FlowModelConverter.WORKFLOW_TASK_ASSIGNMENT_CONFIGTYPE = "config-type";
FlowModelConverter.WORKFLOW_TASK_CONTROLLER = "controller";
FlowModelConverter.WORKFLOW_TASK_CONTROLLER_VARIABLE = "variable";
FlowModelConverter.WORKFLOW_TASK_CONTROLLER_VARIABLE_NAME = "name";
FlowModelConverter.WORKFLOW_TASK_CONTROLLER_VARIABLE_ACCESS = "access";

FlowModelConverter.WORKFLOW_EVENT = "event";
FlowModelConverter.WORKFLOW_EVENT_ID = "id";
FlowModelConverter.WORKFLOW_EVENT_TYPE = "type";

FlowModelConverter.WORKFLOW_ACTION = "action";
FlowModelConverter.WORKFLOW_ACTION_ID = "id";
FlowModelConverter.WORKFLOW_ACTION_TYPE = "type";
FlowModelConverter.WORKFLOW_ACTION_CLASSNAME = "class";
FlowModelConverter.WORKFLOW_ACTION_CONFIGTYPE = "config-type";
FlowModelConverter.WORKFLOW_ACTION_URL = "url";

FlowModelConverter.WORKFLOW_TRANSITION = "transition";
FlowModelConverter.WORKFLOW_TRANSITION_ID = "id";
FlowModelConverter.WORKFLOW_TRANSITION_NAME = "name";
FlowModelConverter.WORKFLOW_TRANSITION_TO = "to";
FlowModelConverter.WORKFLOW_TRANSITION_DESCRIPTION = "description";


