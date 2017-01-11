/**
 * 流程高级查询面板
 * @param {} conf
 */
BpSearchPanel = function(conf) {
	this.conf = conf;

	BpSearchPanel.superclass.constructor.call(this,{
		id : this.conf.id?this.conf.id:Ext.id(),
		closable : true,
		autoScroll : true,
		title : this.conf.title
	});
};
Ext.extend(BpSearchPanel, Ext.Panel,{
	/**
	 * 重写关闭
	 */
	close : function(){
		var container = this.ownerCt;
		if(container){
			container.remove(this,true);
		}
	},
	/**
	 * 重写加载
	 * @param {} config
	 */
	load : function(config) {
		var mainPanel = this;
		this.getUpdater().on('update', function(el,oResponseObject){
			var formPageElId = el.first().id;
			Ext.get(formPageElId).ctPanel = mainPanel;
		});
		BpSearchPanel.superclass.load.call(this, config);
	},
	/**
	 * 加载查询页面
	 * @param {} modelName
	 */
	loadSearchPanel : function () {
		/**
		 * 拼接查询页面路径
		 */
		var modelName = this.conf.modelName;
		var url = "/FVSD_RUNTIMESPACE/UI/searchPanel/";
		var index = modelName.lastIndexOf(".");
		var searchPage = modelName.substring(index+1); 
		var filePath = url+searchPage+".jsp";
		
		this.load({
			url : 'bp/findBpSearchPage.html?filePath=' + filePath,
			params: {
				bpId: this.conf.bpId,
				modelName : this.conf.modelName
			},
			scope : this,
			scripts : true
		});
	}
	
});