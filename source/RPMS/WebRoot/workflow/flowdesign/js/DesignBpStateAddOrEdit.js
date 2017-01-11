/**
 * 设计器中新建状态窗口
 * @param {} config
 */
DesignBpStateAddOrEdit = function(config) {
	this.conf = config;
	Ext.apply(this,config);
	DesignBpStateAddOrEdit.superclass.constructor.call(this);
}

Ext.extend(DesignBpStateAddOrEdit, Ext.Window, {
    modal : true,
    resizable:false,
    title: '新建状态',
    layout:'fit',
    width:500,
    height:245,
    closeAction:'close',
    buttonAlign:'center',
    plain: true,
    initComponent : function(){
    	this._bodyWidth = document.body.clientWidth-15;
    	this.bpStateAOEForm = new Ext.FormPanel({
    		id:'designBpStateAOEForm',
	        labelWidth:75, 
	        frame:false, 
	        bodyStyle:'padding:5px 5px 0', 
	        border:false
	    });
	    
	    this.primaryFS = new Ext.form.FieldSet({
	        xtype:'fieldset', 
	        title:'基本信息', 
	        autoHeight:true, 
	        frame:false, 
	        layout:"column"
	    }); 

	    this.primaryFS.add({
			columnWidth : 0.5,
			layout : 'form',
			border : false,
			defaultType : 'textfield',
			items : [{
						fieldLabel : '名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称',
						name : 'bpState.name',
						anchor : '98%',
						allowBlank : false
					}]
		});
		
		this.primaryFS.add({columnWidth:0.5, layout:'form', border:false, defaultType:'textfield', 
	        items:[{
						fieldLabel : '流&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;程',
						name : 'bpState.process.name',
						anchor : '98%',
						value : this.conf.bpName,
						readOnly : true
					},{
						xtype: 'hidden',
						value : this.conf.bpId,
						name: 'bpState.process.id'
					}]
	    });
	    
	    this.primaryFS.add({
				columnWidth : 1,
				layout : 'form',
				border : false,
				defaultType : 'textfield',
				items : [{
							fieldLabel : '编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码',
							name : 'bpState.code',
							regex : /^(\w|[._])+$/, 
	        				regexText : '必须为数字、字母、"."或下划线',
							anchor : '99%',
							allowBlank : false
						}]
			});

		this.primaryFS.add({
					columnWidth : 1,
					layout : 'form',
					border : false,
					defaultType : 'textfield',
					items : [{
								fieldLabel : "描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述",
								name : "bpState.description",
								xtype : "textarea",
								anchor : '99%',
								height : 70,
								preventScrollbars : false
							}]
				}); 
	 
	    this.bpStateAOEForm.add(this.primaryFS); 
	    
    	DesignBpStateAddOrEdit.superclass.initComponent.call(this);
    	
	    this.add(this.bpStateAOEForm);
	    this.addButton({
   			text:'保存', 
	   		scope:this, 
	   		handler:this.onAdd
	   	})
	   	this.addButton({
   			text:'关闭', 
	   		scope:this, 
	   		handler:this.onClose
	   	})
    },
    
    onAdd : function(){
    	var combo = this.combo;
    	var thisWin = this;
    	this.bpStateAOEForm.form.doAction('submit',{
            url:'../admin/bpStateSaveOrUpdate.html',
            method:'post',
            waitTitle : "请稍等",
			waitMsg : '保存中,请稍候...',
            success : function(form, action) {
            				if(action.result.repeat){
                            		Ext.Msg.alert('提示','编码已存在,请更换后重试！');
                        	}else{
	                            	var responseStr = action.result.root[0].id;
		                            if(responseStr==''||responseStr==null){
		                                Ext.Msg.alert('提示','出现错误！请重试！');
		                            }else{
		                            	if(combo.list)
		                            		combo.store.insert(0,new Ext.data.Record({id:action.result.root[0].id,name:action.result.root[0].name}))
                    					thisWin.close();
		                            }
                            }
						},
			failure : function(form, action) {
				Ext.Msg.alert('错误', '保存失败!');
			}
       },this);
    },
    onClose : function() {
		this.close();
	}
});



