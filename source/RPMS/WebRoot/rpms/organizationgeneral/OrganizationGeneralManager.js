/**
 * @description : 单位概况管理
 * @date : 2016-11-16 17:49:47
 * @author : 杨尚山
 */

Ext.lion.rpms.OrganizationGeneralManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.OrganizationGeneralManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.OrganizationGeneralManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
		'showedit' : {
			fn : Ext.emptyFn,
			scope: this
		}
		});
	},
	
	/**
	 * 从项目管理中获取数据
	 */
	genValue : function(){
		var centerPlat = this.manager.editForm.findField('centerPlat.id').getValue();
		var year = this.manager.editForm.findField('year').getValue();
		var month = this.manager.editForm.findField('month').getValue();
		Ext.Ajax.request({
			url : 'rpms/genOrgGeneralData.html',
			method : 'post',
			params : {
				centerPlat : centerPlat,
				year : year,
				month : month
			},
			scope : this,
			success : function(response,options) {
				var json = Ext.util.JSON.decode(response.responseText || "{}");
				if(json.success){
					this.manager.editForm.findField('yfxmgs').setValue(json.yfxmgs);
					this.manager.editForm.findField('yfxmys').setValue(json.yfxmys);
					this.manager.editForm.findField('yfjftj').setValue(json.yfjftj);
					this.manager.editForm.findField('yffygj').setValue(json.yffygj);
					this.manager.editForm.findField('snrkyfjf').setValue(json.snrkyfjf);
					this.manager.editForm.findField('swrkyfjf').setValue(json.swrkyfjf);
					this.manager.editForm.findField('yjssdszc').setValue(json.yjssdszc);
				}
			},
			failure : function() {}
		});
	}
});
