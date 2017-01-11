/**
 * 流程设计导航
 */
FlowDesignNavPanel = function() {

	this.flowDesignerTree = new FlowNavTree({
        root: new Ext.tree.AsyncTreeNode({
        			typeId: 'flowDesignerTree',
        			url: 'flow/bpTypeTree.html',
                    draggable: false
               })
    });
	this.flowDesignerTree.on('contextmenu',this.clickContextMenu,this);
	
    this.flowDesignerTree.on('beforeload',function(node){
    	if(node.attributes.classType=='com.dhcc.workflow.engine.model.BusinessProcess'){
    		
    		this.flowDesignerTree.loader.on('beforeload',function(){return false;});
    		
    		var category=new Ext.tree.TreeNode({
            	text: $lang('bp.category'),
            	type:'bpCategory',
            	leaf:true,
                iconCls:'category-icon',
            	url:'admin/bpCategorys.html'
            });
            var state=new Ext.tree.TreeNode({
            	text: $lang('bp.state'),
            	type:'bpState',
            	leaf:true,
                iconCls:'bp-state-icon',
            	url:'admin/bpStates.html'
            });
            var closeCode=new Ext.tree.TreeNode({
            	text: $lang('bp.closeCode'),
            	type:'bpCloseCode',
            	leaf:true,
                iconCls:'bp-close-code-icon',
            	url:'admin/bpCloseCodes.html'
            });
    		node=node.appendChild([/*category,*/state/*,closeCode*/]);
    		this.flowDesignerTree.loader.clearOnLoad=false;
    	}
    },this);
    
    var flowNavPanel = this;
    
    this.items = [{
        border : false,
        id : 'flow-designer-panel',
//        title : '流程管理',
        autoScroll : true,
        items : this.flowDesignerTree,
        iconCls : 'ff-flow-designer-icon',
        tbar: [
        	'->',
        	{text: '新建类型',xaction: 'flow_type_create',iconCls : 'create-icon',handler: this.createBpType ,scope : this}/*,'-',
        	{text: '导入流程',xaction: 'flow_import',iconCls : 'import-icon',handler: this.importBp  ,scope : this}*/
        ]
    }];
        
    FlowDesignNavPanel.superclass.constructor.call(this, {
        region : 'west',
        title : '流程设计',//$lang('workflow.flowNavPanel.workflowManagement')/*'流程管理'*/,
        split : true,
        width : 225,
        minSize : 175,
        maxSize : 400,
        collapsible : true,
        margins : '0 0 0 0',
        cmargins : '0 0 0 0',
        layout : 'fit',//'accordion',
        collapseMode : 'mini',
        lines : false,
        layoutConfig : {
            animate : true
        },
        items : this.items
    });
    //this.flowMonitorTree.on("load",this.initLoaded,this);
};

