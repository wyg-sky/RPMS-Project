 /**
 * @description : 用户业务逻辑
 * @date : 2012-12-21
 * @author : 王绪乐
 */
Ext.lion.system.UserManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.UserManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.system.UserManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		if(this.listDeptTree && this.listDeptTree.items && this.listDeptTree.items.items[0]) {
			this.listDeptTree.items.items[0].on('beforeload',function(node, e){
				if(node.attributes.url){
					this.listDeptTree.items.items[0].loader.dataUrl = node.attributes.url;
				}
			}, this);
			
			this.listDeptTree.items.items[0].on('click',this.onDeptTreeClick, this);
		}
	},
	
	onDeptTreeClick : function(node, e) {
		var nodeType = node.attributes.classType;
		if(nodeType){
            nodeType = nodeType.substring(nodeType.lastIndexOf('.')+1, nodeType.length);
		     switch(nodeType){
		     	case 'Organization':
					this.query(this.queryForm, this.dataGrid, true, ['obj.organization.id'], ['='], [node.id]);
					this.queryForm.findField('organization.id').setValue({value : node.id, text : node.text});
					break;
		     	case 'Department':
					this.query(this.queryForm, this.dataGrid, true, ['obj.department.id'], ['='], [node.id]);
					this.queryForm.findField('department.id').setValue({value : node.id, text : node.text});
					break;
				case 'Role':
					this.query(this.queryForm, this.dataGrid, true, ['rolesObj.id'], ['='], [node.id]);
					this.queryForm.findField('roleId').setValue(node.id);
					break;
			 }
		}
	},
	
	getChildNodes : function (node,list){
		var children;
		if(node.attributes)
			children = node.attributes.children;
		else
			children = node.children;
		if(children){
			for(var i = 0 ; i <children.length; i++){
				var child = children[i];
				list.push(child.id);
				getChildNodes(child,list);
			}
		}
		return list;
	},
	
	/**
	 * @description : 密码修改
	 * @scope ：this.listTbar
	 * @author : 王绪乐
	 * @date : 2013-1-23上午09:28:26
	 */
	changePsw : function () {
		var records = this.dataGrid.getSelections(true);
		if(records && records.length > 0) {
			this.showWin({title:'密码修改'}, 'system/user/changepsw');
			
			this.changepswForm.form.findField('id').setValue(
				records[0].get(this.dataGrid.getFieldName('id'))
			);
			this.changepswForm.form.findField('userName').setValue(
				records[0].get(this.dataGrid.getFieldName('userName'))
			);
			this.changepswForm.form.findField('loginName').setValue(
				records[0].get(this.dataGrid.getFieldName('loginName'))
			);
		}
	},
	
	saveChangePsw : function () {
		if(!this.changepswForm.form.isValid()){
			Ext.MessageBox.alert("提示","密码不符合要求，请重新输入！");
			return;
		}
		var password = this.changepswForm.form.findField('password').getValue();
		var rePassword = this.changepswForm.form.findField('rePassword').getValue();
		if(password != rePassword){
			Ext.MessageBox.alert("提示","两次输入的密码不相同");
			this.changepswForm.form.findField('password').setValue('');
			this.changepswForm.form.findField('rePassword').setValue('');
			return;
		}
		var id = this.changepswForm.form.findField('id').getValue();
		Ext.Ajax.request({
			url : 'system/userChangePsw.html',
			method : 'post',
			params : {id : id, password : password},
			scope : this,
			success : function(response,options) {
				Ext.MessageBox.alert("成功","密码修改成功！");
				this.changepswForm.ownerCt.close();
			},
			failure : function() {
				Ext.MessageBox.show({
					title : '失败',
					msg : '密码修改失败 !<br>',
					buttons : Ext.MessageBox.OK,
					fn : function(){},
					icon : Ext.MessageBox.ERROR,
					scope : this
				});
			}
		});
	},
	
	/**
	 * 覆盖父类的方法
	 */
	addLineObject : function(){
		var selectWin = new Ext.lion.LionSelectWindow({
			viewPathOfUi : 'system/role/list',
			title : '角色选择'
		});
		
		selectWin.on('after_comfirm_click', function(records) {
			var RecordType = this.dataLineGrid.getRecordType();
			for(var i = 0; i < records.length; i++) {
				var exist = false;
				var roles = this.dataLineGrid.getStore().getRange();
				for(var j = 0; j < roles.length; j++) {
					if(roles[j].get('id') == records[i].get('id')) {
						exist = true;
						break;
					}
				}
				if(!exist){
					var r = new RecordType({
						'id' : records[i].get('id'),
						'name' : records[i].get('name'),
						'roleType' : records[i].get('roleType'),
						'description' : records[i].get('description'),
						'sortOrder' : records[i].get('sortOrder')
					});
					this.dataLineGrid.store.add(r);
				}
			}
		}, this);
	},
	
	printGrid : function() {
		var printWin = new Ext.lion.LionPrintWindow({
			printTitle : this.printTitle,
			isShowInfo : false,
			components : [this.dataGrid]
		});
	},
    
	/**
	 * 销毁
	 */
    destroy : function() {
    	if(this.changepswForm) {
    	    this.changepswForm.destroy();
    	}
    	
    	Ext.lion.system.UserManager.superclass.destroy.call(this);
    }
	
});