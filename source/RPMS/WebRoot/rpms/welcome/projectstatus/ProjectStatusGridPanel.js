/**
 * 通知公告
 * @param {} config
 */
ProjectStatusGridPanel = function(config){
	Ext.apply(this,config);
	var gridPanelId = Ext.id();
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'rpms/listProjectDispatch.html',
			method : 'post'
		}),
		baseParams : {
			limit : 9,
			hql : " and obj.type='0001'"
		},
		reader : new Ext.data.JsonReader({
			root : 'root',
			totalProperty : 'total',
			successProperty : 'success'
			}, [{
                name : 'id',
				mapping : 'id'
	 	    } ,{
	            name : 'projectId.projectName',
				mapping : 'projectId.projectName'
	 	    },{
	            name : 'projectStage',
				mapping : 'projectStage'
	 	    },{
	            name : 'completionRate',
				mapping : 'completionRate'
	 	    } 
			])
		});
	
	var cm = new Ext.grid.ColumnModel([
		{
			dataIndex : "id",
			sortable : true,
			hidden : true,
			header : "唯一标识"
		}, {
			dataIndex : "projectId.projectName",
			width : 190,
			sortable : true,
			header : "项目名称"
		}, {
			dataIndex : "projectStage",
			width : 80,
			sortable : true,
			header : "进度阶段",
			keyType:'rpms_dispatch_stage',
			renderer : function(v) {
				if (v) {
					if(v == '0001'){
						return '方案论证'
					}if(v == '0002'){
						return '小试中试'
					}if(v == '0003'){
						return '现场实施'
					}if(v == '0004'){
						return '效果验证'
					}if(v == '0005'){
						return '成果总结'
					}if(v == '0006'){
						return '完成待鉴定'
					}else{
						return '项目完成'
					}
				}
			}
		}, {
			dataIndex : "completionRate",
			width : 80,
			sortable : true,
			header : "百分比(%)"
		}, {
			header : "查看",
			hidden : true,
			width : 30,
			align : "center",
			sortable : false,
			dataIndex : 'look',
			renderer : function() {
				var lookUrl = "<img src='images/cmdb/sacm-qucikSearch.gif' title='查看'>";
				return lookUrl;
			}
	}]);
    
	ProjectStatusGridPanel.superclass.constructor.call(this, {
	    id : gridPanelId,
		autoScroll : true,
		border : true,
		cm : cm,
		store : store,
		loadMask : true,
		width: '339',
		height : '271',
		viewConfig : {
			forceFit : true
		},
		bbar : new Ext.PagingToolbar({
			store : store,
			pageSize : 5,
			displayInfo : true,
			displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
			emptyMsg : '没有记录'
		})
    });
    store.load();
    this.on('rowdblclick', function( grid ,rowIndex, e ){  
    	var id = grid.store.getAt(rowIndex).get('id');
    	this.viewProjectStatus(id);
    },this);
    
    this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
    	var record = grid.getStore().getAt(rowIndex);
        var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
        var id = record.get("id");
        if (fieldName == 'look') {
            this.viewProjectStatus(id);
        }
    }, this); 
};

Ext.extend(ProjectStatusGridPanel, Ext.grid.GridPanel,{
	viewProjectStatus : function(id) {
	    Ext.lion.ScriptLoader('rpms/research/projectdispatch/ProjectDispatchManager.js', false);
	    new Ext.lion.rpms.ProjectDispatchManager({
	        viewPath : 'rpms/research/projectdispatch/list'
	    });
    }
});
