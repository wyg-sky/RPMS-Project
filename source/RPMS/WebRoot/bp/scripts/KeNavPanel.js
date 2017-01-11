/**
 * 已知错误导航栏
 */
KeNavPanel=function(cfg){
	this.ketree= new Ext.tree.TreePanel({
		split:true,
		collapsible: true,
		rootVisible:false,
		margins:'0 0 0 0',
		cmargins:'0 0 0 0',
		border:false,
		lines:false,
		autoScroll:true,
		useArrows : true,
		loader: new Ext.tree.TreeLoader({}),
		root: new Ext.tree.AsyncTreeNode({
			draggable: false,
       		children: [{	
       			text: $lang('bp.allKnownErrors'), 
       			id:'all_error',  
       			targetId:'maincenterpanel', 
       			leaf: false, 
       			url:'bp/listBpke.html',
       			expanded : true,
       			iconCls: 'bp-ke-all-icon',
       			children : [{
       				text: $lang('bp.deletedKnownErrors'), //已清除
       				id:'no_using',  
       				targetId:'maincenterpanel', 
       				leaf: true, 
       				iconCls: 'bp-ke-disabled-icon',
       				url:'bp/listBpke.html?state=2'
       			}
       			,{
       				text: $lang('bp.usingKnownErrors'), //使用中
       				id:'in_using',  
       				targetId:'maincenterpanel', 
       				leaf: true, 
       				iconCls: 'bp-ke-using-icon',
       				url:'bp/listBpke.html?state=1'
       			}]
       		}]
		})
	});
	this.ketree.on('click', function(node, e){
			e.stopEvent();
			if(node.attributes.targetId){
				if(this.bpView) this.bpView.loadKE(node);
				else Ext.getCmp(node.attributes.targetId).loadData(node);
			}
		
		} , this);
	
	var config = {
//        id:'knownerrorSet-navi-view',
        region:'west',
        title:$lang('bp.knownErrors'),
        split:true,
        width: 225,
        minSize: 175,
        maxSize: 400,
        collapsible: true,
        margins:'0 0 0 0',
        cmargins:'0 0 0 0',
		layout:'fit',
//		layout:'accordion',
		collapseMode:'mini',
        lines:false,
        layoutConfig:{
            animate:true
        },
		items: [{
			border:false,
//			id : 'knownerrorSet',
//			title: $lang('bp.knownErrors'),
			autoScroll: true,
			items: this.ketree,
			iconCls:'menu-icon'
		}]
    };
	Ext.apply(config, cfg);
	
	KeNavPanel.superclass.constructor.call(this, config);
	if(! this.bpView) this.ketree.on("load",this.initLoaded,this);
}

Ext.extend(KeNavPanel, Ext.Panel,{
	initLoaded : function(node){
		if(node!=this.ketree.getRootNode()){
			return;
		}
		if(!(node.item&&node.item(0))) return;
		
		if(this.bpView) this.bpView.loadKE(node.item(0));
		else Ext.getCmp(node.attributes.targetId).loadData(node.item(0));
	}
});