
/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function NodeModel() {
    this.base = MetaNodeModel;
    this.base();

    //LINGZJ
    this.setText("\u4EFB\u52A1\u8282\u70B9");//Node

    //
    this.setSize(new Dimension(80, 30));
}
NodeModel.prototype = new MetaNodeModel();

//
NodeModel.prototype.toString = function () {
	//节点
    return "[\u8282\u70b9:" + this.getText() + "]";
};

//
NodeModel.prototype.type = MetaNodeModel.TYPE_NODE;

NodeModel.prototype.elType = MetaNodeModel.EL_TYPE_NODE;

