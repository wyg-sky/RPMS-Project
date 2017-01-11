package com.lion.rpms.research.projectreport.manager.impl;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.research.projectreport.manager.ProjectItemManager;
import com.lion.rpms.research.projectreport.model.ProjectItem;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description : 项目合并包涵项目明细业务实现类
 * @Author : 曹鹏程
 * @Date ： 2015-04-22 18:27:51
 */

public class ProjectItemManagerImpl extends BusinessManagerImpl<ProjectItem,String> implements ProjectItemManager {

    public ProjectItemManagerImpl(GenericDao<ProjectItem, String> dao) {
        super(dao);
    }
     
}
