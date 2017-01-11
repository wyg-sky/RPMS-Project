
/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function FlowXMLViewer() {
    this.base = ScrollPanel;
    this.base();

    //
    this.setClassName("NAME_ITSM_UI_FONT NAME_ITSMFLOW_XML_VIEWER");

    //
    this.pre = Toolkit.newElement("pre");
    this.getUI().appendChild(this.pre);
}
FlowXMLViewer.prototype = new ScrollPanel();
FlowXMLViewer.prototype.refresh = function (model) {
    this.pre.innerText = "";

	//
    var doc = FlowModelConverter.convertModelToXML(model);

    //
    this.pre.innerText = doc.xml;
};

