/**
 * 流程监控，流程列表
 * @param {} tabPanel
 * @param {} node
 */

FlowMonitorViewPanel = function(tabPanel, node) {
	this.tabPanel = tabPanel;
	this.node = node;
	var flowMonitorView = this;
	var tbar = null;
	if(this.node){
		tbar = {text: '监控首页',iconCls:'model-home-icon',handler: function(){tabPanel.loadFlowMonitorHomePanel()}};
	}else{
		tbar = {text: '监控首页',iconCls:'model-home-icon',handler: function(){tabPanel.setActiveTab(0)}};
	}
	/*
	 * this.form = new Ext.FormPanel({ id: 'form', region: 'north',
	 * labelWidth:65, bodyStyle: 'padding:10px 20px 0', frame: false, height:
	 * 120, hidden : true, tbar: [ {xtype: 'tbtext',text: '流程基本属性'},'->', {text:
	 * '流程挂起',handler: function(){flowMonitorView.hangFlow(flowMonitorView)}},
	 * {text: '取消挂起',handler:
	 * function(){flowMonitorView.unHangFlow(flowMonitorView)}},'-', {text:
	 * '隐藏',handler: function(){flowMonitorView.hideFlowForm(flowMonitorView)}} ],
	 * bbar: [{xtype: 'tbtext',text: '流程实例监控'}], items:[ {
	 * layout:'column',border:false,labelSeparator:':', defaults:{layout:
	 * 'form',border:false,columnWidth:.5}, items:[ {xtype:'hidden',id: 'id'},
	 * //{items: [{id: 'code',xtype:'textfield',readOnly: true,fieldLabel:
	 * '流程编码',anchor:'90%'}]}, {items: [{id: 'name',xtype:'textfield',readOnly:
	 * true,fieldLabel: '流程名称',anchor:'90%'}]}, {items: [{id:
	 * 'version',xtype:'textfield',readOnly: true,fieldLabel:
	 * '流程版本',anchor:'90%'}]}, //{items: [{xtype:'combo',fieldLabel:
	 * '单位类别',store:ds_sex,triggerAction:
	 * 'all',valueField:'id',displayField:'sex',mode: 'local',typeAhead:
	 * true,name: 'xbie',anchor:'90%'}]},htmleditor {columnWidth:1.06,items:
	 * [{id: 'description',xtype:'textarea',height: 30,readOnly:
	 * true,fieldLabel: '描述',anchor:'90%'}]} ]//items } ]//items });
	 */// FormPanelnew
	var store = new Ext.data.Store({
				autoLoad : true,
				baseParams : {limit:20},
				proxy : new Ext.data.HttpProxy({
							url : this.node ? 'flow/listByBp.html?nodeId=' + node.id : 'flow/bpiAdvancedSearch.html'
						}), // 10000000000000000000000000000000
				reader : new Ext.data.JsonReader({
							root : 'root',
							totalProperty : 'total',
							successProperty : 'success',
							fields : ["id", "jbpmProcessInstanceID", "code",
									"bpDefFile", "applicant", "state",
									"processors", "summary", "url",
									"jbpmTaskInstanceID",
									"executedNodesSequence","customerSatisfaction"]
				})/*,
				listeners : {
					'load' : function(store, records){
						var instanceIds = store.collect('id') + "";
						if(instanceIds!=null && instanceIds!=""){
							Ext.Ajax.request({
						        url: 'servicevalue/calculateForBpi.html',
						        method: 'POST',
						        params: {instanceIds:instanceIds, type:null},
						        success: function(response, options){
									var result = Ext.util.JSON.decode(response.responseText);
									for(var i=0; i<result.length; i++){
										var num = store.find("id",result[i].id);
										var rec = store.getAt(num);
										if(rec!=undefined){
											rec.set("customerSatisfaction",result[i].level);
											rec.dirty = false;
											rec.commit(); 
										}
									}
						        },
						        scope : this
						    });
						}
					}
				}*/
			});
	this.searchStore = store;
	var cols = new Ext.grid.ColumnModel([{
				header : $lang('workflow.flowMonitor.gridHeader.processNo')/*"工单号"*/,
				sortable : true,
				dataIndex : "code"
			}, {
				header : $lang('workflow.flowMonitor.gridHeader.processName')/*"流程"*/,
				sortable : true,
				dataIndex : "bpDefFile",
				renderer : function(val) {
					if (typeof val == 'string')
						return val;
					if (val)
						return val.name;
				}
			}, {
				header : $lang('workflow.flowMonitor.gridHeader.applicant')/*"申请人"*/,
				sortable : true,
				dataIndex : "applicant",
				renderer : function(val) {
					if (typeof val == 'string')
						return val;
					if (val)
						return val.xingMing;
				}
			}, {
				header : $lang('workflow.flowMonitor.gridHeader.currentState')/*"当前状态"*/,
				sortable : true,
				dataIndex : "state",
				renderer : function(val) {
					if (typeof val == 'string')
						return val;
					if (val)
						return val.name;
				}
			}, {
				header : $lang('workflow.flowMonitor.gridHeader.currentProcessor')/*"当前处理人"*/,
				dataIndex : "processors",
				renderer : function(val) {
					if (typeof val == 'string')
						return val;
					if (val)
						return val.xingMing;
				}
			}, {
				header : $lang('workflow.flowMonitor.gridHeader.summary')/*"摘要"*/,
				dataIndex : "summary"
			},{
				header : '用户满意度',
				dataIndex : "customerSatisfaction",
				renderer : function(v,m,r){
				var result="";
				if(v<=5&&v>=1){
					for( var i=0; i<5; i++) {
						if(i<v){
							result += "<img src='images/servicevalue/satisfaction.gif'/>";
						}else{
							result += "<img src='images/servicevalue/dissatisfied.gif'/>";
						}
					}
				}else{
					result="未评价";
				}
				return result;
			}
			}]);

	this.grid = new Ext.grid.GridPanel({
				id : 'flow-main-grid',
				region : 'center',
				border : false,
				loadMask : {
					msg : $lang('workflow.flowMonitor.loading')/*'正在载入 ...'*/
				},
				viewConfig : {
					forceFit : true,
					enableRowBody : true,
					showPreview : true
				},
				ds : store,
				cm : cols,
				autoExpandColumn : 'code',
				tbar: [tbar],
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : store,
							displayInfo : true,
							displayMsg : $lang('workflow.flowMonitor.displayMsg')/*"显示第 {0} 条到 {1} 条记录，一共 {2} 条"*/,
							emptyMsg : $lang('workflow.flowMonitor.emptyMsg')/*"没有记录"*/
						})
			});
	this.grid.on('rowdblclick', this.playFlow, this);

	this.grid.on('rowcontextmenu', this.gridOnContextClick, this);

	FlowMonitorViewPanel.superclass.constructor.call(this, {
				id : 'flow-monitor-view',
				// layout:'border',
				layout : 'fit',
				margins : '0 0 0 0',
				border : false,
				// items: [this.form,this.grid]
				items : [this.grid]
			});

};

