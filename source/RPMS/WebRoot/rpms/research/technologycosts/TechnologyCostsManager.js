/**
 * @description : 科技活动费用情况
 * @date : 2015-03-31 15:01:06
 * @author : WSL
 */

Ext.lion.rpms.TechnologyCostsManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.TechnologyCostsManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.TechnologyCostsManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
			'onload' : {
				fn : function(){
					this.queryReport();
				},
				scope: this
			},	
			'showedit' : {
				fn : Ext.emptyFn,
				scope: this
			}
		});
	},
	
	/**
	 * 报表查询
	 */
	queryReport : function(){
		var platCenter = this.reportqueryform.findField("organization.id").getValue();
		var costsMonths = this.reportqueryform.findField("costsMonths").getValue();
		
		if(!this.isgather){
			if(platCenter == ''){
				Ext.MessageBox.alert("提示","&nbsp;&nbsp;&nbsp;请选择分中心！");
			    return false; 
			}
		}
		var params = {
				platCenter : platCenter,
				costsMonths : costsMonths,
				isgather : this.isgather
		};
		var param = encodeURI(Ext.urlEncode(params));
		
		var load = "";
		if(this.isgather){
			load = "rpms/research/technologycosts/technologycostsRptGather.jsp?"+param;
		}else{
			if(this.isfill){
				var params = {
						platCenter : platCenter,
						costsMonths : costsMonths
				};
				var param = encodeURI(Ext.urlEncode(params));
				var load = "rpms/research/technologycosts/technologycostsRptFill.jsp?"+param;
			}else{
				load = "rpms/research/technologycosts/technologycostsRpt.jsp?"+param;
			}
			this.isfill = false;
		}
		this.reportdata.body.update("<iframe frameborder='0' width='100%' height='100%' src='"+load+"'></iframe>");
	},
	
    /**
     * 填报
     */
    fillReport : function(){
		var platCenter = this.reportqueryform.findField("organization.id").getValue();
		var costsMonths = this.reportqueryform.findField("costsMonths").getValue();
		if(platCenter == ''){
			Ext.MessageBox.alert("提示","&nbsp;&nbsp;&nbsp;请选择分中心！");
		    return false; 
		}
		this.isfill = false;
		this.changeReportStatus("0000");
	},
	showData : function(platCenter, costsMonths) {
		this.org = "";
		var params = {
			platCenter : platCenter,
			costsMonths : costsMonths,
			isgather : false
		};
		this.org = platCenter;
		var param = encodeURI(Ext.urlEncode(params)); //URLDecoder.decode(equiKind,"UTF-8");
		var load = "rpms/research/technologycosts/technologycostsRpt.jsp?" + param;
		this.reportdata.body.update("<iframe frameborder='0' width='100%' height='100%' src=" + load + "></iframe>");
	},
	
	changeReportStatus:function(status){
		this.isfill = false;
		Ext.MessageBox.minWidth = 230;
		Ext.MessageBox.confirm("提示", "请注意先保存数据再进行该操作，操作后将无法再进行编辑，确定继续操作吗？",function(ret){
			if(ret == "yes"){
				var organization = "";
				if(this.org != "" && this.org != null){
					organization = this.org;
				}else{
					organization = this.reportqueryform.findField("organization.id").getValue();
				}
				var costsMonths = this.reportqueryform.findField("costsMonths").getValue();
				var params = {
					status : status,
					organization : organization,
					costsMonths : costsMonths
				};
				Ext.Ajax.request({
		            timeout: 10000,
		            url : 'rpms/changeReportStatus.html',
		            method : 'post',
		            params :params,
		            scope : this,
		            async: false,
					success:function(response){
						var json = Ext.util.JSON.decode(response.responseText || "{}");
		                if(json.success) {
		                	if(status != "0000"){
								Ext.MessageBox.show({
									title : '成功',
									msg : json.msg,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.INFO,
									scope : this
								});
		                	}else{
		                		this.isfill = true;
		                	}
		                } else {
		                	this.isfill = false;
							Ext.MessageBox.show({
								title : '失败',
								msg : json.msg,
								buttons : Ext.MessageBox.OK,
								fn : function(){},
								icon : Ext.MessageBox.WARNING,
								scope : this
							});
		                }
					}});
				this.queryReport();
				}
		},this);
	}
});