Ext.extend(FlowDesignNavPanel, Ext.Panel,{
	
	/*initLoaded : function(node){
		this.flowMonitorTree.getRootNode().expand(true);
		if(node!=this.flowMonitorTree.getRootNode()){
			return;
		}
		if(!(node.item&&node.item(0)&&node.item(0).item(0))) return;
		this.flowMonitorTree.onClick(node.item(0).item(0));
	},*/
	
    clickContextMenu : function(node,e){
    	if(node.attributes.classType=='com.dhcc.workflow.engine.model.BpType'){
			var editItem = new Ext.menu.Item({
				nodeId: node.id,
				xaction: 'flow_edit',
				text : '编辑('+node.text+')类型',
				iconCls : 'modify-icon',
				scope : this,
				handler: function(){ this.editBpType(node); }
			});
			var delItem = new Ext.menu.Item( {
        		nodeId: node.id,
        		xaction: 'flow_delete',
                text : '删除('+node.text+')类型',
                iconCls : 'delete-icon',
                scope : this,
                handler : function(){ this.delBpType(node); }
            });
            var add_bpItem = new Ext.menu.Item( {
        		nodeId: node.id,
        		xaction: 'flow_create',
                text : '新增('+node.text+')流程',
                iconCls : 'create-icon',
                scope : this,
                handler : function(){this.createFlow(node)}
            });
             var import_bpItem = new Ext.menu.Item( {
        		nodeId: node.id,
        		xaction: 'flow_import',
                text : '导入('+node.text+')流程',
                iconCls : 'import-icon',
                scope : this,
                handler : function(){this.importBp(this)}
            });
	    	var treeMenu = new Ext.menu.Menu({items :[editItem , delItem , add_bpItem /*, import_bpItem*/]});
		
		    coords = e.getXY();
		    treeMenu.showAt([coords[0], coords[1]]);
		 }else if(node.attributes.classType=='com.dhcc.workflow.engine.model.BusinessProcess'){
		 	var editItem = new Ext.menu.Item({
				nodeId: node.id,
				xaction: 'flow_edit',
				text : '编辑('+node.text+')',
				iconCls : 'modify-icon',
				scope : this,
				handler : function(){this.editBp(node)}
			});
			var delItem = new Ext.menu.Item( {
				id : node.id,
        		bpid: node.id,
        		xaction: 'flow_delete',
                text : '删除('+node.text+')',
                iconCls : 'delete-icon',
                scope :  this,
                handler : this.delBp
            });
             var exportItem = new Ext.menu.Item({
        		bpid: node.id,
        		xaction: 'flow_export',
                text : '导出('+node.text+')',
                iconCls : 'export-icon',
                handler : this.exportBp
            });
            
	    	var treeMenu = new Ext.menu.Menu({
	    		items : [editItem , delItem /*, exportItem*/ ]
	    	});
	    	
		    coords = e.getXY();
		    treeMenu.showAt([coords[0], coords[1]]);
		 }
		 
    },
    
    /**
     * 创建流程类型
     */
    createBpType : function(){
    	var flowDesignerTree = this.flowDesignerTree;
    	var createWin; 
        if(!createWin)
        	createWin = new BpTypeAddOrEdit(flowDesignerTree.root);
        createWin.setTitle($lang('bp.newTypeTitle'));
        createWin.show();
    },
    
    /**
     * 编辑流程类型
     */
    editBpType : function(node){
    	var createWin;
    	if(!createWin)
	    	createWin = new BpTypeAddOrEdit();
	    createWin.setTitle($lang('admin.bp.title.editType'));
	    var typeId = node.id;
	    createWin.bpTypeAOEForm.form.load({url:'admin/bpTypeForEdit.html?bpTypeId='+typeId});
        createWin.show();
    },
    
    /**
     * 删除流程类型
     */
    delBpType : function(node){
    	var typeId = node.id;
    	var flowDesignerTree = this.flowDesignerTree;
        var m=Ext.MessageBox.confirm($lang('common.tips'),$lang('bp.Msg.checkDel'),function(ret){
            if(ret=="yes"){
                Ext.Ajax.request({
                    url: 'admin/bpTypeDelete.html',
                    method: 'POST',
                    params: {bpTypeId:typeId},
                    success: function(response,options){
                        var responseStr = response.responseText;
                        if (responseStr == "success") {
                            //刷新面板
                        	node.getOwnerTree().root.reload();
                        	var centerPanel = flowDesignerTree.ownerCt.ownerCt.ownerCt.items.items[1];
							centerPanel.loadFlowManagerHome();
                        }else {
                            Ext.Msg.alert($lang('common.failure'), $lang('common.deleteFailure'));
                        }
                    }
                });
            }
        });
    },
    
    /**
     * 创建流程
     */
    createFlow : function(node){
		var bpForm = Ext.getCmp('BpFormWin');
		if(bpForm) return;
		else bpForm = new BpFormWin(node,'add');
	},
    
	/**
     * 编辑流程
     */
    editBp : function(node){//编辑流程，如果已经建立版本，则只有modulename可以修改别的都只读
    	var bpForm = new BpFormWin(node,'edit',node.id);
    	bpForm.setTitle('编辑流程');
    },
    
    /**
     * 删除流程
     */
    delBp : function(item,e){
    	var flowDesignerTree = this.flowDesignerTree;
    	var m=Ext.MessageBox.confirm("提示","是否真的要删除选中的流程？",function(ret){
            if(ret=="yes"){
                Ext.Ajax.request({
                    url: 'flow/bpDelete.html',
                    method: 'POST',
                    params: {id: item.bpid},
                    success: function(response,options){
                        //获取响应的json字符串      
                        var responseStr = response.responseText;
                        if (responseStr == "success") {
							flowDesignerTree.getNodeById(item.id).remove();//删除树节点
							//清空右侧版本信息栏 
							var centerPanel = flowDesignerTree.ownerCt.ownerCt.ownerCt.items.items[1];
							centerPanel.loadFlowManagerHome();
							
                        }else {
                            Ext.Msg.alert('失败', '该流程已经建立版本信息，不能删除！');
                        }
                    }
                });
            }
        },this);
    },
    
    /**
     * 导出流程
     */
    exportBp : function(item,e){
    	location.href ="bp/exportProcess.html?bpid="+ item.bpid;
    },
    
    /**
     * 导入流程
     */
    importBp : function(item,e){
    	var flowDesignerTree = this.flowDesignerTree;
		var w = new ImportGuideWin(flowDesignerTree.root);
		w.show();
    }
    
});

