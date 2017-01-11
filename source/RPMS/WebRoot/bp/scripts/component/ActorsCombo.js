Ext.ux.actorsCombo= Ext.extend(Ext.form.TriggerField, {
    /**
     * @cfg {Mixed} transform The id, DOM node or element of an existing select to convert to a ComboBox
     */
    /**
     * @cfg {Boolean} lazyRender True to prevent the ComboBox from rendering until requested (should always be used when
     * rendering into an Ext.Editor, defaults to false)
     */
    /**
     * @cfg {Boolean/Object} autoCreate A DomHelper element spec, or true for a default element spec (defaults to:
     * {tag: "input", type: "text", size: "24", autocomplete: "off"})
     */
    /**
     * @cfg {Ext.data.Store} store The data store to which this combo is bound (defaults to undefined)
     */
    /**
     * @cfg {String} title If supplied, a header element is created containing this text and added into the top of
     * the dropdown list (defaults to undefined, with no header element)
     */
    
    // private
    defaultAutoCreate : {tag: "input", type: "text", size: "24",readOnly:true, autocomplete: "off"},
    /**
     * @cfg {Number} listWidth The width in pixels of the dropdown list (defaults to the width of the ComboBox field)
     */
    /**
     * @cfg {String} displayField The underlying data field name to bind to this ComboBox (defaults to undefined if
     * mode = 'remote' or 'text' if transforming a select)
     */
    /**
     * @cfg {String} valueField The underlying data value name to bind to this ComboBox (defaults to undefined if
     * mode = 'remote' or 'value' if transforming a select) Note: use of a valueField requires the user to make a selection
     * in order for a value to be mapped.
     */
    /**
     * @cfg {String} hiddenName If specified, a hidden form field with this name is dynamically generated to store the
     * field's data value (defaults to the underlying DOM element's name). Required for the combo's value to automatically
     * post during a form submission.
     */
    /**
     * @cfg {String} hiddenId If {@link #hiddenName} is specified, hiddenId can also be provided to give the hidden field
     * a unique id (defaults to the hiddenName).  The hiddenId and combo {@link #id} should be different, since no two DOM 
     * nodes should share the same id.
     */
    /**
     * @cfg {String} triggerClass An additional CSS class used to style the trigger button.  The trigger will always get the
     * class 'x-form-trigger' and triggerClass will be <b>appended</b> if specified (defaults to 'x-form-arrow-trigger'
     * which displays a downward arrow icon).
     */
    triggerClass : 'x-form-search-trigger',
    /**
     * @cfg {Boolean/String} shadow True or "sides" for the default effect, "frame" for 4-way shadow, and "drop" for bottom-right
     */
    shadow:'sides',
    resizable: false,
    /**
     * @cfg {Number} handleHeight The height in pixels of the dropdown list resize handle if resizable = true (defaults to 8)
     */
    handleHeight : 8,
    /**
     * @cfg {Boolean} editable False to prevent the user from typing text directly into the field, just like a
     * traditional select (defaults to true)
     */
    editable: false,
    /**
     * @cfg {String} allQuery The text query to send to the server to return all records for the list with no filtering (defaults to '')
     */
    allQuery: '',
    /**
     * @cfg {String} mode Set to 'local' if the ComboBox loads local data (defaults to 'remote' which loads from the server)
     */
    mode: 'remote',
    /**
     * @cfg {Number} minListWidth The minimum width of the dropdown list in pixels (defaults to 70, will be ignored if
     * listWidth has a higher value)
     */
    minListWidth : 70,
    /**
     * @cfg {Boolean} forceSelection True to restrict the selected value to one of the values in the list, false to
     * allow the user to set arbitrary text into the field (defaults to false)
     */
    forceSelection:false,
    /**
     * @cfg {Number} typeAheadDelay The length of time in milliseconds to wait until the typeahead text is displayed
     * if typeAhead = true (defaults to 250)
     */
    typeAheadDelay : 250,
    /**
     * @cfg {String} valueNotFoundText When using a name/value combo, if the value passed to setValue is not found in
     * the store, valueNotFoundText will be displayed as the field text if defined (defaults to undefined)
     */
    
    /**
     * @cfg {Boolean} lazyInit True to not initialize the list for this combo until the field is focused. (defaults to true)
     */
    lazyInit : true,
    
    disabled:false,
    
    readOnly:false,
    
    delevalue:'',
    
    store:{},
    
    columnModel: {},
    
    displayField : 'text',
    
    valueField : 'id',
    
    windowWidth :700,
    
    windowHeight : 370,
    
    searchCondition :[],
    
    singleSelect : false,
    
    fieldMapping : [],
        
    advancedSearch : false,	//高级查询
    
    advancedSC : [],		//高级查询条件
    
    pageSize : 10,
    
    initComponent : function(){
    	this.delevalue = (this.value !== undefined) ? this.initValue(this.value):{value:'',text:''};
    	//this.value = this.delevalue.value;
        Ext.itsm.form.ComboWindow.superclass.initComponent.call(this);
        this.addEvents(
        );
//        if(this.cm){
//        	this.columnModel = this.cm;
//        }
        this.columnModel = new Ext.grid.ColumnModel([
        	new Ext.grid.RowNumberer()
            ,new Ext.grid.CheckboxSelectionModel()
        	,{dataIndex : "id",id : 2,header : "ID",hidden : true}
        	,{dataIndex : "xingMing",id : 3,header : "姓名",sortable : true}
        	,{dataIndex : "username",id : 4,header : "帐号",sortable : true}
        	,{dataIndex : "code",id : 5,header : "员工编号",sortable : true}
        	,{dataIndex : "department",id : 6,header : "部门",sortable : true}
			,{dataIndex : "jobTitle",id : 7,header : "职位",sortable : true}
			,{dataIndex : "phone",id : 8,header : "电话",hidden : true,sortable : true}
			,{dataIndex : "mobile",id : 9,header : "手机",hidden : true,sortable : true}
			,{dataIndex : "email",id : 10,header : "Email",hidden : true,sortable : true}
			,{dataIndex : "online",id : 11,header : "是否在线",sortable : true}
		    ,{dataIndex : "busy",id : 12,header : "事闲、事忙",sortable : true}
		]);
		var scope = this;
		
		this.store = new Ext.data.Store({
			scope : scope,
			sortInfo : {field : 'online',direction : 'DESC'},
			id:'transitionAssignStore'
		    ,proxy:new Ext.data.HttpProxy({"url":"bp/listNextNodeTaskActors.html"})
		    ,baseParams:{"taskInstanceID":scope.taskInstanceID,"leavingTransitonName":scope.transactorsName}
		    ,reader:new Ext.data.JsonReader({
				root : "root",
				totalProperty : "total",
				successProperty : "success",
				fields : [{mapping : "id",type : "string",name : "id"}
					,{mapping : "username",type : "string",name : "username"}
					,{mapping : "code", type : "string",name : "code"}
  					,{mapping : "xingMing",type : "string",name : "xingMing"}
  					,{mapping : "department",type : "string", name : "department",convert : function (val) {if(val&&val.name) return val.name;else return '';}}
  					,{mapping : "jobTitle",type : "string",name : "jobTitle",convert : function (val) {if (val&&val.name) {return val.name;}else '';}}
  					,{mapping : "phone",type : "string",name : "phone"},{mapping : "mobile",type : "string",name : "mobile"}
  					,{mapping : "email",type : "string",name : "email"}
  					,{mapping : "online",type : "string",name : "online", convert : function (val) {if (val) {return "<img style='height:10px' src='styles/default/images/online.gif' title='在线' />";} else {return "<img style='height:10px' src='styles/default/images/offline.gif' title='离线'/>";}}}
  					,{ mapping : "busy",type : "string",name : "busy",convert : function (val) {if (val == "0") return "事闲";else return "事忙";}}
  				]
			})
		});
		this.searchCondition =[['xingMing','姓名','string'],['username','账号','string'],['code','员工编号','string']];
//        if(typeof this.params != 'undefined' && this.params) this.store.load(this.params);
//    	else{
//        	if (this.taskInstanceID&&this.taskInstanceID!='null'&&this.bpiId!='##request#taskInstanceID####') this.store.load({params:{taskInstanceID:this.taskInstanceID,leavingTransitonName:this.leavingTransitonName}});
//        }
        var intiBaseParams = this.store.baseParams||{};
        this.startBaseParams = {};
        for(var i in intiBaseParams){
        	this.startBaseParams[i] = intiBaseParams[i];
        }
    },

    // private
    onRender : function(ct, position){
        Ext.itsm.form.ComboWindow.superclass.onRender.call(this, ct, position);
       	this.hiddenName = this.hiddenName||this.name;
        this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName},
                    'before', true);
        this.hiddenField.value = this.hiddenValue !== undefined ? this.hiddenValue :this.delevalue.value;
        this.el.dom.removeAttribute('name');
        if(Ext.isGecko){
            this.el.dom.setAttribute('autocomplete', 'off');
        }
        this.startValue = this.hiddenField.value;
        //this.buildSearchBar();
        if(this.delevalue && this.delevalue.text&&this.delevalue.value)
        	this.setValue(this.delevalue);
    },


    // private
    initEvents : function(){
        Ext.itsm.form.ComboWindow.superclass.initEvents.call(this);
        this.keyNav = new Ext.KeyNav(this.el, {
            "tab" : function(e){
                return true;
            },
            "enter" : function(e){
            	this.onTriggerClick();
            },
            scope : this
        });
    },

    onDestroy : function(){
        Ext.itsm.form.ComboWindow.superclass.onDestroy.call(this);
    },

    // private
    fireKey : function(e){
        if(e.isNavKeyPress()){
            this.fireEvent("specialkey", this, e);
        }
        
        /** 
         * 	按下Del或者Backspace键时删除完整项 
         *  属性设置如下：
         * 	editable: true,
	     *	enableKeyEvents: true
	     *	added by wangbin
         */
        var w = this;
		if(e.getKey() == Ext.EventObject.BACKSPACE || e.getKey() == Ext.EventObject.DELETE){
            e.preventDefault();										//屏蔽默认事件动作
            var dom = document.getElementById(w.id);				//获取Element对象
            var oldValue = w.getValue();							//初始ids，逗号分隔
            var oldText = w.getRawValue();							//初始text，逗号分隔
            var newValue;
            var newText;
            
			var start = 0;											//选中内容开始字符在字符串中位置
			var end = 0;											//选中内容结束字符在字符串中位置
			
            var valueArr = new Array();								//用数组保存原id集合	
            var textArr = new Array();								//用数组保存原text集合
			valueArr = oldValue.split(',');
			textArr = oldText.split(',');
			
            var sHead;												//从开始到选中字符开始之间的字符串
            var sTail;												//从开始到选中字符结束之间的字符串
            var sEnd;												//从光标位置到整个字符串结束之间的字符串，非拖选
            var pos;												//光标开始位置所在项在整个字符串中位置
            var headArr = new Array();
            var tailArr = new Array();
            
            if(Ext.isIE || Ext.isIE6 || Ext.isIE7){					//计算选中内容的开始和结束位置
	            var range = document.selection.createRange();			//以先保存选区的方式，FF不支持
	            var range_all = dom.createTextRange();  				//包含文本内容的选区，FF不支持
                   
				for (start=0; range_all.compareEndPoints("StartToStart", range) < 0; start++){
				    range_all.moveStart('character', 1);
				}
				var range_all = dom.createTextRange();  
				for (end = 0; range_all.compareEndPoints('StartToEnd', range) < 0; end ++){
					range_all.moveStart('character', 1);
				}
				
            }else{												//还是FireFox够直接
            	start = dom.selectionStart;
            	end = dom.selectionEnd;
            }
            var selectText = oldText.substring(start,end);

        	sHead = oldText.substring(0,start);
        	sTail = oldText.substring(0,end);
        	sEnd  = oldText.substring(start,oldText.length-1);
        	headArr = sHead.split(',');
        	tailArr = sTail.split(',');
        	var mul = tailArr.length - headArr.length;			//是否选中多项
        	
			pos = headArr.length -1;							
			if(selectText.length > 0){							//是否鼠标拖选删除
				if(selectText.charAt(0)== ','){						//如果选中内容以逗号开始，则不删除该逗号的前一项
					pos = headArr.length;
				}
				if(selectText.charAt(selectText.length-1)== ','){	//如果选中内容以逗号结束，则不删除该逗号的紧邻后一项
					mul = mul - 1;
				}
			}else{
				//如果按下退格键
				if(e.getKey() == Ext.EventObject.BACKSPACE ){
					//光标在逗号之后，则删除逗号前一项
					if(sHead.charAt(sHead.length-1)==',')
						pos = pos -1;
					//如果光标在整个字符串的开始位置，则取消退格删除，否则会删除第一项
					if(sHead == '')
						mul = -1;
				}
				//如果按下Del键
				if(e.getKey() == Ext.EventObject.DELETE ){
					//光标在逗号之前，则删除逗号后一项
					if(sEnd.charAt(0)==',')
						pos = pos + 1;
					//如果光标在整个字符串的结束位置，则取消Del删除，否则会删除最后一项
					if(start == oldText.length)
						mul = -1;
						
				}
				
			}
        	
			textArr.splice(pos,1 + mul);						//删除目标text
			newText = textArr.join(',');
			
			valueArr.splice(pos,1 + mul);						//删除目标id
			newValue = valueArr.join(',');						//删除后的ids
			
			w.setValue({value:newValue,text:newText});			//重新赋值

			if(Ext.isIE || Ext.isIE6 || Ext.isIE7){				//恢复初始光标位置，IE依旧麻烦
				var range_all = dom.createTextRange(); 
				range.collapse(true); 
                range.moveStart('character',start); 
                range.select();
			}else{
				dom.selectionStart = start;
				dom.selectionEnd = start;
			}
			         
		}
		/******************** End *****************/
    },

    // private
    onResize: function(w, h){
        Ext.itsm.form.ComboWindow.superclass.onResize.apply(this, arguments);
    },
	/**
 	* ComboWindow由disabled转为enble之后，无法传值，注释掉onDisable方法作为临时解决方案
 	* 
 	* */
    // private
