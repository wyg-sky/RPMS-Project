package com.lion.rpms.research.project.manager.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.core.util.StringUtils;
import com.lion.core.util.json.JSONConfig;
import com.lion.core.util.json.JSONUtil;
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.rpms.research.project.manager.ProjectPartnersManager;
import com.lion.rpms.research.project.model.ProjectPartners;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description : 项目立项管理业务实现类
 * @Author : 曹鹏程
 * @Date ： 2015-03-12 12:57:10
 */

public class ProjectPartnersManagerImpl extends BusinessManagerImpl<ProjectPartners,String> implements ProjectPartnersManager {

    public ProjectPartnersManagerImpl(GenericDao<ProjectPartners, String> dao) {
        super(dao);
    }

    /**
     * 重写list方法,由于ProjectPartners对象中researchPlat字段设置为可填可选
     * 根据所采用的方法,需要对researchPlat值为空的数据重新赋值,以便在页面中能显示内容
     */
    public String list(HttpServletRequest request, ProjectPartners businessObject) throws Exception {
		
		StringBuilder sbHql = new StringBuilder("select obj from ProjectPartners obj where 1=1 ");
	    String[] queryFields = request.getParameterValues("queryFields");
	    String[] operatorValues = request.getParameterValues("operatorValues");
	    String[] fieldValues = request.getParameterValues("fieldValues");

	    if ((queryFields != null) && (queryFields.length > 0) && (operatorValues != null)) {
	      for (int i = 0; i < queryFields.length; ++i) {
	        if ((queryFields[i] != null) && (!("".equals(queryFields[i])))) {
	          sbHql.append(" and ");
	          sbHql.append(queryFields[i]);
	          sbHql.append(" ");
	          sbHql.append(operatorValues[i]);
	          sbHql.append(" ? ");
	        } else {
	          System.err.println("查询字段不能为空!");
	          break;
	        }
	      }
	    }
	    String hql = request.getParameter("hql");
	    sbHql.append((StringUtils.isEmpty(hql)) ? "" : hql);
	    
	    String json ="";
		try{

			JSONConfig config = new JSONConfig();
			config.setClosCollection(true);
			@SuppressWarnings("unchecked")
			List<ProjectPartners> tempList = this.executeQuery(sbHql.toString(),fieldValues);
			List<ProjectPartners> parL = new ArrayList<ProjectPartners>();
			for(ProjectPartners p : tempList){
				if(p.getResearchPlat() == null){
					ResearchPlat r = new ResearchPlat();
					r.setId(p.getResearchPlatName());
					r.setPlatName(p.getResearchPlatName());
					p.setResearchPlat(r);
				}
				parL.add(p);
			}
			json = JSONUtil.serializeForGrid(parL, "root", parL.size(), config);
		}catch(Exception e){
			e.printStackTrace();
		}
		return json;
	}
}
