package com.lion.base.face.manager.impl;

import com.lion.base.face.manager.FaceHistoryManager;
import com.lion.base.face.model.FaceHistory;
import com.lion.core.dao.GenericDao;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description : 工作面历史信息业务处理实现
 * @date : 2013-9-16下午05:17:05
 * @author : 辛尔青
 */
public class FaceHistoryManagerImpl extends BusinessManagerImpl<FaceHistory,String> implements FaceHistoryManager {

	public FaceHistoryManagerImpl(GenericDao<FaceHistory, String> dao) {
		super(dao);
		this.setDataPower("400");
	}
	
}
