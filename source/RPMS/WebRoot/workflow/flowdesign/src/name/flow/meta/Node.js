
/**
 * <p>Title: Node</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function Node(model, wrapper) {
    this.base = MetaNode;
    //var imageUrl = FlowWorkSpace.ITSM_FLOW_PATH + "images/node.gif";
    var imageUrl = "../styles/default/images/icons/16_16/task-node.png";
    this.base(model, imageUrl, wrapper);
}
Node.prototype = new MetaNode();

