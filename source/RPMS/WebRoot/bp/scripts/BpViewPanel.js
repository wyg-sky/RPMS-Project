BpViewPanel = function(typeCode) {

	
	this.setParams("typeCode",typeCode);
	this.setParams("userId", Ext.getDom('tool_bar').getAttribute('userId') );
	
	this.conditionDate = new Ext.form.DateField({
		format : 'Y-m-d',
		width : 150,
		emptyText : $lang('bp.pleaseSelectDate'),
		readOnly : false,
		hidden : true,
		scope : this,
		listeners : {   
    		specialkey:function(field,e){   
        		if (e.getKey()==Ext.EventObject.ENTER){   
            		this.scope.search();  
        			}   
    		}
    	}
	});
		
	this.condtionText = new Ext.form.TextField({
		width:150,
		scope : this,
		emptyText:'请输入',
		listeners:{   
    		specialkey:function(field,e){   
        		if (e.getKey()==Ext.EventObject.ENTER){   
            		this.scope.search();  
        		}   
    		}
    	}   
	});
		
	this.conditionCombo = new Ext.form.ComboBox({
		value : 'summary',
		style : "border:1px solid #eee;background: #f4fcf4",
		editable : false,
		store : new Ext.data.SimpleStore({
			fields : ["name", "value"],
			data : [[$lang('bp.code')/*'工单号'*/, 'code'],[$lang('common.summary')/*'摘要'*/, 'summary'],[$lang('bp.byCreator'), 'creator.xingMing'],[$lang('bp.byCreateDate'), 'createdOn']]
		}),
		valueField : "value",
		displayField : "name",
		mode : 'local',
		selectOnFocus : true,
		forceSelection : true,
		disableKeyFilter : true,
		triggerAction : 'all',
		width : 100,
		scope : this,
		listeners:{
			'select':function(combo){
				if(combo.getValue()=='createdOn'){
					combo.scope.condtionText.hide();
					combo.scope.conditionDate.show();
				}else{
					combo.scope.condtionText.show();
					combo.scope.conditionDate.hide();
				}
			}
        }
	});
	var templateAdd = new Ext.Button({
		text : $lang('bp.newTemplate'),//模板新增
		iconCls : 'create-icon',
		disabled: false,
		scope : this,
//		xaction: 'wtb_create',
		handler : this._showTemplateMenu
	});
	this.mainTbar = [{
			xtype : 'tbbutton',
			text : $lang('bp.new'),//新增
			scope : this,
//			xaction: 'wtb_create',
			handler : this.createBpi,
			iconCls : 'create-icon'
		}, {
			xtype: 'tbseparator'//,
//			xaction: 'wtb_create',
//			xaction : 'bpi_delete_selected'
		}, templateAdd , {
			xtype: 'tbseparator',
			xaction : 'bpi_delete_selected'
		}, {
			text : $lang('bp.deleteSelected'),//删除选中项
			iconCls : 'delete-selected-icon',
			xaction : 'bpi_delete_selected',
			scope: this,
			handler : this.deleteChecked
		}, {
			xtype: 'tbseparator',
			xaction : 'bpi_delete_selected'
		}, {
			text : $lang('bp.bpview.more')/*"更多"*/,
			iconCls : 'tools-icon',
//			xaction : 'wtb_tools',
			scope: this,
			tooltip : $lang('cmdb.menu.tools.tips'),/*工具：打印、导入、导出和设置*/
			menu : [/*{
					iconCls: 'print-icon',
					text : $lang('cmdb.menu.tools.print'),打印
					scope : this,
					handler : this.print
				},*/{
					iconCls: 'import-icon',
					hidden : true,
					text : $lang('cmdb.menu.tools.import','')/*导入 >*/
				},{
					iconCls: 'export-icon',
					text : $lang('cmdb.menu.tools.export',''),/*导出 >*/
					scope : this,
					handler : this.showFieldsWin
				},{//合并 5
					text:'合并到...',
					iconCls:"bp-join-to-icon",
					scope : this,
					xaction : "bp-join-contextMenu",
                    handler:function(){ this.joinBpi(this.grid); }
            	},{//催办 6
					text:'催办',
					iconCls:"bp-press-icon",
					scope : this,
					xaction : "bp-press-contextMenu",
                    handler:function(){ this.pressBpi(this.grid); }
            	}/*,{
					iconCls: 'set-icon',
					text : $lang('cmdb.menu.tools.set','>')设置 >
			}*/]
		}/*,'->',{
			iconCls :'collapse-icon',
			scope : this,
			enableToggle : true,
			pressed : true,
			handler : function(el){
				if(el.pressed){
				 	this.tbarPanel.show();
				 	this.getGrid().setHeight( this.mainTabPanel.getInnerHeight());
				 	el.setIconClass("collapse-icon");
				}else{
					this.tbarPanel.hide();
					this.getGrid().setHeight( this.mainTabPanel.getInnerHeight());
					el.setIconClass("expand-icon");
				}
				this.mainTabCenterPanel.doLayout();
			}
		}*/];
		
	this.mainTabPanel = new Ext.Panel({
		frame : false,
		layout : 'border',
		border: false,
		title : $lang('bp.waiting'),
		hideMode : 'offsets'
	});
	
	this.categoryCbt = new Ext.ux.ComboBoxTree({
        anchor : "98%",
        style : "border:1px solid #eee;background: #f4fcf4",
        hiddenName : "categoryId",
        name : "category",
        value :{id:'0',text: $lang('bp.bpview.search.category.all')/*"所有类别"*/ },
        selectNodeModel : 'all',
        displayField : "name",
        valueField : "id",
        allowBlank : true,
        emptyText : $lang('bp.bpview.search.category.all')/*"所有类别"*/,
        tree : {
			xtype:'treepanel',
			collapsed : false,
			loader: new Ext.tree.TreeLoader(),
       	 	root : new Ext.tree.AsyncTreeNode({id:'0',text: $lang('bp.bpview.search.category.all')/*"所有类别"*/ }),
       	 	listeners: {
       	 		'beforerender': function(c){c.expandAll(); },
	            'beforeload' : {
	            	fn : function(node){
		            	node.getOwnerTree().loader.dataUrl = "bp/listBpCategoriesByBp.html?bpId="+this.getBpId();
		            },
		            scope : this
	            }
       	 		
       	 	}
    	},
        listeners : {'select' : {
        	fn : function(c,r,i){
//            	this.store.proxy.conn.url = 'bp/listByHql.html';
            	Ext.apply(this.store.baseParams, {
					filterId : this.node.id,	//过滤器id
					bpId : this.getParamsValue('bpInfo').id,			//流程id 
					modelName : this.getParamsValue('bpInfo').modelName //类名
				});
            	if(c.getValue() && c.getValue()!=0 )
            		this.store.baseParams.category = c.getValue();
            	else
            		this.store.baseParams.category = null;
            	this.store.removeAll();
            	var limit = this.store.baseParams.limit;
            	this.store.load({params:{start:0,limit:limit}});
            },
            scope : this
        }}
  	});
  	
  	this.statusCb = new Ext.form.ComboBox({
        xtype : "combo",
        style : "border:1px solid #eee;background: #f4fcf4",
        emptyText : $lang('bp.bpview.search.state.all')/*"所有状态"*/,
        displayField : "name",
        name : "stateId",
        valueField : "id",
        mode : "remote",
        triggerAction : "all",
        editable : false,
        hiddenName : "state",
        lazyInit : true,
        lazyRender : true,
        mode : 'remote',
        store : new Ext.data.Store({
        	autoLoad: false,
            proxy:new Ext.data.HttpProxy({"url":"admin/listBpStatesByBpId.html"}),
            reader:new Ext.data.JsonReader({
				root : "resultList",
				totalProperty : "total",
				successProperty : "success",
				fields : [{  name : "id" },{ name : "name" }]
			}),
			listeners : {
				'load' : function(s,r,o){
					s.insert(0,new Ext.data.Record({id : '0', name : $lang('bp.bpview.search.state.all')/*'所有状态'*/} ) );
				},
				'beforeload' : {
					fn : function(store,op){
		            	Ext.apply(store.baseParams, {bpId: this.getBpId()});
		            },
		            scope : this
				}
			}
		}),
		listeners : {
			'select' : {
				fn : function(c,r,i){
//	            	this.store.proxy.conn.url = 'bp/listByHql.html';
	            	Ext.apply(this.store.baseParams, {
						filterId : this.node.id,	//过滤器id
						bpId : this.getParamsValue('bpInfo').id,			//流程id 
						modelName : this.getParamsValue('bpInfo').modelName //类名
					});
	            	if(c.getValue() && c.getValue()!=0 )
	            		this.store.baseParams.state = c.getValue();
	            	else{
	            		c.clearValue();
	            		this.store.baseParams.state = null;
	            	}
	            	var limit = this.store.baseParams.limit;
	            	this.store.removeAll();
	            	this.store.load({params:{start:0,limit:limit}});
	            },
	            scope : this
			},
			'beforerender': {
				fn : function(c){
	            	c.store.insert(0,new Ext.data.Record({id : '0', name : $lang('bp.bpview.search.state.all')/*'所有状态'*/} ) );
	            },
	            scope : this
			}}
  	});
  	
	this.exToolbar = new Ext.Toolbar({
		style : "background:#fff;border-bottom:1px solid #fff;",
        items : [{
         	xtype: 'tbtext', 
         	text: $lang('bp.category')+/*类别*/'：'
      	 },this.categoryCbt,{
         	xtype: 'tbtext', 
         	text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
      	 },{
         	xtype: 'tbtext', 
         	text: $lang('bp.state')/*状态*/+'：'
         },this.statusCb, '->',
         this.conditionCombo, {
			xtype : "tbspacer"
		 }, {
			xtype : "tbspacer"
		 }, this.condtionText,this.conditionDate,{
			xtype : "tbspacer"
		 }, {
			//xaction : 'ci_search',
			iconCls : 'search-icon',
			scope : this,
			hidden : false,
			handler : this.search
		},'-',{
			text : $lang('button.advancedSearch')/*'高级查询'*/,
//				iconCls : 'search-icon',
			scope: this,
			handler : this.advanceSearch
		}]  
     });
     
	this.mainTabCenterPanel = new Ext.Panel({
		frame : false,
		layout : 'fit',
		tabTip : 'none',
		split : true,
		animCollapse : false,
		border : false,
		region : 'center',
		autoScroll : false,
		hidden : false
	});
	
	var space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	
	this.expander=new Ext.grid.RowExpander({
		lazyRender: true,
		enableCaching: false,
        tpl : new Ext.Template(
        	 '<table><tr>',
	            	'<td width ="100">'+space+$lang('common.reporter')/*申报人*/+':</td>',
	            	'<td width = "100">{applicantName}&nbsp;</td>',
	            	'<td width = "70">'+$lang('bp.department')/*部门*/+':</td>',
	            	'<td width = "100">{applicantDep}&nbsp;</td>',
	            	'<td width = "70">'+$lang('bp.phone')+/*联系方式*/':</td>',
	            	'<td width = "100">{applicantPhone}</td>',
	            	'<td width = "200"></td>',
	         '</tr><tr>',
	            	'<td width = "100">'+space+$lang('bp.processors')+/*处理人*/':</td>',
	            	'<td colspan =6>{processors}</td>',
	         '</tr><tr>',
	            	'<td width = "100">'+space+$lang('bp.description')+/*描述*/':</td>',
	            	'<td colspan =6>{description}<br></td>',
	         '</tr></table>'
        ),
        listeners : {
        	'beforexpand' : this.beforRowExpand
           }
    });
	
	BpViewPanel.superclass.constructor.call(this, {
		activeTab : 0,
		region : 'center',
		margins : '0 0 0 0',
//		resizeTabs : true,
		border : true,
//		tabWidth : 150,
		minTabWidth : 150,
		enableTabScroll : true,
		plugins: new Ext.ux.TabCloseMenu()
	});
	
	this.add(this.mainTabPanel);
    this.mainTabPanel.add(this.mainTabCenterPanel);
    
    this.reportPanel = new BpReportPanel({
    	region : 'east',
		border : false,
		split : true,
		animCollapse:false,
		animate: false,
		collapsible:true,
		collapseMode:'mini',
		collapsed : false,
		margins : '2 0 1 1',
		width: document.body.clientWidth*0.18,
	    minSize: 180,
	    maxSize: 400,
	    stateful: true,
	    stateId : typeCode,
	    stateEvents : ['expand', 'collapse','resize']
    });
    
    this.mainTabPanel.add( this.reportPanel );
//    this.mainTabCenterPanel.add( this.reportPanel );
    
    this.on("beforedestroy",this._onDestroy,this);
};

