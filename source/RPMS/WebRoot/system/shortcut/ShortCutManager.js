 /**
 * @description : 快捷方式管理
 * @date : 2013-03-30
 * @author : 周亚京
 */
Ext.lion.system.ShortCutManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.ShortCutManager.superclass.constructor.call(this);
	this.dataGrid.on('render',this.showIcon(this.dataGrid));
};

Ext.extend(Ext.lion.system.ShortCutManager, Ext.lion.LionBusinessManager, {
	showIcon : function(grid){
		var store = grid.getStore();
		var view = grid.getView();
		this.tip = new Ext.ToolTip({
			target : view.mainBody,
			delegate : '.x-grid3-row',
			trackMouse : true,
			width : 60,
			dismissDelay : 5000,
			renderTo : document.body,
			listeners : {"beforeshow" : function updateTipBody(tip){
					var rowIndex = view.findRowIndex(tip.triggerElement);
					var icon = store.getAt(rowIndex).get('businessObject.icon');
					if(icon != null){
						if(icon.substring(0,1) == "/"){
							icon = icon.substring(1,icon.length);
						}
						var iconUrl = contextPath + "/" + icon;
						tip.body.dom.innerHTML = "<img src = '"+iconUrl+"' height='48' width='48'/>";
					} else {
						tip.body.dom.innerHTML = "<font color='red' size=2>无图标</font>";
					}
					rowIndex = null;
				}
			}
		});
	}
});