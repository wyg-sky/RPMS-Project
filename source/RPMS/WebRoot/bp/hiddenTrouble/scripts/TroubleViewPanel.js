TroubleViewPanel = function() {
	this.createUrl = '';// 默认值
	this.bpCode = '';
	this.bpId = '';

	TroubleViewPanel.superclass.constructor.call(this, {
		activeTab : 0,
		region : 'center',
		plugins : new Ext.ux.TabCloseMenu(),
		border : true
	});
	
	//主工具栏
	this.mainTbar = [
	{
		xtype : 'tbbutton',
		text : $lang('bp.new'),// 新增
		scope : this,
		handler : function(e) {
			this.createBpi(e,this.node);
		},
		iconCls : 'create-icon'
	}, 
	{
		text : $lang('bp.deleteSelected'),// 删除选中项
		iconCls : 'delete-selected-icon',
		scope : this,
		handler : this.deleteChecked
	}, 
	{
		xtype : 'tbseparator',
		xaction : 'bpi_delete_selected'
	}, 
	{
		text : $lang('bp.bpview.more')/* "更多" */,
		iconCls : 'tools-icon',
		scope : this,
		tooltip : $lang('cmdb.menu.tools.tips'),/* 工具：打印、导入、导出和设置 */
		menu : [{
			iconCls : 'import-icon',
			hidden : true,
			text : $lang('cmdb.menu.tools.import', '')
				/* 导入 > */
				}, {
					iconCls : 'export-icon',
					text : $lang('cmdb.menu.tools.export', ''),/* 导出 > */
					scope : this,
					handler : this.showFieldsWin
				}, {// 合并 5
					text : '合并到...',
					iconCls : "bp-join-to-icon",
					scope : this,
					xaction : "bp-join-contextMenu",
					handler : function() {
						this.joinBpi(this.grid);
					}
				}, {// 催办 6
					text : '催办',
					iconCls : "bp-press-icon",
					scope : this,
					xaction : "bp-press-contextMenu",
					handler : function() {
						//this.pressBpi(this.grid);
						
						//添加打开页面例子
						alert('无流程时 添加打开页面示例');
						var panel=this.showInTabPanel(Ext.id(),'修改工单');
				        panel.load({
				        	url : "run/requestForm.html?formCode=hiddenTrouble&viewCode=ht_create&viewVersion=1.0&stateCode=ht_draft",
				        	params : {id:id},
				        	scope : this,
				        	scripts : true
				        });
						
					}
				}]
	},'->',
	{
		text : '显示查询',
//		iconCls : 'search-icon',
		scope : this,
		handler : function() {
			this.searchPanel.show();
			this.mainTabPanel.doLayout();
		}
	}
	];

	//第一个tab页，用于显示列表
	this.mainTabPanel = new Ext.Panel({
		frame : false,
		title : '工作台列表',
		layout : 'border',
		border : true,
		title : $lang('bp.waiting'),
		hideMode : 'offsets',
		tbar : this.mainTbar
	});
	
	//查询面板
	this.searchPanel = new TroubleSearchForm({
		region : 'north',
		grid : this.getGrid(),
		border : false,
		centerPanel : this.mainTabPanel
	});
	this.mainTabPanel.add( this.searchPanel	 );
	
	this.gridContainer = new Ext.Panel({
		frame : false,
		layout : 'fit',
		region : 'center',
		hideMode : 'offsets',
		border : false
	});
	this.mainTabPanel.add( 	this.gridContainer );
	
	this.add(this.mainTabPanel);
	this.doLayout();
	this.on("beforedestroy", this._onDestroy, this);
};

