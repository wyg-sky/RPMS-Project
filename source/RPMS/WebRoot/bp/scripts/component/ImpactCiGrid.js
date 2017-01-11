/**
 * @class Ext.ux.ImpactCiGrid
 * @extends Ext.GridPanel
 * @constructor
 * 
 * @param {Object} config The configuration options
 */
Ext.ux.ImpactCiGrid = function(config) {
	Ext.lion.ScriptLoader('cmdb/scripts/ci/CiView.js',false);
	Ext.apply(this,config);
	this.hiddenName = config.hiddenName||"impactCis";
	config.hiddenName = this.hiddenName;
	this.storeUrl = config.storeUrl||"bp/listCis.html";
	config.storeUrl = this.storeUrl;
	Ext.ux.ImpactCiGrid.superclass.constructor.call(this,config);
	this.store.on('load',this.loadData,this);
	this.on('cellclick' , this.cellclick, this);
}

Ext.extend(Ext.ux.ImpactCiGrid, Ext.grid.GridPanel, {
	frame:true,
	viewConfig :{ forceFit : true },
	addBtnText : $lang('component.add'),
	removeBtnText : $lang('component.delete'),
	autoHeight :false,
//	storeUrl : "bp/listCis.html",
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
											{name: 'code', mapping: 'code',type:'string'},
											{name: 'name', mapping: 'name',type:'string'},
											{name: 'category', mapping: 'categoryName',type:'string'}, 
											{name: 'status', mapping: 'statusName',type:'string'},
											{name: 'place', mapping: 'positionName',type:'string'},
											{name: 'categoryId', mapping: 'categoryId',type:'string'}
										]
							})
    			});
    	var ciSm = new Ext.grid.CheckboxSelectionModel();
	    var cicm = new Ext.grid.ColumnModel([
   			ciSm,
   			{header: $lang('component.numCode'), dataIndex: 'code',hidden: true},
   			{header: $lang('component.name'), dataIndex: 'name'},
   			{header: $lang('component.category'),dataIndex: 'category'},
   			{header: $lang('component.state'), dataIndex: 'status'},
   			{header: $lang('component.place'), dataIndex: 'place'},
			{header:'',dataIndex:'id',width: 18, sortable: false, renderer: function(){
		    		var str = "<img src='styles/default/images/icons/16_16/view.gif' style='cursor:pointer;'>";
		    		return str;
		    	}
			}
   		]);
		this.store = ciStore;
		
		this.cm = cicm;
		this.sm = ciSm;
        Ext.ux.ImpactCiGrid.superclass.initComponent.call(this);
        this.addEvents('addCi', 'removeCi');
        
        if(this.bpiId && this.bpiId!='null') {
        	ciStore.load({params:{bpiId:this.bpiId}});
        } else if(this.csId && this.csId!='null'){
        	ciStore.load({params:{csId:this.csId}});
        } else if(typeof this.params != 'undefined' && this.params) {
        	ciStore.load(this.params);
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
    	var ciForGridWin = new Ext.ux.CiForGridWin(condition,this);
    	ciForGridWin.show();
//    	this.fireEvent('addCi',this,this, rec);
    },
    onRemoveCi : function() {
		var rowselects = this.getSelectionModel().getSelections();
		if (rowselects.length <= 0)
			Ext.Msg.alert($lang('component.tips'), $lang('component.impactCi.chooseRecordMessage'));
		else{
			Ext.MessageBox.confirm($lang('component.tips'),$lang('component.impactCi.YesOrNoDelete'),
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
		Ext.ux.ImpactCiGrid.superclass.onRender.call(this, ct, position);
		this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName},
                    'before', true);
                    
        this.hiddenField.value = this.getValue();   
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
        Ext.ux.ImpactCiGrid.superclass.onDestroy.call(this);
    },
    cellclick : function( grid, rowIndex, columnIndex, e){
    	if(columnIndex == 6){
    		var record = grid.getStore().getAt(rowIndex);
			var win = new Ext.Window({
				title : $lang('cmdb.menu.viewConfigurationItemInformation', record.get('name'))/*'查看配置项信息'*/,
				width : 800,
				height : 500,
				layout : 'fit',
				resizable : false,
				constrainHeader : true,
				modal : true,
				border : false,
				closeAction : 'close',
				resizable: false
			});
			var ciView = new CiView({
				op: "view",
				tp: win,
				ciId: record.get("id"),
				ccId: record.get("categoryId"),
				hideRight : true
			});
			win.add(ciView);
			win.show();
			ciView.init();
    	}
    }
});

