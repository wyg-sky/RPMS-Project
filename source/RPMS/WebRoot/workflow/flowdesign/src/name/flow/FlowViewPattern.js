
/**
 * <p>Title:  </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function FlowViewPattern(ui) {
    this.base = Frame;
    this.base(ui);
    this.ui.style.overflow = "auto";
    
    //
    //lingzj this.flowToolBar = new itsmFlowViewerToolBar();
    //lingzj this.add(this.flowToolBar);
	this.stateMonitor = new StateMonitor();
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

    //lingzj 去掉下方工具条
    //this.statusPanel = new StatusLabel();
    //欢迎使用ItsmFlow工作流定制系统 updateprocess
    //this.statusPanel.setText("\u6b22\u8fce\u4f7f\u7528ItsmFlow\u5de5\u4f5c\u6d41\u5b9a\u5236\u7cfb\u7edf");
    //this.add(this.statusPanel);
	//:~
	//
    //lingzj this.flowToolBar.getViewerPatternButtonGroup().addObserver(this);

    //
    var model = new FlowModel();
    model.setEditable(true);
    this.flowWrapper = new FlowWrapper(this.flowViewer, model, this.stateMonitor, this.statusPanel);
    this.tableViewer.setModel(this.flowWrapper.getModel());
}
FlowViewPattern.prototype = new Frame();
FlowViewPattern.prototype.getToolBar = function () {
    //lingzj return this.flowToolBar;
    return null;
};
FlowViewPattern.prototype.getStatusLabel = function () {
    return this.statusPanel;
};
FlowViewPattern.prototype.getWrapper = function () {
    return this.flowWrapper;
};
FlowViewPattern.prototype.getTableViewer = function () {
    return this.tableViewer;
};

//
FlowViewPattern.prototype.update = function (observable, arg) {
    if (arg == ButtonGroup.PRESSED_CHANGED) {
        //
        if (observable == this.getToolBar().getViewerPatternButtonGroup()) {
            var pressedButtonModel = this.getToolBar().getViewerPatternButtonGroup().getPressedButtonModel();
            var modelName = pressedButtonModel.name;
            switch (modelName) {
              case itsmFlowViewerToolBar.BUTTON_NAME_DESIGN:
                this.flowViewer.setDisplay("");
                this.viewerRow.style.display = "";
                this.flowViewer.setHeight("100%");
                this.viewerRow.height = "100%";
                this.tableViewer.setDisplay("none");
                this.tableViewerRow.style.display = "none";
                this.getStatusLabel().setText("\u8bbe\u8ba1\u6a21\u5f0f");
                break;
              case itsmFlowViewerToolBar.BUTTON_NAME_TABLE:
                this.flowViewer.setDisplay("none");
                this.viewerRow.style.display = "none";
                this.tableViewer.setDisplay("");
                this.tableViewerRow.style.display = "";
                this.tableViewer.setHeight("100%");
                this.tableViewerRow.height = "100%";
                this.getStatusLabel().setText("\u8868\u683c\u6d4f\u89c8\u6a21\u5f0f");
                break;
              case itsmFlowViewerToolBar.BUTTON_NAME_MIX:
                this.flowViewer.setDisplay("");
                this.viewerRow.style.display = "";
                this.flowViewer.setHeight("100%");
                this.viewerRow.height = "100%";
                this.tableViewer.setDisplay("");
                this.tableViewerRow.style.display = "";
                this.tableViewer.setHeight("200px");
                this.tableViewerRow.height = "200px";
                this.getStatusLabel().setText("\u8bbe\u8ba1\u6a21\u5f0f\u3001\u8868\u683c\u6a21\u5f0f\u540c\u65f6\u663e\u793a");
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

//
function itsmFlowViewerToolBar() {
    this.base = ToolBar;
    this.base();

    //
    this.addSeparator();

    //
    this.viewerPatternButtonGroup = new ButtonGroup();

    //design
    var designButton = new ToggleButton("", "\u8bbe\u8ba1", true);
    this.add(designButton);
    this.viewerPatternButtonGroup.add(designButton);
    designButton.getModel().name = itsmFlowViewerToolBar.BUTTON_NAME_DESIGN;

    //table
    var tableButton = new ToggleButton("", "\u8868\u683c", true);
    this.add(tableButton);
    this.viewerPatternButtonGroup.add(tableButton);
    tableButton.getModel().name = itsmFlowViewerToolBar.BUTTON_NAME_TABLE;

    //混合显示
    var mixButton = new ToggleButton("", "\u6df7\u5408\u663e\u793a", true);
    this.add(mixButton);
    this.viewerPatternButtonGroup.add(mixButton);
    mixButton.getModel().name = itsmFlowViewerToolBar.BUTTON_NAME_MIX;
}
itsmFlowViewerToolBar.prototype = new ToolBar();
itsmFlowViewerToolBar.prototype.setButtonEnable = function (b) {
    var viewPatternbuttons = this.viewerPatternButtonGroup.getButtons();
    for (var i = 0; i < viewPatternbuttons.size(); i++) {
        viewPatternbuttons.get(i).getModel().setEnabled(b);
    }
};
itsmFlowViewerToolBar.prototype.getViewerPatternButtonGroup = function () {
    return this.viewerPatternButtonGroup;
};

//
itsmFlowViewerToolBar.BUTTON_NAME_DESIGN = "BUTTON_NAME_DESIGN";
itsmFlowViewerToolBar.BUTTON_NAME_TABLE = "BUTTON_NAME_TABLE";
itsmFlowViewerToolBar.BUTTON_NAME_MIX = "BUTTON_NAME_MIX";

