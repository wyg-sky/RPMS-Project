BpCsNavPanel = function(typeCode, bpView, uniqueCode, bps){
	BpCsNavPanel.superclass.constructor.call(this, typeCode, bpView, uniqueCode, bps);
	this.remove(this.tipPanel);
};

Ext.extend(BpCsNavPanel , BpNavPanel  ,{
	
});
