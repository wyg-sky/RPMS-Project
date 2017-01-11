package com.lion.rpms.research.project.manager.impl;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.core.util.PageBean;
import com.lion.core.util.json.JSONConfig;
import com.lion.core.util.json.JSONUtil;
import com.lion.rpms.research.project.manager.ProjectTalentManager;
import com.lion.rpms.research.project.model.ProjectTalent;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description : 项目立项管理业务实现类
 * @Author : 曹鹏程
 * @Date ： 2015-03-12 12:57:10
 */

public class ProjectTalentManagerImpl extends BusinessManagerImpl<ProjectTalent,String> implements ProjectTalentManager {

    public ProjectTalentManagerImpl(GenericDao<ProjectTalent, String> dao) {
        super(dao);
    }
    
    public String list(HttpServletRequest request, ProjectTalent businessObject, JSONConfig config, String queryHql, String countHql, Object[] values) throws Exception {
	    PageBean pageBean = new PageBean();
	    pageBean.setLimit(request.getParameter("limit"));
	    pageBean.setStart(request.getParameter("start"));
	    pageBean.setCountHql(countHql);
	    pageBean.setQueryHql(queryHql);
	    pageBean.setValues(values);
	    config.setDepth(3);
	    findPageAll(pageBean);
	    String json = JSONUtil.serializeForGrid(pageBean.getResult(), "root", pageBean.getTotalCount(), config);
	    return json;
	  }
}
