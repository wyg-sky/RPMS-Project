/**
 * @class Ext.ux.KnownErrorGrid
 * @extends Ext.GridPanel
 * @constructor
 * 
 * @param {Object} config The configuration options
 */
Ext.ux.KnownErrorGrid = function(config) {
	Ext.apply(this,config);
	this.hiddenName = "knownErrors";
	config.hiddenName = this.hiddenName;
	Ext.ux.KnownErrorGrid.superclass.constructor.call(this,config);
	this.store.on('load',this.loadData,this);
}

Ext.extend(Ext.ux.KnownErrorGrid, Ext.grid.GridPanel, {
	frame:true,
	viewConfig :{ forceFit : true },
	addBtnText : $lang('component.add'),
	removeBtnText : $lang('component.delete'),
	autoHeight :false,
	tbarFlag : true,
	initComponent : function(){
		if (this.tbarFlag)
			this.tbar = this.buildToolBar();
		
		var keStore = new Ext.data.Store({
				proxy: new Ext.data.HttpProxy({
	    					url:'bp/listKeByIds.html'
	    				}),
				reader: new Ext.data.JsonReader({
		       		root: "root",
			   		totalProperty: 'totalCount',
			   		successProperty :'success',
			   		fields: [
			   					{name:'id'},
								{name:'code'},
								{name:'symptom'},
			   					{name: 'state'}
			   				]
			   })
		});
		
    	var keSm = new Ext.grid.CheckboxSelectionModel();
    	var kecm = new Ext.grid.ColumnModel([
        			keSm,
        			{header: $lang('component.numCode'), sortable: true, dataIndex:"code"},
        			{header: $lang('component.symptom'), sortable: true, dataIndex:"symptom"},
        			{
        				header: $lang('component.state'), 
        				sortable: true, 
        				dataIndex: 'state',
        				renderer : function(v){
			   							if( v == '1')
			   								return $lang('component.stateUsing');
			   							if( v == '2')
			   								return $lang('component.stateDeleted');
			   						}
        			}
        ]);
    	
        this.store = keStore;
		this.cm = kecm;
		this.sm = keSm;
        
        Ext.ux.KnownErrorGrid.superclass.initComponent.call(this);
       	this.addEvents('addCi', 'removeCi');
       	
       	if(typeof this.params != 'undefined' && this.params)
    		keStore.load(this.params);
    	else{
    		if(this.knownErrors)
    			keStore.load({params:{keIds:this.knownErrors}});
    	}
    },
    
    buildToolBar : function(){
    	
    	var addKeBtn = new Ext.Toolbar.Button({
    		text : this.addBtnText,
    		iconCls : 'create-icon',
    		scope : this,
    		handler : this.onAddKe
    	});
    	var removeKeBtn = new Ext.Toolbar.Button({
    		text : this.removeBtnText,
    		iconCls : 'delete-icon',
    		scope : this,
    		handler : this.onRemoveKe
    	});
    	
    	this.keTbar = new Ext.Toolbar({
			autoWidth : true,
			autoHeight : false,
			items : [addKeBtn,removeKeBtn]
		});
		return this.keTbar;
    },
    loadData : function(s, rs, op ){
    	if(this.hiddenField){
    		this.hiddenField.value = this.getValue();
    	}
    },
    onAddKe : function(){
    	var exceptCondition = this.getValue();
    	var keForGridWin = new Ext.ux.KeForGridWin(exceptCondition,this);
    	keForGridWin.show();
    },
    onRemoveKe : function() {
		var rowselects = this.getSelectionModel().getSelections();
		if (rowselects.length <= 0)
			Ext.Msg.alert($lang('component.tips'), $lang('component.knownError.chooseRecordMessage'));
		else{
			for (i = 0; i < rowselects.length; i++) {
				this.getStore().remove(rowselects[i]);
			}
			this.fireEvent('removeKe', this, this, rowselects);
		};
		this.setValue(this.getValue());
	},
	onRender : function(ct, position){
		Ext.ux.KnownErrorGrid.superclass.onRender.call(this, ct, position);
		this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName},
                    'before', true);
	},
    setValue : function(v){
    	this.hiddenField.value = v;
    },
    getValue : function(){
    	return this.getStore().collect('id')+"";
//    	return this.hiddenField.value;
    },
    onDestroy : function(){
    	Ext.destroy(this.hiddenField);
    	delete this.hiddenField;
        Ext.ux.KnownErrorGrid.superclass.onDestroy.call(this);
    }
	
});

