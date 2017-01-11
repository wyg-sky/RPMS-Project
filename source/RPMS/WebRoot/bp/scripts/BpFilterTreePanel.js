
/**
 * 流程过滤器导航树
 */
BpFilterTreePanel = function(viewPanel,bpInfo,conf){
	
	Ext.lion.ScriptLoader("ext/RowExpander.js",
		"admin/scripts/filter/interface/FilterIFace.js", 
		"admin/scripts/filter/components/TreePanelFil.js", 
		"admin/scripts/filter/SearchClassWin.js");
	
	var scope = this;
	
	var treeLoader = new Ext.tree.TreeLoader({
		url : "admin/showMyBpFilter.html",
		requestMethod : 'post',
		preloadChildren : false,
		baseParams : {
			moduleId : bpInfo.code,
			setUrlAction : "url:bp/myListByBp.html,children.*:bp/myListByBp.html"
		}
	});
	
	var config = {
		split : true,
		border : false,
		folderSort : true,
		autoScroll : true,
		title: bpInfo.name,
		rootVisible : true,
		loader : treeLoader,
		tools : [{id : 'gear', qtip : '导航设置', handler : function(){scope.createFilterInfce(); }}],
		root : new Ext.tree.AsyncTreeNode({
				id : bpInfo.id,
				text : $lang('bp.filter.showall')/*'全部'*/,
				icon : 'upload/filterImages/filter_all.gif',
				url : 'bp/myListByBp.html',
				expanded : false
			}),
		headerCls: 'itsm-nav'
	};
	
	Ext.apply(config, conf);
	
	BpFilterTreePanel.superclass.constructor.call(this, config);

	this.setParams('viewPanel',viewPanel);
	this.setParams('bpInfo',bpInfo);
}

Ext.extend(BpFilterTreePanel,Ext.tree.TreePanel,{
	/**
     * 刷新树
     */
    refresh : function(){
    	this.getRootNode().reload();
    },
    /**
     * 我的过滤器 编辑/分配界面
     */
    createFilterInfce : function(){
    	
    	var ID = this.getParamsValue('ID');
    	var viewPanel = this.getParamsValue('viewPanel');
    	
    	var parentPoint = this;
    	var moduleId = this.getParamsValue("bpInfo").code;
    	var initParams = {moduleId : moduleId};
    	var tab = new FilterIFace({id:'myNavPanel-FilterIFace-1'+ID} , initParams ,viewPanel);
       
        tab.onSave(function(){
      		this.refresh();
        },this); 
        tab.onRemove(function(){
        	viewPanel.remove(tab);	
        },this);
    	viewPanel.remove(tab.id);
    	viewPanel.add(tab);
    	viewPanel.doLayout();
	    viewPanel.activate(tab);
    },
    
     /**
     * 统一的 刷新
     * 刷新组件
     */
    refresh : function(){
    	this.getRootNode().reload();
    },
    
    
    setParams : function(key,value){
    	
    	if( this.paramsMap == null ){
    		this.paramsMap = {};
    	}
    	
    	this.paramsMap[key] = value;
    },
    
    getParamsValue : function(key){
    	
    	if( this.paramsMap == null ){
    		this.paramsMap = {};
    	}
    	return this.paramsMap[key];
    }

});