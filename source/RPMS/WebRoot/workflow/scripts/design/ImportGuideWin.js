/**
 * 数据移植向导窗口
 * @param {} arg
 */
ImportGuideWin = function(arg){
	this.store = arg;
	/*上传文件面板*/
	this.uploadPanel = new Ext.form.FormPanel({
		labelAlign: 'left',
	  	border : false,
	  	labelWidth: 70,
	  	fileUpload: true,
	  	bodyStyle : "padding:15px 0 0 15px",
	  	runPrev: function(scope){  ; },
	  	runNext:  function(scope){ scope.uploadFile();},
	  	items :[{
	  		xtype : 'textfield', 
	  		allowBlank : false, 
	  		fieldLabel: '选择文件',
	  		name: 'srcfile' ,
	  		inputType:'file',
	  		regex : /\.jar$/,
	  		regexText : '请导入jar文件',
	  		listeners : { 
	  			'valid' : function(){ this.buttons[2].enable();},
	  			scope : this 
	  		}
	  	}]
	});
	
	var chooseStore = new Ext.data.SimpleStore({
		fields: ['key', 'value'],
		data :[
    		["ignore", "忽略"],
    		["override", "覆盖"],
    		["create",  "创建"]
	]});
	
	/*数据导入配置面板*/
	this.configPanel = new Ext.grid.EditorGridPanel({
	  	border : false,
	  	viewConfig : { forceFit : true},
	  	runPrev: function(scope){ scope.clearImport(); },
	  	runNext: function(scope){
	  		scope.doDataPersistSave(); 
	  		scope.fileListPanel.getLoader().load(scope.fileListPanel.root);  
	  	},
	  	store: new Ext.data.Store({
	        reader: new Ext.data.XmlReader({
	        	record : "Msg"
	        },[
	        	{name : 'id', mapping : "@id"},
	        	{name : 'operation', mapping : "operation"},
	        	{name : "modelName", mapping : "modelName"},
	        	{name : "field", mapping : "field@name"},
	        	{name : "fieldValue", mapping : "field"},
	        	{name : "flag", mapping : "flag"}
	        ])
	    }),
	    columns: [
	        {header: "数据类型", sortable: false, dataIndex: 'modelName'},
	        {header: "校验内容", sortable: false, dataIndex: 'field', hidden : true},
	        {header: "校验结果", sortable: false, dataIndex: 'flag',renderer : function(v){if(v=='repeat')return '<font color="red">冲突</font>';if(v=='success')return '成功'; return v;}},
	        {header: "操作", width : 40 , sortable: false, dataIndex: 'operation', editor : new Ext.form.ComboBox({
	        	valueField : "key",
	        	displayField: "value",
	        	triggerAction : "all",
	        	mode : 'local',
	        	store : chooseStore
	        }),
	        renderer : function(v){if(v=='ignore')return "忽略";if(v=='override')return '覆盖'; if(v=='create')return '创建'; return v;}}
	    ],
	    listeners : {'beforeedit' : function(e){
    		if(e.record.get("flag")== 'repeat')
    			chooseStore.loadData([["override", "覆盖"],["ignore", "忽略"]],false);
    		if(e.record.get("flag")== 'success')
    			chooseStore.loadData([["create",  "创建"],["ignore", "忽略"]],false);
    	}},
	    sm: new Ext.grid.RowSelectionModel({singleSelect:false})
	});
	
	/*文件导入配置面板*/
	this.fileListPanel = new Ext.tree.TreePanel({
		autoScroll : true,
		border : false,
		runPrev: function(scope){  scope.getValidation(); },
	  	runNext:  function(scope){ scope.postFileListAndSubmit(); },
	  	root: new Ext.tree.AsyncTreeNode({
	  		draggable: false ,
	  		text : "root"
	  	}),
	  	rootVisible : false,
	  	loader: new Ext.ux.XmlTreeLoader({
       		baseAttrs: { uiProvider: Ext.tree.TreeCheckNodeUI },
       		dataUrl: 'bp/getImportFileList.html',
       		processAttributes : function(attr){
       			if( attr.name){
       				attr.text=attr.name;
       			}else{
       				attr.text=attr.tagName;
       			}
       		},
       		listeners:{'load' : function(loader,node){ node.getOwnerTree().expandAll();}}
	    }),
	    listeners :{'checkchange' : function(node,check){
	    		var trace= function(n){
	    			if(n.childNodes){
	    				Ext.each(n.childNodes,function(item){ 
	    					item.getUI().check(check);
	    					if(item.childNodes) trace(item);
	    				})
	    			}
	    		};
	    		trace(node);
    		}
    	}
	});
	
	this.messagePanel = new Ext.Panel({
		border : false,
		html : "导入完成",
		runPrev: function(scope){ },
	  	runNext:  function(scope){ }
		
	});
	
	ImportGuideWin.superclass.constructor.call(this, {
		title : '导入',
		width : 500,
		height : 260,
		layout : 'card',
		resizable : false,
		buttonAlign: 'center',
		closeAction : 'close',
		modal : true,
		activeItem : 0,
		activeOrder : 0,
		items : [this.uploadPanel,this.configPanel, this.fileListPanel,this.messagePanel],
		onEsc : this._cancel,
		buttons : [
	  		{
			    text: '取消 ',
			    scope : this,
			    handler: this._cancel
			},{
			    text: '&laquo; 上一步',
			    disabled : true,
			    scope : this,
			    handler:  this._prev
			},{
			    text: '下一步 &raquo;',
			    disabled : true,
			    scope : this,
			    handler:  this._next
			},{
			    text: '完成  ',
			    disabled : true,
			    scope : this,
			    handler :  this._done
			}
	   ]
	});
	
	this.addEvents({'itemchange' : true});
	this.on("itemchange",this.onImpFpItemchange,this);
	this.on("destroy", this.clearImport,this);
}

