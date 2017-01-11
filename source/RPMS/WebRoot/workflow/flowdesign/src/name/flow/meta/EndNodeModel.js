
/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function EndNodeModel() {
    this.base = MetaNodeModel;
    this.base();

    //
    this.FROMS_MAX = 0;
    //LINGZJ加入对进入结束节点的连线数目的限制
    this.TOS_MAX = 200;
    
    
    this.setText("\u7ED3\u675F");//EndNode\u8282\u70B9

    //
    this.setSize(new Dimension(80, 30));
}
EndNodeModel.prototype = new MetaNodeModel();

//
EndNodeModel.prototype.toString = function () {
	//结束
    return "[\u7ed3\u675f:" + this.getText() + "]";
};

//
EndNodeModel.prototype.type = MetaNodeModel.TYPE_END_NODE;

EndNodeModel.prototype.elType = MetaNodeModel.EL_TYPE_END_NODE;

