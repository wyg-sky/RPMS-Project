/**
 * portal 流程查询
 * @param {} parent
 */
FlowSearchPanel = function(parent){

	var thisParent = parent;
	var thisPanel = this;
	this.processCombo = new Ext.form.ComboBox({
		fieldLabel : $lang('workflow.flowMonitor.search.process'),
		anchor : '98%',
		triggerAction : 'all',
		displayField : 'name', 
		valueField : 'id',
		allowBlank : true,
		readOnly:true,
		store : new Ext.data.Store({
			autoLoad : true,
			proxy : new Ext.data.HttpProxy({url : 'bp/list.html'}),
			reader : new Ext.data.JsonReader(
				{root : 'process'},
				[{name : 'id', mapping : 'id'},
				{name : 'name', mapping : 'name'}]
			),
			remoteSort : true,
			listeners : {
				'load' : function(store,records){
					thisPanel.processCombo.setValue(records[0].get('id'));
					thisPanel.processStatusCombo.store.baseParams={bpId : records[0].get('id')}
					thisPanel.processStatusCombo.store.load();
				}
			}
		}),
		listeners : {
			'select' : function(combo,record,index){
				thisPanel.processStatusCombo.clearValue();
				thisPanel.processStatusCombo.store.baseParams={bpId : record.get('id')}
				thisPanel.processStatusCombo.store.load();
			}
		}
	});

	this.processStatusCombo = new Ext.form.ComboBox({
		fieldLabel : $lang('workflow.flowMonitor.search.status'),
		anchor : '98%',
		triggerAction : 'all',
		displayField : 'name', 
		valueField : 'id',
		allowBlank : true,
		readOnly:true,
		mode : 'local',
		emptyText : $lang('workflow.flowMonitor.search.emptyText'),
		store : new Ext.data.Store({
//			autoLoad : true,
			proxy : new Ext.data.HttpProxy({url : 'admin/listBpStatesByBpId.html'}),
			reader : new Ext.data.JsonReader(
				{root : 'resultList'},
				[{name : 'id', mapping : 'id'},
				{name : 'name', mapping : 'name'}]
			),
			remoteSort : true,
			listeners : {
				'load' : function(store,records){
					var nullRecord = new Ext.data.Record.create([{name : 'id'},{name : 'name'}]);
					this.add(new nullRecord({id : 'empty',name : $lang('workflow.flowMonitor.search.emptyText')}));
				}
			}
		}),
		listeners : {
			'select' : function(combo,record,index){
				if(record.get('id')=='empty'){
					combo.clearValue();
				}
			}
		}
		
	});

	this.processCode = new Ext.form.TextField({
		fieldLabel : $lang('workflow.flowMonitor.search.code'),
		anchor : '98%'
	});
	
	this.createDate = new Ext.form.DateField({
		fieldLabel : $lang('workflow.flowMonitor.search.createDate'),
		anchor : '98%',
		readOnly:true,
	    format: 'Y-m-d'
	});
	
	this.userStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'admin/users!listForWin.html'
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'total',
			successProperty : 'success',
			root : 'root',
			fields : [
				{name : "id"},
				{name : "username"},
				{name :'code'},
				{name :"xingMing"},
				{name :"department" ,mapping:'department',convert:function(v) {if (v && v.name)return v.name;else return '';}},
				{name :"jobTitle" , mapping:'jobTitle',convert:function(v) { if (v && v.name) return v.name; else return '';}},
				{name: 'phone'},
				{name: 'mobile'},
				{name: 'email'}
			]
		}),
		remoteSort : false
	});
	
	this.cm = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
		new Ext.grid.CheckboxSelectionModel(),
		{
			dataIndex : "id",
			hidden : true,
			sortable : false
		}, {
			header : $lang('common.name'),
			sortable : true,
			dataIndex : "xingMing"
		}, {
			header : $lang('common.account'),
			sortable : true,
			dataIndex : "username"
		}, {
			header : $lang('common.staffNo'),
			sortable : true,
			dataIndex : "code"
		}, {
			header : $lang('common.department'),
			sortable : true,
			dataIndex : "department"
		}, {
			header : $lang('common.position'),
			sortable : true,
			dataIndex : "jobTitle"
		}, {
			header : $lang('common.phone'),
			hidden : true,
			sortable : true, 
			dataIndex : 'phone'
		}, {
			header : $lang('common.mobile'),
			hidden : true,
			sortable : true, 
			dataIndex : 'mobile'
		}, { 
			header : $lang('common.email'),
			hidden : true,
			sortable : true, 
			dataIndex : 'email'
		}
	]);
	
	this.userSearch = [
		['xingMing', $lang('common.name'), 'string'],
		['username', $lang('common.account'), 'string'], 
		['code', $lang('common.code'), 'string']
	];
	
	this.creatorCombo = new Ext.itsm.form.ComboWindow({
 		name : 'creator',
 		fieldLabel :$lang('workflow.flowMonitor.search.creator'),
 		hiddenName :'creatorId',
 		displayField : 'xingMing',
 		valueField : 'id',
 		allowBlank : true,
		anchor :'98%',
		store : this.userStore,
		columnModel : this.cm,
		singleSelect : true,
		searchCondition : this.userSearch,
		fieldMapping : [
			['jobTitle','jobTitle'],
			['mobile','mobile'],
			['department','department'],
			['phone','phone'],
			['email','email'],
			['xingMing','xingMing'],
			['id','id']
		],
	    listeners : {}
 	});

 	this.processorCombo = new Ext.itsm.form.ComboWindow({
 		name : 'processor',
 		fieldLabel :$lang('workflow.flowMonitor.search.processor'),
 		hiddenName :'processorId',
 		displayField : 'xingMing',
 		valueField : 'id',
 		allowBlank : true,
		anchor :'98%',
		store : this.userStore,
		columnModel : this.cm,
		singleSelect : true,
		searchCondition : this.userSearch,
		fieldMapping : [
			['jobTitle','jobTitle'],
			['mobile','mobile'],
			['department','department'],
			['phone','phone'],
			['email','email'],
			['xingMing','xingMing'],
			['id','id']
		],
	    listeners : {}
 	});
