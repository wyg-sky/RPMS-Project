package com.lion.rpms.research.project.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.research.project.manager.ProjectFundsManager;
import com.lion.rpms.research.project.model.ProjectFunds;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description : 项目立项管理业务实现类
 * @Author : 曹鹏程
 * @Date ： 2015-03-12 12:57:10
 */

public class ProjectFundsManagerImpl extends BusinessManagerImpl<ProjectFunds,String> implements ProjectFundsManager {

    public ProjectFundsManagerImpl(GenericDao<ProjectFunds, String> dao) {
        super(dao);
    }
     
}
