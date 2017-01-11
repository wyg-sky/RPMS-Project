/**
 * @description ：标准管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */

Ext.lion.rpms.ResearchStandarManager = function(config) {
    Ext.apply(this,config);
    Ext.lion.rpms.ResearchStandarManager.superclass.constructor.call(this);
    this.dataGrid.on('onload', function() {
    }, this);
};

Ext.extend(Ext.lion.rpms.ResearchStandarManager, Ext.lion.LionBusinessManager, {
    bussinessInit : function() {
    }
});
