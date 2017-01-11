/**
 * @description : 创新人才管理
 * @date : 2015-03-09 15:39:36
 * @author : WangYG
 */

Ext.lion.rpms.ResearchTalentManager = function(config) {
	Ext.apply(this, config);
	Ext.lion.rpms.ResearchTalentManager.superclass.constructor.call(this);
	this.myMask = new Ext.LoadMask(Ext.getBody(), {
				msg : '正在导入数据，这可能需要几分钟，请耐心等待......！',
				removeMask : true
			});
};

Ext.extend(Ext.lion.rpms.ResearchTalentManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
					'showedit' : {
						fn : function() {
							this.updateImage('edit');
						},
						scope : this
					},
					'showview' : {
						fn : function() {
							this.updateImage('view');
						},
						scope : this
					},
					'beforeedit' : {
						fn : this.isEditable,
						scope : this
					},
					'beforeview' : {
						fn : this.isViewable,
						scope : this
					}
				});

		this.dataGrid.on('celldblclick', function() {
					this.viewObject();
				}, this);

		this.listPlatTree.items.items[0].on('click', this.onPlatTreeClick, this);
	},
	
	   /*
     * 单击左侧平台树方法 (只传入当前树节点的platId)
     */
    onPlatTreeClick : function(node, e) {
        this.clearQuery(this.queryForm, this.dataGrid, false);
        var params = {
            platId : node.id
        };
        Ext.apply(this.dataGrid.store.baseParams, params);
        this.dataGrid.store.reload();
    },
   /*onPlatTreeClick : function(node, e) {
        if(node.parentNode.parentNode ===null){  //如果为分中心
            this.queryForm.findField("platCenter.id").setValue({value:node.id,text:node.text});
            this.queryForm.findField("platInstitution.id").clearValue();
        } else {
            this.queryForm.findField("platCenter.id").setValue({value:node.parentNode.id,text:node.parentNode.text});
            this.queryForm.findField("platInstitution.id").setValue({value:node.id,text:node.text});
        }
        this.query();
    },*/
	
	/**
	 * excel导出
	 * @param {} G
	 * @param {} C
	 * @param {} I
	 */
	exportData : function(G, C, I) {
		var manager = this;
		var A = G;
		if (A.querySql) {
			window.open("system/exportData.html?" + Ext.urlEncode(A));
			return
		}
		var _ = {};
		if (A.isLine && A.isLine == true) {
			if (!C) {
				Ext.MessageBox.show({
							title : "提示",
							msg : "子表导出时请传入子表列表对象！",
							buttons : Ext.MessageBox.OK,
							fn : function() {
							},
							icon : Ext.MessageBox.WARNING,
							scope : this
						});
				return
			}
			if (I) {
				var E = C.store.baseParams.queryFields, F = C.store.baseParams.operatorValues, $ = C.store.baseParams.fieldValues;
				_ = this.getQueryCondition(I, E, F, $)
			} else
				Ext.apply(_, C.store.baseParams)
		} else {
			if (!C)
				C = this.dataGrid;
			if (!I)
				I = this.queryForm;
			E = C.store.baseParams.queryFields, F = C.store.baseParams.operatorValues, $ = C.store.baseParams.fieldValues;
			_ = this.getQueryCondition(I, E, F, $)
		}
		if (!A.viewPath)
			A.viewPath = C.viewPath;
		var D = Ext.create({
					xtype : "lioneditorgrid",
					viewPath : A.viewPath,
					editable : false,
					allowPage : true,
					showLookButton : false,
					showEditButton : false,
					showCopyButton : false,
					showDeleteButton : false,
					height : 500
				});
		_.limit = FW.pageSize;
		if (_.queryFields && _.queryFields.length == 0) {
			delete _.queryFields;
			delete _.operatorValues;
			delete _.fieldValues
		}
		Ext.apply(D.store.baseParams, _);
		Ext.apply(A, D.store.baseParams);
		var B = this.getGridColumnInfo(D);
		if (B.propertys.length > 0)
			Ext.apply(A, B);

		var H = this.addToWin(D, {
					title : "导出预览",
					width : 1000,
					height : 563,
					buttonAlign : "center",
					buttons : [{
								text : "整页导出",
								iconCls : "confirm-icon",
								handler : function() {
									delete A.limit;
									//console.log(Ext.urlEncode(A));
									manager.openPostWindow("system/exportData.html", A)
									// window.open("system/exportData.html?" +
									// Ext.urlEncode(A));
									H.close()
								}
							}, {
								text : "分页导出",
								iconCls : "confirm-icon",
								handler : function() {
									A.start = D.toolbars[0].cursor;
									A.limit = D.store.baseParams.limit;
									manager.openPostWindow("system/exportData.html", A)
									// window.open("system/exportData.html?" +
									// Ext.urlEncode(A));
									H.close()
								}
							}, {
								text : "取消",
								iconCls : "close-icon",
								handler : function() {
									H.close()
								}
							}]
				})
	},
	
	openPostWindow : function(url, data, name) {
		var manager = this;
		var tempForm = document.createElement("form");

		tempForm.id = "tempForm1";

		tempForm.method = "post";

		tempForm.action = url;

		tempForm.target = name;
		for (var p in data) {
			if (p == "headers" 
				|| p == "keyTypes" 
				|| p == "queryFields" 
				|| p == "operatorValues" 
				|| p == "fieldValues" 
				|| p == "propertys") {
				continue;
			}
			var hideInput = document.createElement("input");
			hideInput.type = "hidden";
			hideInput.name = p;
			hideInput.value = data[p];
			tempForm.appendChild(hideInput);
		}

		var headers = data.headers;
		var keyTypes = data.keyTypes;
		var propertys = data.propertys;
		var queryFields = data.queryFields;
		var operatorValues = data.operatorValues;
		var fieldValues = data.fieldValues;
		manager.addFields(tempForm,propertys,"propertys");
		manager.addFields(tempForm,keyTypes,"keyTypes");
		manager.addFields(tempForm,headers,"headers");
		manager.addFields(tempForm,queryFields,"queryFields");
		manager.addFields(tempForm,operatorValues,"operatorValues");
		manager.addFields(tempForm,fieldValues,"fieldValues");
		//console.log(tempForm);
		document.body.appendChild(tempForm);

		//兼容
		if (document.all) {
			tempForm.fireEvent("onsubmit");
		} else {
			var evt = document.createEvent('HTMLEvents');
			evt.initEvent('onsubmit', true, true);
			tempForm.dispatchEvent(evt);
		}

		tempForm.submit();

		document.body.removeChild(tempForm);
	},
	
	addFields:function(form,data,name){
		if(typeof(data) == "undefined" || data == null){
			return;
		}
		for (var i = 0; i < data.length; i++) {

			var hideInput = document.createElement("input");

			hideInput.type = "hidden";

			hideInput.name = name;

			hideInput.value = data[i];

			form.appendChild(hideInput);
		}
	},

	isViewable : function() {
		var records = this.dataGrid.getSelections(true);
		if (records.length <= 0) {
			Ext.MessageBox.alert("提示", "请选择要查看的记录");
			return false;
		} else if (records.length > 1) {
			Ext.MessageBox.alert("提示", "一次只能查看一条记录");
			return false;
		}
		return true;
	},
	isEditable : function() {
		var records = this.dataGrid.getSelections(true);
		if (records.length <= 0) {
			Ext.MessageBox.alert("提示", "请选择要编辑的记录");
			return false;
		} else if (records.length > 1) {
			Ext.MessageBox.alert("提示", "一次只能编辑一条记录");
			return false;
		}
		return true;
	},
	/*
	 * 更新图片显示路径
	 */
	updateImage : function(optionType) {
		this.editForm.on("load", function(e) {
			var talentPhotoField = this.editForm.findField('talentPhoto');
			var imageField = talentPhotoField.ownerCt.PhotoView;
			var buttonField = talentPhotoField.ownerCt.photoButton;
			if (optionType == 'view')
				buttonField.disabled = true;
			if (talentPhotoField.value && talentPhotoField.value != 'undefined'
					&& talentPhotoField.value != 'null'
					&& talentPhotoField.value != '') {
				imageField.autoEl.html = "<img style='width:160px;height:180px' src='base/showPhoto.html?path="
						+ talentPhotoField.value + "'/>";
				imageField.el.dom.innerHTML = "<img style='width:160px;height:180px' src='base/showPhoto.html?path="
						+ talentPhotoField.value + "'/>";
			}
		}, this);
	}
});
