package com.lion.rpms.research.project.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.rpms.research.project.manager.ProjectCostTotalManager;
import com.lion.rpms.research.project.model.ProjectCostTotal;

/**
 * @description ：项目费用归集业务实现类
 * @date ： 2016-10-13 14:23:10
 * @author ：杨尚山
 */
public class ProjectCostTotalManagerImpl extends BusinessManagerImpl<ProjectCostTotal,String> implements ProjectCostTotalManager {
	public ProjectCostTotalManagerImpl(GenericDao<ProjectCostTotal, String> dao) {
		super(dao);
	}
}
