/**
 * 流程帮助面板（知识的查询及显示）
 */
BpHelpPanel = function() {	
	
	var form = this;
    
    //定义combo的三个常量
	this.all = 'all';
	this.skmdbCommon = "skmdb";//知识库标识符
	this.kErrorCommon = "kError";//已知错误标识符
	this.incidentCommon = "incident";//已解决事故标识符
    
    this.skmdbContentField = new Ext.form.TextField({
    	width: 100,
        name: "knowledge.content",
        listeners:{
	   		specialkey:function(field,e){
		   		if(e.getKey()==Ext.EventObject.ENTER){
		   			form.searchFn();
			   	}
			}
		}
    });
    
    this.typeComboField = new Ext.form.ComboBox({
    	name : 'helpType',
		value: this.all,
		store: new Ext.data.SimpleStore({
		 	fields: ["name", "value"],
			data: [
				['全部', this.all],
				[$lang('skmdb.knowledge.kSearechForm.typeComboField.data.skmdb')/**'知识库'*/, this.skmdbCommon],
				[$lang('skmdb.knowledge.kSearechForm.typeComboField.data.error')/**'已知错误'*/, this.kErrorCommon],
				['已解决工单', this.incidentCommon]
				//[$lang('skmdb.knowledge.kSearechForm.typeComboField.data.incidents')/**'已解决事故'*/, this.incidentCommon]
			]
		}),
		valueField :"value",
		displayField: "name",
		mode: 'local',
		width : 80,
		selectOnFocus: true,
		forceSelection: true,
		disableKeyFilter: true,
		triggerAction:'all'
    });
    
    //储存搜索的类别
    this.searchTypeField = new Ext.form.Hidden({
        name: "searchType",
        value: this.all//默认值
    });
    
    //储存输入的关键字
    this.searchValueField = new Ext.form.Hidden({  name: "searchValue" });
    
	/**start of building the grid*/ 
	this.cmField = new Ext.grid.ColumnModel([
		{header: '摘要', sortable: true, dataIndex:"title"},
		{header:'类别',dataIndex:'sortNumber',hidden:true,sortable: true ,groupRenderer:function(v,u,r,i,c,d){  return r.get('typeName'); }}
	]);
	
	this.store = new Ext.data.GroupingStore({
       	autoLoad: false,
		proxy: new Ext.data.HttpProxy({url: 'bp/searchKnowledge.html'}),
		reader: new Ext.data.JsonReader({
			root: 'root',
			totalProperty: 'total',
			fields: [
				"id", //"title", "content"
				{name: "title",  mapping:'title',
					convert: function(v) {
						if(v){
							var temp = form.searchValueField.getValue();
							if(!!temp && temp !== ""){
								//没有HTML标识符，可以简单处理啊
								var style = "style='color:black;background-color:#ffff66'";
								var re=new RegExp('('+temp+')', 'gi'); 
								v = v.replace(re, '<span '+style+'>$1</span>');
							}
							return v;
						}else {return '';}
					}
				},{name: "content",  mapping:'content'
				},{
					name :'type'
				},{
					name : 'similarity'
				},{
					name : 'sortNumber'
				},{
					name : 'typeName'
				}
			]
		}),
		sortInfo: {field: "sortNumber", direction: "asc"},  
		groupField: "sortNumber" ,
		listeners : {
			load : function(store,records){
				if(store.getCount()<=0){
					var searchContext = form.skmdbContentField.getValue();
					var typeValue = form.typeComboField.getValue();
					var typeName = "";
					if(typeValue=="all"){
						typeName = "已解决工单、已知错误以及知识";
					}else if(typeValue=="skmdb"){
						typeName = "知识";
					}else if(typeValue=="incident"){
						typeName = "已解决工单";
					}else{
						typeName = "已知错误";
					}
					form.remove(form.items.items[1]);
					var msg = "";
					if(searchContext!=""){
						msg = "没有匹配到与<b>“"+searchContext+"”</b>相关的"+typeName
					}else{
						msg = "没有匹配到相关的"+typeName
					}
					 var msgPanel = new Ext.Panel({
					    	border : false,
					    	layout : 'fit',
					    	bodyStyle:'padding:20px 12px 5px 12px',
					    	html :msg
					    });
					//form.msgPanel.html = "没有匹配到与查询内容相关的"+typeName+"信息";
					form.add(msgPanel);
					form.getLayout().setActiveItem(1);
				}else{
					form.getLayout().setActiveItem(0);
				}
			}
		}
	});
    
    this.gridPageSize = 20; 
    var bbar = new Ext.PagingToolbar({
        pageSize: this.gridPageSize,
        store: this.store, 
        emptyMsg: $lang('skmdb.adminView.pageToolbar.emptyMsg')//"没有记录"
    });
    
	this.grid = new Ext.grid.GridPanel({
		region : 'center',
		layout: 'fit',
        viewConfig: { forceFit: true },
        anchor: '99%',
        border: false,
        autoWidth: true,
        autoScroll: true,
        store : this.store,
        cm: this.cmField,
        bbar: bbar,
        view: new Ext.grid.GroupingView({
            forceFit:true,
            autoFill: true,  
            groupTextTpl: '{text} ({[values.rs.length]} {["项"]})'
        }),
        loadMask: true
    });
    
 	//add dblclick event to this grid
    this.grid.on('rowdblclick', this.gridDbclick,this);
	this.msgPanel = new Ext.Panel({
    	border : false,
    	layout : 'fit',
    	bodyStyle:'padding:20px 12px 5px 12px',
    	html :'没有匹配到与查询内容相关的知识'
    });
	BpHelpPanel.superclass.constructor.call(this, {
		frame : false,
        layout : 'card',
		region : 'east',
		border : true,
		split : true,
		animCollapse:false,
		animate: false,
		collapsible:true,
		collapseMode:'mini',
//		collapsed : true,
		margins : '2 0 1 1',
		width: 265,
        minSize: 215,
        maxSize: 600,
        height : 180,
        stateful: true,
	    stateId : 'bp-help',
	    stateEvents : ['expand', 'collapse', 'resize'],
        tbar: [
			this.typeComboField,
			{
				xtype:"tbspacer"
			},{
				xtype:"tbspacer"
			},
			this.skmdbContentField,
			{
				iconCls:'search-icon', 
				scope: this, 
				handler:function(){ form.searchFn();}
			},{
				iconCls:'service-request-icon', 
				hidden : true,
				handler: function(){
	     			//按钮触发事件，弹出窗口
	  				var newValue = form.typeComboField.getValue();
	        	}
			}
		],
		activeItem : 0,
		activeOrder : 0,
        items: [this.grid,this.msgPanel] 
	});
};

