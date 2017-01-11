package com.lion.rpms.research.projectacceptance.manager.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.core.util.BeanUtils;
import com.lion.core.util.StringUtils;
import com.lion.rpms.common.UserToPlat;
import com.lion.rpms.research.projectacceptance.manager.ProjectAcceptanceManager;
import com.lion.rpms.research.projectacceptance.model.ProjectAcceptance;
import com.lion.rpms.research.researchachievement.manager.ResearchAchievementManager;
import com.lion.rpms.research.researchachievement.model.ResearchAchievement;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.document.model.Document;
import com.lion.system.user.model.UserView;

/**
 * @description : 项目验收管理业务实现类
 * @Author : 曹鹏程
 * @Date ： 2015-03-10 15:56:38
 */

public class ProjectAcceptanceManagerImpl extends BusinessManagerImpl<ProjectAcceptance,String> implements ProjectAcceptanceManager {
	private ResearchAchievementManager researchAchievementManager;
    public ProjectAcceptanceManagerImpl(GenericDao<ProjectAcceptance, String> dao) {
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
			sbHql.append(" and obj.platInstitution.id in(");
			sbHql.append(platArray);
			sbHql.append(") ");
		}
	    
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
    
    public boolean afterSave(HttpServletRequest request, ProjectAcceptance pja) throws Exception {
    	UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
    	if("0005".equals(pja.getStatus())){
    		String sql = "";
    		if ("0001".equals(pja.getAcceptanceType())) {
    			sql = "update rpms_Project t set  t.PROJECT_STATUS = '0005'  where t.id ='"+pja.getProjectId().getId()+"'";
				this.executeSql(sql, new Object[0]);
			} else {
				sql = "update rpms_Project t set  t.PROJECT_STATUS = '0006'  where t.id ='"+pja.getProjectId().getId()+"'";
				this.executeSql(sql, new Object[0]);
			}
    		ResearchAchievement researchAchievement = new ResearchAchievement();
    		researchAchievement.setPlatCenter(pja.getProjectId().getPlatCenter());
    		researchAchievement.setPlatInstitution(pja.getProjectId().getPlatInstitution());
    		researchAchievement.setBusiness(pja.getProjectId().getBusiness());
    		researchAchievement.setSpecialty(pja.getProjectId().getSpecialty());
    		researchAchievement.setProjectId(pja.getProjectId());
    		researchAchievement.setGrade(pja.getAcceptanceLevel());
    		researchAchievement.setAchievementLevel(pja.getLevel());
    		researchAchievement.setCertificationDate(pja.getCertificationDate());
    		researchAchievement.setAchievementName(pja.getAchievementName());
    		researchAchievement.setAchievementNum(pja.getAchievementNum());
    		researchAchievement.setResearchCost(pja.getResearchCost());
    		researchAchievement.setCreateUser(userView.getUserName());
    		researchAchievement.setCreateTime(new Date());
    		researchAchievement.setIntroduction(pja.getIntroduction());
    		researchAchievement.setReviewMechanism(pja.getReviewMechanism());
    		researchAchievement.setType(pja.getType());
    		researchAchievement.setOrganization(pja.getOrganization());
    		researchAchievement.setEconomicBenefits(pja.getEconomicBenefits());
    		researchAchievement.setRemark(pja.getRemark());
    		List<Document> documents = new ArrayList<Document>()  ;
    		List<Document> dList = pja.getDocuments();
    		if(dList != null && dList.size() > 0){
				for(Document doc : dList){
					Document docnew = new Document();
					BeanUtils.copyProperties(doc, docnew);
					docnew.setId(null);
					docnew.setDocFk(null);
					documents.add(docnew);
				}
				researchAchievement.setDocuments(documents);
			}
    		this.researchAchievementManager.save(researchAchievement);
    	}
        return true;
    }

	public ResearchAchievementManager getResearchAchievementManager() {
		return researchAchievementManager;
	}

	public void setResearchAchievementManager(ResearchAchievementManager researchAchievementManager) {
		this.researchAchievementManager = researchAchievementManager;
	}
    
}
