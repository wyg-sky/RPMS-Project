package com.lion.rpms.research.researchevaluate.manager.impl;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.core.util.StringUtils;
import com.lion.rpms.common.UserToPlat;
import com.lion.rpms.research.researchevaluate.manager.ResearchEvaluateManager;
import com.lion.rpms.research.researchevaluate.model.ResearchEvaluate;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.user.model.UserView;

/**
 * @description ：评价管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public class ResearchEvaluateManagerImpl extends BusinessManagerImpl<ResearchEvaluate,String> implements ResearchEvaluateManager {
	public ResearchEvaluateManagerImpl(GenericDao<ResearchEvaluate, String> dao) {
		super(dao);
		this.setDataPower("100");
	}
	
	@Override
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
	    StringBuilder sbHql = new StringBuilder(" where 1=1 ");
	    
	    UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
	    //添加人员管理平台权限设置
	    UserToPlat  userToPlat = new UserToPlat();
	    String platStr = userToPlat.getPlatsStr(userView.getId(),this);
	    sbHql.append(" and obj.platInstitution.id in(");
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
