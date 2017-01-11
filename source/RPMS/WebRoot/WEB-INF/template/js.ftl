/**
 * @description : ${generateInfo.moduleName}
 * @date : ${generateInfo.createDate}
 * @author : ${generateInfo.createUser}
 */
Ext.lion.${generateInfo.systemName}.${generateInfo.className}Manager = function(config) {
	Ext.apply(this,config);
	Ext.lion.${generateInfo.systemName}.${generateInfo.className}Manager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.${generateInfo.systemName}.${generateInfo.className}Manager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		
	}<#if haveChildren == "1">,
	
	addLineObject : function() {
		var RecordType = this.dataLineGrid.getRecordType();
		this.dataLineGrid.store.add(new RecordType());
	}
</#if>
});
