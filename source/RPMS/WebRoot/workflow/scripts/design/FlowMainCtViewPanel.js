/**
 * 流程管理的中间区域容器 （需要拆分）
 */
FlowMainCtViewPanel = function(){
	
	FlowMainCtViewPanel.superclass.constructor.call(this, {
		activeTab : 0,
		region : 'center',
		margins : '0 0 0 0',
//		resizeTabs : true,
		tabWidth : 150,
		minTabWidth : 120,
		enableTabScroll : true,
		plugins : new Ext.ux.TabCloseMenu(),
		border : true,
		items : {
//			id : 'flow-main-view',
			layout : 'fit',
			title : '流程设计',
			hideMode : 'offsets',
			border : false,
			items : [{
//				id : 'flow-center-view',
				layout : 'fit',
				tabTip : 'none',
				border : false
			}]
		}
	});
//	this.loadFlowViewPanel();
};


Ext.extend(FlowMainCtViewPanel, Ext.TabPanel, {

	/**
	 * 载入流程管理首页
	 */
	loadFlowManagerHome : function(){
		this.items.first().setTitle('流程设计首页');
		this.loadToWorkPanel( new FlowManagerHome() );
	},
	/**
	 * 添加面板
	 * @param {} workPanel
	 */
	addNewWorkPanel : function(workPanel,tabTitle){
		var panelId = workPanel.getId();
		if (this.sViewCompId&&this.tViewCompId){
			if(this.sViewCompId==panelId){
				this.remove(this.sViewCompId);
				this.sViewCompId=panelId;
			}else if(this.tViewCompId==panelId){
				this.remove(this.tViewCompId);
				this.tViewCompId=panelId;
			}
		}
		if(!this.sViewCompId){
			this.sViewCompId = panelId;
		}else if(!this.tViewCompId){
			this.tViewCompId = panelId;
		}
		var closable = {closable : true}
		Ext.apply(workPanel,closable);
		this.add(workPanel);
		this.getItem(panelId).setTitle(tabTitle);
		this.ownerCt.doLayout();
      	this.activate(this.getItem(panelId));
	},
	/**
	 * 加载主面板
	 * 
	 * @param {} workPanel
	 */
	loadToWorkPanel : function(workPanel) {
		var cv = this.items.first().items.first();
		if (cv.compId) {
			cv.remove(cv.compId);
		}
		cv.compId = workPanel.getId();
		cv.add(workPanel);
		cv.ownerCt.doLayout();
        this.activate(this.items.items[0]);
	},
	/**
	 * 加载展现
	 * @param {} node
	 */
	loadData : function(node) {
		var flowPanel = null;
		var nodeType = node.attributes.type;
		switch(nodeType){
            case 'bpCategory':
                this.loadBpCategorys(node);
                break;
			case 'bpState':
				this.loadBpStates(node);
				break;
            case 'bpCloseCode':
                this.loadBpCloseCodes(node);
                break;
		}
		
		var classType = node.attributes.classType;
		if (classType == 'com.dhcc.workflow.engine.model.BusinessProcess') {
			flowPanel = new FlowDesignViewPanel(this, node);
			this.items.first().setTitle('流程(' + node.text + ')定义');
			
			if (this.sViewCompId) {
				this.remove(this.sViewCompId);
			}
			if (this.tViewCompId) {
				this.remove(this.tViewCompId);
			}
			this.loadToWorkPanel(flowPanel);
		}
		
		
	},
	
	loadBpCategorys : function(node){
		var bp = { bpId : node.parentNode.id , name : node.parentNode.text };
		var doUrl = node.attributes.url+'?bpId='+bp.bpId;
		var doRoot= node.attributes.type;
		var title = node.parentNode.text+'类别';
		
    	var record = Ext.data.Record.create([
    		{name: 'id'},
	     	{name: 'code'},
	     	{name: 'name'},
	     	{name: 'description'},
	     	{name: 'parent'},
	     	{name: 'process'},
	     	{name: 'updatedBy'},
	     	{name: 'updatedOn'},
	     	{name: 'createdBy'},
	     	{name: 'createdOn'},
	     	{name: 'leaf', type: 'bool'}
	   	]);
	    var store = new Ext.ux.maximgb.treegrid.AdjacencyListStore({
	    	url: doUrl,
			reader: new Ext.data.JsonReader({
        			id: 'id',
        			root: 'root',
        			totalProperty: 'total',
        			successProperty: 'success'
                },
                record
            )
	    });
	    var treeGrid = new Ext.ux.maximgb.treegrid.GridPanel({
            region: 'center',
            border: false,
            store: store,
            master_column_id : 'name',
            columns: [
	            	{id:'name',width: 150,header:$lang('bp.name'),sortable: true,dataIndex: "name"},
//	            	{header:$lang('bp.process'),sortable: true,dataIndex: "process", renderer : function(r){if(r && r.name) return r.name;else return '';}},	
	            	{header:$lang('bp.column.code'),sortable: true,dataIndex: "code"},
	      		    {header:$lang('bp.description'),sortable: true,dataIndex: "description"},
	      		    {header:$lang('bp.template'),width: 30,sortable: false,dataIndex: "id", renderer: function(id){
	      		    		var str = "<img src='styles/default/images/icons/16_16/template.png'>";
	      		    		return str;
	      		    	} 
	      		    }
      		    ],
            stripeRows: true,
            autoExpandColumn: 'name',
            root_title: $lang('bp.category'),
            viewConfig : {enableRowBody : true,autoFill: true, forceFit : true},
            tbar:[
              	{text:$lang('common.add'),iconCls:'create-icon', handler:function(){
                    var createOrEditWin; 
                    if(!createOrEditWin)
                    	createOrEditWin = new BpCategoryAddOrEdit({gridStore : store, op : 'create', bp : bp });
                    createOrEditWin.setTitle($lang('admin.bp.newCategoryTitle'));
                    createOrEditWin.show();
                }},'->',
               	{text:'导入',iconCls : 'import-icon',hidden : true
               	},
               	{text:'导出',iconCls : 'export-icon',hidden : true
               	}]
	    });
        this.loadToWorkPanel(treeGrid,'类别');
        this.items.first().setTitle(title);
     
	    store.reload();
     
        //add dblclick event to this treeGrid
        treeGrid.on('rowdblclick', function(treeGrid, rowIndex, e){
            var selectedRecordId = treeGrid.getSelectionModel().getSelected().get("id");
            var detailViewWin;
            if(!detailViewWin)
            	detailViewWin = new BpCategoryView();
            detailViewWin.show();
            detailViewWin.bpCategoryViewForm.form.load({url:'admin/bpCategoryView.html?bpCategoryId='+selectedRecordId});
        });
        
        treeGrid.on('cellclick', function(grid, rowIndex, columnIndex, e){
        	var selectedRecordId = grid.getSelectionModel().getSelected().get("id");
        	var createUrl=grid.getStore().getAt(rowIndex).get('process').createUrl;
        	var bpId=grid.getStore().getAt(rowIndex).get('process').id;
        	var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
        	if(fieldName=='id' && createUrl!=null && createUrl.length>10){
        		var p = this.ownerCt.ownerCt.ownerCt.getComponent('template_edit');
				if(p)		this.ownerCt.ownerCt.ownerCt.remove(p);
				var p = new BpWorkbenchPanel('template_edit',$lang('admin.bp.editTemplate'),{op:'c'});
		    	this.ownerCt.ownerCt.ownerCt.add(p).show();
		    	p.load({
					url : createUrl,
					params : {categoryId : selectedRecordId, bpId:bpId},
					scope : this,
					scripts : true
				});
        	}else if(fieldName=='id' && (createUrl==null || createUrl.length<10 ) ){
        		Ext.MessageBox.alert($lang('common.tips'),$lang('admin.bp.Msg.alertNoTpl'));
        	}
        });
        
        treeGrid.on('rowcontextmenu', function(treeGrid, rowIndex, e){
        	var editUrl=treeGrid.getStore().getAt(rowIndex).get('process').createUrl;
        	var bpId=treeGrid.getStore().getAt(rowIndex).get('process').id;
            var rightClickMenu = new Ext.menu.Menu({
                items : [{
                	xtype:"button",
					text:$lang('common.view'),
					iconCls:"view-icon",
					pressed:true,
                    handler:function(){
			            var detailViewWin;
			            if(!detailViewWin)
			            	detailViewWin = new BpCategoryView();
			            var selectedRecordId = treeGrid.store.getAt(rowIndex).get("id");
			            detailViewWin.show();
			            detailViewWin.bpCategoryViewForm.form.load({url:'admin/bpCategoryView.html?bpCategoryId='+selectedRecordId});
                    }
                },{
                    xtype:"button",
					text:$lang('common.edit'),
					iconCls:"modify-icon",
					pressed:true,
                    handler:function(){
                        var createOrEditWin; 
	                    if(!createOrEditWin)
	                    	createOrEditWin = new BpCategoryAddOrEdit({gridStore : store, op : 'edit', index: rowIndex, bp : bp});
                        createOrEditWin.setTitle($lang('admin.bp.title.editCategory'));
                        createOrEditWin.show();
                    }
                }, {
                    xtype:"button",
					text:$lang('common.delete'),
					iconCls:"delete-icon",
					pressed:true, 
                    handler:function(){
                        var selectedRecordId = treeGrid.store.getAt(rowIndex).get("id");
                        var m=Ext.MessageBox.confirm($lang('common.tips'),$lang('bp.Msg.checkDel'),function(ret){
                            if(ret=="yes"){
                                Ext.Ajax.request({
                                    url: 'admin/bpCategoryDelete.html',
                                    method: 'POST',
                                    params: {bpCategoryId:selectedRecordId},
                                    success: function(response,options){
                                        var responseStr = response.responseText;
                                        if (responseStr == "success") {
                                            store.reload();
                                        }else {
                                            Ext.Msg.alert($lang('common.failure'), $lang('admin.bp.Msg.recordNotBeUsed'));
                                        }
                                    }
                                });
                            }
                        });
                    }
                },{
                    xtype:"button",
					text:$lang('admin.bp.editTemplate'),
					iconCls:'template-icon',
					pressed:true,
					scope: this,
                    handler:function(){
                    	if(editUrl!=null && editUrl.length>10){
	                    	var selectedRecordId = treeGrid.store.getAt(rowIndex).get("id");
	                    	var p = this.ownerCt.ownerCt.ownerCt.getComponent('template_edit');
							if(p)		this.ownerCt.ownerCt.ownerCt.remove(p);
					    	var p = new BpWorkbenchPanel('template_edit',$lang('admin.bp.editTemplate'),{op:'c'});
					    	this.ownerCt.ownerCt.ownerCt.add(p).show();
					    	p.load({
								url : editUrl,
								params : {categoryId : selectedRecordId, bpId:bpId},
								scope : this,
								scripts : true
							});
	                    }else{
	                    	Ext.MessageBox.alert($lang('common.tips'),$lang('admin.bp.Msg.alertNoTpl'));
	                    }

                    }
                }]
            });
            e.preventDefault();
            rightClickMenu.showAt(e.getXY());
        });
        
    },
    
	loadBpStates:function(node){
		var bp = { 
			id : node.parentNode.id  , 
			bpId : node.parentNode.id , 
			name : node.parentNode.text 
		};
		var doUrl = node.attributes.url+'?bpId='+node.parentNode.id;
		var doRoot= node.attributes.type;
		var title = node.parentNode.text+'状态';
		
    	sm = new Ext.grid.CheckboxSelectionModel();
    	var cols = new Ext.grid.ColumnModel([
            sm
//            , {header:$lang('bp.process'), sortable:false, dataIndex:"process.name",hidden:true} 
            , {header:$lang('bp.name'), sortable:false, dataIndex:"name"}
            , {header:$lang('bp.column.code'), sortable:false, dataIndex:"code"}
            , {header:$lang('bp.description'), sortable:false, dataIndex:"description"}
        ]);
        var store = new Ext.data.Store({
             proxy:new Ext.data.HttpProxy({url:doUrl}),  
             reader:new Ext.data.JsonReader({
               root:doRoot, 
               totalProperty:'total', 
               successProperty :'success', 
               fields:["id", "name", "code","description", "process.name", "createdBy", "createdOn", "updatedBy", "updatedOn"]
        	}) 
        }); 
         
    	var grid = new Ext.grid.GridPanel({
            region: 'center',
        	loadMask: true,
        	border: false,
        	sm: sm,
        	cm: cols,
	        store: store,
	        viewConfig: {
		        forceFit: true
		    },
	        bbar : new Ext.PagingToolbar({
				store : store,
				pageSize : 20,
				displayInfo: true,
			    displayMsg: $lang('component.displayMsg'),
			    emptyMsg: $lang('common.empty')
			}),
            tbar:[
                {text:$lang('common.add'), iconCls:'create-icon', handler:function(){
                	   var createOrEditWin;
                	   if(!createOrEditWin)
                	  	   createOrEditWin= new BpStateAddOrEdit({gridStore:store,op:'create', bp : bp});
                	   createOrEditWin.setTitle($lang('admin.bp.newStateTitle'));
                       createOrEditWin.show();
                   }
                }, '-', 
                {text:$lang('common.deleteselected'), iconCls:'delete-selected-icon', handler:function(){
                   var rowselects = sm.getSelections();
                   var _bpStateIds="";
                   if(rowselects.length<=0)
                       Ext.Msg.alert($lang('common.tips'), $lang('admin.bp.Msg.warnStateDel'));
                   else
                       var m=Ext.MessageBox.confirm($lang('common.tips'),$lang('bp.Msg.checkDel'),function(ret){
                           if(ret=="yes"){
                               for(var i=0;i<rowselects.length;i++){
                                   _bpStateIds += ""+rowselects[i].get('id')+",";
                               }
                               Ext.Ajax.request({
                                   url: 'admin/bpStateDeleteAll.html',
                                   method: 'POST',
                                   params: {bpStateIds:_bpStateIds},
                                   success: function(response,options){
                                       //获取响应的json字符串      
                                       var responseStr = response.responseText;
                                       if (responseStr == "success") {
                                           store.reload();
                                       }else {
                                           Ext.Msg.alert($lang('common.failure'), $lang('common.deleteFailure'));
                                       }
                                   }
                               });
                           }
                       }); 
               }},"->",
               {text:'导入',iconCls : 'import-icon',hidden : true
               },
               {text:'导出',iconCls : 'export-icon',hidden : true
               }
            ]
            
         });
            
       //清空bpSet-center-view并加载新的Grid
        this.loadToWorkPanel(grid,'状态');
        this.items.first().setTitle(title);
         
        store.load({params : {start:0,limit:20}});     
        //grid.getSelectionModel().on('rowselect', this.showPreview, this, {buffer:250});
        
        //add dblclick event to this grid
        grid.on('rowdblclick', function(grid, rowIndex, e){
            var selectedRecordId = grid.getSelectionModel().getSelected().get("id");
            var detailViewWin;
            if(!detailViewWin)
            	detailViewWin = new BpStateView();
            detailViewWin.show();
            detailViewWin.bpStateViewForm.form.load({url:'admin/bpStateView.html?bpStateId='+selectedRecordId});
        });
        //add rightlclick event to this grid
		grid.on('rowcontextmenu',function(grid,rowIndex,e){
        	e.preventDefault();
        	var rightClickMenu = new Ext.menu.Menu([{
        			xtype:"button",
					text:$lang('common.view'),
					iconCls:"view-icon",
					pressed:true,
                    handler:function(){
                    	var detailViewWin;
			            if(!detailViewWin)
			            	detailViewWin = new BpStateView();
			            var selectedRecordId = grid.getStore().getAt(rowIndex).get("id");
			            detailViewWin.show();
			            detailViewWin.bpStateViewForm.form.load({url:'admin/bpStateView.html?bpStateId='+selectedRecordId});
                    }
        		},{
					xtype:"button",
					text:$lang('common.edit'),
					iconCls:"modify-icon",
					pressed:true,
					handler:function(){
						var createOrEditWin;
                	   	if(!createOrEditWin)
                	  	   createOrEditWin= new BpStateAddOrEdit({gridStore:store,op:'edit',index:rowIndex, bp : bp});
                	   	createOrEditWin.setTitle($lang('admin.bp.title.editState'));
						createOrEditWin.show();
					}
				},{
					xtype:"button",
					text:$lang('common.delete'),
					iconCls:"delete-icon",
					pressed:true, 
					handler:function(){
						var selectedRecordId = grid.getStore().getAt(rowIndex).get("id");
		                var m=Ext.MessageBox.confirm($lang('common.tips'),$lang('bp.Msg.checkDel'),function(ret){
		                    if(ret=="yes"){
		                        Ext.Ajax.request({
		                            url: 'admin/bpStateDelete.html',
		                            method: 'POST',
		                            params: {bpStateId:selectedRecordId},
		                            success: function(response,options){
		                                var responseStr = response.responseText;
		                                if (responseStr == "success") {
		                                	store.reload();
		                                }else {
		                                    Ext.Msg.alert($lang('common.failure'), $lang('common.deleteFailure'));
		                                }
		                            }
		                        });
		                    }
		                });
					}
				},{
	        		text:$lang('admin.bp.moveUp'),
	        		iconCls:'ff-move-up-icon',
	        		handler: function(){
	        				var selectedRecordId = grid.getStore().getAt(rowIndex).get("id");
                            Ext.Ajax.request({
                                url: 'admin/bpStateMove.html',
                                method: 'POST',
                                params: {bpStateId:selectedRecordId,command:'up'},
                                success: function(response,options){
                                    //获取响应的json字符串      
                                    var responseStr = response.responseText;
                                    if (responseStr == "success") {
                                        store.reload();
                                    }else if(responseStr=='reachTop'){
                                    	Ext.Msg.alert($lang('common.tips'), $lang('admin.bp.reachTop'));
                                    }else{
                                        Ext.Msg.alert($lang('common.failure'), $lang('admin.bp.moveUpFailure'));
                                    }
                                }
                            });
	                    }
	        	},{
	        		text:$lang('admin.bp.moveDown'),
	        		iconCls:'ff-move-down-icon',
	        		handler: function(){
	        				var selectedRecordId = grid.getStore().getAt(rowIndex).get("id");
                            Ext.Ajax.request({
                                url: 'admin/bpStateMove.html',
                                method: 'POST',
                                params: {bpStateId:selectedRecordId,command:'down'},
                                success: function(response,options){
                                    //获取响应的json字符串      
                                    var responseStr = response.responseText;
                                    if (responseStr == "success") {
                                        store.reload();
                                    }else if(responseStr=='reachBotton'){
                                    	Ext.Msg.alert($lang('common.tips'), $lang('admin.bp.reachbottom'));
                                    }else {
                                        Ext.Msg.alert($lang('common.failure'), $lang('admin.bp.moveDownFailure'));
                                    }
                                }
                            });
		                  }
	        		}
			]); 
            rightClickMenu.showAt(e.getXY());
        });
            
    },
    
	loadBpCloseCodes:function(node){
		var bp = { 
			id : node.parentNode.id  , 
			bpId : node.parentNode.id , 
			name : node.parentNode.text 
		};
		var doUrl = node.attributes.url+'?bpId='+node.parentNode.id;
		var doRoot= node.attributes.type;
		var title = node.parentNode.text+'关闭代码';
		
    	sm = new Ext.grid.CheckboxSelectionModel();
    	var cols = new Ext.grid.ColumnModel([
            sm
//            , {header:$lang('bp.process'), sortable:true, dataIndex:"process.name",hidden:true} 
            , {header:$lang('bp.name'), sortable:true, dataIndex:"name"}
            , {header:$lang('bp.column.code'), sortable:true, dataIndex:"code"}
            , {header:$lang('bp.description'), sortable:true, dataIndex:"description"}
        ]);
        var store = new Ext.data.Store({
             proxy:new Ext.data.HttpProxy({url:doUrl}),  
             reader:new Ext.data.JsonReader({
               root:doRoot, 
               totalProperty:'total', 
               successProperty :'success', 
               fields:["id", "name", "code","description", "process.name", "createdBy", "createdOn", "updatedBy", "updatedOn"]
        	})
        }); 
         
    	var grid = new Ext.grid.GridPanel({
            region: 'center',
        	loadMask: true,
        	sm: sm,
        	cm: cols,
	        store: store,
	        viewConfig: {forceFit : true},
	        border : false,
	        bbar : new Ext.PagingToolbar({
				store : store,
				pageSize : 20,
				displayInfo: true,
			    displayMsg: $lang('component.displayMsg'),
			    emptyMsg: $lang('common.empty')
			}),
            tbar:[
                {text:$lang('common.add'), iconCls:'create-icon', handler:function(){
                	   var createOrEditWin;
                	   if(!createOrEditWin)
                	  	   createOrEditWin= new BpCloseCodeAddOrEdit({gridStore:store,op:'create',bp : bp});
                	   createOrEditWin.setTitle($lang('admin.bp.newCloseCodeTitle'));
                       createOrEditWin.show();
                   }
                }, '-', 
                {text:$lang('common.deleteselected'), iconCls:'delete-selected-icon', handler:function(){
                   var rowselects = sm.getSelections();
                   var _bpCloseCodeIds="";
                   if(rowselects.length<=0)
                       Ext.Msg.alert($lang('common.tips'), $lang('admin.bp.Msg.warmCloseCodeDel'));
                   else
                       var m=Ext.MessageBox.confirm($lang('common.tips'),$lang('bp.Msg.checkDel'),function(ret){
                           if(ret=="yes"){
                               for(var i=0;i<rowselects.length;i++){
                                   _bpCloseCodeIds += ""+rowselects[i].get('id')+",";
                               }
                               Ext.Ajax.request({
                                   url: 'admin/bpCloseCodeDeleteAll.html',
                                   method: 'POST',
                                   params: {bpCloseCodeIds:_bpCloseCodeIds},
                                   success: function(response,options){
                                       //获取响应的json字符串      
                                       var responseStr = response.responseText;
                                       if (responseStr == "success") {
                                           store.reload();
                                       }else {
                                           Ext.Msg.alert($lang('common.failure'), $lang('common.deleteFailure'));
                                       }
                                   }
                               });
                           }
                       }); 
               }},'->',
               {text:'导入',iconCls : 'import-icon',hidden : true
               },
               {text:'导出',iconCls : 'export-icon',hidden : true
               }
            ]
            
         });
            
       //清空bpSet-center-view并加载新的Grid
        this.loadToWorkPanel(grid,'关闭代码');
        this.items.first().setTitle(title);
         
        store.load({params : {start:0,limit:20}});    
        //grid.getSelectionModel().on('rowselect', this.showPreview, this, {buffer:250});
        
        //add dblclick event to this grid
        grid.on('rowdblclick', function(grid, rowIndex, e){
            var selectedRecordId = grid.getSelectionModel().getSelected().get("id");
            var detailViewWin;
            if(!detailViewWin)
            	detailViewWin = new BpCloseCodeView();
            detailViewWin.show();
            detailViewWin.bpCloseCodeViewForm.form.load({url:'admin/bpCloseCodeView.html?bpCloseCodeId='+selectedRecordId});
        });
        //add rightlclick event to this grid
		grid.on('rowcontextmenu',function(grid,rowIndex,e){
        	e.preventDefault();
        	var rightClickMenu = new Ext.menu.Menu([{
        			xtype:"button",
					text:$lang('common.view'),
					iconCls:"view-icon",
					pressed:true,
                    handler:function(){
                    	var detailViewWin;
			            if(!detailViewWin)
			            	detailViewWin = new BpCloseCodeView();
			            var selectedRecordId = grid.getStore().getAt(rowIndex).get("id");
			            detailViewWin.show();
			            detailViewWin.bpCloseCodeViewForm.form.load({url:'admin/bpCloseCodeView.html?bpCloseCodeId='+selectedRecordId});
                    }
        		},{
					xtype:"button",
					text:$lang('common.edit'),
					iconCls:"modify-icon",
					pressed:true,
					handler:function(){
						var createOrEditWin;
                	   	if(!createOrEditWin)
                	  	   createOrEditWin= new BpCloseCodeAddOrEdit({gridStore:store,op:'edit',index:rowIndex, bp : bp});
                	   	createOrEditWin.setTitle($lang('admin.bp.title.editCloseCode'));
						createOrEditWin.show();
					}
				},{
					xtype:"button",
					text:$lang('common.delete'),
					iconCls:"delete-icon",
					pressed:true, 
					handler:function(){
						var selectedRecordId = grid.getStore().getAt(rowIndex).get("id");
		                var m=Ext.MessageBox.confirm($lang('common.tips'),$lang('bp.Msg.checkDel'),function(ret){
		                    if(ret=="yes"){
		                        Ext.Ajax.request({
		                            url: 'admin/bpCloseCodeDelete.html',
		                            method: 'POST',
		                            params: {bpCloseCodeId:selectedRecordId},
		                            success: function(response,options){
		                                var responseStr = response.responseText;
		                                if (responseStr == "success") {
		                                	store.reload();
		                                }else {
		                                    Ext.Msg.alert($lang('common.failure'), $lang('common.deleteFailure'));
		                                }
		                            }
		                        });
		                    }
		                });
					}
				} 
			]); 
            rightClickMenu.showAt(e.getXY());
        });
    }
});