 /**
 * @description : 文档管理业务逻辑
 * @date : 2012-12-21
 * @author : 王绪乐
 */
Ext.lion.system.DocumentManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.DocumentManager.superclass.constructor.call(this);
	
	this.listTypeTree.items.items[0].on('click',this.onTypeTreeClick, this);
	
	this.docTypeId = 'noClick';
	this.docTypeName = '';
	this.actionMode = '';
	this.listTypeTree.items.items[0].manager = this;
	
	this.dataGrid.on('cellclick' , function(grid, rowIndex, columnIndex, e) {
		var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
		if (fieldName == grid.getFieldName('preview')) {
			var record = grid.getStore().getAt(rowIndex);
			//this.previewDocument(record.get('id'));
			this.docPreview(record.get('id'));
		}
	},this);
};


Ext.extend(Ext.lion.system.DocumentManager, Ext.lion.LionBusinessManager, {
	rendererDocName : function(v) {
		if(v) {
			var type = v.substring(v.lastIndexOf('.') + 1);
			if('7z,accdb,ai,avi,bmp,cs,default,dll,doc,docx,dwg,exe,fla,gif,htm,html,ico,jpeg,jpg,js,mdb,mp3,pdf,png,ppt,pptx,rar,rdp,swf,swt,txt,vsd,xls,xlsx,xml,zip'.indexOf(type) < 0) {
				type = 'default';
			}
			return "<img src='images/fileicon/" + type + ".gif' height='16'' align='absmiddle'/>&nbsp;" + v;
		}
	},
	
	typeTreeLayout : function() {
	},
	
	onTypeTreeClick : function(node, e) {
		if('type_root' == node.id){
			this.clearQuery(this.queryForm, this.dataGrid, true);
			this.docTypeId = 'noClick';
		}else{
			this.query(this.queryForm, this.dataGrid, true, ['obj.docType.id'], ['='], [node.id]);
			this.docTypeId = node.id;
			this.docTypeName = node.text;
			this.queryForm.findField('docType.id').setValue({value : node.id, text : node.text});
		}
	},
	
	typeTreeReload : function() {
		this.docTypeId = 'noClick';
		this.listTypeTree.items.items[1].root.reload();
		this.query(this.queryForm, this.dataGrid, true, ['obj.docType.id'], ['='], ['noClick']);
		this.queryForm.findField('docType.id').setValue({value : '', text : ''});
	},
	
	addDocType : function(){
		this.actionMode = '1';
		this.editable = true;
		this.showWin({title : '新增信息'},'rpms/base/document/edit');
		if(this.docTypeId != 'noClick'){
			this.editForm.form.findField('businessObject.parent.id').setValue({
				value : this.docTypeId,
				text : this.docTypeName
			});
		}
		this.editForm.on('aftersave',this.typeTreeReload,this);
	},
	
	editDocType : function(){
		if(this.docTypeId == 'noClick'){
			Ext.MessageBox.alert("提示","请先选择记录！");
			return false;
		}
		this.actionMode = '2';
		this.editable = true;
		this.showWin({title : '编辑信息'},'rpms/base/document/edit');
		this.editForm.loadFormData({
			id : this.docTypeId
		});
		this.editForm.on('aftersave',this.typeTreeReload,this);
	},
	
	viewDocType : function(){
		if(this.docTypeId == 'noClick'){
			Ext.MessageBox.alert("提示","请先选择记录！");
			return false;
		}
		this.actionMode = '3';
		this.editable = false;
		this.showWin({title : '查看信息'},'rpms/base/document/edit');
		this.editForm.loadFormData({
			id : this.docTypeId
		});
	},
	
	deleteDocType : function(){
		if(this.docTypeId == 'noClick'){
			Ext.MessageBox.alert("提示","请先选择记录！");
			return false;
		}
		var m = Ext.MessageBox.confirm("提示", "确定要删除该文档类型吗？",function(ret) {
			if (ret == 'yes') {
				Ext.Ajax.request({
					url : 'system/deleteDocumentType.html',
					method : 'post',
					params : {ids : this.docTypeId},
					scope : this,
					success : function(response,options) {
						var json = Ext.util.JSON.decode(response.responseText || "{}");
						var msg = json.msg || '<br>';
						if (json.success) {
							this.typeTreeReload();
							Ext.MessageBox.show({
								title : '成功',
								msg : '删除成功！' + msg,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
						} else {
							Ext.MessageBox.show({
								title : '失败',
								msg : '删除失败！' + msg,
								buttons : Ext.MessageBox.OK,
								fn : function(){},
								icon : Ext.MessageBox.WARNING,
								scope : this
							});
						}
					},
					failure : function() {
						var json = Ext.util.JSON.decode(response.responseText || "{}");
					    var msg = json.msg || '<br>';
						Ext.MessageBox.show({
							title : '失败',
							msg : '删除失败！' + msg,
							buttons : Ext.MessageBox.OK,
							fn : function(){},
							icon : Ext.MessageBox.ERROR,
							scope : this
						});
					}
				});
			}
		},this);
	},
	
	showMoveDocWin : function(){
		var records = this.dataGrid.getSelections(true);
		
		if(records && records.length > 0){
			this.showWin({title : '文档迁移'},'rpms/base/document/movedoc');
		}
	},
	
	moveDoc : function(){
		var records = this.dataGrid.getSelections(true);
		var docIds = '';
		for (var i = 0; i < records.length; i++) {
			docIds += records[i].get(this.dataGrid.getFieldName('id')) + ",";
		}
		docIds = docIds.substring(0, docIds.length- 1);
		if(this.listTypeTreeForMove.items.items[0].getSelectionModel().selNode == null){
			Ext.MessageBox.show({
				title : '提示',
				msg : '请先选择文档类型！',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO
			});
			return;
		}
		var docTypeId = this.listTypeTreeForMove.items.items[0].getSelectionModel().selNode.id;
		if(docTypeId == 'type_root'){
			Ext.MessageBox.show({
				title : '提示',
				msg : '请先选择文档类型！',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO
			});
			return;
		}
		var m = Ext.MessageBox.confirm("提示", "确定要迁移这些文档吗？",function(ret) {
			if (ret == 'yes') {
				Ext.Ajax.request({
					url : 'system/moveDocuments.html',
					method : 'post',
					params : {docIds : docIds, docTypeId : docTypeId},
					scope : this,
					success : function(response,options) {
						var json = Ext.util.JSON.decode(response.responseText || "{}");
						var msg = json.msg || '<br>';
						if (json.success) {
							Ext.MessageBox.show({
								title : '成功',
								msg : '迁移成功！' + msg,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
							this.listTbarForMove.closeClick();
							this.dataGrid.store.reload();
						} else {
							Ext.MessageBox.show({
								title : '失败',
								msg : '迁移失败！' + msg,
								buttons : Ext.MessageBox.OK,
								fn : function(){},
								icon : Ext.MessageBox.WARNING,
								scope : this
							});
							this.listTbarForMove.closeClick();
						}
					},
					failure : function() {
						var json = Ext.util.JSON.decode(response.responseText || "{}");
					    var msg = json.msg || '<br>';
						Ext.MessageBox.show({
							title : '失败',
							msg : '迁移失败！' + msg,
							buttons : Ext.MessageBox.OK,
							fn : function(){},
							icon : Ext.MessageBox.ERROR,
							scope : this
						});
						this.listTbarForMove.closeClick();
					}
				});
			}
		},this);
	},
	
	uploadDocuments : function(){
		var upLoadWin = new Ext.lion.LionUpLoadWindow({
			upLoadGrid : this.dataGrid,
			fkId : Uuid.id(),
			fileTypeId : this.docTypeId == 'noClick' ? '' : this.docTypeId,
			fileTypeText : this.docTypeName
		});
		
		upLoadWin.show();
	},
	
	uploadPictures : function(){
		var upLoadPic = new Ext.lion.LionUpLoadPicture({
			upLoadGrid : this.dataGrid,
			fkId : Uuid.id(),
			fileTypeId : this.docTypeId == 'noClick' ? '' : this.docTypeId,
			fileTypeText : this.docTypeName
		});
		
		upLoadPic.show();
	},
	
	previewDocument : function(id) {
		var loadMask = new Ext.LoadMask(this.el?this.el : Ext.getBody(), {
			msg : "正在加载文件，请稍候...",
			removeMask : true
		});
		
		loadMask.show();
		Ext.Ajax.request({
			scope : this,
			timeout : 300000,
			url : 'system/previewDocument.html',
			params : {id : id},
			success : function(response) {
				loadMask.hide();
				var json = Ext.util.JSON.decode(response.responseText || "{}");
				if(json.success) {
					if(json.imageFile) {
						this.imageFilePath = json.imageFilePath;
						var imageWin = new Ext.lion.LionWindow({
							title : '图片预览',
							modal : true,
							html : '<img src="'+this.imageFilePath+'" />',
							width : json.imageWidth,
							height : json.imageHeight
						});
						imageWin.show();
						imageWin.on('destroy',function(){
							this.deletePreViewFile(this.imageFilePath);
						},this);
					} else {
						this.swfFilePath = json.swfFilePath;
						var previewWin = this.showWin({title : '文档预览'},'system/document/preview');
						
						delete this.winHeight;
						delete this.winWidth;
						
						previewWin.on('destroy',function(){
							this.deletePreViewFile(this.swfFilePath);
						},this);
					}
				} else {
					json.msg = json.msg || "服务器访问出错，请联系管理员";
					Ext.MessageBox.show({
						title : '失败',
						msg : json.msg + "<br>",
						buttons : Ext.MessageBox.OK,
						fn : function(){},
						icon : Ext.MessageBox.ERROR
					});
				}
			},
			failure : function(response) {
				loadMask.hide();
				var json = Ext.util.JSON.decode(response.responseText || "{}");
				json.msg = json.msg || "服务器访问出错，请联系管理员";
				Ext.MessageBox.show({
					title : '失败',
					msg : json.msg + "<br>",
					buttons : Ext.MessageBox.OK,
					fn : function(){},
					icon : Ext.MessageBox.ERROR
				});
			}
		});
	},
	
	docPreview :function(docId){
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
	},
	
	deletePreViewFile : function(filePath) {
		Ext.Ajax.request({
			scope : this,
			timeout : 30000,
			url : 'system/deletePreViewFile.html',
			params : {filePath : filePath}
		});
	}
});