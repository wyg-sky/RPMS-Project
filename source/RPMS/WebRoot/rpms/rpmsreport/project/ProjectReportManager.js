 /**
 * @description : 项目立项汇总报表
 * @date : 2016-06-29
 * @author : 杨尚山
 */
Ext.lion.rpms.ProjectReportManager = function(config){
	Ext.apply(this,config);
	Ext.lion.rpms.ProjectReportManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.ProjectReportManager,Ext.lion.LionBusinessManager,{
	query : function() {
		var projectCode = this.queryForm.findField('projectCode').getValue();
		var projectName = this.queryForm.findField('projectName').getValue();
		var projectAnnual = this.queryForm.findField('projectAnnual').getValue();
		var projectStatus = this.queryForm.findField('projectStatus').getValue();
		var proejctType = this.queryForm.findField('proejctType').getValue();
		var organization = this.queryForm.findField('organization.id').getValue();
		var platCenter = this.queryForm.findField('platCenter.id').getValue();
		var specialty = this.queryForm.findField('specialty.id').getValue();
		var projectPerson = this.queryForm.findField('projectPerson').getValue();
		var projectPersonOrg = this.queryForm.findField('projectPersonOrg.id').getValue();
		var position = this.queryForm.findField('position').getValue();
		var title = this.queryForm.findField('title').getValue();
		var status = this.queryForm.findField('status').getValue();
		var dispatchMonth = this.queryForm.findField('dispatchMonth').getValue();
		var projectStage = this.queryForm.findField('projectStage').getValue();
		var recommendType = this.queryForm.findField('recommendType').getValue();
		var params = {
				query : "query",
				projectCode : projectCode,
				projectName : projectName,
				projectAnnual : projectAnnual,
				projectStatus : projectStatus,
				proejctType : proejctType,
				organization : organization,
				platCenter : platCenter,
				specialty : specialty,
				projectPerson : projectPerson,
				projectPersonOrg : projectPersonOrg,
				position : position,
				title : title,
				status : status,
				dispatchMonth : dispatchMonth,
				projectStage : projectStage,
				recommendType : recommendType
	    };
		var param = encodeURI(Ext.urlEncode(params));
		var load ="rpms/rpmsreport/project/projectRpt.jsp?"+param;
		this.dataGrid.body.update("<iframe frameborder='0' MARGINWIDTH='10' width='100%' height='100%' src="+load+"></iframe>");
	},
	clearQuery : function(){
		this.queryForm.findField('projectCode').reset();
		this.queryForm.findField('projectName').reset();
		this.queryForm.findField('projectAnnual').reset();
		this.queryForm.findField('projectStatus').reset();
		this.queryForm.findField('proejctType').reset();
		this.queryForm.findField('organization.id').reset();
		this.queryForm.findField('platCenter.id').reset();
		this.queryForm.findField('specialty.id').reset();
		this.queryForm.findField('projectPerson').reset();
		this.queryForm.findField('projectPersonOrg.id').reset();
		this.queryForm.findField('position').reset();
		this.queryForm.findField('title').reset();
		this.queryForm.findField('status').reset();
		this.queryForm.findField('dispatchMonth').reset();
		this.queryForm.findField('projectStage').reset();
		this.queryForm.findField('recommendType').reset();
		//this.query();
	}
});