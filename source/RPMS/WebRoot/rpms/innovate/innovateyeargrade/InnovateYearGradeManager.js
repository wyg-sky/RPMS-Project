/**
 * @description : 年度考核打分管理
 * @date : 2015-03-16 09:00:14
 * @author : 周强
 */

Ext.lion.rpms.InnovateYearGradeManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.InnovateYearGradeManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.InnovateYearGradeManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.query();
		this.on({
			'beforeedit' : {
				fn : this.checkEditable,
				scope: this
			},
			'beforegridedit' : {
				fn : this.checkEditable,
				scope: this
			}
		});
		if(this.isCenterManager){ //如果为中心管理员
				this.on({
					'showedit':this.initCheckerValue,
					'showgridedit':this.initGridCheckerValue,
					scope:this
				})
			}
	},
	initCheckerValue:function(){
		this.editForm.on({
			'load':this.setChecker
		})
	},
	initGridCheckerValue:function(){
		this.dataGrid.getGridForm().on({
			'load':this.setChecker
		})
	},
	setChecker:function(){
		var checkerfield = this.findField('checker');
		var checker = checkerfield.getValue();
		if(checker == null || checker===''){
			checkerfield.setValue(FW.userName)
			this.findField('checkDate').setValue(new Date());
		}
	},
	initChecker:function(){
		var manager = this;
		var year = this.queryForm.findField('year').getValue();
		var platCenter = this.queryForm.findField('platCenter.id').getValue();
		var quarter = null;
		if(year == null || year===''){
			year = new Date().getFullYear()
		}
		
		if(quarter == null || quarter===''){
			quarter = Math.floor(new Date().getMonth()/6)+1 ;
		}
		Ext.Ajax.request({
			url:'rpms/initInnovateYearGrade.html',
			params: { year: year,quarter:quarter,platCenter:platCenter },
			success: function(response){
				 var obj = Ext.decode(response.responseText);
				 if(obj.success){
				 	manager.query();
				 } else {
				 	Ext.Msg.alert('提示',obj.msg);
				 }
			}
		});
	},
	/**
	 * 打分控制，根据中心管理员 和 分中心管理员角色控制允许编辑的表单
	 * @return {}
	 */
	gradeCtr:function(){
		return !this.isCenterManager;
	},
	
	gradeStatus:function(){  //0001 自查  0002 已自查  0003已检查 //已整改
		var status = this.getStatus();
		if(status ==='0002' && this.isCenterManager){
			return '0003';
		} else if(status==='0001' && !this.isCenterManager) {
			return '0002'
		} else if(status==='0003' && !this.isCenterManager){
			return '0004'
		}
		return status;
	},
	
	getStatus:function(){
		
	},
	
	checkEditable:function(){
		var selected = this.dataGrid.getSelections(true);
		if(selected[0].get(this.dataGrid.getFieldName("checkItem.type"))=='99'){
			Ext.Msg.alert("提示","不能编辑总分");
			return false;
		}
	}
});
