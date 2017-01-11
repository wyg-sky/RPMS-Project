/**
 * 流程设计器初始化及相关处理函数
 */

FlowWorkSpace.build();
var workFlowPageType = 'add';
var xiorkFlow;
var unloadFlag;

var operType = '';//操作类型 1.新增file-add 2.修改file-edit 3.根据某个file新增file-addby
var version = '';//版本
var bpId = '';//流程id
var bpCode = '';
var bpName = '';//流程
var fileId = 'flow';//编辑时穿过来的id
var tCode = '';//流程的类型的code
var playtype = '';//监控的play还是工作台的play


var execNodeNameAry = new Array();//执行的节点名称的集合
var metaNodeAry = new Array();//执行的metanode的集合

var selectedMetaNodeModel = null;//被选中的节点对象
var flowInsId = '';//play中的流程实例的id
//
function init() {
	var newElement = document.createElement('div'); 
	newElement.id = 'designer';
	newElement.onselectstart= function(){return false;}; 
	document.body.appendChild(newElement);
	  
	var newElement1 = document.createElement('div'); 
	   
	newElement1.id = 'message';
	document.body.appendChild(newElement1);

    //
    
	var designerDiv = Toolkit.getElementByID("designer");
	//alert(designerDiv.onselectstart);
	
    
    var searchStr = window.location.search;
    var params = searchStr.substring(searchStr.indexOf("?") + 1);
    var paramsArray = params.split("&");
    var name = null;
    for (var i = 0; i < paramsArray.size(); i++) {
        var tempStr = paramsArray.get(i);
        	
        var key = tempStr.substring(0, tempStr.indexOf("=")).toLowerCase();
        var value = tempStr.substring(tempStr.indexOf("=") + 1);
        if (key == "fileid"&&value!=null) fileId = value;
        if (key == "name") name = value;
        if (key == "tcode") tCode = value;
        if (key == "version") version = value;
        if (key == "bpname") bpName = value;
        if (key == "bpid") bpId = value;
        if (key == "bpcode") bpCode = value; 
        if (key == "opertype") operType = value;
        if (key == "playtype") playtype = value;//监控的play还是工作台的play
        if (key == "flowinsid") flowInsId = value;
        if (key == "executednodessequence"){
        	var executednodessequence = value;
        	execNodeNameAry = executednodessequence.split('->');
        }
        
    }
   // alert(flowInsId);
    if(operType=='view'||operType=='play'){//浏览/回演
    	xiorkFlow = new FlowViewPattern(designerDiv);
    	
    	//图例窗口  	
    	if(operType=='play'){
    		var win= new Ext.Window({
	    		title : '图例',
	    		width : 100,
	    		closable : false,
	    		collapsible : true,
	    		resizable : false,
	    		items :[
	    			{ html : '<div align="center" style="padding :3px;font-size:10;">已执行</div>', bodyStyle :'background-color: #99FF99;' , sytle : 'padding :3px;'},
	    			{ html : '<div align="center" style="padding :3px;font-size:10;">将要执行</div>', bodyStyle :'background-color: #FFFF00;'},
	    			{ html : '<div align="center" style="padding :3px;font-size:10;">未执行</div>', bodyStyle :'background-color: buttonface;'},
	    			{ html : '<div align="center" style="padding :3px;font-size:10;">已演示</div>', bodyStyle :'background-color: red;'}
	    		]
	    	});
	    	win.setPosition(document.body.clientWidth-100-28,39);
	    	win.show();
    	}
    	
    	
    	xiorkFlow.getWrapper().getModel().setEditable(true);
    	var getProcess = new GetProcess(xiorkFlow.getWrapper(), xiorkFlow.getTableViewer(), xiorkFlow.getToolBar());
        getProcess.getProcess(name);
    }else{
    	Message.setOutter(Toolkit.getElementByID("message"));
		xiorkFlow = new Flow(designerDiv);
	    xiorkFlow.setProcessList(window.dialogArguments);
	
		//
	    document.body.onbeforeunload = function () {
	    	if(unloadFlag)  return;
	        if (xiorkFlow.getWrapper().isChanged()) {
	    	    //您对工作流程图的编辑尚未保存，离开该页面将退出系统!
	            window.event.returnValue = "\u60a8\u5bf9\u5de5\u4f5c\u6d41\u7a0b\u56fe\u7684\u7f16\u8f91\u5c1a\u672a\u4fdd\u5b58\uff0c\u79bb\u5f00\u8be5\u9875\u9762\u5c06\u9000\u51fa\u7cfb\u7edf!";
	        }
	        unloadFlag = true;
	    };
	    if(operType=='edit'||operType=='addby'){//修改或者根据原来版本创建新版本
	    	var getProcess = new GetProcess(xiorkFlow.getWrapper(), xiorkFlow.getTableViewer(), xiorkFlow.getToolBar());
	        getProcess.getProcess(name); 
	    }
    }

}
//根据节点名称，得到METANODE
function getMetaNodeByName(metaNodeName){
	
	var metaNodes = xiorkFlow.getWrapper().metaNodes;
	for(var i=0;i<metaNodes.size();i++){
		var mName = metaNodes.get(i).getModel().getText();
		if(metaNodeName==mName){
			metaNodes.get(i).setSort(i);
			return metaNodes.get(i);
		}
	}
}
//LINGZJ 再现工作流
var flashFlag = false;//用于判断是否正在回演的标记
//开始演示
function startPlayFlow(){
	if(flashFlag) return false;
	flashFlag = true;
	var timeFlag = 0;//用于进行时间控制的参数
	//var execNodeNameAry = executednodessequence.split('->');
	var tempArry=new Array();
	for(var i = 0; i < execNodeNameAry.size();  i++){
		
		//并行显示支持 
		
		tempArry=execNodeNameAry[i].split('-$$-');
		for(var j=0 ; j<tempArry.size(); j++){
			var metaNode=getMetaNodeByName(tempArry[j]);
			metaNodeAry.add(metaNode);
			metaNode.executeFlash(metaNode.getSort(),200,timeFlag*2000+100,timeFlag*2000+2100,metaNode.getClassName());
		}
		
		
//		var metaNode = getMetaNodeByName(execNodeNameAry.get(i));
//		
//		metaNodeAry.add(metaNode);
//		metaNode.executeFlash(metaNode.getSort(),200,timeFlag*2000+100,timeFlag*2000+2100);
		//metaNode.setClassName("NAME_ITSM_UI_FONT NAME_ITSMFLOW_METANODE_FLASH");
		timeFlag++;
		//判断下级节点是否是decision节点，如果是的话，decision节点也要进行回演
		/*var metaTranFroms = metaNode.getModel().getFroms();
		if(metaTranFroms.size()==1){//如果下级节点是decision节点，那么只能有一个to
			var metaTranFrom = metaTranFroms.get(0);
			var metaNodeTo = metaTranFrom.getToMetaNodeModel();
			if(metaNodeTo.type=='DECISION_NODE'){
				var metaDecisionNode = getMetaNodeByName(metaNodeTo.getText());
				metaNodeAry.add(metaDecisionNode);
				metaDecisionNode.executeFlash(metaDecisionNode.getSort(),200,timeFlag*2000+100,timeFlag*2000+2100);
				timeFlag++;
			}
		}*/
		//:~
	}
}
//结束演示
function endPlayFlow(){
	if(!flashFlag) return false;
	flashFlag = false;
	for(var i = 0; i < metaNodeAry.size();  i++){
		var metaNode = metaNodeAry.get(i);
		if((i==metaNodeAry.size()-1)&&(metaNode.getModel().type!=MetaNodeModel.TYPE_END_NODE)){//是最后执行的节点但不是结束节点
 			metaNode.finishFlash("NAME_ITSM_UI_FONT NAME_ITSMFLOW_METANODE_EXECUTING");
 		}else
 			metaNode.finishFlash("NAME_ITSM_UI_FONT NAME_ITSMFLOW_METANODE_EXECUTE");
	}
}

/**
 * 进度条。
 * @param info : 在进度条上要显示的信息。
 * 
 */
function showMessage(info){
	Ext.MessageBox.show({
		title: $lang('workflow.flowManager.wait')/*'请稍等'*/,
		progressText: '',
		width: 400,
		progress: true,
		closable: false,
		animEl: 'loding'
	});
	//控制进度速度
	var f = function(v){
		return function(){
			var i = v / 12;
			Ext.MessageBox.updateProgress(i, info);
		};
	};
	for (var i = 1; i < 13; i++) {
		setTimeout(f(i), i * 150);
	}
}
