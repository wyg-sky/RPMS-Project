/**
 * 设备列表
 * config: {
 * 	   superTabPanel ：'设备管理顶级容器的引用'
 * }
 */
AccidentGridPanel = function(config){
	Ext.apply(this,config);
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'accid/listAccidents.html',
			method : 'post'
		}),
		baseParams : {
			limit : 20
		},
		reader : new Ext.data.JsonReader({
			root : 'root',
			totalProperty : 'total',
			successProperty : 'success'
			}, [{
				name : 'id'
			}, {
				name : 'accid_name'
			}, {
				name : 'accid_dept_cd.id',
				mapping : 'accid_dept_cd',
				convert : function(v){
					//if(v&&v.id&&v.name){
					if(v&&v.name){
						return v.name;//{value:v.id,text:v.name};
					}else {
						return {};
					}
				}
			}, {
				name : 'location_cd'
			}, {
				name : 'happen_time',
				type : 'date',
				dateFormat : 'Y-m-d H:i:s'
			}, {
				name : 'accid_type_cd',
				mapping : 'accid_type_cd',
					convert : function(v){
						if(v==1){
							return "一级";
						}else if(v==2){
							return "二级";
						}else if(v==3){
							return "三级";
						}else if(v==4){
							return "四级";
						}else {
							return "五级";
						}
					}
			}, {
				name : 'accid_level_cd',
				mapping : 'accid_level_cd',
					convert : function(v){
						if(v==1){
							return "一级";
						}else if(v==2){
							return "二级";
						}else if(v==3){
							return "三级";
						}else if(v==4){
							return "四级";
						}else {
							return "五级";
						}
					}
			}, {
				name : 'accid_content'
			}, {
				name : 'dead_count'
			}, {
				name : 'stop_prod_minutes'
			}, {
				name : 'create_user_cd'
			}, {
				name : 'sinju_count'
			}, {
				name : 'ginju_count'
			}, {
				name : 'direct_loss'
			}, {
				name : 'indirect_loss'
			}, {
				name : 'origin_substance'
			}, {
				name : 'direct_reason'
			}, {
				name : 'indirect_reason'
			}, {
				name : 'accid_lesson'
			}, {
				name : 'prevent_measure'
			}, {
				name : 'fine_amount'
			}, {
				name : 'create_user_cd'
			}, {
				name : 'create_time',
				type : 'date',
				dateFormat : 'Y-m-d H:i:s'
			}, {
				name : 'update_time',
				type : 'date',
				dateFormat : 'Y-m-d H:i:s'
			}])
		});
	
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel([sm, {
			header : '',
			dataIndex : 'id',
			hidden : true
		}, 
	{
		header : '事故名称',
		sortable : true,
		dataIndex : 'accid_name'
	}, {
		header : '部门名称',
		sortable : true,
		dataIndex : 'accid_dept_cd.id'
	}, {
		header : '事故类型',
		sortable : true,
		dataIndex : 'accid_type_cd'
	}, {
		header : '事故等级',
		sortable : true,
		dataIndex : 'accid_level_cd'
	}, {
		header : '死亡人数',
		sortable : true,
		
		dataIndex : 'dead_count'
	}, {
		header : '重伤人数',
		sortable : true,
		dataIndex : 'sinju_count'
	}, {
		header : '轻伤人数',
		sortable : true,
		dataIndex : 'ginju_count'
	}, {
		header : '发生时间',
		sortable : true,
		dataIndex : 'happen_time',
		renderer : Ext.util.Format.dateRenderer('Y-m-d')
	}]);
	
	AccidentGridPanel.superclass.constructor.call(this, {
		title : '事故列表',
		sm : sm,
		cm : cm,
		store : store,
		loadMask : true,
		height : 350,
		viewConfig : {
			forceFit : true
		},
		bbar : new Ext.PagingToolbar({
			store : store,
			pageSize : 20,
			displayInfo : true,
			displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
			emptyMsg : '没有记录'
		})
    });
    store.load();
    this.on('rowdblclick', function( grid ,rowIndex, e ){  
    	var id = grid.store.getAt(rowIndex).get('id');
    	this.viewAccident(id);
    },this);
    this.on('rowcontextmenu',function(grid, rowIndex, e) {
    	e.preventDefault();
		var record = grid.store.getAt(rowIndex);
		var id = record.get("id");
		var rightClickMenu = new Ext.menu.Menu({
			items : [{
				text : "查看",
				iconCls : "view-icon",
				handler : function() {
					this.viewAccident(id);
				},
				scope : this
			}, '-',{
				text : "编辑",
				iconCls : "modify-icon",
				handler : function() {
					this.editAccident(id);
				},
				scope : this
			}, '-', {
				text : "删除",
				iconCls : "delete-icon",
				handler : function() {
					this.deleteAccident(id);
				},
				scope : this
		    }]
		});
		rightClickMenu.showAt(e.getXY());
	}, this);
};

