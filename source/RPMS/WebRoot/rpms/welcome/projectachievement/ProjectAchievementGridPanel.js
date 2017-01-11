/**
 * 通知公告
 * @param {} config
 */
ProjectAchievementGridPanel = function(config){
	Ext.apply(this,config);
	var gridPanelId = Ext.id();
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'rpms/listResearchAchievement.html',
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
				mapping : 'id'
 	    } ,{
                name : 'achievementNum',
                mapping : 'achievementNum'
        },{
	            name : 'achievementName',
				mapping : 'achievementName'
 	    },
 	    	/*{
	            name : 'grade',
				mapping : 'grade'
 	    },*/
 	    	{
                name : 'type',
                mapping : 'type'
        },{
	            name : 'achievementLevel',
				mapping : 'achievementLevel'
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
            dataIndex : "achievementNum",
            width : 100,
            sortable : true,
            header : "成果编号"
        }, {
			dataIndex : "achievementName",
			width : 190,
			sortable : true,
			header : "成果名称"
		},
		/*{
			dataIndex : "grade",
			width : 80,
			sortable : true,
			header : "鉴定级别",
			keyType:'rpms_grade',
			renderer : function(v) {
				if (v) {
					if(v == '0001'){
						return '国际级'
					}else if(v == '0002'){
						return '国家级'
					}else if(v == '0003'){
						return '省部级'
					}else if(v == '0004'){
						return '行业级'
					}else if(v == '0005'){
						return '地市级'
					}else if(v == '0006'){
						return '山能集团级'
					}else if(v == '0007'){
						return '集团公司级'
					}else {
						return '公司级'
					}
				}
			}
		}, */
			{
            dataIndex : "type",
            width : 80,
            sortable : true,
            header : "成果类型",
            keyType:'rpms_acceptance_type',
            renderer : function(v) {
                if (v) {
                    if(v == '0001'){
                        return '评议验收'
                    }else if(v == '0002'){
                        return '鉴定验收'
                    }
                }
            }
        },{
			dataIndex : "achievementLevel",
			width : 80,
			sortable : true,
			header : "成果水平",
			keyType:'rpms_achievement_level',
			renderer : function(v) {
				if (v) {
					if(v == '0001'){
						return '国际领先'
					}else if(v == '0002'){
						return '国际先进'
					}else if(v == '0003'){
						return '国内领先'
					}else {
						return '国内先进'
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
    
	ProjectAchievementGridPanel.superclass.constructor.call(this, {
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
    	this.viewProjectAchievement(id);
    },this);
    
    this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
    	var record = grid.getStore().getAt(rowIndex);
        var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
        var id = record.get("id");
        if (fieldName == 'look') {
            this.viewProjectAchievement(id);
        }
    }, this); 
};

Ext.extend(ProjectAchievementGridPanel, Ext.grid.GridPanel,{
	viewProjectAchievement : function(id) {
		Ext.lion.ScriptLoader('rpms/research/researchachievement/ResearchAchievementManager.js', false);
		new Ext.lion.rpms.ResearchAchievementManager({
			viewPath : 'rpms/research/researchachievement/list'
		});
	}
});
