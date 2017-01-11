
/**
 * <p>Title: DecisionNode</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function DecisionNode(model, wrapper) {
    this.base = MetaNode;
    //var imageUrl = FlowWorkSpace.ITSM_FLOW_PATH + "images/decision.gif";
    var imageUrl = "../styles/default/images/icons/16_16/decision-node.png";
    this.base(model, imageUrl, wrapper);
}
DecisionNode.prototype = new MetaNode();

