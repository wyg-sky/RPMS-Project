/**
 *  事故添加/编辑页面
 * config: {
 * 		superTabPanel : 事故管理的顶级容器页面，
 * 		accidentGridPanel : 事故列表,
 * 		accidentId : 事故记录的id
 * }
 */
AccidentAOEFormPanel = function(config){
	Ext.apply(this,config);
	
	var id_hidden = new Ext.form.Hidden({
		name :'accident.id'
	});
	
	var accid_name = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '事故名称',
		allowBlank : false,
		maxLength : 50,
		name : 'accident.accid_name'
	});
	
	var accid_title = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '事故记录标题',
		allowBlank : false,
		name : 'accident.accid_title'
	});
	
	///////////////////////部门代码测试开始 
      var accid_dept_cd = new Ext.ux.ComboBoxTree({
		allowBlank : false,
		fieldLabel : '事故部门',
		name : 'accident.accid_dept_cd',
		hiddenName : 'accident.accid_dept_cd.id',
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
	
	
	var create_user_cd = new Ext.form.TextField({
		anchor : '98%',
		//allowBlank : false,
		fieldLabel : '录入人',
		allowBlank : false,
		name : 'accident.create_user_cd'
	});
	
	var location_cd = new Ext.form.TextField({
		anchor : '98%',		
		fieldLabel : '事故发生地点',
		allowBlank : false,
		name : 'accident.location_cd'
		
	});
	
	var happen_time = new Ext.form.DateField({
    	fieldLabel : '事故发生时间', 
    	name : 'accident.happen_time', 
    	anchor : '98%',
    	format : 'Y-m-d',
    	allowBlank : false,
    	readOnly : true,
    	vtype : 'daterange'

    });
	
    ////////////事故类型代码开始 
		var accid_type_cd = new Ext.form.TextField({
			anchor : '98%',
			fieldLabel : '事故类型',
			allowBlank : false,
			name : 'accident.accid_type_cd'
		});	
	///////////事故类型代码结束
	
	//////////////事故类型代码测试开始 

	
	//////////////事故类型代码测试结束
      
	var accid_level_cd = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '事故等级',
		allowBlank : false,
		name : 'accident.accid_level_cd'
	});
	
	
	var dead_count = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '死亡人数',
		allowBlank : false,
		name : 'accident.dead_count'
	});
	
	var sinju_count = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '重伤人数',
		allowBlank : false,
		name : 'accident.sinju_count'
	});

	var ginju_count = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '轻伤人数',
		allowBlank : false,
		name : 'accident.ginju_count'
	});
	
	var direct_loss = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '直接经济损失',
		allowBlank : false,
		name : 'accident.direct_loss' 
	});
	
	var indirect_loss = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '间接经济损失',
		allowBlank : false,
		name : 'accident.indirect_loss'
	});
	
	var fine_amount = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '事故罚款金额',
		allowBlank : false,
		name : 'accident.fine_amount'
	});
	
	
	var stop_prod_minutes = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '停产时长(分钟)',
		allowBlank : false,
		name : 'accident.stop_prod_minutes'
	});
	
	var create_time = new Ext.form.DateField({
    	fieldLabel : '首次录入时间', 
    	name : 'accident.create_time', 
    	anchor : '98%',
    	format : 'Y-m-d',
    	allowBlank : false,
    	readOnly : true,
    	vtype : 'daterange'

    });
    
    var update_time = new Ext.form.DateField({
    	fieldLabel : '最后更新时间', 
    	name : 'accident.update_time', 
    	anchor : '98%',
    	format : 'Y-m-d',
    	readOnly : true,
    	vtype : 'daterange'

    });
	

	var accid_content = new Ext.form.TextArea({
		name : 'accident.accid_content',
		fieldLabel : '事故经过',
		allowBlank : true,
		anchor : '98%',
		maxLength : 1000,
		height : 80
	});
	

	
	var origin_substance = new Ext.form.TextArea({
		name : 'accident.origin_substance',
		fieldLabel : '起因物',
		allowBlank : true,
		anchor : '98%',
		maxLength : 1000,
		height : 80
	});
	
	
	var direct_reason = new Ext.form.TextArea({
		name : 'accident.direct_reason',
		fieldLabel : '直接原因',
		allowBlank : true,
		anchor : '98%',
		maxLength : 1000,
		height : 80
	});
	
	
	var indirect_reason = new Ext.form.TextArea({
		name : 'accident.indirect_reason',
		fieldLabel : '间接原因',
		allowBlank : true,
		anchor : '98%',
		maxLength : 1000,
		height : 80
	});

	var accid_lesson = new Ext.form.TextArea({
		name : 'accident.accid_lesson',
		fieldLabel : '事故教训',
		allowBlank : true,
		anchor : '98%',
		maxLength : 1000,
		height : 80
	});
	
	var prevent_measure = new Ext.form.TextArea({
		name : 'accident.prevent_measure',
		fieldLabel : '预防措施',
		allowBlank : true,
		anchor : '98%',
		maxLength : 1000,
		height : 80
	});
	

	
	var basicInfo = new Ext.form.FieldSet({
		title : '基本信息',
		layout : 'column',
		autoHeight : true,
		defaults : {
			border : false,
			layout : "form",
			labelWidth : 105
		},
		items : [{
			columnWidth : 0.33,
			border : false,
			layout : 'form',
			items : [id_hidden,accid_name,accid_title,accid_dept_cd,happen_time,location_cd]	
		},{
			columnWidth : 0.32,
			border : false,
			layout : 'form',
			items : [accid_type_cd,accid_level_cd,create_time,stop_prod_minutes,fine_amount]
		}
		,{
			columnWidth : 0.33,
			border : false,
			layout : 'form',
			items : [dead_count,ginju_count,sinju_count,indirect_loss,direct_loss]
		}
		,{
			columnWidth : 0.99,
			border : false,
			layout : 'form',
			items : [accid_content,origin_substance,direct_reason,indirect_reason,accid_lesson,prevent_measure]
		}
		]
	});
		
	AccidentAOEFormPanel.superclass.constructor.call(this, {
		autoWidth : true,
		autoHeight : false,
		autoScroll : true,
		closable : true,
		title : this.title?this.title:'新增事故',
		bodyStyle : 'padding:5px 5px 5px 5px',
		tbar : ['->',{
			text : '保存',
			iconCls : 'save-icon',
			handler : this.saveAccident,
			scope : this
		},{
			text : '重置',
			iconCls : 'reset-icon',
			handler : this.resetForm,
			scope : this
		}, {
			text : '关闭',
			iconCls : 'close-icon',
			handler : function(){
				this.ownerCt.remove(this,true);
			},
			scope : this
		}],
		items : [basicInfo],
		reader : new Ext.data.JsonReader({
			totalProperty : "total",
			root : "root",
			fields : [{
				name : "accident.id",
				mapping : 'id'
			}, {
				name : "accident.accid_name",
				mapping : 'accid_name'
			},  {
				name : "accident.accid_title",
				mapping : 'accid_title'
			}
			, {				
				name : "accident.accid_dept_cd.id",
				mapping : 'accid_dept_cd',
				convert : function(v){
					if(v&&v.id&&v.name){
						return {value:v.id,text:v.name}
					}else {
						return {};
					}
				}				
			}
			, {
				name : "accident.accid_user_cd",
				mapping : 'accid_user_cd'
			}, {
				name : "accident.accid_type_cd",
				mapping : 'accid_type_cd'
			}, {
				name : "accident.accid_level_cd",
				mapping : 'accid_level_cd'
			}, {
				name : "accident.location_cd",
				mapping : 'location_cd'
			}, {
				name : "accident.happen_time",
				mapping : 'happen_time',
				convert : function(v){
					if(v){
						return Date.parseDate(v,'Y-m-d H:i:s');
					}
				}
			}, {
				name : "accident.dead_count",
				mapping : 'dead_count'
			}, {
				name : "accident.sinju_count",
				mapping : 'sinju_count'
			}, {
				name : "accident.ginju_count",
				mapping : 'ginju_count'
			}, {
				name : "accident.direct_loss",
				mapping : 'direct_loss'
			}, {
				name : "accident.indirect_loss",
				mapping : 'indirect_loss'
			}, {
				name : "accident.stop_prod_minutes",
				mapping : 'stop_prod_minutes'
			}
			, {
				name : "accident.fine_amount",
				mapping : 'fine_amount'
			}, {
				name : "accident.accid_content",
				mapping : 'accid_content'
			}
			, {
				name : "accident.origin_substance",
				mapping : 'origin_substance'
			}, {
				name : "accident.direct_reason",
				mapping : 'direct_reason'
			}, {
				name : "accident.indirect_reason",
				mapping : 'indirect_reason'
			}, {
				name : "accident.accid_lesson",
				mapping : 'accid_lesson'
			}, {
				name : "accident.prevent_measure",
				mapping : 'prevent_measure'
			}, {
				name : "accident.create_time",
				mapping : 'create_time',
				convert : function(v){
					if(v){
						return Date.parseDate(v,'Y-m-d H:i:s');
					}
				}
			}, {
				name : "accident.update_time",
				mapping : 'update_time',
				convert : function(v){
					if(v){
						return Date.parseDate(v,'Y-m-d H:i:s');
					}
				}
			}]
		})
	});
};


