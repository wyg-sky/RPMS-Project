Ext.namespace('Ext.ux.AssociateBpisGrid');
/**
 * 关联工单显示组件 
 * @class Ext.ux.AssociateBpisGrid
 * @extends Ext.GridPanel
 * @constructor
 * 
 * @param {Object} config The configuration options
 */
Ext.ux.AssociateBpisGrid = function(config) {
	Ext.apply(this,config);
	this.hiddenName = "associateBpis";
	config.hiddenName = this.hiddenName;
	Ext.ux.AssociateBpisGrid.superclass.constructor.call(this,config);
	this.store.on('load',this.loadData,this);
	this.on('rowdblclick' , this.rowdblclick , this);
	this.on('cellclick' , this.cellclick, this);
	
}

Ext.extend(Ext.ux.AssociateBpisGrid, Ext.grid.GridPanel, {
	frame:true,
	viewConfig :{ forceFit : true },
	addBtnText : $lang('component.add'),
	removeBtnText : $lang('component.delete'),
	autoHeight :false,
	addBtnMenu : false,
	tbarFlag : true,
	initComponent : function(){
		if (this.tbarFlag)
			this.tbar = this.buildToolBar();
		
		var bpiStore = new Ext.data.Store({
				proxy: new Ext.data.HttpProxy({
	    					url:'bp/listAssociatesByBpi.html'
	    				}),
				reader: new Ext.data.JsonReader({
		       		root: "resultList",
			   		totalProperty: 'totalCount',
			   		successProperty :'success',
			   		fields: [
			   					{name: 'id'},
			   					{name: 'code'},
			   					{name: 'associateType'},
			   					{name: 'summary'},
			   					{name: 'bpType'}
			   				]
			   })
		});
		
    	var bpiSm = new Ext.grid.CheckboxSelectionModel();
    	var bpicm = new Ext.grid.ColumnModel([
        			bpiSm,
        			{header: '流程类型', sortable: true, dataIndex:"bpType", width: 30},
        			{header: $lang('component.code'), sortable: true, dataIndex:"code", width: 40},
        			{header: $lang('component.summary'), sortable: true, dataIndex:"summary", width: 180},
        			{
        				header: $lang('component.associateBpisGrid.associateType'), 
        				sortable: true, 
        				hidden : true,
        				dataIndex: 'associateType',
        				renderer : function(v){
        								if( v == '0')
			   								return '关联';
			   							if( v == '1')
			   								return $lang('component.associateBpisGrid.trigger');
			   							if( v == '2')
			   								return $lang('component.associateBpisGrid.repeat');
			   							if( v == '3')
			   								return '分解(主)';
			   							if( v == '-3')
			   								return '分解(子)';
			   							if( v == '4')
			   								return '合并(子)';
			   							if( v == '-4')
			   								return '合并(主)';
			   						}
        			},{header:'查看',dataIndex:'id',width: 20, sortable: false, renderer: function(id){
				    		var str = "<img src='styles/default/images/icons/16_16/view.gif'>";
				    		return str;
				    	}
					}
        ]);
    	
        this.store = bpiStore;
		this.cm = bpicm;
		this.sm = bpiSm;
        
        Ext.ux.AssociateBpisGrid.superclass.initComponent.call(this);
       	this.addEvents('addCi', 'removeCi');
       	
       	if(typeof this.params != 'undefined' && this.params)
    		bpiStore.load(this.params);
    	else{
    		if(this.bpiId)
    			bpiStore.load({params:{bpiId:this.bpiId}});
    	}
    },
    
    buildToolBar : function(){
    	var addBpiBtn;
    	if(this.addBtnMenu)
    		addBpiBtn = new Ext.Toolbar.MenuButton({
	    		text : this.addBtnText,
	    		iconCls : 'create-icon',
	    		scope : this,
	    		menu : [{
	    			text: $lang('component.associateBpisGrid.tiggerType'),
	    			scope : this,
    				handler: this.onTMClick
	    		},{
	    			text: $lang('component.associateBpisGrid.repeatType'),
	    			scope : this,
    				handler: this.onRMClick
	    		}]
	    	});
    	else
    		addBpiBtn = new Ext.Toolbar.Button({
	    		text : this.addBtnText,
	    		iconCls : 'create-icon',
	    		scope : this,
	    		handler : this.onAddBpi
	    	});
    	
    	var removeBpiBtn = new Ext.Toolbar.Button({
    		text : this.removeBtnText,
    		iconCls : 'delete-icon',
    		scope : this,
    		handler : this.onRemoveBpi
    	});
    	
    	this.bpiTbar = new Ext.Toolbar({
			autoWidth : true,
			autoHeight : false,
//			hidden : true,		//隐藏		废弃不用（关联工单的业务不允许手动添加或删除）
			items : [addBpiBtn,removeBpiBtn]
		});
		return this.bpiTbar;
    },
    loadData : function(s, rs, op ){
    	if(this.hiddenField){
    		this.hiddenField.value = this.getValue();
    	}
    },
    
    //普通关联关系工单添加
    onAddBpi : function(){
    	this.typeValue = 0;
    	var exceptCondition = this.getStoreIdsValue();
    	var winStoreParam = this.winStoreParam;
    	var defaultAssBp = this.defaultAssBp;
    	var bpiForGridWin = new Ext.ux.BpiForGridWin(exceptCondition,this,winStoreParam,defaultAssBp);
    	bpiForGridWin.show();
    },
    
    //触发关系工单添加
    onTMClick : function(){
    	this.typeValue = 1;
    	var exceptCondition = this.getStoreIdsValue();
    	var winStoreParam = this.winStoreParam;
    	var defaultAssBp = this.defaultAssBp;
    	var bpiForGridWin = new Ext.ux.BpiForGridWin(exceptCondition,this,winStoreParam,defaultAssBp);
    	bpiForGridWin.show();
    },
    
    //重复关系工单添加
    onRMClick : function(){
    	this.typeValue = 2;
    	var exceptCondition = this.getStoreIdsValue();
    	var defaultAssBp = this.defaultAssBp;
    	var bpiForGridWin = new Ext.ux.BpiForGridWin(exceptCondition,this,winStoreParam,defaultAssBp);
    	bpiForGridWin.show();
    },
    
    onRemoveBpi : function() {
		var rowselects = this.getSelectionModel().getSelections();
		if (rowselects.length <= 0)
			Ext.Msg.alert($lang('component.tips'), $lang('component.associateBpisGrid.tipMessage'));
		else{
			Ext.MessageBox.confirm($lang('component.tips'),$lang('component.associateBpisGrid.confirmMsg'),
				function(ret){
					if(ret=='yes'){
						for (var i = 0; i < rowselects.length; i++) {
							this.getStore().remove(rowselects[i]);
						}
						this.fireEvent('removeBpi', this, this, rowselects);
						this.setValue(this.getValue());
					}
				},this);
		};
	},
	onRender : function(ct, position){
		Ext.ux.AssociateBpisGrid.superclass.onRender.call(this, ct, position);
		this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName},
                    'before', true);
        this.hiddenField.value = this.getValue();            
	},
    setValue : function(v){
    	this.hiddenField.value = v;
    },
    getValue : function(){
    	var idAndType = "";
    	for(var i=0;i<this.getStore().getCount();i++){
    		idAndType +=","+this.getStore().getAt(i).get('id')
    			+"*"+this.getStore().getAt(i).get('associateType');
    	}
    	idAndType = idAndType.substring(1,idAndType.length);
    	
    	return idAndType;
    },
    getStoreIdsValue : function(){
    	return this.getStore().collect('id')+"";
    },
    onDestroy : function(){
    	Ext.destroy(this.hiddenField);
    	delete this.hiddenField;
        Ext.ux.AssociateBpisGrid.superclass.onDestroy.call(this);
    },
	
    rowdblclick : function(grid, rowIndex, e){
    	Ext.lion.ScriptLoader("bp/scripts/BpWorkbenchPanel.js");
    	var selectedRow = grid.store.getAt(rowIndex);
		var id = selectedRow.get("id");
		var code = selectedRow.get("code");
		
		var bpiPanel = new BpWorkbenchPanel(id,null,{op:'c'});
    	var bpiWin = new Ext.Window({
    		title : code,
    		layout : 'fit',
    		width : 800,
    		height : 480,
    		modal : true,
    		resizable : false
    	});
    	bpiWin.add( bpiPanel );
    	bpiWin.show();
    	bpiPanel.loadBpiForView(id);
    },
    
    cellclick : function( grid, rowIndex, columnIndex, e){
    	if(columnIndex == 4){
    		this.rowdblclick(grid,rowIndex);
    	}
    	
    }
});

