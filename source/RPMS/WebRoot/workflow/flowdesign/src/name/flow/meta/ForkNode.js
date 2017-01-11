
/**
 * <p>Title: ForkNode</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function ForkNode(model, wrapper) {
    this.base = MetaNode;
    //var imageUrl = FlowWorkSpace.ITSM_FLOW_PATH + "images/fork.gif";
    var imageUrl = "../styles/default/images/icons/16_16/fork-node.png";
    this.base(model, imageUrl, wrapper);
}
ForkNode.prototype = new MetaNode();