Ext.extend(AccidentGridPanel, Ext.grid.GridPanel,{
	/**
	 * 新增一个事故记录
	 */
	addAccident : function(){
		Ext.lion.ScriptLoader('bp/accident/scripts/AccidentAOEFormPanel.js',false);
		var eqAOEFormPanel = new AccidentAOEFormPanel({
			title : '新增事故',
			accidentGridPanel : this
		});
		this.superTabPanel.add(eqAOEFormPanel);
		this.superTabPanel.activate(eqAOEFormPanel);
		eqAOEFormPanel.doLayout();
	},
	
	/**
	 * 查看一个事故数据
	 */
	viewAccident : function(id) {
		Ext.lion.ScriptLoader('bp/accident/scripts/AccidentViewPanel.js',false);
		var accidentViewPanel = new AccidentViewPanel({
			accidentId : id
		});
		this.superTabPanel.add(accidentViewPanel);
		this.superTabPanel.activate(accidentViewPanel);
		accidentViewPanel.doLayout();
		accidentViewPanel.loadFormData({id : id});
	},	
	
	/**
	 * 编辑一个事故数据
	 */
	editAccident : function(id){
		Ext.lion.ScriptLoader('bp/accident/scripts/AccidentAOEFormPanel.js',false);
		var eqAOEFormPanel = new AccidentAOEFormPanel({
			title : '编辑事故',
			accidentId : id,
			accidentGridPanel : this
		});
		this.superTabPanel.add(eqAOEFormPanel);
		this.superTabPanel.activate(eqAOEFormPanel);
		eqAOEFormPanel.doLayout();
		eqAOEFormPanel.loadFormData({id : id});
	},
	
	/**
	 * 根据id删除单个事故数据
	 */
	deleteAccident : function(id){
		var m = Ext.MessageBox.confirm("提示", "确定要删除此设备数据吗？",
			function(ret) {
				if (ret == 'yes') {
					Ext.Ajax.request({
						url : 'accid/deleteAccident.html',
						method : 'post',
						params : {id : id},
						scope : this,
						success : function(response,options) {
							if (response.responseText == "success") {
								//Ext.Msg.alert("提示",'删除成功！')--此行可有可无，删除成功后默认不提示可删除此行代码
								this.store.reload();
							} else if (response.responseText == "protected"){
								Ext.MessageBox.show({
									title : '失败',
									msg : '删除失败，存在与其关联的其他数据！<br>',
									buttons : Ext.MessageBox.OK,
									fn : function(){},
									icon : Ext.MessageBox.WARNING,
									scope : this
								});
							}
						},
						failure : function() {
							Ext.MessageBox.show({
								title : '失败',
								msg : '删除失败 !<br>',
								buttons : Ext.MessageBox.OK,
								fn : function(){},
								icon : Ext.MessageBox.ERROR,
								scope : this
							});
						}
					});
				}
			},this
		);
	},
		
	/**
	 * 根据ids删除多个事故数据
	 */
	deleteAccidents : function(){
		var rowselects = this.getSelectionModel().getSelections();
		if (rowselects.length <= 0){
			Ext.MessageBox.alert("提示", "请选择要删除的设备数据！");
			return ;
		}
		var ids = '';
		for (var i = 0; i < rowselects.length; i++) {
			ids += rowselects[i].get('id') + ",";
		}
		ids = ids.substring(0, ids.length- 1);
		var m = Ext.MessageBox.confirm("提示", "确定要删除这些设备数据吗？",
			function(ret) {
				if (ret == 'yes') {
					Ext.Ajax.request({
						url : 'accid/deleteAccidents.html',
						method : 'post',
						params : {ids : ids},
						scope : this,
						success : function(response,options) {
							if (response.responseText == "success") {
								//Ext.Msg.alert("提示",'删除成功！')--此行可有可无，删除成功后默认不提示可删除此行代码
								this.store.reload();
							} else if (response.responseText == "protected"){
								Ext.MessageBox.show({
									title : '失败',
									msg : '删除失败，存在与其关联的其他数据！<br>',
									buttons : Ext.MessageBox.OK,
									fn : function(){},
									icon : Ext.MessageBox.WARNING,
									scope : this
								});
							}
						},
						failure : function() {
							Ext.MessageBox.show({
								title : '失败',
								msg : '删除失败 !<br>',
								buttons : Ext.MessageBox.OK,
								fn : function(){},
								icon : Ext.MessageBox.ERROR,
								scope : this
							});
						}
					});
				}
			},this
		);
	}
});