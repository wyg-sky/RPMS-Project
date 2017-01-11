package com.lion.base.storage.manager;

import com.lion.base.storage.model.StorageLine;
import com.lion.system.common.manager.BusinessManager;

/**
 * 
 * @description : 
 * @date : 2013-11-13上午09:37:05
 * @author : 李超
 */
public interface StorageLineImportManager extends BusinessManager<StorageLine, String> {
	
	public String importStorageLine(String importType, String mainId);
}
