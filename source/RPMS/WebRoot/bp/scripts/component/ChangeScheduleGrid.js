/**
 * @class Ext.ux.ChangeScheduleGrid
 * @extends Ext.GridPanel
 * @constructor
 * 
 * @param {Object} config The configuration options
 */
Ext.ux.ChangeScheduleGrid = function(config) {
	Ext.lion.ScriptLoader('bp/scripts/component/ImpactCiGrid.js'
		,'ext/extension/AttachmentGrid.js'
		,'bp/Change/scripts/component/CSGrid.js'
		,'bp/Change/scripts/component/CSChoiceWin.js'
	);
	
	Ext.apply(this,config);
	Ext.ux.ChangeScheduleGrid.superclass.constructor.call(this,config);
	this.on('rowcontextmenu', this.showContexMenu,this);
	this.on('rowdblclick', this.onRowdblclick,this);
	this.on('cellclick' , this.onCellclick, this);
}

Ext.extend(Ext.ux.ChangeScheduleGrid, Ext.grid.GridPanel, {
	frame:true,
	viewConfig :{ forceFit : true },
	removeBtnText : $lang('component.delete'),
	autoHeight :false,
	tbarFlag : true,
	initComponent : function(){
		if (this.tbarFlag)
			this.tbar = this.buildToolBar();
		
		var csStore = new Ext.data.Store({
				proxy: new Ext.data.HttpProxy({
	    					url:'bp/listCs.html'
	    				}),
				reader: new Ext.data.JsonReader({
		       		root: "root",
			   		totalProperty: 'totalCount',
			   		successProperty :'success',
			   		fields: [
			   					{name:'id'},
								{name:'startDate'},
								{name:'endDate'},
								{name:'action'},
								{name:'executor'},
			   					{name:'state'}
			   				]
			   })
		});
		
    	var csSm = new Ext.grid.CheckboxSelectionModel();
    	var cscm = new Ext.grid.ColumnModel([
        			csSm,
        			{header: $lang('component.startDate'), sortable: true, dataIndex:"startDate"},
        			{header: $lang('component.endDate'), sortable: true, dataIndex:"endDate"},
        			{header: $lang('component.task'), sortable: true, dataIndex:"action"},
        			{
        				header: $lang('component.executor'), 
        				sortable: true, 
        				dataIndex:"executor",
        				renderer : function(v){
        					if(v)
        						return v.xingMing;
        				}
        				
        			},{
        				header: $lang('component.state'), 
        				sortable: true, 
        				dataIndex: 'state',
        				renderer : function(v){
			   							if( v == '1')
			   								return $lang('component.stateCustomized');
			   							if( v == '2')
			   								return $lang('component.stateActived');
			   							if( v == '3')
			   								return $lang('component.stateExecuted');
			   						}
        			},{
        				header: $lang('component.view'),
        				sortable: true,
        				dataIndex: 'id',
        				renderer: function(v){
				    		var str = "<img src='styles/default/images/icons/16_16/view.gif' style='cursor:pointer;'>";
				    		return str;
        				}
        			}
        ]);
    	
        this.store = csStore;
		this.cm = cscm;
		this.sm = csSm;
        
        Ext.ux.ChangeScheduleGrid.superclass.initComponent.call(this);
       	this.addEvents('removeCi');
       	
       	if(typeof this.params != 'undefined' && this.params)
    		csStore.load(this.params);
    	else{
    		if(this.changeId)
    			csStore.load({params:{changeId:this.changeId}});
    	}
    		
    },
    
    buildToolBar : function(){
    	
    	var removeCsBtn = new Ext.Toolbar.Button({
    		text : this.removeBtnText,
    		iconCls : 'delete-selected-icon',
    		scope : this,
    		handler : this.onRemoveCs
    	});
    	
    	this.csTbar = new Ext.Toolbar({
			autoWidth : true,
			autoHeight : false,
			items : [removeCsBtn]
		});
		return this.csTbar;
    },
    onRemoveCs : function() {
		var rowselects = this.getSelectionModel().getSelections();
		if (rowselects.length <= 0)
			Ext.Msg.alert($lang('component.tips'), $lang('component.schedule.gridTipMessage'));
		else{
			var csIds = "";
			for(var i=0;i<rowselects.length;i++){
			    csIds += ""+rowselects[i].get('id')+",";
			    this.getStore().remove(rowselects[i]);
			}
			Ext.Ajax.request({
				url: 'bp/deleteCs.html',
			    method: 'POST',
			    params: {csIds:csIds},
			    success: function(response,options){
			    	//获取响应的json字符串      
			        var responseStr = response.responseText;
			        if (responseStr != "success") {
			            Ext.Msg.alert($lang('component.false'), $lang('component.falseDeleteMessage'));
			        }
			    }
			});
			this.fireEvent('removeCs', this, this, rowselects);
		};
	},
    setValue : function(v){
    	//this.hiddenField.value = v;
    },
    getValue : function(){
    	return this.getStore().collect('id')+"";
    },
    onDestroy : function(){
        Ext.ux.ChangeScheduleGrid.superclass.onDestroy.call(this);
    },
    onRowdblclick : function(grid, rowIndex, e){
		var selectedRow = grid.getSelectionModel().getSelected();
		var selectedRecordId = selectedRow.get("id");
		Ext.Ajax.request({
			url : 'bp/checkCsExecutorByCurrentUser.html',
			params : {csId:selectedRecordId},
			scope : this,
			success : function( response, option ){
				var responseStr = response.responseText;
				var win;
		        if (responseStr == 'success') {
		       		win = new ChangeScheduleAddOrEdit({
						m_grid_store: grid.store, 
						op:'execute',
						csId : selectedRecordId
					});
					win.changeScheduleForm.form.load({
				    	url:'bp/csForEdit.html?csId='+selectedRecordId
				    });
		        } else {
	         		win = new ChangeScheduleView({csId : selectedRecordId});
			    	win.changeScheduleForm.form.load({
				    	url:'bp/csForView.html?csId='+selectedRecordId
		   	 		});	
		        }
		        win.show();
			}
		});
    },
  	onCellclick : function( grid, rowIndex, columnIndex, e){
		if(columnIndex == 6){
    		this.onRowdblclick(grid,rowIndex);
		}
  	}
	
});

Ext.reg('changeschedulegrid', Ext.ux.ChangeScheduleGrid);