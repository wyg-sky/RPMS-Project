/**
 * @description ：成果管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */

Ext.lion.rpms.ResearchAchievementManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.ResearchAchievementManager.superclass.constructor.call(this);
	this.dataGrid.on('onload', function() {
	}, this);
};

Ext.extend(Ext.lion.rpms.ResearchAchievementManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		//this.listPlatTree.items.items[0].on('click',this.onPlatTreeClick, this);
	}
	
   /**
    * @author Wyg
     * 单击左侧平台树方法 (只传入当前树节点的platId)
     */
   /*onPlatTreeClick : function(node, e) {
        this.clearQuery(this.queryForm, this.dataGrid, false);
        var params = {
                platId  : node.id
        };
        Ext.apply(this.dataGrid.store.baseParams,params);
        this.dataGrid.store.reload();
    }*/
});
