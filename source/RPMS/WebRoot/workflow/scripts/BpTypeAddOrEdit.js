BpTypeAddOrEdit = function(store) { 
	BpTypeAddOrEdit.superclass.constructor.call(this,  {
        layout:'fit',
        width:500,
        height:245,
        closeAction:'close',
        buttonAlign:'center',
        plain: true
    });
    
    this._bodyWidth = document.body.clientWidth-15;
    
    this.bpTypeAOEForm = new Ext.FormPanel({
        labelWidth:75, 
        frame:false, 
        bodyStyle:'padding:20px 20px 0', 
        border:false,
        layout:"column",
        reader:new Ext.data.JsonReader({
			root:"root", 
			fields:[
                {name:"bpType.id", mapping:'id'}, 
    			{name:"bpType.code", mapping:'code'}, 
    			{name:"bpType.name",  mapping:'name'},
    			{name:"bpType.description", mapping:'description'}]})
    });
    
    /****start of building the bpTypeAOEForm*/
    this.bpTypeAOEForm.add({
    	columnWidth:0.5, 
    	layout:'form', 
    	border:false, 
    	defaultType:'textfield', 
        items:[{
        	fieldLabel:$lang('admin.bp.name'), 
        	name:'bpType.name', 
        	anchor:'98%', 
        	allowBlank:false
        },{
        	xtype:'hidden',
        	name:'bpType.id'
        }]
    });
 
    this.bpTypeAOEForm.add({
    	columnWidth:0.5, 
    	layout:'form', 
    	border:false, 
    	defaultType:'textfield', 
        items:[{
        	fieldLabel:$lang('admin.bp.code'), 
        	name:'bpType.code', 
        	regex : /^(\w|[._])+$/, 
	        regexText : $lang('admin.bp.category.codeRegexText'),
        	anchor:'98%', 
        	allowBlank:false
        }]
    });
 
    this.bpTypeAOEForm.add({
    	columnWidth:1,
    	layout:'form', 
    	border:false, 
    	defaultType:'textfield', 
        items:[{
        	fieldLabel:$lang('admin.bp.description'), 
        	xtype:"textarea", 
        	name:"bpType.description", 
        	anchor:'99%', 
        	height:100, 
        	preventScrollbars:false
        }]
    }); 
 
   	this.add(this.bpTypeAOEForm);
   	this.addButton({
   		text:$lang('button.save'), 
   		scope:this, 
   		handler:function(){
            this.bpTypeAOEForm.form.doAction('submit',{
                url:'admin/bpTypeSaveOrUpdate.html',
                method:'post',
                waitTitle : $lang('common.wait'),
				waitMsg : $lang('common.waitMsg.save'),
				scope : this,
                success : function(form, action) {
    				if(action.result.repeat){
                    		Ext.Msg.alert($lang('common.tips'),$lang('admin.bp.codeRepeatMsg') );
                	}else{
                    	var responseStr = action.result.root[0].id;
                        if(responseStr==''||responseStr==null){
                            Ext.Msg.alert($lang('common.tips'),$lang('admin.bp.tryAgainMsg'));
                        }else{
                            if(store && store.reload ) store.reload();
            				this.close();
                        }
                    }
				},
				failure : function(form, action) {
					Ext.Msg.alert($lang('common.error'), $lang('common.saveFailure'));
				}
                
           });
        }
    });
    this.addButton({
    	text:$lang('button.close'), 
    	scope:this, 
    	handler:function(){
            this.close();
        }
    });
    
};

Ext.extend(BpTypeAddOrEdit, Ext.Window, {
	resizable : false,
	modal : true
});



