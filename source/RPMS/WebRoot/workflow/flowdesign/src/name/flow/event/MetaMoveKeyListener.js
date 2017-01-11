
//
/**
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function MetaMoveKeyListener(wrapper) {
    this.wrapper = wrapper;
    this.step = FlowWorkSpace.META_NODE_MOVED_STEP;
    this.num = 0;
    this.offset = 1;
}
MetaMoveKeyListener.prototype = new KeyListener();
MetaMoveKeyListener.prototype.onKeyUp = function (e) {
    this.step = FlowWorkSpace.META_NODE_MOVED_STEP;
    this.offset = 1;
    this.num = 0;

    //
    var charCode = (e.charCode) ? e.charCode : e.keyCode;
    switch (charCode) {
      case 46://delete
      	//LINGZJ去掉键盘delete响应事件
        this.wrapper.getModel().deleteSelected();
        break;
      default:
        break;
    }
};
MetaMoveKeyListener.prototype.onKeyDown = function (e) {
    var state = this.wrapper.getStateMonitor().getState();
    if (state != StateMonitor.SELECT) {
        return;
    }

    //
    this.num++;
    if (this.num > 4) {
        this.offset++;
        this.step += this.offset;
        this.num = 0;
    }

    //
    var metaNodeModels = this.wrapper.getModel().getSelectedMetaNodeModels();
    var charCode = (e.charCode) ? e.charCode : e.keyCode;
    switch (charCode) {
      case 38://up
        FlowModel.moveMetaNodeModelBy(metaNodeModels, 0, -this.step);
        break;
      case 40://down
        FlowModel.moveMetaNodeModelBy(metaNodeModels, 0, this.step);
        break;
      case 37://left
        FlowModel.moveMetaNodeModelBy(metaNodeModels, -this.step, 0);
        break;
      case 39://right
        FlowModel.moveMetaNodeModelBy(metaNodeModels, this.step, 0);
        break;
      default:
        break;
    }
};

