TroubleSearchForm = function(config) {
	Ext.apply(this, config);

	TroubleSearchForm.superclass.constructor.call(this, {
		border : false,
		hidden : false,
		height : 150,
		layout : 'column',
		items : [{
			layout : 'form',
			columnWidth : 0.25,
			border : false,
			bodyStyle : 'padding: 5px 0 0 12px',
			height : '100%',
			viewConfig : { forceFit : true },
			items : [{
				xtype : 'combotree',
				fieldLabel : '被检部门',
				hiddenName : 'checkedDept',
				anchor : '98%',
				autoLoad : false,
				blankText : '请选择部门 ',
				emptyText : '请选择部门 ',
				tree : {
					xtype : 'treepanel',
					loader : new Ext.tree.TreeLoader({
						dataUrl : "run/requestData.html?actionCode=department_tree"
					}),
					root : new Ext.tree.AsyncTreeNode({
						id : '0',
						text : '请选择部门 '
						})
				},
				selectNodeModel : 'all'
			}, {
	            xtype : "combowindow",
	            name : "troubleMan",
	            fieldLabel : "整改责任人",
	            hiddenName : "troubleMan",
	            displayField : "xingMing",
	            valueField : "id",
	            allowBlank : true,
	            anchor : "98%",
	            store : this.getComboWinStore(),
	            cm : this.getComboWinCm(),
	            singleSelect : true,
	            searchCondition : [['xingMing','姓名','string'],['username','账号','string'],['code','员工编号','string']]
          }, {
            xtype : "combotree",
            fieldLabel : "检查地点",
            anchor : "98%",
            triggerAction : "all",
            rootVisible : false,
            dataUrl : "",
            displayField : "text",
            valueField : "id",
            treeRootText : "请选择...",
            name : "place"
          },{
				xtype : 'datefield',
				fieldLabel : '检查时间从',
				format : 'Y-m-d',
				width : '98%',
				anchor : '98%'
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
			            hiddenName : "checkMan",
			            displayField : "xingMing",
			            valueField : "id",
			            allowBlank : true,
			            anchor : "98%",
			            store : this.getComboWinStore(),
			            cm : this.getComboWinCm(),
			            singleSelect : true,
			            searchCondition : [['xingMing','姓名','string'],['username','账号','string'],['code','员工编号','string']]
					}, {
			            xtype : "combo",
			            emptyText : "请选择 ... ",
			            anchor : "98%",
			            mode : "remote",
			            triggerAction : "all",
			            fieldLabel : "隐患等级",
			            store : new Ext.data.Store({
			            	id:'ht_level',
			            	proxy:new Ext.data.HttpProxy({"url":"run/requestMenu.html"}),
			            	baseParams:{"menuCodes":"ht_level"},
			            	reader:new Ext.data.JsonReader({
								root : "ht_level",
								totalProperty : "total",
								successProperty : "success",
								fields : [
									{  mapping : "id", name : "id"  },
									{  mapping : "text", name : "text" }
								]
							})
						}),
			            valueField : "id",
			            displayField : "text",
			            editable : false,
			            name : "troubleLevel"
					}, {
						xtype : 'combo',
						fieldLabel : '隐患是否有效',
						anchor : '98%'
					},{
						xtype : 'datefield',
						fieldLabel : '到',
						format : 'Y-m-d',
						width : '98%',
						anchor : '98%'
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
				xtype : 'textfield',
				fieldLabel : '罚款金额',
				tabIndex : 6,
				anchor : '98%'
			}, {
				xtype : 'textfield',
				fieldLabel : '扣分',
				anchor : '98%'
			}, {
				xtype : 'combo',
				fieldLabel : '班次',
				anchor : '98%'
			}]
		},{
			layout : 'form',
			columnWidth : 0.248,
			border : false,
			bodyStyle : 'padding: 5px 0 0 12px',
			height : '100%',
			labelWidth : 20,
			viewConfig : {
				forceFit : true
			},
			items : [{
				xtype : 'textfield',
				fieldLabel : '到',
				anchor : '78%'
			}, {
				xtype : 'textfield',
				fieldLabel : '到',
				anchor : '78%'
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

Ext.extend(TroubleSearchForm, Ext.form.FormPanel, {
	sumbitSearch : function() {
		var vs = this.form.getValues();
//		this.grid.loadData('cmdb/ciSearch.html', vs);
//		alert('search');
		var win = new Ext.Window({
			title : '测试',
			width : 600,
			height: 480,
			modal : true,
			resizable: false,
			layout : 'border',
			items : [{
				region : 'west',
				xtype : 'panel',
				width : 200,
				collapsible : true,
				collapseMode : 'mini',
				title : 'west',
				split : true,
				html : '当前grid的数据条数为'+this.grid.getStore().getTotalCount()
			},{
				region : 'center',
				xtype : 'panel',
				title : 'center',
				html : '这些数据的状态分别为:<br/>'+this.grid.getStore().collect('bpState')
			}]
		});
		
		win.show();
//		this.grid.getStore().reload();
	},
	
	getComboWinCm : function(){
		return new Ext.grid.ColumnModel([
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
		]);
	},
	
	getComboWinStore : function(){
		return new Ext.data.Store({
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
		});
	}
});