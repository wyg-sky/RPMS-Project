
/**
 * <p>Title: </p>
 * <p>Description: 设计器总入口</p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function Flow(ui) {
    this.base = Frame;
    this.base(ui);
    this.ui.style.overflow = "auto";

    //
    this.stateMonitor = new StateMonitor();
    this.flowToolBar = new FlowToolBar(this);
    this.add(this.flowToolBar);
    this.stateMonitor.addObserver(this.flowToolBar);

    //
    this.flowViewer = new FlowViewer();
    this.flowViewer.setWidth("100%");
    this.flowViewer.setHeight("100%");
    this.viewerRow = this.add(this.flowViewer);

    //
    this.tableViewer = new FlowTableViewer();
    this.tableViewer.setWidth("100%");
    this.tableViewer.setHeight("100%");
    this.tableViewerRow = this.add(this.tableViewer);
    this.tableViewer.setDisplay("none");

    //
    this.statusPanel = new StatusLabel();
    //欢迎使用ItsmFlow工作流定制系统 addprocess
    //this.statusPanel.setText("\u6b22\u8fce\u4f7f\u7528ItsmFlow\u5de5\u4f5c\u6d41\u5b9a\u5236\u7cfb\u7edf");
    this.statusPanel.setText("\u6B22\u8FCE\u4F7F\u7528DHCC\u670D\u52A1\u53F0\u5DE5\u4F5C\u6D41\u5B9A\u5236\u7CFB\u7EDF");
    this.add(this.statusPanel);

	//
    this.flowToolBar.getNodeButtonGroup().addObserver(this);
    this.flowToolBar.getViewerPatternButtonGroup().addObserver(this);

    //
    this.flowWrapper = new FlowWrapper(this.flowViewer, null, this.stateMonitor, this.statusPanel);
    this.tableViewer.setModel(this.flowWrapper.getModel());
}
Flow.prototype = new Frame();

//
Flow.prototype.getToolBar = function () {
    return this.flowToolBar;
};
Flow.prototype.getStatusLabel = function () {
    return this.statusPanel;
};
Flow.prototype.getWrapper = function () {
    return this.flowWrapper;
};
Flow.prototype.getTableViewer = function () {
    return this.tableViewer;
};
Flow.prototype.setProcessList = function (processList) {
    this.processList = processList;
};
Flow.prototype.getProcessList = function () {
    return this.processList;
};

//
Flow.prototype.update = function (observable, arg) {
    if (arg == ButtonGroup.PRESSED_CHANGED) {
        if (observable == this.getToolBar().getNodeButtonGroup()) {
            var pressedButtonModel = this.getToolBar().getNodeButtonGroup().getPressedButtonModel();
            var modelName = pressedButtonModel.name;
            switch (modelName) {
              case FlowToolBar.BUTTON_NAME_SELECT:
                this.stateMonitor.setState(StateMonitor.SELECT);
                //您当前处于选择状态，点击节点即可选择节点，按下ctrl键可以复选
                this.statusPanel.setText("\u60a8\u5f53\u524d\u5904\u4e8e\u9009\u62e9\u72b6\u6001\uff0c\u70b9\u51fb\u8282\u70b9\u5373\u53ef\u9009\u62e9\u8282\u70b9\uff0c\u6309\u4e0bctrl\u952e\u53ef\u4ee5\u590d\u9009");
                break;
              case FlowToolBar.BUTTON_NAME_START_NODE:
                this.stateMonitor.setState(StateMonitor.START_NODE);
                //您当前处于添加开始节点状态，在可视化编辑区点击鼠标添加开始节点
                this.statusPanel.setText("\u60a8\u5f53\u524d\u5904\u4e8e\u6dfb\u52a0\u5f00\u59cb\u8282\u70b9\u72b6\u6001\uff0c\u5728\u53ef\u89c6\u5316\u7f16\u8f91\u533a\u70b9\u51fb\u9f20\u6807\u6dfb\u52a0\u5f00\u59cb\u8282\u70b9");
                break;
              case FlowToolBar.BUTTON_NAME_END_NODE:
                this.stateMonitor.setState(StateMonitor.END_NODE);
                //您当前处于添加结束节点状态，在可视化编辑区点击鼠标添加结束节点
                this.statusPanel.setText("\u60a8\u5f53\u524d\u5904\u4e8e\u6dfb\u52a0\u7ed3\u675f\u8282\u70b9\u72b6\u6001\uff0c\u5728\u53ef\u89c6\u5316\u7f16\u8f91\u533a\u70b9\u51fb\u9f20\u6807\u6dfb\u52a0\u7ed3\u675f\u8282\u70b9");
                break;
              case FlowToolBar.BUTTON_NAME_FORK_NODE:
                this.stateMonitor.setState(StateMonitor.FORK_NODE);
                //您当前处于添加分支节点状态，在可视化编辑区点击鼠标添加分支节点
                this.statusPanel.setText("\u60a8\u5f53\u524d\u5904\u4e8e\u6dfb\u52a0\u5206\u652f\u8282\u70b9\u72b6\u6001\uff0c\u5728\u53ef\u89c6\u5316\u7f16\u8f91\u533a\u70b9\u51fb\u9f20\u6807\u6dfb\u52a0\u5206\u652f\u8282\u70b9");
                break;
              case FlowToolBar.BUTTON_NAME_JOIN_NODE:
                this.stateMonitor.setState(StateMonitor.JOIN_NODE);
                //您当前处于添加汇聚节点状态，在可视化编辑区点击鼠标添加汇聚节点
                this.statusPanel.setText("\u60a8\u5f53\u524d\u5904\u4e8e\u6dfb\u52a0\u6c47\u805a\u8282\u70b9\u72b6\u6001\uff0c\u5728\u53ef\u89c6\u5316\u7f16\u8f91\u533a\u70b9\u51fb\u9f20\u6807\u6dfb\u52a0\u6c47\u805a\u8282\u70b9");
                break;
              case FlowToolBar.BUTTON_NAME_NODE:
                this.stateMonitor.setState(StateMonitor.NODE);
                //您当前处于添加任务节点状态，在可视化编辑区点击鼠标添加任务节点
                this.statusPanel.setText("\u60a8\u5f53\u524d\u5904\u4e8e\u6dfb\u52a0\u4efb\u52a1\u8282\u70b9\u72b6\u6001\uff0c\u5728\u53ef\u89c6\u5316\u7f16\u8f91\u533a\u70b9\u51fb\u9f20\u6807\u6dfb\u52a0\u4efb\u52a1\u8282\u70b9");
                break;
              case FlowToolBar.BUTTON_NAME_DECISION_NODE:
                this.stateMonitor.setState(StateMonitor.DECISION_NODE);
                //您当前处于添加任务节点状态，在可视化编辑区点击鼠标添加任务节点
                this.statusPanel.setText("\u60a8\u5f53\u524d\u5904\u4e8e\u6dfb\u52a0\u5224\u65AD\u8282\u70b9\u72b6\u6001\uff0c\u5728\u53ef\u89c6\u5316\u7f16\u8f91\u533a\u70b9\u51fb\u9f20\u6807\u6dfb\u52a0\u4efb\u52a1\u8282\u70b9");
                break;
              case FlowToolBar.BUTTON_NAME_TRANSITION:
                this.stateMonitor.setState(StateMonitor.TRANSITION);
                //您当前处于添加连接状态，在节点上按下鼠标，托拽到另外一个节点，两个节点建立连接
                this.statusPanel.setText("\u60a8\u5f53\u524d\u5904\u4e8e\u6dfb\u52a0\u8fde\u63a5\u72b6\u6001\uff0c\u5728\u8282\u70b9\u4e0a\u6309\u4e0b\u9f20\u6807\uff0c\u6258\u62fd\u5230\u53e6\u5916\u4e00\u4e2a\u8282\u70b9\uff0c\u4e24\u4e2a\u8282\u70b9\u5efa\u7acb\u8fde\u63a5");
                break;
              default:
                break;
            }
            return;
        }

        //
        if (observable == this.getToolBar().getViewerPatternButtonGroup()) {
            var pressedButtonModel = this.getToolBar().getViewerPatternButtonGroup().getPressedButtonModel();
            var modelName = pressedButtonModel.name;
            switch (modelName) {
              case FlowToolBar.BUTTON_NAME_DESIGN:
                this.flowViewer.setDisplay("");
                this.viewerRow.style.display = "";
                this.flowViewer.setHeight("100%");
                this.viewerRow.height = "100%";
                this.tableViewer.setDisplay("none");
                this.tableViewerRow.style.display = "none";
                this.getToolBar().setDesignButtonEnable(true);
                //您当前处于设计视图，该视图是可视化编辑状态
                this.getStatusLabel().setText("\u60a8\u5f53\u524d\u5904\u4e8e\u8bbe\u8ba1\u89c6\u56fe\uff0c\u8be5\u89c6\u56fe\u662f\u53ef\u89c6\u5316\u7f16\u8f91\u72b6\u6001");
                break;
              case FlowToolBar.BUTTON_NAME_TABLE:
                this.flowViewer.setDisplay("none");
                this.viewerRow.style.display = "none";
                this.tableViewer.setDisplay("");
                this.tableViewerRow.style.display = "";
                this.tableViewer.setHeight("100%");
                this.tableViewerRow.height = "100%";
                this.getToolBar().setDesignButtonEnable(false);
                //您当前处于表格视图，该视图是工作流程图数据的表格浏览状态
                this.getStatusLabel().setText("\u60a8\u5f53\u524d\u5904\u4e8e\u8868\u683c\u89c6\u56fe\uff0c\u8be5\u89c6\u56fe\u662f\u5de5\u4f5c\u6d41\u7a0b\u56fe\u6570\u636e\u7684\u8868\u683c\u6d4f\u89c8\u72b6\u6001");
                break;
              case FlowToolBar.BUTTON_NAME_MIX:
                this.flowViewer.setDisplay("");
                this.viewerRow.style.display = "";
                this.flowViewer.setHeight("100%");
                this.viewerRow.height = "100%";
                this.tableViewer.setDisplay("");
                this.tableViewerRow.style.display = "";
                this.tableViewer.setHeight("200px");
                this.tableViewerRow.height = "200px";
                this.getToolBar().setDesignButtonEnable(true);
                //您当前处于混合视图，该视图同时处于可视化编辑状态和数据表格浏览状态
                this.getStatusLabel().setText("\u60a8\u5f53\u524d\u5904\u4e8e\u6df7\u5408\u89c6\u56fe\uff0c\u8be5\u89c6\u56fe\u540c\u65f6\u5904\u4e8e\u53ef\u89c6\u5316\u7f16\u8f91\u72b6\u6001\u548c\u6570\u636e\u8868\u683c\u6d4f\u89c8\u72b6\u6001");
                break;
              default:
                break;
            }
            return;
        }

        //
        return;
    }
};

