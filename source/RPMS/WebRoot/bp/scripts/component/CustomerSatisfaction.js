Ext.itsm.CustomerSatisfaction = Ext.extend(Ext.BoxComponent, {
	_onMouseOverImg : function(e,el){
		if(e.target.id.substring(0,e.target.id.length-1)=='img_id_cs_'){
			var rangeOffset = parseInt(e.target.id.substring(e.target.id.length-1,e.target.id.length));
			this._changeValue(el, rangeOffset);
		}
	},
	_onClickImg : function(e,el){
		var rangeOffset = parseInt(e.target.id.substring(e.target.id.length-1,e.target.id.length));
		if(rangeOffset>4){
			rangeOffset=4;
		}
		this.value=rangeOffset+1;
		this.hiddenField.dom.value=this.value;
	},
	_onMouseOutImg : function(e,el){
		if(e.target.id.substring(0,e.target.id.length-1)=='img_id_cs_'){
			var rangeOffset = this.value;
			var limitRangeOffset = parseInt(e.target.id.substring(e.target.id.length-1,e.target.id.length));
			if(limitRangeOffset<5){
				this._changeValue(el, rangeOffset-1);
			}
		}
	},
	_changeValue : function(el,value){
		if(value>=0&&value<=4){
			for(var i=0;i<=4;i++){
				if(i<=value){
					el.parentNode.children[i].src='images/servicevalue/satisfaction.gif';	
				}else{
					el.parentNode.children[i].src='images/servicevalue/dissatisfied.gif';
				}
			}
		}
	},
	onRender : function(B, A) {
		if (!this.el) {
			var cfg = {
				tag : 'div',
				id : this.id
			};
			this.el = B.createChild(cfg, A);
			this.hiddenField = this.el.createChild( {
				tag : 'input',
				name : this.hiddenName,
				type : 'hidden',
				cls : 'x-form-hidden x-form-field'
			});
			if (!this.hideLabel) {
				var C = this.el.createChild( {
					tag : 'label',
					cls : 'x-form-item-label',
					html : this.text + ":"
				});
				C.dom.setAttribute('for', this.hiddenField.id);
			}
			this.rawField = this.el.createChild();
		}
		this.el.addClass( [!this.hideLabel ? 'x-form-item' : 'x-form-item-nobgcolor',this.cls ]);
		if (this.tabIndex !== undefined) {
			this.el.dom.setAttribute('tabIndex', this.tabIndex);
		} else {
			this.el.dom.setAttribute('tabIndex', '-1');
		}
		this.el.dom.removeAttribute('id');
		Ext.itsm.CustomerSatisfaction.superclass.onRender.call(this, B, A);
		if(!this.readOnly){
			this.rawField.on("click",this._onClickImg,this);
			this.rawField.on("mouseover",this._onMouseOverImg,this);
			this.rawField.on("mouseout",this._onMouseOutImg,this);
		}
		this.initValue();
	},
	initValue : function() {
		if (this.value !== undefined) {
			this.setValue(this.value);
		} else if (this.hiddenField.dom.value.length > 0) {
			this.setValue(this.hiddenField.dom.value);
		}else if(this.instanceId&&this.instanceId.length>0){
		    Ext.Ajax.request({
		        url: 'servicevalue/calculateForBpi.html',
		        method: 'POST',
		        params: {instanceId:this.instanceId,type:null},
		        success: function(response,options){
		        	this.setValue(response.responseText);
		        },
		        scope : this
		    });
		}else{
			this.setValue(1);
		}
	},
	setValue : function(v) {
		this.value = v;
		if (this.rendered) {
			this.hiddenField.dom.value = (v === null || v === undefined ? '': v);
			var viewValue="";
			
			for(var i=0;i<=4;i++){
				if(i<v){
					viewValue+='<img id="img_id_cs_'+i+'"src="images/servicevalue/satisfaction.gif"/>';
				}else{
					viewValue+='<img id="img_id_cs_'+i+'"src="images/servicevalue/dissatisfied.gif"/>';
				}
			}
			this.rawField.dom.innerHTML =viewValue;
		}
	},
	getValue : function() {
		if (!this.rendered) {
			return this.value;
		}
		var v = this.hiddenField.dom.value;
		if (v === this.emptyText || v === undefined) {
			v = '';
		}
		return v;
	}
});
Ext.reg('customersatisfaction', Ext.itsm.CustomerSatisfaction);