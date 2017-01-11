/**
 * 流程监控首页
 * @param {} parent
 */
FlowMonitorHomePanel = function(parent) {
	var thisParent = parent;
	var thisPanel = this;
	var tools = [{
				id : 'close',
				handler : function(e, target, panel) {
					panel.ownerCt.remove(panel, true);
				}
			}];

				this.cookies = new CookieUtilForPortal();
			
				this.flowHomeDefaultRG = new Ext.ux.RadioGroup({
				fieldLabel : '是否始终显示首页',
				anchor : '95%',
				horizontal : true,
				radios : [{
							value : '0',
							boxLabel : '是',
							checked : true
						}, {
							value : '1',
							boxLabel : '否',
							checked : false
						}],
				listeners : {
					'change' : function(rg, o, n) {
						if (n == 1) {
							this.disableHomePage();
						} else if (n == 0) {
							this.enableHomePage();
						}
					},
					scope : this
				}
			})
			
				var titlePanel = new Ext.Panel({
				border : false,
				bodyStyle : "padding:5px 5px 5px 12px",
				frame : false,
				height : 26,
				layout : 'column',
				items : [{
					anchor : '98%',
					layout : "form",
					width : '33%',
					border : false,
					items : [this.flowHomeDefaultRG]
				}]

			});
			
//工单查询
	var searchPageSize = 6;
	var searchStoreReader=new Ext.data.JsonReader({
            root : 'root',
            totalProperty : 'total',
            successProperty : 'success'
        },[
            {name:'id'},
            {name:'code'},
            {name:'category'},
            {name:'state'},
            {name:'serviceLevel'},
            {name:'createdOn',type:'date',dateFormat : 'Y-m-d H:i:s'},
            {name:'summary'},
            {name:'description'},
            {name:'xingMing',mapping:'applicant',convert : function(v){if(v&&v.xingMing)return v.xingMing;else return '';}},
            {name:'depName',mapping:'applicant',convert : function(v){if(v&&v.department&&v.department.name)return v.department.name;else return '';}},
            {name:'phone',mapping:'applicant',convert : function(v){if(v&&v.phone)return v.phone;else return '';}},
            {name:'processors'},
            {name:'url'},
            {name:'editUrl'},
            {name:'bpDefFile'},
            {name:'processName'},
            {name:'jbpmTaskInstanceID'},
            {name:'jbpmProcessInstanceID'},
            {name:'taskName'},
            {name:'taskNodeName'}
            
        ]);
    
    var searchGridColumns =  [
            {
                header : $lang('workflow.flowMonitor.gridHeader.processNo'),//工单号
                sortable: true,
                width: 140,
                dataIndex : "code"
            }, {
                header : $lang('workflow.flowMonitor.gridHeader.summary'),//摘要
                sortable: true,
                width: 140,
                dataIndex : "summary"
            },{
                header : $lang('workflow.flowMonitor.gridHeader.catetory'),//类别
                dataIndex : "category",
                renderer : function(r){if(r && r.name) return r.name;else return ''}
            }, {
                header : $lang('workflow.flowMonitor.gridHeader.state'),//状态
                dataIndex : "state",
                renderer : function(r){if(r && r.name) return r.name;else return ''}
            }, {
                header : $lang('workflow.flowMonitor.gridHeader.serviceLevel'),//服务级别
                dataIndex : "serviceLevel",
                renderer : function(r){if(r && r.symbol) return r.symbol;else return ''}
            }, {
                header : $lang('workflow.flowMonitor.gridHeader.createOn'),//"创建时间"
                dataIndex : "createdOn",
                renderer : Ext.util.Format.dateRenderer('Y年m月d日 H:i:s')
        }];
        
    var searchStore = new Ext.data.Store({
        autoLoad: false,
        baseParams: {limit: searchPageSize},
        proxy : new Ext.data.HttpProxy({
            url : ''
        }),
        reader : searchStoreReader
    });
    
	var searchGrid = new Ext.grid.GridPanel( {
        store: searchStore,
        loadMask: {msg:$lang('workflow.flowViewPanel.loading')},//正在载入 ...
//        hidden:true,
        columns: searchGridColumns,
        height : 200,
        border : false,
        bbar : new Ext.PagingToolbar({
                    pageSize: searchPageSize,
                    store: searchStore, 
                    displayInfo: true,
                    displayMsg: $lang('workflow.flowMonitor.shortDisplayMsg'),//"{0}-{1}条记录，共{2}条",
                    emptyMsg: $lang('workflow.flowMonitor.emptyMsg')//"没有记录"
        }),
		listeners : {
        	'rowdblclick' : function(grid,rowIndex){
        		var tabPanel = thisParent.items.first().items.first();
        		var record = this.store.getAt(rowIndex);
				var id = record.get("id");
				var code = record.get("code");
				var readOnlyUrl = record.get("bpDefFile").viewUrl;
				var panel = new Ext.Panel({
							id : 'flow-search-result-view',
							closable : true,
							autoScroll : true,
							autoLoad : {
								url : readOnlyUrl,
								params : {
									id : id
								},
								scope : this,
								scripts : true
							}
//							,tbar: [{text:$lang('workflow.flowMonitor.tbar.back'),handler: function(){thisParent.setActiveTab(0)}}]//'返回流程首页'
						});
				thisParent.addNewWorkPanel(panel,code);
        	}
        }
    });

    var searchPanel = new Ext.Panel({
    	layout : 'form',
    	items:[{
    		xtype:'fieldset', 
        	autoHeight:true, 
        	anchor:'98%',
        	frame:false,
        	border : false,
        	layout:"column",
        	items:[{
	    		width : "52%",
				layout : "form",
				border : false,
				items : [{
					xtype : 'combo',
				    displayField : "name",
				    hiddenName : "processComboName",
				    valueField : "id",//索引名
				    allowBlank : false,
				    editable : false,
				    lazyRender : false,
				    hideLabel :true,
				    readOnly:true,
				    store : new Ext.data.Store({
				    	autoLoad: true,
				    	proxy: new Ext.data.HttpProxy({url: 'bp/list.html'}),
				    	reader: new Ext.data.JsonReader({
				    		root:'process'},
				    		[{name: 'id', mapping: 'id'},
				    		{name: 'name', mapping: 'name'}]
						), 
						remoteSort: true,
						listeners : {
				        	'load' : function(store,records){
				        		if(records && records.length>0){
				        			searchPanel.items.items[0].items.items[0].items.items[0].setValue(records[0].get('id'));
				        		}
				        	}
				        }
					}),
				    triggerAction : "all",
		            mode : 'remote',
		            anchor : "95%"
	        		}]
				},{
					width : "48%",
					layout : "form",
					border : false,
					items : [{
						xtype : 'combo',
						id : 'queryType',
						hideLabel :true,
						value : 'code',
						store : new Ext.data.SimpleStore({
							fields : ["name", "value"],
							data : [[$lang('bp.byCode'), 'code'],[$lang('bp.byCreator'), 'creator'],[$lang('bp.byCreateDate'), 'createDate']]
						}),
						valueField : "value",
						displayField : "name",
						mode : 'local',
						selectOnFocus : true,
						forceSelection : true,
						disableKeyFilter : true,
						triggerAction : 'all',
						listeners:{
							'select':function(){
								if(searchPanel.items.items[0].items.items[1].items.items[0].getValue()=='createDate'){
									searchPanel.items.items[0].items.items[2].items.items[0].hide();
									searchPanel.items.items[0].items.items[2].items.items[1].show();
								}else{
									searchPanel.items.items[0].items.items[2].items.items[0].show();
									searchPanel.items.items[0].items.items[2].items.items[1].hide();
								}
							}
			           },
			        anchor: "98%"
			        }]
				},{
						width : "50%",
						layout : "form",
						border : false,
						items:[{
							xtype : 'textfield',
							hideLabel :true,
							scope : this,
							listeners:{   
			            		specialkey:function(field,e){   
			                		if (e.getKey()==Ext.EventObject.ENTER){   
			                		}   
			            		}
			            	},
			            anchor: "98%"
						},{
								xtype : 'datefield',
								format : 'Y-m-d',
								emptyText:$lang('bp.pleaseSelectDate'),
								readOnly:false,
								hidden:true,
								scope : this,
								hideLabel :true,
								listeners:{   
				            		specialkey:function(field,e){   
				                		if (e.getKey()==Ext.EventObject.ENTER){   
				                			}   
				            		}
				            	},
			            		anchor:"89%"
			            }]
					},{
						width : "49%",
						layout : "column",
						border : false,
						items:[{
								columnWidth : .1,
								items : [new Ext.form.TextField({readOnly : true,disabled : true,style : "border:0;background:#ffffff;"})]
								},{
								columnWidth : .45,
								items : [
									new Ext.Button({text:$lang('workflow.flowMonitor.tbar.search'),minWidth : 70,handler : function(){//'查询'
											var processId = searchPanel.items.items[0].items.items[0].items.items[0].getValue();
						    				searchGrid.show();
						    				var queryType = searchPanel.items.items[0].items.items[1].items.items[0].getValue();
						    				var content = queryType=='createDate'?Ext.util.Format.date(searchPanel.items.items[0].items.items[2].items.items[1].getValue(), 'Y-m-d').toString():searchPanel.items.items[0].items.items[2].items.items[0].getValue();
											searchStore.proxy.conn.url = 'flow/bpiQuery.html';
											Ext.apply(searchStore.baseParams, {
													processId : processId,
													queryType : queryType,
													content : content
											});
											searchStore.reload({params:{start:0,limit:6}});
					    				}
					    			})
					    		]
								},{
								columnWidth : .45,
								items:[
									new Ext.Button({columnWidth : .49,text:$lang('workflow.flowMonitor.button.advanced'),minWidth : 70,handler:function(){thisParent.addNewWorkPanel(new FlowSearchPanel(thisParent),$lang('workflow.flowMonitor.advancedSearch'))}})
						    	]
								}
					   		 ]
					}]
				}
    	]
    });
    
//
////超时工单列表
//		var timeoutPageSize = 8;
//		var incidentProcessId = '10000000000000000000000000000000';
//		var problemProcessId = '8a8a18e52031f4e00120324c16820004';
//		var changeProcessId = '8a8a18d021995dcd012199b718ee0001';
//        var storeReader=new Ext.data.JsonReader({
//            root : 'root',
//            totalProperty : 'total',
//            successProperty : 'success'
//        },[
//            {name:'id'},
//            {name:'code'},
//            {name:'category'},
//            {name:'state'},
//            {name:'serviceLevel'},
//            {name:'createdOn',type:'date',dateFormat : 'Y-m-d H:i:s'},
//            {name:'summary'},
//            {name:'description'},
//            {name:'xingMing',mapping:'applicant',convert : function(v){if(v&&v.xingMing)return v.xingMing;else return '';}},
//            {name:'depName',mapping:'applicant',convert : function(v){if(v&&v.department&&v.department.name)return v.department.name;else return '';}},
//            {name:'phone',mapping:'applicant',convert : function(v){if(v&&v.phone)return v.phone;else return '';}},
//            {name:'processors'},
//            {name:'url'},
//            {name:'editUrl'},
//            {name:'bpDefFile'},
//            {name:'processName'},
//            {name:'jbpmTaskInstanceID'},
//            {name:'jbpmProcessInstanceID'},
//            {name:'taskName'},
//            {name:'taskNodeName'}
//            
//        ]);
//    
//    var gridColumns =  [
//            {
//                header : $lang('workflow.flowMonitor.gridHeader.processNo'),//"工单号",
//                sortable: true,
//                width: 140,
//                dataIndex : "code"
//            }, {
//                header : $lang('workflow.flowMonitor.gridHeader.summary'),//"摘要",
//                sortable: true,
//                width: 140,
//                dataIndex : "summary"
//            },{
////                header : $lang('workflow.flowMonitor.gridHeader.catetory'),//"类别",
////                dataIndex : "category",
////                renderer : function(r){if(r && r.name) return r.name;else return ''}
////            }, {
//                header : $lang('workflow.flowMonitor.gridHeader.state'),//"状态",
//                dataIndex : "state",
//                renderer : function(r){if(r && r.name) return r.name;else return ''}
//            }, {
//                header : $lang('workflow.flowMonitor.gridHeader.serviceLevel'),//"服务级别",
//                dataIndex : "serviceLevel",
//                renderer : function(r){if(r && r.symbol) return r.symbol;else return ''}
//            }, {
//                header : $lang('workflow.flowMonitor.gridHeader.createOn'),//"创建时间",
//                dataIndex : "createdOn",
//                renderer : Ext.util.Format.dateRenderer('Y年m月d日 H:i:s')
//        }];
//    
//    var incTimeoutStore = new Ext.data.Store({
//        autoLoad: true,
//        baseParams: {limit : timeoutPageSize},
//        proxy : new Ext.data.HttpProxy({
//            url : 'flow/listTimeoutBpi.html?processId='+incidentProcessId
//        }),
//        reader : storeReader
//    });
//    
//    var proTimeoutStore = new Ext.data.Store({
//        autoLoad: true,
//        baseParams: {limit : timeoutPageSize},
//        proxy : new Ext.data.HttpProxy({
//            url : 'flow/listTimeoutBpi.html?processId='+problemProcessId
//        }),
//        reader : storeReader
//    });
//    
//    var chaTimeoutStore = new Ext.data.Store({
//        autoLoad: true,
//        baseParams: {limit : timeoutPageSize},
//        proxy : new Ext.data.HttpProxy({
//            url : 'flow/listTimeoutBpi.html?processId='+changeProcessId
//        }),
//        reader : storeReader
//    });
//
//    var incTimeoutGrid = new Ext.grid.GridPanel( {
//        store: incTimeoutStore,
//        loadMask: {msg:$lang('workflow.flowMonitor.loading')},//'正在载入 ...'
//        columns: gridColumns,
//        bpTypeCode : 'Incident',
//        border : false,
//        bpTypeName : $lang('workflow.flowMonitor.incidentRequest'),//'事故请求',
//        bbar : new Ext.PagingToolbar({
//                    pageSize: timeoutPageSize,
//                    store: incTimeoutStore, 
//                    displayInfo: true,
//                    displayMsg: $lang('workflow.flowMonitor.shortDisplayMsg'),//"{0}-{1}条记录，共{2}条",
//                    emptyMsg: $lang('workflow.flowMonitor.emptyMsg')//"没有记录"
//        }),
//       	listeners : {
//        	'rowdblclick' : function(grid,rowIndex){
//        		var tabPanel = thisParent.items.first().items.first();
//        		var record = this.store.getAt(rowIndex);
//				var id = record.get("id");
//				var code = record.get("code");
//				var readOnlyUrl = record.get("bpDefFile").viewUrl;
//				var panel = new Ext.Panel({
//							id : 'flow-search-result-view',
//							closable : true,
//							autoScroll : true,
//							autoLoad : {
//								url : readOnlyUrl,
//								params : {
//									id : id
//								},
//								scope : this,
//								scripts : true
//							}
//						});
//				thisParent.addNewWorkPanel(panel,code);
//        	}
//        }
//    });
//    
//    var proTimeoutGrid = new Ext.grid.GridPanel( {
//        store: proTimeoutStore,
//        loadMask: {msg:$lang('workflow.flowMonitor.loading')},//'正在载入 ...'
//        columns: gridColumns,
//        bpTypeCode : 'Problem',
//        bpTypeName : $lang('workflow.flowMonitor.problemRequest'),//'问题请求',
//        border : false,
//        bbar : new Ext.PagingToolbar({
//                    pageSize: timeoutPageSize,
//                    store: proTimeoutStore, 
//                    displayInfo: true,
//                    displayMsg: $lang('workflow.flowMonitor.shortDisplayMsg'),//"{0}-{1}条记录，共{2}条",
//                    emptyMsg: $lang('workflow.flowMonitor.emptyMsg')//"没有记录"
//        })
//        ,listeners : {
//        	'rowdblclick' : function(grid,rowIndex){
//        		var tabPanel = thisParent.items.first().items.first();
//        		var record = this.store.getAt(rowIndex);
//				var id = record.get("id");
//				var code = record.get("code");
//				var readOnlyUrl = record.get("bpDefFile").viewUrl;
//				var panel = new Ext.Panel({
//							id : 'flow-search-result-view',
//							closable : true,
//							autoScroll : true,
//							autoLoad : {
//								url : readOnlyUrl,
//								params : {
//									id : id
//								},
//								scope : this,
//								scripts : true
//							}
//						});
//				thisParent.addNewWorkPanel(panel,code);
//        	}
//        }
//    });
//    
//    var chaTimeoutGrid = new Ext.grid.GridPanel( {
//        store: chaTimeoutStore,
//        loadMask: {msg:$lang('workflow.flowMonitor.loading')},//'正在载入 ...'
//        columns: gridColumns,
//        bpTypeCode : 'Change',
//        bpTypeName : $lang('workflow.flowMonitor.changeRequest'),//'变更请求',
//        border : false,
//        bbar : new Ext.PagingToolbar({
//                    pageSize: timeoutPageSize,
//                    store: chaTimeoutStore, 
//                    displayInfo: true,
//                    displayMsg: $lang('workflow.flowMonitor.shortDisplayMsg'),//"{0}-{1}条记录，共{2}条",
//                    emptyMsg: $lang('workflow.flowMonitor.emptyMsg')//"没有记录"
//        })
//        ,listeners : {
//        	'rowdblclick' : function(grid,rowIndex){
//        		var tabPanel = thisParent.items.first().items.first();
//        		var record = this.store.getAt(rowIndex);
//				var id = record.get("id");
//				var code = record.get("code");
//				var readOnlyUrl = record.get("bpDefFile").viewUrl;
//				var panel = new Ext.Panel({
//							id : 'flow-search-result-view',
//							closable : true,
//							autoScroll : true,
//							autoLoad : {
//								url : readOnlyUrl,
//								params : {
//									id : id
//								},
//								scope : this,
//								scripts : true
//							}
//						});
//				thisParent.addNewWorkPanel(panel,code);
//        	}
//        }
//    });
//    
//    var timeoutTaskPanel = new Ext.TabPanel({
//        activeTab : 0
//        ,width : "auto"
//        ,height : "auto"
//        ,border : false
//        ,items : [{
//            xtype : "panel"
//            ,id : "incTimeoutPanel"
//            ,layout : "fit"
//            ,autoScroll : true
//            ,border : false
//            ,title : $lang('workflow.flowMonitor.incidentRequest')//'事件请求'
//            ,items : [incTimeoutGrid]
//        },{
//            xtype : "panel"
//            ,id : "proTimeoutPanel"
//            ,layout : "fit"
//            ,autoScroll : true
//            ,border : false
//            ,title : $lang('workflow.flowMonitor.problemRequest')//'问题请求'
//            ,items : [proTimeoutGrid]
//        },{
//            xtype : "panel"
//            ,id : "chaTimeoutPanel"
//            ,layout : "fit"
//            ,autoScroll : true
//            ,border : false
//            ,title : $lang('workflow.flowMonitor.changeRequest')//'变更请求'
//            ,items : [chaTimeoutGrid]
//        }]
//    });
    
//工单信息统计
	var statisticsStoreReader=new Ext.data.JsonReader({
            root : 'root',
            totalProperty : 'total',
            successProperty : 'success'
        },[
            {name:'id'},
            {name:'name'},
            {name:'total'},
            {name:'processing'},
            {name:'timeout'} 
        ]);
    
    var statisticsGridColumns =  [
    		{
                header : $lang('workflow.flowMonitor.gridHeader.processName'),//"流程",
                sortable: true,
                dataIndex : "name"
            },{
            	header : $lang('workflow.flowMonitor.gridHeader.total'),//"总数",
                sortable: true,
                dataIndex : "total"
            },{
            	header : $lang('workflow.flowMonitor.gridHeader.processing'),//"处理中",
                sortable: true,
                dataIndex : "processing"
            },{
            	header : $lang('workflow.flowMonitor.gridHeader.timeout'),//"超时",
                sortable: true,
                dataIndex : "timeout"
        }];
        
    var statisticsStore = new Ext.data.Store({
        autoLoad: true,
        proxy : new Ext.data.HttpProxy({
            url : 'flow/processStatistics.html'
        }),
        reader : statisticsStoreReader
    });
    
	var statisticsGrid = new Ext.grid.GridPanel( {
        store: statisticsStore,
        loadMask: {msg:$lang('workflow.flowMonitor.loading')},//'正在载入 ...'
        columns: statisticsGridColumns,
        autoScroll: true,
        viewConfig: {forceFit:true}
    });
	
	var categoryChartType = "pie";
	
	this.beginDate = new Ext.form.DateField({
		format : "Y-m-d H:i:s",
		width : 130,
		emptyText : $lang('bp.pleaseSelectDate'),
		readOnly : true,
		name : 'beginDate',
		vtype : 'daterange',
		withTime : true
	});
	
	this.endDate = new Ext.form.DateField({
		format : 'Y-m-d H:i:s',
		width : 130,
		emptyText : $lang('bp.pleaseSelectDate'),
		readOnly : true,
		name : 'endDate',
		vtype : 'daterange',
		withTime : true
	});
	
//	this.beginDate.endDateField = this.endDate;
//	this.endDate.startDateField = this.beginDate;
	
	this.categoryChartProcessCombo = new Ext.form.ComboBox({
			xtype : 'combo',
			fieldLabel : $lang('workflow.flowMonitor.gridHeader.processName'),//"流程",
			displayField : "name",
			valueField : "id",
			editable : false,
			lazyRender : false,
			readOnly:true,
			width : 100,
			id : 'processComboOfCategoryChart',
			store : new Ext.data.Store({
				proxy: new Ext.data.HttpProxy({url: 'bp/list.html'}),
				reader: new Ext.data.JsonReader({
					root:'process'},
					[{name: 'id', mapping: 'id'},
					{name: 'name', mapping: 'name'}]
					), 
				remoteSort: true,
				autoLoad : true,
				listeners : {
					scope : this,
					'load' : function(store,records){
						if(records && records.length>0){
							Ext.getCmp('processComboOfCategoryChart').setValue(records[0].get('id'));
							var beginValue = Ext.util.Format.date(this.beginDate.getValue(), 'Y-m-d H:i:s');
							var endValue = Ext.util.Format.date(this.endDate.getValue(), 'Y-m-d H:i:s');
							var args = Ext.urlEncode({
								processId : records[0].get('id'),
								graphType : categoryChartType,
								beginDate : beginValue,
								endDate : endValue,
    							graphData : "cCount"
							});
							var dataUrl = 'servicevalue/processsStaticByCategory.html?'+args;
							var swfUrl = 'ext/extension/amchart/am'+categoryChartType+'.swf';
							this.loadChart(this.categoryChartPanel.items.items[0], dataUrl, swfUrl);
						}
					}
				}
			}),
			triggerAction : "all",
			mode : 'local',
			anchor : "98.5%",
			listeners : {
				scope : this,
				'select': function(combo, record, index) {
					if(this.beginDate.getValue()!=""&&this.endDate.getValue()!=""&&this.beginDate.getValue()>this.endDate.getValue()){
						Ext.Msg.alert("提示","开始日期应该小于结束日期！");
					}else{
						this.beginDate.reset();
						this.endDate.reset();
						var beginValue = Ext.util.Format.date(this.beginDate.getValue(), 'Y-m-d H:i:s');
						var endValue = Ext.util.Format.date(this.endDate.getValue(), 'Y-m-d H:i:s');
						var args = Ext.urlEncode({
							processId : combo.getValue(),
							graphType : categoryChartType,
							beginDate : beginValue,
							endDate : endValue,
							graphData : "cCount"
						});
						var dataUrl = 'servicevalue/processsStaticByCategory.html?'+args;
						var swfUrl = 'ext/extension/amchart/am'+categoryChartType+'.swf';
						this.loadChart(this.categoryChartPanel.items.items[0], dataUrl, swfUrl);
					}
			}
		}
	});
	
	this.searchBtn = {
			iconCls : 'search-icon',
			scope: this,
			handler : function(){
				if(this.beginDate.getValue()!=""&&this.endDate.getValue()!=""&&this.beginDate.getValue()>this.endDate.getValue()){
					Ext.Msg.alert("提示","开始日期应该小于结束日期！");
				}else{
			 		var beginValue = Ext.util.Format.date(this.beginDate.getValue(), 'Y-m-d H:i:s');
					var endValue = Ext.util.Format.date(this.endDate.getValue(), 'Y-m-d H:i:s');
					var args = Ext.urlEncode({
						processId : this.categoryChartProcessCombo.getValue(),
						graphType : categoryChartType,
						beginDate : beginValue,
						endDate : endValue,
						graphData : "cCount"
					});
					var dataUrl = 'servicevalue/processsStaticByCategory.html?'+args;
					var swfUrl = 'ext/extension/amchart/am'+categoryChartType+'.swf';
					this.loadChart(this.categoryChartPanel.items.items[0], dataUrl, swfUrl);
				}
		}
	};
//流程状态饼图
	this.categoryChartPanel = new Ext.Panel({
		layout : 'fit',
		border : false,
		tbar : new Ext.Toolbar({
			scope : this,
			items : [$lang('workflow.flowMonitor.gridHeader.processName'),this.categoryChartProcessCombo,"从",this.beginDate,"到",this.endDate,this.searchBtn,'->',{
                	xtype : "tbbutton",
                	text : "切换",
                	scope : this,
                	handler : function(){
						if(this.beginDate.getValue()!=""&&this.endDate.getValue()!=""&&this.beginDate.getValue()>this.endDate.getValue()){
							Ext.Msg.alert("提示","开始日期应该小于结束日期！");
						}else{
							var dataUrl = 'servicevalue/processsStaticByCategory.html?';
							var beginValue = Ext.util.Format.date(this.beginDate.getValue(), 'Y-m-d H:i:s');
							var endValue = Ext.util.Format.date(this.endDate.getValue(), 'Y-m-d H:i:s');
	                		if(categoryChartType == "pie"){
	                			categoryChartType = "column";
	                			dataUrl += Ext.urlEncode({
	    							processId : this.categoryChartProcessCombo.getValue(),
	    							graphType : categoryChartType,
	    							beginDate : beginValue,
	    							endDate : endValue,
	    							graphData : "cCount"
	    						});
	                		}else if(categoryChartType == "column"){
	                			categoryChartType = "pie";
	                			dataUrl += Ext.urlEncode({
	    							processId : this.categoryChartProcessCombo.getValue(),
	    							graphType : categoryChartType,
	    							beginDate : beginValue,
	    							endDate : endValue,
	    							graphData : "cCount"
	    						});
	                		}
	                		var swfUrl = 'ext/extension/amchart/am'+categoryChartType+'.swf';
	                		this.loadChart(this.categoryChartPanel.items.items[0], dataUrl, swfUrl);
						}
					}
                }]
		}),
		items : [{
			xtype: 'flashpanel',
			height : 400,
			margins : '0 0 0 50',
			padding : '50 0 0 0',
	        autoWidth : true,
	        collapsible : true,
	        border : false
		}]
	});
	
	this.threatenedSlaChartProcessCombo = new Ext.form.ComboBox({
			xtype : 'combo',
			fieldLabel : $lang('workflow.flowMonitor.gridHeader.processName'),//"流程",
			displayField : "name",
			valueField : "id",
			editable : false,
			lazyRender : false,
			readOnly:true,
			width : 100,
			id : 'processComboOfThreatenedSlaChart',
			store : new Ext.data.Store({
				proxy: new Ext.data.HttpProxy({url: 'bp/list.html'}),
				reader: new Ext.data.JsonReader({
					root:'process'},
					[{name: 'id', mapping: 'id'},
					{name: 'name', mapping: 'name'}]
					), 
				remoteSort: true,
				autoLoad : true,
				listeners : {
					scope : this,
					'load' : function(store,records){
						if(records && records.length>0){
							Ext.getCmp('processComboOfThreatenedSlaChart').setValue(records[0].get('id'));
							var args = Ext.urlEncode({
								processId : records[0].get('id')
							});
							var dataUrl = 'servicevalue/threatenedSlaReport.html?'+args;
							var swfUrl = 'ext/extension/amchart/ampie.swf';
							this.loadChart(this.threatenedSlaPanel.items.items[0], dataUrl, swfUrl);
						}
					}
				}
			}),
			triggerAction : "all",
			mode : 'local',
			anchor : "98.5%",
			listeners : {
				scope : this,
				'select': function(combo, record, index) {
						var args = Ext.urlEncode({
							processId : combo.getValue()
						});
						var dataUrl = 'servicevalue/threatenedSlaReport.html?'+args;
						var swfUrl = 'ext/extension/amchart/ampie.swf';
						this.loadChart(this.threatenedSlaPanel.items.items[0], dataUrl, swfUrl);
					}
			}
	});
	
	//受威胁SLA
	this.threatenedSlaPanel = new Ext.Panel({
		layout : 'fit',
		border : false,
		tbar : new Ext.Toolbar({
			style : 'border:0;background:#FFFFFF;',
			items : [$lang('workflow.flowMonitor.gridHeader.processName'),":",this.threatenedSlaChartProcessCombo]
		}),
		items : [{
			xtype: 'flashpanel',
			height : 400,
			margins : '0 0 0 50',
			padding : '50 0 0 0',
	        autoWidth : true,
	        collapsible : true,
	        border : false
		}]
	});
	
//	违规SLA
	this.violationSlaPanel = new Ext.Panel({
		layout : 'fit',
		border : false,
		tbar : new Ext.Toolbar({
			items : [$lang('workflow.flowMonitor.gridHeader.processName')]
		}),
		items : [{
			xtype: 'flashpanel',
			height : 400,
			margins : '0 0 0 50',
			padding : '50 0 0 0',
	        autoWidth : true,
	        collapsible : true,
	        border : false
		}]
	});
	
////////////////////////////////////////////////////////////////////////////////////////
	
	this.statusPieChartPanel = new Ext.Panel({
		layout : 'fit',
		height : 237,
		border : false,
		tbar : new Ext.Toolbar({
    		style : 'border:0;background:#FFFFFF;',
    		items : [{xtype:'tbspacer'},{xtype:'tbspacer'},
    			$lang('workflow.flowMonitor.gridHeader.processName'),
    			{xtype:'tbspacer'},{xtype:'tbspacer'},':',{xtype:'tbspacer'},{xtype:'tbspacer'},{
				xtype : 'combo',
				fieldLabel : $lang('workflow.flowMonitor.gridHeader.processName'),//"流程",
				displayField : "name",
				valueField : "id",
				editable : false,
				lazyRender : false,
				readOnly:true,
				id : 'processComboOfStatusPie',
				store : new Ext.data.Store({
					proxy: new Ext.data.HttpProxy({url: 'bp/list.html'}),
					reader: new Ext.data.JsonReader({
						root:'process'},
						[{name: 'id', mapping: 'id'},
						{name: 'name', mapping: 'name'}]
						), 
					remoteSort: true,
					autoLoad : true,
					listeners : {
						scope : this,
						'load' : function(store,records){
							if(records && records.length>0){
								Ext.getCmp('processComboOfStatusPie').setValue(records[0].get('id'));
								var mediaCfg = {
								        mediaType:'SWF',
								        url: 'ext/extension/amchart/ampie.swf',
								        width:'100%',
								        height:'100%',
								        controls:true,
								        start:true,
								        params: {
								        	wmode: 'transparent',
								        	flashVars :{
												path : 'ext/extension/amchart/',  
								        		data_file: 'flow/currentProcessStatus.html?processId='+records[0].get('id'),  
								        		settings_file: 'FVSD_RUNTIMESPACE/ServiceValue/ReportSetting/workflow_piechart_setting.xml'  
								        	}
								       }
								 };
								this.statusPieChartPanel.items.items[0].renderMedia(mediaCfg);
							}
						}
					}
				}),
				triggerAction : "all",
				mode : 'local',
				anchor : "98.5%",
				listeners : {
    				scope : this,
					'select': function(combo, record, index) {
						var mediaCfg = {
						        mediaType:'SWF',
						        url: 'ext/extension/amchart/ampie.swf',
						        width:'100%',
						        height:'100%',
						        controls:true,
						        start:true,
						        params: {
						        	wmode: 'transparent',
						        	flashVars :{
										path : 'ext/extension/amchart/',  
						        		data_file: 'flow/currentProcessStatus.html?processId='+combo.getValue(),    
						        		settings_file: 'FVSD_RUNTIMESPACE/ServiceValue/ReportSetting/workflow_piechart_setting.xml'  
						        	}
						       }
						 };
						this.statusPieChartPanel.items.items[0].renderMedia(mediaCfg);
					}
				}
			}]
    	}),
		items : [{
			margins :'0 0 0 50',
	        xtype: 'flashpanel',
	        autoWidth: true,
	        collapsible:true,
	        border:false
        }]
	});

	
	this.statisticsBarChartPanel = new Ext.Panel({
		layout : 'fit',
		height : 237,
		border : false,
		tbar : new Ext.Toolbar({
    		style : 'border:0;background:#FFFFFF;',
    		items : [{xtype:'tbspacer'},{xtype:'tbspacer'},
    			$lang('workflow.flowMonitor.gridHeader.processName'),
    			{xtype:'tbspacer'},{xtype:'tbspacer'},':',{xtype:'tbspacer'},{xtype:'tbspacer'},{
				xtype : 'combo',
				fieldLabel : $lang('workflow.flowMonitor.gridHeader.processName'),//"流程",
				displayField : "name",
				valueField : "id",
				editable : false,
				lazyRender : false,
				readOnly:true,
				id : 'processComboOfStatisticsBar',
				store : new Ext.data.Store({
					proxy: new Ext.data.HttpProxy({url: 'bp/list.html'}),
					reader: new Ext.data.JsonReader({
						root:'process'},
						[{name: 'id', mapping: 'id'},
						{name: 'name', mapping: 'name'}]
						), 
					remoteSort: true,
					autoLoad : true,
					listeners : {
						scope : this,
						'load' : function(store,records){
							if(records && records.length>0){
								Ext.getCmp('processComboOfStatisticsBar').setValue(records[0].get('id'));
								var mediaCfg = {
								        mediaType:'SWF',
								        url: 'ext/extension/amchart/amcolumn.swf',
								        width:'100%',
								        height:'100%',
								        controls:true,
								        start:true,
								        params: {
								        	wmode: 'transparent',
								        	flashVars :{
												path : 'ext/extension/amchart/',  
								        		data_file: 'flow/processCreateByMonths.html?processId='+records[0].get('id'),  
								        		settings_file: 'workflow/scripts/monitor/amcharts/workflow_columnchart_setting.xml' 
								        	}
								       }
								 };
								this.statisticsBarChartPanel.items.items[0].renderMedia(mediaCfg);
							}
						}
					}
				}),
				triggerAction : "all",
				mode : 'local',
				anchor : "98.5%",
				listeners : {
    				scope : this,
					'select': function(combo, record, index) {
						var mediaCfg = {
						        mediaType:'SWF',
						        url: 'ext/extension/amchart/amcolumn.swf',
						        width:'100%',
						        height:'100%',
						        controls:true,
						        start:true,
						        params: {
						        	wmode: 'transparent',
						        	flashVars :{
										path : 'ext/extension/amchart/',  
						        		data_file: 'flow/processCreateByMonths.html?processId='+combo.getValue(),  
						        		settings_file: 'workflow/scripts/monitor/amcharts/workflow_columnchart_setting.xml' 
						        	}
						       }
						 };
						this.statisticsBarChartPanel.items.items[0].renderMedia(mediaCfg);
					}
				}
			}]
    	}),
		items : [{
			margins :'0 0 0 50',
	        xtype: 'flashpanel',
	        autoWidth: true,
	        collapsible:true,
	        border:false
	        }]
	});
   
    var homePortal = new Ext.ux.Portal({
					xtype : 'portal',
					margins : '35 10 5 0',
					autoScroll :true,
					border:false,
					items : [{
						columnWidth : .49,
						style : 'padding:10px 0 0 10px',
						items : [/*{
							title : $lang('workflow.flowMonitor.processSearch'),//'工单查询',
							layout : 'border',
							tools : tools,
							height : 300,
							items : [{
								region:'north',
								height:70,
								items:[searchPanel]
								},{
								region:'center',
//								height:200,
								items:[searchGrid]
							}]
						},{
							title : $lang('workflow.flowMonitor.timeoutProcess'),//'超时工单',
							layout : 'fit',
							tools : [{
									id : 'refresh',
									handler : function(e, target, panel) {
										//事故
										panel.items.items[0].items.items[0].items.items[0].store.reload();
										//问题
										panel.items.items[0].items.items[1].items.items[0].store.reload();
										//变更
										panel.items.items[0].items.items[2].items.items[0].store.reload();
									}
								},tools],
							height : 300,
							items : [timeoutTaskPanel]
						},{
							title : $lang('workflow.flowMonitor.statistics'),//'工单信息统计',
							layout : 'fit',
							tools : [{
									id : 'refresh',
									handler : function(e, target, panel) {
										panel.items.items[0].store.reload();
									}
								},tools],
							height : 300,
							items : [statisticsGrid]
						},{
							title : '违规的SLA',
							tools : tools,
							height : 400,
							layout : 'fit',
							items : [this.violationSlaPanel]
						}*/]
					},{
						columnWidth : .49,
						style : 'padding:10px 0 0 10px',
						items : [/*{
							title : $lang('workflow.flowMonitor.createAndClose'),//'工单创建-关闭统计',
							layout : 'fit',
							tools : tools,
							height : 300,
							items : [this.statisticsBarChartPanel]
						}, {
							title : $lang('workflow.flowMonitor.processStatus'),//'流程状态',
							tools : tools,
							layout : 'fit',
							height : 400,
							items : [this.statusPieChartPanel]
						}, {
							title : $lang('workflow.flowMonitor.averageProcessingTime'),//'流程平均处理时间',
							layout : 'fit',
							tools : [tools],
							height : 400,
							items : [{
									margins :'0 0 0 50',
							        xtype: 'flashpanel',
							        autoWidth: true,
							        collapsible:true,
							        border:false,
							        mediaCfg:{
							         mediaType:'SWF',
							         url: 'ext/extension/amchart/amline.swf',
							         width:'100%',
								     height:'100%',
							         controls:true,
							         start:true,
							         params: {
							         	wmode: 'transparent',
							         	flashVars :{
							         		path : 'ext/extension/amchart/',  
							         		data_file: 'flow/averageProcessTime.html', 
							         		settings_file: 'workflow/scripts/monitor/amcharts/workflow_linechart_setting.xml' 
							         	}
							         }
							       }
							}]
						}*/]
					}]
				});

	FlowMonitorHomePanel.superclass.constructor.call(this, {
				id : 'flow-view',
				layout : 'fit',
				margins : '0 0 0 0',
				border : false,
				frame : false,
				autoScroll : false,
				items:[homePortal]
	});
};

