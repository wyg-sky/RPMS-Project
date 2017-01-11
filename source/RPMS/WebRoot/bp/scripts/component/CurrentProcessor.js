CurrentProcessor=function(config){
	
	config = config || {};
	Ext.apply(this,config);
	var maxHeight = this.maxHeight-100;
	this.currentProcessorId = Ext.id()+'-currentProcessor';
	this.tpl = new Ext.Template('<tpl for="."><div style="height:'+maxHeight+'px;"><div id="'+this.currentProcessorId+'"></div></div></tpl>');
	

	if(this.bpiId!='##request#id####'){
		this.getMyValue();
	}
	
	CurrentProcessor.superclass.constructor.call(this, config);

};
Ext.extend(CurrentProcessor, Ext.form.TextField,{
    editable : false,
	readOnly : true,
	getMyValue : function(){
		var mySelf=this;
	    Ext.Ajax.request({
	        url : 'bp/getProcessorsByBpiId.html',
	        method : 'GET',
	        params : {
	    		bpiId : this.bpiId
	        },
	        success : function (response, options) {
	        	var responseObj = Ext.util.JSON.decode(response.responseText);
	        	if(responseObj.root.length>0){
	        		mySelf.setValue(responseObj.root[0].processors);
	        	}else{
	        		mySelf.setValue('');
	        	}
	        	
	        }, 
	        failure : function (response, options) {
	        }
	    });
	}
});
Ext.reg('currentProcessor', CurrentProcessor);