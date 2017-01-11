
/**
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function TransitionMouseListener(transitionModel, wrapper) {
    this.transitionModel = transitionModel;
    this.wrapper = wrapper;
}
TransitionMouseListener.prototype = new MouseListener();

//
TransitionMouseListener.prototype.onMouseDown = function (e) {
    this.moved = false;
    if (e.button != MouseEvent.BUTTON_LEFT) {
        return;
    }
    this.down = true;

    //
    var state = this.wrapper.getStateMonitor().getState();
    switch (state) {
      case StateMonitor.SELECT:
        var selectedMetaNodeModels = this.wrapper.getModel().getSelectedMetaNodeModels();
        var selectedTransitionModels = this.wrapper.getModel().getSelectedTransitionModels();
        if ((selectedTransitionModels.size() <= 1) && (selectedMetaNodeModels.size() <= 1) && (!e.ctrlKey)) {
            this.wrapper.getModel().clearSelectedMetaNodeModels();
            this.wrapper.getModel().clearSelectedTransitionModels();
            this.wrapper.getModel().addSelectedTransitionModel(this.transitionModel);
            if('play'!=operType)
            	propertyPanel.modelClick(this.transitionModel);
            //lingzj 当选中该连线时，东部区域的属性页面，显示该连线属性
            //alert("bb");
            /*if(workFlowPageType!='view')
            	window.parent.showNodeTab(this.transitionModel.id);*/
            //:~
            //双击连接线，可以编辑连接名称
           // this.wrapper.setStatusInfo("\u53cc\u51fb\u8fde\u63a5\u7ebf\uff0c\u53ef\u4ee5\u7f16\u8f91\u8fde\u63a5\u540d\u79f0");
        }
        break;
      case StateMonitor.TRANSITION:
        break;
    }
};
TransitionMouseListener.prototype.onMouseMove = function (e) {
    if (e.button != MouseEvent.BUTTON_LEFT) {
        return;
    }
    if (this.down) {
        this.moved = true;
    }
};
TransitionMouseListener.prototype.onMouseUp = function (e) {
    this.down = false;
    if (e.button != MouseEvent.BUTTON_LEFT) {
        return;
    }

    //
    var state = this.wrapper.getStateMonitor().getState();
    switch (state) {
      case StateMonitor.SELECT:
        if (this.moved) {
            return;
        }
        if (e.ctrlKey) {
            if (this.transitionModel.isSelected()) {
                this.wrapper.getModel().removeSelectedTransitionModel(this.transitionModel);
            } else {
                this.wrapper.getModel().addSelectedTransitionModel(this.transitionModel);
            }
        } else {
            this.wrapper.getModel().clearSelectedMetaNodeModels();
            this.wrapper.getModel().clearSelectedTransitionModels();
            this.wrapper.getModel().addSelectedTransitionModel(this.transitionModel);
            //双击连接线，可以编辑连接名称
            this.wrapper.setStatusInfo("\u53cc\u51fb\u8fde\u63a5\u7ebf\uff0c\u53ef\u4ee5\u7f16\u8f91\u8fde\u63a5\u540d\u79f0");
        }
        break;
    }
};
//********************************************************************************
function TransitionContextMenuListener(transitionModel, transition,wrapper) {
    this.transitionModel = transitionModel;
    this.transition = transition;
    this.wrapper = wrapper;
    
}

TransitionContextMenuListener.prototype = new ContextMenuListener();
TransitionContextMenuListener.prototype.onContextMenu = function (e) {
    
    var selectedMetaNodeModels = this.wrapper.getModel().getSelectedMetaNodeModels();
    var selectedTransitionModels = this.wrapper.getModel().getSelectedTransitionModels();
    if ((selectedTransitionModels.size() <= 1) && (selectedMetaNodeModels.size() <= 1) && (!e.ctrlKey)) {
        this.wrapper.getModel().clearSelectedMetaNodeModels();
        this.wrapper.getModel().clearSelectedTransitionModels();
        this.wrapper.getModel().clearSelectedRetangles();
        this.wrapper.getModel().addSelectedTransitionModel(this.transitionModel);
        this.wrapper.setStatusInfo("");
    }
    
    //the rightMenu
    var toPolyMenu = new Ext.menu.Menu({
        items : [{
            text:'显示折点',
            handler: function(){
                this.transition.turnToPoly();
            },
            scope: this
        }]
    })
    var toLineMenu = new Ext.menu.Menu({
        items : [{
            text:'转为直线',
            handler: function(){
                this.transition.turnToLine();
            },
            scope: this
        }]
    })
    //e.preventDefault();
    if(e.offsetX>0){
        //alert(this.transitionModel.getFromMetaNodeModel().getPosition().getX()+"~~~~~~"+this.transitionModel.getFromMetaNodeModel().getPosition().getY());
        //alert(this.rightClickMenu);
        var xp = (this.transitionModel.getFromMetaNodeModel().getPosition().getX()+this.transitionModel.getToMetaNodeModel().getPosition().getX())/2
        var yp = (this.transitionModel.getFromMetaNodeModel().getPosition().getY()+this.transitionModel.getToMetaNodeModel().getPosition().getY())/2
        e.cancelBubble = true;
        e.returnValue =false;
        if(!this.transition.isPoly){
            toPolyMenu.showAt([xp,yp]);
        }else if(this.transition.isPoly){
            xp = (this.transition.secondRetangle.getLeftBase()*1+this.transition.thirdRetangle.getLeftBase()*1)/2
            yp = (this.transition.secondRetangle.getTopBase()*1+this.transition.thirdRetangle.getTopBase()*1)/2
            toLineMenu.showAt([xp,yp]);
        }
    }
};
