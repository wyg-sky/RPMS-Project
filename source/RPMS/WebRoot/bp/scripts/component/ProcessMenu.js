/**
 * 流程操作菜单
 * @param {} parent
 */
ProcessMenu = function(config){
	this.bpiId = '';
	this.jbpmTaskInstanceID = null;
	this.form = null;
	
	this.disableSkmdb = true;
	this.disableReq = true;
	this.disableInc = true;		//开启与事故关联操作
	this.disablePro = true;	 	//开启与问题关联操作
	this.disableChg = true;		//开启与变更关联操作
	this.disableRelease = true;		//开启与发布关联操作
	this.disableJoin = true;	 		//开启工单合并操作
	this.disableFork = true;	 		//开启工单分离操作
	this.disablePress = true;		//开启工单催办操作
	this.disableClose = true;		//开启快速关闭工单功能
	
	this.closeParent = false;
	
	Ext.apply(this,config);
	
	ProcessMenu.superclass.constructor.call(this, {
		items : [{
			text: '创建请求',
	        iconCls: "service-request-icon",
	        typeCode: 'request',
	        handler : this.doCreateProcess,
	        hidden : this.disableReq,
	        scope : this
		},{
			text: '转为事故',
	        iconCls: "incident-request-icon",
	        typeCode: 'Incident',
	        handler : this.doCreateProcess,
	        hidden : this.disableInc,
	        scope : this
		},{
			text: '创建问题',
	        iconCls: "problem-request-icon",
	        typeCode: 'Problem',
	        handler : this.doCreateProcess,
	        hidden : this.disablePro,
	        scope : this
		},{
			text: '创建变更',
	        iconCls: "change-request-icon",
	        typeCode: 'Change',
	        handler : this.doCreateProcess,
	        hidden : this.disableChg,
	        scope : this
		},{
			text: '提交知识',
	        iconCls: "change-request-icon",
	        typeCode: 'skmdb',
	        handler : this.doCreateKnowledge,
	        hidden : this.disableSkmdb,
	        scope : this
		},{
			text: '受理',
	        iconCls: "join-node-icon",
	        handler : this.doAccept,
	        hidden : true,
	        scope : this
		}/*,{
			text: '合并事故',
	        iconCls: "join-node-icon",
	        handler : this.doJoinNode,
	        scope : this
		}*/,{
			text: '拆分',
	        iconCls: "fork-node-icon",
	        handler : this.doForkNode,
	        hidden : this.disableFork,
	        scope : this
		},{
			text: '相似查找',
	        iconCls: "search-icon",
	        handler : this.similarSearch,
	        hidden : true,
	        scope : this
		},{
			text: '催办',
	        iconCls: "permissions-set-icon",//"press-request-icon",
	        handler : this.doPressRequest,
	        hidden : this.disablePress,
	        scope : this
		},{
			text: '备注',
	        iconCls: "approve-icon",//"comment-request-icon",
	        handler : this.doCommentRequest,
	        hidden : true,
	        scope : this
		},{
			text: '请求协助',
	        iconCls: "all-user-icon",//"request-cooperate-icon",
	        handler : this.doRequestCooperate,
	        scope : this
		}/*,{
			text: '回退',
	        iconCls: "rollback-icon",
	        handler : this.doRollBack,
	        scope : this
		}*/,{
			text: '关闭流程',
	        iconCls: "close-icon",
	        disabled: this.jbpmTaskInstanceID?false:true,
	        hidden : true,//this.disableClose,
	        handler : this.doFlowClose,
	        scope : this
		},{
			text: '申请作废',
	        iconCls: "delete-icon",
	        handler : this.doRequestDel,
	        hidden : true,
	        scope : this
		}]
	});
};

