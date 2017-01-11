package com.lion.base.storage.manager.impl;

import javax.servlet.http.HttpServletRequest;

import com.lion.base.storage.manager.StorageLineImportManager;
import com.lion.base.storage.manager.StorageLineManager;
import com.lion.base.storage.model.StorageLine;
import com.lion.core.dao.GenericDao;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 *@description : 仓库保管员
 * @date : 2013-9-22下午03:26:28
 * @author : 姜华敏
 */
public class StorageLineManagerImpl extends BusinessManagerImpl<StorageLine, String> implements StorageLineManager {
	private StorageLineImportManager storageLineImportManager;
	public StorageLineManagerImpl(GenericDao<StorageLine, String> dao) {
		super(dao);
		
	}

	@Override
	public String listStorage(HttpServletRequest paramHttpServletRequest) throws Exception {
		return null;
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
	public String importStorageLineManager(HttpServletRequest request) {
		String importType = request.getParameter("importType");		
		String mainId = request.getParameter("mainId");
		String str = this.storageLineImportManager.importStorageLine(importType, mainId);
		return str;
	}

	public StorageLineImportManager getStorageLineImportManager() {
		return storageLineImportManager;
	}

	public void setStorageLineImportManager(StorageLineImportManager storageLineImportManager) {
		this.storageLineImportManager = storageLineImportManager;
	}
	
}
