/**
 * 换班请求的列表页面 extends BpViewPanel
 */
BpCsViewPanel = function(typeCode) {

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
		
	var templateAdd = new Ext.Button({
		text : $lang('bp.newTemplate'),//模板新增
		iconCls : 'create-icon',
		disabled: false,
		scope : this,
//		xaction: 'wtb_create',
		handler : this._showTemplateMenu
	});
		
	this.mainTabPanel = new Ext.Panel({
		frame : false,
		layout : 'border',
		border: false,
		title : $lang('bp.waiting'),
		hideMode : 'offsets'
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
	
	BpCsViewPanel.superclass.constructor.call(this, {
		activeTab : 0,
		id : 'BpCsViewPanel',
		region : 'center',
		margins : '0 0 0 0',
		resizeTabs : true,
		border : true,
		tabWidth : 150,
		minTabWidth : 100,
		enableTabScroll : true,
		plugins: new Ext.ux.TabCloseMenu()
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
	            	this.store.proxy.conn.url = 'bp/myListByBp.html';
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
	this.conditionCombo = new Ext.form.ComboBox({
		value : 'code',
		style : "border:1px solid #eee;background: #f4fcf4",
		editable : false,
		store : new Ext.data.SimpleStore({
			fields : ["name", "value"],
			data : [[$lang('bp.code')/*'工单号'*/, 'code'],[$lang('com.dhcc.itsm.schedule.model.ChangeShift.reason')/*'换班原因'*/, 'reason'],[$lang('com.dhcc.itsm.schedule.model.ChangeShift.requester'), 'requester.xingMing'],[$lang('bp.byCreateDate'), 'createdOn']]
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
	this.exToolbar = new Ext.Toolbar({
		style : "background:#fff;border-bottom:1px solid #fff;",
        items : [{
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
     
	this.expander=new Ext.grid.RowExpander({
		lazyRender: true,
		enableCaching: false,
        tpl : new Ext.Template(
        	 '<table><tr>',
	            	'<td width ="100">'+space+$lang('com.dhcc.itsm.schedule.model.ChangeShift.requester')/*申请人*/+':</td>',
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
				}/*,{//合并 5
					text:'合并到...',
					iconCls:"join-node-icon",
					scope : this,
					xaction : "bp-join-contextMenu",
                    handler:function(){ this.joinBpi(this.grid); }
            	},{//催办 6
					text:'催办',
					iconCls:"permissions-set-icon",
					scope : this,
					xaction : "bp-press-contextMenu",
                    handler:function(){ this.pressBpi(this.grid); }
            	},{
					iconCls: 'set-icon',
					text : $lang('cmdb.menu.tools.set','>')设置 >
			}*/]
		},'->',{
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
	}];
		
	this.add(this.mainTabPanel);
    this.mainTabPanel.add(this.mainTabCenterPanel);
};

Ext.extend(BpCsViewPanel, BpViewPanel,{
	
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
	        panel = new BpWorkbenchPanel(id,title,{op: 'c'});
			this.add(panel).show();
		}
		return panel;
	},
	
	_reset : function(){
		if(this.grid){
			this.conditionDate.reset();
			this.conditionDate.setVisible(false);
			this.condtionText.reset();
			this.condtionText.setVisible(true);
			this.conditionCombo.reset();
		
			var tbar = this.grid.getTopToolbar();
//			this.categoryCbt.clearValue();
			this.statusCb.clearValue();
			
			this.getStore().baseParams={};
		}
	},
	rowcontextmenu : function(grid, rowIndex, e){

		var id = grid.store.getAt(rowIndex).get("id");
		var bpId = this.getBpId();
		var jbpmProcessInstanceID = grid.store.getAt(rowIndex).get("jbpmProcessInstanceID");
		var code = grid.store.getAt(rowIndex).get("code");
		var categoryId=grid.store.getAt(rowIndex).get("category");
		var creatorId=grid.store.getAt(rowIndex).get("creatorId")
		var tabPanel = this;
//		var actors =  grid.store.getAt(rowIndex).get("responder").id;

		var rightClickMenu = new Ext.menu.Menu({
            items : [{
            		text:$lang('common.submit'),
					iconCls:"submit-icon",
                    handler:function(){
//                    	grid.el.mask($lang('bp.processingWaitMsg'),"x-mask-loading");
                    	Ext.Ajax.request({
                            url: 'run/requestData.html',
                            method: 'POST',
                            params: {id: id, actionCode: 'cs_rightClickSubmit'},
                            success: function(response,options){
                                var responseStr = response.responseText;
                                responseStr = Ext.decode(responseStr);
                                if (responseStr.success) {
                                    grid.store.reload();
                                }else {
                                    Ext.Msg.alert($lang('bp.failed'), $lang('common.operationFailed'));
                                }
//                                grid.el.unmask(true);
                            },
                            failure: function(response,options){
                            	Ext.Msg.alert($lang('bp.failed'), $lang('common.operationFailed'));
//                            	grid.el.unmask(true);
                            }
                        });
                    }
            
            },{//编辑提交 1
					text:$lang('component.edit'),
					iconCls:"modify-icon",
					scope : this,
                    handler:function(){ this.editBpi(grid, rowIndex, e); }
            },{//删除 2
					text:$lang('bp.delete'),
					iconCls:"delete-icon",
					scope : this,
                    handler:function(){ this.delBpi(grid, rowIndex, e); }
			},'-',{//流程图 4
            		text:$lang('bp.workflow'),
					iconCls:"workflow-icon",
					scope : this,
                	handler:function(){ this.showGraph(grid, rowIndex, e);}
            },{//设为模板5
            	text: $lang('bp.setTemplate'),
            	iconCls:'template-icon',
            	xaction:'bp_setAsTemplate',
            	scope : this,
            	handler: function(){ this.saveAsTpl(grid, rowIndex, e); }
            }]
        });
        
        e.preventDefault();
        // 无类别时隐藏设为模板
        if(!categoryId)
        	rightClickMenu.items.items[5].setDisabled(true);
        if( this.getParamsValue("userId")!=creatorId && !jbpmProcessInstanceID ){
        	rightClickMenu.items.items[0].setDisabled(true);
        	rightClickMenu.items.items[1].setDisabled(true);
        	rightClickMenu.items.items[2].setDisabled(true);
        }
        // 隐藏流程图
        if(jbpmProcessInstanceID && jbpmProcessInstanceID != 0){
        	rightClickMenu.items.items[0].setDisabled(true);
        	rightClickMenu.items.items[1].setDisabled(true);
        	rightClickMenu.items.items[2].setDisabled(true);
        }else
        	rightClickMenu.items.items[4].setDisabled(true);
        
        rightClickMenu.showAt(e.getXY());
	},
	
	search : function(){
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
		var limit = store_h.baseParams.limit;
		
		store_h.proxy.conn.url = 'schedule/listChangeShift.html';
		Ext.apply(store_h.baseParams, {
					method : method,
					content : conditionValue
				});
		store_h.removeAll();
		store_h.load({params:{start:0,limit:limit}});}
});