Ext.extend(BpViewPanel, Ext.TabPanel,{
	
	_onDestroy : function(){
		if(this.slaMonitorTask!=undefined||this.slaMonitorTask!=null){
			Ext.TaskMgr.stop(this.slaMonitorTask);
		}
		if(this.mainTbar){
			Ext.destroy(this.mainTbar);
			delete this.mainTbar;
		}
		if(this.exToolbar){
			Ext.destroy(this.exToolbar);
			delete this.exToolbar;
		}
		if(this.grid){
			Ext.destroy(this.grid);
			delete this.grid;
		}
		if(this.mainTabCenterPanel){
			Ext.destroy(this.mainTabCenterPanel);
			delete this.mainTabCenterPanel;
		}
		if(this.expander){
			Ext.destroy(this.expander);
			delete this.expander;
		}
		return true;
	},
	
	_reset : function(){
		if(this.grid){
			this.conditionDate.reset();
			this.conditionDate.setVisible(false);
			this.condtionText.reset();
			this.condtionText.setVisible(true);
			this.conditionCombo.reset();
		
			var tbar = this.grid.getTopToolbar();
			this.categoryCbt.clearValue();
			this.statusCb.clearValue();
			
			this.getStore().baseParams={};
		}
	},
	
	/**
	 * 加载工单列表
	 * @param {} workPanel
	 */
	loadToWorkPanel : function(workPanel) {
		var cv = this.mainTabCenterPanel;
		if (cv.compId != workPanel.getId() ) {//载入的是与原来不同的对象
			cv.remove(cv.compId);
			cv.compId = workPanel.getId();
			cv.add(workPanel);
		}else{//载入的是与原来相同的对象
			
		}
		cv.ownerCt.doLayout();
	},
	
	loadData : function(node) {

		this._reset();
		
		this.node = node;
		this.setCreateUrlAndBpId(node);
		var filterId = node.attributes.filterId;
		
		var url = "";
		if(filterId){
			url=node.attributes.url+'?bpId='+this.bpId+'&filterId='+filterId;
		}else{
			url=node.attributes.url+'?bpId='+this.bpId;
		}
    
		// 清空cmSet-center-view并加载新的Grid
		this.loadToWorkPanel( this.getGrid() );
		
		var store = this.getStore(url);
		
		this.grid.loadData(store, this.getCm() );

		this.mainTabPanel.setTitle(node.attributes.text);
		
	},
	
	createBpi : function () {
		var bpId = this.getBpId();
		var tabpId=this.id;
		var createUrl = this.getCreateUrl();
		
		this.showInTabPanel(Ext.id(),$lang('bp.add'),{op:'c'} ).load({
			url : createUrl,
			params : {
				tabpId : tabpId,//tab页id，用于关闭tab页
				bpId : bpId
			},
			scope : this,
			scripts : true
		});
	},
	
	createBpiByTpl: function(m){
		var createUrl=this.getCreateUrl(); 
		var bpId=this.getBpId();
		var categoryId=m.categoryId
		var tabpId=this.id;
		
		this.showInTabPanel(Ext.id(),$lang('bp.add') ,{op:'c'}).load({
			url : createUrl,
			params : {
				tabpId: tabpId,//tab页id，用于关闭tab页
				bpId:bpId,
				category: categoryId //用于加载模板数据
			},
			scope : this,
			scripts : true
		});
	},
	
	/**
	 * 删除选中项
	 */
	deleteChecked : function() {
		var sm = this.grid.getSelectionModel();
		var rowselects = sm.getSelections();
		var bpIds = "";
		if (rowselects.length <= 0)
			Ext.Msg.alert($lang('bp.tips'), $lang('bp.pleaseSelectBpiInstance'));
		else {
			Ext.MessageBox.confirm($lang('bp.tips'),$lang('bp.YesOrNoForDeleted'), function(ret) {
				if (ret == "yes") {
					for (var i = 0; i < rowselects.length; i++) {
						bpIds += ""+ rowselects[i].get('id')+ ",";
					}
					var grid=this.grid;
					grid.el.mask($lang('bp.processingWaitMsg'),"x-mask-loading");
					Ext.Ajax.request({
						url : 'bp/deleteBpis.html',
						method : 'POST',
						params : {bpIds : bpIds},
						success : function(response, options) {
							// 获取响应的json字符串
							var responseStr = response.responseText;
							if (responseStr == "success") {
								grid.store.removeAll();
								grid.store.reload();
							} else {
								Ext.Msg.alert($lang('bp.failed'),$lang('bp.deleteFailedMsg'));
							}
							grid.el.unmask(true);
						},
						failure: function(){
							Ext.Msg.alert($lang('bp.failed'),$lang('bp.deleteFailedMsg'));
							grid.el.unmask(true);
						}
					});
				}
			}, this);
		}
	},
	
	getTbarPanel : function(){
		if(this.tbarPanel){
			return this.tbarPanel;
		}
	    this.tbarPanel = new Ext.Panel({
	     	height : 0,
	     	frame : false,
	     	border : false,
	     	style : 'border-width: 0px 1px 0px 1px;',
	     	tbar : this.exToolbar
	     	
	    });
	     
	    return this.tbarPanel;
	},
	
	getGrid : function(){
		if(this.grid) return this.grid;
		var exToolbar = this.getTbarPanel();
		this.grid = new GridPanel(this, {
			plugins : this.expander,
            border : true,
//            style : 'border-width: 1px 1px 1px 1px;',
            tbar : this.mainTbar
		});
		
		this.grid.on('render', function(){ exToolbar.render(this.grid.tbar ); },this);
		
		this.grid.on('rowdblclick', this.rowdblclick, this);

		this.grid.on('rowcontextmenu',this.rowcontextmenu ,this);
			
//		if(templateAdd)//更新模板创建菜单
//			templateAdd.fireEvent('render',templateAdd);
		return this.grid;
	},
	
	getStore : function(url){
		var cfg = $worktable(this.getParamsValue('bpInfo').code);
		if(! this.store){
			this.store = new Ext.data.Store({
				method:'Post',
				proxy : new Ext.data.HttpProxy({
					url : url
				}),
				reader : new Ext.data.JsonReader(cfg.metaData)
			});
			if(cfg.needSla)
				this.store.on("load",this._storeLoad,this);
		}else if(url){
			this.store.reader = new Ext.data.JsonReader(cfg.metaData);
			this.store.proxy=new Ext.data.HttpProxy({
				url : url
			});
			if(!cfg.needSla)
				this.store.un("load",this._storeLoad,this);
		}
		
		return this.store;
	},
	
	getCm : function(){
		var cfg = $worktable(this.getParamsValue('bpInfo').code);
		return new Ext.grid.ColumnModel([cfg.sm,this.expander].concat(cfg.columns) );
	},
	
	rowdblclick : function(grid, rowIndex, e) {//查看或处理
		var selectedRow = grid.store.getAt(rowIndex);
		var id = selectedRow.get("id");
		var code = selectedRow.get("code");
		this.showInTabPanel(id,code).loadBpi(id)

	},
	
	/**
	 * 列表右键菜单
	 * @param {} grid
	 * @param {} rowIndex
	 * @param {} e
	 */
	rowcontextmenu : function(grid, rowIndex, e){
		var jbpmProcessInstanceID = grid.store.getAt(rowIndex).get("jbpmProcessInstanceID");
		var categoryId=grid.store.getAt(rowIndex).get("categoryId");
		var creatorId=grid.store.getAt(rowIndex).get("creatorId");
		
		var sm = this.grid.getSelectionModel();
		var rowselects = sm.getSelections();
		
		var rightClickMenu = new Ext.menu.Menu({
            items : [{//提交	0
            		text:$lang('common.submit'),
					iconCls:"submit-icon",
					scope : this,
					xaction : "bp-quick-submit",
                    handler:function(){ this.submitBpi(grid, rowIndex, e); }
            
            },{//编辑提交 1
					text:$lang('component.edit'),
					iconCls:"modify-icon",
					scope : this,
                    handler:function(){ this.editBpi(grid, rowIndex, e); }
            },{//删除 2
					text:'撤销',
					iconCls:"delete-icon",
					scope : this,
                    handler:function(){ this.delBpi(grid, rowIndex, e); }
			},'-',{//分解 4
					text:'分解',
					iconCls:"bp-fork-process-icon",
					scope : this,
					xaction : "bp-fork-contextMenu",
                    handler:function(){ this.forkBpi(grid, rowIndex, e); }
            }/*,{//合并 5
					text:'合并到...',
					iconCls:"join-node-icon",
					scope : this,
					xaction : "bp-join-contextMenu",
                    handler:function(){ this.joinBpi(grid, rowIndex, e); }
            },{//催办 6
					text:'催办',
					iconCls:"permissions-set-icon",
					scope : this,
					xaction : "bp-press-contextMenu",
                    handler:function(){ this.pressBpi(grid, rowIndex, e); }
            }*/,'-',{//流程图 6
            		text:$lang('bp.workflow'),
					iconCls:"workflow-icon",
					scope : this,
                	handler:function(){ this.showGraph(grid, rowIndex, e);}
            }, '-', {//设为模板 8
            	text: $lang('bp.setTemplate'),
            	iconCls:'bp-set-template-icon',
            	xaction:'bp_setAsTemplate',
            	scope : this,
            	handler: function(){ this.saveAsTpl(grid, rowIndex, e); }
            }]
        });
        
        e.preventDefault();
        if(!categoryId)//无类别的流程
        	rightClickMenu.items.items[8].setDisabled(true);
        if( this.getParamsValue("userId")!=creatorId && !jbpmProcessInstanceID ){//本人创建的草案状态工单权限
        	rightClickMenu.items.items[0].setDisabled(true);
        	rightClickMenu.items.items[1].setDisabled(true);
        	rightClickMenu.items.items[2].setDisabled(true);
        }
        if(rowselects.length <= 0){//无勾选工单
//        	rightClickMenu.items.items[5].setDisabled(true);
//        	rightClickMenu.items.items[6].setDisabled(true);//催办 
        }
        if(jbpmProcessInstanceID && jbpmProcessInstanceID != 0){//已提交工单
        	rightClickMenu.items.items[0].setDisabled(true);
        	rightClickMenu.items.items[1].setDisabled(true);
        	rightClickMenu.items.items[2].setDisabled(true);
        }else{
//        	rightClickMenu.items.items[6].setDisabled(true);//催办 
        	rightClickMenu.items.items[6].setDisabled(true);
        }
        
        rightClickMenu.showAt(e.getXY());
	},
	
	/**
	 * 右键提交草案动作
	 * @param {} grid
	 * @param {} rowIndex
	 * @param {} e
	 */
	submitBpi : function(grid, rowIndex, e){
		var id = grid.store.getAt(rowIndex).get("id");
		grid.el.mask($lang('bp.processingWaitMsg'),"x-mask-loading");
    	Ext.Ajax.request({
            url: 'bp/submitBpi.html',
            method: 'POST',
            params: {id:id},
            success: function(response,options){
                var responseStr = response.responseText;
                if (responseStr == "success") {
                    grid.store.reload();
                }else {
                    Ext.Msg.alert($lang('bp.failed'), $lang('common.operationFailed'));
                }
                grid.el.unmask(true);
            },
            failure: function(response,options){
            	Ext.Msg.alert($lang('bp.failed'), $lang('common.operationFailed'));
            	grid.el.unmask(true);
            }
        });
	},
	
	/**
	 * 右键编辑草案动作
	 * @param {} grid
	 * @param {} rowIndex
	 * @param {} e
	 */
	editBpi : function(grid, rowIndex, e){
		var id = grid.store.getAt(rowIndex).get("id");
		var code = grid.store.getAt(rowIndex).get("code");
		var editUrl = grid.store.getAt(rowIndex).get("updateUrl");
		
        var panel=this.showInTabPanel(id,code);
        panel.load({
        	url : editUrl,
        	params : {id:id},
        	scope : this,
        	scripts : true
        });
	},
	
	/**
	 * 右键分解工单动作
	 * @param {} grid
	 * @param {} rowIndex
	 * @param {} e
	 */
	forkBpi : function(grid, rowIndex, e){//分解工单
		//1、弹出窗口询问分解成的工单数量；
		//2、发送请求创建相应数量的工单；
		//3、打开相应的工单编辑页面，编辑完成后提交；
		var editUrl = grid.store.getAt(rowIndex).get("updateUrl");
		var bpiId = grid.store.getAt(rowIndex).get("id");
		var scope = this;
		var createFork = function(ret,value){
			value = value.match(/^\d$/);
			if(ret == 'ok'&& value > 0 ){
				Ext.Ajax.request({
					url : 'bp/cloneBusiness.html',
					method : 'POST',
					params : { bpiId : bpiId , count : value },
					success : function(r , o){
						var rs = r.responseText;
						if(rs == 'failure'){
							Ext.Msg.alert('提示','操作失败！');
							return ;
						}
						rs = rs.split(',');
						var traval = function(rs,i){
							if( i < rs.length ){
								var panel=scope.showInTabPanel(rs[i],'分解['+i+']');
								panel.load({
						        	url : editUrl,
						        	params : {id:rs[i]},
						        	scope : this,
						        	scripts : true,
						        	callback : function(){
						        		if(++i < rs.length) traval(rs, i);
						        	}
						        });
							}
						};
						traval(rs,0);
						
						grid.store.reload();
					},
					failure : function(r , o){
						
					}
					
				});
			}else if(ret == 'ok'){
				Ext.Msg.alert('提示','您的输入不正确，请输入1-9的数字！');
			}
		}
		Ext.Msg.prompt('提示','请输入分解成的工单数量：',createFork,this,false);
	},
	
	/**
	 * 右键合并工单动作
	 * @param {} grid
	 * @param {} rowIndex
	 * @param {} e
	 */
	joinBpi : function(grid, rowIndex, e){
		//弹出窗口选择要合并到的工单
		var sm = this.grid.getSelectionModel();
		var rowselects = sm.getSelections();
		if (rowselects.length <= 0){
			Ext.Msg.alert($lang('bp.tips'), $lang('bp.pleaseSelectBpiInstance'));
			return ;
		}
		var except = '';
		Ext.each(rowselects,function(item){
			except += "," + item.get('id');
		});
		except = except.substring(1);
		
		var callbackValue = null;
		var bpCode = this.getParamsValue('bpInfo').code;
		
		var x = new BpiChooseWin(except, callbackValue, 'showDraf=true', bpCode);
		x.setTitle("合并到...");
		x.on('close',function(){
			callbackValue = this.callbackGrid;
			if(callbackValue && callbackValue.get('id')){
				Ext.Ajax.request({
					url : 'bp/joinBusiness.html',
					method : 'POST',
					params : {bpiId : callbackValue.get('id'), joinedIds : except},
					success : function(r,o){
						if(r.responseText == 'success'){
							grid.store.reload();
							Ext.Msg.alert('提示','合并成功!');
						}
						else
							Ext.Msg.alert('提示','合并失败!');
					},
					failure : function(){
						Ext.Msg.alert('提示','合并失败!');
					}
				});
			}
		});
		x.show();
		
	},
	
	/**
	 * 右键催办工单动作
	 * @param {} grid
	 * @param {} rowIndex
	 * @param {} e
	 */
	pressBpi : function(grid, rowIndex, e){
		Ext.lion.ScriptLoader('ext/extension/CheckBoxGroup.js');
		
		var sm = this.grid.getSelectionModel();
		var rowselects = sm.getSelections();
		if (rowselects.length <= 0){
			Ext.Msg.alert($lang('bp.tips'), $lang('bp.pleaseSelectBpiInstance'));
			return ;
		}
		var bpIds = '';
		for (var i = 0; i < rowselects.length; i++) {
			bpIds += ""+ rowselects[i].get('id')+ ",";
		}
		var grid=this.grid;
		
		var pressWin = new Ext.Window({
			title : '催办',
    		layout : 'fit',
    		width : 400,
    		height : 260,
    		buttonAlign : 'center',
    		modal : true,
    		resizable : false,
    		items : [{
        		xtype : 'form',
        		layout : 'form',
        		border:false,
        		labelWidth : 60,
        		bodyStyle:"padding:8px 8px 0",
        		items : [{
        			xtype : "hidden",
        			value : bpIds,
					name : "bpIds"
        		},{
        			xtype : 'ux-checkboxgroup',
        			fieldLabel : '提醒方式',
        			horizontal : true,
        			name : 'noticeMode',
        			checkboxes :[{
						xtype : "checkbox",
						checked : false,
						value : "message",
						boxLabel : "短信"
					},{
						xtype : "checkbox",
						checked : false,
						value : "mail",
						boxLabel : "邮件"
					},{
						xtype : "checkbox",
						checked : false,
						value : "desktop",
						boxLabel : "桌面提醒"
					}]
        			
        		},{
        			xtype : 'textarea',
        			fieldLabel : '备注',
        			name : 'comment',
//        			anchor: '100%',
        			width : '95%',
        			height: 135,
        			readOnly : false
        		}]
        	}],
        	buttons :[{
        		text : '确定',
        		handler : function(){
        			pressWin.items.items[0].form.submit({
        				url : 'bp/pressRequest.html',
						method : 'POST',
						waitTitle : '请稍候',
						waitMsg : '处理中...',
						success : function(form, action){
							Ext.Msg.alert("成功","处理成功!");
							pressWin.close();
						},
						failure : function(form, action){
							pressWin.close();
						}
        			});
        		}
        	},{
        		text : '取消',
        		handler : function(){
        			pressWin.close();
        		}
        	}]
		});
		pressWin.show();
		
	},
	
	/**
	 * 右键删除工单动作
	 * @param {} grid
	 * @param {} rowIndex
	 * @param {} e
	 */
	delBpi : function(grid, rowIndex, e){
		var id = grid.store.getAt(rowIndex).get("id");
	    var m=Ext.MessageBox.confirm($lang('bp.tips'),$lang('bp.YesOrNoForDeleted'),function(ret){
	        if(ret=="yes"){
	            Ext.Ajax.request({
	                url: 'bp/deleteBpis.html',
	                method: 'POST',
	                params: {id:id},
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
	
	/**
	 * 右键显示流程图动作
	 * @param {} grid
	 * @param {} rowIndex
	 * @param {} e
	 */
	showGraph : function(grid, rowIndex, e){
		var id = grid.store.getAt(rowIndex).get("id");
		var record = grid.store.getAt(rowIndex);
		var tabPanel = this;
		var processName = record.get('defFilePath').replace('define','').replace('.xml','');
		var panel = tabPanel.getComponent('bpGraph_'+id);
		if(panel)
			tabPanel.activate(panel);
		else{
			panel = new Ext.Panel({
				id : 'bpGraph_'+id,		//保证一个流程实例只打开一个流程图查看页面
		        title: record.get('code')+$lang('bp.workflow'),
		        layout: 'fit',
		        recordObj : record,
		        html: '<iframe frameborder="0"  scrolling="no" width="100%" height="100%" src = "workflow/flowDesign.jsp?playtype=bpview&opertype=play&name='+processName+'&flowinsid='+record.get('id')+'&executednodessequence='+record.get('nodesSequence')+'" />',
		        closable: true
		    });
		}
	    tabPanel.add(panel).show();
	},
	
	/**
	 * 右键保存为模板动作
	 * @param {} grid
	 * @param {} rowIndex
	 * @param {} e
	 */
	saveAsTpl : function(grid, rowIndex, e){
		var template=grid.store.getAt(rowIndex).get('categoryTpl');
		var templateUrl = grid.store.getAt(rowIndex).get("templateUrl");
		var title = grid.store.getAt(rowIndex).get("defName");
		var categoryName = grid.store.getAt(rowIndex).get('categoryName');
		var id = grid.store.getAt(rowIndex).get("id");
		var bpId = this.getBpId();
		var tabPanel = this;
		
		function showTemplatePage(){
			tabPanel.showInTabPanel(Ext.id(), title+'_'+categoryName+$lang('bp.template')).load({
				url : templateUrl,
				params : {tabpId: tabPanel.id, bpiId:id, bpId: bpId},
				scope : this,
				scripts : true
			});
		};
		if( template ){//需要覆盖模板
			var m=Ext.MessageBox.confirm($lang('bp.tips'),$lang('bp.overrideTemplateMsg'), function(ret){
				if(ret=='yes'){
					showTemplatePage();
				}
			});
		}else if(templateUrl==null || templateUrl.trim()==''){
			Ext.Msg.alert($lang('bp.tips'),$lang('bp.bpview.msg.notemplate')/*'此流程未定义模板'*/);
		}else{
			showTemplatePage();
		}
	},
	
	/**
	 * 展开行的时候获取该工单的当前处理人
	 * 当工单为草案状态时将工单的当前处理人定义为工单的创建人
	 * @param {} expander
	 * @param {} row
	 * @param {} body
	 * @param {} rowIndex
	 */
	beforRowExpand : function(expander,row,body,rowIndex){
		if(row.data.processors==null || row.data.processors.length<=0){
 			Ext.Ajax.request({
				url: 'bp/getBpiProcessors.html',
				method: 'POST',
				scope: this,
				params: {jbpmProcessInstanceId:row.get('jbpmProcessInstanceID')},
				success: function(response,options){
                	var responseStr = response.responseText;
                	responseStr = Ext.decode(responseStr);
                	if (responseStr.success && responseStr.root) {
						if(responseStr.root[0] && responseStr.root[0].processors && responseStr.root[0].processors!=''){
							row.set("processors",responseStr.root[0].processors);
						}else if(!row.get('jbpmProcessInstanceID') ){//草案状态 时 处理人为创建人
							row.set("processors",row.get('creatorName'));
						}
					} else {
						Ext.Msg.alert($lang('bp.failed'),$lang('bp.loadFailedMsg'));
					}
				}
			});	
		}
	},
	
	/**
	 * 加载列表前初始化流程的相关数据
	 * @param {} node
	 */
	setCreateUrlAndBpId : function(node){
		var url=node.attributes.createUrl;
		var bpId=node.id;
		var refreshTpl = false;
		while(!url && node){
			if(node.attributes.createUrl){
				url=node.attributes.createUrl;
				bpId=node.id;
				break;
			}
			node=node.parentNode;
		}
		if(url){
			this.createUrl=url;
			if(this.bpId != bpId){
				this.bpId=bpId;
				refreshTpl = true;
			}
		}
		
		if(this.getParamsValue('bpInfo')){//覆盖原来逻辑
			this.createUrl=this.getParamsValue('bpInfo').createUrl;
			if(this.bpId != this.getParamsValue('bpInfo').id ){
				this.bpId = this.getParamsValue('bpInfo').id;
				refreshTpl = true;
			}
		}
		
		if( refreshTpl ){
//			this._showTemplateMenu(this.);
		}
	},
	
	getCreateUrl : function(){	return this.createUrl;	},
	
	getBpId : function(){	return this.bpId;	},
	
	/**
	 * 在tab页中打开一个工单页面
	 * 此功能依赖于BpWorkbenchPanel.js
	 * @param {} id
	 * @param {} title
	 * @return {}
	 */
	showInTabPanel : function(id,title,config){
		var panel = this.getComponent(id);
		if(panel)
			this.activate(panel);
		//解决ID冲突后开放多个标签页
//		while(this.items.length>1){
//			this.remove(this.items.items[1]);
//        }
		else{
	        panel = new BpWorkbenchPanel(id,title,config);
			this.add(panel).show();
		}
		return panel;
	},
	
	/**
	 * 简单查询动作
	 * @param {} ct
	 */
	search : function(ct){
    	var modelName = "";
    	var stateId = "";
    	var nodeId = "";
    	var node = this.node;
    	var filterId = node.id;
    	
    	var conditionValue = '';
    	if(node.isLeaf()){
    		modelName = node.parentNode.attributes.modelName;
    		nodeId = node.parentNode.id;
    		stateId = node.id;
    	}else{
    		modelName = node.attributes.modelName;
    		nodeId = node.id;
    	}
    	
    	if(this.getParamsValue('bpInfo')){
    		modelName = this.getParamsValue('bpInfo').modelName;
    		nodeId = this.getParamsValue('bpInfo').id;
    		stateId = null;
    	}
    	
    	var method = this.conditionCombo.getValue();
    	if(method == "createdOn"){
			var dateTime = Ext.util.Format.date(this.conditionDate.getValue(), 'Y-m-d');
			conditionValue =dateTime.toString();
		}else{
			conditionValue = this.condtionText.getValue();
		}
		var store_h = this.grid.getStore();
//		store_h.proxy.conn.url = 'bp/listByHql.html';
		
		var limit = store_h.baseParams.limit;
		Ext.apply(store_h.baseParams, {
				filterId : filterId,	//过滤器id
				bpId : nodeId,			//流程id 
				modelName : modelName,	//类名
				condition : method,
				conditionValue : conditionValue
				
			});
		store_h.removeAll();
		store_h.load({params:{start:0,limit:limit}});
    },
	
    /**
     * 高级查询
     */
    advanceSearch : function(){
    	var scope = this;
    	var node = scope.node;
    	var bpId = scope.getBpId();
    	var title = scope.getParamsValue("bpInfo").name + $lang('button.advancedSearch')/*"高级查询"*/
    	var id = bpId + "_searchPanel";
    	var modelName;
		if(node.isLeaf())
			modelName = node.parentNode.attributes.modelName;
		else
			modelName = node.attributes.modelName;
		if(typeof(modelName) == "undefined")//兼容过滤器
			modelName = node.attributes.clazz; 
		
		if(this.getParamsValue('bpInfo')){//覆盖原来设置
			modelName = this.getParamsValue('bpInfo').modelName;
		}
		
		var conf = {modelName:modelName, bpId:bpId, id:id, title:title};
		var bpSearchPanel = scope.getComponent(id);
		if(bpSearchPanel){
			scope.activate(bpSearchPanel);
		} else {
			bpSearchPanel = new BpSearchPanel(conf);
			scope.add(bpSearchPanel).show();
    		bpSearchPanel.loadSearchPanel(modelName);
		} 
    	
		scope.doLayout();
	},
	
    /**
     * 显示模板创建菜单
     * @param {} ct
     */
    _showTemplateMenu : function(ct){
    	var scope=this;
		Ext.Ajax.request({
			url: 'bp/listTemplateForBpMenu.html',
			method: 'POST',
			scope: this,
			params:{
				bpId : scope.getBpId()
			},
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
				 			    text :srcArray[i].text,
				 			    categoryId : srcArray[i].id,
				 			    scope: scope,
				 			    iconCls:"category-icon",
				 			    handler : scope.createBpiByTpl
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
    
	setParams : function(key,value){
    	
    	if( this.paramsMap == null ){
    		this.paramsMap = {};
    	}
    	
    	this.paramsMap[key] = value;
    },
    
    getParamsValue : function(key){
    	
    	if( this.paramsMap == null ){
    		this.paramsMap = {};
    	}
    	return this.paramsMap[key];
    },
    
    _storeLoad : function(thiz, records, options ){
    	if(this.slaMonitorTask!=null){
    		Ext.TaskMgr.stop(this.slaMonitorTask);
    	}
    	this.slaMonitorTask = {
    		scope : this,
		    run: function(){
		    	if(!this.rendered){Ext.TaskMgr.stop(this.slaMonitorTask);return;}
		    	Ext.Ajax.request({
					url : 'slm/currentRunningTimeLevel.html',
					method : 'POST',//参数过长只能用post
					params : {bpiIds : thiz.collect('id')+""},
					success : function(response, options) {
						var result = Ext.util.JSON.decode(response.responseText);
						for(var i=0;i<result.length;i++){
							var num = thiz.find("id",result[i].id);
							var rec = thiz.getAt(num);
							if(rec!=undefined){
								var levelMsg =result[i].levelMsg.split(",");
								rec.set("level",levelMsg[0]);
								rec.set("triggerTime",levelMsg[1]);
								rec.set("timeoutTime",levelMsg[2]);
							}
						}
					},
					failure: function(){}
				});
		    },
	    	interval: 1000*10
		};
    	if(""!=thiz.collect('id')){
    		Ext.TaskMgr.start(this.slaMonitorTask);
    	}
    },
    
    listeners : {'beforeremove' : function(){
    	if(typeof(countdownTask)!='undefined'&&countdownTask!=null){
    		Ext.TaskMgr.stop(countdownTask);
    		countdownTask=null;
    	}
    }},
    
    print : function(){
    	var selectedRow = this.getGrid().getSelections();
		
		var title = this.getParamsValue('bpInfo').name;
		
		var msg = selectedRow.length>0?"打印选中数据?":"导出全部数据?";
		Ext.Msg.confirm('提示', msg, function(btn) {
				if (btn == 'yes') {
					var ids = "";
					if(selectedRow.length>0){
						for ( var i = 0; i < selectedRow.length; i++) {
							ids += "'" + selectedRow[i].get("id") + "',";
						}
						ids = ids.substring(0, ids.length - 1);
					}
					var fileName = this.mainTabPanel.title;
					var exportClass = this.getParamsValue('bpInfo').modelName;
					document.location.href = "bp/printView.html?"
						+ "title=" + title
						+ "&ids=" + ids
						+ "&modelName=" + exportClass;
					document.readyState == "complete";
				}
			},this);
    },
    
    showFieldsWin : function(){
		var selectedRow = this.getGrid().getSelections();
		
		var title = this.getParamsValue('bpInfo').name;
		
		var msg = selectedRow.length>0?"导出选中数据?":"导出全部数据?";
		Ext.Msg.confirm('提示', msg, function(btn) {
				if (btn == 'yes') {
					var ids = "";
					if(selectedRow.length>0){
						for ( var i = 0; i < selectedRow.length; i++) {
							ids += "'" + selectedRow[i].get("id") + "',";
						}
						ids = ids.substring(0, ids.length - 1);
					}
					var fileName = this.mainTabPanel.title;
					var exportClass = this.getParamsValue('bpInfo').modelName;
					document.location.href = "bp/exportAllForm.html?"
						+ "title=" + title
						+ "&ids=" + ids
						+ "&modelName=" + exportClass;
//					document.readyState == "complete";
				}
			},this);
    }
    	
});


/**
 * 流程实例选择窗口
 * @param {} exceptCondition
 * @param {} callbackGrid
 * @param {} winStoreParam
 * @param {} defaultAssBp
 */
BpiChooseWin = function(exceptCondition,callbackGrid,winStoreParam,defaultBp) { 
    this.exceptCondition = exceptCondition;	//需要排除的查询条件
    this.callbackGrid = callbackGrid;		//父组件
    this.winStoreParam = winStoreParam;		//参数
    this.defaultBp = defaultBp;		//默认流程  用code标识
    this.storeUrl = 'bp/bpiListForWin.html';
    if(this.winStoreParam)
    	this.storeUrl +='?'+this.winStoreParam;
    BpiChooseWin.superclass.constructor.call(this,  {
        layout:'fit',
        width:650,
        height:400,
        resizable : false,
        closeAction:'close',
        buttonAlign :'center',
        modal :true,
        plain: true
    });
    
    this.store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url:this.storeUrl}),
        baseParams :{start:0 , limit : 15 },
		reader: new Ext.data.JsonReader({
				root : 'root',
				totalProperty : 'total',
				successProperty : 'success'
			}, 
			[
				{name:'id'},
				{name:'code'},
				{name:'category'},
				{name:'summary'},
				{name:'state'}
			]
		)
	});
	
	
	this.search_processType_store = new Ext.data.Store({
        proxy : new Ext.data.HttpProxy({
							url : 'bp/list.html'
						}),
		autoLoad : true,
		reader : new Ext.data.JsonReader({
				root : 'process',
				totalProperty : 'total',
				successProperty : 'success'
			}, 
			[
				{name:'name'},
				{name:'id'},
				{name:'code'}
			]
		)
	});
	
	this.search_processType_store.on('load',this.processTypeLoad,this);
	
    this.search_processType = new Ext.form.ComboBox({
    	hidden : true,
        hideLabel : true,
        width : 100,
        forceSelection : true,
        triggerAction : 'all',
        readOnly : true,
        editable : false,
        store : this.search_processType_store,
        valueField : 'id',
        displayField : 'name',
        mode : 'local'
    });
    
    this.search_processType.on('select',this.processTypeSelect,this);
   
    this.search_field_store = new Ext.data.Store({
        reader : new Ext.data.ArrayReader({}, [{
            name : '_field_rawvalue'
        }, {
            name : '_field_value'
        }])
    });
    
    this.search_field_store.loadData([[$lang('component.code'),'code'],[$lang('component.state'),'state'],[$lang('component.category'),'category'],[$lang('component.summary'),'summary']]);

    this.search_field = new Ext.form.ComboBox({
        xtype : 'combo',
        hideLabel : true,
        width : 100,
        forceSelection : true,
        triggerAction : 'all',
        readOnly : true,
        editable : false,
        store : this.search_field_store,
        value : this.search_field_store.getAt(0).get('_field_value')
                ? this.search_field_store.getAt(0).get('_field_value')
                : '',
        valueField : '_field_value',
        displayField : '_field_rawvalue',
        mode : 'local'
    });

    this.search_condition = new Ext.form.TextField({
        xtype : 'textfield',
        hideLabel : true
    });
    
    this.searchTbar = ['->', /*{
        xtype : 'tbtext',
        hidden : true,
        text : '流程类型:'
    }, this.search_processType,*/ {
        xtype : 'tbtext',
        text : $lang('component.searchByConditions')
    }, this.search_field, {
        xtype : 'tbtext',
        text : $lang('component.contain')
    }, this.search_condition, {
        text : $lang('component.search'),
        xtype : 'tbbutton',
        store : this.store,
        scope : this,
        handler : this.searchFn
    }];
    
    
    this.sm = new Ext.grid.CheckboxSelectionModel({singleSelect : true});
    
    this.cm = new Ext.grid.ColumnModel([
		this.sm,
		{
			header :$lang('component.code'),
			sortable: true,
			dataIndex : "code"
		}, {
			header : $lang('component.category'),
			dataIndex : "category",
			renderer : function(r){if(r && r.name) return r.name;else return ''}
		}, {
			header : $lang('component.summary'),
			sortable: true,
			dataIndex : "summary"
		}, {
			header : $lang('component.state'),
			dataIndex : "state",
			renderer : function(r){if(r && r.name) return r.name;else return ''}
		}]);
    
    var bbar = new Ext.PagingToolbar({
        pageSize: 15,
        store: this.store, 
        displayInfo: true,
        style : 'border-width: 0 0 0 0;',
        displayMsg: $lang('component.displayMsg'),
        emptyMsg: $lang('component.emptyMsg')
    });
    
    this.grid = new Ext.grid.GridPanel({
        viewConfig : {forceFit : true},
        frame : false,
        border : true,
        autoScroll : true,
        store : this.store,
        style : 'border-width: 1px 1px 1px 1px;',
        cm : this.cm,// dynamic cm
        sm : this.sm,
        tbar : this.searchTbar,
        bbar: bbar,
        loadMask : true
    });
    
    /**end of building the grid*/  
    this.add(this.grid);
    this.addSubmitButton();
    this.addCloseButton();
};

Ext.extend(BpiChooseWin, Ext.Window, {
	
	/**
	 * 添加提交按钮
	 */
    addSubmitButton :function(){
        this.addButton({
            text : $lang('component.OK'),
            scope:this,
            handler : function() {
                var selectedRow = this.grid.getSelectionModel().getSelected();
                if(selectedRow)
                	this.callbackGrid=selectedRow;
                
                this.close();
            }
        })
    },
    
    /**
	 * 添加关闭按钮
	 */
    addCloseButton :function(){
        this.addButton({
            text : $lang('component.cancel'),
            scope:this,
            handler : function() {
                this.close();
            }
        })
    },
    
    /**
	 * 查询动作
	 */
    searchFn : function(){
    	 var bpId = this.search_processType.getValue(); 
         var searchField = this.search_field.getValue();
         var searchValue = this.search_condition.getValue();
         if(typeof searchValue=="undefined")
         	searchValue = '';
         	
         if (searchField) {
             var params = '{' + searchField + ':"' + searchValue
             			+ '",bpId:"' + bpId 
                        + '",condition:"' + this.exceptCondition + '"}';
             params = Ext.util.JSON.decode(params);
             Ext.apply(params,{start : 0})
             Ext.apply(Ext.StoreMgr.lookup(this.store).baseParams, params);
             Ext.StoreMgr.lookup(this.store).load({
                 params : params
             });
         }
    },
    
    /**
     * 选择类型响应事件
     */
    processTypeSelect : function(){
		this.searchFn();
	},
	
	/**
	 * 流程类型加载事件响应
	 * @param {} s
	 * @param {} rs
	 * @param {} op
	 */
	processTypeLoad : function(s,rs,op){
		this.search_processType.setValue(this.search_processType_store.getAt(0).get("id"));
		for(var i=0; i<this.search_processType_store.getTotalCount(); i++)
			if(this.search_processType_store.getAt(i).get("code")==this.defaultBp)
				this.search_processType.setValue(this.search_processType_store.getAt(i).get("id"))
				
		this.searchFn();
	}
});
