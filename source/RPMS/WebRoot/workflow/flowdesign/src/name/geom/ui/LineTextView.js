
/**
 * <p>Title:  </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function LineTextView() {
    //this.base = LineView;
    this.base = Component;
    this.base(Toolkit.newElement("v:line"));
    //this.base();
    this.setPosition("absolute");
    this.setLeft("0px");
    this.setTop("0px");

    //
    this.path = Toolkit.newElement("<v:path textpathok='true'/>");
    this.add(this.path);

    //
    this.textPath = Toolkit.newElement("<v:textpath on='true' style='font-size:15' string=''/>");
    this.add(this.textPath);
}
LineTextView.prototype = new LineView();

//
LineTextView.prototype.setText = function (text) {
    text = text ? text : "";
    this.textPath.string = text;
};
LineTextView.prototype.getText = function () {
    return this.textPath.string;
};

//
LineTextView.prototype.setFrom = function (point) {
    if (!point) {
        return;
    }
    this.fromPoint = point;
    this._updateDirection();
};
LineTextView.prototype.setTo = function (point) {
    if (!point) {
        return;
    }
    this.toPoint = point;
    this._updateDirection();
};
LineTextView.prototype._updateDirection = function () {
	//alert('bbbb');
    if (!this.fromPoint) {
        return;
    }
    if (!this.toPoint) {
        return;
    }
	//alert('ccc');
	//this.fromPoint.setX('248.33333333333337')
	//this.fromPoint.setY('118')
	//this.toPoint.setX('148.66666666666663')
	//this.toPoint.setY('170')
    //
    //alert(this.fromPoint.getX()+'=='+this.fromPoint.getY()+'=='+this.toPoint.getX()+'=='+this.toPoint.getY());
    if (this.fromPoint.getX() == this.toPoint.getX()) {
        this.fromPoint.setX(this.fromPoint.getX() - 1);
    }
    if (this.fromPoint.getY() == this.toPoint.getY()) {
        this.fromPoint.setY(this.fromPoint.getY() - 1);
    }
	//alert(this.fromPoint.getX()+'--'+this.fromPoint.getY()+'--'+this.toPoint.getX()+'--'+this.toPoint.getY());
    //
    var absX = Math.abs(this.toPoint.getX() - this.fromPoint.getX());
    var absY = Math.abs(this.toPoint.getY() - this.fromPoint.getY());
    var absL = Math.sqrt(absX*absX+absY*absY);
    var xx = absY*10/absL; /// (absX * absY);
    var yy = absX*10/absL; /// (absX * absY);
    if (this.fromPoint.getX() > this.toPoint.getX()) {
    	if(this.fromPoint.getY()>this.toPoint.getY()){
	        this.getUI().from = (this.toPoint.getX()+xx) + "," + (this.toPoint.getY()-yy);
	        this.getUI().to = (this.fromPoint.getX()+xx) + "," + (this.fromPoint.getY()-yy);
        }else{
        	this.getUI().from = (this.toPoint.getX()+xx) + "," + (this.toPoint.getY()+yy);
	        this.getUI().to = (this.fromPoint.getX()+xx) + "," + (this.fromPoint.getY()+yy);
        }
    } else {
    	if(this.fromPoint.getY()>this.toPoint.getY()){
	        this.getUI().from = (this.fromPoint.getX()+xx) + "," + (this.fromPoint.getY()+yy);
	        this.getUI().to = (this.toPoint.getX()+xx) + "," + (this.toPoint.getY()+yy);
        }else{
        	this.getUI().from = (this.fromPoint.getX()+xx) + "," + (this.fromPoint.getY()-yy);
	        this.getUI().to = (this.toPoint.getX()+xx) + "," + (this.toPoint.getY()-yy);
        }
        //this.getUI().from = this.fromPoint.getX() + "," + this.fromPoint.getY();
        //this.getUI().to = this.toPoint.getX() + "," + this.toPoint.getY();
    }
};

