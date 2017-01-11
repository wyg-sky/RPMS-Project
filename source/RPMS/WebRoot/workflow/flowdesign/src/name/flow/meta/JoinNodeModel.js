
/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function JoinNodeModel() {
    this.base = MetaNodeModel;
    this.base();
    
	//LINGZJ对于从聚合节点出去的连线数目进行限制
	this.FROMS_MAX = 1;
    //
    this.TOS_MAX = MetaNodeModel.NUM_NOT_LIMIT;
    //LINGZJ
    this.setText("\u6C47\u805A\u8282\u70B9");//JoinNode

    //
    this.setSize(new Dimension(80, 30));
}
JoinNodeModel.prototype = new MetaNodeModel();

//
JoinNodeModel.prototype.toString = function () {
	//汇聚
    return "[\u6c47\u805a:" + this.getText() + "]";
};

//
JoinNodeModel.prototype.type = MetaNodeModel.TYPE_JOIN_NODE;

JoinNodeModel.prototype.elType = MetaNodeModel.EL_TYPE_JOIN_NODE;

