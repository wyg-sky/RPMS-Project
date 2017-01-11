
/**
 * <p>Title:  </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
 //lingzj 新加的，专门用于解析定义工作流xml的文件
function GetDefProcess(wrapper, tableViewer, toolbar) {
    this.base = Ajax;
    this.base();
    this.wrapper = wrapper;
    this.toolbar = toolbar;
    this.tableViewer = tableViewer;
}
GetDefProcess.prototype = new Ajax();

GetDefProcess.prototype.getDefProcess = function (name) {
    //:~
    if (!name) {
        this.name = null;
    	//加载失败，工作流程图名字为空！
        alert("\u52a0\u8f7d\u5931\u8d25\uff0c\u5de5\u4f5c\u6d41\u7a0b\u56fe\u540d\u5b57\u4e3a\u7a7a\uff01");
        return false;
    }
    this.name = name;

    //
    var url = FlowWorkSpace.URL_GET_PROCESS;
    var method = "POST";
    var params = "name=" + name;
    //
    this.loadXMLHttpRequest(url, method, params);
};
GetDefProcess.prototype.onReadyStateChange = function (httpRequest) {
    if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) {
            this.processXMLHttpRequest(httpRequest);
        } else {
        	//处理过程出现错误！
            alert("\u5904\u7406\u8fc7\u7a0b\u51fa\u73b0\u9519\u8bef\uff01");
            this.setButtonEnable(true);
        }
    }
};
GetDefProcess.prototype.processXMLHttpRequest = function (httpRequest) {

    var doc = httpRequest.responseXML;
    
    if (!doc) {
    	//操作结束，未知服务器处理结果！
        alert("\u64cd\u4f5c\u7ed3\u675f\uff0c\u672a\u77e5\u670d\u52a1\u5668\u5904\u7406\u7ed3\u679c\uff01");
        return false;
    }

    //
    var responseNodes = doc.getElementsByTagName("Response");
    
    if ((responseNodes != null) && (responseNodes.length > 0)) {
        var responseNode = responseNodes[0];
        var statusValue = eval(responseNode.getAttribute("status"));
        var alertStr = "";
        switch (statusValue) {
          case FlowWorkSpace.STATUS_FAIL:
      		//获取失败。
            alertStr = "\u83b7\u53d6\u5931\u8d25\u3002";
            break;
          case FlowWorkSpace.STATUS_XML_PARSER_ERROR:
      		//获取失败，xml解析出错。
            alertStr = "\u83b7\u53d6\u5931\u8d25\uff0cxml\u89e3\u6790\u51fa\u9519\u3002";
            break;
          case FlowWorkSpace.STATUS_IO_ERROR:
      		//获取失败，IO错误。
            alertStr = "\u83b7\u53d6\u5931\u8d25\uff0cIO\u9519\u8bef\u3002";
            break;
          case FlowWorkSpace.STATUS_FILE_NOT_FOUND:
      		//获取失败，文件未找到。
            alertStr = "\u83b7\u53d6\u5931\u8d25\uff0c\u6587\u4ef6\u672a\u627e\u5230\u3002";
            break;
          default:
        	//获取失败，未知错误。
            alertStr = "\u83b7\u53d6\u5931\u8d25\uff0c\u672a\u77e5\u9519\u8bef\u3002";
            break;
        }
        //alert(responseNodes[0].getAttribute("status"));
        //this.setButtonEnable(true);
        alert(alertStr);
    } else {
        
        //lingzj 执行对工作流定义文件的解析
        //alert('执行对工作流定义文件的解析');
        //alert('执行对工作流定义文件的解析'+this.rep);
        //alert(doc.xml);
        
        FlowModelConverter.convertXMLToTabs(doc);
    }
};

