/**
 * 通知公告
 * @param {} config
 */
ProjectFileGridPanel = function(config){
	Ext.apply(this,config);
	var gridPanelId = Ext.id();
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'rpms/selectProjectFileLine.html',
			method : 'post'
		}),
		baseParams : {
			limit : 9
		},
		reader : new Ext.data.JsonReader({
			root : 'root',
			totalProperty : 'total',
			successProperty : 'success'
			}, [{
                name : 'id',
				mapping : 0
 	    } ,{
	            name : 'fileName',
				mapping : 2
 	    },{
	            name : 'tileType',
				mapping : 3
 	    },{
	            name : 'fileTime',
				mapping : 4
 	    },{
	            name : 'Status',
				mapping : 8
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
			dataIndex : "fileName",
			width : 160,
			sortable : true,
			header : "文件名"
		}, {
			dataIndex : "tileType",
			width : 90,
			sortable : true,
			header : "文件类型",
			keyType:'rpms_notice_type',
			renderer : function(v) {
				if (v) {
					if(v == '0001'){
						return '项目计划'
					}else if(v == '0002'){
						return '项目报奖'
					}else if(v == '0003'){
						return '项目推广'
					}else{
						return '论文评比'
					}
				}
			}
		}, {
			dataIndex : "fileTime",
			width : 90,
			sortable : true,
			header : "下发时间"
		}, {
			dataIndex : "Status",
			width : 70,
			sortable : true,
			header : "查看状态",
			keyType:'sys_view_status',
			renderer : function(v) {
				if (v) {
					if(v == '0001'){
						return '<font color="red">未读</font>'
					}else{
						return '已读'
					}
				}
			}
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
    
	ProjectFileGridPanel.superclass.constructor.call(this, {
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
    	this.viewProjectFile(id);
    },this);
    
    this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
    	var record = grid.getStore().getAt(rowIndex);
        var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
        var id = record.get("id");
        if (fieldName == 'look') {
            this.viewProjectFile(id);
        }
    }, this); 
};

Ext.extend(ProjectFileGridPanel, Ext.grid.GridPanel,{
	viewProjectFile : function(id) {
		Ext.lion.ScriptLoader('rpms/research/projectfile/ProjectFileManager.js', false);
		new Ext.lion.rpms.ProjectFileManager({
			viewPath : 'rpms/research/projectfile/listshow',
			buttHid : true
		});
	}
});
