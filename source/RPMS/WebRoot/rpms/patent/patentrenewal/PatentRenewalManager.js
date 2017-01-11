/**
 * @description : 专利续费申请管理
 * @date : 2015-06-03 09:50:24
 * @author : WangYG
 */

Ext.lion.rpms.PatentRenewalManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.PatentRenewalManager.superclass.constructor.call(this);
	
	this.myMask = new Ext.LoadMask(Ext.getBody(), {
        msg: '正在导入数据，这可能需要几分钟，请耐心等待......！',
        removeMask: true 
    });
    
    this.dataGrid.on('celldblclick', function() {
            this.viewObject();
    }, this);
	
};

Ext.extend(Ext.lion.rpms.PatentRenewalManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
		'showedit' : {
			fn : Ext.emptyFn,
			scope: this
		}
		});
	},
	   getPatentIdInfo : function(records) {
	   	        var protectDate = records[0].get('protectDate')  ?  records[0].get('protectDate')  :  ""  ;
	   	        var patentNum = records[0].get('patentNum')  ?  records[0].get('patentNum')  :  ""  ;
                var organization = records[0].get('organization') ? records[0].get('organization') : "{}";
                var platCenter = records[0].get('platCenter') ? records[0].get('platCenter') : "{}";
                var platInstitution = records[0].get('platInstitution') ? records[0].get('platInstitution') : "{}";
                var specialty = records[0].get('specialty') ? records[0].get('specialty') : "{}";
                var business = records[0].get('business') ? records[0].get('business') : "{}"; 
                this.editForm.findField("protectDate").setValue(protectDate);
                this.editForm.findField("patentId.patentNum").setValue(patentNum);
                this.editForm.findField("organization.id").setValue({"value" : organization.id, "text" : organization.name});
                this.editForm.findField("platCenter.id").setValue({"value" : platCenter.id, "text" : platCenter.platName});
                this.editForm.findField("platInstitution.id").setValue({"value" : platInstitution.id, "text" : platInstitution.platName});
                this.editForm.findField("specialty.id").setValue({"value" : specialty.id, "text" : specialty.specialtyName});
                this.editForm.findField("business.id").setValue({"value" : business.id, "text" : business.specialtyName});
    }
});
