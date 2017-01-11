BpSetNavPanel = function() {
	
	this.bpTree = new NavTree({
        root: new Ext.tree.AsyncTreeNode({
            draggable: false,
            children: [{
            	text: $lang('bp.type'),
            	id:'bpType_root',
            	type:'bpType',
            	targetId:'bpSet-tabs',
            	leaf:true,
                iconCls:'type-icon',
            	url:'admin/bpTypes.html'
            },{
            	text: $lang('bp.category'),
            	id:'bpCategory_root',
            	type:'bpCategory',
            	targetId:'bpSet-tabs',
            	leaf:true,
                iconCls:'category-icon',
            	url:'admin/bpCategorys.html'
            },{
            	text: $lang('bp.state'),
            	id:'bpState_root',
            	type:'bpState',
            	targetId:'bpSet-tabs',
            	leaf:true,
                iconCls:'status-icon',
            	url:'admin/bpStates.html'
            },{
            	text: $lang('bp.closeCode'),
            	id:'bpCloseCode_root',
            	type:'bpCloseCode',
            	targetId:'bpSet-tabs',
            	leaf:true,
                iconCls:'close-code-icon',
            	url:'admin/bpCloseCodes.html'
            }
//            ,{
//            	text: '模板定制',
//            	id:'bpTemplate_root',
//            	type:'bpTemplate',
//            	targetId:'bpSet-tabs',
//            	leaf:true,
//                iconCls:'template-icon',
//            	url:'bp/listBpTpl.html'
//            }
            ]
       })
    });
	
	this.items = [{
		border:false,
		title:$lang('admin.bp.bpflSetting'),
		autoScroll: true,
        items:this.bpTree,
		iconCls:'menu-icon'
	}];
	
    BpSetNavPanel.superclass.constructor.call(this, {
        region:'west',
        title:$lang('admin.bp.workflowSetting'),
        split:true,
        width: 215,
        minSize: 215,
        maxSize: 280,
        collapsible: true,
        margins:'0 0 0 0',
        cmargins:'0 0 0 0',
		layout:'accordion',
		collapseMode:'mini',
        lines:false,
        layoutConfig:{
			animate:true
        },
		items: this.items
    });
};

Ext.extend(BpSetNavPanel, Ext.Panel);