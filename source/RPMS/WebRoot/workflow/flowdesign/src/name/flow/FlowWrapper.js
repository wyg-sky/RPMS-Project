
/**
 * <p>Title:  </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
/**
 *
 * @param viewer Component
 * @param model FlowModel
 */
function FlowWrapper(viewer, model, stateMonitor, statuser) {
	//
    if (stateMonitor) {
        this.setStateMonitor(stateMonitor);
        this.getStateMonitor().addObserver(this);
        this.transitionMonitor = new TransitionMonitor();
    }

	//
    this.metaNodes = new Array();
    this.transitions = new Array();

	//
    this.nodeMouseListener = new Array();
    this.transitionMouseListener = new Array();

    //
    if (model == null) {
        model = new FlowModel();
    }
    this.setModel(model);

    //
    if (viewer == null) {
        return;
    }
    this.setViewer(viewer);

    //
    this.statuser = statuser;
    this.setChanged(false);
}

//
FlowWrapper.prototype.setStateMonitor = function (stateMonitor) {
    this.stateMonitor = stateMonitor;
};
FlowWrapper.prototype.getStateMonitor = function () {
    return this.stateMonitor;
};

//
FlowWrapper.prototype.setChanged = function (b) {
    this.changed = b;
};
FlowWrapper.prototype.isChanged = function () {
    return this.changed;
};

//
FlowWrapper.prototype.setStatusInfo = function (text) {
    if (this.statuser) {
        this.statuser.setText(text);
    }
};

//
FlowWrapper.prototype.getTransitionMonitor = function () {
    return this.transitionMonitor;
};

//
FlowWrapper.prototype._initViewer = function () {
    this.getViewer().setPosition("relative");

    //
    if (this.getModel().isEditable()) {
        this.getViewer().addMouseListener(new WrapperMetaMouseListener(this));
        this.getViewer().addMouseListener(new WrapperSelectMouseListener(this));
        this.getViewer().addMouseListener(new MetaMoveMouseListener(this));
        this.getViewer().addMouseListener(new RetangleMoveMouseListener(this));///
        this.getViewer().addMouseListener(new WrapperTransitionMouseListener(this));
        this.getViewer().addKeyListener(new MetaMoveKeyListener(this));
    }
};
FlowWrapper.prototype._updateViewer = function () {
    Toolkit.clearElement(this.getViewer());
    var model = this.getModel();
    var viewer = this.getViewer();

    //
    var metaNodeModels = model.getMetaNodeModels();
    for (var i = 0; i < metaNodeModels.size(); i++) {
    	//alert(i);
        var metaNodeModel = metaNodeModels.get(i);
        var metaNode = FlowWrapper.convertMetaNodeModelToMetaNode(metaNodeModel, this);
        this.addMetaNode(metaNode);
    }

	//
    var transitionModels = model.getTransitionModels();
    for (var i = 0; i < transitionModels.size(); i++) {
        var transitionModel = transitionModels.get(i);
        var transition = FlowWrapper.convertTransitionModelToTransition(transitionModel, this);
        this.addTransition(transition);
    }
};

//
FlowWrapper.prototype.setViewer = function (viewer) {
    if (!viewer) {
        return;
    }
    if (this.viewer == viewer) {
        return;
    }
    if (this.viewer) {
        this.viewer.listenerProxy.clear();//clear memory
    }
    this.viewer = viewer;
    this._initViewer();
};
FlowWrapper.prototype.getViewer = function () {
    return this.viewer;
};

//
FlowWrapper.prototype.setModel = function (model) {
    if (!model) {
        return;
    }
    if (this.model == model) {
    
        return;
    }
    if (this.transitionMonitor) {
        this.transitionMonitor.reset();
    }
    this.model = model;
    this.model.addObserver(this);
    this._updateViewer();
};
FlowWrapper.prototype.getModel = function () {
    return this.model;
};

