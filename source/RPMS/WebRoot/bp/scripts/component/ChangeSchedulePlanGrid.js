/**
 * @class Ext.ux.ChangeSchedulePlanGrid
 * @extends Ext.GridPanel
 * @constructor
 * 
 * @param {Object} config The configuration options
 */
Ext.ux.ChangeSchedulePlanGrid = function(config) {
	Ext.lion.ScriptLoader('bp/scripts/component/ImpactCiGrid.js'
		,'ext/extension/AttachmentGrid.js'
		,'bp/Change/scripts/component/CSGrid.js'
		,'bp/Change/scripts/component/CSChoiceWin.js'
	);
	
	Ext.apply(this,config);
	Ext.ux.ChangeSchedulePlanGrid.superclass.constructor.call(this,config);
	this.on('rowcontextmenu', this.showContexMenu, this);
	this.on('rowdblclick', this.onRowdblclick, this);
}

Ext.extend(Ext.ux.ChangeSchedulePlanGrid, Ext.grid.GridPanel, {
	frame:true,
	viewConfig :{ forceFit : true },
	addBtnText : $lang('component.add'),
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
        			}
        ]);
    	
        this.store = csStore;
		this.cm = cscm;
		this.sm = csSm;
        
        Ext.ux.ChangeSchedulePlanGrid.superclass.initComponent.call(this);
       	this.addEvents('addCi', 'removeCi');
       	
       	if(typeof this.params != 'undefined' && this.params)
    		csStore.load(this.params);
    	else{
    		if(this.changeId)
    			csStore.load({params:{changeId:this.changeId}});
    	}
    		
    },
    
    buildToolBar : function(){
    	
    	var addCsBtn = new Ext.Toolbar.Button({
    		text : this.addBtnText,
    		iconCls : 'create-icon',
    		scope : this,
    		handler : this.onAddCs
    	});
    	var removeCsBtn = new Ext.Toolbar.Button({
    		text : this.removeBtnText,
    		iconCls : 'delete-selected-icon',
    		scope : this,
    		handler : this.onRemoveCs
    	});
    	
    	this.csTbar = new Ext.Toolbar({
			autoWidth : true,
			autoHeight : false,
			items : [addCsBtn,removeCsBtn]
		});
		return this.csTbar;
    },
    onAddCs : function(){
    	var createWin; 
    	
		if(!createWin){
			createWin = new ChangeScheduleAddOrEdit({
						csId : "",
						changeId:this.changeId,
						op:'save',
						m_grid_store: this.store
			});
			createWin.setTitle($lang('component.schedule.createPlan'));
			createWin.show();
		}
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
        Ext.ux.ChangeSchedulePlanGrid.superclass.onDestroy.call(this);
    },
    showContexMenu :function(grid, rowIndex, e){
        var rightClickMenu = new Ext.menu.Menu( {
            items : [{
            	xtype:"button",
				text:$lang('component.browse'),
				iconCls:"view-icon",
				pressed:true,
                handler:function(){
                	var detailViewWin;
		            if(!detailViewWin)
		            	detailViewWin = new ChangeScheduleView();
		            var selectedRecordId = grid.store.getAt(rowIndex).get("id");
		            detailViewWin.changeScheduleForm.form.load({url:'bp/csForView.html?csId='+selectedRecordId});
		            detailViewWin.show();
                }
            },{
            	xtype:"button",
				text:$lang('component.edit'),
				iconCls:"modify-icon",
				pressed:true,
				scope:this,
                handler:function(){
                    var selectedRecordId = grid.store.getAt(rowIndex).get("id")
                    this.doEdit(selectedRecordId)
                }
            }]
        });
        e.preventDefault();
        rightClickMenu.showAt(e.getXY());
    },
    onRowdblclick : function(grid, rowIndex, e){
        var selectedRecordId = grid.store.getAt(rowIndex).get("id");
        this.doEdit(selectedRecordId)
    },
    doEdit : function(csId) {
    	var createWin = new ChangeScheduleAddOrEdit({
    		csId : csId,
    		changeId:this.changeId,
    		op:'update',
			m_grid_store:this.store
    	});
	 	createWin.setTitle($lang('component.schedule.editChangPlan'));
	 	createWin.changeScheduleForm.form.load({url:'bp/csForEdit.html?csId='+csId});
        createWin.show();
    }
});

Ext.reg('csplangrid', Ext.ux.ChangeSchedulePlanGrid);