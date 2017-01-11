Ext.namespace('Ext.ux.AssignmentGrid');


/**
 * 流程人员分派高级组件
 * @param {} config
 */

Ext.ux.AssignmentGrid = function(config){
	
	this.disableOrg = false;
	this.disableDep = false;
	this.disableJob = false;
	this.disableGroup = false;
	this.disableRole = false;
	this.disableUser = false;
	this.userDataUrl = null;		//'admin/users!listForWin.html';
	this.hiddenName = "actors";
	
	Ext.apply(this,config);
	
	Ext.ux.AssignmentGrid.superclass.constructor.call(this,config);
	
	this.on('rowcontextmenu', this.rowcontextmenu );
}

Ext.extend(Ext.ux.AssignmentGrid, Ext.grid.GridPanel, {
	viewConfig: {forceFit:true},
	autoHeight: true,
	autoExpandColumn: 'type',
	store : new Ext.data.SimpleStore({
    	data: [],
    	autoLoad: true,
        fields: ['id','name','type']
    }),
    sm : new Ext.grid.CheckboxSelectionModel(),
    columns : [
    	new Ext.grid.CheckboxSelectionModel(),
        { header: '委派对象',dataIndex: 'name'},
        { header: '类别',sortable: true,dataIndex: 'type',renderer: function(v){
     		var typeStr = '';
        	switch (v) {
		      case 'id': 			typeStr = '人员'; 	break;
		      case 'department': 	typeStr = '部门'; 	break;
		      case 'organization': 	typeStr = '单位'; 	break;
			  case 'jobTitle': 		typeStr = '职位'; 	break;
		      case 'group': 		typeStr = '群组'; 	break;
		      case 'role': 			typeStr = '角色'; 	break;
		    }
		    return typeStr;
        }}
    ],
	
	initComponent : function(){
		var scope = this;
		this.store.removeAll();
		this.tbar = [
	    	 {text: '单位',hidden : scope.disableOrg , iconCls : 'org-icon', handler: function(){scope.addAssignmenZDTree(scope,{_type: 'organization',_title: '添加委派单位',_url: './admin/organizationTree.html'})}}
	    	,{text: '部门',hidden : scope.disableDep , iconCls : 'department-icon', handler: function(){scope.addAssignmenZDTree(scope,{_type: 'department',_title: '添加委派部门',_url: './admin/departmentTree.html'})}}
	    	,{text: '职位',hidden : scope.disableJob , iconCls : 'job-title-icon', handler: function(){scope.addAssignmenZDTree(scope,{_type: 'jobTitle',_title: '添加委派职位',_url: './admin/jobTitleTree.html'})}}
	    	
	    	,{text: '群组',hidden : scope.disableGroup , iconCls : 'group-icon', handler: function(){scope.addAssignmenZDPanel(scope,{_type: 'group',_title: '添加委派群组',_url: './admin/groupForComboWin.html'})}}
	    	,{text: '角色',hidden : scope.disableRole , iconCls : 'role-icon', handler: function(){scope.addAssignmenZDPanel(scope,{_type: 'role',_title: '添加委派角色',_url: './admin/roleForComboWin.html'})}}
	    	,{text: '人员',hidden : scope.disableUser , iconCls : 'all-user-icon', handler: function(){var condition = scope.getValue(); 	var userForGridWin = new Ext.ux.UserForGridWin(condition,scope,this.userDataUrl);	userForGridWin.show();} }
	    	
	    	,'->'
	    	,{text: $lang('common.delete')/*'删除'*/, iconCls : 'delete-icon', scope : scope, handler: scope.deleteChecked }
	    ];
		Ext.ux.AssignmentGrid.superclass.initComponent.call(this);
	},
	
	rowcontextmenu : function(grid,rowIndex,e){//变量grid的右键
		var scop = this;
   		var item = new Ext.menu.Item({text: $lang('common.delete')/*'删除'*/,iconCls:'delete-icon',handler: function(button,e){
            	var record = scop.getStore().getAt(rowIndex);
            	scop.getStore().remove(record);
            	scop.setValue(scop.getValue());
            }});
        /*if(operType=='view'){
			item.disable(); 
		}*/
   		var rightClick = new Ext.menu.Menu( {
            items : [item]
        });
        e.preventDefault();
    	rightClick.showAt(e.getXY());
   	},
   	
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
		            text: $lang('common.search')/*'查询'*/,
		            iconCls: 'search-icon',
		            handler : function(){
		            	var searchValue = Ext.getCmp("assSearchText").getValue();
						_treePanel.getLoader().baseParams = {searchValue : searchValue};
						_treePanel.getLoader().load(_treePanel.root);
		            }
		        },
				{
		            text: $lang('workflow.flowMonitor.tbar.showAll')/*'显示全部'*/,
		            handler: function(){
		            	_treePanel.getLoader().baseParams = {outCon : null};
						_treePanel.getLoader().load(_treePanel.root);
		            	//_treePanel.root.reload();
		            }
		        }
	        ]
	    });
	    addAssWin.add(_treePanel);
	    addAssWin.addButton({text: $lang('component.OK')/*'确定'*/},function(){
	    	var checkeds = _treePanel.getChecked();
	    	if(checkeds==null){
	    		Ext.Msg.alert($lang('component.tips')/*'提示'*/,$lang('workflow.flowMonitor.Msg.noCheckedData')/*'没有选中数据！'*/);
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
	    		parentGrid.store.insert(0, new Ext.data.Record({id : checkedObj.id ,name : checkedObj.text, type : assTreeConf._type}));
	    	}
	    	parentGrid.setValue(parentGrid.getValue() );
	    	addAssWin.close();
	    });
	    addAssWin.addButton({text: $lang('component.close')/*'关闭'*/},function(){addAssWin.close();});
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
	    var nameDes = (assGridConf._type == 'id')?$lang('component.xingMing')/*'姓名'*/:$lang('component.name')/*'名称'*/;
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
	       			{id:'code', header: $lang('component.numCode')/*'编号'*/,hidden: false,sortable: true, dataIndex: 'code'},
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
		            text: $lang('common.search')/*'查询'*/,
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
		            text: $lang('workflow.flowMonitor.tbar.showAll')/*'显示全部'*/,
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
				    displayMsg: $lang('component.displayMsg'),//"显示第 {0} 条到 {1} 条记录，一共 {2} 条",
				    emptyMsg: $lang('component.emptyMsg')//"没有记录"
				})
	    });
	    addAssWin.add(_gridPanel);
	    _gridPanel.store.load({params:{start:0,limit:10}});
	    addAssWin.addButton({text: $lang('component.OK')/*'确定'*/},function(){
	    	var selectedRows = _gridPanel.getSelectionModel().getSelections();
			parentGrid.store.insert(0, selectedRows);
			parentGrid.setValue( parentGrid.getValue() );
			addAssWin.close();
	    });
	    addAssWin.addButton({text: $lang('component.close')/*'关闭'*/},function(){addAssWin.close();});
	    addAssWin.show();
	},
	
	deleteChecked : function(){
		var rowselects = this.getSelectionModel().getSelections();
		for(var i=0; i< rowselects.length;  i++){
			if(this.store.indexOf(rowselects[i]) != -1){
				this.store.remove( rowselects[i] );
			}
		}
		this.setValue(this.getValue());
	},
	
	onRender : function(ct, position){
		Ext.ux.AssignmentGrid.superclass.onRender.call(this, ct, position);
		this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName}, 'before', true);
	},
	
	setValue : function(v){
    	this.hiddenField.value = v;
    },
    getValue : function(){
    	var localStore= this.getStore();
    	var count = localStore.getCount();
    	var value = "";
    	for(var i=0; i< count; i++){
    		value += ','+localStore.getAt(i).get('type')+':'+ localStore.getAt(i).get('id');
    	}
    	return value.substring(1);
    },
    onDestroy : function(){
    	Ext.destroy(this.hiddenField);
    	delete this.hiddenField;
        Ext.ux.AssignmentGrid.superclass.onDestroy.call(this);
    }
    
});