Ext.reg('impactcigrid', Ext.ux.ImpactCiGrid);

Ext.ux.CiForGridWin = function(exceptCondition,callbackGrid) { 
    if("undefined"==typeof(exceptCondition)||null==exceptCondition){
        exceptCondition = "";
    }
    this.exceptCondition = exceptCondition;
    this.analysisCondition();
    this.exCondition = '('+this.exceptCondition+')';//需要排除的查询条件
    this.callbackGrid = callbackGrid;
    Ext.ux.CiForGridWin.superclass.constructor.call(this,  {
        layout:'fit',
        title:$lang('component.chooseCi'),
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
				{url:'cmdb/ciListForWin.html'}
			),
		autoLoad:true,
		baseParams:{limit:10,condition:this.exCondition},
        params : {start:0},
		reader: new Ext.data.JsonReader(
			{totalProperty: 'total',root: 'root',success:'success'}, 
			[
				{name: 'id', mapping: 'id',type:'string'},
				{name: 'code', mapping: 'code',type:'string'},
                {name: 'name', mapping: 'name',type:'string'},
				{name: 'category', mapping: 'category',convert:function(v){if(v)return v.name;else return '';}},
                {name: 'categoryType', mapping: 'category',convert:function(v){if(v)return v.symbol;else return '';}},
                {name: 'categoryId', mapping: 'category',convert:function(v){if(v)return v.id;else return '';}},
                {name: 'categoryImgUrl', mapping: 'category',convert:function(v){if(v)return v.graphicsURL;else return '';}},
                {name: 'model', mapping: 'model',convert:function(v){if(v)return v.name;else return '';}},
                {name: 'sn', mapping: 'sn',type:'string'},
                {name: 'brand', mapping: 'brand',convert:function(v){if(v)return v.name;else return '';}},
				{name: 'status', mapping: 'status',convert:function(v){if(v)return v.name;else return '';}},
				{name: 'place', mapping: 'place',convert:function(v){if(v)return v.name;else return '';}}
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
    this.search_field_store.loadData([	[$lang('component.numCode'),'code'],
    									[$lang('component.name'),'name'],
    									//[$lang('component.assetNumber'),'assetNumber'],
    									[$lang('component.serial'),'sn'],
    									[$lang('component.category'),'categoryName'],
    									[$lang('component.state'),'statusName'],
    									[$lang('component.place'),'positionName']]);

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
        new Ext.grid.RowNumberer(),
		this.sm,
//		{header: 'id', hidden:true, dataIndex: 'id'},
        {header: $lang('component.serial'), hidden:true, dataIndex: 'sn'},
		{header: $lang('component.numCode'), sortable: true, dataIndex: 'code',hidden: true},
        {header: $lang('component.name'), sortable: true, dataIndex: 'name'},
		{header: $lang('component.category'), sortable: true, dataIndex: 'category'},
		{header: $lang('component.state'), sortable: true, dataIndex: 'status'},
		{header: $lang('component.place'), sortable: true, dataIndex: 'place'}
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
    var scope = this;
    var storeload = function(){
    	var tempArr = new Array();
				store.each(function(rec) {   
					for(var i = 0; i < this.afterArr.length;i++){
						if(rec.data['id'] == this.afterArr[i].data['id'])
							tempArr.push(rec);
					}
				});  
				this.sm.selectRecords(tempArr);
    
    }
    var scope =this;
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

Ext.extend(Ext.ux.CiForGridWin, Ext.Window, {
    addSubmitButton :function(){
        this.addButton({
            text : $lang('component.OK'),
            scope:this,
            handler : function() {
                var selectedRows = this.afterArr;
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
