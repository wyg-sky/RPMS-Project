package com.lion.rpms.research.projectevaluation.manager.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.core.util.StringUtils;
import com.lion.rpms.common.UserToPlat;
import com.lion.rpms.research.projectevaluation.manager.ProjectEvaluationManager;
import com.lion.rpms.research.projectevaluation.model.ProjectEvaluation;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.user.model.UserView;

/**
 * @description : 项目后评价管理业务实现类
 * @Author : 曹鹏程
 * @Date ： 2015-03-10 16:30:07
 */

public class ProjectEvaluationManagerImpl extends BusinessManagerImpl<ProjectEvaluation,String> implements ProjectEvaluationManager {

    public ProjectEvaluationManagerImpl(GenericDao<ProjectEvaluation, String> dao) {
        super(dao);
    }
    
    @SuppressWarnings("unchecked")
	@Override
   	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
   	    StringBuilder sbHql = new StringBuilder(" where 1=1 ");
   	 String platId = request.getParameter("platId");
	    if(!StringUtils.isBlank(platId)){
	    	String platArray  = "";
			String sql = "select id from rpms_research_plat t "
					+ "start with t.id = '"+platId+"' connect by prior t.id = t.parent";
			List<String> platlist = this.executeQuerySql(sql, new Object[0]);
			if (null != platlist && platlist.size()>0) {
				for (int i = 0; i < platlist.size(); i++) {
					platArray = platlist.get(i) +"','"+platArray.toString();
				}
				
			}
			if(!StringUtils.isBlank(platArray)){
				platArray = "'"+platArray.substring(0, platArray.length()-2);
			}else{
				platArray ="''";
			}
			sbHql.append(" and obj.projectId.platInstitution.id in(");
			sbHql.append(platArray);
			sbHql.append(") ");
		}
	    
   	    UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
   	    //添加人员管理平台权限设置
   	    UserToPlat  userToPlat = new UserToPlat();
   	    String platStr = userToPlat.getPlatsStr(userView.getId(),this);
   	    sbHql.append(" and obj.projectId.platInstitution.id in(");
   	    sbHql.append(platStr);
   	    sbHql.append(") ");
   	    String[] queryFields = request.getParameterValues("queryFields");
   	    String[] operatorValues = request.getParameterValues("operatorValues");
   	    String hql = request.getParameter("hql");

   	    if ((queryFields != null) && (queryFields.length > 0) && (operatorValues != null)) {
   	      for (int i = 0; i < queryFields.length; i++) {
   	        if ((queryFields[i] != null) && (!"".equals(queryFields[i]))) {
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
   	    sbHql.append(StringUtils.isEmpty(hql) ? "" : hql);
   	    return sbHql;
   	}
     
}