Ext.extend(FlowMonitorViewPanel, Ext.Panel, {
	playFlow: function(grid, rowIndex, e){
				var formView= this;
				var record = formView.grid.store.getAt(rowIndex);
				var tabPanel = formView.tabPanel;
				var processName = record.get('bpDefFile').filePath.replace('define','').replace('.xml','');
				var panel = new Ext.Panel({
					id : 'play_panel',
		            title: record.get('code')+$lang('workflow.flowMonitor.processReplay')/*'流程回演'*/,
		            layout: 'fit',
		            recordObj : record,
		        	html: '<iframe  frameborder="0"  scrolling="no" width="100%" height="100%" src = "workflow/flowDesign.jsp?opertype=play&name='+processName+'&flowinsid='+record.get('id')+'&executednodessequence='+record.get('executedNodesSequence')+'" />',//workflow/demo/addprocess.jsp
		            closable: true
		        });
		        tabPanel.add(panel);
		        tabPanel.activate(panel);
				tabPanel.doLayout();
	},
		playFlowWithMenu: function(){
				var formView= this.formView;
				var rowIndex= this.rowIndex;
				var record = formView.grid.store.getAt(rowIndex);
				var tabPanel = formView.tabPanel;
				var processName = record.get('bpDefFile').filePath.replace('define','').replace('.xml','');
				var panel = new Ext.Panel({
					id : 'play_panel',
		            title: record.get('code')+$lang('workflow.flowMonitor.processReplay')/*'流程回演'*/,
		            layout: 'fit',
		            recordObj : record,
		        	html: '<iframe  frameborder="0"  scrolling="no" width="100%" height="100%" src = "workflow/flowDesign.jsp?opertype=play&name='+processName+'&flowinsid='+record.get('id')+'&executednodessequence='+record.get('executedNodesSequence')+'" />',//workflow/demo/addprocess.jsp
		            closable: true
		        });
		        tabPanel.add(panel);
		        tabPanel.activate(panel);
				tabPanel.doLayout();
	},
	gridOnContextClick : function(grid, rowIndex, e) {
		var formView = this;
		var showFlowItem = new Ext.menu.Item({
					text : $lang('workflow.flowMonitor.processBaseInfoView')/*'查看流程基本信息'*/
				});
		showFlowItem.on('click', this.showFlowForm, {
					formView : this,
					rowIndex : rowIndex
				});
		var nodeInsFlowItem = new Ext.menu.Item({
					text : $lang('workflow.flowMonitor.processInstanceInfo'),/*'流程实例信息'*/
					iconCls : 'workflow-mng-icon'
				});
		nodeInsFlowItem.on('click', this.showNodeInstance, {
					formView : this,
					rowIndex : rowIndex
				});

		var openItem = new Ext.menu.Item({
					text : $lang('workflow.flowMonitor.edit')/*'编辑'*/,
					iconCls : 'modify-icon'
				});
		openItem.on('click', this.openForm, {
					formView : this,
					rowIndex : rowIndex
				});
		var deleteItem = new Ext.menu.Item({
					text : $lang('workflow.flowMonitor.delete')/*'删除'*/,
					iconCls : 'delete-icon'
				});
		deleteItem.on('click', this.deleteForm, {
					formView : this,
					rowIndex : rowIndex
				});
		var editItem = new Ext.menu.Item({
					text : $lang('workflow.flowMonitor.modifyProcessor')/*'修改处理人'*/,
					iconCls : 'view-icon'
				});
		editItem.on('click', this.editForm, {
					formView : this,
					rowIndex : rowIndex
				});
		var playFlowItem = new Ext.menu.Item({
					text : $lang('workflow.flowMonitor.processReplay'),/*'流程回演'*/
					iconCls : 'workflow-icon'
				});
		playFlowItem.on('click', this.playFlowWithMenu, {
					formView : this,
					rowIndex : rowIndex
				});

		var rightClick = new Ext.menu.Menu({
					items : [
							// {text : '查看流程基本信息',handler:
							// function(){formView.showFlowForm(formView)}},
//							取消注释添加
//							showFlowItem,
							playFlowItem, 
							nodeInsFlowItem, '-', 
							openItem,
							deleteItem, '-', 
							editItem
					// {text : '流程回演',handler:
					// function(){formView.playFlow(formView)}},
					// {text : '流程实例信息',handler:
					// function(){formView.showNodeInstance(formView)}}
					]
				});
		e.preventDefault();
		rightClick.showAt(e.getXY());
	},
	showFlowForm : function() {
		var formView = this.formView;
		var rowIndex = this.rowIndex;
		var record = formView.grid.store.getAt(rowIndex);
		var process = record.get('bpDefFile');
		var form = formView.form;
		form.findById('id').setValue(process.id);
		// form.findById('code').setValue(process.code);
		form.findById('name').setValue(process.name);
		form.findById('version').setValue(process.version);
		form.findById('description').setValue(process.description);
		form.show();
		formView.doLayout();
	},
	hideFlowForm : function(formView) {
		formView.form.hide();
		formView.doLayout();
	},
	hangFlow : function(formView) {
		var m = Ext.MessageBox.confirm($lang('workflow.flowMonitor.Msg.tips')/*"提示"*/, $lang('workflow.flowMonitor.Msg.checkHungUp')/*"是否真的要挂起该流程的所有实例？"*/, function(ret) {
					if (ret == "yes") {
						Ext.MessageBox.alert($lang('workflow.flowMonitor.Msg.tips')/*"提示"*/,$lang('workflow.flowMonitor.Msg.hungUpSuccess')/*'该流程的所有实例都被挂起来了'*/);
					}
				});
	},
	unHangFlow : function(formView) {
		var m = Ext.MessageBox.confirm($lang('workflow.flowMonitor.Msg.tips')/*"提示"*/, $lang('workflow.flowMonitor.Msg.checkUnhungUp')/*"是否真的要取消挂起该流程的所有实例？"*/,
				function(ret) {
					if (ret == "yes") {
						Ext.MessageBox.alert($lang('workflow.flowMonitor.Msg.tips')/*"提示"*/,$lang('workflow.flowMonitor.Msg.unhungUpSuccess')/*'该流程的所有实例的挂起都被取消了'*/);
					}
				});
	},
	showNodeInstance : function() {
		var formView = this.formView;
		var rowIndex = this.rowIndex;
		var record = formView.grid.store.getAt(rowIndex);
		var xingMing = '';
		var applicant = record.get('applicant');
		if (applicant)
			xingMing = applicant.xingMing;

		var stateName = '';
		var state = record.get('state');
		if (state)
			stateName = state.name;

		var tabPanel = formView.tabPanel;

		var nodeForm = new Ext.FormPanel({
					id : 'nodeForm',
					region : 'north',
					labelWidth : 65,
					bodyStyle : 'padding:10px 20px 0',
					frame : false,
					height : 130,
					tbar : [{
								xtype : 'tbtext',
								text : $lang('workflow.flowMonitor.NodeInstance.baseInfo')/*'基本信息'*/
							}],
					items : [{
						layout : 'column',
						border : false,
						labelSeparator : ':',
						defaults : {
							layout : 'form',
							border : false,
							columnWidth : .5
						},
						items : [{
									xtype : 'hidden',
									id : 'id'
								}, {
									items : [{
												xtype : 'textfield',
												readOnly : true,
												value : xingMing,
												fieldLabel : $lang('workflow.flowMonitor.gridHeader.applicant')/*'申请人'*/,
												anchor : '90%'
											}]
								}, {
									items : [{
												xtype : 'textfield',
												readOnly : true,
												value : stateName,
												fieldLabel : $lang('workflow.flowMonitor.gridHeader.state')/*'状态'*/,
												anchor : '90%'
											}]
								}, {
									columnWidth : 1.06,
									items : [{
										xtype : 'textfield',
										readOnly : true,
										value : record
												.get('executedNodesSequence'),
										fieldLabel : $lang('workflow.flowMonitor.gridHeader.executeTrace')/*'执行序列'*/,
										anchor : '90%'
									}]
								}, {
									columnWidth : 1.06,
									items : [{
												xtype : 'textarea',
												height : 30,
												readOnly : true,
												value : record.get('summary'),
												fieldLabel : $lang('workflow.flowMonitor.gridHeader.summary')/*'摘要'*/,
												anchor : '90%'
											}]
								}]
					}]
				});

		var store = new Ext.data.Store({
					autoLoad : true,
					proxy : new Ext.data.HttpProxy({
								url : 'flow/listTaskInsByPi.html?piid='
										+ record.get('jbpmProcessInstanceID')
							}), // 10000000000000000000000000000000
					reader : new Ext.data.JsonReader({
								root : 'root',
								totalProperty : 'total',
								successProperty : 'success',
								fields : ["id", "name", {
											name : "create",
											mapping : 'create'
										}, "end", "description"]
							})
				});
		var cols = new Ext.grid.ColumnModel([ {
					header : $lang('workflow.flowMonitor.gridHeader.nodeName')/*"节点名称"*/,
					sortable : true,
					width:180,
					dataIndex : "name"
				}, {
					header : $lang('workflow.flowMonitor.gridHeader.startTime')/*"开始时间"*/,
					sortable : true,
					width:180,
					dataIndex : "create"
				}, {
					header : $lang('workflow.flowMonitor.gridHeader.endTime')/*"完成时间"*/,
					sortable : true,
					width:180,
					dataIndex : "end"
				}, {
					header : $lang('workflow.flowMonitor.gridHeader.description')/*"描述"*/,
					width:230,
					dataIndex : "description"
				}]);
		var nodeGrid = new Ext.grid.GridPanel({
					region : 'center',
					border : false,
					layout: 'fit',
					loadMask : {
						msg : $lang('workflow.flowMonitor.loading')/*'正在载入 ...'*/
					},
					viewConfig : {
						forceFit : false,
						enableRowBody : true,
						showPreview : true
					},
					store : store,
					cm : cols,
					tbar : [{
								xtype : 'tbtext',
								text : $lang('workflow.flowMonitor.tbar.nodeInstance')/*'节点实例'*/
							}]
				});
		var panel = new Ext.Panel({
					title : $lang('workflow.flowMonitor.processInstanceInfo')/*'流程实例信息'*/,
					layout : 'border',
					closable: true,
					autoWidth: true,
					items : [nodeForm, nodeGrid]
				});
		tabPanel.add(panel);
		tabPanel.activate(panel);
		tabPanel.doLayout();
	},

	openForm : function() {
		var formView = this.formView;
		var rowIndex = this.rowIndex;
		var tabPanel = formView.tabPanel;
		var record = formView.grid.store.getAt(rowIndex);
		var id = record.get("id");
		var code = record.get("code");
		var editUrl = record.get("bpDefFile").updateUrlForSubmit;
		var panel = tabPanel.getComponent(id);
		if (panel)
			tabPanel.remove(panel);
		panel = new Ext.Panel({
					id : id,
					title : code,
					closable : true,
					autoScroll : true,
					autoLoad : {
						url : editUrl,
						params : {
							id : id
						},
						scope : this,
						scripts : true
					}
				});
		tabPanel.add(panel);
		tabPanel.activate(panel);
		tabPanel.doLayout();
	},
	editForm : function() {
		var formView = this.formView;
		var rowIndex = this.rowIndex;
		var record = formView.grid.store.getAt(rowIndex);
		var selectStore = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : "./flow/loadTaskInstanceId.html"
							}),
					baseParams : {
						jbpmProcessInstanceID : record
								.get('jbpmProcessInstanceID')
					},
					autoLoad : true,
					reader : new Ext.data.JsonReader({
								root : 'root',
								fields : ['codeid', 'codename']
							})
				});
		// 用树添加委派部门，职位
		var addAssignmenZDTree = function(parentGrid, assTreeConf) {
			var addAssWin = new Ext.Window({
						title : assTreeConf._title,
						layout : 'fit',
						width : 340,
						height : 360,
						closeAction : 'close',
						buttonAlign : 'center',
						resizable : false,
						modal : true,
						plain : true
					});
			var _treePanel = new Ext.tree.TreePanel({
				// region: 'center',
				rootVisible : false,
				enableDD : false,
				autoScroll : true,
				collapseFirst : false,
				loader : new Ext.tree.TreeLoader({
							baseAttrs : {
								uiProvider : Ext.tree.TreeCheckNodeUI
							},
							dataUrl : assTreeConf._url
						}),
				root : new Ext.tree.AsyncTreeNode({
							draggable : false
						}),
				listeners : {
					'expandnode' : function(parentNode) {
						// findChild
						for (var i = 0; i < parentGrid.store.data.length; i++) {
							if (assTreeConf._type == parentGrid.store.data.items[i].data.type) {
								var checkedNode = parentNode.findChild('id',
										parentGrid.store.data.items[i].data.id);
								checkedNode.ui.toggleCheck(true);
							}
						}
					}
				},
				tbar : ['->', {
					xtype : 'textfield',
					id : 'assSearchText',
					listeners : {
						specialkey : function(field, e) {
							if (e.getKey() == Ext.EventObject.ENTER) {
								var searchValue = Ext.getCmp("assSearchText")
										.getValue();
								_treePanel.getLoader().baseParams = {
									searchValue : searchValue
								};
								_treePanel.getLoader().load(_treePanel.root);
							}
						}
					}
				}, {
					text : $lang('workflow.flowMonitor.tbar.search')/*'查询'*/,
					iconCls : 'search-icon',
					handler : function() {
						var searchValue = Ext.getCmp("assSearchText")
								.getValue();
						/*
						 * var filter = new Ext.tree.TreeFilter(_treePanel, {
						 * clearBlank: true, autoClear: true }); var searchValue =
						 * Ext.getCmp("assSearchText").getValue();
						 * 
						 * //var re = new RegExp('^' +
						 * Ext.escapeRe(searchValue), 'i');
						 * filter.filterBy(function(n){ //return
						 * re.test(n.text); return
						 * (n.text.indexOf(searchValue)==-1)?false:true; });
						 */
						_treePanel.getLoader().baseParams = {
							searchValue : searchValue
						};
						_treePanel.getLoader().load(_treePanel.root);
					}
				}, {
					text : $lang('workflow.flowMonitor.tbar.showAll')/*'显示全部'*/,
					handler : function() {
						_treePanel.getLoader().baseParams = {
							outCon : null
						};
						_treePanel.getLoader().load(_treePanel.root);
						// _treePanel.root.reload();
					}
				}]
			});
			addAssWin.add(_treePanel);
			addAssWin.addButton({
						text : $lang('workflow.flowMonitor.button.ok')/*'确定'*/
					}, function() {
						var checkeds = _treePanel.getChecked();;
						if (checkeds == null) {
							Ext.Msg.alert($lang('workflow.flowMonitor.Msg.tips')/*'提示'*/, $lang('workflow.flowMonitor.Msg.noCheckedData')/*'没有选中数据！'*/);
							return;
						}
						var pgValues = new Array();
						for (var j = 0; j < parentGrid.store.data.length; j++) {
							if (assTreeConf._type == parentGrid.store.data.items[j].data.type) {
								pgValues
										.push(parentGrid.store.data.items[j].data.id);
							}
						}
						for (i = 0; i < checkeds.length; i++) {
							var checkedObj = checkeds[i];
							if (pgValues.indexOf(checkedObj.id) > -1)
								continue;
							parentGrid.store.insert(0, new Ext.data.Record({
												id : checkedObj.id,
												name : checkedObj.text,
												type : assTreeConf._type
											}));
						}
						addAssWin.close();
					});
			addAssWin.addButton({
						text : $lang('workflow.flowMonitor.button.close')/*'关闭'*/
					}, function() {
						addAssWin.close();
					});
			addAssWin.show();
		};
		// 用grid添加委派角色人员
		var addAssignmenZDPanel = function(parentGrid, assGridConf) {
			// 已经存在父grid中的数值
			var condition = "";
			for (var j = 0; j < parentGrid.store.data.length; j++) {
				if (assGridConf._type == parentGrid.store.data.items[j].data.type) {
					condition += "'" + parentGrid.store.data.items[j].data.id
							+ "',";
				}
			}
			if (condition != "")
				condition = "(" + condition.substring(0, condition.length - 1)
						+ ")";
			// :~
			var addAssWin = new Ext.Window({
						title : assGridConf._title,
						layout : 'fit',
						width : 450,
						height : 360,
						closeAction : 'close',
						buttonAlign : 'center',
						resizable : false,
						modal : true,
						plain : true
					});
			var _sm = new Ext.grid.CheckboxSelectionModel();
			var nameMap = (assGridConf._type == 'id') ? 'xingMing' : 'name';
			var nameDes = (assGridConf._type == 'id') ? $lang('workflow.flowMonitor.gridHeader.userName')/*'姓名'*/ : $lang('workflow.flowMonitor.gridHeader.name')/*'名称'*/;
			var _fields = [{
						name : 'code'
					}, {
						name : 'name',
						mapping : nameMap
					}, {
						name : 'type',
						convert : function(v) {
							return assGridConf._type;
						}
					}, {
						name : 'id'
					}];
			var _store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : assGridConf._url
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'total',
							root : 'root'
						}, _fields),
				baseParams : {
					outCon : condition
				},
				remoteSort : false
					// ,
					// autoLoad: true
				});
			var _gridPanel = new Ext.grid.GridPanel({
				loadMask : true,
				store : _store,
				cm : new Ext.grid.ColumnModel([_sm, {
							id : 'code',
							header : $lang('workflow.flowMonitor.gridHeader.code')/*'编号'*/,
							hidden : false,
							sortable : true,
							dataIndex : 'code'
						}, {
							id : 'name',
							header : nameDes,
							hidden : false,
							sortable : true,
							dataIndex : 'name'
						}]),
				sm : _sm,
				viewConfig : {
					forceFit : true
				},
				tbar : ['->', {
					xtype : 'textfield',
					id : 'assSearchText',
					listeners : {
						specialkey : function(field, e) {
							if (e.getKey() == Ext.EventObject.ENTER) {
								var para = {
									searchValue : '',
									outCon : condition
								};
								if (Ext.getCmp("assSearchText")) {
									para.searchValue = Ext
											.getCmp("assSearchText").getValue();
								}
								Ext.apply(_store.baseParams, para);
								_store.load({
											params : {
												start : 0,
												limit : 10
											}
										});
							}
						}
					}
				}, {
					text : $lang('workflow.flowMonitor.tbar.search')/*'查询'*/,
					iconCls : 'search-icon',
					handler : function() {
						var para = {
							searchValue : '',
							outCon : condition
						};
						if (Ext.getCmp("assSearchText")) {
							para.searchValue = Ext.getCmp("assSearchText")
									.getValue();
						}
						Ext.apply(_store.baseParams, para);
						_store.load({
									params : {
										start : 0,
										limit : 10
									}
								});
					}
				}, {
					text : $lang('workflow.flowMonitor.tbar.showAll')/*'显示全部'*/,
					handler : function() {
						_store.baseParams = {
							outCon : condition
						};
						_store.load({
									params : {
										start : 0,
										limit : 10
									}
								});
					}
				}],
				bbar : new Ext.PagingToolbar({
							pageSize : 10,
							store : _store,
							displayInfo : true,
							displayMsg : $lang('workflow.flowMonitor.displayMsg')/*"显示第 {0} 条到 {1} 条记录，一共 {2} 条"*/,
							emptyMsg : $lang('workflow.flowMonitor.emptyMsg')/*"没有记录"*/
						})
			});
			addAssWin.add(_gridPanel);
			_gridPanel.store.load({
						params : {
							start : 0,
							limit : 10
						}
					});
			addAssWin.addButton({
						text : $lang('workflow.flowMonitor.button.ok')/*'确定'*/
					}, function() {
						var selectedRows = _gridPanel.getSelectionModel()
								.getSelections();
						parentGrid.store.insert(0, selectedRows);
						parentGrid.store.getAt(0).data["type"] = assGridConf._type;
						// parentGrid.store.getAt(0).data["codeid"]=selectStore.getAt(0);
						addAssWin.close();
					});
			addAssWin.addButton({
						text : $lang('workflow.flowMonitor.button.close')/*'关闭'*/
					}, function() {
						addAssWin.close();
					});
			addAssWin.show();
		};
		var sm = new Ext.grid.CheckboxSelectionModel({
					singleSelect : true
				});
		var gridStore = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : "./flow/loadCurrentProcessors.html"
							}),
					baseParams : {
						jbpmProcessInstanceID : record
								.get('jbpmProcessInstanceID')
					},
					autoLoad : true,
					reader : new Ext.data.JsonReader({
								root : 'root',
								fields : ['id', 'name', 'type', 'codename',
										'codeid']
							})

				});
		var selectList = new Ext.form.ComboBox({
					id : 'statusCmb',
					store : selectStore,
					displayField : 'codename',
					valueField : 'codeid',
					typeAhead : false,
					triggerAction : 'all',
					allowBlank : false,
					forceSelection : true,
					editable : false,
					hideTrigger : false,
					mode : 'local'
				});
		var assignmentZDGrid = new Ext.grid.EditorGridPanel({
					id : 'assignmentZDGrid',
					sm : sm,
					viewConfig : {
						forceFit : true
					},
					autoHeight : false,
					store : gridStore,
					columns : [sm, {
								header : 'id',
								dataIndex : 'id',
								hidden : true
							}, {
								header : 'type',
								dataIndex : 'type',
								hidden : true
							}, {
								header : 'codename',
								dataIndex : 'codename',
								hidden : true
							}, {
								header : $lang('workflow.flowMonitor.gridHeader.processors')/*'处理人'*/,
								width : document.body.clientWidth * 0.5,
								dataIndex : 'name'
							}, {
								header : $lang('workflow.flowMonitor.gridHeader.node')/*'节点'*/,
								width : document.body.clientWidth * 0.5,
								dataIndex : 'codeid',
								editor : selectList,
								renderer : function(value, cellmeta, record) {
									if (value == null) {
										var record = selectStore.getAt(0);
										gridStore.getAt(0).data["codeid"] = record
												.get('codeid');
										return record.get('codename');
									} else {
										// 通过匹配value取得ds索引
										var index = selectStore
												.find(
														Ext.getCmp('statusCmb').valueField,
														value);
										if (index > -1) {
											// 通过索引取得记录ds中的记录集
											var record = selectStore
													.getAt(index);
											// 返回记录集中的value字段的值
											return record.get('codename');
										} else {
											return record.get('codename');
										}
									}
								}
							}],
					tbar : [{
								text : $lang('workflow.flowMonitor.tbar.department')/*'部门'*/,
								handler : function() {
									addAssignmenZDTree(assignmentZDGrid, {
												_type : 'department',
												_title : $lang('workflow.flowMonitor.title.addDepartment')/*'添加委派部门'*/,
												_url : './admin/departmentTree.html'
											})
								}
							}, {
								text : $lang('workflow.flowMonitor.tbar.job')/*'职位'*/,
								handler : function() {
									addAssignmenZDTree(assignmentZDGrid, {
												_type : 'jobTitle',
												_title : $lang('workflow.flowMonitor.title.assignJob')/*'添加委派职位'*/,
												_url : './admin/jobTitleTree.html'
											})
								}
							}, {
								text : $lang('workflow.flowMonitor.tbar.group')/*'群组'*/,
								handler : function() {
									addAssignmenZDPanel(assignmentZDGrid, {
												_type : 'group',
												_title : $lang('workflow.flowMonitor.title.assignGroup')/*'添加委派群组'*/,
												_url : './admin/groupForComboWin.html'
											})
								}
							}, {
								text : $lang('workflow.flowMonitor.tbar.role')/*'角色'*/,
								handler : function() {
									addAssignmenZDPanel(assignmentZDGrid, {
												_type : 'role',
												_title : $lang('workflow.flowMonitor.title.assignRole')/*'添加委派角色'*/,
												_url : './admin/roleForComboWin.html'
											})
								}
							}, {
								text : $lang('workflow.flowMonitor.tbar.actor')/*'人员'*/,
								handler : function() {
									addAssignmenZDPanel(assignmentZDGrid, {
												_type : 'id',
												_title : $lang('workflow.flowMonitor.title.assignActor')/*'添加委派人员'*/,
												_url : './admin/userListForWin.html'
											})
								}
							}]
				});
		assignmentZDGrid.on('rowcontextmenu', function(client, rowIndex, e) {// 变量grid的右键
					var item = new Ext.menu.Item({
								text : $lang('workflow.flowMonitor.delete')/*'删除'*/,
								iconCls : 'delete-icon',
								handler : function(button, e) {
									if (assignmentZDGrid.getStore().getCount() > 1) {
										var record = assignmentZDGrid
												.getStore().getAt(rowIndex);
										assignmentZDGrid.getStore()
												.remove(record);
									} else {
										Ext.Msg.alert($lang('workflow.flowMonitor.Msg.tips')/*'提示'*/,$lang('workflow.flowMonitor.Msg.notNull') /*'数据不能为空！'*/);
									}
								}
							});
					var rightClick = new Ext.menu.Menu({
								items : [item]
							});
					e.preventDefault();
					rightClick.showAt(e.getXY());
				});
		var nwin = new Ext.Window({
			title : $lang('workflow.flowMonitor.edit')/*'编辑'*/,
			modal : true,
			closeAction : 'close',
			buttonAlign : 'center',
			width : 400,
			height : 300,
			layout : 'fit',
			items : assignmentZDGrid,
			buttons : [{
				text : $lang('workflow.flowMonitor.button.ok')/*'确定'*/,
				handler : function() {
					var myMask = new Ext.LoadMask(Ext.getBody(), {
						msg : $lang('workflow.flowMonitor.myMask.saveMsg')/*'正在保存，请稍后！'*/,
						removeMask : true
							// 完成后移除
						});
					myMask.show();
					var ids = "";
					var codes = "";
					for (var i = 0; i < assignmentZDGrid.getStore().getCount(); i++) {
						var id = assignmentZDGrid.getStore().getAt(i)
								.get("type")
								+ ":"
								+ assignmentZDGrid.getStore().getAt(i)
										.get("id");
						ids += id + ",";
						var code = assignmentZDGrid.getStore().getAt(i)
								.get("codeid");
						codes += code + ",";
					}
					Ext.Ajax.request({
								url : './flow/saveProcessorsForCurrent.html',
								method : 'POST',
								params : {
									ids : ids,
									codes : codes
								},
								success : function(response, options) {
									var responseArray = Ext.util.JSON
											.decode(response.responseText);
									formView.grid.getStore().load();
									nwin.close();
									myMask.hide();
									Ext.Msg.alert($lang('workflow.flowMonitor.Msg.tips')/*'提示'*/, responseArray.msg);

								}
							});

				}
			}, {
				text : $lang('workflow.flowMonitor.button.cancel')/*'取消'*/,
				handler : function() {
					nwin.close();
				}
			}]
		});
		nwin.show();
	},
	deleteForm : function() {
		var formView = this.formView;
		var rowIndex = this.rowIndex;
		var record = formView.grid.store.getAt(rowIndex);
		var id = record.get("id");
		var m = Ext.MessageBox.confirm($lang('workflow.flowMonitor.Msg.tips')/*"提示"*/, "是否真的要删除选中项记录？", function(ret) {
					if (ret == "yes") {
						var myMask = new Ext.LoadMask(Ext.getBody(), {
							msg : $lang('workflow.flowMonitor.myMask.delMsg')/*'正在删除，请稍后！'*/,
							removeMask : true
								// 完成后移除
							});
						myMask.show();
						Ext.Ajax.request({
									url : 'workbench/deleteBpis.html',
									method : 'POST',
									params : {
										fiIds : id
									},
									success : function(response, options) {
										var responseStr = response.responseText;
										if (responseStr == "success") {
											formView.grid.getStore()
													.remove(record);
											myMask.hide();
											Ext.Msg.alert($lang('workflow.flowMonitor.Msg.tips')/*'提示'*/, $lang('workflow.flowMonitor.Msg.delSuccess')/*'删除成功！'*/);
										} else {
											myMask.hide();
											Ext.Msg.alert($lang('workflow.flowMonitor.Msg.failure')/*'失败'*/, $lang('workflow.flowMonitor.Msg.delFailure')/*'删除失败！'*/);
										}
									}
								});
					}
				});
	}
});