Ext.extend(TroubleViewPanel, Ext.TabPanel, {
	_onDestroy : function() {
		if (this.slaMonitorTask != undefined || this.slaMonitorTask != null) {
			Ext.TaskMgr.stop(this.slaMonitorTask);
		}
		if (this.mainTbar) {
			Ext.destroy(this.mainTbar);
			delete this.mainTbar;
		}
		if (this.exToolbar) {
			Ext.destroy(this.exToolbar);
			delete this.exToolbar;
		}
		if (this.grid) {
			Ext.destroy(this.grid);
			delete this.grid;
		}
		// if(this.mainTabCenterPanel){
		// Ext.destroy(this.mainTabCenterPanel);
		// delete this.mainTabCenterPanel;
		// }
		if (this.expander) {
			Ext.destroy(this.expander);
			delete this.expander;
		}
		return true;
	},

	_reset : function() {
		if (this.grid) {
			// this.conditionDate.reset();
			// this.conditionDate.setVisible(false);
			// this.condtionText.reset();
			// this.condtionText.setVisible(true);
			// this.conditionCombo.reset();
			//		
			// var tbar = this.grid.getTopToolbar();
			// this.categoryCbt.clearValue();
			// this.statusCb.clearValue();
			//			
			// this.getStore().baseParams={};
		}
	},

	deleteChecked : function() {
		var scope = this;
		var sm = this.grid.getSelectionModel();
		var rowselects = sm.getSelections();
		var fiIds = "";
		if (rowselects.length <= 0)
			Ext.Msg.alert($lang('bp.tips'),$lang('bp.pleaseSelectBpiInstance'));
		else {
			Ext.MessageBox.confirm($lang('bp.tips'), $lang('bp.YesOrNoForDeleted'), function(ret) {
						if (ret == "yes") {
							for (var i = 0; i < rowselects.length; i++) {
								fiIds += "" + rowselects[i].get('id') + ",";
							}
							var grid = this.grid;
							grid.el.mask($lang('bp.processingWaitMsg'),
									"x-mask-loading");
							Ext.Ajax.request({
								url : 'workbench/deleteBpis.html',
								method : 'POST',
								params : {
									fiIds : fiIds
								},
								success : function(response, options) {
									// 获取响应的json字符串
									var responseStr = response.responseText;
									if (responseStr == "success") {
											grid.store.reload();
									} else {
										Ext.Msg.alert($lang('bp.failed'),
												$lang('bp.deleteFailedMsg'));
									}
									grid.el.unmask(true);
								},
								failure : function() {
									Ext.Msg.alert($lang('bp.failed'),
											$lang('bp.deleteFailedMsg'));
									grid.el.unmask(true);
								}
							});
						}
					}, this);
		}
	},

	loadToWorkPanel : function(workPanel) {
		var cv = this.gridContainer;
		if (cv.compId != workPanel.getId()) {// 载入的是与原来不同的对象
			cv.remove(cv.compId);
			cv.compId = workPanel.getId();
			cv.add(workPanel);
		} else {// 载入的是与原来相同的对象

		}
		cv.ownerCt.doLayout();
	},

	loadData : function(node) {
		this.node = node;
		this.createUrl = node.attributes.createUrl;
		this.bpId = node.attributes.id;
		this.bpCode = node.attributes.code;

//		var url = "workbench/list.html?bpCode=" + this.bpCode + "&bpId="+ this.bpId;
		var url = "saf/listTroubles.html?bpCode=" + this.bpCode + "&bpId="+ this.bpId;
		//    
		// 清空cmSet-center-view并加载新的Grid
		this.loadToWorkPanel(this.getGrid());

		var store = this.getStore(url);

		this.grid.loadData(store, this.getCm());

		this.mainTabPanel.setTitle(node.attributes.text);

	},

	getTbarPanel : function() {
		if (this.tbarPanel) {
			return this.tbarPanel;
		}
		this.tbarPanel = new TroubleSearchForm({
			width : 600,
			grid : this.grid,
			centerPanel : this.mainTabPanel

		});
		
		return this.tbarPanel;
	},

	getGrid : function() {
		if (this.grid) return this.grid;
		
		this.grid = new GridPanel(this, {
			// plugins : this.expander,
			border : false,
			style : 'border-width: 1px 1px 1px 1px;'
//			,tbar : this.mainTbar
		});


		this.grid.on('rowdblclick', this.rowdblclick, this);

		this.grid.on('rowcontextmenu', this.rowcontextmenu, this);

		// if(templateAdd)//更新模板创建菜单
		// templateAdd.fireEvent('render',templateAdd);
		return this.grid;
	},

	getStore : function(url) {
		// var cfg = $worktable(this.getParamsValue('bpInfo').code);
		if (!this.store) {
			this.store = new Ext.data.Store({
				method : 'Post',
				proxy : new Ext.data.HttpProxy({
					url : url
				}),
				reader : new Ext.data.JsonReader({
					root : 'root',
					totalProperty : 'total',
					fields : ['id', 'topic', 'createdOn', 'updatedOn',
							'createdBy', 'jbpmProcessInstanceID', 'code', 'bpDefFile',
							'applicant', 'state', 'processors', 'summary',
							'url', 'jbpmTaskInstanceID',
							'executedNodesSequence', 'customerSatisfaction',{
								name : 'bpName',
								mapping : 'bpDefFile',
								convert : function(v) {
									if (v) {
										return v.typeName
									} else {
										return ''
									}
								}
							}, {
								name : 'editUrl',
								mapping : 'bpDefFile',
								convert : function(v) {
									if(v && v.updateUrlForSubmit){
										return v.updateUrlForSubmit;
									}else {
										return '';
									}
								}
							}, {
								name : 'bpState',
								mapping : 'state',
								convert : function(v){
									if(v&&v.name){
										return v.name;
									}else{
										return '';
									}
								}
							}]
				})
			});
			// if(cfg.needSla)
			// this.store.on("load",this._storeLoad,this);
		} else if (url) {
			this.store.reader = new Ext.data.JsonReader({
				root : 'root',
				totalProperty : 'total',
				fields : ['id', 'topic', 'createdOn', 'createdBy', 'updatedOn',
						'processors', 'jbpmProcessInstanceID', 'code', 'bpDefFile',
						'applicant', 'state', 'processors', 'summary', 'url',
						'jbpmTaskInstanceID', 'executedNodesSequence',
						'customerSatisfaction', {
							name : 'bpName',
							mapping : 'bpDefFile',
							convert : function(v) {
								if (v) {
									return v.typeName
								} else {
									return ''
								}
							}
						}, {
							name : 'editUrl',
							mapping : 'bpDefFile',
							convert : function(v) {
								if(v && v.updateUrlForSubmit){
									return v.updateUrlForSubmit;
								}else {
									return '';
								}
							}
						}, {
							name : 'bpState',
							mapping : 'state',
							convert : function(v){
								if(v&&v.name){
									return v.name;
								}else{
									return '';
								}
							}
						}]
			});
			this.store.proxy = new Ext.data.HttpProxy({
				url : url
			});
			// if(!cfg.needSla)
			// this.store.un("load",this._storeLoad,this);
		}

		return this.store;
	},

	getCm : function() {
		// var cfg = $worktable(this.getParamsValue('bpInfo').code);
		var sm = new Ext.grid.CheckboxSelectionModel();
		return new Ext.grid.ColumnModel([sm, {
			header : 'ID',
			dataIndex : 'id',
			hidden : true
		}, {
			header : '摘要',
			width : 65,
			dataIndex : 'topic'
		}/*, {
			header : '流程',
			width : 65,
			dataIndex : 'bpName'
		}*/, {
			header : '创建人',
			width : 65,
			hidden : true,
			dataIndex : 'createdBy'
		}, {
			header : '当前处理人',
			width : 65,
			dataIndex : 'processors'
		}, {
			header : '当前状态',
			width : 65,
			dataIndex : 'bpState'
		}, {
			header : '创建时间',
			width : 65,
			dataIndex : 'createdOn'
		}, {
			header : '修改时间',
			width : 65,
			dataIndex : 'updatedOn'
		}]);
	},

	rowdblclick : function(grid, rowIndex, e) {// 查看或处理
		
		var selectedRow = grid.store.getAt(rowIndex);
		var bpId = selectedRow.get("id");
		var bpCode = selectedRow.get("code");
		this.showInTabPanel(bpId, bpCode).loadBpi(bpId);
	},

	/**
	 * 列表右键菜单
	 * 
	 * @param {}
	 *            grid
	 * @param {}
	 *            rowIndex
	 * @param {}
	 *            e
	 */
	rowcontextmenu : function(grid, rowIndex, e) {
		 var jbpmProcessInstanceID = grid.store.getAt(rowIndex).get("jbpmProcessInstanceID");
		// var categoryId=grid.store.getAt(rowIndex).get("categoryId");
		// var creatorId=grid.store.getAt(rowIndex).get("creatorId");
		//		
		// var sm = this.grid.getSelectionModel();
		// var rowselects = sm.getSelections();

		var rightClickMenu = new Ext.menu.Menu({
			items : [{// 编辑  0
				text : $lang('component.edit'),
				iconCls : "modify-icon",
				scope : this,
				handler : function() {
					this.editBpi(grid, rowIndex, e);
				}
			}, {//1
				text : "撤销",
				iconCls : 'delete-icon',
				scope : this,
				handler : function(){
					this.deleteBpi(grid, rowIndex, e);
				}
			}, '-', {//3
				text : '回演',
				iconCls : "workflow-icon",
				scope : this,
				handler : function() {
					this.playFlowWithMenu(grid, rowIndex, e);
				}
			}]
		});

		e.preventDefault();

		if(jbpmProcessInstanceID && jbpmProcessInstanceID != 0){//已提交工单
        	rightClickMenu.items.items[0].setDisabled(true);
        	rightClickMenu.items.items[1].setDisabled(true);
        	
        }else{
        	rightClickMenu.items.items[3].setDisabled(true);
        }
        
		rightClickMenu.showAt(e.getXY());
	},

	createBpi : function(e, node) {
		if (node.isLeaf()) {
			if (node.attributes.createUrl == null) {
				this.createBpiByAction(node.attributes.id);
			} else {
				this.createBpiByCreateUrl(node.attributes.id,
						node.attributes.createUrl, this.id);
			}
		} else {
			this.showAllBpMenu(e);
		}
	},

	editBpi : function(grid, rowIndex, e){
		var id = grid.store.getAt(rowIndex).get("id");//此处应该获取bpi的id，how?
		var editUrl = grid.store.getAt(rowIndex).get("editUrl");

		var panel=this.showInTabPanel(Ext.id(),'修改工单');
        panel.load({
        	url : editUrl,
        	params : {id:id},
        	scope : this,
        	scripts : true
        });
	},
	
	deleteBpi : function(grid, rowIndex, e){
		var id = grid.store.getAt(rowIndex).get("id");
		var m=Ext.MessageBox.confirm($lang('bp.tips'),$lang('bp.YesOrNoForDeleted'),function(ret){
	        if(ret=="yes"){
	            Ext.Ajax.request({
	                url: 'workbench/deleteBpi.html',
	                method: 'POST',
	                params: {fiIds:id},
	                success: function(response,options){
	                    var responseStr = response.responseText;
	                    if (responseStr == "success") {
	                        grid.store.remove(grid.store.getAt(rowIndex));;
	                    }else {
	                        Ext.Msg.alert($lang('bp.failed'), $lang('bp.deleteFailedMsg'));
	                    }
	                }
	            });
	        }
	    });
	},
	
	
	createBpiByAction : function(bpId) {
//		alert('创建了一个类型为：' + bpId + '的流程');
		alert('暂无该流程！');
	},

	createBpiByCreateUrl : function(bpId, createUrl, tabpId) {
		this.showInTabPanel(Ext.id(), $lang('bp.add'), {
			op : 'c'
		}).load({
			url : createUrl,
			params : {
				tabpId : tabpId,// tab页id，用于关闭tab页
				bpId : bpId
			},
			scope : this,
			scripts : true
		});
	},

	/**
	 * 在tab页中打开一个工单页面 此功能依赖于BpWorkbenchPanel.js
	 * 
	 * @param {}
	 *            id
	 * @param {}
	 *            title
	 * @return {}
	 */
	showInTabPanel : function(id, title, config) {
		var panel = this.getComponent(id);
		if (panel)
			this.activate(panel);
		else {
			Ext.lion.ScriptLoader('workflow/scripts/FlowWorkbenchPanel.js');
			panel = new FlowWorkbenchPanel(id, title, config);
			this.add(panel).show();
		}
		return panel;
	},
	
	playFlowWithMenu : function(grid, rowIndex, e) {
		var record = grid.store.getAt(rowIndex);
		var processName = record.get('bpDefFile').filePath.replace('define', '').replace('.xml', '');
		var panel = new Ext.Panel({
			id : 'play_panel',
			title : record.get('code')
					+ $lang('workflow.flowMonitor.processReplay')/* '流程回演' */,
			layout : 'fit',
			recordObj : record,
			html : '<iframe  frameborder="0"  scrolling="no" width="100%" height="100%" src = "workflow/flowDesign.jsp?opertype=play&name='
					+ processName
					+ '&flowinsid='
					+ record.get('id')
					+ '&executednodessequence='
					+ record.get('executedNodesSequence') + '" />',// workflow/demo/addprocess.jsp
			closable : true
		});
		this.add(panel);
		this.activate(panel);
		this.doLayout();
	},
	
	showAllBpMenu : function(ct){
		var scope = this;
		Ext.Ajax.request({
			url: 'bp/bpTree.html',
			method: 'POST',
			scope: this,
			success : function(response,options){
				var it=Ext.decode(response.responseText);
				if(it.length>0){
					ct.enable();
					var menu = new Ext.menu.Menu();
					
					var subMenu=[];
					function Tranversal(srcArray){//递归类别树生成菜单
						var cmpArray=[];
						for(var i=0;i< srcArray.length; i++){
							cmpArray.push({
				 			    text : srcArray[i].text,
				 			    bpId : srcArray[i].id,
				 			    createUrl : srcArray[i].createUrl,
				 			    tabId : scope.id,
				 			    scope : scope,
				 			    handler : scope.createBpiByMenu
							});
							if(srcArray[i].children){
								cmpArray[i].menu= Tranversal(srcArray[i].children) ;
							}
						}
						return cmpArray;
					};
					subMenu=Tranversal(it);
					for(var i=0;i<subMenu.length;i++){
						menu.add(subMenu[i]);
					}
					ct.menu = menu;
					ct.showMenu();
				}else{
					Ext.Msg.alert('提示','该流程无类别信息，不存在模板！');
				}
			}
		});
		
	},
	
	createBpiByMenu : function(m) {
		this.createBpiByCreateUrl(m.bpId, m.createUrl, this.tabId);
	}
});