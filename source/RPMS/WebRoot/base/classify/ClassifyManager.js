 /**
 * @description : 分类定义界面Manager
 * @date : 2013-09-23
 * @author : 辛尔青
 */
Ext.lion.base.ClassifyManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.base.ClassifyManager.superclass.constructor.call(this);
	
	this.dataGrid.on('cellclick', function(grid, rowIndex, columnIndex, e) {
        var fieldName = grid.getDataIndex(columnIndex);
        if (fieldName == grid.getFieldName('dataOfClassify')) {
            this.addObject();
        } 
    }, this);
    
};

Ext.extend(Ext.lion.base.ClassifyManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
		'beforedelete' : {
			fn : function(){
			    var records = this.dataGrid.getSelections(true);
			    for(var i = 0; i < records.length; i++){
			        var status = records[0].get(this.dataGrid.getFieldName('valid'));
			        if( status == '1'){
			            Ext.MessageBox.alert("提示","有效状态的数据不能删除");
					    return false; 
			        }
			    }
			},
			scope: this
		},
		'beforeadd' :{
		 	fn : function(){
				var records = this.dataGrid.getSelections(false);
				if(records && records.length > 0) {
					var status = records[0].get(this.dataGrid.getFieldName('valid'));
			        if( status == '0'){
			            Ext.MessageBox.alert("提示","父节点必须是有效状态的数据才能新增!");
					    return false; 
			        } else {
				        this.parentId = records[0].get(this.dataGrid.getFieldName('id'));
						this.parentName = records[0].get(this.dataGrid.getFieldName('classifyName'));
						this.classifyTypeCd = records[0].get(this.dataGrid.getFieldName('classifyTypeCd'));
						this.moduleName = records[0].get(this.dataGrid.getFieldName('module.name'));
						this.moduleId = records[0].get(this.dataGrid.getFieldName('module.id'));
						this.modulecode = records[0].get(this.dataGrid.getFieldName('module.code'));
			        }
				} else {
					this.parentId = '';
					this.parentName = '';
					this.classifyTypeCd = '';
					this.moduleName = "";
					this.moduleId = "";
					this.modulecode = "";
				}
			},
			scope : this
			}
		});
	},
	
	/**
	 * @description : 系统分类树选择,设置systemType值
	 * @author : 辛尔青
	 * @date : 2013-9-24下午07:28:26
	 */
	systemTypeSelect : function(combox, fireValue,node) {
		this.editForm.findField('systemType').setValue(node.attributes.code);
	},
	
	/**
	 * @description : 重新load主表grid列表
	 * @author : 辛尔青
	 * @date : 2013-9-24下午07:28:26
	 */
	load : function() {
		this.dataGrid.store.load();
	},
	
	/**
	 * @description : 当父节点清空时,分类编号清空
	 * @author : 辛尔青
	 * @date : 2013-10-23下午13:28:26
	 */
	parentChange : function() {
		var parentId = this.editForm.findById("parent").getValue();
		if(parentId != ""){
			this.editForm.findField("classifyCd").load({parentId : recode[0].get('id')});
		}else{
			this.editForm.findField("classifyCd").load({parentId : ""});
		}
	},
	
	/**
	 * @description : 修改记录
	 * @author : 辛尔青
	 * @date : 2013-10-29下午04:28:26
	 */
	changeStatus : function(property, value, tip) {
		var records = this.dataGrid.getSelections(true);
		var ids = "";
		if(records && records.length > 0) {
			for(var i = 0; i < records.length ; i++) {
				var valid =  records[i].get(this.dataGrid.getFieldName('valid'));
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
			Ext.MessageBox.confirm("提示", "确定要"+tip+"这"+msg+"记录吗？",function(ret){
			if(ret == "yes"){
				Ext.Ajax.request({
					url : 'base/changeClassifyStatus.html',
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
						this.dataGrid.store.load();
					}});
				}
			},this);
		}
	}
	
});