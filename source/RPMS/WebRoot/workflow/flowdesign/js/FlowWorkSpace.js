
/**
 * ItsmWorkFlow 
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2009</p>
 * @author dhcc itsm
 */

//
/**
 * WorkFlow 
 */
function FlowWorkSpace() {
}



//FlowWorkSpace.BASE_PATH = "/XiorkFlow/";
//FlowWorkSpace.BASE_PATH = "/trunk/";
FlowWorkSpace.BASE_PATH = '/'+window.location.href.replace('//','').split('/')[1]+'/'; 
//alert(FlowWorkSpace.BASE_PATH1);

//
//
//FlowWorkSpace.ITSM_FLOW_PATH = FlowWorkSpace.BASE_PATH + "XiorkFlow/";
//FlowWorkSpace.ITSM_FLOW_PATH = "../XiorkFlow/";
FlowWorkSpace.ITSM_FLOW_PATH = "../workflow/flowdesign/";
//:~
//
FlowWorkSpace.DEFAULT_PROCESS_NAME = "default";

//
FlowWorkSpace.URL_ADD_PROCESS = FlowWorkSpace.BASE_PATH + "flow/addprocess.html";
FlowWorkSpace.URL_DELETE_PROCESS = FlowWorkSpace.BASE_PATH + "deleteprocess.wf";
FlowWorkSpace.URL_GET_PROCESS = FlowWorkSpace.BASE_PATH + "flow/getprocess.html";
//lingzj加入获得节点属性的servlet
FlowWorkSpace.URL_GETDEF_PROCESS = FlowWorkSpace.BASE_PATH + "flow/getdefprocess.html";
//:~
FlowWorkSpace.URL_LIST_PROCESS = FlowWorkSpace.BASE_PATH + "listprocess.wf";
FlowWorkSpace.URL_UPDATE_PROCESS = FlowWorkSpace.BASE_PATH + "flow/updateprocess.html";

//
FlowWorkSpace.STATUS_NULL = -1;
FlowWorkSpace.STATUS_SUCCESS = 0;
FlowWorkSpace.STATUS_FAIL = 1;
FlowWorkSpace.STATUS_FILE_EXIST = 3;
FlowWorkSpace.STATUS_FILE_NOT_FOUND = 5;
FlowWorkSpace.STATUS_XML_PARSER_ERROR = 7;
FlowWorkSpace.STATUS_IO_ERROR = 9;

//
FlowWorkSpace.ID = 0;

//
FlowWorkSpace.META_NODE_MOVED_STEP_TIME = 10;
FlowWorkSpace.META_NODE_MOVED_STEP = 1;

//
FlowWorkSpace.META_NODE_MAX = 500;

//
FlowWorkSpace.META_NODE_MIN_WIDTH = 80;
FlowWorkSpace.META_NODE_MIN_HEIGHT = 30;

//
/**
 * 建立工作空间
 */
