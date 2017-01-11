BpReferenceGrid = function(cfg){
		
	var cmField = new Ext.grid.ColumnModel([
		{header: '摘要', sortable: true, dataIndex:"title"},
		{header:'类型',dataIndex:'type',hidden:false, width : 20 , sortable : true,
			renderer : function(v){
						if(v =='Incident'){
							return '事故';
						}
						if(v =='knownError'){
							return '已知错误';
						}
						if(v =='knowledge'){
							return '知识';
						}
						if(v =='request'){
							return '服务请求';
						}
						return v;
					}
		},{header:'查看',dataIndex:'id',width: 20, sortable: false, renderer: function(id){
	    		var str = "<img src='styles/default/images/icons/16_16/view.gif'>";
	    		return str;
	    	}
		}
	]);
	
	var store = new Ext.data.Store({
       	autoLoad: false,
		proxy: new Ext.data.HttpProxy({url: 'bp/loadReference.html'}),
		reader: new Ext.data.JsonReader({
			root: 'root',
			totalProperty: 'total',
			fields: [
				{name: "id"},
				{name: "title"},
//				{name: "content"},
				{name:'type', mapping : 'type'}
			]
		})
	});

    
	Ext.apply(this,cfg);
	BpReferenceGrid.superclass.constructor.call(this,{
		frame : false,
		layout: 'fit',
        viewConfig: { forceFit: true },
        anchor: '99%',
        border: false,
        autoWidth: true,
        autoScroll: true,
        store : store,
        cm:  cmField,
//        view: new Ext.grid.GroupingView({
//            forceFit:true,
//            autoFill: true,  
//            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "项"]})'
//        }),
        loadMask: true
	});
	
	if(this.store && this.params) this.store.load(this.params);
	else if(this.store && this.bpiId) this.store.load({ params:{bpiId:this.bpiId} });
	
	this.on('rowdblclick', this.gridDbclick,this);
	this.on('cellclick' , this.cellclick, this);
};

