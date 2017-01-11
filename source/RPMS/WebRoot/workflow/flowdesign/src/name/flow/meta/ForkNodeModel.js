
/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function ForkNodeModel() {
    this.base = MetaNodeModel;
    this.base();
	
	//LINGZJ 对于进入分支节点的连线的数目进行限制
	this.TOS_MAX = 1;
    //
    this.FROMS_MAX = MetaNodeModel.NUM_NOT_LIMIT;
    //LINGZJ
    this.setText("\u5206\u652F\u8282\u70B9");//ForkNode

    //
    this.setSize(new Dimension(80, 30));
}
ForkNodeModel.prototype = new MetaNodeModel();

//
ForkNodeModel.prototype.toString = function () {
	//分支
    return "[\u5206\u652f:" + this.getText() + "]";
};

//
ForkNodeModel.prototype.type = MetaNodeModel.TYPE_FORK_NODE;

ForkNodeModel.prototype.elType = MetaNodeModel.EL_TYPE_FORK_NODE;

