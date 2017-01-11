

FlowProcessToolBar = function(config){
	
	Ext.lion.ScriptLoader("bp/scripts/component/ToolsMenu.js",false);
	Ext.lion.ScriptLoader("bp/scripts/component/ProcessMenu.js",false);
	
	this.businessDataForm = null;	//必须 	工单表单对象
	this.ctPanel = null;//必须  BpWorkbenchPanel	容器引用
	this.savehandle = function(){};//必须	保存操作句柄
	this.submithandle = function(){};//必须	提交操作句柄
	this.resethandle = function(){};//必须	重置操作句柄
	
	//流程数据
	this.bpiId = null;	//必须		工单id
	this.jbpmId = null;	//必须		流程id
	this.jbpmTransition = null; //必须	流程迁移名
	this.jbpmTaskInstanceID=null; //必须	任务实例id
	this.stateCode = null;	//流程提交后的状态 ——已交由后台处理(create 和createandsubmit方法需要处理)
	//	taskName		废弃的流程数据——已交由后台处理
	//	taskNodeName	废弃的流程数据——已交由后台处理
	
	//显示控制参数
	this.showReset = false;
	this.showSave = true;
	
	Ext.apply(this, config);
	
	FlowProcessToolBar.superclass.constructor.call(this , {
		autoWidth : true,
		autoHeight :true,
		items : [{
			  xtype : "tbfill"
			},{
			  text : "保存",
			  id : "flow-save",
			  iconCls : "save-icon",
			  scope : this,
			  hidden : !this.showSave,
			  handler : this.flow_save
			},{
			  text : "提交",
			  id : "flow-submit",
			  iconCls : "submit-icon",
			  scope : this,
			  handler : this.flow_submit
			},{
			  text : "重置",
			  iconCls : "reset-icon",
			  scope : this,
			  hidden : !this.showReset,
			  handler : this.flow_reset
			},{
			  xtype : "tbseparator"
			},{
	            text: "更多...",
	            iconCls: "mng-icon",
	            menu: new ProcessMenu({parent : this}),
	            scope: this
	        },{
			  xtype : "tbseparator"
			},{
		        text: "工具",
		        iconCls: "tools-icon",
		        menu: new ToolsMenu(),
		        scope: this
		    },{
			  xtype : "tbseparator"
			},{
			  text : "知识",
			  iconCls : "tips-d-icon",
			  scope : this,
			  handler : this.flow_relatedSk
		}]
	});
	
//	this.flow_getTransitions();
};

Ext.extend(FlowProcessToolBar , Ext.Toolbar, {
	
	initData : function(config){
		this.jbpmTaskInstanceID = config.jbpmTaskInstanceID;
		this.bpiId = config.id;
		this.flow_getTransitions();
	},
	
	flow_save : function(){
		if(this.savehandle)
			this.savehandle();
	},
	
	flow_submit : function(){
		if(this.submithandle)
			this.submithandle();
	},
	
	flow_reset : function(){
		if(this.resethandle)
			this.resethandle();
	},
	
	flow_close : function(){
		if(this.ownerCt &&  this.ownerCt.ownerCt && this.ownerCt.ownerCt.el.ctPanel){
			this.ownerCt.ownerCt.el.ctPanel.close();
		}else if(Ext.getCmp('taskWin')){//流程监控时查看流程页面的关闭处理
	    	Ext.getCmp('taskWin').close();
	    }else{ //外部访问时的关闭方法
	    	window.opener=null;
	        window.open('', '_self');
	        window.close();
	    }
	},
	
	flow_reOpen : function(){
		this.ownerCt.ownerCt.el.ctPanel.loadBpi(this.bpiId);
	},
	
	flow_getTransitions : function(){
		var scope = this;
		Ext.Ajax.request({
	        url : "bp/transitions.html", 
	        params : {
	            jbpmTaskInstanceID : scope.jbpmTaskInstanceID
	        },
	        success:function (response, options) {
	            var responseArray = Ext.util.JSON.decode(response.responseText);
	            try{
	                scope.insertButton(0, responseArray.btns);
	            }catch(e){
	                Ext.Msg.alert("\u5931\u8d25", "获取节点路由信息操作失败！");
	            }
	        }, 
	        failure:function (response, options) {
	            Ext.Msg.alert("\u7cfb\u7edf\u63d0\u793a", "\u7cfb\u7edf\u53d1\u751f\u5185\u90e8\u9519\u8bef!" + response);
	            return;
	        }
	    });
	},
	
	flow_relatedSk : function(){//知识关联
		alert('related skmdb');
	}
	
});