Ext.extend(BpHelpPanel, Ext.Panel,{
    //浏览知识时弹出的窗口
	gridDbclick : function(grid, rowIndex, e){
		var checkObj = grid.store.getAt(rowIndex);
	    var selectedRecordId = checkObj.get("id");
	    var type = checkObj.get("type");
	    var searchValue = this.skmdbContentField.getValue();
	    
	    var detailWin = new DetailWin(selectedRecordId, searchValue, type, this.bpiId);
	    
	    var title = $lang('skmdb.knowledge.kSearechForm.detailWin.title');
	   if(type == "knownError"){
	    	title += $lang('skmdb.knowledge.kSearechForm.typeComboField.data.error')/**'浏览已知错误'*/;
	    }else if(type =="Incident"){
	        //title += $lang('skmdb.knowledge.kSearechForm.typeComboField.data.incidents')/**'浏览已解决事故'*/;
	    	title += "已解决事故单";
	    }else if(type =="Problem"){
	        //title += $lang('skmdb.knowledge.kSearechForm.typeComboField.data.incidents')/**'浏览已解决事故'*/;
	    	title += "已解决问题单";
	    }else if(type =="request"){
	        //title += $lang('skmdb.knowledge.kSearechForm.typeComboField.data.incidents')/**'浏览已解决事故'*/;
	    	title += "已解决服务请求";
	    }else if(type =="Change"){
	        //title += $lang('skmdb.knowledge.kSearechForm.typeComboField.data.incidents')/**'浏览已解决事故'*/;
	    	title += "已解决变更单";
	    }
	    
	    detailWin.setTitle(title);
	    detailWin.show();
 	},
 	
	loadKnowledge : function(bpiId){
		this.bpiId = bpiId;
		var para = {id : bpiId};
		Ext.apply(this.store.baseParams, para);
		this.store.proxy.conn.url = 'bp/matchKnowledges.html';
		this.store.load({start : 0,limit : 20});
	},
    
	 /*----------------------------------------* 
      * 使用 javascript HTML DOM 高亮显示页面特定字词 
      * 参数说明: 
      * obj: 对象, 要进行高亮显示的对象. 
      * flag: 字符串, 要进行高亮的词或多个词, 使用 竖杠(|) 分隔多个词 . 
      * rndColor: 布尔值, 是否随机显示文字背景色与文字颜色, true 表示随机显示. 
      *----------------------------------------*/ 
	fHl : function (obj, flag, rndColor) {
		var bgCor = ''; 
		var fgCor = '';
        if(rndColor){ 
            bgCor = fRndCor(10, 20); 
            fgCor = fRndCor(230, 255); 
        } else { 
            bgCor = 'yellow'; 
            fgCor = 'black'; 
        } 
        var re = new RegExp(flag, 'i'); 
		for(var i=0; i<obj.childNodes.length; i=i+1){
			var childObj = obj.childNodes[i];
			//元素类型为文本节点nodeType为3；
			if(childObj.nodeType == 3){
				if(childObj.data.search(re) == -1)continue;
				var reResult = new RegExp("(" + flag + ")", "gi");
				var style = ' style="background-color:' + bgCor + ';color:' + fgCor + ';" ' ;
             	var objResult=document.createElement("span");
             	//替换需要高亮显示的节点内容
				objResult.innerHTML=childObj.data.replace(reResult, "<span " + style + ">$1</span>");
				if(childObj.data==objResult.childNodes[0].innerHTML) continue;
				//替换掉需要高亮显示节点
				obj.replaceChild(objResult, childObj);
			}else if(childObj.nodeType==1){
				//类型为元素element节点nodeType为1
				this.fHl(childObj, flag, rndColor);
			}
		}
        //--------随机选取颜色----------
        function fRndCor(under, over){ 
            if(arguments.length==1){ 
                var over=under; 
                    under=0; 
            }else if(arguments.length==0){ 
                var under=0; 
                var over=255; 
            } 
            var r=fRandomBy(under, over).toString(16); 
                r=padNum(r, r, 2); 
            var g=fRandomBy(under, over).toString(16); 
                g=padNum(g, g, 2); 
            var b=fRandomBy(under, over).toString(16); 
                b=padNum(b, b, 2); 
                //defaultStatus=r+' '+g+' '+b 
            return '#'+r+g+b; 
            function fRandomBy(under, over){ 
                switch(arguments.length){ 
                    case 1: return parseInt(Math.random()*under+1); 
                    case 2: return parseInt(Math.random()*(over-under+1) + under); 
                    default: return 0; 
                } 
            } 
            function padNum(str, num, len){ 
                var temp='' ;
                for(var i=0; i<len;temp+=num, i++); 
                return temp=(temp+=str).substr(temp.length-len); 
            } 
        }
	},
	
	searchFn: function(){
		var form = this;
		var para = {searchType: 'quickSearch', searchContext:'', limit: this.gridPageSize};
		var skmdbContentField = this.skmdbContentField.getValue();
		if(!! skmdbContentField){
			para.searchContext = skmdbContentField;
		}
		this.searchValueField.setValue(skmdbContentField);
		
		var typeField = this.typeComboField.getValue();
		if(!! typeField){
			para.typeCombo = typeField;
		}
		this.searchTypeField.setValue(typeField);
		Ext.apply(this.store.baseParams, para);
		this.store.proxy.conn.url = 'bp/searchKnowledge.html';
		this.store.load({start : 0,limit : 20});

    }
});

