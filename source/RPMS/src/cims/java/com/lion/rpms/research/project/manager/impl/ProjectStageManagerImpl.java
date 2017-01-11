package com.lion.rpms.research.project.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.research.project.manager.ProjectStageManager;
import com.lion.rpms.research.project.model.ProjectStage;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description : 项目进度阶段业务实现类
 * @Author : 曹鹏程
 * @Date ： 2015-04-28 11:41:22
 */

public class ProjectStageManagerImpl extends BusinessManagerImpl<ProjectStage,String> implements ProjectStageManager {

    public ProjectStageManagerImpl(GenericDao<ProjectStage, String> dao) {
        super(dao);
    }
     
}
