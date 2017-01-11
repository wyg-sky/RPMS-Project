
/**
 * <p>Title: ScrollPanel</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function Label(ui) {
    this.base = Panel;
    this.base(ui);
    this.setClassName("NAME_ITSM_UI_FONT NAME_ITSM_UI_LABEL");
}
Label.prototype = new Panel();
Label.prototype.toString = function () {
    return "[Component,Panel,Label]";
};

