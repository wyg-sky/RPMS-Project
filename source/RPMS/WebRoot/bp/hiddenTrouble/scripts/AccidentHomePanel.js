/**
 * 设备列表
 * config: {
 * 	   superTabPanel ：'设备管理顶级容器的引用'
 * }
 */
AccidentHomePanel = function(config){
	Ext.apply(this,config);
	
	var accid_name = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '事故名称(包含)',
		name : 'accid_name'
	});
	

	
	
	///////////////////////部门代码测试开始 
      var accid_dept_cd = new Ext.ux.ComboBoxTree({
		fieldLabel : '事故部门',
		name : 'accid_dept_cd',
		hiddenName : 'accid_dept_cd.id',
		anchor:'98%',
		blankText: '-- 请选择部门 --',
		emptyText: '-- 请选择部门 --',
		tree : {
			xtype : 'treepanel',
			loader : new Ext.tree.TreeLoader({dataUrl : 'admin/departmentTree.html'}),
			root : new Ext.tree.AsyncTreeNode({
				id : 'root_department',
				text : '根'
			})
		},
		selectNodeModel:'exceptRoot'
	});
	///////////////////////部门代码测试结束
	
	
	var happen_time1 = new Ext.form.DateField({
    	fieldLabel : '发生时间', 
    	name : 'happen_time1', 
    	anchor : '98%',
    	format : 'Y-m-d',
    	width:30,
    	readOnly : true,
    	vtype : 'daterange'

    });
    
    var happen_time2 = new Ext.form.DateField({
    	fieldLabel : '至', 
    	name : 'happen_time2', 
    	anchor : '98%',
    	format : 'Y-m-d',
    	readOnly : true,
    	vtype : 'daterange'

    });
	
	
	
	var dead_count = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '死亡人数(等于)',
		name : 'dead_count'
	});
	
	
	//var sinju_count = new Ext.form.TextField({
	//	anchor : '98%',
	//	fieldLabel : '重伤人数(等于)',
	//	name : 'sinju_count'
	//});
	
	var queryConditionsSet = new Ext.form.FieldSet({
		title : '查询条件',
		layout : 'column',
		autoHeight : true,
		defaults : {
			border : false,
			layout : "form"
		},
		items : [{
			columnWidth : 0.25,
			border : false,
			layout : 'form',
			labelWidth : 90,
			items : [accid_name]
		},{
			columnWidth : 0.22,
			border : false,
			layout : 'form',
			labelWidth : 60,
			items : [accid_dept_cd.id]
		}
		,{
			columnWidth : 0.20,
			border : false,
			layout : 'form',
			labelWidth : 60,
			items : [happen_time1]
		},{
			columnWidth : 0.16,
			border : false,
			layout : 'form',
			labelWidth : 20,
			items : [happen_time2]
		}
		,{
			columnWidth : 0.15,
			border : false,
			layout : 'form',
			labelWidth : 90,
			items : [dead_count]
		}]
	});
	
	this.queryConditionsForm = new Ext.form.FormPanel({
		border : false,
		items : [queryConditionsSet]
	})
	
	Ext.lion.ScriptLoader('bp/accident/scripts/AccidentGridPanel.js',false);
	this.accidentGridPanel = new AccidentGridPanel({
		superTabPanel : this.superTabPanel
	});
	
	
	AccidentHomePanel.superclass.constructor.call(this, {
		title : '事故管理',
		layout : 'form',
		bodyStyle : 'padding:5px 5px 5px 5px',
		items : [this.queryConditionsForm,this.accidentGridPanel],
		tbar : ['->',{
			text : '查询',
			iconCls : 'search-icon',
			handler : this.queryAccident,
			scope : this
		},{
			text : '清空',
			iconCls : 'reset-icon',
			handler : this.resetQueryConditions,
			scope : this
		},{
			text : '新增',
			iconCls : 'create-icon',
			handler : this.addAccident,
			scope : this
		}, '-', {
			text : '删除选中项',
			iconCls : 'delete-selected-icon',
			handler : this.deleteAccidents,
			scope : this
		}, '-', {
					text : '隐藏',/* 隐藏 */
					iconCls : 'hide-icon',
					scope : this,
					handler : function() {
						queryConditionsSet.hide();
						//this.ownerCt.ownerCt.doLayout();
					}
				}, '-', {
					text : '显示',/* 显示 */
					//iconCls : 'show-icon',
					scope : this,
					handler : function() {
						queryConditionsSet.show();
						//this.ownerCt.ownerCt.doLayout();
					}
				}]
    });
};

Ext.extend(AccidentHomePanel, Ext.Panel,{
	/**
	 * 查询设备
	 */
	queryAccident : function(){
		var params = this.queryConditionsForm.getForm().getValues();
		Ext.apply(this.accidentGridPanel.store.baseParams,params);
		this.accidentGridPanel.store.reload();
	},
	
	/**
	 * 重置查询条件
	 */
	resetQueryConditions : function(){
		this.queryConditionsForm.getForm().reset();
	},
	
	/**
	 * 新增一条事故
	 */
	addAccident : function(){
		this.accidentGridPanel.addAccident();
	},
	
	/**
	 * 根据ids删除多个设备数据
	 */
	deleteAccidents : function(){
		this.accidentGridPanel.deleteAccidents();
	}
});