Ext.extend(FlowMonitorHomePanel, Ext.Panel, {

	innitRadioGroup : function() {
		if (this.cookies.getCookie('flowHome-default') == "true") {
			this.flowHomeDefaultRG.setValue("0");
		} else {
			this.flowHomeDefaultRG.setValue("1");
		}
	},
	disableHomePage : function() {
		if (this.cookies.cookieEnable()) {
			this.cookies.setCookie('flowHome-default', false);
		}
	},
	enableHomePage : function() {
		if (this.cookies.cookieEnable()) {
			this.cookies.setCookie('flowHome-default', true);
		}
	},
	findSWF:function(movieName) {  
	   	if (navigator.appName.indexOf("Microsoft")!= -1) {  
	     	return window[movieName];  
	  	 } else {  
	    	 return document[movieName];  
	   	}
 	},
 	loadChart : function(flashPanel, dataUrl, swfUrl, settingFile){
		var mediaCfg = {
		        mediaType : 'SWF',
		        url : swfUrl,
		        width : '100%',
		        height : '100%',
		        controls : true,
		        start : true,
		        params : {
		        	wmode : 'transparent',
		        	flashVars : {
						path : 'ext/extension/amchart/',  
		        		data_file : dataUrl,  
		        		settings_file : settingFile?settingFile:'workflow/scripts/monitor/amcharts/workflow_piechart_setting.xml' 
		        	}
		       }
		 };
		flashPanel.renderMedia(mediaCfg);
 	}
});