 /**
 * @description : 设备位置管理Manager
 * @date : 2013-08-29
 * @author : 曹鹏程
 */
Ext.lion.base.LocationManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.base.LocationManager.superclass.constructor.call(this);
	
	this.dataGrid.on('cellclick', function(grid, rowIndex, columnIndex, e) {
        var fieldName = grid.getDataIndex(columnIndex);
        if (fieldName == grid.getFieldName('dataOfLocation')) {
            this.addObject();
        }
    }, this);
    this.dataGrid.on('celldblclick', function() {
	  	this.viewObject();
	}, this);
    this.myMask = new Ext.LoadMask(Ext.getBody(), {
		msg: '正在导入数据，这可能需要几分钟，请耐心等待......！',
		removeMask: true 
	});
    
};

Ext.extend(Ext.lion.base.LocationManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on('afterdelete',this.afterDelete, this);
		this.on('aftersave',this.afterSaveDate, this);
		
		this.on('beforeadd', function() {
			var records = this.dataGrid.getSelections(false);
			if(records && records.length > 0) {
				this.parentId = records[0].get(this.dataGrid.getFieldName('id'));
				this.parentName = records[0].get(this.dataGrid.getFieldName('locationName'));
			} else {
				this.parentId = '';
				this.parentName = '';
			}
		}, this);
		this.on({
			'beforeview' : {
				fn : this.viewObj,
				scope: this
			},
			'showview' : {
				fn : this.editObj,
				scope: this
			}
		});
	},
	viewObj : function(){
		this.isView = true;
	},
	editObj : function(){
		this.isView = false;
	},
	afterSaveDate : function(){
		 this.dataGrid.store.load();
	},
	afterDelete : function() {
		var record = this.dataGrid.getSelectionModel().getSelected();
		this.dataGrid.store.remove(record);
		return false;
	},
	
	/**
	 * @description : 导入Excel
	 * @scope ：this.listTbar
	 * @author : lc
	 * @date : 2013-11-12上午09:28:26 
	 */
	importLocation : function () {
		this.showWin({title:'导入'}, 'base/location/import');
	},
	/**
	 * @description : 提交并判断条件
	  * @author : 李超
	 * @date : 2013-11-12上午09:28:26 
	 */
	saveImport: function(){
		if(this.importForm.form.isValid()){
			var type = this.importForm.findField('importType').getGroupValue();
			var code = "";
			var sysId = this.importForm.findField('importSysId').getGroupValue();
			if(type == '1') {
				Ext.MessageBox.confirm("提示", "确定要把原有的数据删除吗？",
					function(ret) {
						if (ret == 'yes') {
							this.importLocations(type, code, sysId);
						}
					},this
				);
			} else {
				this.importLocations(type, code, sysId);
			}
		} else {
		    Ext.MessageBox.show({
				title : '提示',
				msg : '信息未选择完整！<br>',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO,
				scope : this
			});
		}
	},
	
	/**
	 * @description : 导入数据
	 * @author : 李超
	 * @date : 2013-11-12上午09:28:26 
	 */
	importLocations : function(type, code, sysId) {
		this.importForm.form.submit({
			url: "system/upLoadDocument.html",
            method: 'post',
            waitTitle : "请稍等",
			waitMsg : '上传文件中.....',
            scope : this,
            params : {
            	'document.docType.id' : '2c9ffaf9481f9e80014833f99d73003a',
            	'document.docFk' : '88fab0b58df24711badae71a6eaf46dd'
            },
            success: function(form, action) {
            	this.importForm.ownerCt.close();
				this.myMask.show();
            	Ext.Ajax.request({
            		timeout: 600000,
					url : 'base/importLocation.html',
					method : 'post',
					params : {
						importType : type,
						importCode : code,
						importSysId : sysId	
					},
					waitTitle : "请稍等",
					waitMsg : '导入数据中.....',
					scope : this,
					async : false,
					success : function(response,options) {
                        var json = Ext.util.JSON.decode(response.responseText || "{}");
                        if(json.success) {
							Ext.MessageBox.show({
								title : '成功',
								msg : '导入数据成功！<br>',
								buttons : Ext.MessageBox.OK,
								fn : function(){
									this.dataLineGrid.store.load();
									this.getDaySum.defer(300,this);
								},
								icon : Ext.MessageBox.INFO,
								scope : this
							});
                        } else {
							var msg = ',';
							if(json.msg == undefined || json.msg == 'null')
							    msg = '';
							else 
							    msg += json.msg;
							Ext.MessageBox.show({
								title : '失败',
								msg : '导入数据失败'+msg+'！<br>',
								buttons : Ext.MessageBox.OK,
								fn : function(){},
								icon : Ext.MessageBox.WARNING,
								scope : this
							});
                        }
                        this.myMask.hide();
						this.query();
					},
					failure : function(response,options) {
            			this.importForm.ownerCt.close();
					    this.myMask.hide();
						Ext.MessageBox.show({
							title : '失败',
							msg : '导入数据失败！<br>',
							buttons : Ext.MessageBox.OK,
							fn : function(){},
							icon : Ext.MessageBox.ERROR,
							scope : this
						});
					}
				});
            },
            failure:function(form, action){
            	this.importForm.ownerCt.close();
                this.myMask.hide();
				Ext.MessageBox.show({
					title : '错误',
					msg : '服务器出现错误请稍后再试！<br>',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR,
					scope : this
				});
            }
		});
	},
	
	/**
	 * 打印报表
	 */
	genReport : function() {
		var rowselects =  this.dataGrid.getSelectionModel().getSelections(false);
		var ids='';
		for(var i=0;i<rowselects.length;i++) {
			ids = ids + "'" +rowselects[i].get("id")+"',";
		}
		if(ids != "") {
			ids = ids.substring(0,ids.length-1);
		}
		var locationCd = this.queryForm.findField("locationCd").getValue();
		var locationName = this.queryForm.findField("locationName").getValue();
		var params = {
			id : ids,
			locationCd : locationCd,
			locationName  :  locationName
	    };
	    var param = encodeURI(Ext.urlEncode(params),"utf-8");
		var src ="base/location/locationRpt.jsp?"+param;
		var win = new Ext.Window({
			title : '使用地点报表',
			autoScroll : true,
			maximizable: true,
			layout : 'fit',
			html : "<iframe  frameborder='0' width='100%' height='100%' src="+src+"></iframe>",
			width : 950,
			height : 600,
			constrain :true,
			constrainHeader : true
		});
		win.show();
	}
	
});