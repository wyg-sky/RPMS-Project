
/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function SaveActionListener(flow) {
    this.flow = flow;
}
SaveActionListener.prototype.actionPerformed = function (obj) {
	//修改保存操作 lingzj
    var wrapper = this.flow.getWrapper();
    var toolbar = this.flow.getToolBar();
   // alert('b');
    //var name = wrapper.getModel().getName();
    var name = propertyPanel.getFlowTypeName();
    //点击保存时，把当前form的内容也保存
    propertyPanel.beforeSave();
    var fileName = propertyPanel.getFlowName();
    var fileDescription = propertyPanel.getFlowDescription();
    if(operType!='edit')
    	fileId = propertyPanel.getFlowId();
    //alert(operType+"---"+fileId);
//alert('c');
    //alert(fileDescription);
    if (operType=='add'||operType=='addby') {
    	//type=window.parent.getFlowType();
    	//name = window.parent.Ext.getCmp('flowPropertiesPanel').getSource()['工作流名称'];
    	//请输入您将工作流程图保存成的名字？
        //name = prompt("\u8bf7\u8f93\u5165\u5de5\u4f5c\u6d41\u7a0b\u56fe\u7684\u540d\u5b57\uff1f", "");
        //name="itsmWF";
        
        if (name != null && name != "") {
        	if(confirm('确实要保存工作流《'+name+'》的'+version+'版本吗？')){
        		//window.parent.showMessage('正在保存工作流!');
	            var addProcess = new AddProcess(wrapper, toolbar, this.flow.getProcessList());
	            name = name + '_' + version;
	            addProcess.addProcess(name,fileName,fileDescription);
	        }
        }else{
	    	//if(window.parent.nodetabs.hidden){
	    	//	alert('不能保存空工作流！');
	    	//	return;
	    	//}; 
	    	//window.parent.parent.showWin();
	    	alert('工作流名称不能为空！');
	    }
    } else {
    	
    	//window.parent.showMessage('正在保存工作流!');
        var updateProcess = new UpdateProcess(wrapper, toolbar);

        name = name + '_' + version;
        updateProcess.updateProcess(name,fileName,fileDescription,fileId);
    }
};

