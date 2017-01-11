/**
 * this is  main of the worktale
 * @param {} config
 */
WtbViewPanel = function(config) {
	config = config || {};
	Ext.apply(this,config);
		
	WtbViewPanel.superclass.constructor.call(this);
	//this.on("render",this._onShow,this);
};

Ext.extend(WtbViewPanel, Ext.TabPanel,{
	columnWidth : .70,
	activeTab : 0,
	resizeTabs : true,
	border : false,
	tabWidth : 150,
	minTabWidth : 100,
	enableTabScroll : true,
	autoHeight : false,
	autoScroll : true,
	initComponent : function(){
		
		var conditionDate = new Ext.form.DateField({
			xtype : 'datefield',
			format : 'Y-m-d',
			width:150,
			emptyText:$lang('bp.pleaseSelectDate'),
			readOnly:false,
			hidden:true,
			scope : this,
			listeners:{   
	    		specialkey:function(field,e){   
	        		if (e.getKey()==Ext.EventObject.ENTER){   
//	            		this.scope.search();  
	        			}   
	    		}
	    	}
		});
		
		var condtionText = new Ext.form.TextField({
			xtype : 'textfield',
			id : 'conText',
			width:150,
			scope : this,
			listeners:{   
	    		specialkey:function(field,e){   
	        		if (e.getKey()==Ext.EventObject.ENTER){   
//	            		this.scope.search();  
	        		}   
	    		}
	    	}   
		});
		
		var conditionCombo = new Ext.form.ComboBox({
			xtype : 'combo',
			id : 'method',
			value : 'summary',
			editable : false,
			store : new Ext.data.SimpleStore({
				fields : ["name", "value"],
				data : [['摘要', 'summary'],[$lang('bp.byCreator'), 'creator'],[$lang('bp.byCreateDate'), 'createDate']]
			}),
			valueField : "value",
			displayField : "name",
			mode : 'local',
			selectOnFocus : true,
			forceSelection : true,
			disableKeyFilter : true,
			triggerAction : 'all',
			bodyBorder : false,
			width : 100,
			listeners:{
				'select':function(combo){
					if(combo.getValue()=='createDate'){
						condtionText.hide();
						conditionDate.show();
					}else{
						condtionText.show();
						conditionDate.hide();
					}
				}
	        }
		});
		
		var view =  new Ext.DataView({
			tpl: this._getTpl(),
			singleSelect: true,
			overClass:'x-view-over',
			itemSelector: 'td.thumb-wrap',
			collapsible : true,
			autoHeight:true,
			hidden : true,
			store: new Ext.data.JsonStore({
				root: 'root',
				fields: [
					'text', 'url','icon'
				]
			})
		});
		
		var tbar = new Ext.Toolbar({
			style : 'border:opx solid #99bbe8;',
			items:[{
				text : "新增",
				iconCls : 'create-icon'
			},{
				xtype : "tbspacer"
			},{
				text : "模板新增",
				iconCls : 'create-icon'
			},{
				xtype : "tbspacer"
			},{
				text : "删除选中",
				iconCls : 'delete-selected-icon'
			},"->",conditionCombo, {
					xtype : "tbspacer"
				}, {
					xtype : "tbspacer"
				}, condtionText,conditionDate,{
					xtype : "tbspacer"
				}, {
					//xaction : 'ci_search',
					iconCls : 'search-icon',
					scope : this,
					handler : this.search
				},{
					iconCls :'expand-icon',
					scope : this,
					enableToggle : true,
					pressed : false,
					handler : function(el){
						if(el.pressed){
							view.show();
							el.setIconClass('collapse-icon');
						}else{
							view.hide();
							el.setIconClass('expand-icon');
						}
					}
				}]
		});
		var mainTabPanel = {
			title : $lang('bp.waiting'),
			tbar : tbar,
			layout : "fit",
//			autoHeight : true,
			height :303,
			items : [view]
			
		};
		
		this.items = [mainTabPanel];
		
		WtbViewPanel.superclass.initComponent.call(this);
		
		view.on('click',this._onCdfClick,this);
	   	
	},
	loadData : function(node){
		if(!node) return;
		var tree  = node.getOwnerTree();
		var bp = tree.getBp();
		if(bp != this.bp){
			this.bp = bp;
			this.items.first().add(this.getGrid());
			this.items.first().setHeight(this.getInnerHeight());
			this.getGrid().setHeight(this.items.first().getInnerHeight());
			this.items.first().doLayout();
		}
		this.items.first().setTitle(node.text);	
		this.getGrid().getStore().load();
		
//		this.doLayout();
		
	},
	getGrid : function(){
		if(!this.grid){
			var cfg = $worktable(this.bp.code);
			var store = new Ext.data.Store({
				method:'GET',
				proxy : new Ext.data.HttpProxy({
					url : "bp/myListByBp.html?bpId=8a8a18cd2aa238c3012aa23aaa520001&filterId=8a8a18cd2aa6d585012aa6f13ce40003&limit=20&start=0"
				}),
				reader : new Ext.data.JsonReader(cfg.metaData)
			});
			var sm = cfg.sm
			var cm = new Ext.grid.ColumnModel([sm].concat(cfg.columns))
			this.grid = new WtbGridPanel({
				store : store,
				colModel : cm,
				loadMask : 'Loading....',
				viewConfig: {
			        forceFit : true,
			        enableRowBody : true,
			        showPreview : true
			    }
			});
		}
		return this.grid;
	},
	_getTpl : function(){
		return new Ext.XTemplate(
			'<div>',
				'<table cellspacing=4 cellpadding=2 width=100%>',
					'<tr>',
						'<tpl for=".">',
							'<tpl if="xindex%2 == 1 &&xindex!=1">',
								'<tr></tr>',
					      	'</tpl>',
					      	'<td class="thumb-wrap" colspan=2><a href="#">{text}</a></td>',
					    '</tpl>',
					'</tr>',
		     	'</table>',
		    '</div>'
		).compile();
	},
	_onCdfClick : function(dataView,index, hel,e){
		var record = dataView.store.getAt(index);
//		var url = record.get('url');
//		var text =record.get('text');
//		var data = {text : text,url:url};
//		if(url!=""&&this.view.ownerCt){
//			this.view.ownerCt.fireEvent('loadtask',data);
//		}
	},
	_onShow : function(ct){
		this.setHeight(this.ownerCt.getInnerHeight()-3);
	}
});


WtbGridPanel = function(config) {
	config = config||{};
    Ext.apply(this, config);
	
    WtbGridPanel.superclass.constructor.call(this);
    
    this.on('rowcontextmenu', this.onContextClick, this);
   
};

Ext.extend(WtbGridPanel, Ext.grid.GridPanel, {
	autoHeight : false,
	border : false,
	autoScroll : true,
    initComponent : function(){
    	this.bbar = new Ext.PagingToolbar({
		    store: this.store, 
		    displayInfo: true
		});
		WtbGridPanel.superclass.initComponent.call(this);
    },
    loadUrl : function(url,params) {
    },
    
    loadData : function(s,c) {
          
    },
    setMenuItems : function(items){
    },
    onContextClick : function(client,rowIndex,e){
    }
});