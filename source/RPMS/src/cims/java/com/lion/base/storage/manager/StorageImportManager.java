package com.lion.base.storage.manager;

import com.lion.base.storage.model.Storage;
import com.lion.system.common.manager.BusinessManager;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

/**
 * 
 * @description : 
 * @date : 2013-11-13上午09:37:05
 * @author : 李超
 */
public interface StorageImportManager extends BusinessManager<Storage, String> {
	
	public String importStorage(String importType, String importCode, String importSysId, Organization organization, UserView user);
}
