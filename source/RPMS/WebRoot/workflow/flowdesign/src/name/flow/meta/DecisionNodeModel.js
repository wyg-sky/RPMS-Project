
/**
 * <p>Title: DecisionNodeModel</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function DecisionNodeModel() {
    this.base = MetaNodeModel;
    this.base();

    //LINGZJ 判断节点
    this.setText("\u5224\u65AD\u8282\u70B9");//Node

    //
    this.setSize(new Dimension(80, 30));
}
DecisionNodeModel.prototype = new MetaNodeModel();

//
DecisionNodeModel.prototype.toString = function () {
	//节点
    return "[\u8282\u70b9:" + this.getText() + "]";
};

//
DecisionNodeModel.prototype.type = MetaNodeModel.TYPE_DECISION_NODE;

DecisionNodeModel.prototype.elType = MetaNodeModel.EL_TYPE_DECISION_NODE;