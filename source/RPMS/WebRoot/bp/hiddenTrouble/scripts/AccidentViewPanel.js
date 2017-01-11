/**
 * 事故查看页面
 * config: {
 * 		superTabPanel : 事故管理的顶级容器页面，
 * 		accidentId : 事故记录的id
 * }
 */
AccidentViewPanel = function(config){
	Ext.apply(this,config);
	var id_hidden = new Ext.form.Hidden({
		name :'accident.id',
		value : this.accidentId
	});
	
var accid_name = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '事故名称',
		readOnly : true,
		maxLength : 50,
		name : 'accident.accid_name'
	});
	
	var accid_title = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '事故记录标题',
		readOnly : true,
		name : 'accident.accid_title'
	});
	
	var accid_dept_cd = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '事故部门',
		readOnly : true,
		name : 'accident.accid_dept_cd'
	});
	
	//var create_user_cd = new Ext.form.TextField({
	//	anchor : '98%',
	//	fieldLabel : '录入人',
	//	readOnly : true,
	//	name : 'accident.create_user_cd'
	//});
	
	
	///////////////////////////////录入人代码测试开始
	
	var create_user_cd = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '录入人',
		readOnly : true,
		name : 'accident.create_user_cd'
	});
	
	
	///////////////////////////////录入人代码测试结束
	
	
	
	
	var location_cd = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '事故发生地点',
		readOnly : true,
		name : 'accident.location_cd'
		
	});
	
	var happen_time = new Ext.form.DateField({
    	fieldLabel : '事故发生时间', 
    	name : 'accident.happen_time', 
    	anchor : '98%',
    	format : 'Y-m-d',
    	readOnly : true,
    	vtype : 'daterange'

    });
	
	var accid_type_cd = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '事故类型',
		readOnly : true,
		name : 'accident.accid_type_cd'
	});
	
	var accid_level_cd = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '事故等级',
		readOnly : true,
		name : 'accident.accid_level_cd'
	});
	
	
	var dead_count = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '死亡人数',
		readOnly : true,
		name : 'accident.dead_count'
	});
	
	var sinju_count = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '重伤人数',
		readOnly : true,
		name : 'accident.sinju_count'
	});

	var ginju_count = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '轻伤人数',
		readOnly : true,
		name : 'accident.ginju_count'
	});
	
	var direct_loss = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '直接经济损失',
		readOnly : true,
		name : 'accident.direct_loss' 
	});
	
	var indirect_loss = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '间接经济损失',
		readOnly : true,
		name : 'accident.indirect_loss'
	});
	
	var fine_amount = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '事故罚款金额',
		readOnly : true,
		name : 'accident.fine_amount'
	});
	
	var stop_prod_minutes = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '停产市场(分钟)',
		readOnly : true,
		name : 'accident.stop_prod_minutes'
	});

	var accid_content = new Ext.form.TextArea({
		name : 'accident.accid_content',
		fieldLabel : '事故经过',
		readOnly : true,
		anchor : '98%',
		maxLength : 1000,
		height : 80
	});
	

	
	var origin_substance = new Ext.form.TextArea({
		name : 'accident.origin_substance',
		fieldLabel : '起因物',
		readOnly : true,
		anchor : '98%',
		maxLength : 1000,
		height : 80
	});
	
	
	var direct_reason = new Ext.form.TextArea({
		name : 'accident.direct_reason',
		fieldLabel : '直接原因',
		readOnly : true,
		anchor : '98%',
		maxLength : 1000,
		height : 80
	});
	
	
	var indirect_reason = new Ext.form.TextArea({
		name : 'accident.indirect_reason',
		fieldLabel : '间接原因',
		readOnly : true,
		anchor : '98%',
		maxLength : 1000,
		height : 80
	});

	var accid_lesson = new Ext.form.TextArea({
		name : 'accident.accid_lesson',
		fieldLabel : '事故教训',
		readOnly : true,
		anchor : '98%',
		maxLength : 1000,
		height : 80
	});
	
	var prevent_measure = new Ext.form.TextArea({
		name : 'accident.prevent_measure',
		fieldLabel : '预防措施',
		readOnly : true,
		anchor : '98%',
		maxLength : 1000,
		height : 80
	});
	
	var create_time = new Ext.form.DateField({
    	fieldLabel : '首次录入时间', 
    	name : 'accident.create_time', 
    	anchor : '98%',
    	format : 'Y-m-d',
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
			items : [id_hidden,accid_name,accid_title,accid_dept_cd,happen_time,location_cd,update_time]	
		},{
			columnWidth : 0.32,
			border : false,
			layout : 'form',
			items : [accid_type_cd,accid_level_cd,create_time,stop_prod_minutes,fine_amount,create_user_cd]
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
		
	AccidentViewPanel.superclass.constructor.call(this, {
		autoWidth : true,
		autoHeight : false,
		autoScroll : true,
		closable : true,
		title : this.title?this.title:'查看事故',
		bodyStyle : 'padding:5px 5px 5px 5px',
		tbar : ['->',{
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
			}, {
				name : "accident.accid_dept_cd",
				mapping : 'accid_dept_cd',
					convert : function(v){
							if(v&&v.name){
								return v.name;
							}else{
								return '';
							}
						}
			}, {
				name : "accident.create_user_cd",
				mapping : 'create_user_cd',
				convert : function(v){							
							if(v&&v.username){
								return v.username;
							}else{
								return '';
							}
						}
			}, {
				name : "accident.accid_type_cd",
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
				name : "accident.accid_level_cd",
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
				name : "accident.fine_amount",
				mapping : 'fine_amount'
			}, {
				name : "accident.stop_prod_minutes",
				mapping : 'stop_prod_minutes'
			}, {
				name : "accident.accid_content",
				mapping : 'accid_content'
			}, {
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

Ext.extend(AccidentViewPanel, Ext.form.FormPanel,{
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
	 */
	formLoadSuccess : function(form,action){
		
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