Ext.reg('knownerrorgrid', Ext.ux.KnownErrorGrid);


Ext.ux.KeForGridWin = function(exceptCondition,callbackGrid) { 
    this.exceptCondition = exceptCondition;//需要排除的查询条件
    this.callbackGrid = callbackGrid;
    Ext.ux.KeForGridWin.superclass.constructor.call(this,  {
        layout:'fit',
        width:650,
        height:400,
        closeAction:'close',
        buttonAlign :'center',
        modal :true,
        plain: true
    });
    
    this.store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
        	url:'bp/listBpke.html'
    	}),
		autoLoad:true,
		baseParams:{limit:10,condition:this.exceptCondition},
        params : {start:0},
		reader: new Ext.data.JsonReader({
				root : 'root',
				totalProperty : 'total',
				successProperty : 'success'
			}, 
			[
				{name:'id'},
				{name:'code'},
				{name:'symptom'},
			   	{name: 'state'}
			]
		)
	});

   
    this.search_field_store = new Ext.data.Store({
        reader : new Ext.data.ArrayReader({}, [{
            name : '_field_rawvalue'
        }, {
            name : '_field_value'
        }])
    });
    this.search_field_store.loadData([[$lang('component.numCode'),'code'],[$lang('component.symptom'),'symptom'],[$lang('component.state'),'state']]);

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
        mode : 'local',
        listeners: {
        	'select': function(){
        					if(this.getValue()=='state') {
        						Ext.getCmp('search_condition_state').show();
        						Ext.getCmp('search_condition').hide();
        					}else{
        						Ext.getCmp('search_condition_state').hide();
        						Ext.getCmp('search_condition').show();
        					}
        			}
        }
    })
	
    this.search_condition_state = new Ext.form.ComboBox({
        hideLabel : true,
        id : 'search_condition_state',
        value : '1',
        valueField : "value",
        displayField : "name",
        mode : 'local',
        triggerAction : 'all',
        hidden : true,
        editable :false,
        forceSelection : true,
        store : new Ext.data.SimpleStore({
					fields : ["name", "value"],
					data : [[$lang('bp.stateUsing'), '1'],[$lang('bp.stateDeleted'), '2']]
				})
    })
    
    this.search_condition = new Ext.form.TextField({
        xtype : 'textfield',
        id:'search_condition',
        hideLabel : true
    })
    
    this.searchTbar = ['->', {
        xtype : 'tbtext',
        text : $lang('component.searchByConditions')
    }, this.search_field, {
        xtype : 'tbtext',
        text : $lang('component.contain')
    }, this.search_condition, this.search_condition_state,{
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
			header : $lang('component.numCode'),
			sortable: true,
			dataIndex : "code"
		}, {
			header : $lang('component.symptom'),
			sortable: true,
			dataIndex : "symptom"
		}, {
			header : $lang('component.state'),
			sortable: true,
			dataIndex : "state",
			renderer : function(v){
							if( v == '1')
			   					return $lang('component.stateUsing');
			   				if( v == '2')
			   					return $lang('component.stateDeleted');
			   		}
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

Ext.extend(Ext.ux.KeForGridWin, Ext.Window, {
    addSubmitButton :function(){
        this.addButton({
            text : $lang('component.OK'),
            scope:this,
            handler : function() {
                var selectedRows = this.grid.getSelectionModel().getSelections();
                if(selectedRows.length>0){
                    this.callbackGrid.store.insert(0, selectedRows);
                    this.callbackGrid.setValue(this.callbackGrid.getStore().collect('id'));
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
    searchFn : function(){
         var searchField = this.search_field.getValue();
         var searchValue = this.search_condition.getValue();
         if(this.search_condition.hidden==false)
         	searchValue = this.search_condition.getValue();
         else
         	searchValue = this.search_condition_state.getValue();
         if (searchField) {
             var params = '{' + searchField + ':"' + searchValue
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
    }
});