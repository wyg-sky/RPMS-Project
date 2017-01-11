
/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function StartNodeModel() {
    this.base = MetaNodeModel;
    this.base();

    //
    this.TOS_MAX = 0;
    //LINGZJ加入从开始节点出去的连线数目的限制
    this.FROMS_MAX = 1;
    //LINGZJ
    this.setText("\u5F00\u59CB");//StartNode

    //
    this.setSize(new Dimension(80, 30));
}
StartNodeModel.prototype = new MetaNodeModel();

//
StartNodeModel.prototype.toString = function () {
	//开始
    return "[\u5f00\u59cb:" + this.getText() + "]";
};

//
StartNodeModel.prototype.type = MetaNodeModel.TYPE_START_NODE;

StartNodeModel.prototype.elType = MetaNodeModel.EL_TYPE_START_NODE;

