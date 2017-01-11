
/**
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function XMLDocument() {
}
XMLDocument.newDomcument = function () {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLDOM");
    } else {
        //alert("Your browser cannot handle this script");
    	
//    	var xmlDoc=document.implementation.createDocument("","",null);
//    	xmlDoc.async=false;
//    	return xmlDoc;


    }
    //TODO firefox ...
};

