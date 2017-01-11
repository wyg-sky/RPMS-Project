/**
 * 废弃。。。该面板功能包含在BpProblemView.js中
 * 已知错误查看面板
 */
KeViewPanel=function(){
	this.mainTabPanel = new Ext.Panel({
		layout : 'border',
		title : $lang('bp.waiting'),
		hideMode : 'offsets'
	});
	
	this.mainTabCenterPanel = new Ext.Panel({
		layout : 'fit',
		tabTip : 'none',
		split : true,
		animCollapse : false,
		border : false,
		region : 'center',
		autoScroll : true,
		hidden : false
	});
	
	KeViewPanel.superclass.constructor.call(this, {
		id : 'maincenterpanel',
		activeTab : 0,
		region : 'center',
		margins : '0 0 0 0',
		resizeTabs : true,
		border : true,
		tabWidth : 150,
		minTabWidth : 100,
		enableTabScroll : true,
		plugins: new Ext.ux.TabCloseMenu()
	});
	this.add(this.mainTabPanel);
    this.mainTabPanel.add(this.mainTabCenterPanel);
}

Ext.extend(KeViewPanel, Ext.TabPanel, {
	
	loadData : function(node){
		
		var grid = new GridPanel(this, {
			//plugins : expander,
            border : false,
			tbar : [{
				text : $lang('bp.add'),
				iconCls : 'create-icon',
				handler : this.createKnownError,
				scope : this
			}, '-', {
				text : $lang('bp.deleteSelected'),
				xaction: 'bp_ke_delete_m',
				iconCls : 'delete-selected-icon',
				handler : function() {
					var rowselects = sm.getSelections();
					var keIds="";
					if (rowselects.length <= 0)
						Ext.Msg.alert($lang('bp.tips'), $lang('bp.pleaseSelectDeletingCi'));
					else{
						var m = Ext.MessageBox.confirm($lang('bp.tips'),$lang('bp.YesOrNoForDeleted'), function(ret){
							if(ret=='yes'){
								for (i = 0; i < rowselects.length; i++) {
									keIds+=""+ rowselects[i].get('id')+ ",";
								}
								Ext.Ajax.request({
									url : 'bp/removeKnownError.html',
									method : 'POST',
									params : {keIds : keIds},
									success : function(response, options){
										var responseStr = response.responseText;
										if(responseStr=='success'){
											store.reload();
										}else{
											Ext.Msg.alert($lang('bp.failed'),$lang('bp.deleteFailedMsg'));
										}
									}
								});
							}
						});
					}
				}
			}]
		});
	
		this.grid = grid;
		if (this.mainTabCenterPanel.compId) {
			this.mainTabCenterPanel.remove(this.mainTabCenterPanel.compId);
		}
		this.mainTabCenterPanel.compId = grid.getId();
		this.mainTabCenterPanel.add(grid);
		this.mainTabCenterPanel.ownerCt.doLayout();
		
		var store= new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({
				url: node.attributes.url
			}),
			reader: new Ext.data.JsonReader({
				root:'root',
				totalProperty: 'total',
				successProperty: 'success'
			},[
				{name:'id'},
				{name:'code'},
				{name:'symptom'},
				{name:'state', convert: function(c){ if(c=='1')return $lang('bp.stateUsing'); else return $lang('bp.stateDeleted');} },
				{name:'createdBy'},
				{name:'createdOn', type: 'date', dateFormat : 'Y-m-d H:i:s'}
			
			])
		});
		
		var sm = grid.getSelectionModel();
		var cols = new Ext.grid.ColumnModel([
			sm,
			{header:$lang('bp.coding'), dataIndex : "code", sortable: true},
			{header:$lang('bp.state'), dataIndex : "state", sortable: true},
			{header:$lang('bp.symptom'), dataIndex : "symptom", sortable: false, width:300},
			{header:$lang('bp.createdOn'), dataIndex : "createdOn", sortable: true, renderer : Ext.util.Format.dateRenderer('Y年m月d日 H:i:s')}
		
		]);
		
		grid.on('rowdblclick', function(grid, rowIndex, e){//双击显示详细信息
		
			var selectedRow=grid.getSelectionModel().getSelected();
			var id = selectedRow.get("id");
			var code = selectedRow.get("code");
//			var p = Ext.getCmp("maincenterpanel").getComponent('create');
//			if(p)
//	           	Ext.getCmp("maincenterpanel").remove(p);
	    	p = new Ext.Panel({
//				id : 'create',
				title : $lang('bp.details'),
				closable : true,
				autoScroll : true,
				autoLoad : {
					url : 'bp/keViewer.jsp',
					params:{tabpId: "maincenterpanel", keId: id},
					//scope : this,
					scripts : true
				}
			});
	    	Ext.getCmp("maincenterpanel").add(p).show();
		});
		
		grid.on('rowcontextmenu', function(grid, rowIndex, e){ 
		
			var selectedRecordId = grid.store.getAt(rowIndex).get("id");
			var code = grid.store.getAt(rowIndex).get("code");
			
			var rightClickMenu = new Ext.menu.Menu({
				items :[{
				
					text:$lang('bp.rowcontextmenu.view'),
					iconCls: 'browser-icon',
					scope: this,
					handler: function(){
//						var p = this.getComponent('create');
//						if(p)
//				           	this.remove(p);
				    	p = new Ext.Panel({
//							id : 'create',
							title : $lang('bp.details'),
							closable : true,
							autoScroll : true,
							autoLoad : {
								url : 'bp/keViewer.jsp',
								params:{tabpId: "maincenterpanel", keId: selectedRecordId},
								scope : this,
								scripts : true
							}
						});
				    	this.add(p).show();
					}
				},{
				
					text: $lang('common.edit'),
					iconCls:"modify-icon",
					scope: this,
					handler: function(){
//						var win=new KnownErrorEditWin({title: '编辑已知错误', keid: selectedRecordId});
//						win.show();
//						var p = this.getComponent('create');
//						if(p)
//				           	this.remove(p);
				    	p = new Ext.Panel({
//							id : 'create',
							title : $lang('common.edit'),
							closable : true,
							autoScroll : true,
							autoLoad : {
								url : 'bp/keEditor.jsp',
								params:{tabpId: "maincenterpanel", keId: selectedRecordId},
								scope : this,
								scripts : true
							}
						});
				    	this.add(p).show();
					}
				},{
				
					text: $lang('bp.delete'),
					xaction: 'bp_ke_delete_s',
					iconCls : 'delete-selected-icon',
					handler: function(){
						var m = Ext.MessageBox.confirm($lang('bp.tips'),$lang('bp.YesOrNoForDeleted'), function(ret){
							if(ret=='yes'){
								Ext.Ajax.request({
									url : 'bp/removeKnownError.html',
									method : 'POST',
									params : {keIds : selectedRecordId},
									success : function(response, options){
										var responseStr = response.responseText;
										if(responseStr=='success'){
											store.remove(store.getAt(rowIndex));
										}else{
											Ext.Msg.alert($lang('bp.tips'),$lang('bp.deleteFailedMsg'));
										}
									}
								});
							}
						});
					}
				}]
				
			});
			
			e.preventDefault();
			rightClickMenu.showAt(e.getXY());
		}, this);
		
		grid.loadData(store, cols);
		this.mainTabPanel.setTitle(node.attributes.text);
		
		
	},
	
	createKnownError: function(){
		
    	p = new Ext.Panel({
//			id : 'create',
			title : $lang('bp.add'),
			closable : true,
			autoScroll : true,
			autoLoad : {
				url : 'bp/keEditor.jsp',
				params:{tabpId: "maincenterpanel"},
				scope : this,
				scripts : true
			}
		});
    	this.add(p).show();
	}
	

});