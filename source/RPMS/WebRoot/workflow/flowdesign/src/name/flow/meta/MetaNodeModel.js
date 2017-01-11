
/**
 * <p>Title:  </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2009</p>
 * @author itsm
 */
function MetaNodeModel() {
    this.base = MetaModel;
    this.base();

    //LINGZJ 修改了能够进入和出去的连线的数目
    this.FROMS_MAX = 200;
    this.TOS_MAX = 200;

    //
    this.setPosition(new Point(0, 0));
    this.setSize(new Dimension(80, 30));
    this.setText("MetaNode");

    //
    this.froms = new Array();
    this.tos = new Array();

    //
    this.setEditing(false);
}
MetaNodeModel.prototype = new MetaModel();

//
MetaNodeModel.prototype.toString = function () {
	//元节点
    return "[\u5143\u8282\u70b9:" + this.getText() + "]";
};

//
MetaNodeModel.prototype.setPosition = function (position) {
    if (this.isEditing()) {
        return;
    }
    if (position == null) {
        return;
    }
    if ((position.getX() < 0) || (position.getY() < 0)) {
        return;
    }
    if (this.isResizing()) {
        return;
    }
    this.position = position;
    this.notifyObservers(MetaNodeModel.POSITION_CHANGED);
};
MetaNodeModel.prototype.getPosition = function () {
    return this.position;
};

//
MetaNodeModel.prototype.setSize = function (size) {
    if (size == null) {
        return;
    }
    if (size.getWidth() < FlowWorkSpace.META_NODE_MIN_WIDTH) {
        size.setWidth(FlowWorkSpace.META_NODE_MIN_WIDTH);
    }
    if (size.getHeight() < FlowWorkSpace.META_NODE_MIN_HEIGHT) {
        size.setHeight(FlowWorkSpace.META_NODE_MIN_HEIGHT);
    }
    this.size = size;
    this.notifyObservers(MetaNodeModel.SIZE_CHANGED);
};
MetaNodeModel.prototype.getSize = function () {
    return this.size;
};

//
MetaNodeModel.prototype.isNewFromAvailable = function () {
    var size = this.froms.size();
    return (this.FROMS_MAX == MetaNodeModel.NUM_NOT_LIMIT) ? true : (this.FROMS_MAX > size);
};
MetaNodeModel.prototype.isNewToAvailable = function () {
    var size = this.tos.size();
    return (this.TOS_MAX == MetaNodeModel.NUM_NOT_LIMIT) ? true : (this.TOS_MAX > size);
};

//
MetaNodeModel.prototype.isFromValidity = function () {
    var size = this.froms.size();
    return (this.FROMS_MAX == MetaNodeModel.NUM_NOT_LIMIT) ? true : (this.FROMS_MAX >= size);
};
MetaNodeModel.prototype.isToValidity = function () {
    var size = this.tos.size();
    return (this.TOS_MAX == MetaNodeModel.NUM_NOT_LIMIT) ? true : (this.TOS_MAX >= size);
};

//
MetaNodeModel.prototype.setResizing = function (resizing) {
    this.resizing = resizing;
};
MetaNodeModel.prototype.isResizing = function () {
    return this.resizing;
};

//
MetaNodeModel.prototype.addFrom = function (transitionModel) {
    this.froms.add(transitionModel);
    this.notifyObservers(MetaNodeModel.FROM_CHANGED);
    this.addObserver(transitionModel);
};
MetaNodeModel.prototype.removeFrom = function (transitionModel) {
    this.froms.remove(transitionModel);
    this.notifyObservers(MetaNodeModel.FROM_CHANGED);
    this.removeObserver(transitionModel);
};
MetaNodeModel.prototype.getFroms = function () {
    return this.froms;
};
MetaNodeModel.prototype.addTo = function (transitionModel) {
    this.tos.add(transitionModel);
    this.notifyObservers(MetaNodeModel.TO_CHANGED);
    this.addObserver(transitionModel);
};
MetaNodeModel.prototype.removeTo = function (transitionModel) {
    this.tos.remove(transitionModel);
    this.notifyObservers(MetaNodeModel.TO_CHANGED);
    this.removeObserver(transitionModel);
};
MetaNodeModel.prototype.getTos = function () {
    return this.tos;
};
//ITSMFLOW 控制dom树上节点显示的图标
MetaNodeModel.prototype.getIconCls = function () {
    //alert(MetaNodeModel.TYPE_START_NODE);
    var nodeIconCls = MetaNodeModel.DOM_NODE;
    switch (this.type) {
      case MetaNodeModel.TYPE_START_NODE:
      	nodeIconCls = MetaNodeModel.DOM_START_NODE;
        break;
      case MetaNodeModel.TYPE_END_NODE:
      	nodeIconCls = MetaNodeModel.DOM_END_NODE;
        break;
      case MetaNodeModel.TYPE_FORK_NODE:
      	nodeIconCls = MetaNodeModel.DOM_FORK_NODE;
        break;
      case MetaNodeModel.TYPE_JOIN_NODE:
      	nodeIconCls = MetaNodeModel.DOM_JOIN_NODE;
        break;
      case MetaNodeModel.TYPE_DECISION_NODE:
      	nodeIconCls = MetaNodeModel.DOM_DECISION_NODE;
        break;
      default:
        break;
    }
    return nodeIconCls;
};
//:~

//
MetaNodeModel.NUM_NOT_LIMIT = -1;

//
MetaNodeModel.POSITION_CHANGED = "POSITION_CHANGED";
MetaNodeModel.SIZE_CHANGED = "SIZE_CHANGED";
MetaNodeModel.FROM_CHANGED = "FROM_CHANGED";
MetaNodeModel.TO_CHANGED = "TO_CHANGED";

//
MetaNodeModel.TYPE_META_NODE = "META_NODE";
MetaNodeModel.TYPE_START_NODE = "START_NODE";
MetaNodeModel.TYPE_END_NODE = "END_NODE";
MetaNodeModel.TYPE_NODE = "NODE";
MetaNodeModel.TYPE_DECISION_NODE = "DECISION_NODE";
MetaNodeModel.TYPE_FORK_NODE = "FORK_NODE";
MetaNodeModel.TYPE_JOIN_NODE = "JOIN_NODE";

MetaNodeModel.prototype.type = MetaNodeModel.TYPE_META_NODE;
MetaNodeModel.prototype.elType = MetaNodeModel.EL_TYPE_NODE;


//ITSMFLOW DOM树上节点的图标
MetaNodeModel.DOM_START_NODE = "start-icon";
MetaNodeModel.DOM_END_NODE = "end-icon";
MetaNodeModel.DOM_NODE = "task-node-icon";
MetaNodeModel.DOM_DECISION_NODE = "decision-node-icon";
MetaNodeModel.DOM_FORK_NODE = "fork-node-icon";
MetaNodeModel.DOM_JOIN_NODE = "join-node-icon";
//:~

//生成jbpm时，每种节点对应的element
MetaNodeModel.EL_TYPE_START_NODE = "start-state";
MetaNodeModel.EL_TYPE_END_NODE = "end-state";
MetaNodeModel.EL_TYPE_NODE = "task-node";
MetaNodeModel.EL_TYPE_DECISION_NODE = "decision";
MetaNodeModel.EL_TYPE_FORK_NODE = "fork";
MetaNodeModel.EL_TYPE_JOIN_NODE = "join";
//:~