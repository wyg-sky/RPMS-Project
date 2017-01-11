
/**
 * <p>Title: EndNode</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function EndNode(model, wrapper) {
    this.base = MetaNode;
    //var imageUrl = FlowWorkSpace.ITSM_FLOW_PATH + "images/end.gif";
    var imageUrl = "../styles/default/images/icons/16_16/end.png";
    this.base(model, imageUrl, wrapper);
}
EndNode.prototype = new MetaNode();

