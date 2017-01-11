 /**
 * @description : 创新情况汇总报表
 * @date : 2015-03-18 15:08:10
 * @author : WangYG
 */
Ext.lion.rpms.InnovationSummaryManager = function(config){
	Ext.apply(this,config);
	Ext.lion.rpms.InnovationSummaryManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.InnovationSummaryManager,Ext.lion.LionBusinessManager,{
	query : function() {
		var startDate = this.queryForm.findField('startDate').getValue();
		var endDate = this.queryForm.findField('endDate').getValue();
		var platCenter = this.queryForm.findField('platCenter.id').getValue();
		var platName = this.queryForm.findField('platName').getValue();//分中心的全名
		if( FW.userId !='00000000000000000000000000000001'){
			if(platCenter == ''){
                Ext.MessageBox.alert("提示","&nbsp;&nbsp;&nbsp;请选择分中心！");
                return false; 
            }
		}
		if(startDate == ''){
            Ext.MessageBox.alert("提示","&nbsp;&nbsp;&nbsp;请选择查询开始年月！");
            return false; 
        }
        if(endDate == ''){
            Ext.MessageBox.alert("提示","&nbsp;&nbsp;&nbsp;请选择查询结束年月！");
            return false; 
        }
		var params = {
				status : "query",
				platCenter : platCenter,
				startDate  :  startDate,
				endDate : endDate,
				platName : platName
	    };
		var param = encodeURI(Ext.urlEncode(params));
		var load ="rpms/rpmsreport/innovationsummary/innovationsummaryRpt.jsp?"+param;
		this.dataGrid.body.update("<iframe frameborder='0' MARGINWIDTH='10' width='100%' height='100%' src="+load+"></iframe>");
	},
	clearQuery : function(){
		this.queryForm.findField('platCenter.id').reset();
		this.queryForm.findField('startDate').setValue();
		this.queryForm.findField('endDate').setValue();
		this.queryForm.findField('platName').setValue();
	}
});