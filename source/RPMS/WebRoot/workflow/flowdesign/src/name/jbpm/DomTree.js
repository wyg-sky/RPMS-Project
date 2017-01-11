/*
 *流程的dom树模型，用于显示流程的结构，也用于存放流程节点属性
 */
DomTree = function() {
    DomTree.superclass.constructor.call(this,{
		id: 'domTree',
		title: '组件树',
		region: 'center',
        containerScroll: true, 
        enableDD: true,
        autoScroll : true,
        nodePos: 0,//控制滚动条定位
       	loader: new Ext.tree.TreeLoader({}),
        root: new DomFlow(this)
	}); 
	this.on('click',this.onClick,this);
	this.on('beforenodedrop',this.onBeforeNodeDrop,this);
};

Ext.extend(DomTree, Ext.tree.TreePanel,{
	addNode : function(metaNodeModel){//添加节点
		var nodesRoot = this.getNodeById('nodes');//dom树上的节点的根节点
        var newNode = new DomNode(metaNodeModel);
		nodesRoot.appendChild(newNode);
		newNode.fireEvent('click',newNode);
	},
	addTran : function(transitionModel){		
		var fromMetaNodeModel = transitionModel.getFromMetaNodeModel();
		var domNode = this.findDomNodeById(fromMetaNodeModel.getID());
		var domTran = new DomTran(transitionModel);
		domNode.addTran(domTran);
		domTran.fireEvent('click',domTran);
	},
	//得到指定id的DomNode对象
	findDomNodeById : function(id){
		var node = this.getNodeById(id);
		var domNode = node.attributes.obj;
		return domNode;
	},
	//拖拽树上节点-如果非同一父节点下的迁移拖拽则不处理
	onBeforeNodeDrop : function(e){
		//alert(e.target.parentNode.text+'---'+e.point+'----'+e.dropNode.parentNode.text+'---'+((e.target.parentNode!=e.dropNode.parentNode)||(e.point=='append')));
		//return false;
		if((e.target.parentNode!=e.dropNode.parentNode)||(e.point=='append')) return false;
	},
	onClick : function(node,e){//把form中设置好的属性值，放到对应的dom树的对象中,并改变formpanel是中的属性
		//1保存属性
		var formPanel = propertyPanel.propertyFormPanel;
		var oldDomId = formPanel.findById('domId').getValue();
		var oldNode = this.getNodeById(oldDomId);
		var oldDomObj = null;
		if(oldNode){
			oldDomObj = oldNode.attributes.obj;
			oldDomObj.saveProperty(formPanel);
		}
		var domObj = node.attributes.obj;
		if(domObj){
			//2显示属性,并赋值
			domObj.showProperty(node);
		}
		//如果olddom是meta，则图形化界面对象取消被选中状态		//点击的如果是meta则图形化界面的对象显示被选中状态
		if(oldDomObj!=null&&domObj!=null){
		
			var metaNodeModel = oldDomObj.metaNodeModel;
			if(metaNodeModel!=null)
				metaNodeModel.setSelected(false);
			var transitionModel = oldDomObj.transitionModel;
			if(transitionModel)
				transitionModel.setSelected(false);

			var metaNodeModel = domObj.metaNodeModel;
			if(metaNodeModel!=null){
				metaNodeModel.setSelected(true);	
				//this.body.scrollTo('top',Ext.get(domObj.getUI().elNode).getY());
				//alert(Ext.get(domObj.getUI().elNode).getY());
				//this.body.scrollTo('top',Ext.get(domObj.getUI().elNode).getY()-20);
			}			
			var transitionModel = domObj.transitionModel;
			if(transitionModel)
				transitionModel.setSelected(true);
		}
	},
	convertDomToXML : function(jbpmDoc){
		return this.root.attributes.obj.convertDomToXML(jbpmDoc);
	},
	convertXMLToDom : function(jbpmDoc){
		var flow = jbpmDoc.getElementsByTagName('process-definition');
		this.root.attributes.obj.convertXMLToDom(flow[0]);
	}
});


