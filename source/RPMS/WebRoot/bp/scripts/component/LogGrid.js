Ext.namespace('Ext.ux.LogGrid');
/**
 * @class Ext.ux.ImpactCiGrid
 * @extends Ext.GridPanel
 * @constructor
 * 
 * @param {Object} config The configuration options
 */
Ext.ux.LogGrid = function(config) {
	Ext.apply(this,config);
	Ext.ux.LogGrid.superclass.constructor.call(this,config);
	
	this.on('rowdblclick' , this.rowdblclick , this);
	this.on('cellclick' , this.cellclick, this);
}

Ext.extend(Ext.ux.LogGrid, Ext.grid.GridPanel, {
	frame:false,
    border:false,
	viewConfig :{ forceFit : true },
	autoHeight :false,
	initComponent : function(){
        var logStore = new Ext.data.Store({
	        			proxy: new Ext.data.HttpProxy({
	        					url:'bp/listLogsByBpi.html'
	        				}),
	        			reader: new Ext.data.JsonReader({
				       		root: "resultList",
					   		totalProperty: 'totalCount',
					   		successProperty :'success',
					   		fields: ["operator","operation","node","transition","comment",{name:'createdOn'}]
					   })
	        		});
    		
	    var logCm = new Ext.grid.ColumnModel([
		    			new Ext.grid.RowNumberer(),
		    			{header: $lang('component.operator'), sortable: true, dataIndex:"operator",renderer : function(v){if(v&&v.xingMing)return v.xingMing;else return '';}},
		    			{header: $lang('component.operation'),  sortable: true, dataIndex: 'operation'},
		    			{header: $lang('component.node'), sortable: true, dataIndex: 'node'},
		    			{header: $lang('component.transition'), sortable: true, dataIndex: 'transition'},
		    			{header: $lang('component.comment'), sortable: true, dataIndex: 'comment'},
		    			{header: $lang('component.operationTime'), sortable: true, dataIndex: 'createdOn'},
		    			{header: '查看',sortable: false, dataIndex: 'operator', width: 40, renderer: function(id){
	      		    		var str = "<img src='styles/default/images/icons/16_16/view.gif'>";
	      		    		return str;
	      		    	}}
	    		]);
       	this.cm = logCm;
       	this.store = logStore;
       	
       	Ext.ux.LogGrid.superclass.initComponent.call(this);
       	if(typeof this.params != 'undefined' && this.params)
    		logStore.load(this.params);
    	else{
            if (this.bpiId) {
                logStore.load({params:{bpiId:this.bpiId}});
            } else {
                 logStore.load();
            }
        }
       
    },
	
    rowdblclick : function(grid, rowIndex, e){
    	var selectedRow = grid.store.getAt(rowIndex);
    	var operator = selectedRow.get('operator').xingMing;
    	var operation = selectedRow.get('operation');
    	var comment = selectedRow.get('comment');
    	var createdOn = selectedRow.get('createdOn');
    	
    	var logWin= new Ext.Window({
    		title : '日志明细',
    		width : 400,
    		height : 240,
    		buttonAlign : 'center',
    		modal : true,
    		resizable : false,
    		layout : 'form',
    		border:false,
    		labelWidth : 60,
    		bodyStyle:"padding:10px 20px 0",
    		items : [{
        			xtype : 'textfield',
        			fieldLabel : $lang('component.operator'),
        			value : operator,
        			anchor: '99%',
        			readOnly : true
        		},{
        			xtype : 'textfield',
        			fieldLabel : $lang('component.operation'),
        			value : operation,
        			anchor: '99%',
        			readOnly : true
        		},{
        			xtype : 'textfield',
        			fieldLabel : $lang('component.operationTime'),
        			value : createdOn,
        			anchor: '99%',
        			readOnly : true
        		},{
        			xtype : 'textarea',
        			fieldLabel : '工作日志',
        			value : comment,
        			anchor: '99%',
        			height: 112,
        			readOnly : true
    		}]
    	});
    	
    	logWin.show();
    },
    
    cellclick : function( grid, rowIndex, columnIndex, e){
    	if(columnIndex == 7){
    		this.rowdblclick(grid,rowIndex);
    	}
    	
    }
	
});

Ext.reg('loggrid', Ext.ux.LogGrid);