/////////////////////////
 	this.searchPageSize = 20;
 	this.searchStoreReader=new Ext.data.JsonReader({
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
    
    this.searchGridColumns =  [
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
        
    this.searchStore = new Ext.data.Store({
        autoLoad: false,
        baseParams: {limit: this.searchPageSize},
        proxy : new Ext.data.HttpProxy({
            url : 'flow/bpiAdvancedSearch.html'
        }),
        reader : this.searchStoreReader
    });
    
	this.searchGrid = new Ext.grid.GridPanel({
		border : false,
        store : this.searchStore,
        viewConfig : {
			forceFit : true 
		},
        loadMask : {msg:$lang('workflow.flowViewPanel.loading')},//正在载入 ...
        columns : this.searchGridColumns,
        bbar : new Ext.PagingToolbar({
                    pageSize: this.searchPageSize,
                    store: this.searchStore, 
                    displayInfo: true,
                    displayMsg: $lang('workflow.flowMonitor.shortDisplayMsg'),//"{0}-{1}条记录，共{2}条",
                    emptyMsg: $lang('workflow.flowMonitor.emptyMsg')//"没有记录"
        }),
		listeners : {
        	'rowdblclick' : function(grid,rowIndex){
        		var record = this.store.getAt(rowIndex);
				var id = record.get("id");
				var code = record.get("code");
				var readOnlyUrl = record.get("bpDefFile").viewUrl;
				var panel = new Ext.Panel({
							id : 'flow-search-result-view',
							closable : true,
							autoScroll : true,
							height:600,
							autoLoad : {
								url : readOnlyUrl,
								params : {
									id : id
								},
								scope : this,
								scripts : true
							}
//							,tbar: [{text:$lang('workflow.flowMonitor.tbar.back'),handler: function(){thisParent.setActiveTab(0)}}]//thisParent.loadFlowViewPanel()//'返回流程首页'
						});
				thisParent.addNewWorkPanel(panel,code);
        	}
        }
    });
//////////////////////// 	
 	
	this.leftFP = new Ext.Panel({
		columnWidth : .49,
		layout : 'form',
		border : false,
		labelWidth : 80,
		items : [this.processCombo,this.processStatusCombo,this.creatorCombo]
	});
	
	this.rightFP = new Ext.Panel({
		columnWidth : .49,
		layout : 'form',
		border : false,
		labelWidth : 80,
//		items : [this.processCode,this.processorCombo,this.createDate]
		items : [this.processCode,this.createDate]
	});

	this.conditionFS = new Ext.form.FieldSet({
	        frame : false, 
	        border : false,
	        layout : "column",
	        autoWidth : true,
	        autoHeight : true,
	        bodyStyle : 'margin:8px 0 0 0;',
	        items : [
	        this.leftFP,
	        this.rightFP]
	    }); 
	
	FlowSearchPanel.superclass.constructor.call(this,{
		id : 'flow-advanced-search-panel',
		autoScroll : true,
		border : false,
		frame : false,
		layout : 'border',
		tbar : [{text:$lang('workflow.flowMonitor.search.button.search'),iconCls : 'search-icon',handler : this.search,location : thisPanel}
//				,{text : $lang('workflow.flowMonitor.tbar.back'),handler : function(){thisParent.setActiveTab(0)}}
		],
		items : [{
			border : false,
			region : 'north',
			height : 120,
			layout : 'fit',
			items : [this.conditionFS]
		}
		,{
			border : false,
			region : 'center',
			layout : 'fit',
			items : [this.searchGrid]
		}
		]
	});
};

Ext.extend(FlowSearchPanel, Ext.Panel, {
	search : function(){
		var thisPanel = this.location;
		thisPanel.searchStore.baseParams = {
			limit: thisPanel.searchPageSize,
        	processId : thisPanel.processCombo.getValue(),
        	code : thisPanel.processCode.getValue(),
        	statusId : thisPanel.processStatusCombo.getValue(),
        	creatorId : thisPanel.creatorCombo.getValue(),
        	createdOn : Ext.util.Format.date(thisPanel.createDate.getValue(), 'Y-m-d'),
        	processorId : thisPanel.processorCombo.getValue()
        }
		thisPanel.searchStore.load();
	}
});