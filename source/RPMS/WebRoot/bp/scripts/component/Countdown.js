Countdown=function(config){
	
	config = config || {};
	Ext.apply(this,config);
	var maxHeight = this.maxHeight-100;
	this.countdownId = Ext.id()+'-countdown';
	this.tpl = new Ext.Template('<tpl for="."><div style="height:'+maxHeight+'px;"><div id="'+this.countdownId+'"></div></div></tpl>');
	

	if(""!=this.bpiId&&'${id}'!=this.bpiId){
		this.getMyValue();
	}
	
	Countdown.superclass.constructor.call(this, config);

};
Ext.extend(Countdown, Ext.form.TextField,{
    editable : false,
	readOnly : true,
	getMyValue : function(){
		var mySelf=this;
	    Ext.Ajax.request({
	        url : 'slm/currentRunningTimeLevel.html',
	        method : 'POST',
	        params : {
	    		bpiIds : this.bpiId
	        },
	        success : function (response, options) {
	        	var hour=0,minute=0,second=0,allSeconds=0;
	        	var responseObj = Ext.util.JSON.decode(response.responseText);
	        	var a = responseObj[0].levelMsg.split(",");
	        	if(a[0]=='0'){
	        		mySelf.setValue("未监控");
	        	}else if(a[4]){
	        		mySelf.setValue("已超时");
	        	}else{
	        		allSeconds=a[2];
	        		if(typeof(countdownTask)!='undefined'&&countdownTask!=null){
	        			Ext.TaskMgr.stop(countdownTask);
	        			countdownTask=null;
	        		}
	        		countdownTask={
	        			run : function (){
		        				if(allSeconds>0){
		        					allSeconds--;
		        		        	hour=Math.floor(allSeconds/3600);
		        		        	minute=(Math.floor(allSeconds/60))%60;
		        		        	second=allSeconds%60;
		        		        	mySelf.setValue(hour+"小时"+minute+"分钟"+second+"秒");
		        				}else{
		        					Ext.TaskMgr.stop(countdownTask);
		        					countdownTask=null;
		        					mySelf.setValue("已超时");
		        				}
	        				},
	        			scope: this,
	        			interval: 1000 
	        		}
	        		Ext.TaskMgr.start(countdownTask);
	        	}
	        }, 
	        failure : function (response, options) {
	        }
	    });
	}
});
Ext.reg('countdown', Countdown);