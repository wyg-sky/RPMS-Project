
/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function DeleteMetaActionListener(flow) {
    this.flow = flow;
}
DeleteMetaActionListener.prototype.actionPerformed = function (obj) {
    var flowModel = this.flow.getWrapper().getModel();
    
    flowModel.deleteSelected();
};

