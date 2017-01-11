package com.lion.rpms.research.porjectaward.manager.impl;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.core.util.PageBean;
import com.lion.core.util.StringUtils;
import com.lion.core.util.json.JSONConfig;
import com.lion.core.util.json.JSONUtil;
import com.lion.rpms.common.UserToPlat;
import com.lion.rpms.research.porjectaward.manager.ProjectAwardManager;
import com.lion.rpms.research.porjectaward.model.ProjectAward;
import com.lion.rpms.research.researchhonor.manager.ResearchHonorManager;
import com.lion.rpms.research.researchhonor.model.ResearchHonor;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

/**
 * @description ：项目报奖管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public class ProjectAwardManagerImpl extends BusinessManagerImpl<ProjectAward,String> implements ProjectAwardManager {
	private ResearchHonorManager researchHonorManager;
	
	public ProjectAwardManagerImpl(GenericDao<ProjectAward, String> dao) {
		super(dao);
//		this.setDataPower("100");
	}
	
	/**
	 * 将数据插入荣誉管理库
	 */
	public void insertAwards(HttpServletRequest request){
		String ids = request.getParameter("ids");
		String[] idList = ids.split(",");
		for(int i=0;i<idList.length;i++){
			String id = idList[i].toString();
			ProjectAward projectAward = this.get(id);
			
			ResearchHonor researchHonor  = new ResearchHonor();
//			researchHonor.setProjectId(projectAward.getProjectId().getProjectName());
			researchHonor.setPlatCenter(projectAward.getProjectId().getPlatCenter());
			researchHonor.setPlatInstitution(projectAward.getProjectId().getPlatInstitution());
			researchHonor.setHonorReward(projectAward.getAwardAmount());
			researchHonor.setOrganization(projectAward.getOrganization());
			this.researchHonorManager.save(researchHonor);
		}
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
	public String load(HttpServletRequest request) throws Exception {
		String id = request.getParameter("id");
		Organization org = (Organization) request.getSession().getAttribute(Constants.USER_ORGANIZATION);
		
		if (!StringUtils.isEmpty(id)) {
			ProjectAward projectAward = this.get(id);
			if("0002".equals(projectAward.getStatus()) 
					&& !"0003".equals(org.getOrganiztionType())){
				projectAward.setStatus("0003");
			}
			JSONConfig config = new JSONConfig();
			config.setClosCollection(true);      //关闭集合
			String json = JSONUtil.serializeForForm(projectAward, "root", config);
			return json;
		} else {
			throw new Exception("id为空");
		}
	}
	public String listProjectAward(HttpServletRequest request) throws Exception {
		Organization organization = (Organization) request.getSession().getAttribute(Constants.USER_ORGANIZATION);
		
	 	StringBuilder sbHql = new StringBuilder();
		PageBean pageBean = new PageBean();
		pageBean.setLimit(request.getParameter("limit"));
		pageBean.setStart(request.getParameter("start"));
		
		String qualString = "";
		String fileCode = request.getParameter("fileCode");
		if(fileCode != null && !"".equals(fileCode) ){
			qualString += " and fil.fileCode like '%"+fileCode+"%'";
		}
		String fileName = request.getParameter("fileName");
		if(fileName != null && !"".equals(fileName) ){
			qualString += " and fil.fileName = '"+fileName+"'";
		}
		String tileType = request.getParameter("tileType");
		if(tileType != null && !"".equals(tileType) ){
			qualString += " and fil.tileType = '"+tileType+"'";
		}
		String status = request.getParameter("status");
		if(status != null && !"".equals(status) ){
			qualString += " and fil.status = '"+status+"'";
		}
		
		sbHql.append("select fil.id," +
			  "     fil.fileCode," +
			  "     fil.fileName," +
			  "     fil.tileType," +
			  "     fil.fileTime," +
			  "     plat.name," +
			  "     fil.approveUser," +
			  "     fil.status," +
			  "     filline.fileStatus" +
			  " from ProjectFileLine filline," +
			  "     ProjectFile      fil," +
			  "     Organization     plat" +
			  " where filline.mainId = fil.id" +
			  " and filline.receiveUnit = plat.id" +
			  " and filline.receiveUnit = '"+organization.getId()+"'" +
			  " and fil.status = '0003'" +
			  ""+qualString+"  order by fil.createTime desc");
		pageBean.setQueryHql(sbHql.toString());
		try {
			this.findPageAll(pageBean);
			String json = JSONUtil.serializeForGrid(pageBean.getResult(),"root", pageBean.getTotalCount(), new JSONConfig());
			return json;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public ResearchHonorManager getResearchHonorManager() {
		return researchHonorManager;
	}

	public void setResearchHonorManager(ResearchHonorManager researchHonorManager) {
		this.researchHonorManager = researchHonorManager;
	}
}
