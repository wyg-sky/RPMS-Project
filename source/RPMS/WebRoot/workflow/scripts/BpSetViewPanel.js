BpSetViewPanel = function(){
	this.mainTabPanel = new Ext.Panel({
		layout : 'border',
		title : $lang('common.loading'),
		hideMode : 'offsets'
	});
	this.mainTabCenterPanel = new Ext.Panel({
		id: '_mainTabCenterPanel',
		layout : 'fit',
		tabTip : 'none',
		split : true,
		animCollapse : false,
		border : false,
		region : 'center',
		autoScroll : true,
		hidden : false
	});
    BpSetViewPanel.superclass.constructor.call(this, {
        id : 'bpSet-tabs',
        activeTab:0, 
        region:'center', 
        margins:'0 0 0 0', 
        resizeTabs:true, 
        border:true, 
        tabWidth:100, 
        minTabWidth:100, 
        enableTabScroll:true, 
        plugins:new Ext.ux.TabCloseMenu()
    });
	this.add(this.mainTabPanel);
    this.mainTabPanel.add(this.mainTabCenterPanel);
};

Ext.extend(BpSetViewPanel, Ext.TabPanel, {
	
	loadToWorkPanel: function(workPanel) {
		var cv = this.mainTabCenterPanel;
		if (cv.compId) {
			cv.remove(cv.compId);
		}
		cv.compId = workPanel.getId();
		cv.add(workPanel);
		cv.ownerCt.doLayout();
	},
	
	loadUrl:function(node){
		if(Ext.getCmp("bpSet-main-grid").loadUrl){
       		Ext.getCmp("bpSet-main-grid").loadUrl(node.attributes.url);
        }else{
        	Ext.getCmp("bpSet-main-grid").store.baseParams = {
	            feed:node.attributes.url
	        };
	        Ext.getCmp("bpSet-main-grid").store.reload();
        }
        this.mainTabPanel.setTitle(node.attributes.text);
        this.mainTabCenterPanel.tabTip = node.attributes.type;
    }, 
    
	loadData:function(node){		
		var curType = this.mainTabCenterPanel.tabTip;
		var newType = node.attributes.type;
		//如果加载的对象相同，则重新加载，否则重新构建Grid并加载
		if(newType == curType){
			this.loadUrl(node);
		}else{
			switch(newType){
				case 'bpType':
					this.loadBpTypes(node.attributes.url, node.attributes.type);					
    				break;
                case 'bpCategory':
                    this.loadBpCategorys(node.attributes.url, node.attributes.type);
                    break;
    			case 'bpState':
    				this.loadBpStates(node.attributes.url, node.attributes.type);
    				break;
                case 'bpCloseCode':
                    this.loadBpCloseCodes(node.attributes.url, node.attributes.type);
                    break;
                case 'bpTemplate':
                    this.loadBpTemplate(node.attributes.url, node.attributes.type);
                    break;
			}
			this.mainTabPanel.setTitle(node.attributes.text);
        	this.mainTabCenterPanel.tabTip = node.attributes.type;
		}		
	}, 
    
    loadBpTypes:function(doUrl, doRoot){ 
    	var grid = new GridPanel(this, {
    		id: 'bpSet-main-grid',
	        tbar:[
	        	{
	        		text:$lang('common.add'),
	        		iconCls:'create-icon',
	        		handler: function(){
	        					var createWin; 
			                    if(!createWin)
			                    	createWin = new BpTypeAddOrEdit(store);
			                    createWin.setTitle($lang('bp.newTypeTitle'));
			                    createWin.show();
	        				}
	        	}, '-',{
	        		text:$lang('common.deleteselected'),
	        		iconCls:'delete-selected-icon',
	        		handler: function(){
	        					var rowselects = sm.getSelections();
			                    var _bpTypeIds="";
			                    if(rowselects.length<=0)
			                        Ext.Msg.alert($lang('common.tips'), $lang('bp.Msg.warnSelectCatetory'));
			                    else
			                        var m=Ext.MessageBox.confirm($lang('common.tips'),$lang('bp.Msg.checkDel'),function(ret){
			                            if(ret=="yes"){
			                                for(var i=0;i<rowselects.length;i++){
			                                    _bpTypeIds += ""+rowselects[i].get('id')+",";
			                                }
			                                Ext.Ajax.request({
			                                    url: 'admin/bpTypeDeleteAll.html',
			                                    method: 'POST',
			                                    params: {bpTypeIds:_bpTypeIds},
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
	        				}
	        	},'-',{
	        		text:$lang('admin.bp.moveUp'),
	        		iconCls:'ff-move-up-icon',
	        		handler: function(){
	        				var rowselects = sm.getSelections();
		                    var bpTypeIds="";
		                    if(rowselects.length<=0)
		                        Ext.Msg.alert($lang('common.tips'), $lang('admin.bp.Msg.warnCategoryUp'));
		                    else{
                                for(var i=0;i<rowselects.length;i++){
                                    bpTypeIds += ""+rowselects[i].get('id')+",";
                                }
                                Ext.Ajax.request({
                                    url: 'admin/bpTypeMove.html',
                                    method: 'POST',
                                    params: {bpTypeIds:bpTypeIds,param:'up'},
                                    success: function(response,options){
                                        //获取响应的json字符串      
                                        var responseStr = response.responseText;
                                        if (responseStr == "success") {
                                        	store.reload();
                                        }else {
                                            Ext.Msg.alert($lang('common.failure'), $lang('admin.bp.moveUpFailure') );
                                        }
                                    }
                                });
		                    }
	        		}
	        	},'-',{
	        		text:$lang('admin.bp.moveDown'),
	        		iconCls:'ff-move-down-icon',
	        		handler: function(){
	        				var rowselects = sm.getSelections();
		                    var bpTypeIds="";
		                    if(rowselects.length<=0)
		                        Ext.Msg.alert($lang('common.tips'), $lang('admin.bp.Msg.warnCategoryDown'));
		                    else{
                                for(var i=0;i<rowselects.length;i++){
                                    bpTypeIds += ""+rowselects[i].get('id')+",";
                                }
                                Ext.Ajax.request({
                                    url: 'admin/bpTypeMove.html',
                                    method: 'POST',
                                    params: {bpTypeIds:bpTypeIds,param:'down'},
                                    success: function(response,options){
                                        //获取响应的json字符串      
                                        var responseStr = response.responseText;
                                        if (responseStr == "success") {
                                            store.reload();
                                        }else {
                                            Ext.Msg.alert($lang('common.failure'), $lang('admin.bp.moveDownFailure'));
                                        }
                                    }
                                });
		                    }
	        		}
	        	}
	        ]
	    });
	    this.loadToWorkPanel(grid);
    	
	    var sm = grid.getSelectionModel();	
    	var cols = new Ext.grid.ColumnModel([
            sm
            , {header:$lang('bp.name'), sortable:false, dataIndex:"name"}
            , {header:$lang('bp.column.code'), sortable:false, dataIndex:"code"}
            , {header:$lang('bp.description'), sortable:false, dataIndex:"description"}
        ]);
        var store = new Ext.data.Store({
		    proxy: new Ext.data.HttpProxy({url: doUrl}),	
			reader: new Ext.data.JsonReader({
			    root:doRoot, 
                totalProperty:'total', 
                successProperty :'success', 
				fields: ["id","name","code","description"]
			})
			
		});
		grid.loadData(store,cols);    
		
		grid.on('rowdblclick', function(grid, rowIndex, e){
            var selectedRow = grid.getSelectionModel().getSelected();
            var selectedStatusId = selectedRow.get("id");
            var detailViewWin;
            if(!detailViewWin)
            	detailViewWin = new BpTypeView();
            Ext.getCmp('bpTypeViewForm').form.load({url:'admin/bpTypeView.html?bpTypeId='+selectedStatusId});
            detailViewWin.show();
        });
        
        grid.on('rowcontextmenu', function(grid, rowIndex, e){
            var rightClickMenu = new Ext.menu.Menu( {
                items : [{
                	xtype:"button",
					text:$lang('common.view'),
					iconCls:"view-icon",
					pressed:true,
                    handler:function(){
                    	var detailViewWin;
			            if(!detailViewWin)
			            	detailViewWin = new BpTypeView();
			            var selectedRecordId = grid.store.getAt(rowIndex).get("id");
			            Ext.getCmp('bpTypeViewForm').form.load({url:'admin/bpTypeView.html?bpTypeId='+selectedRecordId});
			            detailViewWin.show();
                    }
                },{
                	xtype:"button",
					text:$lang('common.edit'),
					iconCls:"modify-icon",
					pressed:true,
                    handler:function(){
                        var createWin; 
	                    if(!createWin)
	                    	createWin = new BpTypeAddOrEdit(store);
                        createWin.setTitle($lang('admin.bp.title.editType'));
                        var selectedRecordId = grid.store.getAt(rowIndex).get("id");
                        Ext.getCmp('bpTypeAOEForm').form.load({url:'admin/bpTypeForEdit.html?bpTypeId='+selectedRecordId});
                        createWin.show();
                    }
                }, {
                    xtype:"button",
					text:$lang('common.delete'),
					iconCls:"delete-icon",
					pressed:true, 
                    handler:function(){
                        var selectedRecordId = grid.store.getAt(rowIndex).get("id");
                        var m=Ext.MessageBox.confirm($lang('common.tips'),$lang('bp.Msg.checkDel'),function(ret){
                            if(ret=="yes"){
                                Ext.Ajax.request({
                                    url: 'admin/bpTypeDelete.html',
                                    method: 'POST',
                                    params: {bpTypeId:selectedRecordId},
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
                }]
            });
            e.preventDefault();
            rightClickMenu.showAt(e.getXY());
        });
    },

    loadBpCategorys:function(doUrl, doRoot){
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
            id: 'bpSet-main-grid',
            store: store,
            master_column_id : 'name',
            columns: [
	            	{id:'name',width: 150,header:$lang('bp.name'),sortable: true,dataIndex: "name"},
	            	{header:$lang('bp.process'),sortable: true,dataIndex: "process", renderer : function(r){if(r && r.name) return r.name;else return '';}},	
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
            viewConfig : {enableRowBody : true,autoFill: true},
            tbar:[
              	{text:$lang('common.add'),iconCls:'create-icon', handler:function(){
                    var createOrEditWin; 
                    if(!createOrEditWin)
                    	createOrEditWin = new BpCategoryAddOrEdit({gridStore : store, op : 'create'});
                    createOrEditWin.setTitle($lang('admin.bp.newCategoryTitle'));
                    createOrEditWin.show();
                }}]
	    });
        this.loadToWorkPanel(treeGrid);
     
	    store.reload();
     
        //add dblclick event to this treeGrid
        treeGrid.on('rowdblclick', function(treeGrid, rowIndex, e){
            var selectedRecordId = treeGrid.getSelectionModel().getSelected().get("id");
            var detailViewWin;
            if(!detailViewWin)
            	detailViewWin = new BpCategoryView();
            detailViewWin.show();
            Ext.getCmp('bpCategoryViewForm').form.load({url:'admin/bpCategoryView.html?bpCategoryId='+selectedRecordId});
        });
        
        treeGrid.on('cellclick', function(grid, rowIndex, columnIndex, e){
        	var selectedRecordId = grid.getSelectionModel().getSelected().get("id");
        	var createUrl=grid.getStore().getAt(rowIndex).get('process').createUrl;
        	var bpId=grid.getStore().getAt(rowIndex).get('process').id;
        	var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
        	if(fieldName=='id' && createUrl!=null && createUrl.length>10){
        		var tabPanel=Ext.getCmp('bpSet-tabs');
        		var p = this.ownerCt.ownerCt.ownerCt.getComponent('template_edit');
				if(p)		this.ownerCt.ownerCt.ownerCt.remove(p);
		    	var p = new Ext.Panel({
					id : 'template_edit',
					title : $lang('admin.bp.editTemplate'),
					layout: 'fit',
					closable : true,
					autoScroll : true,
					autoLoad : {
						url : createUrl,
						params : {tabpId: 'bpSet-tabs', categoryId : selectedRecordId, bpId:bpId},
						scope : this,
						scripts : true
					}
				});
				
		    	this.ownerCt.ownerCt.ownerCt.add(p).show();
		    	p.doLayout();
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
			            Ext.getCmp('bpCategoryViewForm').form.load({url:'admin/bpCategoryView.html?bpCategoryId='+selectedRecordId});
                    }
                },{
                    xtype:"button",
					text:$lang('common.edit'),
					iconCls:"modify-icon",
					pressed:true,
                    handler:function(){
                        var createOrEditWin; 
	                    if(!createOrEditWin)
	                    	createOrEditWin = new BpCategoryAddOrEdit({gridStore : store, op : 'edit', index: rowIndex});
                        createOrEditWin.setTitle($lang('admin.bp.title.editCategory'));
//                        var selectedRecordId = treeGrid.store.getAt(rowIndex).get("id");
                        createOrEditWin.show();
//                        Ext.getCmp('bpCategoryAOEForm').form.load({url:'admin/bpCategoryForEdit.html?bpCategoryId='+selectedRecordId});
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
					    	var p = new Ext.Panel({
								id : 'template_edit',
								title : $lang('admin.bp.editTemplate'),
								layout: 'fit',
								closable : true,
								autoScroll : true,
								autoLoad : {
									url : editUrl,
									params : {tabpId: 'bpSet-tabs',categoryId : selectedRecordId, bpId:bpId},
									scope : this,
									scripts : true
								}
							});
							
					    	this.ownerCt.ownerCt.ownerCt.add(p).show();
					    	p.doLayout();
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
    
    loadBpStates:function(doUrl, doRoot){
    	sm = new Ext.grid.CheckboxSelectionModel();
    	var cols = new Ext.grid.ColumnModel([
            sm
            , {header:$lang('bp.process'), sortable:false, dataIndex:"process.name",hidden:true} 
            , {header:$lang('bp.name'), sortable:false, dataIndex:"name"}
            , {header:$lang('bp.column.code'), sortable:false, dataIndex:"code"}
            , {header:$lang('bp.description'), sortable:false, dataIndex:"description"}
        ]);
        var store = new Ext.data.GroupingStore({
             proxy:new Ext.data.HttpProxy({url:doUrl}),  
             reader:new Ext.data.JsonReader({
               root:doRoot, 
               totalProperty:'total', 
               successProperty :'success', 
               fields:["id", "name", "code","description", "process.name", "createdBy", "createdOn", "updatedBy", "updatedOn"]
        	}), 
        	sortInfo:{field:'process.name', direction:"ASC"},
        	groupField:'process.name'
        }); 
         
    	var grid = new Ext.grid.GridPanel({
            id: 'bpSet-main-grid',
            region: 'center',
        	loadMask: true,
        	sm: sm,
        	cm: cols,
	        store: store,
	        view: new Ext.grid.GroupingView({
	            forceFit:true,
	            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? $lang("admin.bp.grid.records") : $lang("admin.bp.grid.records")]})'
	        }),
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
                	  	   createOrEditWin= new BpStateAddOrEdit({gridStore:store,op:'create'});
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
                   }}
            ]
            
         });
            
       //清空bpSet-center-view并加载新的Grid
        this.loadToWorkPanel(grid);
         
        store.load({params : {start:0,limit:20}});     
        //grid.getSelectionModel().on('rowselect', this.showPreview, this, {buffer:250});
        
        //add dblclick event to this grid
        grid.on('rowdblclick', function(grid, rowIndex, e){
            var selectedRecordId = grid.getSelectionModel().getSelected().get("id");
            var detailViewWin;
            if(!detailViewWin)
            	detailViewWin = new BpStateView();
            detailViewWin.show();
            Ext.getCmp('bpStateViewForm').form.load({url:'admin/bpStateView.html?bpStateId='+selectedRecordId});
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
			            Ext.getCmp('bpStateViewForm').form.load({url:'admin/bpStateView.html?bpStateId='+selectedRecordId});
                    }
        		},{
					xtype:"button",
					text:$lang('common.edit'),
					iconCls:"modify-icon",
					pressed:true,
					handler:function(){
						var createOrEditWin;
                	   	if(!createOrEditWin)
                	  	   createOrEditWin= new BpStateAddOrEdit({gridStore:store,op:'edit',index:rowIndex});
                	   	createOrEditWin.setTitle($lang('admin.bp.title.editState'));
//						var selectedRecordId = grid.getStore().getAt(rowIndex).get("id");
						createOrEditWin.show();
//		                Ext.getCmp('bpStateAOEForm').form.load({url:'admin/bpStateForEdit.html?bpStateId='+selectedRecordId});
					}
				},{
					xtype:"button",
//					text:"另存为",
//					iconCls:"save-as-icon",
//					pressed:true,
//					handler:function(){
//						var createOrEditWin;
//                	   	if(!createOrEditWin)
//                	  	   createOrEditWin= new BpStateAddOrEdit({gridStore:store,op:'edit'});
//                	   	createOrEditWin.setTitle('另存为状态信息 ');
//						var selectedRecordId = grid.getStore().getAt(rowIndex).get("id");
//						createOrEditWin.show();
//		                Ext.getCmp('bpStateAOEForm').form.load({url:'admin/bpStateForEdit.html?bpStateId='+selectedRecordId});
//		                Ext.getCmp('bpStateAOEForm').primaryFS.id.value = null;
//					}
//				},{
//					xtype:"button",
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
		                                    //store.remove(Ext.getCmp('bpSet-tabs').gridCtxRecord);
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
    
    loadBpCloseCodes:function(doUrl, doRoot){
    	sm = new Ext.grid.CheckboxSelectionModel();
    	var cols = new Ext.grid.ColumnModel([
            sm
            , {header:$lang('bp.process'), sortable:true, dataIndex:"process.name",hidden:true} 
            , {header:$lang('bp.name'), sortable:true, dataIndex:"name"}
            , {header:$lang('bp.column.code'), sortable:true, dataIndex:"code"}
            , {header:$lang('bp.description'), sortable:true, dataIndex:"description"}
        ]);
        var store = new Ext.data.GroupingStore({
             proxy:new Ext.data.HttpProxy({url:doUrl}),  
             reader:new Ext.data.JsonReader({
               root:doRoot, 
               totalProperty:'total', 
               successProperty :'success', 
               fields:["id", "name", "code","description", "process.name", "createdBy", "createdOn", "updatedBy", "updatedOn"]
        	}), 
        	sortInfo:{field:'process.name', direction:"DESC"},
        	groupField:'process.name'
        }); 
         
    	var grid = new Ext.grid.GridPanel({
            id: 'bpSet-main-grid',
            region: 'center',
        	loadMask: true,
        	sm: sm,
        	cm: cols,
	        store: store,
	        view: new Ext.grid.GroupingView({
	            forceFit:true,
	            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? $lang("admin.bp.grid.records") : $lang("admin.bp.grid.records")]})'
	        }),
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
                	  	   createOrEditWin= new BpCloseCodeAddOrEdit({gridStore:store,op:'create'});
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
                   }}
            ]
            
         });
            
       //清空bpSet-center-view并加载新的Grid
        this.loadToWorkPanel(grid);
         
        store.load({params : {start:0,limit:20}});    
        //grid.getSelectionModel().on('rowselect', this.showPreview, this, {buffer:250});
        
        //add dblclick event to this grid
        grid.on('rowdblclick', function(grid, rowIndex, e){
            var selectedRecordId = grid.getSelectionModel().getSelected().get("id");
            var detailViewWin;
            if(!detailViewWin)
            	detailViewWin = new BpCloseCodeView();
            detailViewWin.show();
            Ext.getCmp('bpCloseCodeViewForm').form.load({url:'admin/bpCloseCodeView.html?bpCloseCodeId='+selectedRecordId});
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
			            Ext.getCmp('bpCloseCodeViewForm').form.load({url:'admin/bpCloseCodeView.html?bpCloseCodeId='+selectedRecordId});
                    }
        		},{
					xtype:"button",
					text:$lang('common.edit'),
					iconCls:"modify-icon",
					pressed:true,
					handler:function(){
						var createOrEditWin;
                	   	if(!createOrEditWin)
                	  	   createOrEditWin= new BpCloseCodeAddOrEdit({gridStore:store,op:'edit',index:rowIndex});
                	   	createOrEditWin.setTitle($lang('admin.bp.title.editCloseCode'));
//						var selectedRecordId = grid.getStore().getAt(rowIndex).get("id");
						createOrEditWin.show();
//		                Ext.getCmp('bpCloseCodeAOEForm').form.load({url:'admin/bpCloseCodeForEdit.html?bpCloseCodeId='+selectedRecordId});
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
		                                    //store.remove(Ext.getCmp('bpSet-tabs').gridCtxRecord);
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
    },
    
    loadBpTemplate: function(doUrl, doRoot){
    	sm = new Ext.grid.CheckboxSelectionModel();
    	var cols = new Ext.grid.ColumnModel([
            sm
            , {header:$lang('bp.category'), sortable:true, dataIndex:"category.name"}
            , {header:"类别编码", sortable:true, dataIndex:"category.code"}
            , {header:"摘要", sortable:true, dataIndex:"summary"}
            , {header:$lang('bp.description'), sortable:true, dataIndex:"description"}
        ]);
        var store = new Ext.data.Store({
             proxy:new Ext.data.HttpProxy({url:doUrl}),  
             reader:new Ext.data.JsonReader({
               root:'root', 
               totalProperty:'total', 
               successProperty :'success', 
               fields:["id" , "summary","description", "category.name","category.code", "createdBy", "createdOn", "updatedBy", "updatedOn"]
        	})
        }); 
        
        var grid = new Ext.grid.GridPanel({
            id: 'bpSet-main-grid',
            region: 'center',
        	loadMask: true,
        	sm: sm,
        	cm: cols,
	        store: store,
	        viewConfig: {
	            forceFit:true,
	            enableRowBody:true,
	            showPreview:true
	        },
	        bbar : new Ext.PagingToolbar({
				store : store,
				pageSize : 20,
				displayInfo: true,
			    displayMsg: $lang('component.displayMsg'),
			    emptyMsg: $lang('common.empty')
			}),
            tbar:[
                {text:$lang('common.add'), iconCls:'create-icon', scope: this, handler:function(){
//                		var p = this.getComponent('create');
//						if(p)		this.remove(p);
				    	p = new Ext.Panel({
//							id : 'create',
							title : $lang('common.add'),
							layout: 'fit',
							closable : true,
							autoScroll : true,
							items: [new BpTemplateAddOrEdit({gridStore:store,op:'create'})]
						});
						
				    	this.add(p).show();
				    	p.doLayout();
                   }
                }, '-', 
                {text:$lang('common.deleteselected'), iconCls:'delete-selected-icon', handler:function(){
                       var rowselects = sm.getSelections();
                       var _bpTemplateIds="";
                       if(rowselects.length<=0)
                           Ext.Msg.alert($lang('common.tips'), $lang('admin.bp.Msg.warmCloseCodeDel'));
                       else
                           var m=Ext.MessageBox.confirm($lang('common.tips'),$lang('bp.Msg.checkDel'),function(ret){
                               if(ret=="yes"){
                                   for(var i=0;i<rowselects.length;i++){
                                       _bpTemplateIds += ""+rowselects[i].get('id')+",";
                                   }
                                   Ext.Ajax.request({
                                       url: 'bp/removeBpTpl.html',
                                       method: 'POST',
                                       params: {bpTemplateIds:_bpTemplateIds},
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
                   }}
            ]
            
         });
         //清空bpSet-center-view并加载新的Grid
        this.loadToWorkPanel(grid);
         
        store.load({params : {start:0,limit:20}}); 
         
        //add dblclick event to this grid
        grid.on('rowdblclick', function(grid, rowIndex, e){
        	var selectedRecordId = grid.getSelectionModel().getSelected().get("id");
//			var p = this.ownerCt.ownerCt.ownerCt.getComponent('create');
//			if(p)		this.ownerCt.ownerCt.ownerCt.remove(p);
	    	p = new Ext.Panel({
//				id : 'create',
				title : $lang('common.view'),
				layout: 'fit',
				closable : true,
				autoScroll : true,
				items: [new BpTemplateView({gridStore:store})]
			});
			Ext.getCmp('bpTemplateViewForm').form.load({
				url:'bp/loadBpTpl.html?bpTemplateId='+selectedRecordId,
				success: function(form , action){
					//Ext.getCmp('categoryTree').fireEvent('select');
					Ext.getCmp('_categoryId').fireEvent('change');
				}
			});
	    	this.ownerCt.ownerCt.ownerCt.add(p).show();
	    	p.doLayout();
        });
        //add rightlclick event to this grid
		grid.on('rowcontextmenu',function(grid,rowIndex,e){
        	e.preventDefault();
        	var rightClickMenu = new Ext.menu.Menu([{
        			xtype:"button",
					text:$lang('common.view'),
					iconCls:"view-icon",
					pressed:true,
					scope : this.ownerCt.ownerCt.ownerCt,
                    handler:function(){
                    	var selectedRecordId = grid.getStore().getAt(rowIndex).get("id");
//						var p = this.getComponent('create');
//						if(p)		this.remove(p);
				    	p = new Ext.Panel({
//							id : 'create',
							title : $lang('common.view'),
							layout: 'fit',
							closable : true,
							autoScroll : true,
							items: [new BpTemplateView({gridStore:store})]
						});
						Ext.getCmp('bpTemplateViewForm').form.load({
							url:'bp/loadBpTpl.html?bpTemplateId='+selectedRecordId,
							success: function(form , action){
								Ext.getCmp('_categoryId').fireEvent('change');
							}
						});
				    	this.add(p).show();
				    	p.doLayout();
                    }
        		},{
					xtype:"button",
					text:$lang('common.edit'),
					iconCls:"modify-icon",
					pressed:true,
					scope : this.ownerCt.ownerCt.ownerCt,
					handler:function(){
						var selectedRecordId = grid.getStore().getAt(rowIndex).get("id");
						
//						var p = this.getComponent('create');
//						if(p)		this.remove(p);
				    	p = new Ext.Panel({
//							id : 'create',
							title : $lang('common.edit'),
							layout: 'fit',
							closable : true,
							autoScroll : true,
							items: [new BpTemplateAddOrEdit({gridStore:store})]
						});
						Ext.getCmp('bpTemplateAOEForm').form.load({
							url:'bp/loadBpTpl.html?bpTemplateId='+selectedRecordId,
							success: function(form , action){
								Ext.getCmp('categoryTree').fireEvent('select');
							}
						});
				    	this.add(p).show();
				    	p.doLayout();
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
		                            url: 'bp/removeBpTpl.html',
		                            method: 'POST',
		                            params: {bpTemplateIds:selectedRecordId},
		                            success: function(response,options){
		                                var responseStr = response.responseText;
		                                if (responseStr == "success") {
		                                    //store.remove(Ext.getCmp('bpSet-tabs').gridCtxRecord);
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