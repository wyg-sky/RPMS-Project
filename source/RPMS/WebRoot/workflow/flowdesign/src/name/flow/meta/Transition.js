
/**
 * <p>Title:  </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function Transition(model, wrapper) {
    this.base = LineView;
    this.base();

    //
    var stroke = Toolkit.newElement("v:stroke");
    stroke.EndArrow = "Classic";
    this.add(stroke);
    
    //
    //bound rectangle
    var rectangleUrl = FlowWorkSpace.ITSM_FLOW_PATH + "images/rectangle.gif";
    //
    this.fromRetangle = new Component(Toolkit.newImage());
    this.fromRetangle.getUI().src = rectangleUrl;
    this.fromRetangle.setLeft("-3px");
    this.fromRetangle.setTop("-3px");
    this.fromRetangle.setPosition("absolute");
    this.add(this.fromRetangle);
    //
    this.toRetangle = new Component(Toolkit.newImage());
    this.toRetangle.getUI().src = rectangleUrl;
    this.toRetangle.setLeft("-3px");
    this.toRetangle.setTop("-3px");
    this.toRetangle.setPosition("absolute");
    this.add(this.toRetangle);

    //
    this.textInput = Toolkit.newElement("<input type=\"text\">");
    this.textInput.style.display = "none";
    this.add(this.textInput);
    var _Transition = this;
    this.textInput.onchange = function () {
        _Transition.stopEdit();
    };
    this.textInput.onblur = function () {
        _Transition.stopEdit();
    };

    //linetext
    this.lineText = new LineTextView();//LINGZJ 修改连线文本（折线）
    //alert(this.lineText.innerHTML);
	//model.setText(model.getLineName());///
    //
    this.setModel(model);
    this.wrapper = wrapper;
}
Transition.prototype = new LineView();

//
Transition.prototype.setModel = function (model) {
    if (!model) {
        return;
    }
    this.model = model;
    this.model.addObserver(this);
    this._updatePoints();
    this._updateBoundRectangle();
    this._updateText();
};

Transition.prototype.getModel = function () {
    return this.model;
};

//
Transition.prototype.getLineText = function () {
    return this.lineText;
};

//
Transition.prototype.startEdit = function () {
    this.textInput.style.display = "";
    this.textInput.focus();
    this.getModel().setEditing(true);
};
Transition.prototype.stopEdit = function () {
    this.textInput.style.display = "none";
    this.getModel().setText(this.textInput.value);
    this.getModel().setEditing(false);
};

//
Transition.prototype._updateText = function () {
    var text = this.model.getText();
    this.textInput.value = text;
    this.lineText.setText(text);
    //lingzj修改连线名称，同步修改右侧连线名称
    //if(this.getModel().isEditing()==true){
    	//alert(this.model.getText());
    	//window.parent.modifyTransName(this.getModel().getID(),text)
    //}
    //
};

//
Transition.prototype._updatePoints = function () {
    var fromMetaNodeModel = this.model.getFromMetaNodeModel();
    var toMetaNodeModel = this.model.getToMetaNodeModel();
    if (!fromMetaNodeModel) {
        return;
    }
    if (!toMetaNodeModel) {
        return;
    }
    var fromOffset = this.getModel().getFromOffset();
    var toOffset = this.getModel().getToOffset();
    if ((!fromOffset) || (!toOffset)) {
        var offset = TransitionCompass.getOffset(fromMetaNodeModel, toMetaNodeModel);
        if (!offset) {
            return;
        }
        if (!fromOffset) {
            fromOffset = offset[0];
        }
        if (!toOffset) {
            toOffset = offset[1];
        }
    }
	//alert(fromOffset+'===='+toOffset);
    //
    var from = TransitionCompass.convertOffsetToPoint(fromMetaNodeModel, fromOffset);
    var to = TransitionCompass.convertOffsetToPoint(toMetaNodeModel, toOffset);

    //
    this.setFrom(from);
    this.setTo(to);
    //alert(from+'=='+to);

    //linetext point
    //this.lineText.setFrom(from);///
    //this.lineText.setTo(to);///

    //
    var minX = Math.min(from.getX(), to.getX());
    var minY = Math.min(from.getY(), to.getY());
    ///this.fromRetangle.setLeft((from.getX() - minX) + "px");
    ///this.fromRetangle.setTop((from.getY() - minY) + "px");
    ///this.toRetangle.setLeft((to.getX() - minX) + "px");
    ///this.toRetangle.setTop((to.getY() - minY) + "px");
    
    if(this.secondRetangle){///
		    	
		//节点上连线端随连线上折点的位置而移动
    	offset = TransitionCompass.getOffset(fromMetaNodeModel, this.secondRetangle);
    	from = TransitionCompass.convertOffsetToPoint(fromMetaNodeModel, offset[0]);
    	this.setFrom(from);
    	
    	offset = TransitionCompass.getOffset(this.thirdRetangle, toMetaNodeModel);
    	to = TransitionCompass.convertOffsetToPoint(toMetaNodeModel, offset[1]);
    	this.setTo(to);
    	//:~
    	
        minX = Math.min(from.getX(), to.getX(),this.secondRetangle.getLeftBase(),this.thirdRetangle.getLeftBase());
        minY = Math.min(from.getY(), to.getY(),this.secondRetangle.getTopBase(),this.thirdRetangle.getTopBase());
        
        //form = new Point(this.secondRetangle.getLeftBase()+10,this.secondRetangle.getTopBase()+10);
    	//to = new Point(this.thirdRetangle.getLeftBase()+10,this.thirdRetangle.getTopBase()+10);
    	//this.setFrom(form);
    	//this.setTo(to);
        
        this.secondRetangle.setLeft(this.secondRetangle.getLeftBase());
        this.secondRetangle.setTop(this.secondRetangle.getTopBase());
        this.thirdRetangle.setLeft(this.thirdRetangle.getLeftBase());
        this.thirdRetangle.setTop(this.thirdRetangle.getTopBase());
        
        this.lineText.setFrom(new Point(this.secondRetangle.getLeftBase(),this.secondRetangle.getTopBase()));
        this.lineText.setTo(new Point(this.thirdRetangle.getLeftBase(),this.thirdRetangle.getTopBase()));
    }else{
        this.lineText.setFrom(from);
        this.lineText.setTo(to);
    }
    this.fromRetangle.setLeft((from.getX() - minX) + "px");
    this.fromRetangle.setTop((from.getY() - minY) + "px");
    this.toRetangle.setLeft((to.getX() - minX) + "px");
    this.toRetangle.setTop((to.getY() - minY) + "px");///:~
    this.getModel().setPoints(this.points);
};

//
Transition.prototype._updateBoundRectangle = function () {
    if (this.model.isSelected()) {
        this.fromRetangle.setClassName("BOUND_RECTANGLE");
        this.toRetangle.setClassName("BOUND_RECTANGLE");
        if(this.secondRetangle){///
	        this.thirdRetangle.setClassName("NAME_ITSMFLOW_RETANGLE");
            this.secondRetangle.setClassName("NAME_ITSMFLOW_RETANGLE");
        }///:~
    } else {
        this.fromRetangle.setClassName("BOUND_RECTANGLE_UNSELECTED");
        this.toRetangle.setClassName("BOUND_RECTANGLE_UNSELECTED");
        if(this.secondRetangle){///
	        this.secondRetangle.setClassName("BOUND_RECTANGLE_UNSELECTED");
	        this.thirdRetangle.setClassName("BOUND_RECTANGLE_UNSELECTED");
        }///:~
    }
};

//
Transition.prototype._suicide = function () {
    this.listenerProxy.clear();
    if (!this.wrapper) {
        return;
    }
    this.wrapper.removeTransition(this);
};
///
Transition.prototype.turnToPoly = function () {
    var rectangleUrl = FlowWorkSpace.ITSM_FLOW_PATH + "images/rectangle.gif";
    var fromPoint = this.getFromPoint();
    var toPoint = this.getToPoint();
    var secondX = fromPoint.getX()+(toPoint.getX()-fromPoint.getX())/3;
    var secondY = fromPoint.getY()+(toPoint.getY()-fromPoint.getY())/3;
    var secondPoint = new Point(secondX,secondY);
    this.addPoint(secondPoint);
    this.secondRetangle = new Retangle(Toolkit.newImage());
    this.secondRetangle.setPoint(secondPoint);
    this.secondRetangle.setLeftBase(secondX);
    this.secondRetangle.setTopBase(secondY);
    this.secondRetangle.setLeft(secondX);
    this.secondRetangle.setTop(secondY);
    
    this.secondRetangle.setIndex(1);
    this.secondRetangle.setTransition(this);
    //this.secondRetangle.addMouseListener(new RetangleMoveMouseListener(this.secondRetangle));
    this.secondRetangle.addMouseListener(new RetangleNodeMouseLister(this.secondRetangle,this.wrapper));
    this.wrapper.getViewer().add(this.secondRetangle);
    //this.retangles.add(this.secondRetangle);
    
    var thirdX = fromPoint.getX()+(toPoint.getX()-fromPoint.getX())*2/3;
    var thirdY = fromPoint.getY()+(toPoint.getY()-fromPoint.getY())*2/3;
    var thirdPoint =  new Point(thirdX,thirdY);
    this.addPoint(thirdPoint);
    this.thirdRetangle = new Retangle(Toolkit.newImage());
    this.thirdRetangle.setPoint(secondPoint);
    this.thirdRetangle.setLeftBase(thirdX);
    this.thirdRetangle.setTopBase(thirdY);
    this.thirdRetangle.setLeft(thirdX);
    this.thirdRetangle.setTop(thirdY);
    this.thirdRetangle.setIndex(2);
    this.thirdRetangle.setTransition(this);
    //this.thirdRetangle.addMouseListener(new RetangleMoveMouseListener(this.thirdRetangle));
    this.thirdRetangle.addMouseListener(new RetangleNodeMouseLister(this.thirdRetangle,this.wrapper));
    //this.add(this.thirdRetangle);
    this.wrapper.getViewer().add(this.thirdRetangle);
    //this.retangles.add(this.thirdRetangle);
    
    this.setPoly(true);
};
Transition.prototype.turnToPolyByInit = function (pointsStr) {
    if(pointsStr&&!this.secondRetangle){
        var points = pointsStr.split(",");
        if(points.size()==8){
            var secondPoint = new Point(parseFloat(points[2]),parseFloat(points[3]));
            this.addPoint(secondPoint);
            this.secondRetangle = new Retangle(Toolkit.newImage());
            this.secondRetangle.setPoint(secondPoint);
            this.secondRetangle.setLeftBase(parseFloat(points[2]));
            this.secondRetangle.setTopBase(parseFloat(points[3]));
            this.secondRetangle.setLeft(parseFloat(points[2]));
            this.secondRetangle.setTop(parseFloat(points[3]));
            
            this.secondRetangle.setIndex(1);
            this.secondRetangle.setTransition(this);
            //this.secondRetangle.addMouseListener(new RetangleMoveMouseListener(this.secondRetangle));
            this.secondRetangle.addMouseListener(new RetangleNodeMouseLister(this.secondRetangle,this.wrapper));
            this.wrapper.getViewer().add(this.secondRetangle);
            //alert('2');
            
            var thirdPoint = new Point(parseFloat(points[4]),parseFloat(points[5]));
            this.addPoint(thirdPoint);
            this.thirdRetangle = new Retangle(Toolkit.newImage());
            this.thirdRetangle.setPoint(thirdPoint);
            this.thirdRetangle.setLeftBase(parseFloat(points[4]));
            this.thirdRetangle.setTopBase(parseFloat(points[5]));
            this.thirdRetangle.setLeft(parseFloat(points[4]));
            this.thirdRetangle.setTop(parseFloat(points[5]));
            
            this.thirdRetangle.setIndex(2);
            this.thirdRetangle.setTransition(this);
            //this.thirdRetangle.addMouseListener(new RetangleMoveMouseListener(this.thirdRetangle));
            this.thirdRetangle.addMouseListener(new RetangleNodeMouseLister(this.thirdRetangle,this.wrapper));
            this.wrapper.getViewer().add(this.thirdRetangle);
            //alert('3');
            //alert(this.secondRetangle.getLeftBase()+'===='+this.secondRetangle.getTopBase());
            //this.lineText.setFrom(new Point(this.secondRetangle.getLeftBase(),this.secondRetangle.getTopBase()));
        	//this.lineText.setTo(new Point(this.thirdRetangle.getLeftBase(),this.thirdRetangle.getTopBase()));
        	//alert('4');
        	//this.wrapper.getViewer().add(this.lineText);
        	
        	this.setPoly(true);
        }
    }
};
Transition.prototype.turnToLine = function () {
    this.wrapper.getViewer().remove(this.secondRetangle);
    this.wrapper.getViewer().remove(this.thirdRetangle);
    this.removePolyPoints();
    this.setPoly(false);
};
Transition.prototype.removePolyPoints = function () {
    if("object"!=typeof(this.getUI().points)){
        this.getUI().points = "";
    }else{
        this.getUI().points.value = "";
    }
    this.points.clear();
    this.secondRetangle = null;
    this.thirdRetangle = null;
    this._updatePoints();
};
Transition.prototype.setPoly = function (isPoly) {
   this.isPoly = isPoly;
};
/*Transition.prototype._hoDText = function () {
    if(this.model.hiddText=="0"){
        this.model.setText(this.model.getLineName());
    }else if(this.model.hiddText=="1"){
        this.model.setText("");
    }
};
function clone(myObj)   
{   
    if(typeof(myObj) != 'object') return myObj;   
    if(myObj == null) return myObj;   
    var myNewObj = new Object();    
    for(var i in myObj) myNewObj[i] = clone(myObj[i]);    
    return myNewObj;   
}  
*/
///:~
//
Transition.prototype.update = function (observable, arg) {
    this.wrapper.setChanged(true);
    switch (arg) {
      case TransitionModel.TRANSITION_POSITION_CHANGED:
        this._updatePoints();
        break;
      case MetaModel.SELECTED_CHANGED:
        this._updateBoundRectangle();
        break;
      case TransitionModel.SUICIDE:
        this._suicide();
      case MetaModel.TEXT_CHANGED:
        this._updateText();
        break;
        break;
    }
};

