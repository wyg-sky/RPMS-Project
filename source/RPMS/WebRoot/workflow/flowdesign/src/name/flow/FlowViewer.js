
/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function FlowViewer() {
    this.base = ScrollPanel;
    this.base();

    //
    this.setClassName("NAME_ITSM_UI_FONT NAME_ITSMFLOW_VIEWER");
}
FlowViewer.prototype = new ScrollPanel();

