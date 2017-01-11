
/**
 * <p>Title:  </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2009</p>
 * @author itsm
 */
function LineView() {
    this.base = Component;
    //this.base(Toolkit.newElement("v:line"));
    this.base(Toolkit.newElement("v:polyline"));///
    this.getUI().filled="false";///
    this.setPosition("absolute");
    this.setLeft("0px");
    this.setTop("0px");
    
    this.points = new Array();///
    
    //var stroke = Toolkit.newElement("v:stroke");
	/*if("LB"==line){
		stroke.dashstyle = "ShortDashDotDot";
	}else if("LC"==line){
		stroke.dashstyle = "Dot";
	}*/
    //stroke.dashstyle = "Dot";
    //this.add(stroke);
}
LineView.prototype = new Component();

//
LineView.prototype.setFrom = function (point) {
    if (!point) {
        return;
    }
    this.fromPoint = point;
    
    //this.getUI().from = point.getX() + "," + point.getY();
    
    if(this.points.size()>=1){///
        this.points[0] = point;
    }else{
        this.points.add(point);
    }
    if("object"!=typeof(this.getUI().points)){
        this.getUI().points = this.points.toString();
    }else{
        this.getUI().points.value = this.points.toString();
    }
    ///:~
};
LineView.prototype.setTo = function (point) {
    if (!point) {
        return;
    }
    this.toPoint = point;
    
    //this.getUI().to = point.getX() + "," + point.getY();
    
    if(this.points.size()>=2){///
        this.points[this.points.size()-1] = point;
    }else{
        this.points.add(point);
    }
    
    if("object"!=typeof(this.getUI().points)){
        this.getUI().points = this.points.toString();
    }else{
        this.getUI().points.value = this.points.toString();
    }///:~
};

LineView.prototype.addPoint = function (point) {///
    this.points.pop();
    this.points.push(point);
    this.points.push(this.toPoint);
    if("object"!=typeof(this.getUI().points)){
        this.getUI().points = this.points.toString();
    }else{
        this.getUI().points.value = this.points.toString();
    }
};///:~

LineView.prototype.getFromPoint = function () {
    return this.fromPoint;
};
LineView.prototype.getToPoint = function () {
    return this.toPoint;
};

LineView.prototype.setPoints = function (points) {///
    this.points = points;
};
LineView.prototype.getPoints = function () {
    return this.points;
};
LineView.prototype.SynPoints =function(){
    if("object"!=typeof(this.getUI().points)){
        this.getUI().points = this.points.toString();
    }else{
        this.getUI().points.value = this.points.toString();
    }
}///:~