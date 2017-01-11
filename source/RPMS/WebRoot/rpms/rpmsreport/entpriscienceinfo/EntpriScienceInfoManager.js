 /**
 * @description : 企业科技情况报表
 * @date : 2015-03-18 17:10:25
 * @author : WangYG
 */
Ext.lion.rpms.EntpriScienceInfoManager = function(config){
	Ext.apply(this,config);
	Ext.lion.rpms.EntpriScienceInfoManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.EntpriScienceInfoManager,Ext.lion.LionBusinessManager,{
	bussinessInit : function() {
		this.queryReport();
	},
	queryReport : function() {
		var param = this.queryForm.getForm().getValues();
		if(this.collect){
			param.collect = true;
		}
		this.updateReport(param);
		this.collect = false;
	},
	fillReport:function(){
		var param = this.queryForm.getForm().getValues();
		param.tableName = 'RPMS_SCIENCE_INFO';
		var manager = this;
		Ext.Ajax.request({
			url:'rpms/commonReportisUpreport.html',
			params:param,
			success: function(response, opts) {
		      var obj = Ext.decode(response.responseText);
		      if(obj.success){
	      		param.fill = true;
				manager.updateReport(param);
		      } else {
		      	Ext.Msg.alert("提示",param.year +"年报表已上报，无法填报");
		      }
		   	}
		})
	},
	upReport:function(){
		var manager = this;
		Ext.MessageBox.confirm("提示","请注意先保存数据再上报，上报后将无法编辑数据，确定上报吗？",function(btn){
			if(btn == 'yes'){
				var param = manager.queryForm.getForm().getValues();
				param.tableName = 'RPMS_SCIENCE_INFO';
				Ext.Ajax.request({
					url:'rpms/commonReportupreport.html',
					params:param,
					success: function(response, opts) {
				      var obj = Ext.decode(response.responseText);
				      if(obj.success){
				      	Ext.Msg.alert('提示','上报成功');
				      	manager.updateReport(param);
				      } else {
				      	Ext.Msg.alert('提示',obj.msg);
				      }
				   	}
				})	
		}})
		
	},
	approve:function(){
		var manager = this;
		Ext.MessageBox.confirm("提示","确定要审批吗？",function(btn){
			if(btn == 'yes'){
				var param = manager.queryForm.getForm().getValues();
				if(!param['organization.id']){
					Ext.Msg.alert('提示','请先选择单位');
					return;
				}
				param.tableName = 'RPMS_SCIENCE_INFO';
				Ext.Ajax.request({
					url:'rpms/commonReportapprove.html',
					params:param,
					success: function(response, opts) {
				      var obj = Ext.decode(response.responseText);
				      if(obj.success){
				      	Ext.Msg.alert('提示','审批成功');
				      	manager.updateReport(param);
				      } else {
				      	Ext.Msg.alert('提示',obj.msg);
				      }
				   	}
				})	
		}})
	},
	back:function(){
		var param = this.queryForm.getForm().getValues();
		if(!param['organization.id']){
			Ext.Msg.alert('提示','请先选择单位');
			return;
		}
		param.tableName = 'RPMS_SCIENCE_INFO';
		var manager = this;
		Ext.Ajax.request({
			url:'rpms/commonReportback.html',
			params:param,
			success: function(response, opts) {
		      var obj = Ext.decode(response.responseText);
		      if(obj.success){
		      	Ext.Msg.alert('提示','打回成功');
		      	manager.updateReport(param);
		      } else {
		      	Ext.Msg.alert('提示',obj.msg);
		      }
		   	}
		})	
	},
	updateReport:function(params){
		var param = encodeURI(Ext.urlEncode(params));
		var load ="rpms/rpmsreport/entpriscienceinfo/entpriscienceinfoRpt.jsp?"+param;
		this.dataGrid.body.update("<iframe frameborder='0' MARGINWIDTH='10' width='100%' height='100%' src="+load+"></iframe>");
	},
	
	showRptByOrg:function(orgId,orgName){
		this.queryForm.findField('organization.id').setValue({value:orgId,text:orgName});
		this.queryReport();
	}
});