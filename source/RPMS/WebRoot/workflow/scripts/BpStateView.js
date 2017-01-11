BpStateView = function(config) { 
	BpStateView.superclass.constructor.call(this, {
        layout:'fit',
        width:500,
        height:245,
        closeAction:'close',
        buttonAlign:'center',
        title:$lang('admin.bp.stateInfoTitle'),
        plain: true
    });
    this._bodyWidth = document.body.clientWidth-15;
    
    this.bpStateViewForm = new Ext.FormPanel({
        id: 'bpStateViewForm',
        labelWidth: 75,
        frame:false,
        bodyStyle:'padding:20px 20px 0',
        border:false,
        layout:"column",
        reader : new Ext.data.JsonReader({
            root: "root",
            fields: [
                {name: "v_id",mapping:'id'},
                {name: "v_code",mapping:'code'},
                {name: "v_name", mapping:'name'},
                {name: "v_process", mapping:'process.name'},
                {name: "v_description", mapping:'description'}]})
    });
    
//    this.primaryFS = new Ext.form.FieldSet({
//        xtype:'fieldset', 
//        title:'基本信息', 
//        autoHeight:true, 
//        frame:false, 
//        layout:"column"
//    });  
    
    /****start of building the ciModelAOEForm*/
    this.bpStateViewForm.add({
				columnWidth : 0.5,
				layout : 'form',
				border : false,
				defaultType : 'textfield',
				items : [{
							fieldLabel : $lang('admin.bp.name'),
							name : 'v_name',
							anchor : '98%',
							readOnly : true
						}, {
							xtype : 'hidden',
							name : 'v_id'
						}]
			});
	this.bpStateViewForm.add({
				columnWidth : 0.5,
				layout : 'form',
				border : false,
				defaultType : 'textfield',
				items : [{
							fieldLabel : $lang('admin.bp.process'),
							name : 'v_process',
							anchor : '98%',
							readOnly : true
						}]
			});
	this.bpStateViewForm.add({
				columnWidth : 1,
				layout : 'form',
				border : false,
				defaultType : 'textfield',
				items : [{
							fieldLabel : $lang('admin.bp.code'),
							name : 'v_code',
							anchor : '99%',
							readOnly : true
						}]
			});
	this.bpStateViewForm.add({
				columnWidth : 1,
				layout : 'form',
				border : false,
				defaultType : 'textfield',
				items : [{
							fieldLabel : $lang('admin.bp.description'),
							name : "v_description",
							xtype : "textarea",
							anchor : '99%',
							height : 70,
							preventScrollbars : false,
							readOnly : true
						}]
			}); 
	
	
//    this.bpStateViewForm.add(this.primaryFS);       
   	this.add(this.bpStateViewForm);
   	this.addButton({
    	text:$lang('button.close'), 
    	scope:this, 
    	handler:function(){
            this.close();
        }
    });
};
Ext.extend(BpStateView, Ext.Window, {
	resizable : false,
	modal : true
});



