/**
 * @description ：标准管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */

Ext.lion.rpms.ResearchHonorManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.ResearchHonorManager.superclass.constructor.call(this);
	this.dataGrid.on('onload', function() {
	}, this);
};

Ext.extend(Ext.lion.rpms.ResearchHonorManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
	        'showadd' : {
	            fn:function(){
	            	 this.editForm.findField("projectId").setDisabled(true);
	            },
	            scope:this
	        },
			'showedit' : {
				fn : function() {
					this.checkflag = true;
					var records = this.dataGrid.getSelections(true);
					for (var i = 0; i < records.length; i++) {
						var status = records[0].get(this.dataGrid
								.getFieldName('honorType'));
						if (status != '0003') {
							this.editForm.findField("projectId").setDisabled(true);
							return false;
						}else{
							this.editForm.findField("projectId").setDisabled(false);
						}
					}
				},
				scope : this
			}
		})
	}
});
