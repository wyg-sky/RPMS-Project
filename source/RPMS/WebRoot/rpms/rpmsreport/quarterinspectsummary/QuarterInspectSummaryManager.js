 /**
 * @description : 半年检查汇总报表
 * @date : 2015-03-18 19:30:46
 * @author : WangYG
 */
Ext.lion.rpms.QuarterInspectSummaryManager = function(config){
	Ext.apply(this,config);
	Ext.lion.rpms.QuarterInspectSummaryManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.QuarterInspectSummaryManager,Ext.lion.LionBusinessManager,{
	query : function() {
		var year = this.queryForm.findField('year').getValue();
		var quarter = this.queryForm.findField('quarter').getValue();
		var platCenter = this.queryForm.findField('platCenter.id').getValue();
		if( FW.userId !='00000000000000000000000000000001'){
            if(platCenter == ''){
                Ext.MessageBox.alert("提示","&nbsp;&nbsp;&nbsp;请选择分中心！");
                return false; 
            }
        }
        if(year == ''){
            Ext.MessageBox.alert("提示","&nbsp;&nbsp;&nbsp;请选择查询年份！");
            return false; 
        }
		var params = {
			   status : "query",
				year : year,
				quarter  :  quarter,
				platCenter : platCenter
	    };
		var param = encodeURI(Ext.urlEncode(params));
		var load ="rpms/rpmsreport/quarterinspectsummary/quarterinspectsummaryRpt.jsp?"+param;
		this.dataGrid.body.update("<iframe frameborder='0' MARGINWIDTH='10' width='100%' height='100%' src="+load+"></iframe>");
	},
	clearQuery : function(){
		this.queryForm.findField('year').reset();
		this.queryForm.findField('quarter').reset();
		this.queryForm.findField('platCenter.id').reset();
		//this.query();
	}
});