Ext.reg('assignmentgrid', Ext.ux.AssignmentGrid);




Ext.ux.UserForGridWin = function(exceptCondition,callbackGrid,url) { 
	url = url||'bp/listNextNodeTaskActors.html';
    if("undefined"==typeof(exceptCondition)||null==exceptCondition){
        exceptCondition = "";
    }
    this.taskInstanceID = callbackGrid.taskInstanceID
    this.transactorsName = callbackGrid.transactorsName
    this.exceptCondition = exceptCondition;
    this.analysisCondition();
    this.exCondition = '('+this.exceptCondition+')';//需要排除的查询条件
    this.callbackGrid = callbackGrid;
    Ext.ux.UserForGridWin.superclass.constructor.call(this,  {
        layout:'fit',
        title: $lang('common.chooseAssignedPersonnel')/*'选择人员'*/,
        width:550,
        height:360,
        resizable: false,
        closeAction:'close',
        buttonAlign :'center',
        modal :true,
        plain: true
    });
    /**start of building the grid*/   
    var scope = this;
    this.store = new Ext.data.Store({
			scope : scope,
			autoLoad:true,
			sortInfo : {field : 'online',direction : 'DESC'},
			id:'transitionAssignStore'
		    ,proxy:new Ext.data.HttpProxy({"url":url})
		    ,baseParams:{
		    	taskInstanceID : scope.taskInstanceID,
		    	leavingTransitonName : scope.transactorsName , 
		    	exceptCondition : scope.exceptCondition ,
		    	limit: 10
		    }
		    ,reader:new Ext.data.JsonReader({
				root : "root",
				totalProperty : "total",
				successProperty : "success",
				fields : [
					 {mapping : "id",			type : "string",	name : "id"}
					,{mapping : "id", 			type : "string", 	name : "type", 		convert : function(){ return "id";} }
					,{mapping : "username",		type : "string",	name : "username"}
					,{mapping : "code", 		type : "string",	name : "code"}
  					,{mapping : "xingMing",		type : "string",	name : "name"}
  					,{mapping : "organization",	type : "string", 	name : "org",		convert : function (val) {if(val&&val.name) return val.name;else return '';}}
  					,{mapping : "department",	type : "string", 	name : "department",convert : function (val) {if(val&&val.name) return val.name;else return '';}}
  					,{mapping : "jobTitle",		type : "string",	name : "jobTitle",	convert : function (val) {if (val&&val.name) {return val.name;}else '';}}
  					,{mapping : "phone",		type : "string",	name : "phone"}
  					,{mapping : "mobile",		type : "string",	name : "mobile"}
  					,{mapping : "email",		type : "string",	name : "email"}
  					,{mapping : "online",		type : "string",	name : "online", 	convert : function (val) {if (val) {return "<img style='height:10px' src='styles/default/images/online.gif' title='在线' />";} else {return "<img style='height:10px' src='styles/default/images/offline.gif' title='离线'/>";}}}
  					,{mapping : "busy",			type : "string",	name : "busy",		convert : function (val) {if (val == "0") return $lang('admin.security.grid.column.idle')/*"事闲"*/;else return $lang('admin.security.grid.column.busy')/*"事忙"*/;}}
  				]
			})
		});

   
    this.search_field_store = new Ext.data.Store({
        reader : new Ext.data.ArrayReader({}, [{
            name : '_field_value'
        }, {
            name : '_field_rawvalue'
        }, {
			name : '_field_type'
		}])
    });
    this.searchCondition =[
    		["xingMing",$lang('component.xingMing')/*"姓名"*/,"string"],
    		["username",$lang('component.username')/*"账号"*/,"string"],
    		["code",$lang('common.code')/*"编码"*/,"string"],
    		["organization",$lang('admin.security.grid.column.organization')/*"单位"*/,"string"],
    		["department",$lang('component.department')/*"部门"*/,"string"]
    ];
    this.search_field_store.loadData(this.searchCondition);

    this.search_field = new Ext.form.ComboBox({
        xtype : 'combo',
        hideLabel : true,
        anchor : '-18',
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
    })

    this.search_condition = new Ext.form.TextField({
        xtype : 'textfield',
        hideLabel : true
    })
    
    this.searchTbar = ['->', {
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
    
    /**end of building the search field*/
    
    /**start of building the search field*/   
    this.afterArr = new Array();
    this.sm = new Ext.grid.CheckboxSelectionModel();
	this.sm.on('rowselect',function(sm,rowIndex,record){
		for(var i = 0 ;i < this.afterArr.length;i++){
			if(this.afterArr[i].data['id'] == record.data['id']){
				this.afterArr.splice(i,1);
			}
		}
		this.afterArr.push(record);
	},this);
	this.sm.on('rowdeselect',function(sm,rowIndex,record){
		for(var i = 0 ;i < this.afterArr.length;i++){
			if(this.afterArr[i].data['id'] == record.data['id']){
				this.afterArr.splice(i,1);
			}
		}
	},this);
    this.cm = new Ext.grid.ColumnModel([
    	new Ext.grid.RowNumberer()
        ,new Ext.grid.CheckboxSelectionModel()
    	,{dataIndex : "id", 		header : "ID",													hidden : true}
    	,{dataIndex : "name", 		header : $lang('component.xingMing')/*"姓名"*/,									sortable : true}
    	,{dataIndex : "username", 	header : $lang('component.username')/*"帐号"*/,					hidden : true, 	sortable : true}
    	,{dataIndex : "code", 		header : $lang('component.userCode')/*"员工编号"*/,				hidden : true,	sortable : true}
    	,{dataIndex : "org", 		header : $lang('admin.security.grid.column.organization')/*"单位"*/,				sortable : true}
    	,{dataIndex : "department", header : $lang('component.department')/*"部门"*/,								sortable : true}
		,{dataIndex : "jobTitle", 	header : $lang('component.position')/*"职位"*/,									sortable : true}
		,{dataIndex : "phone", 		header : $lang('common.phone')/*"电话"*/,						hidden : true,	sortable : true}
		,{dataIndex : "mobile", 	header : $lang('common.mobile')/*"手机"*/,						hidden : true,	sortable : true}
		,{dataIndex : "email", 		header : "Email",												hidden : true,	sortable : true}
		,{dataIndex : "online", 	header : $lang('admin.security.grid.column.online')/*"是否在线"*/,				sortable : true}
	    ,{dataIndex : "busy", 		header : $lang('admin.security.grid.column.idleOrBusy')/*"事闲、事忙"*/,			sortable : true}
	]);
    
    var bbar = new Ext.PagingToolbar({
        pageSize: 10,
        store: this.store
    });
    
    this.grid = new Ext.grid.GridPanel({
        viewConfig : {forceFit : true},
        frame : false,
        border : false,
        autoScroll : true,
        store : this.store,
        cm : this.cm,// dynamic cm
        bodyStyle : "width:99%;height:30%;",
        sm : this.sm,
        tbar : this.searchTbar,
        bbar: bbar,
        loadMask : true
    });
    
    this.store.on('load',function(store){
				
				var tempArr = new Array();
				store.each(function(rec) {   
					for(var i = 0; i < scope.afterArr.length;i++){
						if(rec.data['id'] == scope.afterArr[i].data['id'])
							tempArr.push(rec);
					}
				});  
				scope.sm.selectRecords(tempArr);
			
		},scope);
    /**end of building the grid*/   
    this.add(this.grid);
    this.addSubmitButton();
    this.addCloseButton();
};

Ext.extend(Ext.ux.UserForGridWin, Ext.Window, {
    addSubmitButton :function(){
        this.addButton({
            text : $lang('component.OK'),
            scope:this,
            handler : function() {
                var selectedRows = this.afterArr;
                if(selectedRows.length>0){
                    var i=0;
                    this.callbackGrid.store.insert(0, selectedRows);
                    this.callbackGrid.setValue(this.callbackGrid.getValue());
                }
                this.close();
            }
        })
    },
    
    addCloseButton :function(){
        this.addButton({
            text : $lang('component.cancel'),
            scope:this,
            handler : function() {
                this.close();
            }
        })
    },
    
    //查询动作
    searchFn : function(){
         var searchField = this.search_field.getValue();
         var searchValue = this.search_condition.getValue();
         if (searchField) {
             var params = '{' + searchField + ':"' + searchValue
                        + '",exceptCondition:"' + this.exceptCondition + '"}';
             params = Ext.util.JSON.decode(params);
             Ext.StoreMgr.lookup(this.store).baseParams = params;
             Ext.StoreMgr.lookup(this.store).load({
                 params : {
                     start : 0,
                     limit : 10
                 }
             });
         }
    },
    
    //查询过滤条件处理 
    analysisCondition: function(){
    	var items = this.exceptCondition.split(',');
    	var str = "";
    	if(this.exceptCondition && this.exceptCondition.indexOf("id") != -1){
    		for(var i=0; i< items.length; i++ ){
    			if(items[i].indexOf("id")== -1){
    			}else{
    				str += ",'" + items[i].substring(3) + "'";
    			}
    		}
    		if(str.length >= 32 ){
    			this.exceptCondition = str.substring(1,str.length);
    		}
    	}else{
    		this.exceptCondition = "";
    	}
    	
    }
});