DetailWin = function(selectedRecordId, searchValue, type, bpiId){
	
	var window = this;
	this.searchValue = searchValue;
	this.rid = selectedRecordId;
	this.type = type;
	this.bpiId = bpiId;
	
	DetailWin.superclass.constructor.call(this,{
		layout: 'fit',
		closable : true,
        width: 800,
        height: 480,
        closeAction: 'close',
        buttonAlign: 'center',
        resizable: false,
        modal: true,
        plain: true
	});
	
	this.add( this.getDetailForm(type) );
	
	this.addButton({text: '有帮助'}, this.addReference ,this);
	this.addButton({text: '无帮助'}, function(){ window.close();});
};
Ext.extend(DetailWin, Ext.Window, {
	
	addReference : function(){
		Ext.Ajax.request({
			url : 'bp/addReference.html',
			method : 'POST',
			params : { type : this.type, id : this.rid ,bpiId : this.bpiId}
		});
		this.close();
	},
	
	getBaseInfoTpl : function(type){
		var baseInfoTpl = '';
		if(type == 'incident'){ }
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
		if(type == 'knownError'){
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
					{name: "symptom",  mapping:'symptom',
						convert: function(v) {
							if(v){
								var temp = window.searchValue;
								if(!!temp && temp !== ""){
									var replaceStr = "<B style='color:black;background-color:#ffff66'>" + temp + "</B>";
									raRegExp = new RegExp('('+temp+')', 'gi'); 
									v = v.replace(raRegExp, replaceStr);
								}
								return v;
							}else {return '';}
						}
					},
					{name: "symptomDetail",  mapping:'symptomDetail',
						convert: function(v) {
							if(v){
								var temp = window.searchValue;
								if(!!temp && temp !== ""){
									var replaceStr = "<B style='color:black;background-color:#ffff66'>" + temp + "</B>";
									raRegExp = new RegExp('('+temp+')', 'gi'); 
									v = v.replace(raRegExp, replaceStr);
								}
								return v;
							}else {return '';}
						}
					}
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
			        {name: "title",  mapping:'title',
						convert: function(v) {
							if(v){
								var temp = window.searchValue;
								if(!!temp && temp !== ""){
									//没有HTML标识符，可以简单处理啊
									var style = "style='color:black;background-color:#ffff66'";
									var re = new RegExp('('+temp+')', 'gi'); 
									v = v.replace(re, '<span '+style+'>$1</span>');
								}
								return v;
							}else {return '';}
						}
					},
					{name: "keyword",  mapping:'keyword',
						convert: function(v) {
							if(v){
								var temp = window.searchValue;
								if(!!temp && temp !== ""){
									var replaceStr = "<B style='color:black;background-color:#ffff66'>" + temp + "</B>";
									raRegExp = new RegExp('('+temp+')', 'gi'); 
									v = v.replace(raRegExp, replaceStr);
								}
								return v;
							}else {return '';}
						}
					},
					{name: "content",  mapping:'content',
						convert: function(v) {
							if(v){
								var temp = window.searchValue;
								if(!!temp && temp !== ""){
									var replaceStr = "<B style='color:black;background-color:#ffff66'>" + temp + "</B>";
									raRegExp = new RegExp('('+temp+')', 'gi'); 
									v = v.replace(raRegExp, replaceStr);
								}
								return v;
							}else {return '';}
						}
					},
			        {name: "category", mapping:'category', convert:function(v){
							if(v){
								return v.name;
							} 
							else {return "";}
						}
					},
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
		}else {
			this.baseInfoStore = new Ext.data.JsonStore({
			    url: 'bp/loadBpiById.html',
			    autoLoad: false,
			   	baseParams : {'bpiId' : this.rid},
			    root: 'root',
			    fields: [
					{name: 'triggerType', mapping : 'triggerType', convert: function(v){if(v==1)return $lang('skmdb.knowledge.kSearechForm.incidentCmField.phone')/**'电话'*/; if(v==2) return $lang('skmdb.knowledge.kSearechForm.incidentCmField.SMS')/**'短信'*/;} },
					{name: "summary",  mapping:'summary',
						convert: function(v) {
							if(v){
								var temp = window.searchValue;
								if(!!temp && temp !== ""){
									var replaceStr = "<B style='color:black;background-color:#ffff66'>" + temp + "</B>";
									raRegExp = new RegExp('('+temp+')', 'gi'); 
									v = v.replace(raRegExp, replaceStr);
								}
								return v;
							}else {return '';}
						}
					},
					{name: "description",  mapping:'description',
						convert: function(v) {
							if(v){
								var temp = window.searchValue;
								if(!!temp && temp !== ""){
									var replaceStr = "<B style='color:black;background-color:#ffff66'>" + temp + "</B>";
									raRegExp = new RegExp('('+temp+')', 'gi'); 
									v = v.replace(raRegExp, replaceStr);
								}
								return v;
							}else {return '';}
						}
					},
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
		
		if(this.baseInfoStore) this.baseInfoStore.load();
		
		return this.baseInfoStore;
	},
	
	getBaseInfoDataView : function(type){
		if(type == 'knownError'){
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


