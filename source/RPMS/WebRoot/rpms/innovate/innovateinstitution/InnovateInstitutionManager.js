/**
 * @description : 创新制度管理
 * @date : 2015-03-19 12:33:07
 * @author : 周强
 */

Ext.lion.rpms.InnovateInstitutionManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.InnovateInstitutionManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.InnovateInstitutionManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
		'showedit' : {
			fn : Ext.emptyFn,
			scope: this
			}
		});
	this.listPlatTree.items.items[0].on('click',this.onPlatTreeClick, this);
	},
	
	/*
	 * 点击平台树
	 */
	onPlatTreeClick : function(node, e) {
		if(node.parentNode.parentNode ===null){  //如果为分中心
			this.queryForm.findField("platCenter.id").setValue({value:node.id,text:node.text});
			this.queryForm.findField("platInstitution.id").clearValue();
		} else {
			this.queryForm.findField("platCenter.id").setValue({value:node.parentNode.id,text:node.parentNode.text});
			this.queryForm.findField("platInstitution.id").setValue({value:node.id,text:node.text});
		}
		this.query();
	},
	computeDate:function(){
		var pubDate = this.editForm.findField('publishDate').getValue();
		var revisePeriod = this.editForm.findField('revisePeriod').getValue();
		var reviseDate = this.editForm.findField('reviseDate');
		var date = new Date(pubDate);
		var rDate = date.add(Date.YEAR,parseInt(revisePeriod));
		reviseDate.setValue(rDate.format('Y-m-d'));
	}
	
});
