/**
 * @class Ext.ux.ScheduleGrid
 * @extends Ext.GridPanel
 * @constructor
 * 
 * @param {Object} config The configuration options
 */
Ext.ux.ScheduleGrid = function(config) {
	Ext.apply(this,config);
	this.hiddenName = config.hiddenName||"impactCis";
	config.hiddenName = this.hiddenName;
	Ext.ux.ScheduleGrid.superclass.constructor.call(this,config);
	this.store.on('load',this.loadData,this);
}

Ext.extend(Ext.ux.ScheduleGrid, Ext.grid.GridPanel, {
	frame:true,
	viewConfig :{ forceFit : true },
	addBtnText : $lang('component.add'),
	removeBtnText : $lang('component.delete'),
	autoHeight :false,
	storeUrl : "schedule/listForCS.html",
	tbarFlag : true,
	initComponent : function(){
		if (this.tbarFlag)
			this.tbar = this.buildToolBar();
		var ciStore = new Ext.data.Store({
					proxy: new Ext.data.HttpProxy({
	        					url:this.storeUrl
	        				}),
   					reader : new Ext.data.JsonReader({
   								root: "root",
						   		successProperty :'success',
								fields : [
											{name: 'id', mapping: 'id',type:'string'},
											{name: 'watcher', mapping: 'watcher',type:'string'},
											{name: 'startDate', mapping: 'startDate',type:'string'},
											{name: 'endDate', mapping: 'endDate',type:'string'}, 
											{name: 'startTime', mapping: 'startTime',type:'string'},
											{name: 'endTime', mapping: 'endTime',type:'string'}
										]
							})
    			});
    	var ciSm = new Ext.grid.CheckboxSelectionModel();
	    var cicm = new Ext.grid.ColumnModel([
   			ciSm,
   			{header: '当前值班人', dataIndex: 'watcher',sortable: true},
   			{header: '值班日期', dataIndex: 'startDate',sortable: true},
//   			{header: '开始日期', dataIndex: 'startDate'},
//   			{header: '结束日期',dataIndex: 'endDate'},
   			{header: '开始时间', dataIndex: 'startTime',sortable: true},
   			{header: '结束时间', dataIndex: 'endTime',sortable: true}
   		]);
		this.store = ciStore;
		
		this.cm = cicm;
		this.sm = ciSm;
        Ext.ux.ScheduleGrid.superclass.initComponent.call(this);
        this.addEvents('addCi', 'removeCi');

        if(typeof this.params != 'undefined' && this.params){ 
        	ciStore.load(this.params);
        }else{
        	if (this.bpiId&&this.bpiId!='null'&&this.bpiId!='##request#id####') ciStore.load({params:{bpiId:this.bpiId}});
        }
		
    },
    
    buildToolBar : function(){
    	
    	var addCiBtn = new Ext.Toolbar.Button({
    		text : this.addBtnText,
    		iconCls : 'create-icon',
    		scope : this,
    		handler : this.onAddCi
    	});
    	var removeCiBtn = new Ext.Toolbar.Button({
    		text : this.removeBtnText,
    		iconCls : 'delete-icon',
    		scope : this,
    		handler : this.onRemoveCi
    	});
    	
    	this.ciTbar = new Ext.Toolbar({
			autoWidth : true,
			autoHeight : false,
			items : [addCiBtn,removeCiBtn]
		});
		return this.ciTbar;
    },
    loadData : function(s, rs, op ){
//    	this.setValue(this.getValue());
    	if(this.hiddenField){
    		this.hiddenField.value = this.getValue();
    	}
    },
    onAddCi : function(){
    	//var rec;
    	var condition = this.getValue();
    	var ciForGridWin = new Ext.ux.ScheduleForGridWin(condition,this);
    	ciForGridWin.show();
//    	this.fireEvent('addCi',this,this, rec);
    },
    onRemoveCi : function() {
		var rowselects = this.getSelectionModel().getSelections();
		if (rowselects.length <= 0)
			Ext.Msg.alert($lang('component.tips'), $lang('component.impactCi.chooseRecordMessage'));
		else{
			Ext.MessageBox.confirm($lang('component.tips'),'确定选中值班任务不需要换班？',
				function(ret){
					if(ret=='yes'){
						for (var i = 0; i < rowselects.length; i++) {
							this.getStore().remove(rowselects[i]);
						}
						this.fireEvent('removeCi', this, this, rowselects);
						this.setValue(this.getValue());
					}
				},this);
		}
	},
	
	
	onRender : function(ct, position){
		Ext.ux.ScheduleGrid.superclass.onRender.call(this, ct, position);
		this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName},
                    'before', true);
	},
    setValue : function(v){
    	this.hiddenField.value = v;
    },
    getValue : function(){
//    	var sm = this.getSelectionModel();
//    	var ids = new Array();
//    	var rowselects = sm.getSelections();
//    	for(var i = 0 ; i < rowselects.length; i++){
//    		ids.push(rowselects[i].get('id'));
//    	}
//    	return ids.join(",");
    	return this.getStore().collect('id')+"";
    },
    onDestroy : function(){
    	Ext.destroy(this.hiddenField);
    	delete this.hiddenField;
        Ext.ux.ScheduleGrid.superclass.onDestroy.call(this);
    }
    
	
});

