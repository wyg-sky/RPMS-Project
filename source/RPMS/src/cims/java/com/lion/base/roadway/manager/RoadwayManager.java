package com.lion.base.roadway.manager;

import javax.servlet.http.HttpServletRequest;

import com.lion.base.roadway.model.Roadway;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description : 巷道基础信息业务处理接口
 * @date : 2013-9-17下午03:11:32
 * @author : 辛尔青
 */
public interface RoadwayManager extends BusinessManager<Roadway, String> {

	public String importRoadway(HttpServletRequest request);
	
}
