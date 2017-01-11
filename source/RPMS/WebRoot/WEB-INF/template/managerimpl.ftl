package com.lion.${generateInfo.systemName}.${generateInfo.packageName}.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.${generateInfo.systemName}.${generateInfo.packageName}.manager.${generateInfo.className}Manager;
import com.lion.${generateInfo.systemName}.${generateInfo.packageName}.model.${generateInfo.className};
import com.lion.system.common.manager.impl.BusinessManagerImpl;

public class ${generateInfo.className}ManagerImpl extends BusinessManagerImpl<${generateInfo.className}, String> implements ${generateInfo.className}Manager {
	
	public ${generateInfo.className}ManagerImpl(GenericDao<${generateInfo.className}, String> dao) {
		super(dao);
	}
	
}
