package com.lion.base.storage.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.base.storage.model.StorageLine;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description : 仓库保管员
 * @date : 2013-9-22下午03:26:28
 * @author : 姜华敏
 */
public interface StorageLineManager extends BusinessManager<StorageLine, String>{

	public String listStorage(HttpServletRequest paramHttpServletRequest) throws Exception;

	public String importStorageLineManager(HttpServletRequest request);
	
}