//
FlowWrapper.prototype.addMetaNode = function (metaNode) {
    this.metaNodes.add(metaNode);
    this.getViewer().add(metaNode);
    if (this.getModel().isEditable()) {
        metaNode.addMouseListener(new MetaNodeMouseListener(metaNode.getModel(), this));
        metaNode.addMouseListener(new MetaNodeTextMouseListener(metaNode, this));
        metaNode.addKeyListener(new MetaNodeTextKeyListener(metaNode, this));
    }
};
FlowWrapper.prototype.removeMetaNode = function (metaNode) {
    metaNode.listenerProxy.clear();//clear memory
    this.metaNodes.remove(metaNode);
    this.getViewer().remove(metaNode);
};
FlowWrapper.prototype.addTransition = function (transition) {
    if (this.getModel().isEditable()) {
        transition.addMouseListener(new TransitionMouseListener(transition.getModel(), this));
        transition.addMouseListener(new TransitionTextMouseListener(transition, this));
        transition.addContextMenuListener(new TransitionContextMenuListener(transition.getModel(), transition,this));///
        transition.addKeyListener(new TransitionTextKeyListener(transition, this));
    }
    this.transitions.add(transition);
    this.getViewer().add(transition);
    //this.getViewer().add(transition.getLineText());
    //alert(transition.getLineText().fromPoint.getX()+'==='+transition.getLineText().fromPoint.getY()+'\n'+transition.getLineText().toPoint.getX()+'==='+transition.getLineText().toPoint.getY());
    
    
    ///
    //alert(transition.getModel());
    //alert(transition.getModel().getDFPoints());
    if(transition.getModel().getDFPoints())
    	transition.turnToPolyByInit(transition.getModel().getDFPoints().toString());
   // alert(transition.points.toString()+'\n'+transition.getLineText().fromPoint.getX()+'==='+transition.getLineText().fromPoint.getY()+'\n'+transition.getLineText().toPoint.getX()+'==='+transition.getLineText().toPoint.getY());
    
    //var pointsStr = transition.getModel().getDFPoints().toString();
    //transition.turnToPolyByInit(pointsStr);
    transition._updateBoundRectangle();
    transition._updatePoints();
    //alert(transition.points.toString()+'\n'+transition.getLineText().fromPoint.getX()+'==='+transition.getLineText().fromPoint.getY()+'\n'+transition.getLineText().toPoint.getX()+'==='+transition.getLineText().toPoint.getY());
    
    //alert('aa');
    //transition.getLineText();
    this.getViewer().add(transition.getLineText());
    //alert('bb');
    ///:~
};
FlowWrapper.prototype.removeTransition = function (transition) {
    transition.listenerProxy.clear();//clear memory
    this.transitions.remove(transition);
    this.getViewer().remove(transition);
    this.getViewer().remove(transition.getLineText());
};

//
FlowWrapper.convertMetaNodeModelToMetaNode = function (metaNodeModel, wrapper) {
    var type = metaNodeModel.type;
    var metaNode = null;
    
    switch (type) {
      case MetaNodeModel.TYPE_NODE:
        metaNode = new Node(metaNodeModel, wrapper);
        break;
      case MetaNodeModel.TYPE_DECISION_NODE:
        metaNode = new DecisionNode(metaNodeModel, wrapper);
        break;
      case MetaNodeModel.TYPE_FORK_NODE:
        metaNode = new ForkNode(metaNodeModel, wrapper);
        break;
      case MetaNodeModel.TYPE_JOIN_NODE:
        metaNode = new JoinNode(metaNodeModel, wrapper);
        break;
      case MetaNodeModel.TYPE_START_NODE:
        metaNode = new StartNode(metaNodeModel, wrapper);
        break;
      case MetaNodeModel.TYPE_END_NODE:
        metaNode = new EndNode(metaNodeModel, wrapper);
        break;
      default:
        break;
    }
    return metaNode;
};
FlowWrapper.convertTransitionModelToTransition = function (transitionModel, wrapper) {
    return new Transition(transitionModel, wrapper);
};

//
FlowWrapper.prototype.addNodeMouseListener = function () {
};
FlowWrapper.prototype.removeNodeMouseListener = function () {
};
FlowWrapper.prototype.addTransitionMouseListener = function () {
};
FlowWrapper.prototype.removeTransitionMouseListener = function () {
};

//
FlowWrapper.prototype.update = function (observable, arg) {
    if (arg instanceof Array) {
        this.setChanged(true);
        if (arg.size() == 2) {
            var property = arg[0];
            var model = arg[1];
            switch (property) {
              case FlowModel.META_NODE_MODEL_ADD:
                var node = FlowWrapper.convertMetaNodeModelToMetaNode(model, this);
                this.addMetaNode(node);
                break;
              case FlowModel.META_NODE_MODEL_REMOVE:
                model.suicide();
                break;
              case FlowModel.TRANSITION_MODEL_ADD:
                var transition = FlowWrapper.convertTransitionModelToTransition(model, this);
                this.addTransition(transition);
                break;
              case FlowModel.TRANSITION_MODEL_REMOVE:
                model.suicide();
                break;
              default:
                break;
            }
        }
        return;
    }
    if (arg == StateMonitor.OPERATION_STATE_CHANGED) {
        var state = this.getStateMonitor().getState();
        if (state == StateMonitor.SELECT) {
            this.getViewer().setCursor(Cursor.AUTO);
            this.getViewer().getUI().focus();
        } else {
            this.getViewer().setCursor(Cursor.CROSSHAIR);
        }
        return;
    }
};