Ext.extend(ImportGuideWin, Ext.Window,{
	
	//上传文件
	uploadFile : function(callback){
		var configPanel = this.configPanel;
		var scope = this;
		
		Ext.Ajax.request({
		   url: 'bp/doUpload.html',
		   form : scope.uploadPanel.form.id,
		   success: function(r, o){
		   		if(r.responseXML)
		   			configPanel.store.loadData(r.responseXML);
		   },
		   failure: function(r,o){
		   		Ext.Msg.alert('失败','文件上传失败！');
		   }
		});
		
	},
	
	//获取数据校验结果
	getValidation : function(){
		var configPanel = this.configPanel;
		Ext.Ajax.request({
		   url: 'bp/getValidation.html',
		   success: function(r, o){
		   		if(r.responseXML)
		   			configPanel.store.loadData(r.responseXML);
		   },
		   failure: function(r,o){
		   		Ext.Msg.alert('失败','获取校验信息失败！');
		   }
		});
	},
	
	//提交导入数据验证
	doDataPersistSave : function(){
		var configPanel = this.configPanel;
		var count = configPanel.store.getCount();
		var doc = new String("<permission>");
		for(var i = 0; i<count; i++){
			doc =doc.concat("<Msg id=\""+configPanel.store.getAt(i).get("id")+"\">");
			doc =doc.concat("<operation>");
			doc =doc.concat(configPanel.store.getAt(i).get("operation"));
			doc =doc.concat("</operation>");
			
			doc =doc.concat("<modelName>");
			doc =doc.concat(configPanel.store.getAt(i).get("modelName"));
			doc =doc.concat("</modelName>");
			
			doc =doc.concat("<field name=\""+configPanel.store.getAt(i).get("field")+"\">");
			doc =doc.concat(configPanel.store.getAt(i).get("fieldValue"));
			doc =doc.concat("</field>");
			
			doc =doc.concat("<flag>");
			doc =doc.concat(configPanel.store.getAt(i).get("flag"));
			doc =doc.concat("</flag>");
			doc =doc.concat("</Msg>");
		}
		doc =doc.concat("</permission>");
		
		
		Ext.Ajax.request({
		   url: 'bp/saveValidtion.html',
		   method : "POST", 
		   params: { xmlStr : doc },
		   success: function(r, o){
//		   		Ext.Msg.alert('成功','导入成功！');
		   },
		   failure: function(r,o){
//		   		Ext.Msg.alert('失败','导入失败！');
		   }
		});
	},
	
	postFileListAndSubmit : function(){
		var store = this.store;
		var fileListPanel = this.fileListPanel;
		var rootPath = fileListPanel.root.getPath('text');
		var list = fileListPanel.getChecked();
		var doc = "<fileList>";
		Ext.each(list, function(item){
			doc += "<file leaf=\""+item.isLeaf()+"\">"+item.getPath('text').substr(rootPath.length)+"</file>";
		});
		doc += "</fileList>";
		
		Ext.Ajax.request({
		   url: 'bp/doImport.html',
		   method : "POST", 
		   params: { filelist : doc },
		   success: function(r, o){
		   		var result = Ext.decode(r.responseText);
		   		if(result.success){
		   			Ext.Msg.alert('成功','导入成功！');
		   			if( store && store.reload)
		   				store.reload();
		   		}
		   		else if(result.msg){
		   			this._done();
		   			Ext.Msg.alert('提示', result.msg);
		   		}else
		   			Ext.Msg.alert('失败','导入失败！');
		   },
		   failure: function(r,o){
		   		Ext.Msg.alert('失败','导入失败！');
		   }
		});
		
	},
	
	clearImport : function(){
		Ext.Ajax.request({
		   url: 'bp/clearImport.html',
		   method : "POST", 
		   success: function(r, o){ },
		   failure: function(r,o){ }
		});
	},
	
	onImpFpItemchange : function(activOrder,num){
		if(activOrder==0){
			this.buttons[1].disable();
		}else{
			this.buttons[1].enable();
		}
		if(activOrder<num){
			this.buttons[2].enable();
			this.buttons[3].disable();
		}else{
			this.buttons[2].disable();
			this.buttons[3].enable();
		}
	},
	
	_cancel : function(btn){
		this.close();
	},
	
	_close : function(btn){
		this.close();
	},
	
	//上一步 按钮动作
	_prev : function(item){
		if( this.activeOrder > 0){
    		this.getLayout().activeItem.runPrev(this);
    		this.getLayout().setActiveItem( --this.activeOrder );
    		this.fireEvent("itemchange",this.activeOrder,this.items.length-1);
    	}
    },
	
    //下一步 按钮动作
	_next : function(item){
		if( this.activeOrder < this.items.length-1 ){
    		this.getLayout().activeItem.runNext(this);
    		this.getLayout().setActiveItem( ++this.activeOrder );
    		this.fireEvent("itemchange",this.activeOrder,this.items.length-1);
    	}
    },
    
    _done : function(){
    	this.close();
    }
	
});


