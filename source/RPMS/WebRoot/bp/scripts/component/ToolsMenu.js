/**
 * 流程处理工具菜单 （打印、导出、生成模板）
 * TODO ToolsMenu -----------------------------------------------------
 */
ToolsMenu = function(cfg) {

	cfg = cfg || {};
	Ext.apply(this,cfg);
    
    ToolsMenu.superclass.constructor.call(this, {
        xname: "processNodeTools",
        items : [{ //打印
	        text: $lang('component.print'),
	        iconCls: "print-icon",
	        handler : this.doPrint,
	        scope : this
	    },{//导出
	        text: $lang('component.exportCode'),
	        iconCls: "export-icon",
	        handler : this.doExport,
	        scope : this
	    },{//生成模板
	        text: $lang('component.createTemplate'),
	        iconCls: "template-icon",
	        handler : this.doCreateTemplate,
	        hidden : true,
	        scope : this
	    }]
    });
    
};

Ext.extend(ToolsMenu, Ext.menu.Menu, {
    doPrint: function(item, e) {
    	var newWindow=window.open();
		var bpiId=this.bpiId;
    	newWindow.top.location.href='printPageCt.jsp?id='+bpiId;
    },
    
    doExport: function(item, e) {
    	
        document.location.href = "bp/exportAllForm.html?"
			+ "title=工单"
			+ "&ids='" + this.bpiId+'\'';
    },
    
    doCreateTemplate: function(item, e) {
        alert('doCreateTemplate');
    }
});