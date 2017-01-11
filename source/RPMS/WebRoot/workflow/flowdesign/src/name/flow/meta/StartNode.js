
/**
 * <p>Title: StartNode</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function StartNode(model, wrapper) {
    this.base = MetaNode;
    //var imageUrl = FlowWorkSpace.ITSM_FLOW_PATH + "images/start.gif";
    var imageUrl = "../styles/default/images/icons/16_16/start.png";
    this.base(model, imageUrl, wrapper);
}
StartNode.prototype = new MetaNode();

