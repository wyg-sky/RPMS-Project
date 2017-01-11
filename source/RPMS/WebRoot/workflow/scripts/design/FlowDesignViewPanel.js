/**
 * 流程版本列表
 * @param {} tabPanel
 * @param {} node
 */
FlowDesignViewPanel = function(tabPanel,node){
	this.bpNode = node;
	this.tabPanel = tabPanel;
	var flowDesignView = this;
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store({
		autoLoad: true,
	    proxy: new Ext.data.HttpProxy({url: 'flow/loadBpDefinitionFilesByProcess.html?processId='+node.id}),	
		reader: new Ext.data.JsonReader({
		    root: 'root',
			totalProperty: 'total',
			successProperty :'success',
			fields: ["id","version","name","process","state",{name: 'stateHide',mapping: 'state'},"description","createdBy","createdOn","updatedBy","updatedOn","filePath"]
		})
	});
	var cols = new Ext.grid.ColumnModel([
		sm
		//,{dataIndex:"id",hidden: true}
		,{header:"版本",sortable:true,dataIndex:"version"}	
		,{header:"名称",sortable:true,dataIndex:"name"}		
		,{header:"流程",sortable:true,dataIndex:"process",renderer:function(val){if(typeof val=='string') return val; if(val) return val.name;}}
		//,{dataIndex:"stateHide",hidden: true}
		,{header:"状态",sortable:true,dataIndex:"state",renderer: this.stateRender}
		,{header:"描述",sortable:true,dataIndex:"description"}
		//,{header:"filePath",hidden: true,dataIndex:"filePath"}
	]);
	this.grid =  new Ext.grid.GridPanel({
	    id: 'flow-version-grid',
	    region:'center',
		loadMask: true,
		ds: store,
		cm: cols,
		sm: sm,
		autoScroll : true,
		height : '98%',
		viewConfig: {forceFit:true}
	});
	this.grid.on('rowcontextmenu', this.gridOnContextClick,this);
	this.grid.on('rowdblclick',this.gridOnDbClick,this);//双击显示流程表单设置情况
	this.grid1 = new Ext.grid.GridPanel({
    	id: 'flow-main1-grid1',
    	//title: '流程设置',
    	//region: 'south',
   		//loadMask: {msg:'正在载入 ...'},
   		viewConfig: {forceFit:true},
        store: new Ext.data.SimpleStore({
	    	data: [
		        ['创建流程的表单视图：',''],
		        ['流程编辑模式表单视图：',''],
		        ['流程只读模式表单视图：',''],
		        ['节点对应表单视图：',''],
		        ['路由对应表单视图：','']
		    ],
	    	autoLoad: true,
	        fields: ['file_item','file_state']
	    }),
        columns: [
            { header: '项目',width: document.body.clientWidth*0.3,dataIndex: 'file_item'},
            { header: '设置情况',width: document.body.clientWidth*0.5,dataIndex: 'file_state'}
        ],
        autoExpandColumn: 'file_item'
    });
	var fs1 = new Ext.Panel({ 
		layout:'fit',
		border : false,
		region : 'center',
		bodyStyle : "padding:5px 5px 0",
		items : [{ 
			title: '版本信息', 
			xtype : 'fieldset',
			height: '98%',
			layout:'fit',
			items : [this.grid]
		}]
	});
	var fs2 = new Ext.Panel({ 
		autoHeight: true,
		layout:'fit',
		border : false,
		region : 'south',
		bodyStyle : "padding:5px 5px 0",
		items : [{ 
			title: '设置信息', 
			xtype : 'fieldset',
			autoHeight: true,
			layout:'fit',
			items : [this.grid1]
		}]
	});

    FlowDesignViewPanel.superclass.constructor.call(this, {
        layout:'border',
        margins:'10 10 10 10',
        
        autoScroll: false,
        border: false,
        tbar: [
        	{text: '创建新版本',xaction: 'flow_file_delete',iconCls : 'bp-create-version-icon',handler: function(){flowDesignView.createFlow(flowDesignView)}}
//        	,'->',
//        	{text: '导入版本',xaction: 'flow_file_delete',iconCls : 'import-icon',hidden : true, handler: function(){flowDesignView.importDef(flowDesignView)}},
//        	{text: '导出版本',xaction: 'flow_file_delete',iconCls : 'export-icon',hidden : true, handler: function(){flowDesignView.exportDef(flowDesignView)}}
        ],
        items: [fs1,fs2]
    });
};

