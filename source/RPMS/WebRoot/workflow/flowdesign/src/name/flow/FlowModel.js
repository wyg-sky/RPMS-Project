
/**
 * <p>Title:  </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function FlowModel() {
    this.base = Observable;
    this.base();
    this.resetID();
    this.setName(null);

    //
    this.metaNodeModels = new Array();
    this.transitionModels = new Array();

    //
    this.selectedMetaNodeModels = new Array();
    this.selectedTransitionModels = new Array();
	
	
	this.selectedRetangles = new Array();///
    //
    this.setEnable(true);
    this.setEditable(true);
}
FlowModel.prototype = new Observable();

//
FlowModel.prototype.addMetaNodeModel = function (metaNodeModel) {
	//alert(metaNodeModel.getID());
	//null
    if (metaNodeModel == null) {
        return;
    }
    //exist
    if (this.metaNodeModels.indexOf(metaNodeModel) > -1) {
        return;
    }

	//
    var id = metaNodeModel.getID();
	
    if (id) {
        this.updateID(id);
    } else {
    	var nextid = this.nextID();
    	//alert(nextid);
        metaNodeModel.setID(nextid);
        //lingzj 新增一个任务节点，需要在east的节点属性中加入一个tabpanel
		//alert('addMetaNodeModel   '+metaNodeModel.getID()+"  "+window.parent.location.href);
		propertyPanel.addNode(metaNodeModel);
		//window.parent.addNode(metaNodeModel.getID(),metaNodeModel.getText(),metaNodeModel.type);
		//metaNodeModel.setSelected(true);//将新加的节点置为选中状态
	    //
    }
	
    this.metaNodeModels.add(metaNodeModel);
    var args = [FlowModel.META_NODE_MODEL_ADD, metaNodeModel];
    this.notifyObservers(args);
};

FlowModel.prototype.removeMetaNodeModel = function (metaNodeModel) {
	//null
    if (metaNodeModel == null) {
        return;
    }

    //
    var fromTransitionModels = metaNodeModel.getFroms();
    for (var i = 0; i < fromTransitionModels.size(); i++) {
        this.removeTransitionModel(fromTransitionModels.get(i));
    }
    var toTransitionModels = metaNodeModel.getTos();
    for (var i = 0; i < toTransitionModels.size(); i++) {
        this.removeTransitionModel(toTransitionModels.get(i));
    }
	//lingzj删除一个节点
	//alert('删除一个节点'+window.parent.nodetabs.items.length);
	//window.parent.delNode(metaNodeModel.getID());
	propertyPanel.delModel(metaNodeModel);
    //
    this.metaNodeModels.remove(metaNodeModel);
    this.removeSelectedMetaNodeModel(metaNodeModel);

    //
    var args = [FlowModel.META_NODE_MODEL_REMOVE, metaNodeModel];
    this.notifyObservers(args);
};
FlowModel.prototype.getMetaNodeModels = function () {
    return this.metaNodeModels;
};
//LINGZJ 加入根据id获取对象的方法
FlowModel.prototype.getMetaNodeModelById = function (metaNodeModelId) {
    for (var i = 0; i < this.metaNodeModels.size(); i++) {
        var metaNodeModelObj = this.metaNodeModels.get(i);
        if(metaNodeModelObj.getID()==metaNodeModelId){
			return metaNodeModelObj;
		}
    }
};
FlowModel.prototype.getMetaTranModelById = function (metaTranModelId) {
    for (var i = 0; i < this.transitionModels.size(); i++) {
        var metaTranModelObj = this.transitionModels.get(i);
        if(metaTranModelObj.getID()==metaTranModelId){
			return metaTranModelObj;
		}
    }
};
//:~
//
FlowModel.prototype.addTransitionModel = function (transitionModel) {
	//null
    if (transitionModel == null) {
        return;
    }
    //exist
    if (this.transitionModels.indexOf(transitionModel) > -1) {
        return;
    }

    //
    var id = transitionModel.getID();
    if (id) {
        this.updateID(id);
    } else {
        transitionModel.setID(this.nextID());
		//lingzj 增加一个连线
		//alert('增加一个连线'+transitionModel.getID());
		//window.parent.addTransition(transitionModel.getID(),transitionModel.getFromMetaNodeModel().getID());
		propertyPanel.addTran(transitionModel);
    }

    //
    this.transitionModels.add(transitionModel);
    var args = [FlowModel.TRANSITION_MODEL_ADD, transitionModel];
    this.notifyObservers(args);
};
FlowModel.prototype.removeTransitionModel = function (transitionModel) {
	//null
    if (transitionModel == null) {
        return;
    }

    //
    this.transitionModels.remove(transitionModel);
    this.removeSelectedTransitionModel(transitionModel);
	//lingzj 删除一个连线
	//alert('删除一个连线');
	//window.parent.delNode(transitionModel.getID());
	propertyPanel.delModel(transitionModel);
    var args = [FlowModel.TRANSITION_MODEL_REMOVE, transitionModel];
    this.notifyObservers(args);
};
FlowModel.prototype.getTransitionModels = function () {
    return this.transitionModels;
};

//
FlowModel.prototype.addSelectedMetaNodeModel = function (metaNodeModel) {
	//null
    if (metaNodeModel == null) {
        return;
    }
    //exist
    if (this.selectedMetaNodeModels.indexOf(metaNodeModel) > -1) {
        return;
    }
    metaNodeModel.setSelected(true);
    //metaNodeModel.setFlaged(true);
    this.selectedMetaNodeModels.add(metaNodeModel);
};
FlowModel.prototype.removeSelectedMetaNodeModel = function (metaNodeModel) {
	//null
    if (metaNodeModel == null) {
        return;
    }
    metaNodeModel.setSelected(false);
    this.selectedMetaNodeModels.remove(metaNodeModel);
};
FlowModel.prototype.getSelectedMetaNodeModels = function () {
    return this.selectedMetaNodeModels;
};
FlowModel.prototype.clearSelectedMetaNodeModels = function () {
    for (var i = 0; i < this.selectedMetaNodeModels.size(); i++) {
        this.selectedMetaNodeModels.get(i).setSelected(false);
    }
    return this.selectedMetaNodeModels.clear();
};

//
FlowModel.prototype.addSelectedTransitionModel = function (transitionModel) {
	//null
    if (transitionModel == null) {
        return;
    }
    //exist
    if (this.selectedTransitionModels.indexOf(transitionModel) > -1) {
        return;
    }
    transitionModel.setSelected(true);
    this.selectedTransitionModels.add(transitionModel);
};
FlowModel.prototype.removeSelectedTransitionModel = function (transitionModel) {
	//null
    if (transitionModel == null) {
        return;
    }
    transitionModel.setSelected(false);
    this.selectedTransitionModels.remove(transitionModel);
};
FlowModel.prototype.getSelectedTransitionModels = function () {
    return this.selectedTransitionModels;
};
FlowModel.prototype.clearSelectedTransitionModels = function () {
    for (var i = 0; i < this.selectedTransitionModels.size(); i++) {
        this.selectedTransitionModels.get(i).setSelected(false);
    }
    return this.selectedTransitionModels.clear();
};

///
FlowModel.prototype.addSelectedRetangle = function (retangle) {
    //null
    if (retangle == null) {
        return;
    }
    //exist
    if (this.selectedRetangles.indexOf(retangle) > -1) {
        return;
    }
    retangle.setSelected(true);
    this.selectedRetangles.add(retangle);
    this.notifyObservers(FlowModel.SELECTED_RETANGLE_ADD);
    
};
FlowModel.prototype.removeSelectedRetangle = function (retangle) {
    //null
    if (retangle == null) {
        return;
    }
    if(retangle.isSelected()){
        retangle.setSelected(false);
        this.selectedRetangles.remove(retangle);
        this.notifyObservers(FlowModel.SELECTED_RETANGLE_REMOVE);
    }
    
};
FlowModel.prototype.getSelectedRetangles = function () {
    return this.selectedRetangles;
};
FlowModel.prototype.clearSelectedRetangles = function () {
    for (var i = 0; i < this.selectedRetangles.size(); i++) {
        this.selectedRetangles.get(i).setSelected(false);
    }
    return this.selectedRetangles.clear();
};
///:~


//
FlowModel.prototype.deleteSelected = function () {
    var selectedMetaNodeModels = this.getSelectedMetaNodeModels().clone();
    var selectedTransitionModels = this.getSelectedTransitionModels().clone();
    if ((selectedMetaNodeModels.size() > 0) || (selectedTransitionModels.size() > 0)) {
        if (!window.confirm("\u5220\u9664\u540e\u5c06\u65e0\u6cd5\u56de\u590d\uff0c\u60a8\u786e\u5b9a\u5220\u9664\uff1f")) {
            return;
        }
        //alert(window.parent.nodetabs.items.length);
	//lingzj 如果是update 那么至少要保留一个节点
		//if(window.parent.nodetabs.items.length==1&&window.parent.frames["f_wa"].location.href.indexOf("updateprocess")>-1){
		//	alert("更新工作流至少要保留一个节点！");
		//}
		else{
        
	        for (var i = 0; i < selectedTransitionModels.size(); i++) {
	            this.removeTransitionModel(selectedTransitionModels.get(i));
	        }
	
	        //
	        for (var i = 0; i < selectedMetaNodeModels.size(); i++) {
	            this.removeMetaNodeModel(selectedMetaNodeModels.get(i));
	        }
        }
    }
};


//
FlowModel.prototype.setEnable = function (enable) {
    this.enable = enable;
};
FlowModel.prototype.isEnable = function () {
    return this.enable;
};
FlowModel.prototype.setEditable = function (editable) {
    this.editable = editable;
};
FlowModel.prototype.isEditable = function () {
    return this.editable;
};

//
FlowModel.prototype.setName = function (name) {
    this.name = name;
};
FlowModel.prototype.getName = function () {
    return this.name;
};

//
FlowModel.prototype.resetID = function () {
    this.id = FlowWorkSpace.ID;
};
FlowModel.prototype.updateID = function (id) {

    if (id > this.id) {
        this.id = id;
    }
};
FlowModel.prototype.nextID = function () {
	this.id = this.id + 1;
    return this.id;
};

//
FlowModel.moveMetaNodeModelBy = function (metaNodeModels, x, y) {
    for (var i = 0; i < metaNodeModels.size(); i++) {
        var metaNodeModel = metaNodeModels.get(i);
        var pos = metaNodeModel.getPosition();
        if (((pos.getX() + x) < 0) || ((pos.getY() + y) < 0)) {
            return;
        }
    }
    for (var i = 0; i < metaNodeModels.size(); i++) {
        var metaNodeModel = metaNodeModels.get(i);
        var pos = metaNodeModel.getPosition();
        metaNodeModel.setPosition(new Point(pos.getX() + x, pos.getY() + y));
    }
};

//static
FlowModel.META_NODE_MODEL_ADD = "META_NODE_MODEL_ADD";
FlowModel.META_NODE_MODEL_REMOVE = "META_NODE_MODEL_REMOVE";
FlowModel.TRANSITION_MODEL_ADD = "TRANSITION_MODEL_ADD";
FlowModel.TRANSITION_MODEL_REMOVE = "TRANSITION_MODEL_REMOVE";


FlowModel.SELECTED_RETANGLE_ADD = "SELECTED_RETANGLE_ADD";
FlowModel.SELECTED_RETANGLE_REMOVE = "SELECTED_RETANGLE_REMOVE";

