package com.lion.rpms.research.researchstandar.manager.impl;


import com.lion.core.dao.GenericDao;
import com.lion.rpms.research.researchstandar.manager.ResearchStandarManager;
import com.lion.rpms.research.researchstandar.model.ResearchStandar;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description ：标准管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public class ResearchStandarManagerImpl extends BusinessManagerImpl<ResearchStandar,String> implements ResearchStandarManager {
	public ResearchStandarManagerImpl(GenericDao<ResearchStandar, String> dao) {
		super(dao);
		this.setDataPower("500");
	}
	
	/*@Override
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
	    StringBuilder sbHql = new StringBuilder(" where 1=1 ");
	    
	    //添加人员管理平台权限设置
	    //UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
	    //UserToPlat  userToPlat = new UserToPlat();
	    //String platStr = userToPlat.getPlatsStr(userView.getId(),this);
	    
	   //添加人员管理平台权限设置(更改为按单位控制权限)
	    UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
	    String depId = userView.getDepartment().getId();
	    String orgId = userView.getOrganization().getId();
	    //部门与单位其一不是新矿集团时，加权限.
	    if(!(depId.equals("2c9ffa994143626f01414368212c0001") && orgId.equals("8a819eb330e3c1320130e3cd61350001"))){
	    	Organization org = (Organization)request.getSession().getAttribute(Constants.USER_ORGANIZATION);
		    sbHql.append(" and obj.organization.id in(");
		    sbHql.append("'"+org.getId()+"'");
		    sbHql.append(") ");
	    }
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
	}*/
}
