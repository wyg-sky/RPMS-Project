/**
 * 知识审批流程列表页面 extends BpViewPanel
 */
BpKnowledgeViewPanel = function() {
	
	BpKnowledgeViewPanel.superclass.constructor.call(this, {
		activeTab : 0,
		id : 'BpKnowledgeViewPanel',
		region : 'center',
		margins : '0 0 0 0',
		resizeTabs : true,
		border : true,
		tabWidth : 150,
		minTabWidth : 100,
		enableTabScroll : true,
		plugins: new Ext.ux.TabCloseMenu()
	});
};

Ext.extend(BpKnowledgeViewPanel, BpViewPanel,{

	search : function(){
    	var modelName = "";
    	var stateId = "";
    	var nodeId = "";
    	var typeCode="";
    	var node= this.node;
    	if(node.attributes.typeCode){
    		typeCode = node.attributes.typeCode;
    	}
    	if(node.isLeaf()){
    		modelName = node.parentNode.attributes.modelName;
    		nodeId = node.parentNode.id;
    		stateId = node.id;
    	}else{
    		modelName = node.attributes.modelName;
    		nodeId = node.id;
    	}
    	var method = Ext.getCmp('method').getValue();
		var content;
		if(method == "createDate"){
			var dateTime = Ext.util.Format.date(Ext.getCmp('conText1').getValue(), 'Y-m-d');
			content=dateTime.toString();
		}else{
			content=Ext.getCmp('conText').getValue();
		}
		var store_h = this.grid.getStore();
		store_h.proxy.conn.url = 'skmdb/knowledgeListByHql.html';
		Ext.apply(store_h.baseParams, {
					method : method,
					content : content,
					nodeId : nodeId,
					filterId : nodeId,
					stateId : stateId,
					modelName : modelName,
					code : node.attributes.code,
					typeCode : typeCode
				});
		store_h.reload({params:{start:0,limit:20}});
    }
	
});
