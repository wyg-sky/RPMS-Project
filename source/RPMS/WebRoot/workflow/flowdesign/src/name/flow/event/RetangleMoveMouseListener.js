
//
/**
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) com.dhcc 2009</p>
 * @author hx
 */
function RetangleMoveMouseListener(wrapper) {
    this.wrapper = wrapper;
    this.lastCoord = null;
}
RetangleMoveMouseListener.prototype = new MouseListener();
RetangleMoveMouseListener.prototype.onMouseDown = function (e) {
    if (e.button != MouseEvent.BUTTON_LEFT) {
        return;
    }
    var state = this.wrapper.getStateMonitor().getState();
    if (state != StateMonitor.SELECT) {
        return;
    }
    this.lastCoord = new Point(e.screenX,e.screenY);
    this.lastTime = new Date();
};
RetangleMoveMouseListener.prototype.onMouseMove = function (e) {
    if (e.button != MouseEvent.BUTTON_LEFT) {
        return;
    }
    //
    if (this.lastCoord) {
        var curTime = new Date();
        if ((curTime - this.lastTime) > FlowWorkSpace.META_NODE_MOVED_STEP_TIME) {
            this.move(e);
            this.lastTime = curTime;
        }
    }
};
RetangleMoveMouseListener.prototype.onMouseUp = function (e) {
    if (e.button != MouseEvent.BUTTON_LEFT) {
        return;
    }

    //
    if (this.lastCoord) {
        this.move(e);
    }

    //
    this.lastCoord = null;
};
RetangleMoveMouseListener.prototype.move = function (e) {
    var srcObj = e.target || e.srcElement;
    var curCoord = new Point(e.screenX,e.screenY);
    var selectedRetangles = this.wrapper.getModel().getSelectedRetangles();
    for(var i = 0;i<selectedRetangles.size();i++){
        var retangle = selectedRetangles[i];
        var index = retangle.getIndex();
        var lastPoint = retangle.getTransition().points[index];
        var baseX = retangle.getLeftBase()*1+curCoord.getX()*1-this.lastCoord.getX()*1;
	    var baseY = retangle.getTopBase()*1+curCoord.getY()*1-this.lastCoord.getY()*1;
	    retangle.getTransition().points[index] = new Point(baseX,baseY);
	    retangle.setLeftBase(baseX);
	    retangle.setTopBase(baseY);
	    retangle.getTransition().SynPoints();
	    retangle.getTransition()._updatePoints();
    }
    
    //
    this.lastCoord = curCoord;
};

