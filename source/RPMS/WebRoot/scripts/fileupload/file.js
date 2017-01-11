Ext.lion.LionUpLoadFileLook = function (C) {
	Ext.apply(this, C);
	var A = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : "system/listDocument.html",
				method : "post"
			}),
			autoLoad : this.fkId,
			baseParams : {
				limit : this.pageSize > 0 ? this.pageSize : 2000,
				userLimit : false
			},
			reader : new Ext.data.JsonReader({
				root : "root",
				totalProperty : "total",
				successProperty : "success"
			}, [{
						name : "id",
						mapping : "id",
						type : "string"
					}, {
						name : "docName"
					}, {
						name : "docDownloadName"
					}, {
						name : "loadIp",
						mapping : "loadIp"
					}, {
						name : "docType",
						mapping : "docType"
					}, {
						name : "createTime",
						mapping : "createTime",
						type : "string"
					}, {
						name : "createUser.id",
						mapping : "createUser.id"
					}, {
						name : "createUser.userName",
						mapping : "createUser.userName"
					}, {
						name : "modifyUser.id",
						mapping : "modifyUser.id"
					}, {
						name : "modifyTime",
						mapping : "modifyTime"
					}, {
						name : "docDescription",
						mapping : "docDescription",
						type : "string"
					}, {
						name : "docFk",
						mapping : "docFk",
						type : "string"
					}, {
						name : "docSize",
						mapping : "docSize",
						type : "string",
						renderer : function ($) {
							var _ = ($ / 1024).toFixed(2);
							return _ + "KB"
						}
					}, {
						name : "docPath",
						mapping : "docPath",
						type : "string"
					}
				])
		});
	if (!this.fkId)
		this.fkId = Uuid.id();
	var D = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
	B = new Ext.lion.LionRowExpander({
			tpl : new Ext.Template("<span>", D + "描述" + ": {docDescription}<br>", "</span>")
		}),
	$ = new Ext.grid.CheckboxSelectionModel(),
	_ = new Ext.grid.ColumnModel([$, new Ext.grid.RowNumberer(), B, {
					header : "附件id",
					hidden : true,
					dataIndex : "id"
				}, {
					header : "文件名",
					dataIndex : "docDownloadName",
					renderer : function ($) {
						if ($) {
							var _ = $.substring($.lastIndexOf(".") + 1);
							if ("7z,accdb,ai,avi,bmp,cs,default,dll,doc,docx,dwg,exe,fla,gif,htm,html,ico,jpeg,jpg,js,mdb,mp3,pdf,png,ppt,pptx,rar,rdp,swf,swt,txt,vsd,xls,xlsx,xml,zip".indexOf(_) < 0)
								_ = "default";
							return "<img src='images/fileicon/" + _ + ".gif' height='16'' align='absmiddle'/>&nbsp;" + $
						}
					}
				}, {
					header : "文件类型",
					width : 60,
					dataIndex : "docType",
					renderer : function ($) {
						if ($ && $.typeName)
							return $.typeName
					}
				}, {
					header : "上传人",
					width : 70,
					dataIndex : "createUser.userName"
				}, {
					header : "上传时间",
					width : 100,
					dataIndex : "createTime"
				}, {
					header : "文件大小",
					width : 70,
					dataIndex : "docSize",
					renderer : function ($) {
						var _ = ($ / 1024).toFixed(2);
						return _ + "KB"
					}
				}, {
					header : "文件描述",
					dataIndex : "docDescription"
				},{
					header : "预览",
					xtype:'actioncolumn',
					dataIndex : "operation",
					icon:'images/cmdb/sacm-qucikSearch.gif',
					width : 40,
					hidden : !this.allowDownload,
					sortable : false,
					scope : this,
					handler: function(grid, rowIndex, colIndex) {
                        var docId = this.store.getAt(rowIndex).get('id');
                        var wmsg = Ext.Msg.wait('请稍等，正在为您生成预览文档…','提示');
                        Ext.Ajax.request({
                        	url:'rpms/previewDoc.html',
                        	params:{docId:docId},
                        	success: function(response, opts) {
                        		  wmsg.hide();
							      var obj = Ext.decode(response.responseText);
							      if(obj.success){
							      		new Ext.Window({
							      			title:obj.fileName,
							      			width:900,
							      			height:500,
							      			modal:true,
							      			autoScroll:true,
							      			html:obj.isImg?'<img src="'+obj.docViewPath+'"/>':null,
							      			listeners:{
							      				show:function(){
							      					if(!obj.isImg){
								      					this.getUpdater().update({
								      						url:obj.docViewPath
								      					})
							      					}
							      				}
							      			}
							      		}).show();
							      } else {
							      		Ext.Msg.alert('提示',obj.msg);
							      }
						  	 },
					  	   failure: function(response, opts) {
					  	   	  wmsg.hide();
						      Ext.Msg.alert('提示','出现错误，错误码:'+response.status);
						   }
	                    })
                    }
				},{
					header : "下载",
					dataIndex : "operation",
					width : 40,
					hidden : !this.allowDownload,
					sortable : false,
					scope : this,
					renderer : function (_, F, $, D, B, A) {
						var E = $.get("id"),
						C = "";
						if (this.allowDownload)
							C = "<a href='system/downloadDocument.html?id=" + E + "'><img src='images/cmdb/download_file.gif' alt='下载' onclick='javascript:isRefresh = true;'></a>";
						return C
					}
				}
			]);
	Ext.lion.LionUpLoadFileLook.superclass.constructor.call(this, {
		store : A,
		sm : $,
		cm : _,
		plugins : B,
		tbar : ["->", {
				text : this.addAtcText,
				iconCls : "upload-icon",
				hidden : !this.allowUpload,
				handler : this.upLoadFile,
				scope : this
			}, "-", {
				text : this.delAtcText,
				iconCls : "delete-selected-icon",
				hidden : !this.allowDelete,
				handler : function () {
					this.delRecords()
				},
				scope : this
			}, "-", {
				text : this.captureText,
				iconCls : "upload-icon",
				hidden : !this.allowCapture,
				handler : function () {
					this.capture()
				},
				scope : this
			}
		],
		bbar : this.pageSize > 0 ? new Ext.lion.LionPagingToolbar({
			store : A,
			pageSize : this.pageSize
		}) : null
	});
	this.getStore().on("beforeload", function ($, _) {
		Ext.apply(this.getStore().baseParams, {
			queryFields : ["obj.docFk"],
			operatorValues : ["="],
			fieldValues : [this.fkId]
		})
	}, this)
};
Ext.extend(Ext.lion.LionUpLoadFileLook, Ext.grid.GridPanel, {
	autoScroll : true,
	border : true,
	height : 230,
	pageSize : 0,
	autoHeight : false,
	allowUpload : true,
	allowDelete : true,
	allowDownload : true,
	allowCapture : false,
	addAtcText : "上传附件",
	delAtcText : "删除附件",
	captureText : "高拍仪上传",
	fkId : Uuid.id(),
	uploadPath : "",
	upLoadFile : function ($) {
		this.upLoadWin = new Ext.lion.LionUpLoadWindow({
				upLoadGrid : this,
				fkId : this.fkId,
				uploadPath : this.uploadPath
			});
		this.upLoadWin.show()
	},
	capture : function () {
		this.upLoadPic = new Ext.lion.LionUpLoadPicture({
				upLoadGrid : this,
				fkId : this.fkId,
				uploadPath : this.uploadPath
			});
		this.upLoadPic.show()
	},
	delRecord : function ($) {
		this.getStore().remove($)
	},
	delRecords : function () {
		var _ = this.getSelectionModel().getSelections();
		if (_.length <= 0)
			Ext.MessageBox.show({
				title : "提示",
				msg : "请先选择记录！",
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO
			});
		else {
			var $ = "",
			A = "条";
			if (_.length > 1)
				A = "<font color=\"red\"> " + _.length + " </font>" + A;
			Ext.MessageBox.minWidth = 230;
			Ext.MessageBox.confirm("提示", "确定要删除这" + A + "记录吗？", function (A) {
				if (A == "yes") {
					for (var B = 0; B < _.length; B = B + 1) {
						$ += "" + _[B].get("id") + ",";
						this.delRecord(_[B])
					}
					$ = $.substring($, $.length - 1);
					Ext.Ajax.request({
						url : "system/deleteDocument.html",
						method : "POST",
						waitTitle : "请稍等",
						waitMsg : "删除中.....",
						params : {
							ids : $
						},
						success : function ($, B) {
							var _ = Ext.util.JSON.decode($.responseText || "{}"),
							A = _.msg || "<br>";
							if (_.success)
								Ext.MessageBox.show({
									title : "提示",
									msg : "删除成功！" + A,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.INFO
								});
							else
								Ext.MessageBox.show({
									title : "提示",
									msg : "删除失败！" + A,
									buttons : Ext.MessageBox.OK,
									fn : function () {},
									icon : Ext.MessageBox.WARNING,
									scope : this
								})
						},
						failure : function () {
							var $ = json.msg || "<br>";
							Ext.MessageBox.show({
								title : "提示",
								msg : "删除失败！" + $,
								buttons : Ext.MessageBox.OK,
								fn : function () {},
								icon : Ext.MessageBox.WARNING,
								scope : this
							})
						}
					})
				}
			}, this);
			Ext.MessageBox.minWidth = 100
		}
	},
	getFieldName : function ($) {
		if (this.objectName)
			$ = this.objectName + "." + $;
		return $
	}
});
Ext.lion.LionUpLoadWindow = function (_) {
	Ext.apply(this, _);
	if (!this.fileTypeParent && this.upLoadGrid && this.upLoadGrid.fileTypeParent)
		this.fileTypeParent = this.upLoadGrid.fileTypeParent;
	var $ = new Ext.lion.LionComboBoxTree({
			hidden : false,
			fieldLabel : "文件类型",
			allowBlank : false,
			hiddenName : "document.docType.id",
			hiddenDisplayName : "document.docType.typeName",
			anchor : "98%",
			tree : {
				loader : new Ext.tree.TreeLoader({
					dataUrl : "system/listDocumentTypeTree.html",
					baseParams : this.fileTypeParent ? {
						parentId : this.fileTypeParent
					}
					 : {}

				}),
				root : new Ext.tree.AsyncTreeNode({
					id : "root",
					text : "所有类型 "
				})
			},
			selectNodeModel : "exceptRoot"
		});
	this.upLoadForm = new Ext.FormPanel({
			fileUpload : true,
			autoScroll : true,
			bodyStyle : "padding:5px 5px 5px 5px",
			labelWidth : 70,
			labelAlign : "right",
			defaultType : "liontextfield",
			items : [{
					fieldLabel : "业务id",
					hidden : true,
					allowBlank : false,
					name : "document.docFk",
					value : this.fkId
				}, {
					fieldLabel : "上传地址",
					hidden : true,
					name : "document.docPath",
					value : this.uploadPath
				}, {
					anchor : "98%",
					fieldLabel : "文件名",
					inputType : "file",
					name : "fileObject",
					allowBlank : false
				}, $, {
					fieldLabel : "描述",
					xtype : "textarea",
					maxLength : "200",
					height : 120,
					name : "document.docDescription",
					anchor : "98%"
				}
			]
		});
	Ext.lion.LionUpLoadWindow.superclass.constructor.call(this, {
		title : "上传附件",
		width : 400,
		closable : true,
		constrain : true,
		buttonAlign : "center",
		closeAction : "close",
		resizable : false,
		modal : true,
		typeOfWin : "attachments",
		items : [this.upLoadForm],
		buttons : [{
				text : "上传",
				iconCls : "upload-icon",
				width : 60,
				handler : this.save,
				scope : this
			}, {
				text : "关闭",
				iconCls : "close-icon",
				width : 60,
				handler : this.closeWin,
				scope : this
			}
		]
	});
	this.on("show", function () {
		if (this.fileTypeId)
			$.setValue({
				value : this.fileTypeId,
				text : this.fileTypeText
			});
		else if (this.upLoadGrid)
			if (this.upLoadGrid.fileTypeId)
				$.setValue({
					value : this.upLoadGrid.fileTypeId,
					text : this.upLoadGrid.fileTypeText
				})
	}, this)
};
Ext.extend(Ext.lion.LionUpLoadWindow, Ext.Window, {
	closeWin : function () {
		this.upLoadForm.getForm().reset();
		this.close()
	},
	save : function () {
		if (this.upLoadForm.form.isValid())
			this.upLoadForm.form.submit({
				url : this.upLoadUrl ? this.upLoadUrl : "system/upLoadDocument.html",
				method : "post",
				waitTitle : "请稍等",
				waitMsg : "上传文件中.....",
				scope : this,
				success : function ($, _) {
					if (this.upLoadGrid)
						this.upLoadGrid.getStore().load();
					Ext.MessageBox.show({
						title : "提示",
						msg : "上传成功！",
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					this.close()
				},
				failure : function ($, A) {
					this.close();
					var _ = Ext.util.JSON.decode(A.response.responseText || "{}"),
					B = _.msg || "上传文件失败！";
					Ext.MessageBox.show({
						title : "提示",
						msg : B,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING,
						scope : this
					})
				}
			});
		else
			Ext.MessageBox.show({
				title : "提示",
				msg : "表单数据数据输入不完整！<br>",
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING,
				scope : this
			})
	}
});
Ext.reg("lionuploadfile", Ext.lion.LionUpLoadFileLook);