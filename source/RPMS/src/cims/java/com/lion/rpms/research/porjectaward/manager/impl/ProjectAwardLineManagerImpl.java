package com.lion.rpms.research.porjectaward.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.research.porjectaward.manager.ProjectAwardLineManager;
import com.lion.rpms.research.porjectaward.model.ProjectAwardLine;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description ：项目报奖管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public class ProjectAwardLineManagerImpl extends BusinessManagerImpl<ProjectAwardLine,String> implements ProjectAwardLineManager {
	public ProjectAwardLineManagerImpl(GenericDao<ProjectAwardLine, String> dao) {
		super(dao);
//		this.setDataPower("100");
	}
}
