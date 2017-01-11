/**
 * @description : 合同管理
 * @date : 2015-03-12 09:47:49
 * @author : 周强
 */

Ext.lion.rpms.InnovateCompactManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.InnovateCompactManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.InnovateCompactManager, Ext.lion.LionBusinessManager, {
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
});
