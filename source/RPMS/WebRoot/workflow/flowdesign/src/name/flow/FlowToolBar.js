
/**
 * <p>Title: 工具栏</p>
 * <p>Description: 流程设计工具栏</p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function FlowToolBar(flow) {
    this.base = ToolBar;
    this.base();

    //
    this.flow = flow;

    //
    this.addSeparator();

    //
    //this.saveButton = new Button(FlowWorkSpace.ITSM_FLOW_PATH + "images/save.gif", "\u4fdd\u5b58");
    this.saveButton = new Button("../styles/default/images/icons/16_16/save.gif", "\u4fdd\u5b58");
    //保存
    this.saveButton.setToolTipText("\u4fdd\u5b58");
    this.saveButton.addActionListener(new SaveActionListener(this.flow));
    this.add(this.saveButton);
    

    //
    this.nodeButtonGroup = new ButtonGroup();

    //
    this.addSeparator();

    //
    this.selectButton = new ToggleButton(FlowWorkSpace.ITSM_FLOW_PATH + "images/select.gif", "", true);
    //选择
    this.selectButton.setToolTipText("\u9009\u62e9");
    this.add(this.selectButton);
    this.nodeButtonGroup.add(this.selectButton);
    this.selectButton.getModel().name = FlowToolBar.BUTTON_NAME_SELECT;

    //
    this.addSeparator();

    //
    this.startButton = new ToggleButton("../styles/default/images/icons/16_16/start.png");//FlowWorkSpace.ITSM_FLOW_PATH + "images/start.gif");
    //开始节点
    this.startButton.setToolTipText("\u5f00\u59cb\u8282\u70b9");
    this.add(this.startButton);
    this.nodeButtonGroup.add(this.startButton);
    this.startButton.getModel().name = FlowToolBar.BUTTON_NAME_START_NODE;

    //
    //this.endButton = new ToggleButton(FlowWorkSpace.ITSM_FLOW_PATH + "images/end.gif", "");
    this.endButton = new ToggleButton("../styles/default/images/icons/16_16/end.png", "");
    //结束节点
    this.endButton.setToolTipText("\u7ed3\u675f\u8282\u70b9");
    this.add(this.endButton);
    this.nodeButtonGroup.add(this.endButton);
    this.endButton.getModel().name = FlowToolBar.BUTTON_NAME_END_NODE;

    //
    this.addSeparator();

    //
    //this.nodeButton = new ToggleButton(FlowWorkSpace.ITSM_FLOW_PATH + "images/node.gif");
    this.nodeButton = new ToggleButton("../styles/default/images/icons/16_16/task-node.png");
    //任务节点
    this.nodeButton.setToolTipText("\u4efb\u52a1\u8282\u70b9");
    this.add(this.nodeButton);
    this.nodeButtonGroup.add(this.nodeButton);
    this.nodeButton.getModel().name = FlowToolBar.BUTTON_NAME_NODE;
    
    
	//this.decisionButton = new ToggleButton(FlowWorkSpace.ITSM_FLOW_PATH + "images/decision.gif");
	this.decisionButton = new ToggleButton("../styles/default/images/icons/16_16/decision-node.png");
    //判断节点
    this.decisionButton.setToolTipText("\u5224\u65AD\u8282\u70b9");
    this.add(this.decisionButton);
    this.nodeButtonGroup.add(this.decisionButton);
    this.decisionButton.getModel().name = FlowToolBar.BUTTON_NAME_DECISION_NODE;
    //
    //this.forkButton = new ToggleButton(FlowWorkSpace.ITSM_FLOW_PATH + "images/fork.gif");
    this.forkButton = new ToggleButton("../styles/default/images/icons/16_16/fork-node.png");
    //分支节点
    this.forkButton.setToolTipText("\u5206\u652f\u8282\u70b9");
    this.add(this.forkButton);
    this.nodeButtonGroup.add(this.forkButton);
    this.forkButton.getModel().name = FlowToolBar.BUTTON_NAME_FORK_NODE;

    //
    //this.joinButton = new ToggleButton(FlowWorkSpace.ITSM_FLOW_PATH + "images/join.gif");
    this.joinButton = new ToggleButton("../styles/default/images/icons/16_16/join-node.png");
    //汇聚节点
    this.joinButton.setToolTipText("\u6c47\u805a\u8282\u70b9");
    this.add(this.joinButton);
    this.nodeButtonGroup.add(this.joinButton);
    this.joinButton.getModel().name = FlowToolBar.BUTTON_NAME_JOIN_NODE;

    //
    this.addSeparator();

    //
    //this.transitionButton = new ToggleButton(FlowWorkSpace.ITSM_FLOW_PATH + "images/transition.gif");
    this.transitionButton = new ToggleButton("../styles/default/images/icons/16_16/line.png");
    //连接
    this.transitionButton.setToolTipText("\u8fde\u63a5");
    this.add(this.transitionButton);
    this.nodeButtonGroup.add(this.transitionButton);
    this.transitionButton.getModel().name = FlowToolBar.BUTTON_NAME_TRANSITION;

    // lingzj 去掉删除按钮
    this.addSeparator();

    //
    //this.deleteButton = new Button(FlowWorkSpace.ITSM_FLOW_PATH + "images/delete.gif");
    this.deleteButton = new Button("../styles/default/images/icons/16_16/delete.gif");
    //删除
    this.deleteButton.setToolTipText("\u5220\u9664");
    this.deleteButton.addActionListener(new DeleteMetaActionListener(this.flow));
    this.add(this.deleteButton);
    //:~
//lingzj 不显示设计视图，表格视图，混合视图和帮助
    //
    //lingzj this.addSeparator();

    //
    this.viewerPatternButtonGroup = new ButtonGroup();
	
    //design
    var designButton = new ToggleButton("", "\u8bbe\u8ba1", true);
    //设计视图
    designButton.setToolTipText("\u8bbe\u8ba1\u89c6\u56fe");
    //lingzj this.add(designButton);
    this.viewerPatternButtonGroup.add(designButton);
    designButton.getModel().name = FlowToolBar.BUTTON_NAME_DESIGN;

    //table
    var tableButton = new ToggleButton("", "\u8868\u683c", true);
    //表格视图
    tableButton.setToolTipText("\u8868\u683c\u89c6\u56fe");
    //lingzj this.add(tableButton);
    this.viewerPatternButtonGroup.add(tableButton);
    tableButton.getModel().name = FlowToolBar.BUTTON_NAME_TABLE;

    //混合显示
    var mixButton = new ToggleButton("", "\u6df7\u5408\u663e\u793a", true);
    //混合视图
    mixButton.setToolTipText("\u6df7\u5408\u89c6\u56fe");
    //lingzj this.add(mixButton);
    this.viewerPatternButtonGroup.add(mixButton);
    mixButton.getModel().name = FlowToolBar.BUTTON_NAME_MIX;

    //
    //lingzj this.addSeparator();

    //
    var helpButton = new Button(FlowWorkSpace.ITSM_FLOW_PATH + "images/help.gif", "\u5e2e\u52a9");
    helpButton.addActionListener(new HelpActionListener());
    //帮助
    helpButton.setToolTipText("\u5e2e\u52a9");
    //lingzj this.add(helpButton);
}
FlowToolBar.prototype = new ToolBar();
FlowToolBar.prototype.getNodeButtonGroup = function () {
    return this.nodeButtonGroup;
};
FlowToolBar.prototype.setDesignButtonEnable = function (b) {
    var buttons = this.nodeButtonGroup.getButtons();
    for (var i = 0; i < buttons.size(); i++) {
        buttons.get(i).getModel().setEnabled(b);
    }
    this.deleteButton.getModel().setEnabled(b);
};
FlowToolBar.prototype.setButtonEnable = function (b) {
    var buttons = this.nodeButtonGroup.getButtons();
    for (var i = 0; i < buttons.size(); i++) {
        buttons.get(i).getModel().setEnabled(b);
    }
    var viewPatternbuttons = this.viewerPatternButtonGroup.getButtons();
    for (var i = 0; i < viewPatternbuttons.size(); i++) {
        viewPatternbuttons.get(i).getModel().setEnabled(b);
    }
    this.deleteButton.getModel().setEnabled(b);
    this.saveButton.getModel().setEnabled(b);
};
FlowToolBar.prototype.getViewerPatternButtonGroup = function () {
    return this.viewerPatternButtonGroup;
};

//
FlowToolBar.prototype.update = function (observable, arg) {
    if (arg instanceof Array) {
        if (arg.size() == 2) {
            var property = arg[0];
            var state = arg[1];
            if (property == StateMonitor.OPERATION_STATE_RESET) {
                switch (state) {
                  case StateMonitor.SELECT:
                    this.selectButton.getModel().setPressed(true);
                    break;
                  case StateMonitor.NODE:
                    this.nodeButton.getModel().setPressed(true);
                    break;
                   case StateMonitor.DECISION_NODE:
                    this.decisionButton.getModel().setPressed(true);
                    break;
                  case StateMonitor.FORK_NODE:
                    this.forkNodeButton.getModel().setPressed(true);
                    break;
                  case StateMonitor.JOIN_NODE:
                    this.joinNode.getModel().setPressed(true);
                    break;
                  case StateMonitor.START_NODE:
                    this.startNodeButton.getModel().setPressed(true);
                    break;
                  case StateMonitor.END_NODE:
                    this.endNodeButton.getModel().setPressed(true);
                    break;
                  case StateMonitor.TRANSITION:
                    this.transitionButton.getModel().setPressed(true);
                    break;
                  default:
                    break;
                }
            }
        }
    }
};

//
FlowToolBar.BUTTON_NAME_SELECT = "BUTTON_NAME_SELECT";
FlowToolBar.BUTTON_NAME_START_NODE = "BUTTON_NAME_START_NODE";
FlowToolBar.BUTTON_NAME_END_NODE = "BUTTON_NAME_END_NODE";
FlowToolBar.BUTTON_NAME_FORK_NODE = "BUTTON_NAME_FORK_NODE";
FlowToolBar.BUTTON_NAME_JOIN_NODE = "BUTTON_NAME_JOIN_NODE";
FlowToolBar.BUTTON_NAME_NODE = "BUTTON_NAME_NODE";
FlowToolBar.BUTTON_NAME_DECISION_NODE = "BUTTON_NAME_DECISION_NODE";
FlowToolBar.BUTTON_NAME_TRANSITION = "BUTTON_NAME_TRANSITION";

//
FlowToolBar.BUTTON_NAME_DESIGN = "BUTTON_NAME_DESIGN";
FlowToolBar.BUTTON_NAME_TABLE = "BUTTON_NAME_TABLE";
FlowToolBar.BUTTON_NAME_MIX = "BUTTON_NAME_MIX";

