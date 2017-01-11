BpTypeView = function(config) { 
	BpTypeView.superclass.constructor.call(this, {
        layout:'fit',
        width:500,
        height:245,
        closeAction:'close',
        buttonAlign:'center',
        title:$lang('admin.bp.typeInfoTitle'),
        plain: true
    });
    this._bodyWidth = document.body.clientWidth-15;
    this._columns = 3 * 2;
    this._perWidth = 100;
    this.bpTypeViewForm = new Ext.FormPanel({
        id: 'bpTypeViewForm',
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
                {name: "v_description", mapping:'description'}]})
    });

    this.bpTypeViewForm.add({
    	columnWidth:0.5, 
    	layout:'form', 
    	border:false, 
    	defaultType:'textfield',
    	items:[{
    		xtype:'textfield',
    		name:'v_name',
    		fieldLabel:$lang('admin.bp.name'),
    		anchor:'98%',
    		readOnly : true
    	},{
    		xtype:'hidden',
    		name:'v_id'
    	}]
    });
    this.bpTypeViewForm.add({
    	columnWidth:0.5, 
    	layout:'form', 
    	border:false, 
    	defaultType:'textfield',
    	items:{
    		xtype:'textfield',
    		name:'v_code',
    		fieldLabel:$lang('admin.bp.code'),
    		anchor:'98%',
    		readOnly:true
    	}
    });    
    this.bpTypeViewForm.add({
    	columnWidth:1,
    	layout:'form', 
    	border:false, 
    	defaultType:'textfield', 
    	items:{
    		xtype:'textarea',
    		name:'v_description',
    		fieldLabel:$lang('admin.bp.description'),
    		height:100,
			anchor:'99%',
			readOnly:true
		}
	});
   	this.add(this.bpTypeViewForm);
   	this.addButton({
   		text:$lang('button.close'),
   		scope:this,
   		handler:function(){
   			this.close();
   		}
   	});
};
Ext.extend(BpTypeView, Ext.Window, {
	resizable : false,
	modal : true
});



