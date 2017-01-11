package com.lion.base.roadway.manager.impl;

import com.lion.base.roadway.manager.RoadwayHistoryManager;
import com.lion.base.roadway.model.RoadwayHistory;
import com.lion.core.dao.GenericDao;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description : 巷道基础历史信息业务处理实现
 * @date : 2013-9-17下午03:11:32
 * @author : 辛尔青
 */
public class RoadwayHistoryManagerImpl extends BusinessManagerImpl<RoadwayHistory, String> implements RoadwayHistoryManager{

	public RoadwayHistoryManagerImpl(GenericDao<RoadwayHistory, String> dao) {
		super(dao);
		this.setDataPower("400");
	}

}
