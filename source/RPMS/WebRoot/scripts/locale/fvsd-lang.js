Ext.namespace("FVSD.LANG");

FVSD.LANG ={
	lang:'lang'
}
/**
 * 获取国际化信息
 * 
 * 例如 $lang("admin.system.mail.title"),$lang("admin.system.lang.error","a","b","c")
 * @return {String}
 */
function $lang(){
	if(arguments.length==0)return "";
	if(arguments.length==1){
		return FVSD.LANG[arguments[0]]?FVSD.LANG[arguments[0]]:arguments[0]
	}
	if(arguments.length>1){
		if(!FVSD.LANG[arguments[0]])return arguments[0];
		var arg = "String.format(FVSD.LANG[arguments[0]]";
		for(var i=1;i<arguments.length;i++){
			arg += ",'"+arguments[i]+"'"
		}
		arg += ")";
		return eval(arg);
	}
}

