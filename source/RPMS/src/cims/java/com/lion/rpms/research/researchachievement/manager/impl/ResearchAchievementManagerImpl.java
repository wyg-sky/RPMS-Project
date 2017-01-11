package com.lion.rpms.research.researchachievement.manager.impl;



import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.core.util.StringUtils;
import com.lion.core.util.json.JSONConfig;
import com.lion.core.util.json.JSONUtil;
import com.lion.rpms.research.researchachievement.manager.ResearchAchievementManager;
import com.lion.rpms.research.researchachievement.model.ResearchAchievement;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description ：成果管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public class ResearchAchievementManagerImpl extends BusinessManagerImpl<ResearchAchievement,String> implements ResearchAchievementManager {
	public ResearchAchievementManagerImpl(GenericDao<ResearchAchievement, String> dao) {
		super(dao);
		this.setDataPower("500");
	}
	
	/**
	 * @description ： 管理员权限控制
	 * @date : 2015-05-27  11:20:49
	 * @author : WangYG
	 * @params : { HttpServletRequest request }
	 * @return : StringBuilder
	 */
	/*@SuppressWarnings("unchecked")
	@Override
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception{
	    StringBuilder sbHql = new StringBuilder(" where 1=1 ");
	  //点击左侧平台树时，显示该平台及其子平台下的信息
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
			sbHql.append(" and obj.platInstitution.id in(");
			sbHql.append(platArray);
			sbHql.append(") ");
		}
	  //管理员权限控制,只显示权限内可见的平台信息.
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
	}*/
	
	/**
	 * @description : 得到一个指定 projectId的 ResearchAchievement类实体信息(成果推广管理加载指定projectId成果信息时使用)
	 * @date : 2015-05-13  13:20:49
	 * @author : WangYG
	 * @params : { HttpServletRequest request }
	 * @return : String
	 */
	public String getResearchAchievementInfo(HttpServletRequest request) throws Exception {
		String projectId = request.getParameter("projectId");
		if (!StringUtils.isEmpty(projectId)) {
			ResearchAchievement project = this.get(projectId);
			JSONConfig config = new JSONConfig();
			config.setClosCollection(true); // 关闭集合
			String json = JSONUtil.serializeForForm(project, "root", config);
			return json;
		} else {
			throw new Exception("projectId为空");
		}
	}
}