Ext.extend(AccidentAOEFormPanel, Ext.form.FormPanel,{
	/**
	 * 重置表单
	 */
	resetForm : function(){
		if(this.initValues){
			this.form.setValues(this.initValues);
		}else{
			this.form.reset();
		}
	},
	
	/**
	 * 提交form表单，保存事故的基本信息
	 */
	saveAccident : function(){
		if (this.form.isValid()) {
			this.form.submit({
				url : 'accid/editAccident.html',
				method : 'post',
				scope : this,
				waitTitle : '请稍候',
				waitMsg : '处理中...',
				success : function(form, action) {
					this.accidentGridPanel.store.reload();
					this.ownerCt.remove(this,true);
				},
				failure : function(form, action) {
					var json = Ext.util.JSON.decode(action.response.responseText || "{}");
					Ext.MessageBox.show({
						title : '失败',
						msg : '保存失败!<br>',
						buttons : Ext.MessageBox.OK,
						fn : function(){},
						icon : Ext.MessageBox.ERROR,
						scope : this
					});
				}
			});
		}
	},
	
	/**
	 * 为表单加载数据
	 */
	loadFormData : function(params){
		this.form.load({
			url : 'accid/loadAccident.html',
			params : params,
			waitTitle : '请稍候',
			waitMsg : '加载中...',
			scope : this,
			success : this.formLoadSuccess,
			failure : this.formLoadFailure
		});
	},
	
	/**
	 * 加载数据成功后执行的回调方法，此处可用于完成相关回调逻辑
	 * 此方法中完成了将表单加载回来的数据保存在initValue中，initValue在表单重置时使用。
	 */
	formLoadSuccess : function(form,action){
		this.initValues = this.form.getValues();
	},
	
	/**
	 * 加载数据失败后执行的回调方法，此处可用于完成相关回调逻辑
	 */
	formLoadFailure : function(form, action) {
		var json = Ext.util.JSON.decode(action.response.responseText || "{}");
		json.msg = json.msg || "服务器访问出错，请联系管理员"
		Ext.MessageBox.show({
			title : '失败',
			msg : json.msg + "<br>",
			buttons : Ext.MessageBox.OK,
			fn : function(){},
			icon : Ext.MessageBox.ERROR
		});
	}
});