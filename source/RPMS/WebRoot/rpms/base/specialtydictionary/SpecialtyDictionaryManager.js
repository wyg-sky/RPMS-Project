/**
 * @description : 专业词典
 * @date : 2015-03-10 09:05:39
 * @author : 周强
 */

Ext.lion.rpms.SpecialtyDictionaryManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.SpecialtyDictionaryManager.superclass.constructor.call(this);
	
	this.dataGrid.on('cellclick', function(grid, rowIndex, columnIndex, e) {
        var fieldName = grid.getDataIndex(columnIndex);
        if (fieldName == grid.getFieldName('addChild')) {
            this.addObject();
        } 
    }, this);
};

Ext.extend(Ext.lion.rpms.SpecialtyDictionaryManager, Ext.lion.LionBusinessManager, {
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
						this.parentName = records[0].get(this.dataGrid.getFieldName('specialtyName'));
						this.specialtyCode = records[0].get(this.dataGrid.getFieldName('specialtyCode'));
			        }
				} else {
					this.parentId = '';
					this.parentName = '';
					this.classifyTypeCd = '';
				}
			},
			scope : this
			}
		});
	},
	/**
	 * @description : 当父节点清空时,分类编号清空
	 * @author : 辛尔青
	 * @date : 2013-10-23下午13:28:26
	 */
	parentChange : function() {
		var parentId = this.editForm.findById("parent").getValue();
		if(parentId != ""){
			this.editForm.findField("specialtyCode").load({parentId : recode[0].get('id')});
		}else{
			this.editForm.findField("specialtyCode").load({parentId : ""});
		}
	}
});