Ext.extend(BpReferenceGrid , Ext.grid.GridPanel, {
    //浏览知识时弹出的窗口
	gridDbclick : function(grid, rowIndex, e){
		var checkObj = grid.store.getAt(rowIndex);
	    var selectedRecordId = checkObj.get("id");
	    var type = checkObj.get("type");
	    
	    var DetailWin = function(selectedRecordId, type){
	
			var window = this;
			this.rid = selectedRecordId;
			this.type = type;
			
			DetailWin.superclass.constructor.call(this,{
				layout: 'fit',
				closable : true,
		        width: 800,
		        height: 450,
		        closeAction: 'close',
		        buttonAlign: 'center',
		        resizable: false,
		        modal: true,
		        plain: true
			});
			
			this.add( this.getDetailForm(type) )
			
			this.addButton({text: '关闭'}, function(){ window.close();});
		}
		Ext.extend(DetailWin, Ext.Window, {
			
			getBaseInfoTpl : function(type){
				var baseInfoTpl = '';
				if(type == 'Incident'){ }
				else if(type == 'knownError'){
					// 已知错误基本信息
					baseInfoTpl = new Ext.XTemplate(
						'<div>', 
							'<tpl for=".">',
								'<div>',
									'<FONT color=#000080 size=4><STRONG>' + $lang('skmdb.knowledge.kSearechForm.kErrorCmField.problem') + /**问题单*/'：</STRONG></FONT>&nbsp;{problem}',
								'</div>',
								'<div><hr/></div>',
							    '<div>',
									'<FONT color=#000080 size=2><STRONG>' + $lang('skmdb.knowledge.kSearechForm.kErrorCmField.symptom') + /**症状*/'：</STRONG></FONT>&nbsp;{symptom}',
								'</div>',
								'<div><hr/></div>',
								'<div>',
									'<FONT color=#000080 size=2><STRONG>' + $lang('skmdb.knowledge.kSearechForm.kErrorCmField.symptomDetail') + /**症状明细*/'：</STRONG></FONT>&nbsp;{symptomDetail}',
								'</div>',
								'<div><hr/></div>',
								'<div>',
									'<FONT color=#000080 size=2><STRONG>' + $lang('skmdb.knowledge.kSearechForm.incidentCmField.reason') + /**原因*/'：</STRONG></FONT>&nbsp;{reason}',
								'</div>',
								'<div><hr/></div>',
								'<div>',
									'<FONT color=#000080 size=2><STRONG>' + $lang('skmdb.knowledge.kSearechForm.incidentCmField.solutions') + /**解决方案*/'：</STRONG></FONT>&nbsp;{workarround}',
								'</div>',
							'</tpl>', 
						'</div>'
					);
				}
				else if(type == 'knowledge'){
					baseInfoTpl = new Ext.XTemplate(
						'<div>', 
							'<tpl for=".">',
								'<div>',
									'<FONT size=4><STRONG>{title}</STRONG></FONT>',
								'</div>',
								'<div><hr/></div>',
								'<div>',
									'<span>',
										'<FONT color=#000080 size=2><STRONG>' + $lang('skmdb.knowledgeView.catetory') + /**所属类别*/'：</STRONG></FONT>{category}',
										'&nbsp;&nbsp;&nbsp;&nbsp;<FONT color=#000080 size=2><STRONG>' + $lang('skmdb.knowledge.ken') + /**知识点*/'：</STRONG></FONT>{ken}',
										'&nbsp;&nbsp;&nbsp;&nbsp;<FONT color=#000080 size=2><STRONG>' + $lang('skmdb.knowledge.source') + /**知识来源*/'：</STRONG></FONT>{source}',
										'&nbsp;&nbsp;&nbsp;&nbsp;<FONT color=#000080 size=2><STRONG>' + $lang('skmdb.knowledgeView.reads') + /**阅读次数*/'：</STRONG></FONT>{browseNumber}',
										'&nbsp;&nbsp;&nbsp;&nbsp;<FONT color=#000080 size=2><STRONG>' + $lang('skmdb.knowledgeView.createdOn') + /**发布时间*/'：</STRONG></FONT>{createdOn}',
									'</span>',
								'</div>',
							    '<div>',
									'<FONT color=#000080 size=2><STRONG>' + $lang('skmdb.knowledge.keyword') + /**关键字*/'：</STRONG></FONT>&nbsp;{keyword}',
								'</div>',
								'<div><hr/></div>',
								'<div>',
									'{content}',
								'</div>',
							'</tpl>', 
						'</div>'
					);
				}
				
				return baseInfoTpl ;
			},
			
			getBaseInfoStore : function(type){
				if(this.baseInfoStore ) return this.baseInfoStore;
				
				if(type == 'incident' || type == 'Incident' ){
					this.baseInfoStore = new Ext.data.JsonStore({
					    url: 'bp/loadBpiById.html',
					    autoLoad: false,
					   	baseParams : {'bpiId' : this.rid},
					    root: 'root',
					    fields: [
							{name: 'triggerType', mapping : 'triggerType', convert: function(v){if(v==1)return $lang('skmdb.knowledge.kSearechForm.incidentCmField.phone')/**'电话'*/; if(v==2) return $lang('skmdb.knowledge.kSearechForm.incidentCmField.SMS')/**'短信'*/;} },
							{name: "summary",  mapping:'summary'},
							{name: "description",  mapping:'description' },
							{name: "category", mapping:'category', convert:function(v){if(v){return v.name;} else {return "";}}},
							{name: "urgent", mapping:'urgent', convert:function(v){if(v){return v.description;} else {return "";}}},
							{name: "serviceLevel", mapping:'serviceLevel', convert:function(v){if(v){return v.symbol;} else {return "";}}},
							{name: "occurTime",  type:"date", mapping:'occurTime',
								convert: function(v) {
									if(v){
										var d = Date.parseDate(v, 'Y-m-d H:i:s');
										return d.format('Y-m-d');
									}else {return '';}
								}
							},
							{name: "impact", mapping:'impact', convert:function(v){if(v){return v.symbol;} else {return "";}}},
							{name: 'isMajor', mapping : 'isMajor', convert: function(v){if(v==0)return $lang('skmdb.message.no')/**'否'*/; if(v==1) return $lang('skmdb.message.yes')/**'是'*/;} },
							{name: "reason" },
							{name: "resolution"},
						    {name: "solver", mapping:'solver', convert:function(v){if(v){return v.xingMing;} else {return "";}}},
						    {name: "closeCode", mapping:'closeCode', convert:function(v){if(v){return v.name;} else {return "";}}},
							{name: 'satisfaction', mapping : 'satisfaction', convert: function(v){if(v==0)return $lang('skmdb.knowledge.kSearechForm.incidentCmField.General')/**'一般'*/; if(v==1) return $lang('skmdb.knowledge.kSearechForm.incidentCmField.Satisfaction')/**'满意'*/; if(v==2) return $lang('skmdb.knowledge.kSearechForm.incidentCmField.Dissatisfied')/**'不满意'*/;} },
						    {name: "solvedTime",  type:"date", mapping:'solvedTime',
								convert: function(v) {
									if(v){
										var d = Date.parseDate(v, 'Y-m-d H:i:s');
										return d.format('Y-m-d');
									}else {return '';}
								}
							},
							{name: "closeTime",  type:"date", mapping:'closeTime',
								convert: function(v) {
									if(v){
										var d = Date.parseDate(v, 'Y-m-d H:i:s');
										return d.format('Y-m-d');
									}else {return '';}
								}
							}]
					});
				}
				else if(type == 'knownError'){
					this.baseInfoStore = new Ext.data.JsonStore({
					    url: 'bp/loadKeByid.html',
					    autoLoad: false,
					   	baseParams : {'knownError.id' : this.rid },
					    root: 'root',
					    fields: [
					        {name: 'id', mapping: 'id'},
							{name: 'code', mapping : 'code'},
							{name: 'state', mapping : 'state', convert: function(v){if(v==1)return $lang('skmdb.knowledge.kSearechForm.kErrorCmField.useing')/**'使用中'*/; if(v==2) return $lang('skmdb.knowledge.kSearechForm.kErrorCmField.cleared')/**'已清除'*/;} },
							{name: 'reason', mapping: 'reason'},
							{name: 'triggerType', mapping: 'triggerType'},
							{name: 'triggerDescribe', mapping: 'triggerDescribe'},
							{name: 'workarround', mapping: 'workarround'},
							{name: "problem", mapping: "problemJson.text"},
							{name: 'createdOn', mapping: 'createdOn'},
							{name: 'createdBy', mapping: 'createdBy'},
							{name: 'updatedOn', mapping: 'updatedOn'},
							{name: 'updatedBy', mapping: 'updatedBy'},
							{name: "symptom",  mapping:'symptom' },
							{name: "symptomDetail",  mapping:'symptomDetail' }
						]
					});
				}
				else if(type == 'knowledge'){
					this.baseInfoStore = new Ext.data.JsonStore({
					    url: 'skmdb/knowledgeView.html',
					    autoLoad: false,
					    baseParams: {knowledgeId: this.rid},
					    root: 'root',
					    fields: [
					        'id', 'remark','browseNumber',//'title','keyword','content'
					        {name: "title",  mapping:'title' },
							{name: "keyword",  mapping:'keyword' },
							{name: "content",  mapping:'content' },
					        {name: "category", mapping:'category', convert:function(v){ if(v){ return v.name; } else return ""; } },
							{name: "source", mapping:'source', convert:function(v){
									if(v){
										return v.name;
									} 
									else {return "";}
								}
							},
							{name: "ken", mapping:'ken', convert:function(v){
									if(v){
										return v.name;
									} 
									else {return "";}
								}
							},
					        {name: "createdOn", mapping:'createdOn', type:"date", convert:function(v){
									if(v){
										var d = Date.parseDate(v, 'Y-m-d H:i:s');
										return d.format('Y-m-d');
									}else {return "";}
								}
							}
						]
					});
				}
				
				if(this.baseInfoStore) this.baseInfoStore.load();
				
				return this.baseInfoStore;
			},
			
			getBaseInfoDataView : function(type){
				if(type == 'Incident'){ }
				else if(type == 'knownError'){
					this.baseInfoDataView = new Ext.DataView({
						title : $lang('skmdb.knowledge.kSearechForm.kErrorDetailWin.baseInfoDataView.title'),//'已知错误信息',
						frame : false,
						store : this.getBaseInfoStore( type),
						tpl : this.getBaseInfoTpl( type),//baseInfoTpl,
						multiSelect : true,
						style: "padding: 5px 5px 5px 5px",
						overClass : 'x-view-over',
						itemSelector : 'span.thumb-wrap',
						emptyText : $lang('skmdb.adminView.pageToolbar.emptyMsg')//"没有记录"
					});
				}
				else if(type == 'knowledge'){
					this.baseInfoDataView = new Ext.DataView({
						title : $lang('skmdb.knowledgeView.knowledgeInformation'),//'知识信息',
						frame : false,
						store : this.getBaseInfoStore( type),
						tpl : this.getBaseInfoTpl( type),//baseInfoTpl,
						multiSelect : true,
						style: "padding: 5px 5px 5px 5px",
						overClass : 'x-view-over',
						itemSelector : 'span.thumb-wrap',
						emptyText : $lang('skmdb.adminView.pageToolbar.emptyMsg')//"没有记录"
					});
				}
				
				return this.baseInfoDataView;
			},
			
			getDetailForm : function(type){
				var detailForm = null;
				if(type == 'knownError'){
					detailForm = new Ext.Panel({
						frame: false,
					    border: false,
					    closable: true,
				        autoScroll: true,
					    bodyStyle : "padding:5px 5px 5px 5px",           
				        items: [this.getBaseInfoDataView( type )]//, attachmentGrid]
					});
				}
				else if(type == 'knowledge'){
					detailForm = new Ext.Panel({
						frame: false,
					    border: false,
					    closable: true,
				        autoScroll: true,
					    bodyStyle : "padding:5px 5px 5px 5px",           
				        items: [this.getBaseInfoDataView( type ) ]//, attachmentGrid]
					});
				}else {
					var form = "Bp" + type + "ViewForm"
					var processPanel = eval("new " + form + "(this.rid)");
					detailForm = new Ext.Panel({
						frame: false,
				        border: false,
				        closable: true,
				        autoScroll: true,
				        layout : 'card',
				        activeItem : 0,
						labelWidth: 45,
						bodyStyle: "padding:10px 20px 0",
						items: [
							processPanel
						]
					});
				}
				return detailForm;
			}
		});
	    
	    var detailWin = new DetailWin(selectedRecordId , type);
	    
	    var title = '参考_';
	    if(type =="incident"){
	        title += $lang('skmdb.knowledge.kSearechForm.typeComboField.data.incidents')/**'浏览已解决事故'*/;
	    }else if(type == "knownError"){
	    	title += $lang('skmdb.knowledge.kSearechForm.typeComboField.data.error')/**'浏览已知错误'*/;
	    }else if(type == "knowledge"){
	    	title += '知识';
	    }
	    
	    detailWin.setTitle(title);
	    detailWin.show();
 	},
 	
 	cellclick : function( grid, rowIndex, columnIndex, e){
    	if(columnIndex == 2){
    		this.gridDbclick(grid,rowIndex);
    	}
    	
    }
 	
});
Ext.reg('refgrid', BpReferenceGrid);
