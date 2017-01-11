/**
 * @description : 创新平台管理
 * @date : 2015-03-06 13:18:28
 * @author : WangYG
 */

Ext.lion.rpms.ResearchPlatManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.ResearchPlatManager.superclass.constructor.call(this);
	
	this.myMask = new Ext.LoadMask(Ext.getBody(), {
        msg: '正在导入数据，这可能需要几分钟，请耐心等待......！',
        removeMask: true 
    });

	this.dataGrid.on('cellclick', function(grid, rowIndex, columnIndex, e) {
        var fieldName = grid.getDataIndex(columnIndex);
        if (fieldName == grid.getFieldName('dataOfResearchPlat')) {
            this.addObject();
        }
    }, this);
	
    this.dataGrid.on('celldblclick', function() {
			this.viewObject();
	}, this);
    
};

Ext.extend(Ext.lion.rpms.ResearchPlatManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		
		this.on('afterdelete',this.afterDelete, this);
		this.on('aftersave',this.afterSaveDate, this);
		
		this.on('beforeadd', function() {
			var records = this.dataGrid.getSelections(false);
			if(records && records.length > 0) {
				if(records.length > 1){
				    Ext.MessageBox.alert("提示","新增操作一次只能选择一个父节点!");
                    return false; 
				}
				var status = records[0].get(this.dataGrid.getFieldName('valid'));
		        if( status == '0'){
		            Ext.MessageBox.alert("提示","父节点必须是有效状态的数据才能新增!");
				    return false; 
		        }else{
		        	this.parentId = records[0].get(this.dataGrid.getFieldName('id'));
					this.parentName = records[0].get(this.dataGrid.getFieldName('platName'));
					this.platCode = records[0].get(this.dataGrid.getFieldName('platCode'));					
		        }				
			} else {
				this.parentId = '';
				this.parentName = '';
				this.platCode="";
			}
		}, this);

		this.on('beforedelete',function(){
			var records = this.dataGrid.getSelectionModel().getSelections();
		    var flag = true;
		    for(var i = 0; i < records.length; i++){
	        	var status = records[i].get(this.dataGrid.getFieldName('valid'));  
            	if(status =='1'){
            		flag = false;
         		}
	        }
	        if(flag ==false){
            	Ext.MessageBox.alert("提示","数据为有效记录不能删除！");
	        	return false; 
	        }
		},this);		
		
		this.on({
			'beforeedit' : {
				fn : this.isEditable,
				scope: this
			},
			'showedit' : {
				fn : Ext.emptyFn,
				scope: this
			},
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
		var records = this.dataGrid.getSelections(true);
        if(records.length <= 0){
            Ext.MessageBox.alert("提示","请选择要查看的记录");
            return false;
        }else if(records.length >1){
            Ext.MessageBox.alert("提示","一次只能查看一条记录");
            return false;
        }
        return true;
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
	
	isEditable : function() {
	    var records = this.dataGrid.getSelections(true);
	    if(records.length <= 0){
	        Ext.MessageBox.alert("提示","请选择要编辑的记录");
	        return false;
	    }
	    if(records.length >1){
	    	Ext.MessageBox.alert("提示","一次只能编辑一条记录");
	        return false;
	    }
	    return true;
	},	
	
	/**
	 * @description : 修改有效/无效状态
	 * @author : WangYG
	 */
	changeStatus : function(property, value, tip) {
		var records = this.dataGrid.getSelections(true);
		var ids = "";
		if(records && records.length > 0) {
			for(var i = 0; i < records.length ; i++) {
				var valid =  records[i].get(this.dataGrid.getFieldName('valid'));
				var parentId = records[i].get(this.dataGrid.getFieldName('parent'));
				if(value == valid) {
					Ext.MessageBox.alert("提示","状态相同，无需修改！");
					    return false; 
				} else {
					ids += records[i].get(this.dataGrid.getFieldName('id')) + ',';
				}
			}
			ids = ids.substring(0, ids.length- 1);
			var msg = '条';
			if(records.length > 1) {
				msg = '<font color="red"> ' + records.length + ' </font>' + msg;
			}
			Ext.MessageBox.minWidth = 230;
			Ext.MessageBox.confirm("提示", "将该节点"+tip+"时，其包含的子节点也将"+tip+".<br><br>"
			        +"确定要"+tip+"这"+msg+"记录吗？",function(ret){
			if(ret == "yes"){
				Ext.Ajax.request({
					url : 'base/changeResearchPlatStatus.html',
					params : {
						ids : ids ,  
						property : property ,  
						value : value
					},
					scope : this,
					waitTitle : '请稍候',
					waitMsg : '设置中...',
					success:function(response){
						var json = Ext.util.JSON.decode(response.responseText || "{}");	
                        if(json.success == true) {
							Ext.MessageBox.show({
								title : '成功',
								msg : tip+'成功！<br>',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO,
								scope : this
							});
                        } else{
                        	Ext.MessageBox.show({
								title : '提示信息',
								msg :  json.msg,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.WARNING,
								scope : this
							});
                        }
						this.dataGrid.store.load();
					},
					failure : function(response,options) {
						Ext.MessageBox.show({
							title : '失败',
							msg : tip+'失败！<br>',
							buttons : Ext.MessageBox.OK,
							fn : function(){},
							icon : Ext.MessageBox.ERROR,
							scope : this
						});
					}
				});//Ajax request end
			  }
			},this);//MessageBox.confirm end
		}//if(records.length>0) end
	},
	/*
     * 导入功能
     */
    importPlat : function () {
        this.showWin({title:'导入'}, 'rpms/base/researchequipment/import');
    },
    /*
     * 导入功能
     * 保存按钮
     */
    saveImport: function(){
        var fileName = this.importForm.findField("fileObject").getValue();
        if(fileName == ""){
             Ext.MessageBox.show({
                    title : '提示',
                    msg : '请选择文件！',
                    buttons : Ext.MessageBox.OK,
                    icon : Ext.MessageBox.INFO,
                    scope : this
                });
            return;
        }
        var importType = this.importForm.findField("importType").getValue();
        this.importForm.form.submit({
            url: "rpms/saveImportPlat.html",
            method: 'post',
            waitTitle : "请稍等",
            waitMsg : '正在导入数据，这可能需要几分钟，请耐心等待......！',
            scope : this,
            params : {
                importType : importType
            },
            success: function(form, action){
                var json = Ext.util.JSON.decode(action.response.responseText || "{}");
                Ext.Msg.alert('提示',json.msg);
                this.importForm.ownerCt.close();
                this.query();
            },
            failure:function(form, action){
                this.importForm.ownerCt.close();
                Ext.Msg.alert('错误','文档格式不正确！');
                this.query();
            }
        });
    }
});
