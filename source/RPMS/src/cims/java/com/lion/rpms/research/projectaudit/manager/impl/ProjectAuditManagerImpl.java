package com.lion.rpms.research.projectaudit.manager.impl;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.common.PlatCenterUtil;
import com.lion.rpms.research.project.model.Project;
import com.lion.rpms.research.projectaudit.manager.ProjectAuditManager;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.department.model.Department;
import com.lion.system.framework.model.LoginInfo;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.User;

/**
 * @description : 项目立项审核业务实现
 * @Author : 杨尚山
 * @Date ：2016-04-28
 */
public class ProjectAuditManagerImpl extends BusinessManagerImpl<Project,String> implements ProjectAuditManager {

	public ProjectAuditManagerImpl(GenericDao<Project, String> dao) {
		super(dao);
		this.setDataPower("200");
		this.setOrganizationField("chargeDepartnent");
	}
	
	/**
	 * 重写数据权限方法
	 */
	public StringBuilder genListDataPowerHql(HttpServletRequest request) throws Exception {
	    StringBuilder sbHql = new StringBuilder("");
	    if ("000".equals(this.getDataPower())) {
	      return sbHql;
	    }
	    if (this.getDataPower().length() != 3) {
	      return sbHql;
	    }
	    LoginInfo info = (LoginInfo)request.getSession().getAttribute("loginInfo");
	    if ((info != null) && (info.getIsAdmin())) {
	      return sbHql;
	    }
	    
	    //新增当拥有"管理专业专家"权限时,可查看所有"项目立项审批"模块的数据BEGIN
	    Set<String> roleCodes = PlatCenterUtil.getCurrentRoleCodes();
	    if(PlatCenterUtil.hasRoleCode(roleCodes, "RPMS_GUANLI_01")){
	    	return sbHql;
	    }//END
	    
	    int orgFlag = Integer.parseInt(this.getDataPower().substring(0, 1));
	    int deptFlag = Integer.parseInt(this.getDataPower().substring(1, 2));
	    int userFlag = Integer.parseInt(this.getDataPower().substring(2, 3));

	    switch (orgFlag)
	    {
	    case 0:
	      break;
	    case 1:
	      Organization org = (Organization)request.getSession().getAttribute("userOrganizaiton");
	      sbHql.append(" and obj.").append(getOrganizationField());
	      sbHql.append(".id = '").append(org.getId()).append("'");
	      break;
	    case 2:
	      String orgPower = (String)request.getSession().getAttribute("userDataPowerOfOrgSql");
	      sbHql.append(" and obj.").append(getOrganizationField());
	      sbHql.append(".id in ").append(orgPower);
	      break;
	    case 3:
	      Organization orga = (Organization)request.getSession().getAttribute("userOrganizaiton");
	      sbHql.append(" and (obj.").append(getOrganizationField());
	      sbHql.append(".id = '").append(orga.getId()).append("' or obj.").append(getOrganizationField());
	      sbHql.append(".parent.id ='").append(orga.getId()).append("')");
	      break;
	    case 4:
	      Organization orgb = (Organization)request.getSession().getAttribute("userOrganizaiton");
	      sbHql.append(" and (obj.").append(getOrganizationField());
	      sbHql.append(".id = '").append(orgb.getId()).append("'");
	      if (orgb.getParent() != null) {
	        sbHql.append(" or obj.").append(getOrganizationField());
	        sbHql.append(".id ='").append(orgb.getParent().getId()).append("'");
	      }
	      sbHql.append(")");
	    case 5:
	      Organization orgc = (Organization)request.getSession().getAttribute("userOrganizaiton");
	      sbHql.append(" and obj.").append(getOrganizationField());
	      sbHql.append(".id in (");
	      sbHql.append("select id from Organization where code like '");
	      sbHql.append(orgc.getCode());
	      sbHql.append("%')");
	    }

	    switch (deptFlag)
	    {
	    case 0:
	      break;
	    case 1:
	      Department dept = (Department)request.getSession().getAttribute("userDepartment");
	      sbHql.append(" and obj.").append(getDepartmentField());
	      sbHql.append(".id = '").append(dept.getId()).append("'");
	      break;
	    case 2:
	      String deptPower = (String)request.getSession().getAttribute("userDataPowerOfDeptSql");
	      sbHql.append(" and obj.").append(getDepartmentField());
	      sbHql.append(".id in ").append(deptPower);
	    }

	    switch (userFlag)
	    {
	    case 0:
	      break;
	    case 1:
	      User user = (User)request.getSession().getAttribute("userAuth");
	      sbHql.append(" and obj.").append(getUserField());
	      sbHql.append(" = '").append(user.getId()).append("'");
	    }

	    return sbHql;
	  }
	
	/**
	 * 是否管理专业人员
	 */
	public String isGuanliRole(HttpServletRequest request) throws Exception{
		Set<String> roleCodes = PlatCenterUtil.getCurrentRoleCodes();
		return "{success:true,isGuanliRole:\""+PlatCenterUtil.hasRoleCode(roleCodes, "RPMS_GUANLI_01")+"\"}";
	}

}
