LockWindow = function(config) { 
	Ext.apply(this, config);
	
	LockWindow.superclass.constructor.call(this,  {
		id : 'lockWindow',
		title: "请输入解锁密码",
        layout:'fit',
        width:300,
        height:100,
        closable : false,
        closeAction : 'hide',
        buttonAlign : 'center',
        resizable:false,
        modal : true,
        plain: true
    });
    this.password = new Ext.form.TextField({
		anchor : '98%',
		fieldLabel : '解锁密码',
		maxLength : 100,
		inputType : 'password',
		name : 'user.password'
	});
    this.changePWForm = new Ext.FormPanel({
        labelWidth:60, 
        frame:false, 
        bodyStyle:'padding:5px 5px 0', 
        defaultType: 'textfield',
        border:false,
        keys : [{  
            key : [Ext.EventObject.ENTER],
            scope : this,
            fn : function() {
            	this.changePW();
            }
        }],
		items: [ 	
			{id:'user.id',xtype:'hidden',value : FW.userId},
			{id:'user.loginName',xtype:'hidden',value : FW.loginName},
			{id:'info.moduleId',xtype:'hidden',value : FW.moduleId},
			{id:'info.moduleTitle',xtype:'hidden',value : FW.moduleTitle},
			{id:'info.moduleJs',xtype:'hidden',value : FW.moduleJs},
			this.password
		]
    });
   	this.add(this.changePWForm);
   	this.password.focus(false,1000);
   	this.addButton({text: '解锁'},function(){this.changePW()},this);
};

Ext.extend(LockWindow, Ext.Window, {

	changePW: function(){
		var changePWForm = this.changePWForm;
		var vr = this.formValidation();
		if(vr==true){
			changePWForm.getForm().submit({
				waitMsg : '解锁',
				waitTitle : '正在解锁...',
				url:'framework/unLock.html',
	            method:'post',
	            scope : this,
	            success:function(form,action){
	            	this.password.setValue('');
                    this.close();
	           },
	           failure:function(form,action){
	               Ext.Msg.alert('提示','解锁失败!');
	           }
			});
		}else{
			Ext.Msg.alert('提示',vr);
			this.password.focus();
		}
	},
	formValidation: function(){
        var vr = true;
        var lockPassword = this.password;
        if(""==lockPassword.getValue()||"undefined"==lockPassword.getValue()){
            vr='密码不能为空！';
        }
        return vr;
    }
});



