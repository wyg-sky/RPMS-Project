ChangePWFormWin = function(sUser) { 

	var thisWin = this;
	//this.sUser = sUser;

	
	ChangePWFormWin.superclass.constructor.call(this,  {
		id: 'changePWFormWin',
		title: $lang('admin.security.window.changePwd'),
        layout:'fit',
        width:320,
        height:180,
        closeAction:'close',
        buttonAlign : 'center',
        resizable:false,
        modal : true,
        plain: true
    });
    
    this.changePWForm = new Ext.FormPanel({
        id:'changePWForm', 
        labelWidth:85, 
        frame:false, 
        bodyStyle:'padding:5px 5px 0', 
        defaultType: 'textfield',
        //autoHeight:true,
        border:false,
        reader:new Ext.data.JsonReader({
			root:"root", 
			fields:["oldPW","newPW", "reNewPW"]//旧密码，新密码，重复新密码
		}),
		items: [ 	
			{id:'sUserId',xtype:'hidden'}
			//{fieldLabel:'旧密码', allowBlank:false,id:'oldPW', anchor:'98%'}, 
			//{fieldLabel:'新密码', allowBlank:false,id:'newPW', anchor:'98%'},
			//{fieldLabel:'重复新密码', allowBlank:false,id:'reNewPW', anchor:'98%'}
		]
    });
    
//    if(sUser){//选定人员更改密码
//    	this.changePWForm.add({fieldLabel:$lang('admin.security.grid.column.xingMing'), cls: 'nobordertext',readOnly:true,id:'sUserXingMing',value:sUser.xingMing, anchor:'95%'});
    	this.changePWForm.findById('sUserId').setValue(sUser.id);
//    }else{
    	this.changePWForm.add({inputType : 'password',fieldLabel:$lang('admin.security.form.oldPwd'), allowBlank:false,id:'oldPW', anchor:'95%'});
//    }
    this.changePWForm.add({inputType : 'password',fieldLabel:$lang('admin.security.form.newPwd'), allowBlank:false,id:'newPW', anchor:'95%'});
    this.changePWForm.add({inputType : 'password',fieldLabel:$lang('admin.security.form.confirmNewPwd'), allowBlank:false,id:'reNewPW', anchor:'95%'});
   	this.add(this.changePWForm);
   	
   	this.addButton({text: $lang('button.save')},function(){thisWin.changePW(thisWin)});
    this.addButton({text: $lang('button.cancel')},function(){thisWin.close()});
	this.show();
};

Ext.extend(ChangePWFormWin, Ext.Window, {

	changePW: function(thisWin){
		var changePWForm = thisWin.changePWForm;
		var vr = thisWin.formValidation();
		if(vr==true){
			var oldPWValue = null;
			var oldPW = changePWForm.findById('oldPW');
			if(oldPW){
				oldPWValue = oldPW.getValue();
			}
			changePWForm.getForm().submit({
				waitMsg : $lang('admin.security.message.saving'),
				waitTitle : $lang('admin.security.message.tips'),
				url:'system/userChangePW.html',
	            method:'post',
	            success:function(form,action){
	               var responseStr = action.result.msg;
                   Ext.Msg.alert($lang('admin.security.message.tips'),$lang('admin.security.message.changeSuccess'));
                   thisWin.close();

	           },
	           failure:function(form,action){
	           	   var msg = action.result.msg;
               	   if(msg!=null)
               	   	Ext.Msg.alert($lang('admin.security.message.tips'),msg);
               	   else
	                Ext.Msg.alert($lang('admin.security.message.tips'),$lang('admin.security.message.servererror'));
	           }
			});
		}else{
			Ext.Msg.alert($lang('admin.security.message.tips'),vr);
		}
	},
	formValidation: function(){
        var vr = true;
        var oldPW = this.findById("oldPW");
        var newPW = this.findById("newPW").getValue();
        var reNewPW = this.findById("reNewPW").getValue();
        var oldPWV = '';
        if(oldPW){
	        var oldPWV = oldPW.getValue();
	        if(""==oldPWV||"undefined"==oldPWV){
	           vr=$lang('admin.security.message.inputOldPwd');
	        }
        }
        if(""==newPW||"undefined"==newPW){
            vr=$lang('admin.security.message.inputNewPwd');
        }else if(""==reNewPW||"undefined"==reNewPW){
            vr=$lang('admin.security.message.inputRePwd');
        }else if(newPW!=reNewPW){
        	vr=$lang('admin.security.message.inputNotMatch');
        }else if(oldPWV==newPW){
            vr="新密码与旧密码相同，请重新输入！";
        }
        return vr;
    }
});