Ext.reg('associatebpisgrid', Ext.ux.AssociateBpisGrid);


Ext.ux.BpiForGridWin = function(exceptCondition,callbackGrid,winStoreParam,defaultAssBp) { 
    this.exceptCondition = exceptCondition;//需要排除的查询条件
    this.callbackGrid = callbackGrid;
    this.winStoreParam = winStoreParam;
    this.defaultAssBp = defaultAssBp;
    this.storeUrl = 'bp/bpiListForWin.html';
    if(this.winStoreParam)
    	this.storeUrl +='?'+this.winStoreParam;
    Ext.ux.BpiForGridWin.superclass.constructor.call(this,  {
        layout:'fit',
        width:650,
        height:400,
        closeAction:'close',
        buttonAlign :'center',
        modal :true,
        plain: true
    });
    
    this.store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy(
				{url:this.storeUrl}
			),
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
        xtype : 'combo',
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
    })

    this.search_condition = new Ext.form.TextField({
        xtype : 'textfield',
        hideLabel : true
    })
    
    this.searchTbar = ['->', {
        xtype : 'tbtext',
        text : '流程类型:'
    }, this.search_processType, {
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
    
    
    this.sm = new Ext.grid.CheckboxSelectionModel();
    
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
        pageSize: 10,
        store: this.store, 
        displayInfo: true,
        displayMsg: $lang('component.displayMsg'),
        emptyMsg: $lang('component.emptyMsg')
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
    
    /**end of building the grid*/  
    this.add(this.grid);
    this.addSubmitButton();
    this.addCloseButton();
};

Ext.extend(Ext.ux.BpiForGridWin, Ext.Window, {
    addSubmitButton :function(){
        this.addButton({
            text : $lang('component.OK'),
            scope:this,
            handler : function() {
                var selectedRows = this.grid.getSelectionModel().getSelections();
                if(selectedRows.length>0)
                	this.callbackGrid.store.insert(0, selectedRows);
                
                if(this.callbackGrid.typeValue)
                	for(var i=0;i<selectedRows.length;i++){
                		this.callbackGrid.store.getById(selectedRows[i].id).set('associateType',this.callbackGrid.typeValue);
                	}
                
                this.callbackGrid.setValue(this.callbackGrid.getValue());
                
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
             Ext.StoreMgr.lookup(this.store).baseParams = params;
             Ext.StoreMgr.lookup(this.store).load({
                 params : {
                     start : 0,
                     limit : 10
                 }
             });
         }
    },
    processTypeSelect : function(){
		this.searchFn();
	},
	processTypeLoad : function(s,rs,op){
		this.search_processType.setValue(this.search_processType_store.getAt(0).get("id"));
		for(var i=0; i<this.search_processType_store.getTotalCount(); i++)
			if(this.search_processType_store.getAt(i).get("code")==this.defaultAssBp)
				this.search_processType.setValue(this.search_processType_store.getAt(i).get("id"))
				
		this.searchFn();
	}
});