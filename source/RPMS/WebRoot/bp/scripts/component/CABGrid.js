/**
 * @class Ext.ux.CABGrid
 * @extends Ext.GridPanel
 * @constructor
 * 
 * @param {Object} config The configuration options
 */
Ext.ux.CABGrid = function(config) {
	Ext.apply(this,config);
	this.hiddenName = "cabIds";
	config.hiddenName = this.hiddenName;
	Ext.ux.CABGrid.superclass.constructor.call(this,config);
	this.store.on('load',this.loadData,this);
}

Ext.extend(Ext.ux.CABGrid, Ext.grid.GridPanel, {
	frame:true,
	viewConfig :{ forceFit : true },
	addBtnText : $lang('component.add'),
	removeBtnText : $lang('component.delete'),
	autoHeight :false,
	tbarFlag : true,
	initComponent : function(){
		if (this.tbarFlag)
			this.tbar = this.buildToolBar();
		
		var cabStore = new Ext.data.Store({
				proxy: new Ext.data.HttpProxy({
	    					url:'bp/listCabByCabIds.html'
	    				}),
				reader: new Ext.data.JsonReader({
		       		totalProperty : 'total',
					successProperty : 'success',
					root : 'root',
					fields : ["id", "username", 'code',
								"xingMing", "department",
							{name: 'jobTitle', mapping: 'jobTitle',type: 'string', convert: function(v){if(v&&v.value){return v.value;}else{return "";}}}]
			   })
		});
		
    	var cabSm = new Ext.grid.CheckboxSelectionModel();
    	var cabcm = new Ext.grid.ColumnModel([
        			cabSm,
        			{
							dataIndex : "id",
							hidden : true,
							sortable : false
					}, {
							header : $lang('component.xingMing'),
							sortable : true,
							dataIndex : "xingMing"
					}, {
							header : $lang('component.department'),
							sortable : true,
							dataIndex : "department",
							renderer : function(v) {
								if (v && v.name)
									return v.name;
								else
									return '';
							}
					}, {
							header : $lang('component.position'),
							sortable : true,
							dataIndex : "jobTitle"
					}
        ]);
    	
        this.store = cabStore;
		this.cm = cabcm;
		this.sm = cabSm;
        
        Ext.ux.CABGrid.superclass.initComponent.call(this);
       	this.addEvents('addCi', 'removeCi');
       	
       	if(typeof this.params != 'undefined' && this.params)
    		cabStore.load(this.params);
    	else{
    		if(this.cabIds)
    			cabStore.load({params:{cabIds:this.cabIds}});
    	}
    },
    
    buildToolBar : function(){
    	
    	var addCabBtn = new Ext.Toolbar.Button({
    		text : this.addBtnText,
    		iconCls : 'create-icon',
    		scope : this,
    		handler : this.onAddCab
    	});
    	var removeCabBtn = new Ext.Toolbar.Button({
    		text : this.removeBtnText,
    		iconCls : 'delete-icon',
    		scope : this,
    		handler : this.onRemoveCab
    	});
    	
    	this.cabTbar = new Ext.Toolbar({
			autoWidth : true,
			autoHeight : false,
			items : [addCabBtn,removeCabBtn]
		});
		return this.cabTbar;
    },
    loadData : function(s, rs, op ){
    	if(this.hiddenField){
    		this.hiddenField.value = this.getValue();
    	}
    },
    onAddCab : function(){
    	var exceptCondition = this.getValue();
    	var cabForGridWin = new Ext.ux.CabForGridWin(exceptCondition,this);
    	cabForGridWin.show();
    },
    onRemoveCab : function() {
		var rowselects = this.getSelectionModel().getSelections();
		if (rowselects.length <= 0)
			Ext.Msg.alert($lang('component.tips'), $lang('component.CABGrid.tipMessage'));
		else{
			for (i = 0; i < rowselects.length; i++) {
				this.getStore().remove(rowselects[i]);
			}
			this.fireEvent('removeCab', this, this, rowselects);
		};
		this.setValue(this.getValue());
	},
	onRender : function(ct, position){
		Ext.ux.CABGrid.superclass.onRender.call(this, ct, position);
		this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName},
                    'before', true);
	},
    setValue : function(v){
    	this.hiddenField.value = v;
    },
    getValue : function(){
    	return this.getStore().collect('id')+"";
    },
    onDestroy : function(){
    	Ext.destroy(this.hiddenField);
    	delete this.hiddenField;
        Ext.ux.CABGrid.superclass.onDestroy.call(this);
    }
	
});

Ext.reg('cabgrid', Ext.ux.CABGrid);


Ext.ux.CabForGridWin = function(exceptCondition,callbackGrid) { 
    this.exceptCondition = '('+exceptCondition+')';//需要排除的查询条件
    this.callbackGrid = callbackGrid;
    Ext.ux.CabForGridWin.superclass.constructor.call(this,  {
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
        	url:'admin/users!listForWin.html'
    	}),
		autoLoad:true,
		baseParams:{limit:10,condition:this.exceptCondition},
        params : {start:0},
		reader: new Ext.data.JsonReader({
				totalProperty : 'total',
				successProperty : 'success',
				root : 'root',
				fields : ["id", "username", 'code',
						"xingMing", "department",
						{name: 'jobTitle', mapping: 'jobTitle',type: 'string', convert: function(v){if(v&&v.value){return v.value;}else{return "";}}}]
		})
	});

   
    this.search_field_store = new Ext.data.Store({
        reader : new Ext.data.ArrayReader({}, [{
            name : '_field_value'
        }, {
            name : '_field_rawvalue'
        }])
    });
    this.search_field_store.loadData([['xingMing', $lang('component.xingMing'), 'string'],
				['username', $lang('component.userName'), 'string'], ['code', $lang('component.coding'), 'string']]);

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
    
    
    this.sm = new Ext.grid.CheckboxSelectionModel();
    
    this.cm = new Ext.grid.ColumnModel([
		this.sm,
		{
			dataIndex : "id",
			hidden : true,
			sortable : false
		}, {
			header : $lang('component.xingMing'),
			sortable : true,
			dataIndex : "xingMing"
		}, {
			header : $lang('component.userName'),
			sortable : true,
			dataIndex : "username"
		}, {
			header : $lang('component.userCode'),
			sortable : true,
			dataIndex : "code"
		}, {
			header : $lang('component.department'),
			sortable : true,
			dataIndex : "department",
			renderer : function(v) {
				if (v && v.name)
					return v.name;
				else
					return '';
			}
		}, {
			header : $lang('component.position'),
			sortable : true,
			dataIndex : "jobTitle"
		}
	]);
    
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

Ext.extend(Ext.ux.CabForGridWin, Ext.Window, {
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
         if (searchField) {
             var params = '{' + searchField + ':"' + searchValue
                        + '",condition:"' + this.exCondition + '"}';
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