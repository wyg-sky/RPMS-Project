
/**
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) com.dhcc 2009</p>
 * @author hx
 */
var detailwin;
function RetangleNodeMouseLister(retangle, wrapper) {
    this.retangle = retangle;
    this.wrapper = wrapper;
}
RetangleNodeMouseLister.prototype = new MouseListener();
RetangleNodeMouseLister.prototype.onMouseDown = function (e) {
    this.moved = false;
    if (e.button != MouseEvent.BUTTON_LEFT) {
        return;
    }
    this.down = true;

    //
    var state = this.wrapper.getStateMonitor().getState();
    switch (state) {
      case StateMonitor.SELECT:
        var selectedMetaNodeModels = this.wrapper.getModel().getSelectedMetaNodeModels();
        var selectedTransitionModels = this.wrapper.getModel().getSelectedTransitionModels();
        if ((selectedTransitionModels.size() <= 1) && (selectedTransitionModels.size() <= 1) && (!e.ctrlKey)) {
            this.wrapper.getModel().clearSelectedMetaNodeModels();
            this.wrapper.getModel().clearSelectedRetangles();
            this.wrapper.getModel().addSelectedRetangle(this.retangle);
            //双击节点，可以编辑节点名称；鼠标在节点右下角的点上托拽可以编辑节点尺寸
            //this.wrapper.setStatusInfo("右侧的信息窗口展示该配置的相关信息；鼠标在节点右下角的点上拖拽可以编辑节点尺寸");
        }
        break;
      case StateMonitor.TRANSITION:
        break;
    }
};
RetangleNodeMouseLister.prototype.onMouseOver = function (e) {
    var state = this.wrapper.getStateMonitor().getState();
    switch (state) {
      case StateMonitor.SELECT:
        this.retangle.img.className = "IMG_SELECTED";
        break;
      case StateMonitor.TRANSITION:
        break;
    }
}
var img;
RetangleNodeMouseLister.prototype.onMouseOut = function (e) {
    var state = this.wrapper.getStateMonitor().getState();
    switch (state) {
      case StateMonitor.TRANSITION:
        break;
      case StateMonitor.SELECT:
        //EXT
        img = this.retangle.img;
        var n = setTimeout("setOutColor()",500);
        //this.retangle.img.className = "IMG";
        break;
    }
};
function setOutColor(){
    img.className = "IMG";
}
RetangleNodeMouseLister.prototype.onMouseMove = function (e) {
    if (e.button != MouseEvent.BUTTON_LEFT) {
        return;
    }
    if (this.down) {
        this.moved = true;
    }
};
RetangleNodeMouseLister.prototype.onMouseUp = function (e) {
    this.down = false;
    if (e.button != MouseEvent.BUTTON_LEFT) {
        return;
    }

    //
    var state = this.wrapper.getStateMonitor().getState();
    switch (state) {
      case StateMonitor.SELECT:
        if (this.moved) {
            return;
        }
        if (e.ctrlKey) {
            if (this.retangle.isSelected()) {
                this.wrapper.getModel().removeSelectedRetangle(this.retangle);
            } else {
                this.wrapper.getModel().addSelectedRetangle(this.retangle);
            }
            //您正在多选节点，按下键盘的方向键，或者托拽鼠标，可以移动选择节点的位置;按下删除按钮或者按下Delete键盘按键，可以删除选择的元
            this.wrapper.setStatusInfo("\u60a8\u6b63\u5728\u591a\u9009\u8282\u70b9\uff0c\u6309\u4e0b\u952e\u76d8\u7684\u65b9\u5411\u952e\uff0c\u6216\u8005\u6258\u62fd\u9f20\u6807\uff0c\u53ef\u4ee5\u79fb\u52a8\u9009\u62e9\u8282\u70b9\u7684\u4f4d\u7f6e;\u6309\u4e0b\u5220\u9664\u6309\u94ae\u6216\u8005\u6309\u4e0bDelete\u952e\u76d8\u6309\u952e\uff0c\u53ef\u4ee5\u5220\u9664\u9009\u62e9\u7684\u5143");
        } else {
			//hx
            //this.wrapper.getModel().clearSelectedMetaNodeModels();
            //this.wrapper.getModel().addSelectedRetangle(this.retangle);
            //双击节点，可以编辑节点名称；鼠标在节点右下角的点上托拽可以编辑节点尺寸
            //this.wrapper.setStatusInfo("右侧的信息窗口展示该配置的相关信息；鼠标在节点右下角的点上拖拽可以编辑节点尺寸");
        }
        break;
    }
};