FlowWorkSpace.build = function () {
 	//引入所需要的资源，资源加载顺序不能更改
	//alert(FlowWorkSpace.ITSM_FLOW_PATH);
	//name.flow.util
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/util/Message.js");
    //BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/util/Array.js");
    BuildLibrary.loadJS("../ext/extension/Array.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/util/String.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/util/List.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/util/Observable.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/util/Observer.js");

	//name.flow.geom
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/geom/Point.js");

	//name.flow.html
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/html/Toolkit.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/html/Browser.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/html/Cursor.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/html/MouseEvent.js");

	//name.flow.xml
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/xml/XMLDocument.js");

	//name.flow.ajax
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ajax/Ajax.js");

	//name.flow.ui.event
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/event/KeyListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/event/MouseListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/event/MouseWheelListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/event/ContextMenuListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/event/ListenerProxy.js");

	//name.flow.ui
    BuildLibrary.loadCSS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/ui.css");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/Dimension.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/Component.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/Button.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/ButtonModel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/ToggleButton.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/ToggleButtonModel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/ButtonGroup.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/ToolBar.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/Panel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/ScrollPanel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/Label.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/Frame.js");
    
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/ui/Retangle.js");

	//name.flow.geom.ui
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/geom/ui/GeometryCanvas.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/geom/ui/LineView.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/geom/ui/LineTextView.js");
    
    

    //name.itsmflow.meta.event
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/event/MetaNodeMouseListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/event/MetaNodeTextMouseListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/event/MetaNodeTextKeyListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/event/TransitionMouseListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/event/MetaNodeResizeMouseListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/event/TransitionTextMouseListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/event/TransitionTextKeyListener.js");
    
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/event/RetangleMouseListener.js");

    //name.itsmflow.meta
    //BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/jbpm/ItsmBase.js");
    //BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/jbpm/ItsmFlow.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/jbpm/DomTree.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/jbpm/DomFlow.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/jbpm/DomNode.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/jbpm/DomTran.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/jbpm/DomTask.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/jbpm/DomEvent.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/jbpm/DomAction.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/jbpm/PropertyFormPanel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/jbpm/PropertyPanel.js");
    //BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/jbpm/EventAction.js");
    //BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/jbpm/TaskAssignment.js");
    //BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/jbpm/TaskEvent.js");
    //BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/jbpm/NodeTask.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/DragablePanel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/MetaModel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/MetaNodeModel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/MetaNode.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/StartNodeModel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/StartNode.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/EndNodeModel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/EndNode.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/NodeModel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/Node.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/DecisionNodeModel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/DecisionNode.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/ForkNodeModel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/ForkNode.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/JoinNodeModel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/JoinNode.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/TransitionCompass.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/TransitionModel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/meta/Transition.js");

    //name.itsmflow.event
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/event/WrapperMetaMouseListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/event/WrapperSelectMouseListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/event/MetaMoveMouseListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/event/MetaMoveKeyListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/event/WrapperTransitionMouseListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/event/DeleteMetaActionListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/event/SaveActionListener.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/event/HelpActionListener.js");
    
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/event/RetangleMoveMouseListener.js");

    //name.itsmflow.process
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/process/AddProcess.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/process/GetProcess.js");
    
    //lingzj 加入解析工作流定义文件的方法
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/process/GetDefProcess.js");
    //:~
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/process/UpdateProcess.js");

    //name.itsmflow
    BuildLibrary.loadCSS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/flow.css");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/FlowToolBar.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/StateMonitor.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/TransitionMonitor.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/FlowViewer.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/FlowTableViewer.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/FlowXMLViewer.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/StatusLabel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/FlowModel.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/FlowModelConverter.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/Flow.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/FlowWrapper.js");
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "src/name/flow/FlowViewPattern.js");
    
    BuildLibrary.loadJS(FlowWorkSpace.ITSM_FLOW_PATH + "js/DesignBpStateAddOrEdit.js");
};
/*Ext.ux.SyncLoader = function(url, cachingOff, responseXML) {
    var activeX = Ext.lib.Ajax.activeX;
    var isLocal = (document.location.protocol == 'file:');
    var conn;

    try {
        if (Ext.isIE7 && isLocal) {
            throw ("IE7forceActiveX");
        }
        conn = new XMLHttpRequest();
    } catch (e) {
        for (var i = 0; i < activeX.length; ++i) {
            try {
                conn = new ActiveXObject(activeX[i]);
                break;
            } catch (e) {
            }
        }
    }
    // Should we disable caching
    if (!cachingOff)
        url += (url.indexOf('?') != -1 ? '&' : '?') + '_dc='
                + (new Date().getTime());
    try {
        conn.open('GET', url, false);
        conn.send(null);
        if ((isLocal && conn.responseText.length != 0)
                || (conn.status !== undefined && conn.status >= 200 && conn.status < 300)) {
            return responseXML ? conn.responseXML : conn.responseText;
        }
    } catch (e) {
    }
    return false;
} */
//
/**
 * 资源加载
 */
function BuildLibrary() {
}
BuildLibrary.loadJS = function (url, charset) {
    if (!charset) {
        charset = "UTF-8";
    }
    var charsetProperty = " charset=\"" + charset + "\" ";
    /*if (url && !document.getElementById(url)) {
        var content = Ext.ux.SyncLoader(url, false);
        if (content === false)
            return false;
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        try {
            script.text = content;
        } catch (e) {
            script.appendChild(content);
        }
        script.setAttribute("type", "text/javascript");
        script.setAttribute("id", url);
        script.setAttribute("charset",charset);
        head.appendChild(script);
        return true;
    }*/
    document.write("<script type=\"text/javascript\" src=\"" + url + "\" onerror=\"\"" + charsetProperty + "></script>");//alert('Error loading ' + this.src);
};
BuildLibrary.loadCSS = function (url, charset) {
    if (!charset) {
        charset = "UTF-8";
    }
    var charsetProperty = " charset=\"" + charset + "\" ";
    /*if (url && !document.getElementById(url)) {
        var head = document.getElementsByTagName("head")[0];
        var link = document.createElement("link");
        link.setAttribute("id", url);
        link.setAttribute("type", "text/css");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", url);
        head.appendChild(link);
        return true;
    }*/
    document.write("<link href=\"" + url + "\" type=\"text/css\" rel=\"stylesheet\" onerror=\"\"" + charsetProperty + "/>");//alert('Error loading ' + this.src);
};

