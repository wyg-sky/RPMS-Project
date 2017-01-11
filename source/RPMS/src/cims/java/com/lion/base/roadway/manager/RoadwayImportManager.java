package com.lion.base.roadway.manager;

import com.lion.base.roadway.model.Roadway;
import com.lion.system.common.manager.BusinessManager;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

/**
 * @description : 巷道信息导入方法
 * @date : 2013-10-21上午09:03:02
 * @author : 辛尔青
 */
public interface RoadwayImportManager extends BusinessManager<Roadway, String> {
	
	public String importRoadway(String importType, Organization organization, UserView user);
}