Ext.extend(ProcessMenu,  Ext.menu.Menu, {
	
	doCreateProcess : function(m_item){
		var bpiId= this.bpiId;
		var typeCode = this.typeCode;
		var closeParent = this.closeParent;
		Ext.Ajax.request({
			url:'bp/findByTypeCode.html?nodeId='+m_item.typeCode,
			method:'POST',
			success: function(response,options){
				var responseStr= Ext.util.JSON.decode(response.responseText);
				var openInTab = function(index){
					var createUrl=responseStr[index].createUrl;
					
					var viewCode = m_item.typeCode + '_ass_'+typeCode+'_create';
					var laststr = createUrl.substring(createUrl.indexOf('viewCode') );
					laststr = laststr.substring(laststr.indexOf('&'));
					createUrl = createUrl.substring(0,createUrl.indexOf('viewCode'))+'viewCode='+ viewCode + laststr;
					
					var bpid=responseStr[index].id;
					var title = responseStr[index].text;
					var tabpanel=m_item.parentMenu.parent.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;//需要修改获取方式
					
					if(tabpanel instanceof Ext.Window ){
						var win = new Ext.Window({
							title: $lang('bp.add')+title,
					 		layout:'fit',
					 		width:800,
					 		height:500,
					 		minWidth : 700,
					 		closeAction:'close',
					 		resizable:false,
					 		modal:true,
					 		plain:true,
					 		border : false
						});
						var p = new BpWorkbenchPanel(null,null,{op:'c'});
						win.add(p); win.show();
						p.load({
							url : createUrl,
							params : {
								tabpId: tabpanel.id,
								bpId : bpid,
								refBpiId : bpiId,
								associateBpis : bpiId+'*1'
							},
							//scope : this,
							scripts : true
						});
						
						if(closeParent) tabpanel.close();
						
					}else if(tabpanel instanceof Ext.TabPanel){
						if(closeParent) m_item.parentMenu.parent.ownerCt.ownerCt.ownerCt.ownerCt.close();
						var i = 1;
						var needCreate = true;
						while(tabpanel.items.length > i){//查找是否重复
							if(tabpanel.items.items[i].singletonSignal == createUrl +'_create'){
								tabpanel.activate(tabpanel.items.items[i].id);
								needCreate = false;
								break;
							}
							i++;
				        }
				        
				        if(needCreate){
				        	var p = new BpWorkbenchPanel(Ext.id() ,$lang('bp.add')+m_item.typeCode,{op:'c'});
				        	p.setTitle($lang('bp.add') +'_'+ title ),
							p.singletonSignal = createUrl +'_create';//控制每个流程只打开一个创建页面
							tabpanel.add(p).show();
							p.load({
								url : createUrl,
								params : {
									tabpId: tabpanel.id,
									bpId : bpid,
									refBpiId : bpiId,
									associateBpis : bpiId+'*1'
								},
								//scope : this,
								scripts : true
							});
				        }//end if
					}//end elseif
					
				}
				if(responseStr.length >1 ){
					var items = new Array();
		        	for(var i=0; i<responseStr.length; i++){
		        		items.push({
		        			value : i,
		        			boxLabel : responseStr[i].text
		        		})
		        	}
		        	var chooseWin = new Ext.Window({
		            	title : '请选择工单类型',
		            	layout : 'fit',
		            	width : 400,
		            	height : 200,
		            	buttonAlign : 'center',
		            	modal : true,
		            	resizable : false,
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
		            			
		            			openInTab(n);
		            		}
		            	}]
		            });
		            chooseWin.show();
				}else if(responseStr[0] && responseStr[0].createUrl){
					openInTab(0);
				}else{
					Ext.Msg.alert('提示','请求未发布，请联系管理员！');
				}
				
			},
			failure: function(){
				Ext.Msg.alert($lang('common.failure'),$lang('common.operationFailed'));
			}
		});
	},
	
	doCreateKnowledge : function(m_item){
		var typeCode = this.typeCode;//知识来源的类型
		var bpiId= this.bpiId;//知识来源的工单号
		var tabpanel = this.parent.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;//需要修改获取方式
		
		var bpi = null;
		Ext.lib.Ajax.syncRequest("POST", "bp/loadBpiById.html", "bpiId="+bpiId, {
			success : function(r,o){
				bpi = Ext.decode(r.responseText).root[0];
			}
		});
		
		var resolution = '';
		if(bpi.resolution){
			resolution = bpi.resolution;
		}
		var _content = '描述：'+bpi.description+'<br/><br/>'+'解决方案：'+resolution;
		var souceCode = typeCode=='Incident'?'SOURCE_INCIDENT':'SOURCE_PROBLEM'
		
		Ext.lion.ScriptLoader("skmdb/scripts/interface/IKnowledgeProcessForm.js");
		var p = new IKnowledgeProcessForm({
			title: "提交知识",
			kTabPanel: tabpanel,
			kTitle : bpi.summary,
			kContent : _content,
			kSourceCode: souceCode,
			closable: true
		});
		
		if(tabpanel instanceof Ext.Window){
			var win = new Ext.Window({
				title: '提交知识',
		 		layout:'fit',
		 		width:800,
		 		height:500,
		 		minWidth : 700,
		 		closeAction:'close',
		 		resizable:false,
		 		modal:true,
		 		plain:true,
		 		border : false
			});
			p = new IKnowledgeProcessForm({
				kTabPanel: win,
				kTitle : bpi.summary,
				kContent : _content,
				kSourceCode: souceCode,
				closable: true
			});
			win.add(p); 
			win.show();
		}else if(tabpanel instanceof Ext.TabPanel){
			tabpanel.add(p).show();
		}
		
	},
	
	doAccept : function(){
		alert('doAccept');
	},
	
	doJoinNode : function(){
		alert('doJoinNode');
	},
	
	doForkNode : function(){
		alert('doForkNode');
	},
	
	similarSearch : function(){
		alert('similarSearch');
	},
	
	doPressRequest : function(){
		Ext.lion.ScriptLoader('/ext/extension/CheckBoxGroup.js');
		var bpiId= this.bpiId;
		var pressWin = new Ext.Window({
			title : '催办',
    		layout : 'fit',
    		width : 400,
    		height : 260,
    		buttonAlign : 'center',
    		modal : true,
    		resizable : false,
    		items : [{
        		xtype : 'form',
        		layout : 'fit',
        		border:false,
        		labelWidth : 60,
        		bodyStyle:"padding:8px 8px 0",
        		items : [{
        			xtype : "hidden",
        			value : bpiId,
					name : "bpIds"
        		},{
        			xtype : 'ux-checkboxgroup',
        			fieldLabel : '提醒方式',
        			horizontal : true,
        			name : 'noticeMode',
        			checkboxes :[{
						xtype : "checkbox",
						checked : false,
						value : "message",
						boxLabel : "短信"
					},{
						xtype : "checkbox",
						checked : false,
						value : "mail",
						boxLabel : "邮件"
					},{
						xtype : "checkbox",
						checked : false,
						value : "desktop",
						boxLabel : "桌面提醒"
					}]
        			
        		},{
        			xtype : 'textarea',
        			name : 'comment',
        			fieldLabel : '备注',
//        			anchor: '100%',
        			width : '95%',
        			height: 135,
        			readOnly : false
        		}]
        	}],
        	buttons :[{
        		text : '确定',
        		handler : function(){
        			pressWin.items.items[0].form.submit({
        				url : 'bp/pressRequest.html',
						method : 'POST',
						waitTitle : '请稍候',
						waitMsg : '处理中...',
						success : function(form, action){
							Ext.Msg.alert("成功","处理成功!");
							pressWin.close();
						},
						failure : function(form, action){
							Ext.Msg.alert("失败","处理未成功!");
							pressWin.close();
						}
        			});
        		}
        	},{
        		text : '取消',
        		handler : function(){
        			pressWin.close();
        		}
        	}]
		});
		pressWin.show();
	},
	
	doCommentRequest : function(){
		var commentWin = new Ext.Window({
			title : '备注',
    		layout : 'fit',
    		width : 400,
    		height : 240,
    		buttonAlign : 'center',
    		modal : true,
    		resizable : false,
    		items : [{
        		xtype : 'form',
        		layout : 'fit',
        		border:false,
        		labelWidth : 60,
        		bodyStyle:"padding:8px 8px 0",
        		items : [{
        			xtype : 'textarea',
        			fieldLabel : '备注',
        			anchor: '100%',
        			height: 135,
        			readOnly : false
        		}]
        	}],
        	buttons :[{
        		text : '确定',
        		handler : function(){
        			alert('添加备注');
        		}
        	},{
        		text : '取消',
        		handler : function(){
        			commentWin.close();
        		}
        	}]
		});
		commentWin.show();
		
	},
	
	doRequestCooperate : function(){
		var chooseWin = new Ext.Window({
	            	title : '添加协同处理人',
	            	layout : 'fit',
	            	width : 400,
	            	height : 140,
	            	buttonAlign : 'center',
	            	modal : true,
	            	resizable : false,
	            	items : [{
	            		xtype : 'form',
	            		border:false,
	            		bodyStyle:"padding:10px 20px 0",
	            		items : [{
						    xtype : "hidden",
						    value : this.bpiId,
						    name : "bpiId"
						  },{
						    xtype : "hidden",
						    value : this.jbpmTaskInstanceID,
						    name : "tiId"
						  },{
					        xtype : "combowindow",
					        name : "actorsCombo",
					        fieldLabel : "协同处理人",
					        hiddenName : "cooperator",
					        displayField : "xingMing",
					        valueField : "id",
					        allowBlank : false,
					        anchor : "98%",
					        store :new Ext.data.Store({ 
					        	id:'transitionAssignStore',
					        	url : "admin/users!listForWin.html" ,
					        	baseParams:{"outCon": 'notme' },
					        	reader:new Ext.data.JsonReader({
									root : "root",
									totalProperty : "total",
									successProperty : "success",
									fields : [
										{  mapping : "id", type : "string", name : "id"
									  },{  mapping : "username", type : "string", name : "username"
									  },{  mapping : "code", type : "string", name : "code"
									  },{  mapping : "xingMing", type : "string", name : "xingMing"
									  },{  mapping : "department", type : "auto", name : "department"
									  },{  mapping : "jobTitle", type : "auto", name : "jobTitle"
									  },{  mapping : "phone", type : "string", name : "phone"
									  },{  mapping : "mobile",  type : "string", name : "mobile"
									  },{  mapping : "email",  type : "string", name : "email"
									  }]
								})
							}),
					        cm : new Ext.grid.ColumnModel([
				        			new Ext.grid.RowNumberer(),
				        			new Ext.grid.CheckboxSelectionModel(),
				        			{ dataIndex : "id",  header : "ID", hidden : true },
				        			{ dataIndex : "xingMing",  header : "姓名", sortable : true },
				        			{ dataIndex : "username", header : "帐号", sortable : true },
									{ dataIndex : "code", header : "员工编号", sortable : true },
									{ dataIndex : "department" , header : "部门", sortable : true, renderer : function (v) {  if (v && v.name) { return v.name; } else { return ""; }  } },
									{ dataIndex : "jobTitle", header : "职位", sortable : true, renderer : function (v) { if (v && v.name) {  return v.name;  } else {  return "";  }  } },
									{ dataIndex : "phone",  header : "电话", hidden : true, sortable : true },
									{ dataIndex : "mobile", header : "手机", hidden : true, sortable : true },
									{ dataIndex : "email",  header : "Email", hidden : true, sortable : true }
							]),
					        singleSelect : false,
					        searchCondition : [["xingMing","姓名","string"],["username","账号","string"],["code","编码","string"],["organization","单位","string"],["department","部门","string"]],
					        storeId : "transitionAssignStore",
					        sm : new Ext.grid.CheckboxSelectionModel()
					      }]
	            	}],
	            	buttons:[{
	            		text:$lang('bp.Ok'),
	            		handler:function(){
	            			var n = chooseWin.items.first().items.first().getValue();
	            			chooseWin.items.first().form.doAction('submit',{
	            				method: 'post',
	            				waitMsg: '正在提交，请等待……',
	            				url: 'bp/addCooperator.html',
	            				success: function(_form, _action) {
	            					Ext.Msg.alert('提示','添加成功！');
	            					chooseWin.close();
	            				},
	            				failure: function(_form, _action) {
	            					Ext.Msg.alert('提示','添加失败！');
	            					chooseWin.close();
	            				}
	            			});
	            		}
	            	},{
	            		text:"取消",
	            		handler:function(){
	            			chooseWin.close();
	            			
	            		}
	            	}]
	     });//chooseWin
	     chooseWin.show();
	},
	
	doRollBack : function(){
		alert('doRollBack');
	},
	
	doFlowClose : function(){//快速关闭工单————需选择关闭代码和状态码
		var scope = this;
		Ext.Msg.confirm('警告','工单关闭后将不能做任何修改，确认要关闭此工单吗？',function(ret){
			if(ret == 'yes'){
				Ext.Ajax.request({
					url : './bp/quickEnd.html',
					params : {bpiId : scope.parent.bpiId },
					method : 'POST',
					success: function(response,options){
						var responseStr= Ext.util.JSON.decode(response.responseText);
						if(responseStr.success){//refresh 
							scope.parent.flow_reOpen();
						}else{
							Ext.Msg.alert($lang('common.failure'),$lang('common.operationFailed'));
						}
					},
					failure: function(){
						Ext.Msg.alert($lang('common.failure'),$lang('common.operationFailed'));
					}
				});
			}
		},this);
	},
	
	doRequestDel : function(){//申请报废——将工单挂起并给高层人员发生消息等待高层销毁工单，使此工单不计入业务系统中
		var requestDelWin = new Ext.Window({
			title : '申请作废',
    		layout : 'fit',
    		width : 400,
    		height : 240,
    		buttonAlign : 'center',
    		modal : true,
    		resizable : false,
    		items : [{
        		xtype : 'form',
        		layout : 'fit',
        		border:false,
        		labelWidth : 60,
        		bodyStyle:"padding:8px 8px 0",
        		items : [{
        			xtype : 'textarea',
        			fieldLabel : '备注',
        			anchor: '100%',
        			height: 135,
        			readOnly : false
        		}]
        	}],
        	buttons :[{
        		text : '确定',
        		handler : function(){
        			alert('申请作废');
        		}
        	},{
        		text : '取消',
        		handler : function(){
        			requestDelWin.close();
        		}
        	}]
		});
		requestDelWin.show();
	}
});