Ext.extend(FlowDesignViewPanel, Ext.Panel,{
	
	stateRender : function(val){
		if(val=='0') return '草稿';
		if(val=='1') return '已发布';
		if(val=='2') return '已激活';
	},
	
	//右键响应
	gridOnContextClick: function(grid,rowIndex,e){
		var formView = this;
		var record = grid.store.getAt(rowIndex);
		var editItem = new Ext.menu.Item({text : '编辑',xaction: 'flow_file_edit',iconCls : 'modify-icon'});
        editItem.on('click',this.editFlow,{designView: this,rowIndex: rowIndex});
        var viewItem = new Ext.menu.Item({text : '浏览',xaction: 'flow_file_view',iconCls : 'view-icon'});
        viewItem.on('click',this.viewFlow,{designView: this,rowIndex: rowIndex});
        var deleteItem = new Ext.menu.Item({text : '删除',xaction: 'flow_file_delete',iconCls : 'delete-icon'});
        deleteItem.on('click',this.deleteFlow,{designView: this,rowIndex: rowIndex});
        var deployItem = new Ext.menu.Item({text : '发布',xaction: 'flow_file_deploy',iconCls : 'bp-release-icon'});
        deployItem.on('click',this.deployFlow,{designView: this,rowIndex: rowIndex});
        var activeItem = new Ext.menu.Item({text : '激活',xaction: 'flow_file_active',iconCls : 'bp-activation-icon'});
        activeItem.on('click',this.activeFlow,{designView: this,rowIndex: rowIndex});
        var exportItem = new Ext.menu.Item({text : '导出',xaction: 'flow_file_view',iconCls : 'export-icon'});
        exportItem.on('click',this.activeFlow,{designView: this,rowIndex: rowIndex});
        switch(record.get('stateHide')){
        	case '0':
			activeItem.disable();
            break;
          case '1':
          	editItem.disable();
			deleteItem.disable();
			deployItem.disable();
            break;
          case '2':
			editItem.disable();
			deployItem.disable();
			activeItem.disable();
			deleteItem.disable();
            break;
        }
    	var rightClick = new Ext.menu.Menu({
            items : [editItem,viewItem,deployItem,activeItem,deleteItem]//,exportItem]
        });
        e.preventDefault();
        rightClick.showAt(e.getXY());
	},
	
	//双击响应事件
	gridOnDbClick : function(grid,rowIndex,e){
		var record = grid.store.getAt(rowIndex);
		var grid1 = this.grid1;
		Ext.Ajax.request({
			url: 'flow/bpFileAnalysis.html',
	        method: 'POST',
	        params: {name: record.get('process').name,version: record.get('version')},
			success: function(response,options){
				if(response){
		            var cEl = Ext.util.JSON.decode(response.responseText).cEl;
		            grid1.store.getAt(0).set('file_state',cEl);
		            var uEl = Ext.util.JSON.decode(response.responseText).uEl;
		            grid1.store.getAt(1).set('file_state',uEl);
		            var vEl = Ext.util.JSON.decode(response.responseText).vEl;
		            grid1.store.getAt(2).set('file_state',vEl);
		            var nodeEl = Ext.util.JSON.decode(response.responseText).nodeEl;
		            grid1.store.getAt(3).set('file_state',nodeEl);
		            var tranEl = Ext.util.JSON.decode(response.responseText).tranEl;
		            grid1.store.getAt(4).set('file_state',tranEl);
	            }
	        }
		});
	},
	
	//加载设计器工作台
	flowPanel: function(designView,title,operType,name,version,bpId,bpName,bpCode,fileId){
		//alert(title+'------'+operType+'------'+name+'------'+bpId+'------'+bpName);
		var tabPanel = designView.tabPanel;
		if(fileId) fileId = '&fileid='+fileId;
		else fileId = '';
		var panel = new Ext.Panel({
            title: title,
            layout: 'fit',
            html: '<iframe  frameborder="0"  scrolling="no" width="100%" height="100%" src = "workflow/flowDesign.jsp?opertype='+operType+'&name='+name+'&version='+version+'&bpid='+bpId+'&bpcode='+bpCode+'&bpname='+bpName+fileId+'" />',//workflow/demo/addprocess.jsp
            closable: true
        });
        tabPanel.add(panel);
        tabPanel.activate(panel);
		tabPanel.doLayout();
	},
	
	//创建流程版本
	createFlow: function(designView){
		var version = designView.getMaxVersion(designView.grid,'version');
		var selected = designView.grid.getSelectionModel().getSelected();
		var fileName = '';
		var fileVersion = '';
		var operType = '';
		var name = '';
		if(selected){
			operType = 'addby';
			fileName = selected.get('process').name;
			fileVersion = selected.get('version');
			name = selected.get('filePath').replace('define','').replace('.xml','');
		}else operType='add'
//		showMessage('创建新版本');
		designView.flowPanel(designView,'创建新版本',operType,name,version+1,this.bpNode.id,this.bpNode.text,this.bpNode.attributes.code);
			
	},
	
	//编辑流程版本
	editFlow: function(item,e){
		var designView = this.designView;
		//var version = designView.getMaxVersion(designView.grid,'version');
		var rowIndex = this.rowIndex;
		var record = designView.grid.store.getAt(rowIndex);
		var processName = record.get('filePath').replace('define','').replace('.xml','');
		var version = record.get('version');
		designView.flowPanel(designView,'编辑版本'+record.get('version'),'edit',processName,version,record.get('process').id,record.get('process').name,record.get('process').code,record.get('id'));
	},
	
	//查看流程版本
	viewFlow: function(item,e){
		var designView = this.designView;
		var rowIndex = this.rowIndex;
		var record = designView.grid.store.getAt(rowIndex);
		var processName = record.get('filePath').replace('define','').replace('.xml','');
		var version = record.get('version');
		designView.flowPanel(designView,'浏览版本'+record.get('version'),'view',processName,version,record.get('process').id,record.get('process').name,record.get('process').code);
	},
	
	//删除流程版本
	deleteFlow: function(item,e){
		var designView = this.designView;
		var rowIndex = this.rowIndex;
		var record = designView.grid.store.getAt(rowIndex);
		var m=Ext.MessageBox.confirm("提示","是否真的要删除选中的版本？",function(ret){
            if(ret=="yes"){
    			var fileId = record.get('id');
                Ext.Ajax.request({
                    url: 'flow/bpFileDelete.html',
                    method: 'POST',
                    params: {id: fileId},
                    success: function(response,options){
                        //获取响应的json字符串      
                        var responseStr = response.responseText;
                        if (responseStr == "success") {
							designView.grid.getStore().reload();
                        }else {
                            Ext.Msg.alert('失败', '删除失败，该版本不能被删除！');
                        }
                    }
                });
            }
        });
	},
	
	//发布流程版本
	deployFlow : function(item,e){
		var designView = this.designView;
		var rowIndex = this.rowIndex;
		var record = designView.grid.store.getAt(rowIndex);
		var m=Ext.MessageBox.confirm("提示","是否真的要发布选中的版本？",function(ret){
            if(ret=="yes"){
    			var fileId = record.get('id');
                Ext.Ajax.request({
                    url: 'flow/deployFile.html',
                    method: 'POST',
                    params: {id: fileId},
                    success: function(response,options){
                        //获取响应的json字符串      
                        var responseStr = response.responseText;
                        if (responseStr == "success") {
							designView.grid.getStore().reload();
                        }else {
                            Ext.Msg.alert('失败', '发布失败，该版本不能发布！');
                        }
                    }
                });
            }
        });
	},
	
	//激活流程版本
	activeFlow : function(item,e){
		var designView = this.designView;
		var rowIndex = this.rowIndex;
		var record = designView.grid.store.getAt(rowIndex);
		var m=Ext.MessageBox.confirm("提示","是否真的要激活选中的版本？",function(ret){
            if(ret=="yes"){
    			var fileId = record.get('id');
                Ext.Ajax.request({
                    url: 'flow/activeFile.html',
                    method: 'POST',
                    params: {id: fileId},
                    success: function(response,options){
                        //获取响应的json字符串      
                        var responseStr = response.responseText;
                        if (responseStr == "success") {
							designView.grid.getStore().reload();
                        }else {
                            Ext.Msg.alert('失败', '激活失败，该版本不能激活！');
                        }
                    }
                });
            }
        });
	},
	
	exportDef : function(item,e){
		alert('exportDef');
	},
	
	importDef : function(){
		alert('importDef');
	},
	
	 /**
	* @public
	* @param {} grid grid组件
	* @param {} column 字段 该字段必须是 int型
	*/
	getMaxVersion : function(grid,column){
		if(grid==null)return 0;
		if(column==null)return 0 ;
		var store = grid.getStore();
		var inx = grid.getStore().getCount();
		var tmp = -1;
		
		var maxNum = -1 ;
		for(var i=0; i<inx ; i++){
			tmp = store.getAt(i).data[column]*1;
			if( maxNum<tmp )maxNum = tmp ;
		}
		return maxNum == -1 ? 0: maxNum ;
	}
});