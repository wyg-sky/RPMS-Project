
/**
 * <p>Title:  </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function AddProcess(wrapper, toolbar, processList) {
    this.base = Ajax;
    this.base();
    this.wrapper = wrapper;
    this.toolbar = toolbar;
    this.processList = processList;
}
AddProcess.prototype = new Ajax();
AddProcess.prototype.setButtonEnable = function (b) {
    if (this.toolbar) {
        this.toolbar.setButtonEnable(b);
    }
};
AddProcess.prototype.addProcess = function (name,fileName,description) {
    if (!name) {
        this.name = null;
    	//您输入的名字为空！
        Ext.Msg.alert("\u60a8\u8f93\u5165\u7684\u540d\u5b57\u4e3a\u7a7a\uff01");
        return false;
    }
    this.name = name;

    //
    this.setButtonEnable(false);

    //
    var model = this.wrapper.getModel();
    var doc = FlowModelConverter.convertModelToXML(model);
    //LINGZJ 生成JBPM的xml文件
    
    var docDefine = FlowModelConverter.convertModelToJBPMXML(model);
    //:~
    if (!doc) {
    	//将工作流程图转化成xml时出错！
        Ext.Msg.alert('提示',"\u5c06\u5de5\u4f5c\u6d41\u7a0b\u56fe\u8f6c\u5316\u6210xml\u65f6\u51fa\u9519\uff01");
        this.setButtonEnable(true);
        return false;
    }

    //
    var url = FlowWorkSpace.URL_ADD_PROCESS;
    var method = "POST";
    var params = "name=" + name+"&version="+version+"&bpid="+bpId+"&description="+description+"&filename="+fileName;
    //lingzj
    //var flowType = window.parent.getFlowType();
    //var flowTypeCode = window.parent.flowTypeCode;
    //var nodes="";
    //var trans="";
    //alert(url);
    //window.parent.trealNodeTabsData();
    //nodes=window.parent.getNodesData();
 	//trans=window.parent.getTransData();
 	//nodetype = window.parent.nodeFlowType;
 	//nodeid = window.parent.nodeFlowId;
 	//alert(nodetype);
    //params += "&xml=" + doc.xml+"&nodes="+nodes+"&trans="+trans+"&nodetype="+nodetype+"&nodeid="+nodeid;
    //:~
	//params += "&xml=" + doc.xml+"&flowtype=" + flowType+"&jbpmxml=" + docDefine.xml;
	//alert(docDefine.xml);
	params += "&xml=" + doc.xml+"&jbpmxml=" + docDefine.xml;
    //
    this.loadXMLHttpRequest(url, method, params);
    //lingzj 修改tree上面节点的version
    //window.parent.modifyNodeParamOper(1);
    //:~
};
AddProcess.prototype.onReadyStateChange = function (httpRequest) {
    if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) {
            this.processXMLHttpRequest(httpRequest);
        } else {
        	//处理过程出现错误！
            //alert("\u5904\u7406\u8fc7\u7a0b\u51fa\u73b0\u9519\u8bef\uff01");
            window.parent.Ext.Msg.alert('提示',"\u5904\u7406\u8fc7\u7a0b\u51fa\u73b0\u9519\u8bef\uff01");
            this.setButtonEnable(true);
        }
    }
};
AddProcess.prototype.processXMLHttpRequest = function (httpRequest) {
    var doc = httpRequest.responseXML;

    if (!doc) {
    	//操作结束，未知服务器处理结果！
        Ext.Msg.alert("\u64cd\u4f5c\u7ed3\u675f\uff0c\u672a\u77e5\u670d\u52a1\u5668\u5904\u7406\u7ed3\u679c\uff01");
        this.setButtonEnable(true);
        return false;
    }
	//alert(doc.xml);
    //
    var responseNode = doc.getElementsByTagName("Response")[0];
    
    var statusValue = eval(responseNode.getAttribute("status"));
    //lingzj添加 新增后得到file的id
    var bpFile = doc.getElementsByTagName("bpFile")[0];
    //alert(bpFile);
    var bpFileId = bpFile?bpFile.getAttribute("id"):null;
    //alert(bpFileId);
    //:~
    var alertStr = "";
    switch (statusValue) {
      case FlowWorkSpace.STATUS_SUCCESS:
      	//保存成功。
        alertStr = "\u4fdd\u5b58\u6210\u529f\u3002";
        this.wrapper.getModel().setName(this.name);
        if (this.processList) {
            this.processList.refreshProcessList();
        }
        this.wrapper.setChanged(false);
        break;
      case FlowWorkSpace.STATUS_FAIL:
      	//保存失败。
        alertStr = "\u4fdd\u5b58\u5931\u8d25\u3002";
        break;
      case FlowWorkSpace.STATUS_FILE_EXIST:
      	//保存失败，已有同名文件存在。
        alertStr = "\u4fdd\u5b58\u5931\u8d25\uff0c\u5df2\u6709\u540c\u540d\u6587\u4ef6\u5b58\u5728\u3002";
        break;
      case FlowWorkSpace.STATUS_XML_PARSER_ERROR:
      	//保存失败，xml解析出错。
        alertStr = "\u4fdd\u5b58\u5931\u8d25\uff0cxml\u89e3\u6790\u51fa\u9519\u3002";
        break;
      case FlowWorkSpace.STATUS_IO_ERROR:
      	//保存失败，IO错误。
        alertStr = "\u4fdd\u5b58\u5931\u8d25\uff0cIO\u9519\u8bef\u3002";
        break;
      default:
        //保存失败，未知错误。
        alertStr = "\u4fdd\u5b58\u5931\u8d25\uff0c\u672a\u77e5\u9519\u8bef\u3002";
        break;
    }
    this.setButtonEnable(true);
    //alert(alertStr);
    Ext.Msg.alert('提示','&nbsp;&nbsp;&nbsp;'+alertStr);
    operType = 'edit';
    if(bpFileId)
    	propertyPanel.setFlowId(bpFileId);
    window.parent.Ext.getCmp('flow-version-grid').getStore().reload();
    //window.parent.pageGrid.getStore().load({params:{start:0,limit:25,id: window.parent.flowTypeId}});
};
