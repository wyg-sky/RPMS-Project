/*
 * 连线的dom，用于生成dom上的连线，并放置transition的属性
 */
DomTran = function(transitionModel) {

	this.transitionModel = transitionModel;
	
    DomTran.superclass.constructor.call(this,{
    	text: '连线',
    	iconCls: 'line-icon',
    	id: transitionModel.getID(),
    	obj: this
    }); 
};
//连线名不重复
    //transitionModel.setText('连线'+transitionModel.getID());
//:~
Ext.extend(DomTran, Ext.tree.TreeNode,{
	setDescription : function(description){
		this.description = description;
	},
	getDescription : function(){
		return this.description;
	},
	setDescriptionDes : function(descriptionDes){
		this.descriptionDes = descriptionDes;
	},
	getDescriptionDes : function(){
		return this.descriptionDes;
	},
	setTranState : function(tranState){
		this.tranState = tranState;
	},
	getTranState : function(){
		return this.tranState;
	},
	setConditionType : function(conditionType){
		this.conditionType = conditionType;
	},
	getConditionType : function(){
		return this.conditionType;
	},
	setExpression : function(expression){
		this.expression = expression;
	},
	getExpression : function(){
		return this.expression;
	},
	setScript : function(script){
		this.script = script;
	},
	getScript : function(){
		return this.script;
	},
	setIsReturn : function(isReturn){
		this.isReturn = isReturn;
	},
	getIsReturn : function(){
		return this.isReturn;
	},
	showProperty : function(node,e){
		propertyPanel.tranClick(this);
		//description
		var formPanel = propertyPanel.propertyFormPanel;
		var description = formPanel.findById('tranDescription');
		if(this.getDescription()){
			description.setValue({id:this.getDescription(),text: this.getDescriptionDes()});
		}
		var conditionType = formPanel.findById('conditionType');
		conditionType.setValue(this.getConditionType());
		conditionType.fireEvent('select',conditionType);
		var isReturn = this.getIsReturn();
		if(isReturn)
			formPanel.findById('isReturn').setValue(isReturn);
		
		/*var tranState = formPanel.findById('tranState');
		if(tranState){
			var tranStateValue = this.getTranState();
			
			tranState.store.load({
				callback: function(records, options, success){

				　　Ext.Msg.alert('info', '加载完毕');
				
				　　}
			});
			//alert(this.getTranState()+'---'+tranStateValue);
			tranState.setValue(tranStateValue);
			
		}*/
	},
	saveProperty : function(formPanel){
		this.setDescription(formPanel.findById('tranDescription').getValue());
		this.setDescriptionDes(formPanel.findById('tranDescription').getRawValue());
		this.setTranState(formPanel.findById('tranState').getValue());
		this.setIsReturn(formPanel.findById('isReturn').getValue());
		var conditionType = formPanel.findById('conditionType').getValue();
		this.setConditionType(conditionType);
		if(conditionType == 'Expression'){
			var conditionTypeExpression = formPanel.findById('conditionTypeExpression').getValue();
			this.setExpression(conditionTypeExpression);
		}else if(conditionType == 'Script'){
			var conditionTypeScript = formPanel.findById('conditionTypeScript').getValue();
			this.setScript(conditionTypeScript);
		}
	},
	convertDomToXML : function(jbpmDoc){
		var tranEL = jbpmDoc.createElement('transition');
		tranEL.setAttribute('id',this.id);
		tranEL.setAttribute('name',this.text);
		var toMetaNodeModel = this.transitionModel.getToMetaNodeModel();
		if(toMetaNodeModel)
			tranEL.setAttribute('to',toMetaNodeModel.getText());
		//condition
		var conditionType = this.getConditionType();
		if(conditionType=='Expression'){
			var conditionEL = jbpmDoc.createElement('condition');
			//alert(this.getExpression());
			conditionEL.setAttribute('expression',this.getExpression());
			tranEL.appendChild(conditionEL);	
		}else if(conditionType=='Script'){
			var conditionEL = jbpmDoc.createElement('condition');
			var conditionData = jbpmDoc.createCDATASection(this.getScript());
			conditionEL.appendChild(conditionData);
			tranEL.appendChild(conditionEL);
		}
		//:~	
			
		var description = this.getDescription();
		
		var regS = new RegExp("&","g");
		description = this.mergerTranState(description);//.replace(regS,"--")
		var isReturn = this.getIsReturn();
		if(isReturn!=null&&isReturn!=''){
			description = description+'&isReturn='+isReturn;
		}
		if(description!=null&&description!=''){
			description = description.replace(regS,"--");
		}
		else description='';
		var descriptionEL = jbpmDoc.createElement('description');
		descriptionEL.setAttribute('des',this.getDescriptionDes());
		var descriptionData = jbpmDoc.createCDATASection(description);
		descriptionEL.appendChild(descriptionData);
			//descriptionEL.text = description;
			tranEL.appendChild(descriptionEL);
		return tranEL;
	},
	convertXMLToDom : function(jbpmDoc,path){
		var id = jbpmDoc.getAttribute('id');
		var name = jbpmDoc.getAttribute('name');
		this.id = id;
		this.setText(name);
		//condition
		var condition = null;
		var conditionDoc = jbpmDoc.selectSingleNode(path+'/transition'+"[@id='"+ this.id +"']"+'/condition');
		if(conditionDoc){
			var expression = conditionDoc.getAttribute('expression');
			if(expression){
				this.setConditionType('Expression');
				this.setExpression(expression);
			}else{
				this.setConditionType('Script');
				this.setScript(conditionDoc.text);
			}
		}
		//:~
		var description = null;
		var descriptionDoc = jbpmDoc.selectSingleNode(path+'/transition'+"[@id='"+ this.id +"']"+'/description');
		
		if(descriptionDoc){
			//
			var dTemp = null;
			//alert(descriptionDoc.text);
			descriptionAndisReturn = descriptionDoc.text.split('&isReturn=');
			
			//alert(descriptionAndisReturn);
			if(descriptionAndisReturn.length>1){
				dTemp = descriptionAndisReturn[0];
				isReturn = descriptionAndisReturn[1];
				this.setIsReturn(isReturn);
				
			}else{
				dTemp =descriptionAndisReturn[0];
			}
			//alert(dTemp);	
			//:~
		
			//var descriptionAndState = this.splitTranState(descriptionDoc.text);
			var descriptionAndState = this.splitTranState(dTemp);
			var description = descriptionAndState.split(';;')[0];
			var tranState = descriptionAndState.split(';;')[1];
			
			//alert(description);
			//alert(tranState);
			
			this.setTranState(tranState);
			this.setDescription(description);
			this.setDescriptionDes(descriptionDoc.getAttribute('des'));
		}
	},
	mergerTranState : function(description){//组合description和tranState
		var tranState = this.getTranState();
		//alert(tranState);
		if(tranState!=null&&tranState!=''){
			//alert(description);
			if(description==null||description=='')
				return 'stateCode='+tranState
			else
				return description+'&stateCode='+tranState;
		}else
			return description;
	},
	splitTranState : function(descriptionText){
		//alert(descriptionText);
		var indexSplit = descriptionText.indexOf('stateCode=');
		
		//alert(indexSplit);
		if(indexSplit>1){
			var description = descriptionText.substring(0,indexSplit-1);
			var tranState = descriptionText.substring(indexSplit).split('=')[1];
			//alert(description+"--"+tranState);
			return description+';;'+tranState;
		}else{
			if(indexSplit==0){
				var tranState = descriptionText.split('=')[1];
				return ';;'+tranState;
			}else
				return descriptionText+';;';
		}
				
	}
});


