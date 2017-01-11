package com.lion.base.location.manager;

import com.lion.base.location.model.Location;
import com.lion.system.common.manager.BusinessManager;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

/**
 * 
 * @description : 位置导入方法
 * @date : 2013-11-12上午09:29:23
 * @author : 李超
 */
public interface LocationImportManager extends BusinessManager<Location, String> {
	
	/**
	 * 
	 * @description : 导入方法
	 * @date : 2013-11-12上午09:29:41
	 * @author : 李超
	 * @param user 
	 * @params : {
			
		}
	 * @return : String
	 */
	public String importLocation(String importType,String importCode,String importSysId,Organization organization, UserView user);

}
