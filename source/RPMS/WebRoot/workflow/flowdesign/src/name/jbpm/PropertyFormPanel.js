/*
* 属性的form对象，放置各个节点元素的form中设置的属性
*/
PropertyFormPanel = function(){ 
	this.readOnly = false;
	if(operType=='view')
		this.readOnly = true;
	PropertyFormPanel.superclass.constructor.call(this,{
		id: 'propertyFormPanel',
		region: 'south',
		title:'流程属性',
		split: true,
		height: 220,
		animCollapse: false,
		collapsible:true,
		collapseMode:'mini',
		autoScroll:true,
        enableDD:false,
        animate: false, 
		bodyStyle:'padding:5px 5px 0',
        labelWidth: 65,
        defaultType: 'textfield'
	});
	this.add({id: '_forposition'});//占位的item，需存在但无意义
	
};
Ext.extend(PropertyFormPanel, Ext.FormPanel,{
	removeAll : function(){//移除form下的所有元素
		var len = this.items.length;
		for(var i=0;i<len;i++){
			this.remove(this.getComponent(0));
		}
	},
	//===================连线=============================
	tranProperty : function(domTran){//连线属性设置form
		this.removeAll();
		this.setTitle('连线');
		this.add({xtype: 'hidden',id: 'domId',fieldLabel: 'domId',value: domTran.id,anchor: '90%'});
		this.add({xtype: 'hidden',id: 'tranId',fieldLabel: 'id',value: domTran.id,anchor: '90%'});
		this.add({id: 'tranName',fieldLabel: '名称',value: domTran.text,readOnly: this.readOnly,anchor: '90%'});
        var _cp = this.columnPanel('tranDescription','迁移URL');
        this.add(_cp);
       	this.add(
       		{xtype:'panel',border:false,
	          	items:[{
	        		layout: 'column',
	          		border:false,
	          		items: [
	          			{layout: 'form',border:false,labelWidth: 65,columnWidth : .8,
	          				items:[this.createCombo('tranState','状态','code','name','resultList','../admin/listBpStatesByBpCode.html?bpCode='+bpCode,{ 
		                        		load: function(){Ext.getCmp('tranState').setValue(domTran.getTranState())}
		                        	},this.readOnly)]
		            },
	         		{columnWidth : .2,labelWidth: 75,border:false,
	         			items:[ new Ext.Button({
							text:'新建',
							disabled: this.readOnly,
							handler: function(){
								var designBpStateAddOrEdit = new DesignBpStateAddOrEdit({bpId:bpId,bpName:bpName,combo: Ext.getCmp('tranState')});
								designBpStateAddOrEdit.show();
					      	}
						})]
					}
				]
			  }]
	       	}
       	);
       	var isReturnCombo = this.createLocalCombo('isReturn','回退',
		        [['1', '是'],
				['0', '否']]
		    );
		this.add(isReturnCombo);
		var conditionTypeCombo = this.createLocalCombo('conditionType','执行条件',
			[['', '请选择 ... '],
			['Expression', '表达式'],
	        ['Script', '脚本']]
	    );
	    conditionTypeCombo.on('select',this.conditionTypeComboChange,{formPanel: this,domTran: domTran});
	    this.add(conditionTypeCombo);
		this.findById('tranName').on('change',this.changeTitle,{parent: this,dom: domTran,emptyValue: '连线'});
	},
	//===================流程=============================
	flowProperty : function(domFlow){//流程基本属性设置form
		this.removeAll();
		this.setTitle('流程');
		this.add({xtype: 'hidden',id: 'domId',fieldLabel: 'domId',value: domFlow.id,anchor: '90%'});
		this.add({xtype: 'hidden',id: 'flowId',fieldLabel: 'id',value: domFlow.id,anchor: '90%'});
		this.add({id: 'flowTypeName',fieldLabel: '流程名称',value: domFlow.getFlowTypeName(),readOnly: true,anchor: '90%'});
		this.add({id: 'flowVersion',fieldLabel: '流程版本',readOnly: true,value:version,anchor: '90%'});
		this.add({id: 'flowName',fieldLabel: '版本名称',readOnly: this.readOnly,value: domFlow.text,anchor: '90%'});
		var _createURL = this.columnPanel('createUrl','新建URL');
		this.add(_createURL);
		var _updateURL = this.columnPanelComboTree('updateUrl','编辑URL');
		this.add(_updateURL);
		var _viewUrl = this.columnPanelComboTree('viewUrl','只读URL');
       	this.add(_viewUrl);
       	var _homeUrl = this.columnPanelComboTree('homeUrl','模块首页');
       	this.add(_homeUrl);
       	var _templateUrl = this.columnPanelComboTree('templateUrl','模板URL');
       	this.add(_templateUrl);
       	var _printPageUrl = this.columnPanelComboTree('printPageUrl','打印URL');
       	this.add(_printPageUrl);
       	//var _draftState = this.stateColumnPanel('draftState',domFlow.getDraftState(),this.readOnly);
       	//this.add(_draftState);
       	this.add(
       		{xtype:'panel',border:false,
	          	items:[{
	        		layout: 'column',
	          		border:false,
	          		items: [
	          			{layout: 'form',border:false,labelWidth: 65,columnWidth : .8,
	          				items:[this.createCombo('draftState','状态','code','name','resultList','../admin/listBpStatesByBpCode.html?bpCode='+bpCode,{ 
		                        		load: function(){Ext.getCmp('draftState').setValue(domFlow.getDraftState())}
		                        	},this.readOnly)]
		            },
	         		{columnWidth : .2,labelWidth: 75,border:false,
	         			items:[ new Ext.Button({
							text:'新建',
							disabled: this.readOnly,
							handler: function(){
								var designBpStateAddOrEdit = new DesignBpStateAddOrEdit({bpId:bpId,bpName:bpName,combo: Ext.getCmp('draftState')});
								designBpStateAddOrEdit.show();
					      	}
						})]
					}
				]
			  }]
	       	}
       	);
		this.add({xtype: 'textarea',id:'flowDescription',fieldLabel: '版本描述',readOnly: this.readOnly,value: domFlow.getDescription(),anchor: '90%'});
		this.findById('flowName').on('change',this.changeTitle,{parent: this,dom: domFlow,emptyValue: '流程'});
	},
	//===================事件=============================
	eventProperty : function(domEvent){//事件属性设置form
		this.removeAll();
		this.setTitle('事件');
		var eventTypeCombo = this.createLocalCombo('eventType','事件类型',
			[['transition', 'transition'],
	        ['before-signal', 'before-signal'],
	        ['after-signal', 'after-signal'],
	        ['process-start', 'process-start'],
	        ['process-end', 'process-end'],
	        ['node-enter', 'node-enter'],
	        ['node-leave', 'node-leave'],
	        ['superstate-enter', 'superstate-enter'],
	        ['superstate-leave', 'superstate-leave'],
	        ['subprocess-created', 'subprocess-created'],
	        ['subprocess-end', 'subprocess-end'],
	        ['task-create', 'task-create'],
	        ['task-assign', 'task-assign'],
	        ['task-start', 'task-start'],
	        ['task-end', 'task-end']]
	    );
	    this.add({xtype: 'hidden',id: 'domId',fieldLabel: 'domId',value: domEvent.id,anchor: '90%'});
		this.add({xtype: 'hidden',id: 'eventId',fieldLabel: 'id',value: domEvent.id,anchor: '90%'});
		this.add({id: 'eventName',fieldLabel: '事件名称',value: domEvent.text,readOnly: this.readOnly,anchor: '90%'});
		this.add(eventTypeCombo);
		this.add({//放置action的tabPanel
			id: 'actionTab',
            xtype:'tabpanel',
            anchor: '95%',
            activeTab: 0,
            height:200,
            defaults:{bodyStyle:'padding:10px'}
        });
        for(var i=0;i<domEvent.domActions.size();i++){//将event下的action循环显示在页面上
        	this.addAction(domEvent.getActionByIndex(i));
        }
        this.findById('eventName').on('change',this.changeTitle,{parent: this,dom: domEvent,emptyValue: '事件'});
	},
	//===================任务=============================
	taskProperty : function(domTask){//任务属性设置form
		this.removeAll();
		this.setTitle('任务');
		var assignmentFS = this.assignmentFieldSet(domTask);
	    var controllerFS = this.controllerFieldSet(domTask);
	    this.add({xtype: 'hidden',id: 'domId',fieldLabel: 'domId',value: domTask.id,anchor: '90%'});
	    this.add({xtype: 'hidden',id: 'taskId',fieldLabel: 'id',value: domTask.id,anchor: '90%'});
		this.add({id: 'taskName',fieldLabel: '任务名称',value: domTask.text,readOnly: this.readOnly,anchor: '90%'});
		this.add(assignmentFS);
		//this.add({id: 'taskURL',fieldLabel: '指定URL',value: domTask.getTaskUrl(),anchor: '90%'});
		this.add(controllerFS);
		this.findById('taskName').on('change',this.changeTitle,{parent: this,dom: domTask,emptyValue: '任务'});
	},
	//===================节点=============================
	nodeProperty : function(domNode){//节点属性设置的form
		this.removeAll();
		
		this.setTitle('节点');
		this.add({xtype: 'hidden',id: 'domId',fieldLabel: 'domId',value: domNode.id,anchor: '90%'});
		this.add({xtype: 'hidden',id: 'nodeId',fieldLabel: 'id',value: domNode.id,anchor: '90%'});
		this.add({id: 'nodeName',fieldLabel: '节点名称',value: domNode.text,readOnly: this.readOnly,anchor: '90%'});
		if(MetaNodeModel.TYPE_NODE==domNode.metaNodeModel.type){
			var taskNodeSignalCombo = this.createLocalCombo('taskNodeSignal','signal',
		        [['unsynchronized', 'unsynchronized'],
				['never', 'never'],
				['first', 'first'],
				['first-wait', 'first-wait'],
				['last', 'last'],
		        ['last-wait', 'last-wait']]
		    );
		    var createTasksCombo = this.createLocalCombo('createTasks','创建任务',
		        [['true', '是'],
				['false', '否']]
		    );
		    var endTasksCombo = this.createLocalCombo('endTasks','结束任务',
		        [['true', '是'],
				['false', '否']]
		    );
		    this.add(taskNodeSignalCombo);
		    this.add(createTasksCombo);
		    this.add(endTasksCombo);
		}
		this.add({xtype: 'textarea',id:'nodeDescription',fieldLabel: '描述',value: domNode.getDescription(),readOnly: this.readOnly,anchor: '90%'});
		if(MetaNodeModel.TYPE_DECISION_NODE==domNode.metaNodeModel.type){
			var decisionHandlerTypeCombo = this.createLocalCombo('decisionHandlerType','条件类型',
				[['null', '请选择...'],
				['expression', 'expression'],
		        ['delegation', 'delegation']]
		    );
		    this.add(decisionHandlerTypeCombo);
		    decisionHandlerTypeCombo.on('select',this.decisionHandlerTypeComboChange,{formPanel: this,domNode: domNode});
		}
		this.findById('nodeName').on('change',this.changeTitle,{parent: this,dom: domNode,emptyValue: '节点'});
	},
	//================判断节点条件设置====================
	decisionHandlerTypeComboChange : function(combo,record,index){
		var formPanel = this.formPanel;
		var domNode = this.domNode;
		if(combo.getValue()=='null'){//清空combo值
			combo.clearValue();
		}
		var newValue = combo.getValue();
		var oldValue = combo.oldValue;
		if(newValue==oldValue) return;
		else{
			combo.oldValue = newValue;
			//删
			var decisionHandlerExpression = formPanel.findById('decisionHandlerExpression');
			var decisionHandlerClass = formPanel.findById('decisionHandlerClass');
			var decisionHandlerConfigType = formPanel.findById('decisionHandlerConfigType');
			if(decisionHandlerExpression){
				decisionHandlerExpression.el.up('.x-form-item').remove();
				formPanel.remove(decisionHandlerExpression);
			}
			if(decisionHandlerClass){
				decisionHandlerClass.el.up('.x-form-item').remove();
				formPanel.remove(decisionHandlerClass);
			}
			if(decisionHandlerConfigType){
				decisionHandlerConfigType.el.up('.x-form-item').remove();
				formPanel.remove(decisionHandlerConfigType);
			}
			
			//增
			if(newValue=='delegation'){
				var decisionHandlerConfigTypeCombo = formPanel.createLocalCombo('decisionHandlerConfigType','配置类型',
					[['field', 'field'],
			        ['bean', 'bean'],
			        ['constructor', 'constructor'],
			        ['configuration-property', 'configuration-property']]
			    );
				formPanel.add(decisionHandlerConfigTypeCombo);
				decisionHandlerConfigTypeCombo.setValue(domNode.getDecisionHandlerConfigType());
				formPanel.add(
					new Ext.form.ComboBox({
						id: 'decisionHandlerClass',
						fieldLabel: 'CLASS',
						anchor:'90%',
						value: domNode.getDecisionHandlerClass(),
						disabled: formPanel.readOnly,
						triggerAction: 'all',
						forceSelection:false,
		  				displayField :'text', 
						valueField :'id',
						allowBlank: false,
						store : new Ext.data.Store({ 
							proxy:new Ext.data.HttpProxy({url:'../flow/listActionHandles.html'}),
							reader:new Ext.data.JsonReader(
								{id:'allModelsStore',root:'root'},
								[{name:'id'},{name:'text'}]),
							remoteSort:false,
							autoLoad:true
						}) 
					})
				);
			}else if(newValue!=''){
				formPanel.add({id: 'decisionHandlerExpression',value: domNode.getDecisionHandlerExpression(),fieldLabel: '表达式',readOnly: formPanel.readOnly,anchor:'90%'});
			}
			formPanel.doLayout();
		}
	},
	//===================任务中委派设置=============================
	assignmentTypeComboChange: function(combo,record,index){//选中委派类型的事件定义
		//利用scope把fieldset对象和propertyFormPanel对象都传递过来
		var formPanel = this.formPanel;
		var assignmentFS = this.fieldSet;
		var domTask = this.domTask;
		
		var newAssType = combo.getValue();
		var oldAssType = assignmentFS.assType;
		if(oldAssType == newAssType) return;//若原值和现值相同则不处理
		else{
			assignmentFS.assType = newAssType;
			//删
			var assignmentConfigType = assignmentFS.findById('assignmentConfigType');
			var assignmentClass = assignmentFS.findById('assignmentClass');
			
			var assignmentValue = assignmentFS.findById('assignmentValue');
			
			//var assignmentZDType = assignmentFS.findById('assignmentZDType');
			//var assignmentZDValue = assignmentFS.findById('assignmentZDValue');assignmentZDGrid
			var assignmentZDGrid = assignmentFS.findById('assignmentZDGrid');
			
			if(assignmentConfigType){
				assignmentConfigType.el.up('.x-form-item').remove();
				assignmentFS.remove(assignmentConfigType);
			}
			if(assignmentClass){
				assignmentClass.el.up('.x-form-item').remove();
				assignmentFS.remove(assignmentClass);
			}
			if(assignmentValue){
				assignmentValue.el.up('.x-form-item').remove();
				assignmentFS.remove(assignmentValue);
			}
			if(assignmentZDGrid){
				assignmentFS.remove(assignmentZDGrid);
			}
			//if(assignmentZDType){
			//	assignmentZDType.el.up('.x-form-item').remove();
			//	assignmentFS.remove(assignmentZDType);
			//}
			//if(assignmentZDValue){
			//	assignmentZDValue.el.up('.x-form-item').remove();
			//	assignmentFS.remove(assignmentZDValue);
			//}
			//删:~
			//增
			if(newAssType=='Handler'){
				var assignmentConfigTypeCombo = formPanel.createLocalCombo('assignmentConfigType','配置类型',
					[['field', 'field'],
			        ['bean', 'bean'],
			        ['constructor', 'constructor'],
			        ['configuration-property', 'configuration-property']]
			    );
				assignmentFS.add(assignmentConfigTypeCombo);
				assignmentConfigTypeCombo.setValue(domTask.getAssignmentConfigType());
				//assignmentFS.add({id: 'assignmentClass',fieldLabel: 'CLASS',value: domTask.getAssignmentClass(),readOnly: formPanel.readOnly,anchor:'90%'});
				assignmentFS.add(
					new Ext.form.ComboBox({
						id: 'assignmentClass',
						fieldLabel: 'CLASS',
						anchor:'90%',
						value: domTask.getAssignmentClass(),
						disabled: formPanel.readOnly,
						triggerAction: 'all',
						forceSelection:false,
		  				displayField :'text', 
						valueField :'id',
						allowBlank: false,
						store : new Ext.data.Store({ 
							proxy:new Ext.data.HttpProxy({url:'../flow/listActionHandles.html'}),
							reader:new Ext.data.JsonReader(
								{id:'allModelsStore',root:'root'},
								[{name:'text'},{name:'id'}]),
							remoteSort:false,
							autoLoad:true
						}) 
					})
				);
				var assignmentZDGrid = formPanel.createAssignmentZDGrid(formPanel);
			    assignmentFS.add(assignmentZDGrid);
			    assignmentZDGrid.getStore().loadData(domTask.getAssignmentZDValue(),false);
				/*var assignmentZDTypeCombo = formPanel.createLocalCombo('assignmentZDType','指定类型',
					[['', '请选择...'],
					['user', '按人员'],
					['role', '按角色'],
			        ['department', '按部门'],
			        ['jobtitle', '按职位']]
			    );
				assignmentFS.add(assignmentZDTypeCombo);
				assignmentZDTypeCombo.setValue(domTask.getAssignmentZDType());
				assignmentZDTypeCombo.on('select',formPanel.assignmentZDTypeComboChange,{fieldSet: assignmentFS,formPanel: formPanel,domTask: domTask});*/
			}else if(newAssType=='Pooled Actors'){
				var assignmentZDGrid = formPanel.createAssignmentZDGrid(formPanel);
			    assignmentFS.add(assignmentZDGrid);
			    assignmentZDGrid.getStore().loadData(domTask.getAssignmentZDValue(),false);
				/*var assignmentZDTypeCombo = formPanel.createLocalCombo('assignmentZDType','指定类型',
					[['', '请选择...'],
					['user', '按人员'],
					['role', '按角色'],
			        ['department', '按部门'],
			        ['jobtitle', '按职位']]
			    );
				assignmentFS.add(assignmentZDTypeCombo);
				assignmentZDTypeCombo.setValue(domTask.getAssignmentZDType());
				assignmentZDTypeCombo.on('select',formPanel.assignmentZDTypeComboChange,{fieldSet: assignmentFS,formPanel: formPanel,domTask: domTask});*/
			}else if(newAssType!=''){
				assignmentFS.add({id: 'assignmentValue',fieldLabel: '值',value: domTask.getAssignmentValue(),readOnly: formPanel.readOnly,anchor:'90%'});
			}
			//增:~
			assignmentFS.doLayout();
		}
	},
	assignmentFieldSet : function(domTask){//委派人的fieldset
		var assignmentTypeCombo = this.createLocalCombo('assignmentType','委派类型',
			[['', '请选择 ... '],
			['Swimlane', 'Swimlane'],
//	        ['Actor', 'Actor'],
	        ['Handler', 'Handler'],
//	        ['Expression', 'Expression'],
	        ['Pooled Actors', 'Pooled Actors']]
	    );
		var assignmentFS = new Ext.form.FieldSet({ 
			id: 'assignmentFS',
			title: '委派人设置', 
			autoHeight: true,
			layout:'form',
			defaultType : 'textfield',
			labelWidth:75,
			collapsible: true,
			assType : '',//委派类型标记
			items : [
				assignmentTypeCombo
			]
		});
		assignmentTypeCombo.on('select',this.assignmentTypeComboChange,{fieldSet: assignmentFS,formPanel: this,domTask: domTask});
		return assignmentFS;
	},
	//===================任务中变量设置=============================
	createControllerGrid : function(){//定义变量的grid
		var requireColumn = new Ext.grid.CheckColumn({
	       header: "必须",
	       readOnly:this.readOnly,
	       dataIndex: 'required'
	    });
	    var readColumn = new Ext.grid.CheckColumn({
	       header: "读",
	       readOnly:this.readOnly,
	       dataIndex: 'read'
	    });
	    var writeColumn = new Ext.grid.CheckColumn({
	       header: "写",
	       readOnly:this.readOnly,
	       dataIndex: 'write'
	    });
	    var Plant = Ext.data.Record.create([
	           {name: 'name', type: 'string'},
	           {name: 'mapName', type: 'string'},
	           {name: 'read', type: 'bool'},            
	           {name: 'write',type: 'bool'},
	           {name: 'required', type: 'bool'}
	      ]);
	    var ds = new Ext.data.SimpleStore({
	    	fields: [
	           {name: 'name'},
	           {name: 'mapName'},
	           {name: 'read',type: 'bool'},
	           {name: 'write',type: 'bool'},
	           {name: 'required',type: 'bool'}
	    	],
	        data: []
	    });
	    var cm = new Ext.grid.ColumnModel([
        	{header: "名称",dataIndex: 'name',editor: new Ext.form.TextField({readOnly:this.readOnly,allowBlank: false})},
        	{header: "映射",dataIndex: 'mapName',editor: new Ext.form.TextField({readOnly:this.readOnly,allowBlank: false})},
        	readColumn,writeColumn,requireColumn
	    ]);
	    
	    var controllerGrid = new Ext.grid.EditorGridPanel({//变量的grid
	    	id: 'controllerGrid',
	    	store: ds,
	        cm: cm,
		    autoHeight: true,
	        viewConfig: {forceFit:true},
	        clicksToEdit:1,
	        plugins: [readColumn,writeColumn,requireColumn],
	        tbar: [{xtype: 'tbtext', text: '定义变量'},'->',
	        {
	            text: '新增',
	            hidden : this.readOnly,
	            handler : function(){
	                var p = new Plant({
	                    name: '',
	                    mapName: ''
	                });
	                controllerGrid.stopEditing();
	                ds.insert(0, p);
	                controllerGrid.startEditing(0, 0);
	            }
	        }]
	   	});
		
	   	controllerGrid.on('rowcontextmenu', function(client,rowIndex,e){//变量grid的右键
	   		var item = new Ext.menu.Item({text: '删除变量',handler: function(button,e){
	            	var record = controllerGrid.getStore().getAt(rowIndex);
	            	controllerGrid.getStore().remove(record);
	            }});
	        if(operType=='view'){
				item.disable(); 
			}
	   		var rightClick = new Ext.menu.Menu( {
	            items : [item]
	        });
	        e.preventDefault();
        	rightClick.showAt(e.getXY());
	   	});
	   	
	   	return controllerGrid;
	},
	controllerTypeComboChange : function(combo,record,index){//不同定义变量方式，不同的属性元素
		
		var formPanel = this.formPanel;
		var controllerFS = this.fieldSet;
		var domTask = this.domTask;
		
		var newConType = combo.getValue();
		var oldConType = controllerFS.conType;
		if(oldConType == newConType) return;//若原值和现值相同则不处理
		else{
			controllerFS.conType = newConType;
			//删
			var controllerConfigType = controllerFS.findById('controllerConfigType');
			var controllerClass = controllerFS.findById('controllerClass');
			var controllerGrid = controllerFS.findById('controllerGrid');
			if(controllerConfigType){
				controllerConfigType.el.up('.x-form-item').remove();
				controllerFS.remove(controllerConfigType);
			}
			if(controllerClass){
				controllerClass.el.up('.x-form-item').remove();
				controllerFS.remove(controllerClass);
			}
			if(controllerGrid){
				controllerFS.remove(controllerGrid);
			}
			//删:~
			//增
			if(newConType=='Custom'){
				var controllerConfigTypeCombo = formPanel.createLocalCombo('controllerConfigType','配置类型',
					[['field', 'field'],
			        ['bean', 'bean'],
			        ['constructor', 'constructor'],
			        ['configuration-property', 'configuration-property']]
			    );
				controllerFS.add(controllerConfigTypeCombo);
				controllerConfigTypeCombo.setValue(domTask.getControllerConfigType());
				//controllerFS.add({id: 'controllerClass',fieldLabel: 'CLASS',value: domTask.getControllerClass(),readOnly: formPanel.readOnly,anchor:'90%'});
				controllerFS.add(
					new Ext.form.ComboBox({
						id: 'controllerClass',
						fieldLabel: 'CLASS',
						anchor:'90%',
						value: domTask.getControllerClass(),
						disabled: formPanel.readOnly,
						triggerAction: 'all',
						forceSelection:false,
		  				displayField :'text', 
						valueField :'id',
						//allowBlank: false,
						store : new Ext.data.Store({ 
							proxy:new Ext.data.HttpProxy({url:'../flow/listActionHandles.html'}),
							reader:new Ext.data.JsonReader(
								{id:'allModelsStore',root:'root'},
								[{name:'id'},{name:'text'}]),
							remoteSort:false,
							autoLoad:true
						}) 
					})
				);
			}else if(newConType!=''){
				var controllerGrid = formPanel.createControllerGrid();
				controllerFS.add(controllerGrid);
				controllerGrid.getStore().loadData(domTask.getVariables(),false);
			}
			//增:~
			controllerFS.doLayout();
		}
		
	},
	controllerFieldSet : function(domTask){//变量的fieldset
		var controllerTypeCombo = this.createLocalCombo('controllerType','设置方式',
			[['', '请选择 ... '],
			['Default', 'Default'],
	        ['Custom', 'Custom']]
	    );
		var controllerFS = new Ext.form.FieldSet({ 
			title: '变量设置', 
			autoHeight: true,
			layout:'form',
			defaultType : 'textfield',
			labelWidth:75,
			conType : '',//变量设置方式标记
			collapsible: true,
			items : [
				controllerTypeCombo
			]
		});
		controllerTypeCombo.on('select',this.controllerTypeComboChange,{fieldSet: controllerFS,formPanel: this,domTask: domTask});
		return controllerFS;
	},
	//===================行为=============================
	actionTypeComboChange : function(combo,record,index){//不同的行为设置类型对应不同的设置表单元素
		var formPanel = this.formPanel;
		var domAction = this.domAction;
		var actionForm = formPanel.findById('actionTab_'+domAction.id);
		
		var newAtionType = combo.getValue();
		var oldAtionType = actionForm.actionType;
		if(oldAtionType == newAtionType) return;//若原值和现值相同则不处理
		else{
			actionForm.actionType = newAtionType;
			//删
			var actionConfigType = actionForm.findById(domAction.id+'_actionConfigType');
			var actionClass = actionForm.findById(domAction.id+'_actionClass');
			var actionExcepression = actionForm.findById(domAction.id+'_actionExpression');
			if(actionConfigType){
				actionConfigType.el.up('.x-form-item').remove();
				actionForm.remove(actionConfigType);
			}
			if(actionClass){
				actionClass.el.up('.x-form-item').remove();
				actionForm.remove(actionClass);
			}
			if(actionExcepression){
				actionExcepression.el.up('.x-form-item').remove();
				actionForm.remove(actionExcepression);
			}
			//删:~
			//增
			if(newAtionType=='Handler'){
				var actionConfigTypeCombo = formPanel.createLocalCombo(domAction.id+'_actionConfigType','配置类型',
					[['field', 'field'],
			        ['bean', 'bean'],
			        ['constructor', 'constructor'],
			        ['configuration-property', 'configuration-property']]
			    );
				actionForm.add(actionConfigTypeCombo);
				actionConfigTypeCombo.setValue(domAction.getActionConfigType());
				//actionForm.add({id: domAction.id+'_actionClass',fieldLabel: 'CLASS',value: domAction.getActionClass(),readOnly: formPanel.readOnly,anchor:'90%'});
				actionForm.add(
					new Ext.form.ComboBox({
						id: domAction.id+'_actionClass',
						fieldLabel: 'CLASS',
						anchor:'90%',
						value: domAction.getActionClass(),
						disabled: formPanel.readOnly,
						triggerAction: 'all',
						forceSelection:false,
		  				displayField :'text', 
						valueField :'id',
						allowBlank: false,
						store : new Ext.data.Store({ 
							proxy:new Ext.data.HttpProxy({url:'../flow/listActionHandles.html'}),
							reader:new Ext.data.JsonReader(
								{id:'allModelsStore',root:'root'},
								[{name:'id'},{name:'text'}]),
							remoteSort:false,
							autoLoad:true
						}) 
					})
				);
				/*actionForm.add(new Ext.form.ComboBox({
						id: domAction.id+'_actionClass',
						fieldLabel: 'CLASS',
						anchor:'90%',
						value: domAction.getActionClass(),
						readOnly: formPanel.readOnly,
						triggerAction: 'all',
						forceSelection:false,
		  				displayField :'text', 
						valueField :'id',
						//value: 'com.dhcc.itsm.workflow.engine.handle.TaskEventHandle',
						store : new Ext.data.Store({ 
							proxy:new Ext.data.HttpProxy({url:'../form/listAllModels.html'}),
							reader:new Ext.data.JsonReader(
								{id:'allModelsStore',root:'allModels'},
								[{name:'id'},{name:'text'}]),
							remoteSort:false,
							autoLoad:true
						}) 
					}));*/
			}else if(newAtionType=='Expression'){
				actionForm.add({id: domAction.id+'_actionExpression',fieldLabel: '表达式',xtype: 'textarea',height: 50,value: domAction.getExpression(),readOnly: formPanel.readOnly,anchor:'90%'});
			}
			//增:~
			actionForm.doLayout();
		}
	},
	createActionTypeCombo : function(domAction){//行为类型的combo，id要根据action的id来
		var actionTypeCombo = this.createLocalCombo(domAction.id+'_actionType','行为类型',
			[['', '请选择 ... '],
			['Handler', 'Handler'],
			['Expression', 'Expression']]
	    );
	    actionTypeCombo.on('select',this.actionTypeComboChange,{domAction: domAction,formPanel: this});
	    return actionTypeCombo;
	},
	createActionConfigTypeCombo : function(domAction){//配置类型combo，id要根据action的id来
		var actionConfigTypeCombo = this.createLocalCombo(domAction.id+'_actionConfigType','配置类型',
			[['field', 'field'],
	        ['bean', 'bean'],
	        ['constructor', 'constructor'],
	        ['configuration-property', 'configuration-property']]
	    );
	    return actionConfigTypeCombo;
	},
	addAction : function(domAction){//增加一个action，在actionTab中加一个标签页
		var eventId = this.findById('eventId');
		var domEvent = domAction.domEvent;
		if(eventId){
			if(eventId.value == domEvent.id){//确定当前form就是被添加action的事件
				var actionTab = this.findById('actionTab');
				actionTab.add({
					id : 'actionTab_'+domAction.id,
	                title:'行为',
	                layout:'form',
	                labelWidth: 75,
	                defaultType: 'textfield',
	                actionType: '',//记录行为类型的选项
	                tbar: ['->',{text: '新建表单',disabled: this.readOnly,handler: function(){
			            					var tabPanel = window.parent.Ext.getCmp('flow-tabs');
			            					var panel = new window.parent.Ext.Panel({
									            title: '新建表单',
									            layout: 'fit',
									            autoLoad: {url:"../form/quickFormManager.jsp",scripts: true,scope: this},//html: '<iframe  frameborder="0"  scrolling="no" width="100%" height="100%" src = "form/formManger.jsp"></iframe>',
									            closable: true//,
									        });
									        tabPanel.add(panel);
									        tabPanel.activate(panel);
											tabPanel.doLayout();
			            				}}],
	                items: [
	                	{xtype: 'hidden',id: domAction.id+'_actionId',fieldLabel: 'id',value: domAction.id},
	                	{id: domAction.id+'_actionName',fieldLabel: '名称',allowBlank:false,readOnly: this.readOnly,value: domAction.text},
	                	//{id: domAction.id+'_actionUrl',fieldLabel: '指定URL',value: domAction.getActionUrl(),readOnly: this.readOnly},
	                	//{id: domAction.id+'_actionUrlaaaa',fieldLabel: '名称aaa',allowBlank:false,readOnly: this.readOnly,value: domAction.getActionUrl()+'_'+domAction.getActionUrlDes()},
	                	new Ext.ux.ComboBoxTree({
				                //hiddenName : 'formUrl'
				                id: domAction.id+'_actionUrl'
				                ,fieldLabel: '指定URL'
				                ,disabled: this.readOnly
				                ,tree :{
										xtype:'treepanel',
										loader: new Ext.ux.tree.TreeLoader({dataUrl:'../flow/getFormList.html'}),
							       	 	root : new Ext.tree.AsyncTreeNode({id:'0',text:'所有表单'})
							    	}
							    ,allowBlank:false	
							    ,forceSelection: true
							    ,selectNodeModel:'leaf'
								,forceReload : true							    
			            }),
			            /*{id: domAction.id+'_panel',xtype:'panel',border: true,
			            	items:[{
			            		id: domAction.id+'_column',
			            		layout: 'column',
			            		border: true,
			            		items: [
			            			{layout: 'form',border:false,labelWidth: 75,columnWidth : .8,
			            				items:[
			            					new Ext.ux.ComboBoxTree({
								                id: domAction.id+'_actionUrl'
								                ,anchor:'90%'
								                ,fieldLabel: '指定URL'
								                ,tree :{
															xtype:'treepanel',
															loader: new Ext.ux.tree.TreeLoader({dataUrl:'form/formTree.html'}),
												       	 	root : new Ext.tree.AsyncTreeNode({id:'0',text:'所有表单'})
													    }
											    //,allowBlank:false	
											    ,forceSelection: true
											    ,selectNodeModel:'leaf'
								            })
							           ]
						            }
			            			,
			            			{columnWidth : .2,labelWidth: 75,border:false,
			            				items:[new Ext.Button({text:'新建',handler: function(){
			            					var tabPanel = window.parent.Ext.getCmp('flow-tabs');
			            					var panel = new window.parent.Ext.Panel({
			            						//id: 'createForm',
									            title: '新建表单',
									            layout: 'fit',
									            autoLoad: {url:"form/quickFormManager.jsp",scripts: true,scope: this},//html: '<iframe  frameborder="0"  scrolling="no" width="100%" height="100%" src = "form/formManger.jsp"></iframe>',
									            closable: true//,
									            //html:'aa'
									        });
									        tabPanel.add(panel);
									        tabPanel.activate(panel);
											tabPanel.doLayout();
			            				}})]
									}
								]
							}]
            			},*/
		                this.createActionTypeCombo(domAction)
	                ]
	            });
	            var actionForm = actionTab.findById('actionTab_'+domAction.id);
				actionForm.findById(domAction.id+'_actionName').on('change',this.changeTitle,{parent: actionForm,dom: domAction,emptyValue: '行为'});
			}
		}
		
	},
	removeAction : function(domAction){//删除一个action，在actionTab中移除一个标签页
		var eventId = this.findById('eventId');
		var domEvent = domAction.domEvent;
		if(eventId){
			if(eventId.value == domEvent.id){//确定当前form就是被添加action的事件
				var actionTab = this.findById('actionTab');
				actionTab.remove('actionTab_'+domAction.id);
			}
		}
	},
	/*assignmentZDTypeComboChange : function(combo,record,index){
		var formPanel = this.formPanel;
		var assignmentFS = this.fieldSet;
		var domTask = this.domTask;
		//actionExcepression.el.up('.x-form-item').remove();
		//actionForm.remove(actionExcepression);
		
		var newZDType = combo.getValue();
		var oldZDType = combo.oldZDType;
		var assZDValue = assignmentFS.findById('assignmentZDValue');
		
		if(newZDType==oldZDType) return;
		if(assZDValue){
			assZDValue.el.up('.x-form-item').remove();
			assignmentFS.remove(assZDValue);
			domTask.setAssignmentZDValue('');
			domTask.setAssignmentZDValueDes('');
		}
		if(newZDType == 'user'){
			var zdComboWin = formPanel.createComboWindow('assignmentZDValue','指定人','code','编号','xingMing','姓名',projectPath+'/admin/userListForWin.html');
			assignmentFS.add(zdComboWin);
			formPanel.doLayout();
			zdComboWin.setValue({value: domTask.getAssignmentZDValue(),text:domTask.getAssignmentZDValueDes()});
		}else if(newZDType == 'role'){
			var zdComboWin = formPanel.createComboWindow('assignmentZDValue','指定角色','code','编号','name','名称',projectPath+'/admin/roleForComboWin.html');
			assignmentFS.add(zdComboWin);
			formPanel.doLayout();
			//alert(domTask.getAssignmentZDValue());
			zdComboWin.setValue({value: domTask.getAssignmentZDValue(),text:domTask.getAssignmentZDValueDes()});
			//alert(zdComboWin.getValue());
		}else if(newZDType == 'department'){
			var zdComboWin = formPanel.createComboWindow('assignmentZDValue','指定部门','code','编号','name','名称',projectPath+'/admin/departmentForComboWin.html');
			assignmentFS.add(zdComboWin);
			formPanel.doLayout();
			zdComboWin.setValue({value: domTask.getAssignmentZDValue(),text:domTask.getAssignmentZDValueDes()});
		}else if(newZDType == 'jobtitle'){
			var zdComboWin = formPanel.createComboWindow('assignmentZDValue','指定职位','code','编号','name','名称',projectPath+'/admin/jobTitleForComboWin.html');
			assignmentFS.add(zdComboWin);
			formPanel.doLayout();
			zdComboWin.setValue({value: domTask.getAssignmentZDValue(),text:domTask.getAssignmentZDValueDes()});
		}
	},*/
	createAssignmentZDGrid : function(formPanel){
				var assignmentZDGrid = new Ext.grid.GridPanel({
			    	id: 'assignmentZDGrid',
			   		viewConfig: {forceFit:true},
			   		autoHeight: true,
			        store: new Ext.data.SimpleStore({
				    	data: [
					    ],
				    	autoLoad: true,
				        fields: ['id','name','type']
				    }),
			        columns: [
			            { header: '委派对象',width: document.body.clientWidth*0.6,dataIndex: 'name'},
			            { header: '类别',width: document.body.clientWidth*0.3,sortable: true,dataIndex: 'type',renderer: function(v){
			         		var typeStr = '';
			            	switch (v) {
						      case 'id':
						      	typeStr = '人员';
						        break;
						      case 'department':
						      	typeStr = '部门';
						        break;
						      case 'organization':
						      	typeStr = '单位';
						        break;
						      case 'jobTitle':
						      	typeStr = '职位';
						        break;
						      case 'group':
						      	typeStr = '群组';
						      	break;
						      case 'role':
						      	typeStr = '角色';
						        break;
						      case 'varName':
						      	typeStr = '自定义';
						        break;
						    }
						    return typeStr;
			            }}
			        ],
			        autoExpandColumn: 'type',
			        tbar : [
			        	'->',
			        	//{text: '部门',handler: function(){formPanel.addAssignmenZDPanel(assignmentZDGrid,{_type: 'department',_title: '添加委派部门',_url: '../admin/departmentForComboWin.html'})}},
			        	//{text: '职位',handler: function(){formPanel.addAssignmenZDPanel(assignmentZDGrid,{_type: 'jobTitle',_title: '添加委派职位',_url: '../admin/jobTitleForComboWin.html'})}},
			        	{text: '单位',handler: function(){formPanel.addAssignmenZDTree(assignmentZDGrid,{_type: 'organization',_title: '添加委派单位',_url: '../admin/organizationTree.html'})}},
			        	{text: '部门',handler: function(){formPanel.addAssignmenZDTree(assignmentZDGrid,{_type: 'department',_title: '添加委派部门',_url: '../admin/departmentTree.html'})}},
			        	{text: '职位',handler: function(){formPanel.addAssignmenZDTree(assignmentZDGrid,{_type: 'jobTitle',_title: '添加委派职位',_url: '../admin/jobTitleTree.html'})}},
			        	
			        	{text: '群组',handler: function(){formPanel.addAssignmenZDPanel(assignmentZDGrid,{_type: 'group',_title: '添加委派群组',_url: '../admin/groupForComboWin.html'})}},
			        	{text: '角色',handler: function(){formPanel.addAssignmenZDPanel(assignmentZDGrid,{_type: 'role',_title: '添加委派角色',_url: '../admin/roleForComboWin.html'})}},
			        	{text: '人员',handler: function(){formPanel.addAssignmenZDPanel(assignmentZDGrid,{_type: 'id',_title: '添加委派人员',_url: '../admin/userListForWin.html'})}},
			        	{text: '变量',handler: function(){formPanel.addAssCustomZD(assignmentZDGrid)}}
			        ]
			    });
			    assignmentZDGrid.on('rowcontextmenu', function(client,rowIndex,e){//变量grid的右键
			   		var item = new Ext.menu.Item({text: '删除',iconCls:'delete-icon',handler: function(button,e){
			            	var record = assignmentZDGrid.getStore().getAt(rowIndex);
			            	assignmentZDGrid.getStore().remove(record);
			            }});
			        if(operType=='view'){
						item.disable(); 
					}
			   		var rightClick = new Ext.menu.Menu( {
			            items : [item]
			        });
			        e.preventDefault();
		        	rightClick.showAt(e.getXY());
			   	});
			   	return assignmentZDGrid;
	},
	
	//添加自定义委派对象
	addAssCustomZD : function(parentGrid){
		var addAssCustomWin = new Ext.Window({
			title : '添加自定义委派对象',
	        layout:'border',
	        width:480,
	        height:270,
	        closeAction:'close',
	        buttonAlign : 'center',
	        resizable:false,
	        modal : true,
	        plain: true,
	        items : [
	        	{xtype:'panel',region: 'north',margins: '3 3 0 3',frame:true,height: 35,html:'可以定义多个委派对象，用逗号分隔(assignment1,assignment2...)'},
	        	{xtype:'textarea',id:'assCustomArea',margins: '3 3 3 3',region: 'center'}
	        ]
	    });
	    addAssCustomWin.addButton({text: '确定'},function(){
	    	var assCusValue = Ext.getCmp('assCustomArea').getValue();
	    	if(assCusValue==null||assCusValue=='') return;
	    	var assCusValueAry = assCusValue.split(',');
	    	for(var i=0;i<assCusValueAry.length;i++){
	    		parentGrid.store.insert(0,new Ext.data.Record({id:assCusValueAry[i],name:assCusValueAry[i],type:'varName'}));
	    	}
	    	addAssCustomWin.close();
	    });
	    addAssCustomWin.addButton({text: '关闭'},function(){addAssCustomWin.close();});
	    addAssCustomWin.show();
	},
	//用树添加委派部门，职位
	addAssignmenZDTree : function(parentGrid,assTreeConf){
		var addAssWin = new Ext.Window({
			title : assTreeConf._title,
	        layout:'fit',
	        width:340,
	        height:360,
	        closeAction:'close',
	        buttonAlign : 'center',
	        resizable:false,
	        modal : true,
	        plain: true
	    });
	    var _treePanel = new Ext.tree.TreePanel({
	    	//region: 'center',
	    	rootVisible: false,
	        enableDD: false,
	        autoScroll : true,
	        collapseFirst: false,
	       	loader: new Ext.tree.TreeLoader({
	       		baseAttrs: { uiProvider: Ext.tree.TreeCheckNodeUI },
	       		dataUrl: assTreeConf._url
		    }),  
	        root: new Ext.tree.AsyncTreeNode({draggable: false}),
	        listeners : {'expandnode': function(parentNode){
		        	//findChild
		        	for (var i = 0; i < parentGrid.store.data.length; i++) {
		        		if(assTreeConf._type == parentGrid.store.data.items[i].data.type){
		        			var checkedNode = parentNode.findChild('id',parentGrid.store.data.items[i].data.id);
			        		checkedNode.ui.toggleCheck(true);
		        		}
		        	}
		        }},
	        tbar: [
	        	'->',
	        	{
					xtype:'textfield',
					id : 'assSearchText'
				},
				{
		            text: '查询',
		            iconCls: 'search-icon',
		            handler : function(){
		            	var searchValue = Ext.getCmp("assSearchText").getValue();
		            	/*var filter = new Ext.tree.TreeFilter(_treePanel, {
							clearBlank: true,
							autoClear: true
						});
						var searchValue = Ext.getCmp("assSearchText").getValue();
						
						//var re = new RegExp('^' + Ext.escapeRe(searchValue), 'i');
						filter.filterBy(function(n){
							//return re.test(n.text);
							return (n.text.indexOf(searchValue)==-1)?false:true;
						});*/
						_treePanel.getLoader().baseParams = {searchValue : searchValue};
						_treePanel.getLoader().load(_treePanel.root);
		            }
		        },
				{
		            text: '显示全部',
		            handler: function(){
		            	_treePanel.getLoader().baseParams = {outCon : null};
						_treePanel.getLoader().load(_treePanel.root);
		            	//_treePanel.root.reload();
		            }
		        }
	        ]
	    });
	    addAssWin.add(_treePanel);
	    addAssWin.addButton({text: '确定'},function(){
	    	var checkeds = _treePanel.getChecked();
	    	if(checkeds==null){
	    		Ext.Msg.alert('提示','没有选中数据！');
	    		return;
	    	}
	    	var pgValues = new Array();
	    	for (var j = 0; j < parentGrid.store.data.length; j++) {
	    		if(assTreeConf._type == parentGrid.store.data.items[j].data.type){
					pgValues.add(parentGrid.store.data.items[j].data.id);
				}
	    	}
	    	for(var i=0;i<checkeds.length;i++){
	    		var checkedObj = checkeds[i];
	    		if(pgValues.indexOf(checkedObj.id)>-1) continue;
	    		parentGrid.store.insert(0, new Ext.data.Record({id:checkedObj.id,name:checkedObj.text,type: assTreeConf._type}));
	    	}
	    	addAssWin.close();
	    	//alert(checkeds.length);
	    });
	    addAssWin.addButton({text: '关闭'},function(){addAssWin.close();});
	    addAssWin.show();
	},
	//用grid添加委派角色人员
	addAssignmenZDPanel : function(parentGrid,assGridConf){
		//已经存在父grid中的数值
		var condition = "";
		for (var j = 0; j < parentGrid.store.data.length; j++) {
			if(assGridConf._type == parentGrid.store.data.items[j].data.type){
					condition += "'" + parentGrid.store.data.items[j].data.id + "',";
			}
		}
		if(condition!="")
			condition = "(" + condition.substring(0,condition.length-1) + ")";
		//:~
		var addAssWin = new Ext.Window({
			title : assGridConf._title,
	        layout:'fit',
	        width:640,
	        height:360,
	        closeAction:'close',
	        buttonAlign : 'center',
	        resizable:false,
	        modal : true,
	        plain: true
	    });
	    
	    var _sm = new Ext.grid.CheckboxSelectionModel();
	    var nameMap = (assGridConf._type == 'id')?'xingMing':'name';
	    var nameDes = (assGridConf._type == 'id')?'姓名':'名称';
	    var _fields = [{name: 'code' },{name: 'name',mapping : nameMap},{name: 'type',convert: function(v){return assGridConf._type;}},{name: 'id'}];
	    var _store = new Ext.data.Store({
					proxy: new Ext.data.HttpProxy({url: assGridConf._url}),
           			reader: new Ext.data.JsonReader(
           				{
	           				totalProperty:'total',
	           				root:'root'
           				},
           				_fields
           			),
           			baseParams : {outCon : condition},
	           		remoteSort: false//,
	           		//autoLoad: true
        });
		var _gridPanel =  new Ext.grid.GridPanel({
	       	loadMask: true,
	        store: _store,
     		cm: new Ext.grid.ColumnModel([
     				_sm,
	       			{id:'code', header: '编号',hidden: false,sortable: true, dataIndex: 'code'},
	       			{id:'name', header: nameDes,hidden: false,sortable: true, dataIndex: 'name'}]),
	        sm: _sm,
	        viewConfig: {forceFit:true},
	        tbar: [
	        	'->',
	        	{
					xtype:'textfield',
					id : 'assSearchText'
				},
				{
		            text: '查询',
		            iconCls: 'search-icon',
		            handler: function(){
		            	var para = {searchValue:'',outCon : condition};
						if(Ext.getCmp("assSearchText")){
							para.searchValue = Ext.getCmp("assSearchText").getValue();
						}
						Ext.apply(_store.baseParams,para);
						_store.load({params:{start:0,limit:10}});
		            }
		        },
				{
		            text: '显示全部',
		            handler: function(){
		            	_store.baseParams={outCon : condition};
						_store.load({params:{start:0,limit:10}});
		            }
		        }
	        ],
	        bbar : new Ext.PagingToolbar({
				    pageSize: 10,
				    store: _store, 
				    displayInfo: true,
				    displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
				    emptyMsg: "没有记录"
				})
	    });
	    addAssWin.add(_gridPanel);
	    _gridPanel.store.load({params:{start:0,limit:10}});
	    addAssWin.addButton({text: '确定'},function(){
	    	var selectedRows = _gridPanel.getSelectionModel().getSelections();
			parentGrid.store.insert(0, selectedRows);
			addAssWin.close();
	    });
	    addAssWin.addButton({text: '关闭'},function(){addAssWin.close();});
	    addAssWin.show();
	},
	
	//条件类型选择框
	conditionTypeComboChange : function(combo,record,index){
		var formPanel = this.formPanel;
		var domTran = this.domTran;
		var newValue = combo.getValue();
		var oldValue = combo.oldValue;
		if(newValue == oldValue) return false;
		else{
			//alert(domTran);
			//删
			var conditionTypeExpression = formPanel.findById('conditionTypeExpression');
			var conditionTypeScript = formPanel.findById('conditionTypeScript');
			if(conditionTypeExpression){
				conditionTypeExpression.el.up('.x-form-item').remove();
				formPanel.remove(conditionTypeExpression);
			}
			if(conditionTypeScript){
				conditionTypeScript.el.up('.x-form-item').remove();
				formPanel.remove(conditionTypeScript);
			}
			//增
			if(newValue=='Expression'){
				formPanel.add({xtype: 'textarea',id: 'conditionTypeExpression',fieldLabel: '表达式',value: domTran.getExpression(),readOnly: formPanel.readOnly,anchor:'90%'});
				formPanel.doLayout();
			}else if(newValue=='Script'){
				formPanel.add({xtype: 'textarea',id: 'conditionTypeScript',fieldLabel: '脚本',value: domTran.getScript(),readOnly: formPanel.readOnly,anchor:'90%'});
				formPanel.doLayout();
			}
			combo.oldValue = newValue;
		}
	},
	//===================其他公用方法=============================
	createLocalCombo : function(id,fieldLabel,data){//共用的创建本地combo的方法
		var store = new Ext.data.SimpleStore({
	        fields: ['id', 'name'],
	        data : data 
	    });
		var combo = new Ext.form.ComboBox({
			id: id,
			forceSelection : true,
			triggerAction : 'all',
			store : store,
			disabled : this.readOnly ,
			valueField : 'id',
			displayField : 'name',
			mode : 'local',
			fieldLabel: fieldLabel,
			emptyText : '请选择 ... ',
			anchor:'90%'
		});
		return combo;
	},
	createCombo : function(_id,_fieldLabel,_valueField,_displayField,_root,_url,_listeners,_readOnly){

		return new Ext.form.ComboBox({
								id: _id,
								fieldLabel: _fieldLabel,
								anchor:'90%',
								disabled: _readOnly,
								triggerAction: 'all',
								forceSelection:false,
				  				displayField :_displayField, 
								valueField :_valueField,
								//allowBlank: false,
								store : new Ext.data.Store({ 
									proxy:new Ext.data.HttpProxy({url: _url}),
									reader:new Ext.data.JsonReader(
										{root:_root},
										[{name:_valueField},{name:_displayField}]),
									remoteSort:false,
									autoLoad:true,
									listeners: _listeners
								}) 
							});
	},
	createComboWindow : function(_id,_fieldLabel,_valueField,_valueFieldDes,_displayField,_displayFieldDes,_url){
		return new Ext.itsm.form.ComboWindow({
	           		id:_id,//'assignmentZDValue',
	           		fieldLabel:_fieldLabel,//'指定人',
	           		anchor:'90%',
	           		displayField : _displayField,//'xingMing',
	           		valueField : 'id',//'code',
	           		store: new Ext.data.Store({
					proxy: new Ext.data.HttpProxy({url:_url}),//projectPath+'/admin/userListForWin.html'
	           			reader: new Ext.data.JsonReader({
	           				totalProperty:'total',
	           				root:'root'
	           			},[{name: _valueField },{name: _displayField},{name: 'id'}]),
	           			remoteSort: false,autoLoad:false
	           		}),
	       			columnModel:new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),
		       			new Ext.grid.CheckboxSelectionModel(),
		       			{id:_displayField, header: _displayFieldDes,hidden: false,sortable: true, dataIndex: _displayField},
		       			//{ header: 'id',hidden: false,sortable: true, dataIndex: 'id'},
		       			{id:_valueField, header: _valueFieldDes,hidden: false,sortable: true, dataIndex: _valueField}]),
	       			singleSelect : true,
	       			searchCondition : [[_displayField,_displayFieldDes,'string'],[_valueField,_valueFieldDes,'string']]
	   			});
	},
	changeTitle : function(field,newValue,oldValue){//根据名称改变form和DOM树上节点的title
		
		if(this.dom.metaNodeModel){//节点
			//节点名称不能重复
			var nodeNameFlag = true;
			var metaNodes = xiorkFlow.getWrapper().metaNodes;
			for(var i=0;i<metaNodes.size();i++){
				if(this.dom.id==i) continue;
				var mName = metaNodes.get(i).getModel().getText();
				if(mName==newValue){
					nodeNameFlag=false;
				}
			}
			//:~
			if(nodeNameFlag){//节点名不重复
				if(newValue!=''){
					this.parent.setTitle(newValue);
					this.dom.setText(newValue);
					this.dom.metaNodeModel.setText(newValue);
				}else{
					field.setValue(oldValue);
					Ext.Msg.alert('提示','节点名称不能为空！');
				}
					//this.dom.metaNodeModel.setText(this.emptyValue);
			}else{//节点名重复
				field.setValue(oldValue);
				Ext.Msg.alert('提示','节点名称不能重复！');
			}
		}else if(this.dom.transitionModel){//迁移
			//同一节点下的迁移不能重名
			var metaNodeForm = this.dom.transitionModel.getFromMetaNodeModel();
			var metaTranFroms = metaNodeForm.getFroms();
			var tranNameFlag = true;
			for(var i=0;i<metaTranFroms.size();i++){
				if(this.dom.id==i) continue;
				var mName = metaTranFroms.get(i).getText();
				if(mName==newValue){
					tranNameFlag=false;
				}
			}
			if(tranNameFlag){//迁移名不重复
				if(newValue!=''){
					this.parent.setTitle(newValue);
					this.dom.setText(newValue);
					this.dom.transitionModel.setText(newValue);
				}else{
					this.parent.setTitle(this.emptyValue);
					this.dom.setText(this.emptyValue);
					this.dom.transitionModel.setText('')
				}
			}else{//迁移名重复
				field.setValue(oldValue);
				Ext.Msg.alert('提示','迁移名称不能重复！');
			}
			//:~
		}else{//其它
			if(newValue!=''){
				this.parent.setTitle(newValue);
				this.dom.setText(newValue);
			}else{
				this.parent.setTitle(this.emptyValue);
				this.dom.setText(this.emptyValue);
			}
		}
	},
	columnPanelBtu : function(_text){
		return new Ext.Button({text:_text,disabled: this.readOnly,handler: function(){
//  				var tabPanel = window.parent.Ext.getCmp('flow-tabs');
//  				var panel = new window.parent.Ext.Panel({
//		            title: '新建表单',
//		            layout: 'fit',
//		            autoLoad: {url:"form/quickFormManager.jsp",scripts: true,scope: this},
//		            closable: true
//        		});
//		        tabPanel.add(panel);
//		        tabPanel.activate(panel);
//				tabPanel.doLayout();
//				var x = window.open();
//				x.location = "http://localhost:8080/forceflow/formManagerMain.jsp";
      	}})
	},
	columnPanelComboTree : function(_id,_fieldLabel){
		var scope = this;
		if( typeof this._hasFormSupport == 'undefined'){
			Ext.lib.Ajax.syncRequest("POST", '../flow/getFormList.html', "", {
				success : function(r,o){
					scope._hasFormSupport = true;
				},
				failure : function(r,o){
					scope._hasFormSupport = false;
				}
			});
		}
		if(this._hasFormSupport){
			return new Ext.ux.ComboBoxTree({
	               id: _id
	               ,anchor:'90%'
	               ,fieldLabel: _fieldLabel
	               ,disabled: this.readOnly
	               ,tree :{
							xtype:'treepanel',
							loader: new Ext.ux.tree.TreeLoader({dataUrl:'../flow/getFormList.html'}),
				       	 	root : new Ext.tree.AsyncTreeNode({id:'0',text:'所有表单'})
					    }
			    ,forceSelection: true
			    ,selectNodeModel:'leaf'
			    ,forceReload : true	
	        });
		}else{
			var URLtextField = function(cfg){URLtextField.superclass.constructor.call(this,cfg);};
			Ext.extend(URLtextField,Ext.form.TextField,{
				setValue : function(v){
					if(typeof v == 'object'){
						URLtextField.superclass.setValue.call(this,v.id);
					}else{
						URLtextField.superclass.setValue.call(this,v);
					}
				}
			});
			return new URLtextField({
				id : _id
				,anchor : '90%'
				,fieldLabel: _fieldLabel
				,disabled: this.readOnly
			});
		}
		
	},
	columnPanel : function(_id,_fieldLabel){
	 	return {xtype:'panel',border:false,
          	items:[{
        		layout: 'column',
          		border:false,
          		items: [
          			{layout: 'form',border:false,labelWidth: 65,columnWidth : .8,
          				items:[this.columnPanelComboTree(_id,_fieldLabel)]
	            },
         		{columnWidth : .2,labelWidth: 75,border:false,
         			items:[this.columnPanelBtu('新建')]
				}
			]
		  }]
       	};
	 }
});