BpFormWin = function(node,operType,bpId) { 

	var thisWin = this;
	this.operType = operType;
	this.node = node;
//	this.flowNavPanel = flowNavPanel;
	BpFormWin.superclass.constructor.call(this,  {
		id: 'BpFormWin',
		title: '新建'+node.text+'流程',
        layout:'fit',
        width:450,
        height:250,
        closeAction:'close',
        buttonAlign : 'center',
        resizable : false,
        modal : true,
        plain: true
    });
    
    this._bodyWidth = document.body.clientWidth-15;
    
    this.bpForm = new Ext.FormPanel({
        labelWidth:75, 
        frame:false, 
        bodyStyle:'padding:5px 5px 0', 
        defaultType: 'textfield',
        autoHeight:true,
        border:false,
        reader:new Ext.data.JsonReader({
			root:"root", 
			fields:[
				{name:"businessProcess.id",  mapping:'id'},
				{name:"businessProcess.code",  mapping:'code'},
				{name:"businessProcess.name",  mapping:'name'},
				{name:"businessProcess.type",  mapping:'type'},
				{name:"businessProcess.modelName",  mapping:'modelName'},
				{name:"bpDFs",  mapping:'bpDefinitionFiles'},
				{name:"businessProcess.description",  mapping:'description'}
			]
		}),
		items: [
			{xtype: 'hidden',id:'businessProcess.id'}, 
			{xtype: 'hidden',id:'bpDFs'},
			{xtype: 'hidden',id:'businessProcess.type', name : 'businessProcess.type.id' , value : node.id },
			{fieldLabel:'编码', allowBlank:false,id:'businessProcess.code', anchor:'95%'},
			{fieldLabel:'名称', allowBlank:false,id:'businessProcess.name', anchor:'95%'}, 
			{xtype : 'hidden', id: 'businessProcess.modelName', valueField :'id'},
//			{
//				xtype : 'combo',
//				id: 'businessProcess.modelName',
//				fieldLabel: '模块名',
//				anchor:'95%',
//				triggerAction: 'all',
//				forceSelection:false,
//  				displayField :'text', 
//				valueField :'id',
//				allowBlank: false,
//				store : new Ext.data.Store({ 
//					proxy:new Ext.data.HttpProxy({url:'form/listAllModels.html'}),
//					reader:new Ext.data.JsonReader(
//						{id:'allModelsStore',root:'allModels'},
//						[{name:'id'},{name:'text'}]),
//					remoteSort:false,
//					autoLoad:true
//				}) 
//			},
//			this.createComboBox('businessProcess.type','流程类型','admin/bpTypes.html','bpType',{},'businessProcess.type.id',false),
			{fieldLabel:'描述',xtype: 'textarea', id:'businessProcess.description', anchor:'95%'} 
		]
    });
       
   	this.add({layout : 'fit' , frame : false , border : false , items : this.bpForm });
   	
   	
   	
   	this.addButton({text: '保存'},function(){thisWin.saveBp(thisWin)});
   	if('edit'==operType){ 
   		
   	}else{
   		this.addButton({text: '保存并下一步'},function(){thisWin.saveBp(thisWin,'next')});
   	}
    this.addButton({text: '取消'},function(){thisWin.close()});
    
	this.show();
	if('edit'==operType)this.initForm(bpId);
};

