package com.lion.base.storage.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.base.storage.model.Storage;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description : 设备仓库基本信息
 * @date : 2013-9-22
 * @author : 姜华敏
 */
public interface StorageManager extends BusinessManager<Storage, String>{
	
	/**
	 * 判断仓库是否锁定的方法
	 * @param idString : 操作仓库的id
	 * @return 是否锁定
	 */
	public Boolean checkIfLocked(String idString) throws Exception;
	
	public String listStorageAll(HttpServletRequest request) throws Exception;

	String importStorageManager(HttpServletRequest request);
}