package com.lion.rpms.research.internalaward.manager.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.research.internalaward.manager.InternalAwardManager;
import com.lion.rpms.research.porjectaward.model.ProjectAward;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.framework.model.LoginInfo;
import com.lion.system.organization.model.Organization;
import com.lion.system.role.model.Role;

/**
 * @description : 项目内部报奖业务实现
 * @date : 2015年5月19日上午10:32:41
 * @author : cpc
 */
public class InternalAwardManagerImpl extends BusinessManagerImpl<ProjectAward,String> implements InternalAwardManager {

		public InternalAwardManagerImpl(GenericDao<ProjectAward, String> dao) {
			super(dao);
		}
		
		/**
		 * 重写数据权限方法
		 */
		@SuppressWarnings("unchecked")
		public StringBuilder genListDataPowerHql(HttpServletRequest request) throws Exception {
			StringBuilder sbHql = new StringBuilder("");
			
			//admin用户可以查看所有数据
			LoginInfo info = (LoginInfo)request.getSession().getAttribute("loginInfo");
			if ((info != null) && (info.getIsAdmin())) {
				return sbHql;
			}
			
			//判断用户的角色权限,当检测到有'内部报奖查看所有数据的权限'的权限时,返回true
			boolean roleCheck = false;
			List<Role> role = (List<Role>) request.getSession().getAttribute(Constants.USER_ROLES);
			for(Role r : role){
				if("RPMS_PROJECT_AWARD_ROLE".equalsIgnoreCase(r.getCode())){
					roleCheck = true;
				}
			}
			
			//当用户权限包含'内部报奖查看所有数据的权限'权限时,绕过数据权限的控制,即可以查看所有数据
			if(!roleCheck){
				Organization org = (Organization)request.getSession().getAttribute("userOrganizaiton");
				sbHql.append(" and obj.").append(getOrganizationField());
				sbHql.append(".id = '").append(org.getId()).append("'");
			}
			
			return sbHql;
		}
		
		/**
		 * 录入退回原因
		 */
		public String backReasonAwards(HttpServletRequest request) throws Exception{
			String ids = request.getParameter("ids");
			String reason = request.getParameter("reason");
			String[] arr = ids.split(",");
			for(String id : arr){
				this.executeSql("update RPMS_PROJECT_AWARD set status='0000',backreason = '"+reason+"' where id = '"+id+"'", new Object[0]);
			}
			
			return "{success:true}";
		}
		
}