//    onDisable: function(){
//        Ext.itsm.form.ComboWindow.superclass.onDisable.apply(this, arguments);
//        if(this.hiddenField){
//            this.hiddenField.disabled = this.disabled;
//        }
//    },
    /**
     * Returns the currently selected field value or empty string if no value is set.
     * @return {String} value The selected value
     */
    getValue : function(){
    	
        if(this.valueField){
            return typeof this.value != 'undefined' ? this.value : '';
        }else{
            return Ext.itsm.form.ComboWindow.superclass.getValue.call(this);
        }
    },
    getSelectedRowByKey:function(key){
   
    	if(!this['selectedRow']) return null;
    	
    	return this['selectedRow'].data[key];
    },

    /**
     * Clears any text/value currently set in the field
     */
    clearValue : function(){
        if(this.hiddenField){
            this.hiddenField.value = '';
        }
        this.setRawValue('');
        this.lastSelectionText = '';
        this.applyEmptyText();
    },

    /**
     * Sets the specified value into the field.  If the value finds a match, the corresponding record text
     * will be displayed in the field.  If the value does not match the data value of an existing item,
     * and the valueNotFoundText config option is defined, it will be displayed as the default field text.
     * Otherwise the field will be blank (although the value will still be set).
     * @param {String} value The value to match
     */
    setValue : function(v,selections){
      if (typeof v == 'function') {
    		v.call(this,function(v,selections){this.setValue(v,selections)}.createDelegate(this), this);
    	}else{
    		v = this.initValue(v);
	        var text = v.text;
	        this.lastSelectionText = text;
	        Ext.itsm.form.ComboWindow.superclass.setValue.call(this, text);
	        if(this.hiddenField){
	            this.hiddenField.value = v.value;
	        }
	        this.hiddenValue = this.value;
	        this.value = v.value;
	        if(String(this.value) !== String(this.startValue)){
	            this.fireEvent('change', this, this.value, this.startValue,selections);
	            this.startValue = this.value;
	        }
    	}
    },

    // private
    validateBlur : function(){
        return !this.value;   
    },

    // private
    // Implements the default empty TriggerField.onTriggerClick function
    // disabled,readOnly为true时不触发事件
    onTriggerClick : function(){
    	if(this.disabled == true || this.readOnly == true)return;
    	var v = this.showWin;
    	this.setValue(v);
        
    },
    showWin : function(callback) {
    	
    	var scope = this; 
    	
    	var nwin;
    	var valueField = this.valueField?this.valueField:'id';
    	var displayField = this.displayField?this.displayField:'text';
    	this.store.baseParams = {};
    	Ext.apply(this.store.baseParams , this.startBaseParams);
    	//this.store.load({params:{start:0,limit:this.pageSize}});
		this.sm =  new Ext.grid.CheckboxSelectionModel({singleSelect:this.singleSelect });
	    var singleSelect = this.singleSelect;
	     
	    /**
	     * updated by wangbin
	     * 翻页多选，属性设置：singleSelect：false
	     * 
	     */
	    var afterArr = new Array();
		this.sm.on('rowselect',function(sm,rowIndex,record){
			if(!this.singleSelect){
				for(var i = 0 ;i < afterArr.length;i++){
					if(afterArr[i].data[valueField] == record.data[valueField])
						afterArr.splice(i,1);
						
				}
				afterArr.push(record);
			}
		},this);
		this.sm.on('rowdeselect',function(sm,rowIndex,record){
			if(!this.singleSelect){
				for(var i = 0 ;i < afterArr.length;i++){
					if(afterArr[i].data[valueField] == record.data[valueField]){
						afterArr.splice(i,1);
					}
				}
			}
		},this);
		this.store.on('load',function(store){
			if(!this.singleSelect){
				var tempArr = new Array();
				store.each(function(rec) {   
					for(var i = 0; i < afterArr.length;i++){
						if(rec.data[valueField] == afterArr[i].data[valueField])
							tempArr.push(rec);
					}
				});  
				scope.sm.selectRecords(tempArr);
			}
		},this);
	    
	    /*************end***********/	
		//高级查询面板
		var searchPanel = new Ext.Panel({
			id: '_search_panel_window',
			autoHeight: true,
			autoWidth: true  ,
			hidden: true,
			frame: false,
			bodyStyle: 'padding:5px 5px 0',
			layout: 'column',
			buttons: [{
				text: '查询',
				store: this.store,
				handler: function(){
					Ext.getCmp('messageField').reset();		//清空快速查询条件
					var json = '{';
					var length = searchPanel.items.length;
					
					for(var i = 0;i < length;i++){
						var name = searchPanel.items.items[i].items.first().name;
						var value = searchPanel.items.items[i].items.first().getValue();
						json += name+':"'+value+'"';
						if(i != length -1){
							json += ',';
						}
					}
					json += '}';
					var params = Ext.util.JSON.decode(json);
					Ext.apply(Ext.StoreMgr.lookup(this.store).baseParams,params);
					Ext.StoreMgr.lookup(this.store).load({
						params : {
							start : 0,
							limit : 10
						}
					});
				}
			},{
				text: '取消',
				handler: function(){
					var length = searchPanel.items.length;
					for(var i = 0;i < length;i++){
						searchPanel.items.items[i].items.first().reset();
					}
					searchPanel.hide();
				}
			}]
		});
		//根据高级查询条件，生成高级查询面板
		if(this.advancedSC){
			var _adsearch_field_store = new Ext.data.Store({
				reader : new Ext.data.ArrayReader({}, [{
					name : '_field_value'
				}, {
					name : '_field_rawvalue'
				}, {
					name : '_field_type'
				}])
			});
			_adsearch_field_store.loadData(this.advancedSC);
			var total = _adsearch_field_store.getCount();
			for(var i = 0 ;i < total;i++){
				var rec = _adsearch_field_store.getAt(i);
				if(rec.get('_field_rawvalue') && rec.get('_field_value'))
					if(rec.get('_field_type') == 'date')			//日期类型检索条件
				    	searchPanel.add({columnWidth:0.5, layout:'form', border:false,defaultType:'textfield', 
				        	items:[{xtype:'datefield',fieldLabel:rec.get('_field_rawvalue'), name:rec.get('_field_value'), anchor:'98%',allowBlank:true}]
				        });
				    else
						searchPanel.add({columnWidth:0.5, layout:'form', border:false,defaultType:'textfield', 
				        	items:[{fieldLabel:rec.get('_field_rawvalue'), name:rec.get('_field_value'), anchor:'98%',allowBlank:true}]
				        });
			}
		}
    	if(this.window){
    		nwin = this.window;
    	}else{
    		this.pagingConfig = this.pagingConfig?this.pagingConfig:{pageSize : this.pageSize,store : this.store,displayInfo : true,displayMsg : "显示第 {0} 条到 {1} 条记录，一共 {2} 条",emptyMsg :'<b>0</b> 条记录'};
			nwin = new Ext.Window({
				title : '选择',
				modal : true,
				resizable: false,//update by xiejian 固定窗口大小
				tbar: this.buildSearchBar(),
				autoHeight: true,
//				height : this.windowHeight,
				width : this.windowWidth,
				closeAction : 'close',
				buttonAlign : 'center',
				layout: 'fit',
				plan : true,
				items:[searchPanel,{
					xtype : "grid",
					viewConfig : {forceFit : true},
					frame : false,
					height: 265,
					autoScroll : true,
					store : this.store,
					cm : this.columnModel,
					sm : this.sm,
					bbar: new Ext.PagingToolbar(this.pagingConfig),
					loadMask: true,
					singleSelect : this.singleSelect,
					fieldMapping : this.fieldMapping,
					border : false,
					listeners:{'rowdblclick':function(grid,rowInx){
						var selectedRow; 
						var text = '';
						var value = '';
						
						if(this.singleSelect){
							selectedRow = nwin.items.items[1].getSelectionModel().getSelected();
							if(!selectedRow){
								Ext.Msg.alert('提示','请选择记录！');
								return ;
							}
    						if(Ext.isArray(this.fieldMapping) && selectedRow){
							    var s = new Ext.data.Store({
							    	reader: new Ext.data.ArrayReader({}, [
							               {name: '_field'},
							               {name: '_value'}
							               ]
							          )
							         
						          });  
    							s.loadData(this.fieldMapping);
    							for(var i = 0;i<s.getCount();i++){
    								var rec = s.getAt(i);
    								if(document.getElementById(rec.get('_field')) && selectedRow.get(rec.get('_value')) !== undefined ){
										try{
	    									document.getElementById(rec.get('_field')).value = selectedRow.get(rec.get('_value'));
	    								}catch(e){
	    									
	    								}
    								}else if(document.getElementsByName(rec.get('_field'))&&document.getElementsByName(rec.get('_field'))[0] && selectedRow.get(rec.get('_value')) !== undefined ){
    									try{
	    									document.getElementsByName(rec.get('_field'))[0].value = selectedRow.get(rec.get('_value'));
	    								}catch(e){
	    									
	    								}
    								}
    							}
    							text = selectedRow.get(displayField);
	    						value = selectedRow.get( valueField);
    						}
						}else{
							selectedRow = nwin.items.items[1].getSelectionModel().getSelections();
							for(var i in selectedRow){
			    				if(selectedRow[i]&&(typeof selectedRow[i] !== 'undefined')&&selectedRow[i].data){
			    					if(i>0){
			    						text += ',' + eval('selectedRow[i].data.'+ displayField);
			    						value += ',' + eval('selectedRow[i].data.'+ valueField);
			    					}else{
			    						text += eval('selectedRow[i].data.'+ displayField);;
			    						value += eval('selectedRow[i].data.'+ valueField);
			    					}
			            		}
		        		}
						}
						
						var p = {value:value,text:text};
						nwin.close();
						callback.call(this, p,nwin.items.items[1].getSelectionModel().getSelections());
						}
					}
				}],
				buttons : [ {
					text : '确定',
					singleSelect : this.singleSelect,
					fieldMapping : this.fieldMapping,
					handler : function() {
						var selectedRow; 
						var text = '';
						var value = '';
						
						if(this.singleSelect){
							selectedRow = nwin.items.items[1].getSelectionModel().getSelected();
							if(!selectedRow){
								Ext.Msg.alert('提示','一条数据未选中！');
								return ;
							}
    						if(Ext.isArray(this.fieldMapping) && selectedRow){
							    var s = new Ext.data.Store({
							    	reader: new Ext.data.ArrayReader({}, [
							               {name: '_field'},
							               {name: '_value'}
							               ]
							          )
							         
						          });  
    							s.loadData(this.fieldMapping);
    							for(var i = 0;i<s.getCount();i++){
    								var rec = s.getAt(i);
    								if(document.getElementById(rec.get('_field')) && selectedRow.get(rec.get('_value')) !== undefined ){
										try{
	    									document.getElementById(rec.get('_field')).value = selectedRow.get(rec.get('_value'));
	    								}catch(e){
	    									
	    								}
    								}else if(document.getElementsByName(rec.get('_field'))&&document.getElementsByName(rec.get('_field'))[0] && selectedRow.get(rec.get('_value')) !== undefined ){
    									try{
	    									document.getElementsByName(rec.get('_field'))[0].value = selectedRow.get(rec.get('_value'));
	    								}catch(e){
	    									
	    								}
    								}
    							}
    							text = selectedRow.get(displayField);
	    						value = selectedRow.get( valueField);
    						}
						}else{
//							selectedRow = nwin.items.first().getSelectionModel().getSelections();
							selectedRow = afterArr;
//							for(var m = 0 ;m < selectedRow.length;m++){
//								for(var n = selectedRow.length-1;n >m;n--){
//									if (selectedRow[m].data[valueField] == selectedRow[n].data[valueField]) {
//							              selectedRow.splice(n, 1);  
//							        }
//			
//								}
//							}
							for(var i in selectedRow){
			    				if(selectedRow[i]&&(typeof selectedRow[i] !== 'undefined')&&selectedRow[i].data){
			    					if(i>0){
			    						text += ',' + eval('selectedRow[i].data.'+ displayField);
			    						value += ',' + eval('selectedRow[i].data.'+ valueField);
			    					}else{
			    						text += eval('selectedRow[i].data.'+ displayField);;
			    						value += eval('selectedRow[i].data.'+ valueField);
			    					}
			            		}
		        		}
						}
						
						if(this.singleSelect){
							selectedRow = nwin.items.items[1].getSelectionModel().getSelected();
							if(selectedRow){
//							    var record = nwin.items.items[0].store.getAt(selectedRow);
						  		scope['selectedRow'] = selectedRow;
							}
						}

						nwin.close();
						
						var p = {value:value,text:text};
						callback.call(this, p,nwin.items.items[1].getSelectionModel().getSelections());
					}
				},
				{
					text : '取消',
					handler : function() {
						nwin.close();
					}
				}
				]
			});
	    	}
		nwin.show();
		Ext.getCmp('messageField').focus(true,100);
		this.store.removeAll();
		this.store.load({params:{start:0,limit:this.pageSize}});
	},
    buildSearchBar : function(){
    	//TODO reset '_search_join_store' and '_search_condition' accordding to the value of _search_field
    	if (this.searchCondition) {
			var _search_field_store = new Ext.data.Store({
				reader : new Ext.data.ArrayReader({}, [{
					name : '_field_value'
				}, {
					name : '_field_rawvalue'
				}, {
					name : '_field_type'
				}])
			});
			_search_field_store.loadData(this.searchCondition);
			
			var gridStor = this.store;

			var searchFieldCb = new Ext.form.ComboBox({
				xtype : 'combo',
				hideLabel : true,
				anchor : '-18',
				forceSelection : true,
				triggerAction : 'all',
				store : _search_field_store,
				value : _search_field_store.getAt(0).get('_field_value')
						? _search_field_store.getAt(0).get('_field_value')
						: '',
				valueField : '_field_value',
				displayField : '_field_rawvalue',
				mode : 'local',
				listeners : {
					'change':function (cb,n,o) {
						//设置之前选择的条件为空
						var p = Ext.StoreMgr.lookup(gridStor).baseParams;
			            for (var i in p) {
							if(i == o) eval("p."+i+"=null");
			            }
					}
				}
			});
			
			var searchConditionTf = new Ext.form.TextField({
				id:'messageField',
				hideLabel : true,
				store : this.store,
				listeners:{   
            		specialkey:function(field,e){   
                		if (e.getKey()==Ext.EventObject.ENTER){ 
					var searchField = searchFieldCb.getValue();
					var searchValue = searchConditionTf.getValue();
					if (searchField && searchValue) {
						var params = "{" + searchField + ":'" + searchValue + "'}";
						params = Ext.util.JSON.decode(params);
						Ext.apply(Ext.StoreMgr.lookup(this.store).baseParams,params);
						Ext.StoreMgr.lookup(this.store).load({
							params : {
								start : 0,
								limit : 10
							}
						});
					}
                		}   
            		}
            	}  
			});
			
			//高级检索按钮
    		var asButton = {
				text : '高级检索',
				xtype : 'tbbutton',
				iconCls: 'search-icon',
				store : this.store,
				handler : function(){
					//显示高级查询面板
					var sp = Ext.getCmp('_search_panel_window')
					if(sp){
						sp.show();
						sp.doLayout();
						sp.ownerCt.doLayout();
					}
				}
			};
			return ['->', {
				xtype : 'tbtext',
				text : '按条件检索: '
			}, searchFieldCb, {
				xtype : 'tbtext',
				text : '包含'
			}, searchConditionTf, {
				text : '检索',
				xtype : 'tbbutton',
				iconCls: 'search-icon',
				store : this.store,
				handler : function() {
					//隐藏高级查询面板
					var sp = Ext.getCmp('_search_panel_window')
					if(sp){
						var length = sp.items.length;
						for(var i = 0;i < length;i++){
							sp.items.items[i].items.first().reset();
						}
						sp.hide();
					}
					var searchField = searchFieldCb.getValue();
					var searchValue = searchConditionTf.getValue();
					if (searchField && searchValue) {
						var params = "{" + searchField + ":'" + searchValue + "'}";
						params = Ext.util.JSON.decode(params);
//						this.store.baseParams = {};					//清空高级查询遗留参数
						Ext.apply(Ext.StoreMgr.lookup(this.store).baseParams,params);
						Ext.StoreMgr.lookup(this.store).load({
							params : {
								start : 0,
								limit : 10
							}
						});
					}
				}
			}
			,this.advancedSearch ? asButton : {xtype:'tbspacer'}	// 判断是否需要高级查询
			/**update by xiejian fvsd-770提出的bug加一个"显示全部"按钮 BEGIN*/
			,{
				text : '显示全部',
				xtype : 'tbbutton',
				store : this.store,
				iconCls: 'view-all-icon',
				startBaseParams: this.startBaseParams,
				handler: function(){
					this.store.baseParams = {};
    				Ext.apply(this.store.baseParams , this.startBaseParams);
					Ext.StoreMgr.lookup(this.store).load({
						params : {
							start : 0,
							limit : 10
						}
					});
				}
			}
			/*** 加一个"显示全部"按钮 END*/
			];
		}else{
			return '';
		}
    },
    initValue : function(v){
    	var ret = v;
    	if(v&&typeof(v)=='string')
    			ret = Ext.util.JSON.decode(v);  
    	return ret;
    }

});
Ext.reg('actorsCombo', Ext.ux.actorsCombo);