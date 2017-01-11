/**
 * 
 * @param {} id panel 的id 当处理流程时也是流程实例id
 * @param {} title panel的标题 处理流程时为流程的code
 * {
 * 	bizData
 * 	centerRegion
 * 	eastRegion
 * 	topCmp
 * }
 */
Ext.lion.ScriptLoader(
		'bp/scripts/component/FlowProcessToolBar.js',
		'bp/scripts/BpHelpPanel.js');
BpWorkbenchPanel = function(id,title,config){
	
	this.bizData = {};
	
	this.centerRegion = new BpMainItemPanel(this,{
		region : 'center',
		barder : false,
		autoScroll : true
	});
	this.centerRegion.on('close',function(){ this.ownerCt.close(); },this);
	config = config || {};
	Ext.apply(config,{
		id : id||Ext.id(),
		title : title||""
	});
	if( config.items)delete config.items;
	config.items = [this.centerRegion];
	Ext.apply(this,config);
	
	BpWorkbenchPanel.superclass.constructor.call(this);
}

Ext.extend(BpWorkbenchPanel, Ext.Panel, {
	op : 'v',
	closable : true,
	autoScroll : true,
	border : false,
	layout : 'border',
	initComponent : function(){
		BpWorkbenchPanel.superclass.initComponent.call(this);
		this.on("beforedestroy",this._onBeforeDestroy,this);
		if(this.op!='c'){
			if(this.eastRegion && this.eastRegion instanceof Ext.Panel){
				this.eastRegion.region = 'east';
				this.add( this.eastRegion );
			}else{
				this.eastRegion = this.add(new BpHelpPanel());
				this.eastRegion.region = 'east';
			}
			this.on("beforeloadbpi",this._onBeforeLoadBpi,this);
		}
		
	},
	
	_onBeforeLoadBpi : function(e){
		//帮助自动匹配
		if(this.op!='c')e.src.eastRegion.loadKnowledge(e.bpiId);
	},
	
	initTbar : function(){
		var tbar = this.getTopToolbar();
//		tbar.initData(this.bizData);
	},
	
    destroy : function() {
        if (this.fireEvent("destroy", this) != false) {
            if (Ext.isIE) {
                this.el.remove();
                CollectGarbage();
                // 只注销了自己，包含的组件还没有一个好方法注销
                Ext.ComponentMgr.unregister(this);
            } else {
                // 非IE浏览器使用Panel自己的方法销毁
                Ext.Panel.prototype.destroy.apply(this);
            }
        }
    },
	/**
	 * 获取通过load方法加载的第一个顶层组件
	 * @param {} el
	 * @return {}
	 
    _getCtnPanel:function(el){
    	var getCtnPanel = function(el){
			var id = el.id;
			var cmp = Ext.getCmp(id);
			if(cmp)
				return cmp;
			else if(el.first())
				return getCtnPanel(el.first());
			else
				return false;
		}
		
		var catchedCmp = getCtnPanel(el);
		
		var traceToTop = function(cmp){
			if(cmp.ownerCt){
				return traceToTop(cmp.ownerCt);
			}else
				return cmp;
		}
		return traceToTop(catchedCmp);
    },*/
    
    _onBeforeDestroy : function(p){
    	if(this.topCmp&&this.topCmp.destroy)
    		this.topCmp.destroy();
    },
    
	close : function(){
		var container = this.ownerCt;
		if(container && container.close){
			container.close();
		}else if(container && container.remove){
			container.remove(this,true);
		} else{
			this.destory();
		}
	},
	
	load : function(config){
		var scope = this.centerRegion;
		scope.load(config);
	},
	
	/**
	 * 1、获得并注册加载的panel及form	等组件	2、初始化tbar的数据
	 * @param {} el
	 * @param {} oResponseObject
	 */
//	_onUpdate : function(el,oResponseObject){
//		
//		var topCmp = this._getCtnPanel(el);
//		if(topCmp instanceof Ext.FormPanel){
//			this.formPanel = topCmp;
//		}
////		topCmp.ownerCt= this;
//		topCmp.ownerCt= this.centerRegion;
//		topCmp.el.ctPanel= this;//不推荐使用该属性，在flow.js中将逐渐被取消
//		
//		this.topCmp = topCmp;
//		//init toolbar
//		this.initTbar();
//	},
	
	/**
	 * 加载工单
	 * @param {} bpiId
	 */
	loadBpi : function(bpiId){
		if(this.op!='c')this.fireEvent('beforeloadbpi',{src : this, bpiId : bpiId});
		
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
			            scope.bizData.id = bpiId;
			            scope.bizData.jbpmTaskInstanceID = responseStr.root[n].jbpmTaskInstanceID;
            		}
            	}]
            });
            chooseWin.show();
        }else {//仅有一个任务实例
        	scope.setTitle(responseStr.root[0].code);
        	if(! responseStr.root[0].jbpmTaskInstanceID){scope.eastRegion.hide(); scope.remove(scope.eastRegion); scope.doLayout();}
        	scope.load({
				url : responseStr.root[0].url,
				params : {id:bpiId,jbpmTaskInstanceID:responseStr.root[0].jbpmTaskInstanceID},
				scope : this,
				method : "GET",
				scripts : true
            });
            scope.bizData.id = bpiId;
			scope.bizData.jbpmTaskInstanceID = responseStr.root[0].jbpmTaskInstanceID;
        }
	},
	
	loadBpiForView : function(bpiId){
		var bpDef = this._getBpDef(bpiId);
		this.load({
			url: bpDef.viewUrl,
			params: {id:bpiId },
			scope : this,
			method : "GET",
			scripts : true
		});
	},
	
	loadBpiForEdit : function(bpiId){
		var bpDef = this._getBpDef(bpiId);
		this.load({
			url: bpDef.updateUrlForSubmit,
			params: {id:bpiId },
			scope : this,
			method : "GET",
			scripts : true
		});
	},
	
	_getBpDef : function(bpiId){
		var bpi = null;
		Ext.lib.Ajax.syncRequest("POST", "bp/loadBpiById.html", "bpiId="+bpiId, {
			success : function(r,o){
				bpi = Ext.decode(r.responseText).root[0];
			}
		});
		return bpi.bpDefFile;
	}
	
});

