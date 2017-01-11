NewsViewPanel = function() {
	NewsViewPanel.superclass.constructor.call(this, {
		activeTab : 0,
		region : 'center',
		plugins : new Ext.ux.TabCloseMenu(),
		border : true
	});
	//主工具栏
	this.mainTbar = [
	{
		xtype : 'tbbutton',
//		text : $lang('bp.new'),// 新增
		text : '新增',
		scope : this,
		handler : function() {
			alert('无流程时 添加打开页面示例');
			var panel=this.showInTabPanel(Ext.id(),'增加新闻');
			panel.load({
	        	url : "run/requestForm.html?formCode=news&viewCode=news_add&viewVersion=1.0",
	        	params : {id:id},
	        	scope : this,
	        	scripts : true
	        });
		},
		iconCls : 'create-icon'
	},{
		text : $lang('bp.deleteSelected'),// 删除选中项
		iconCls : 'delete-selected-icon',
		scope : this,
		handler : this.deleteChecked
	},{
		xtype : 'tbseparator',
		xaction : 'bpi_delete_selected'
	},{
		text : $lang('bp.bpview.more')/* "更多" */,
		iconCls : 'tools-icon',
		scope : this,
		tooltip : $lang('cmdb.menu.tools.tips'),/* 工具：打印、导入、导出和设置 */
		menu : [{
			iconCls : 'import-icon',
			hidden : true,
			text : $lang('cmdb.menu.tools.import', '')
				/* 导入 > */
				},{
					iconCls : 'export-icon',
					text : $lang('cmdb.menu.tools.export', ''),/* 导出 > */
					scope : this,
					handler : this.showFieldsWin
				},{// 合并 5
					text : '合并到...',
					iconCls : "bp-join-to-icon",
					scope : this,
					xaction : "bp-join-contextMenu",
					handler : function() {
						this.joinBpi(this.grid);
					}
				},{// 催办 6
					text : '催办',
					iconCls : "bp-press-icon",
					scope : this,
					xaction : "bp-press-contextMenu",
					handler : function() {
						this.pressBpi(this.grid);
				  }
				}]
	}
	,'->',
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
//		title : '工作台列表',
		layout : 'border',
		border : true,
		title : $lang('bp.waiting'),
		hideMode : 'offsets',
		tbar : this.mainTbar
	});
	
	//查询面板
	this.searchPanel = new NewsSearchForm({
		region : 'north',
		grid : this.getGrid(),
		border : false,
		centerPanel : this.mainTabPanel
	});
	this.mainTabPanel.add(this.searchPanel);

	this.gridContainer = new Ext.Panel({
		frame : false,
		layout : 'fit',
		region : 'center',
		hideMode : 'offsets',
		border : false
	});
	this.mainTabPanel.add( this.gridContainer );
	
	this.add(this.mainTabPanel);
	this.doLayout();
	this.on("beforedestroy", this._onDestroy, this);
};

Ext.extend(NewsViewPanel, Ext.TabPanel, {
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
		if (this.expander) {
			Ext.destroy(this.expander);
			delete this.expander;
		}
		return true;
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
	
	deleteChecked : function() {
		var scope = this;
		var sm = this.grid.getSelectionModel();
		var rowselects = sm.getSelections();
		var fiIds = "";
		if (rowselects.length <= 0)
//			Ext.Msg.alert($lang('bp.tips'),$lang('bp.pleaseSelectBpiInstance'));
			Ext.Msg.alert('提示','请选择要删除的数据');
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

	loadToNewPanel : function(workPanel) {
		var cv = this.gridContainer;
		if (cv.compId != workPanel.getId()) {// 载入的是与原来不同的对象
			cv.remove(cv.compId);
			cv.compId = workPanel.getId();
			cv.add(workPanel);
		} else {// 载入的是与原来相同的对象

		}
		cv.ownerCt.doLayout();
	},

	loadData : function() {

		var url = "cmes/newslist.html";

		// 清空cmSet-center-view并加载新的Grid
		this.loadToNewPanel(this.getGrid());

		var store = this.getStore(url);

		this.grid.loadData(store, this.getCm());

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
					fields : ['id', 'newsName', 'newsContent']
				})
			});
			// if(cfg.needSla)
			// this.store.on("load",this._storeLoad,this);
		} else if (url) {
			this.store.reader = new Ext.data.JsonReader({
				root : 'root',
				totalProperty : 'total',
				fields : ['id', 'newsName', 'newsContent']
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
		var sm = new Ext.grid.CheckboxSelectionModel();
		return new Ext.grid.ColumnModel([sm, {
			header : '',
			dataIndex : 'id',
			hidden : true
		}, {
			header : '标题',
			width : 65,
			dataIndex : 'newsName'
		}, {
			header : '内容',
			width : 65,
			dataIndex : 'newsContent'
		}]);
	},

	/**
	 * 在tab页中打开一个工单页面 此功能依赖于BpWorkbenchPanel.js
	 * 
	 * @param {}
	 * id
	 * @param {}
	 * title
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
	}
});