 /**
 * @description : 角色业务逻辑
 * @date : 2013-04-05
 * @author : 王绪乐
 */
Ext.lion.system.RoleManager = function(config) {
	Ext.apply(this,config);
	
	Ext.lion.system.RoleManager.superclass.constructor.call(this);
	
	this.dataGrid.on('cellclick', function(grid, rowIndex, columnIndex, e) {
        var fieldName = grid.getDataIndex(columnIndex);
        if (fieldName == grid.getFieldName('module')) {
            this.setRolePower(this);
        } else if (fieldName == grid.getFieldName('dataOfOrg')) {
            this.setDataPowerOfOrg(this);
        } else if (fieldName == grid.getFieldName('dataOfDept')) {
            this.setDataPowerOfDept(this);
        } else if (fieldName == grid.getFieldName('singleSystemAuthorize')) {
            this.setSingleSystemAuthorize(this);
        }
    }, this);
};

Ext.extend(Ext.lion.system.RoleManager, Ext.lion.LionBusinessManager, {
	/**
	 * 设置模块与资源权限
	 */
	setRolePower : function() {
		Ext.lion.ScriptLoader('system/role/RolePowerSetWin.js', false);
		var records = this.dataGrid.getSelections(true);
		if(records && records.length > 0) {
			var roleId = records[0].get(this.dataGrid.getFieldName('id'));
			var roleName = records[0].get(this.dataGrid.getFieldName('name'));
			var powerSetWin = new RolePowerSetWin({roleId : roleId, roleName : roleName});
			powerSetWin.show();
		}
	},
	
	/**
	 * 设置单位数据权限
	 */
	setDataPowerOfOrg : function() {
		Ext.lion.ScriptLoader('system/role/DataPowerOfOrgSetWin.js', false);
		var records = this.dataGrid.getSelections(true);
		if(records && records.length > 0) {
			var roleId = records[0].get(this.dataGrid.getFieldName('id'));
			var roleName = records[0].get(this.dataGrid.getFieldName('name'));
			var powerSetWinOfOrg = new DataPowerOfOrgSetWin({roleId : roleId, roleName : roleName});
			powerSetWinOfOrg.show();
		}
	},
	
	/**
	 * 设置部门数据权限
	 */
	setDataPowerOfDept : function() {
		Ext.lion.ScriptLoader('system/role/DataPowerOfDeptSetWin.js', false);
		var records = this.dataGrid.getSelections(true);
		if(records && records.length > 0) {
			var roleId = records[0].get(this.dataGrid.getFieldName('id'));
			var roleName = records[0].get(this.dataGrid.getFieldName('name'));
			var powerSetWinOfDept = new DataPowerOfDeptSetWin({roleId : roleId, roleName : roleName});
			powerSetWinOfDept.show();
		}
	},
	
	/**
	 * 单点系统授权
	 */
	setSingleSystemAuthorize : function() {
		Ext.lion.ScriptLoader('system/role/SingleSystemAuthorizeWindow.js', false);
		var records = this.dataGrid.getSelections(true);
		if(records && records.length > 0) {
			var roleId = records[0].get(this.dataGrid.getFieldName('id'));
			var roleName = records[0].get(this.dataGrid.getFieldName('name'));
			var singleSystemAuthorizeWindow = new SingleSystemAuthorizeWindow({roleId : roleId, roleName : roleName});
			singleSystemAuthorizeWindow.show();
		}
	},
	
	/**
	 * 覆盖父类的方法
	 */
	addLineObject : function(){
		var selectWin = new Ext.lion.LionSelectWindow({
			viewPathOfUi : 'system/user/list',
			title : '用户选择'
		});
		
		selectWin.on('after_comfirm_click', function(records) {
			var RecordType = this.dataLineGrid.getRecordType();
			for(var i = 0; i< records.length; i++) {
				var exist = false;
				var users = this.dataLineGrid.getStore().getRange();
				for(var j = 0; j < users.length; j++) {
					if(users[j].get('id') == records[i].get('id')) {
						exist = true;
						break;
					}
				}
				if(!exist){
					var r = new RecordType({
						'id' : records[i].get('id'),
						'userName' : records[i].get('userName'),
						'loginName' : records[i].get('loginName'),
						'code' : records[i].get('code'),
						'sex' : records[i].get('sex'),
						'birthday' : records[i].get('birthday'),
						'organization.id' : records[i].get('organization.id'),
						'organization.name' : records[i].get('organization.name'),
						'department.id' : records[i].get('department.id'),
						'department.name' : records[i].get('department.name'),
						'isEnabled' : records[i].get('isEnabled'),
						'isExpired' : records[i].get('isExpired'),
						'isLocked' : records[i].get('isLocked'),
						'isPortal' : records[i].get('isPortal')
					});
					this.dataLineGrid.store.add(r);
				}
			}
		}, this);
	}
	
});