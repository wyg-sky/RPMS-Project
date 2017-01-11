/**
 * 
 * @param {} id panel 的id 当处理流程时也是流程实例id
 * @param {} title panel的标题 处理流程时为流程的code
 */

BpWorkbenchPanel = function(id,title){
	
//	Ext.apply(this,config);
//	this.eastRegion = new BpHelpPanel();
//	this.centerRegion = new Ext.Panel({
//		region : 'center',
//		autoScroll : true
//		
//	});
//	var tbar = new Ext.Toolbar({
//				items : ["->", {
//							text : 'submit',
//							iconCls : "submit-icon",
//							handler : this.submit,
//							scope : this
//						},"-", {
//							text : 'close',
//							iconCls : "close-icon",
//							handler : this.close,
//							scope : this
//						}]
//			});
	BpWorkbenchPanel.superclass.constructor.call(this,{
		id : id?id:Ext.id(),
		title : title||""//,
//		tbar : tbar
//		,tbar : new FlowProcessToolBar()
//		layout : 'border',
//		items : [this.centerRegion/*,this.eastRegion*/]
	});
	
	
}

Ext.extend(BpWorkbenchPanel, Ext.Panel, {
	closable : true,
	autoScroll : true,
	_addOperator : function (response, options) {
        var responseArray = Ext.util.JSON.decode(response.responseText);
        try{
            var btn;
            for(var i=responseArray.btns.length-1;i>-1;i--){
            	btn = responseArray.btns[i];
            	btn.handler = this._addOpPanel;
            	btn.scope = this;
            	this.getTopToolbar().insertButton(0,btn );
            	btn = null;
            }
           // this.getTopToolbar().doLayout();
        }catch(e){
            Ext.Msg.alert("\u5931\u8d25", "取节点路由信息操作失败！");
        }
    },
    _addOpPanel : function(){
    	var btn = arguments[0];
    	var tab = this.formPanel.items.items[this.formPanel.items.length-1];
    	if(this.opCtnPanel)
    		tab.remove(this.opPanel);
//    	var conn = Ext.lib.Ajax.getConnectionObject().conn;
//		conn.open("GET", btn.url, false);
//		conn.send(null);
//    	var responseStr = conn.responseText;
    	
//    	responseStr = Ext.decode(responseStr);
    	this.opCtnPanel = new Ext.Panel({
	        title : "<font style='font-size: 10px' color='#ff3000' face='微软雅黑,simsun,Arial,Helvetica,Sans-Serif'>" + btn.text + "</font>",
	        iconCls : 'choosed-transition-icon',
	        bodyStyle : 'padding: 2px 5px 2px 5px',
	        layout : 'fit',
	        autoScroll : false,
//	        items : [responseStr]
	        autoLoad : {
	            url : btn.url, 
	            callback : function() {
//	            	Ext.getCmp('comment').focus();
	            },
	            method : "GET",
	            scripts : true,
	            callback : this._opCallback,
	            scope : this
	        }
	    });
	    tab.add(this.opCtnPanel).show();
    },
    _getCtnPanel:function(el){
    	var getCtnPanel = function(el){
			var id = el.id;
			var panel = Ext.getCmp(id);
			if(panel)
				return panel;
			else if(el.first())
				return getCtnPanel(el.first());
			else
				return false;
		}
		return getCtnPanel(el);
    },
	_getOperation : function(jbpmTIID){
		Ext.Ajax.request({
	        url : "bp/transitions.html",
	        scope : this,
	        params : {
	            jbpmTaskInstanceID : jbpmTIID
	        },
	        method : "GET",
	        success : this._addOperator , 
	        failure:function (response, options) {
	            Ext.MessageBox.alert("\u7cfb\u7edf\u63d0\u793a", "\u7cfb\u7edf\u53d1\u751f\u5185\u90e8\u9519\u8bef!" + response);
	            return;
	        }
	    });
	},
	
	close : function(){
		var container = this.ownerCt;
		if(container){
			container.remove(this,true);
		}
	},
	
	load : function(config){
		config.text = "加载中...";
		this.getUpdater().on('update', this._regForm,this);
		BpWorkbenchPanel.superclass.load.call(this,config);
//		if(config.params.jbpmTaskInstanceID)
//			this._getOperation(config.params.jbpmTaskInstanceID);
	},
	_regForm : function(el,oResponseObject){
		var formPanel = this._getCtnPanel(el);
		if(formPanel instanceof Ext.FormPanel)
			this.formPanel = formPanel;
		this.formPanel.ctPanel = this;
		this.formPanel.ownerCt = this;
	},
	loadBpi : function(bpiId){
		var scope = this;
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", 'bp/forProcessBpi.html?id='+bpiId, false);
		conn.send(null);
    	var responseStr = conn.responseText;
    	responseStr = Ext.decode(responseStr);
    	
        if (responseStr.root.length > 1) {//多于一个任务实例
        	var items = new Array();
        	for(var i=0; i<responseStr.root.length; i++){
        		items.push({
        			value : i,
        			boxLabel : responseStr.root[i].taskName
        		})
        	}
            var chooseWin = new Ext.Window({
            	title : $lang('bp.pleaseSelectProssingTask'),
            	layout : 'fit',
            	width : 400,
            	height : 200,
            	buttonAlign : 'center',
            	modal : true,
            	items : [{
            		xtype : 'form',
            		layout : 'fit',
            		border:false,
            		bodyStyle:"padding:10px 20px 0",
            		items : {
                		xtype : 'ux-radiogroup',
                		hideLabel : true,
                		horizontal : false,
                		items : items
                	}
            	}],
            	buttons:[{
            		text:$lang('bp.Ok'),
            		handler:function(){
            			var n = chooseWin.items.first().items.first().getValue();
            			chooseWin.close();
            			scope.setTitle(responseStr.root[n].code);
            			scope.load({
								url : responseStr.root[n].url,
								params : {id:bpiId,jbpmTaskInstanceID:responseStr.root[n].jbpmTaskInstanceID},
								scope : this,
								method : "GET",
								scripts : true
			            });
            		}
            	}]
            });
            chooseWin.show();
        }else {//仅有一个任务实例
        	scope.setTitle(responseStr.root[0].code);
        	scope.load({
				url : responseStr.root[0].url,
				params : {id:bpiId,jbpmTaskInstanceID:responseStr.root[0].jbpmTaskInstanceID},
				scope : this,
				method : "GET",
				scripts : true
            });
        }
	},
	_opCallback : function(el,response){
		var opPanel = this._getCtnPanel(el);
		if(opPanel)
			this.opPanel = opPanel;
	},
	submit : function(){
//		if(this.opPanel){
//			var valid = true;
//			this.opPanel.items.each(function(f){
//	           if(f.validate&&!f.validate()){
//	               valid = false;
//	           }
//	        });
//	        if(valid){
	        	if(this.formPanel.getForm().isValid())
					console.dir(this.formPanel.getForm().getValues());
				else{
					console.log("false");
					console.dir(this.opPanel);
				}
//	        }else{
//	        	Ext.Msg.alert("Error","请先进行处理1");
//	        }
//			
//		}else{
//			Ext.Msg.alert("Error","请先进行处理");
//		}
		
	}
	
});