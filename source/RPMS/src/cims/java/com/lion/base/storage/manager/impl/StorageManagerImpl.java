package com.lion.base.storage.manager.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.lion.base.storage.manager.StorageImportManager;
import com.lion.base.storage.manager.StorageManager;
import com.lion.base.storage.model.Storage;
import com.lion.core.dao.GenericDao;
import com.lion.core.util.StringUtils;
import com.lion.core.util.json.JSONConfig;
import com.lion.core.util.json.JSONUtil;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.framework.model.LoginInfo;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

/**
 *@description : 设备仓库基本信息
 * @date : 2013-9-22
 * @author : 姜华敏
 */
public class StorageManagerImpl extends BusinessManagerImpl<Storage, String> implements StorageManager {
	private StorageImportManager storageImportManager;
	public StorageManagerImpl(GenericDao<Storage, String> dao) {
		super(dao);
		this.setDataPower("100");
		this.setCollection(true);
	}

	/**
	 * 	查询登录系统类型编码
	 */
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
		StringBuilder sbHql = super.genListConditionHql(request);
		LoginInfo loginInfo = (LoginInfo)request.getSession().getAttribute(Constants.LOGININFO);	//"004"
		String systemCode = loginInfo.getModuleCode();
		if(!StringUtils.isEmpty(systemCode)) {
			sbHql.append(" and obj.systemType = '");
			sbHql.append(systemCode);
			sbHql.append("'");
		}
		return sbHql;
	}
	
	/**
	 * 	保存后，保存系统类型编号
	 */
	public boolean afterSave(HttpServletRequest request, Storage businessObject) {
		if(StringUtils.isEmpty(businessObject.getSystemType())) {
			LoginInfo loginInfo = (LoginInfo)request.getSession().getAttribute(Constants.LOGININFO);	//"004"
			String systemCode = loginInfo.getModuleCode();
			businessObject.setSystemType(systemCode);
		}
		return true;
	}
	
	/**
	 * 判断仓库是否锁定的方法
	 * @param idString
	 * @return
	 */
	public Boolean checkIfLocked(String idString) throws Exception{
		Boolean isLockedBoolean = true;
		Storage storage = this.get(idString);
		if(null == storage || StringUtils.isEmpty(storage.getIsLock()) || storage.getIsLock().equals("1")){
			isLockedBoolean = false;
		}
		return isLockedBoolean;
	}

	public String listStorageAll(HttpServletRequest request) throws Exception {
		JSONConfig config = new JSONConfig();
		StringBuilder conditionHql = this.genListConditionHql(request);
		StringBuilder hql = new StringBuilder("select obj from Storage obj");
		hql.append(conditionHql);
		List<Storage> storages = this.find(hql.toString());
		config.setIterableAsSize(true);
		String json = JSONUtil.serializeForTreeGrid(storages, "root", storages.size(), config);
		return json;
	}
	
	/**
	 * @description : 导入方法
	 * @date : 2013-11-13上午09:26:02
	 * @author : 李超
	 * @params : {
			HttpServletRequest request
		}
	 * @return : String
	 */
	@Override
	public String importStorageManager(HttpServletRequest request) {
		Organization organization = (Organization)request.getSession().getAttribute(Constants.USER_ORGANIZATION);
		UserView user = (UserView)request.getSession().getAttribute(Constants.USER_VIEW);
		String importType = request.getParameter("importType");
		String importCode = request.getParameter("importCode");
		String importSysId = request.getParameter("importSysId");		
		String str = this.storageImportManager.importStorage(importType, importCode, importSysId, organization, user);
		return str;
	}

	public StorageImportManager getStorageImportManager() {
		return storageImportManager;
	}

	public void setStorageImportManager(StorageImportManager storageImportManager) {
		this.storageImportManager = storageImportManager;
	}
	
}
