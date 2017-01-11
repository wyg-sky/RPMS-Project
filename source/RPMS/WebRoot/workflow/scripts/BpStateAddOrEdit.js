BpStateAddOrEdit = function(config) {
	Ext.apply(this,config);
	BpStateAddOrEdit.superclass.constructor.call(this);
}

Ext.extend(BpStateAddOrEdit, Ext.Window, {
    modal : true,
    layout:'fit',
    width:500,
    height:245,
    closeAction:'close',
    buttonAlign:'center',
    plain: true,
    resizable : false,
    initComponent : function(){
    	this._bodyWidth = document.body.clientWidth-15;
    	this.bpStateAOEForm = new Ext.FormPanel({
    		id:'bpStateAOEForm',
	        labelWidth:75, 
	        frame:false, 
	        bodyStyle:'padding:20px 20px 0', 
	        border:false,
	        layout:"column",
	        reader:new Ext.data.JsonReader({
				root:"root", 
				fields:[{
					name:"bpState.id", 
					mapping:'id'
				},{
					name:"bpState.code", 
					mapping:'code'
				},{
					name:"bpState.name",  
					mapping:'name'
				},{
					name:"bpState.process.id",  
					mapping:'process',
	    			convert: function(v){
	    				if(v)
	    					return v.id
	    				else
	    					return null;
	    			}
				},{
					name:"bpState.description", 
					mapping:'description'
				}]
	    	})
	    });
	    
	    
	    var id=new Ext.form.Hidden({
			name : 'bpState.id'
		});
	    this.bpStateAOEForm.add({
			columnWidth : 0.5,
			layout : 'form',
			border : false,
			defaultType : 'textfield',
			items : [{
						fieldLabel : $lang('admin.bp.name'),
						id: 'bpStateName',
						name : 'bpState.name',
						anchor : '98%',
						allowBlank : false
					}, id]
		});
		
		var mode = 'remote';
	    var auto = false;
		if(this.op =='edit'){
			auto = true;
			mode = 'local';
		}
		var processStore =  new Ext.data.Store({
			proxy: new Ext.data.HttpProxy(
	 				{url:'bp/list.html'}
	 			),
	 		reader: new Ext.data.JsonReader(
	 				{root:'process'},
	 				[{name: 'id' },{name: 'name'}]
	 			),
	 		remoteSort: false,
	 		autoLoad : auto
		});
		
		//解决数据加载无序而引起的显示不正确（显示id）
		processStore.on('datachanged', function(){ 
			if('number'==typeof this.index){ 
				var selectedRecordId = this.gridStore.getAt(this.index).get("id");
				this.bpStateAOEForm.form.load({url:'admin/bpStateForEdit.html?bpStateId='+selectedRecordId}); 
			}
		}, this);
		
		this.bpStateAOEForm.add({columnWidth:0.5, layout:'form', border:false, defaultType:'textfield', 
	        items:[{
	        	xtype:'combo',
			    fieldLabel : $lang('admin.bp.process'),
			    displayField : "name",
			    hiddenName : "bpState.process.id",
			    valueField : "id",//索引名
			    allowBlank : false,
			    editable : false,
			    lazyRender : false,
			    store : processStore,
			    triggerAction : "all",
	            blankText : $lang('common.required'),
	            emptyText : $lang('common.select'),
	            mode : mode,
	            anchor : "99%",
	            value : this.bp,
	            listeners : {'beforequery': function(){return false} }
	        }]
	    });
	    
	    this.bpStateAOEForm.add({
				columnWidth : 1,
				layout : 'form',
				border : false,
				defaultType : 'textfield',
				items : [{
							fieldLabel : $lang('admin.bp.code'),
							name : 'bpState.code',
							id: 'bpStateCode',
							regex : /^(\w|[._])+$/, 
	        				regexText : $lang('admin.bp.category.codeRegexText'),
							anchor : '99%',
							allowBlank : false
						}]
			});

		this.bpStateAOEForm.add({
					columnWidth : 1,
					layout : 'form',
					border : false,
					defaultType : 'textfield',
					items : [{
								fieldLabel : $lang('admin.bp.description'),
								name : "bpState.description",
								xtype : "textarea",
								anchor : '99%',
								height : 70,
								preventScrollbars : false
							}]
				}); 
	 
//	    this.bpStateAOEForm.add(this.primaryFS); 
	    
    	BpStateAddOrEdit.superclass.initComponent.call(this);
    	
	    this.add(this.bpStateAOEForm);
	    this.addButton({
   			text:$lang('button.save'), 
	   		scope:this, 
	   		handler:this.onAdd
	   	})
	   	this.addButton({
   			text:$lang('button.close'), 
	   		scope:this, 
	   		handler:this.onClose
	   	})
    },
    
    onAdd : function(){
    	this.bpStateAOEForm.form.doAction('submit',{
            url:'admin/bpStateSaveOrUpdate.html',
            method:'post',
            waitTitle : $lang('common.wait'),
			waitMsg : $lang('common.waitMsg.save'),
            success : function(form, action) {
            				if(action.result.repeat){
                            		Ext.Msg.alert($lang('common.tips'),$lang('admin.bp.codeRepeatMsg') );
                        	}else{
	                            	var responseStr = action.result.root[0].id;
		                            if(responseStr==''||responseStr==null){
		                                Ext.Msg.alert($lang('common.tips'),$lang('admin.bp.tryAgainMsg'));
		                            }else{
		                            	var win = Ext.getCmp('bpStateAOEForm').ownerCt;
		                               	win.gridStore.reload();
		                               	Ext.getCmp('bpStateName').reset();
		                               	Ext.getCmp('bpStateCode').reset();
		                               	if(win.op =='edit')
                    						win.close();
		                            }
                            }
						},
			failure : function(form, action) {
				Ext.Msg.alert($lang('common.error'), $lang('common.saveFailure'));
			}
       },this);
    },
    onClose : function() {
		this.close();
	}
});



