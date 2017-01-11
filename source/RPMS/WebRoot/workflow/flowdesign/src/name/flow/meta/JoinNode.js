
/**
 * <p>Title:JoinNode</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function JoinNode(model, wrapper) {
    this.base = MetaNode;
    //var imageUrl = FlowWorkSpace.ITSM_FLOW_PATH + "images/join.gif";
    var imageUrl = "../styles/default/images/icons/16_16/join-node.png";
    this.base(model, imageUrl, wrapper);
}
JoinNode.prototype = new MetaNode();

