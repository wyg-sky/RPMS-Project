
/**
 * <p>Title:  </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function StatusLabel(ui) {
    this.base = Label;
    this.base(ui);
    this.setClassName("NAME_ITSM_UI_FONT NAME_ITSM_UI_LABEL NAME_ITSMFLOW_STATUS_LABEL");
}
StatusLabel.prototype = new Label();
StatusLabel.prototype.toString = function () {
    return "[Component,Panel,Label,StatusLabel]";
};

//
StatusLabel.prototype.setText = function (text) {
    this.getUI().innerText = text;
};

