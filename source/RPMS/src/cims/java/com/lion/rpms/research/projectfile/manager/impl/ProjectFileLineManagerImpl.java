package com.lion.rpms.research.projectfile.manager.impl;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.core.util.PageBean;
import com.lion.core.util.json.JSONConfig;
import com.lion.core.util.json.JSONUtil;
import com.lion.rpms.base.researchplat.manager.ResearchPlatManager;
import com.lion.rpms.base.researchtalent.manager.ResearchTalentManager;
import com.lion.rpms.research.projectfile.manager.ProjectFileLineManager;
import com.lion.rpms.research.projectfile.model.ProjectFileLine;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.organization.manager.OrganizationManager;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

/**
 * @description ：通知接收
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public class ProjectFileLineManagerImpl extends BusinessManagerImpl<ProjectFileLine,String> implements ProjectFileLineManager {
	private ResearchPlatManager researchPlatManager;
	private ResearchTalentManager researchTalentManager;
	private OrganizationManager organizationManager;
	public ProjectFileLineManagerImpl(GenericDao<ProjectFileLine, String> dao) {
		super(dao);
//		this.setDataPower("100");
	}
	
	public String saveProjectFileLine(HttpServletRequest request) throws Exception{
		UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
		String msg="";
		try{
			String id = request.getParameter("id");
			String receiveUnit = request.getParameter("receiveUnit");
			String fileChecktime = request.getParameter("fileChecktime");
			String fileReceipt = request.getParameter("fileReceipt");
			
			ProjectFileLine fileline = this.get(id);
			fileline.setFileStatus("0002");
			fileline.setFileChecktime(fileChecktime);
			fileline.setFileReceipt(fileReceipt);
			
			Organization researchPlat = null;
			if(!"".equals(receiveUnit) && receiveUnit != null){
				researchPlat = organizationManager.get(receiveUnit);
				fileline.setReceiveUnit(researchPlat);
			}
//			ResearchTalent researchTalent = null;
//			if(!"".equals(receivePeople) && receivePeople != null){
//				researchTalent = researchTalentManager.get(receivePeople);
//				fileline.setReceivePeople(researchTalent);
//			}
			fileline.setReceivePeople(userView);
			
			this.save(fileline);
		}catch (Exception e) {
			msg="保存失败!";
			e.printStackTrace();
		}
		return msg;
	}
	
	public String selectProjectFileLine(HttpServletRequest request) throws Exception {
//		String[] center = PlatCenterUtil.getCurrentCenter(request.getSession());
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
	
	public ResearchPlatManager getResearchPlatManager() {
		return researchPlatManager;
	}
	public void setResearchPlatManager(ResearchPlatManager researchPlatManager) {
		this.researchPlatManager = researchPlatManager;
	}
	public ResearchTalentManager getResearchTalentManager() {
		return researchTalentManager;
	}
	public void setResearchTalentManager(ResearchTalentManager researchTalentManager) {
		this.researchTalentManager = researchTalentManager;
	}

	public OrganizationManager getOrganizationManager() {
		return organizationManager;
	}

	public void setOrganizationManager(OrganizationManager organizationManager) {
		this.organizationManager = organizationManager;
	}
}
