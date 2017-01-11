
/**
 * <p>Title:  </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function GeometryCanvas() {
    this.base = Panel;
    this.base(Toolkit.newElement("v:group"));
    this.setPosition("relative");
}
GeometryCanvas.prototype = new Panel();

