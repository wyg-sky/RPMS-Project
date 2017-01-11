
/**
 * <p>Title: ScrollPanel</p>
 * <p>Description: 卷轴面板</p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function ScrollPanel(ui) {
    this.base = Panel;
    this.base(ui);
    this.setClassName("NAME_ITSM_UI_FONT NAME_ITSM_UI_SCROLL_PANEL");
}
ScrollPanel.prototype = new Panel();
ScrollPanel.prototype.toString = function () {
    return "[Component,Panel,ScrollPanel]";
};