Ext.reg('schedulegrid', Ext.ux.ScheduleGrid);

Ext.ux.ScheduleForGridWin = function(exceptCondition,callbackGrid) { 
    if("undefined"==typeof(exceptCondition)||null==exceptCondition){
        exceptCondition = "";
    }
    this.exceptCondition = exceptCondition;
    this.analysisCondition();
    this.exCondition = '('+this.exceptCondition+')';//需要排除的查询条件
    this.callbackGrid = callbackGrid;
    Ext.ux.ScheduleForGridWin.superclass.constructor.call(this,  {
        layout:'fit',
        title:'选择值班任务',
        width:550,
        height:360,
        resizable: false,
        closeAction:'close',
        buttonAlign :'center',
        modal :true,
        plain: true
    });
    /**start of building the grid*/   
    this.store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy(
				{url:'schedule/scheduleListForWin.html'}
			),
		autoLoad:true,
		baseParams:{limit:10,condition:this.exCondition},
        params : {start:0},
		reader: new Ext.data.JsonReader(
			{totalProperty: 'total',root: 'root',success:'success'}, 
			[
				{name: 'id', mapping: 'id',type:'string'},
                {name: 'watcher', mapping: 'watcher',convert : function(v){
					if(v)
						return v.xingMing;
					else 
						return '';
				}},
				{name: 'startDate', mapping: 'startDate',type:'date',convert:function(v) {if(v){var d = Date.parseDate(v, 'Y-m-d H:i:s');return d.format('Y-m-d');}else return '';}},
                {name: 'endDate', mapping: 'endDate',type:'date',convert:function(v) {if(v){var d = Date.parseDate(v, 'Y-m-d H:i:s');return d.format('Y-m-d');}else return '';}},
                {name: 'startTime', mapping: 'startTime',type:'date',convert:function(v) {if(v){var d = Date.parseDate(v, 'Y-m-d H:i:s');return d.format(' H:i:s');}else return '';}},
                {name: 'endTime', mapping: 'endTime',type:'date',convert:function(v) {if(v){var d = Date.parseDate(v, 'Y-m-d H:i:s');return d.format(' H:i:s');}else return '';}}
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
    this.search_field_store.loadData([['值班人','watcher']]);

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
    this.sm = new Ext.grid.CheckboxSelectionModel();
    
    this.cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
		this.sm,
		{header: '值班人', dataIndex: 'watcher'},
		{header: '值班日期', dataIndex: 'startDate'},
//		{header: '开始日期', dataIndex: 'startDate'},
//		{header: '结束日期',dataIndex: 'endDate'},
		{header: '开始时间', dataIndex: 'startTime'},
		{header: '结束时间', dataIndex: 'endTime'}
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
    
    /**end of building the grid*/   
    this.add(this.grid);
    this.addSubmitButton();
    this.addCloseButton();
};

Ext.extend(Ext.ux.ScheduleForGridWin, Ext.Window, {
    addSubmitButton :function(){
        this.addButton({
            text : $lang('component.OK'),
            scope:this,
            handler : function() {
                var selectedRows = this.grid.getSelectionModel().getSelections();
                if(selectedRows.length>0){
                    var i=0;
                    //while
                    //for(var i=0;i<selectedRows.length;i++){
                    	this.callbackGrid.store.insert(0, selectedRows);
                    	this.callbackGrid.setValue(this.callbackGrid.getValue());
                    //}
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
    },
    
    analysisCondition: function(){
    	if(!(this.exceptCondition.indexOf("'")>0)){
    		var str = "";
    		var itemStr = ""+this.exceptCondition+"";
    		var items = itemStr.split(',');
    		if(items.length>0){
    			for(var i = 0;i<items.length;i++){
    				str = str +",'"+items[i]+"'";
    			}
    		}
    		if(str.length>0){
    			str = str.substring(1,str.length);
    			this.exceptCondition =str;
    			this.exCondition = '('+this.exceptCondition+')';
    		}
    	}
    }
});