Ext.extend(BpFormWin, Ext.Window, {
	
	initForm : function(bpId){
		var bpForm = this.bpForm;
		bpForm.form.load({
			waitTitile : '请稍后',
			waitMsg : '加载中...',
			url:'flow/bpForEdit.html?id='+bpId,
			success : function(form,action){
				if(bpForm.findById('bpDFs').getValue()>0){//如果已经设置了版本就只能修改modulename，其它为只读
					bpForm.findById('businessProcess.code').getEl().dom.readOnly = true;
					bpForm.findById('businessProcess.name').getEl().dom.readOnly = true;
					bpForm.findById('businessProcess.type').getEl().dom.readOnly = true;
				}
			}
		});
	},
	
	createComboBox : function(_id,_fieldLabel,_url,_root,_listeners,_hiddenName,_allowBlank){
		var combo = new Ext.form.ComboBox({ 
  			id: _id,
            fieldLabel: _fieldLabel,
            allowBlank: _allowBlank,
			triggerAction: 'all',
			forceSelection :true,
			anchor:'95%', 
			displayField :'name', 
			valueField: 'id',
			hiddenName: _hiddenName,
			emptyText : '请选择 ... ', 
			store : new Ext.data.Store({
				autoLoad:true,
				proxy: new Ext.data.HttpProxy({url: _url}),
				reader: new Ext.data.JsonReader(
					{root: _root,id:'id',remoteSort : false},
					[{name:'id', mapping: 'id'},{name:'name', mapping: 'name'}] 
				)
			}), 
			listeners: _listeners
		});
		return combo;
	},
	
	saveBp: function(thisWin,oper){

		var bpForm = thisWin.bpForm;
		var vr = thisWin.formValidation();
		if(vr==true){
			bpForm.getForm().submit({
				waitMsg : "正在保存信息",
				waitTitle : "提示",
				url:'flow/bpSaveOrUpdate.html',
	            method:'post',
	            success:function(form,action){
	               var responseStr = action.result.root[0].id;
	               var repeat=action.result.root[0].repeat;
	               var name = action.result.root[0].name;
	               var code = action.result.root[0].code;
	               if(repeat){
	               		Ext.Msg.alert('提示','流程编码重复！请修改编码后重试！');
	               }else if(responseStr!=null && typeof(responseStr)=='string'){
	               		var flowDesignerTree = thisWin.node.getOwnerTree();
	               		var childNode = null;
	               		if('add'==thisWin.operType){//如果是新增就要在树上加一个节点
		               		var type = bpForm.findById("businessProcess.type").getValue();
		               		var node = thisWin.node;
		               		node.expand();
		               		childNode = new Ext.tree.AsyncTreeNode({id: responseStr,
		               												code: code,
		               												text:name,
		               												leaf:false,
		               												classType : 'com.dhcc.itsm.workflow.engine.model.BusinessProcess'
		               											});
							node.appendChild(childNode);
							if('next'==oper){
			                    thisWin.createBpFile(childNode);
							}
						}else{
							childNode = flowDesignerTree.getNodeById(bpForm.findById('businessProcess.id').getValue());
						}
						flowDesignerTree.fireEvent('click',childNode);	
	                    thisWin.close();
	                    
	               }else{
	               		Ext.Msg.alert('提示','出现错误！请重试！');
	               }
	           },
	           failure:function(){
	               Ext.Msg.alert('错误','服务器出现错误请稍后再试！');
	           }
			});
		}else{
			Ext.Msg.alert('提示',vr);
		}
	},
	
	createBpFile: function(node){
//		showMessage('创建流程新版本');
		var tabPanel = Ext.getCmp('flow-tabs');
		//alert(node.attributes.code);
		var panel = new Ext.Panel({
            title: '创建流程新版本',
            layout: 'fit',
            html: '<iframe  frameborder="0"  scrolling="no" width="100%" height="100%" src = "workflow/flowDesign.jsp?opertype=add&name='+(node.text+'_'+1)+'&version=1&bpid='+node.id+'&bpcode='+node.attributes.code+'&bpname='+node.text+'" />',//workflow/demo/addprocess.jsp
            closable: true
        });
        tabPanel.add(panel);
        tabPanel.activate(panel);
		tabPanel.doLayout();
	},
	
	formValidation: function(){
        var vr = true;
        var code = this.findById("businessProcess.code").getValue();
        var name = this.findById("businessProcess.name").getValue();
        var type = this.findById("businessProcess.type").getValue();
        if(""==code||"undefined"==code){
            vr="请输入编码";
        }else if(""==name||"undefined"==name){
            vr="请输入名称";
        }else if(""==type||"undefined"==type){
            vr="请选择流程类别";
        }
        return vr;
    }
    
});




