
/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copytop: Copytop (c) com.dhcc 2009</p>
 * @author hx
 */
function Retangle(ui) {
    this.base = Panel;
    this.base(Toolkit.newLayer());
    this.setClassName("NAME_ITSMFLOW_RETANGLE");
    this.index ;
    
    this.img = Toolkit.newLayer();
    this.img.className = "IMG";
    
    this.add(this.img);
    //
    this.setPosition("absolute");
    this.setSelected(false);
}
Retangle.prototype = new Panel();
Retangle.prototype.toString = function () {
    return "[Component,Retangle]";
};
Retangle.prototype.setSelected = function (selected) {
    if (selected == null) {
        return;
    }
    if (this.selected == selected) {
        return;
    }
    this.selected = selected;
    if(this.selected){
        this.img.className = "IMG_SELECTED";
    }else{
        this.img.className = "IMG";
    }
    
    //this.notifyObservers(Retangle.SELECTED_CHANGED);
};
Retangle.prototype.isSelected = function () {
    return this.selected;
};
Retangle.prototype.setIndex = function(index){
    this.index = index;
}
Retangle.prototype.getIndex = function(){
    return this.index;
}
Retangle.prototype.setLeftBase = function(leftBase){
    this.leftBase = leftBase;
}
Retangle.prototype.getLeftBase = function(){
    return this.leftBase;
}
Retangle.prototype.setTopBase = function(topBase){
    this.topBase = topBase;
}
Retangle.prototype.getTopBase = function(){
    return this.topBase;
}
Retangle.prototype.setTransition = function(transition){
    this.transition = transition;
}
Retangle.prototype.getTransition = function(){
    return this.transition;
}
Retangle.prototype.setPoint = function(point){
    this.point = point;
}
Retangle.prototype.getPoint = function(){
    return this.point;
}
Retangle.prototype.type = 'RETANGLE';