/**
 * 
 * @param {} mainPanel
 * @param {} config
 * {
 * 	_mainPanel
 * 	_targetPanel
 * }
 */
BpMainItemPanel = function(mainPanel,config){
	this._mainPanel = mainPanel;
	config = config||{};
	var autoLoad=false;
	if(config.autoLoad){
		autoLoad = config.autoLoad;
		config.url = config.autoLoad.url;
		delete config.autoLoad;
	}
	Ext.apply(this,config);
	BpMainItemPanel.superclass.constructor.call(this,config);
	this.on("beforedestroy",this._onBeforeDestroy,this);
	this.on("resize",this._onResize,this);
	if(autoLoad){
		this.load.defer(100,this,[autoLoad]);
	}
}
Ext.extend(BpMainItemPanel, Ext.Panel,{
	
	load : function(config){
		if(!this._loadMask){
			this._loadMask = new Ext.LoadMask(this.el,{
			     msg : '加载中....',
			     removeMask : true// 完成后移除
			});
		}
		this.getUpdater().on('update', this._onUpdate ,this);
		this._loadMask.show();
		BpMainItemPanel.superclass.load.call(this,config);
	},
	
	_getCtnPanel:function(el){
    	var getCtnPanel = function(el){
			var id = el.id;
			var cmp = Ext.getCmp(id);
			if(cmp) 	return cmp;
			else if(el.first()) 	return getCtnPanel(el.first());
			else 	return false;
		}
		
		var catchedCmp = getCtnPanel(el);
		
		var traceToTop = function(cmp){
			if(cmp.ownerCt){
				return traceToTop(cmp.ownerCt);
			}else
				return cmp;
		}
		return traceToTop(catchedCmp);
    },
    
    _onBeforeDestroy : function(p){
    	if(this._targetPanel.destroy)
    		this._targetPanel.destroy();
    },
    
    _onResize : function(p, adjWidth, adjHeight, rawWidth, rawHeight ){
    	if(this._targetPanel){
//    		this._targetPanel.setHeight(this.getInnerHeight());
//			this._targetPanel.setWidth(this.getInnerWidth());
//			this._targetPanel.syncSize();
			this._targetPanel.doLayout();
    	}
    		
    },
    
	_onUpdate : function(el,oResponseObject){
		var topCmp = this._getCtnPanel(el);
		topCmp.el.ctPanel= this._mainPanel;//不推荐使用该属性，在flow.js中将逐渐被取消
		this._mainPanel.topCmp = topCmp;
		if(topCmp){
			this._targetPanel = topCmp;
			topCmp.ownerCt = this;
		}
		if(this._loadMask){
			this._loadMask.hide();
		}
	}
	
});