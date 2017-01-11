NewsSearchForm = function(config) {
	Ext.apply(this, config);
	NewsSearchForm.superclass.constructor.call(this, {
		border : false,
		hidden : false,
		height : 60,
		layout : 'column',
		items : [{
			layout : 'form',
			columnWidth : 0.25,
			border : false,
			bodyStyle : 'padding: 5px 0 0 12px',
			height : '100%',
			viewConfig : { forceFit : true },
			items : [{
				xtype : 'textfield',
				fieldLabel : '标题'
			}]
		}, {
			layout : 'form',
			columnWidth : 0.25,
			border : false,
			bodyStyle : 'padding: 5px 0 0 12px',
			height : '100%',
			viewConfig : {
				forceFit : true
			},
			items : [{
			            xtype : "combowindow",
			            name : "troubleMan",
			            fieldLabel : "检查人",
			            hiddenName : "troubleMan",
			            displayField : "xingMing",
			            valueField : "id",
			            allowBlank : true,
			            anchor : "98%",
			            store : new Ext.data.Store({
			            	proxy:new Ext.data.HttpProxy({"url":"admin/users!listForWin.html"}),
			            	baseParams:{},
			            	reader:new Ext.data.JsonReader({
								totalProperty : "total",
								root : "root",
								fields : [{
								    name : "id"
								  },{
								    name : "username"
								  },{
								    name : "code"
								  },{
								    name : "xingMing"
								  },{
								    name : "department",
								    mapping : "department",
								    convert : function (v) {     if (v && v.name) {         return v.name;     } else {         return '';     } }
								  },{
								    name : "jobTitle",
								    mapping : "jobTitle",
								    convert : function (v) {     if (v && v.name) {         return v.name;     } else {         return '';     } }
								  },{
								    name : "phone"
								  },{
								    name : "mobile"
								  },{
								    name : "email"
								  }]
							})
						}),
			            cm : new Ext.grid.ColumnModel([
			            	new Ext.grid.RowNumberer(),
			            	new Ext.grid.CheckboxSelectionModel(),
			            	{
								header : "ID", 		dataIndex : "id", 	hidden : true, 	sortable : false
							},{
								header : "姓名", 	sortable : true, dataIndex : "xingMing"
							},{
								header : "账号", 	sortable : true, dataIndex : "username"
							},{
								header : "员工编号", sortable : true, dataIndex : "code"
							},{
								header : "部门", 	sortable : true, dataIndex : "department"
							},{
								header : "职位", 	sortable : true, dataIndex : "jobTitle"
							},{
								header : "电话", 	hidden : true, sortable : true, dataIndex : "phone"
							},{
								header : "手机", 	hidden : true, sortable : true, dataIndex : "mobile"
							},{
								header : "Email", 	hidden : true, sortable : true, dataIndex : "email"
							}
						]),
			            singleSelect : true,
			            searchCondition : [['xingMing','姓名','string'],['username','账号','string'],['code','员工编号','string']]
					}]
		}],
		bbar : ['->', {
					text : $lang('cmdb.button.query'),/* 查询 */
					iconCls : 'search-icon',
					scope : this,
					handler : function() {
						this.sumbitSearch();
					}
				}, '-', {
					text : $lang('cmdb.button.reset'),/* 重置 */
					iconCls : 'reset-icon',
					scope : this,
					handler : function() {
						this.form.reset();
					}
				}, '-', {
					text : $lang('cmdb.button.hide'),/* 隐藏 */
					iconCls : 'hide-icon',
					scope : this,
					handler : function() {
						this.centerPanel.show();
						this.hide();
						this.ownerCt.setHeight(28);
						this.ownerCt.ownerCt.doLayout();
					}
				}]
	});
};

Ext.extend(NewsSearchForm, Ext.form.FormPanel, {
	sumbitSearch : function() {
		var win = new Ext.Window({
			title : '查询',
			width : 600,
			height : 400,
			modal  : true,
			resizable : false,
			layout : 'border',
			items : [{
				xtype : 'panel',
				title: 'West Panel',
		        region:'west',
		        width : 240,
		        collapsible : 'true',
		        collapseMode : 'mini',
		        split : 'true',
		        html : this.grid.getStore().getTotalCount() 
	    	},{
	    		xtype : 'panel',
		        title: 'Main Content',
		        region:'center',
		        collapsible : 'true',
		        html : this.grid.getStore().collect('bpState')
		    }]
		});
		win.show();
		var vs = this.form.getValues();
		this.grid.loadData('cmdb/ciSearch.html', vs);
	}
});