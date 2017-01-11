package com.lion.rpms.common;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.lion.rpms.base.projectstaff.model.StaffPlat;
import com.lion.rpms.base.projectstaff.model.StaffUser;
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.system.Constants;
import com.lion.system.common.manager.BusinessManager;
import com.lion.system.role.model.Role;
import com.lion.system.user.model.User;
import com.lion.system.user.model.UserView;

public class PlatCenterUtil {
	
	/**
	 * 
	 * @description : 获取当前登录用户的分中心级别平台，不存在或者多个则抛异常
	 * @date : 2015年3月24日下午3:19:30
	 * @author : 周强
	 * @param manager
	 * @return
	 * @return : ResearchPlat
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static ResearchPlat getCurrentPlatCenter(BusinessManager manager){
		String userId = getCurrentUserId();
		String hql = "from StaffUser where userId.id = ?";
		List<StaffUser> staffUsers = null;
		try {
			staffUsers = (List<StaffUser>)manager.executeQuery(hql, new Object[]{userId});
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if(staffUsers == null || staffUsers.size() == 0){  //如果没有设置职责
			//this.setMessage("当前登录用户未设置职责");
			throw new RuntimeException("当前登录用户未设置职责");
		}
		
		//职责ID
		StringBuilder staffIds = new StringBuilder();
		staffIds.append("(");
		for(StaffUser staffUser :staffUsers){
			staffIds.append("'");
			staffIds.append(staffUser.getStaffId());
			staffIds.append("',");
		}
		staffIds.deleteCharAt(staffIds.length()-1);
		staffIds.append(")");
		
		System.out.println(staffIds.toString());
		String staffHql = "from StaffPlat where staffId.id in "+staffIds.toString();
		
		List<StaffPlat> staffPlatList = null;
		try {
			staffPlatList = (List<StaffPlat>)manager.executeQuery(staffHql, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		if(staffPlatList == null || staffPlatList.size() == 0){  //职责没有关联平台
			//this.setMessage("当前登录用户的职责未关联平台");
			throw new RuntimeException("当前登录用户的职责未关联平台");
		}
		
		Map<String,ResearchPlat> plats = new HashMap<String,ResearchPlat>();
		String platId = null;
		for(StaffPlat staffPlat:staffPlatList){
			if(staffPlat.getPlatId().getParent() == null){  //只保留分中心，没有父节点的判断为分中心
				platId = staffPlat.getPlatId().getId();
				plats.put(platId,staffPlat.getPlatId());
			}
		}
		if(plats.size() == 0){
			//this.setMessage("当前登录用户关联平台不是分中心级别");
			throw new RuntimeException("当前登录用户关联平台不是分中心级别");
		} else if(plats.size() > 1){
			//this.setMessage("当前登录用户关联多了个分中心");
			throw new RuntimeException("当前登录用户关联多了个分中心,请指定唯一分中心");
		}
		
		return plats.get(platId);
	}
	
	/**
	 * 
	 * @description : 获取当前用户角色编码
	 * @date : 2015年4月23日上午9:25:22
	 * @author : 周强
	 * @return
	 * @return : Set<String>
	 */
	public static Set<String> getCurrentRoleCodes(){
		User user = (User)ServletActionContext.getRequest().getSession().getAttribute(Constants.USER_AUTH);
		Set<Role> roles = user.getRoles();
		Set<String> roleCodes = new HashSet<String>();
		for(Role role:roles){
			roleCodes.add(role.getCode());
		}
		return roleCodes;
	}
	
	/**
	 * 
	 * @description : 判断当前用户编码是否包含指定的编码
	 * @date : 2015年4月23日上午9:55:37
	 * @author : 周强
	 * @param codes
	 * @param roleCodes
	 * @return
	 * @return : boolean
	 */
	public static boolean hasRoleCode(Set<String> codes,String... roleCodes){
		for(String code:roleCodes){
			if(codes.contains(code)){
				return true;
			}
		}
		return false;
	}
	
	
	/**
	 * 
	 * @description : 增加按照创新平台控制的数据权限
	 * @date : 2015年3月24日下午3:52:09
	 * @author : 周强
	 * @return
	 * @return : StringBuilder
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static StringBuilder addPlatCtrl(StringBuilder sb,BusinessManager manager){
		String userId = getCurrentUserId();
		
		//系统管理员登录不加控制
		if("00000000000000000000000000000001".equals(userId)){
			return sb;
		}
		
		String sql = "select distinct plat.plat_id from RPMS_STAFF_PLAT plat,RPMS_STAFF_USER us,RPMS_PROJECT_STAFF staff"
				+ " where plat.staff_id = us.staff_id and plat.staff_id = staff.id"
				+ " and us.user_id ='"+userId+"'";
		List<String> plateList = manager.executeQuerySql(sql, new Object[0]);
		String pladIds = StringUtils.join(plateList, "','");
		sb.append(" and( obj.platInstitution.id in('");
		sb.append(pladIds);
		sb.append("')");
		sb.append(" and obj.platCenter.id in('");
		sb.append(pladIds);
		sb.append("'))");
		
		return sb;
	}
	
	/**
	 * 
	 * @description : 获取当前用户关联的平台ID 单引号加引文','拼接
	 * @date : 2015年3月26日下午4:01:04
	 * @author : 周强
	 * @param session
	 * @return
	 * @return : String
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static String getCurrentPlatIds(HttpSession session){
		String userId = getCurrentUserId(session);
		BusinessManager manager = getManager(session);
		String sql = "select distinct plat.plat_id from RPMS_STAFF_PLAT plat,RPMS_STAFF_USER us,RPMS_PROJECT_STAFF staff"
				+ " where plat.staff_id = us.staff_id and plat.staff_id = staff.id"
				+ " and us.user_id ='"+userId+"'";
		List<String> plateList = manager.executeQuerySql(sql, new Object[0]);
		String pladIds = StringUtils.join(plateList, "','");
		return "'"+pladIds+"'";
	}
	
	/**
	 * 
	 * @description : 获取当前用户ID，在Struts内使用
	 * @date : 2015年3月26日下午3:28:01
	 * @author : 周强
	 * @return
	 * @return : String
	 */
	private static String getCurrentUserId(){
		UserView user = (UserView)ServletActionContext.getRequest().getSession().getAttribute(Constants.USER_VIEW);
		return user.getId();
	}
	
	/**
	 * 
	 * @description : 获取当前用户ID
	 * @date : 2015年3月26日下午3:28:42
	 * @author : 周强
	 * @param request
	 * @return
	 * @return : String
	 */
	public static String getCurrentUserId(HttpSession session){
		UserView user = (UserView)session.getAttribute(Constants.USER_VIEW);
		return user.getId();
	}
	
	/**
	 * 
	 * @description : 是否为中心管理员
	 * @date : 2015年3月25日上午8:51:30
	 * @author : 周强
	 * @param session
	 * @return
	 * @return : boolean
	 */
	public static boolean isCenterManager(HttpSession session,String[] roleNums){
		User user = (User)session.getAttribute(Constants.USER_AUTH);
		Set<Role> roles = user.getRoles();
		for(Role role:roles){
			for(String roleNum:roleNums){
				if(role.getCode().equals(roleNum)){  //0003中心管理  0004分中心管理员
					return true;
				}
			}
		}
		return false;
	}
	
	/**
	 * 获取当前用户的分中心ID 名称
	 * @description : 
	 * @date : 2015年3月31日上午9:14:56
	 * @author : 周强
	 * @param session
	 * @return
	 * @return : String[]  0  id   1  名称
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static String[] getCurrentCenter(HttpSession session){
		List<Object[]> result = null;
		try {
			UserView user = (UserView)session.getAttribute(Constants.USER_VIEW);
//			String userId = getCurrentUserId(session);
			BusinessManager manager = getManager(session);
//			String sql = "SELECT DISTINCT\n" +
//					"	PLAT. ID,\n" +
//					"	PLAT.PLAT_NAME,\n" +
//					"	plat.plat_code\n" +
//					"FROM\n" +
//					"	RPMS_STAFF_USER staffUser\n" +
//					"LEFT JOIN RPMS_STAFF_PLAT staffPlat ON staffPlat.STAFF_ID = staffUser.STAFF_ID\n" +
//					"LEFT JOIN RPMS_RESEARCH_PLAT plat ON plat. ID = staffPlat.plat_id\n" +
//					"WHERE\n" +
//					"	staffUser.USER_ID = ?\n" +
//					"AND PLAT. PARENT IS NULL\n" +
//					"AND PLAT. ID IS NOT NULL\n" +
//					"ORDER BY\n" +
//					"	PLAT_CODE";
			StringBuilder sqlSB = new StringBuilder();
			sqlSB.append(" select DISTINCT ");
			sqlSB.append(" p.id,p.plat_name,p.plat_code ");
			sqlSB.append(" from RPMS_RESEARCH_PLAT p ");
			sqlSB.append(" inner join itsm_organization o on o.plat_center=p.id ");
			sqlSB.append(" where 1=1 and o.id=? ");
			sqlSB.append(" order by p.plat_code asc ");
			String organizationId = user.getOrganization().getId();//当前等于用户单位id
			result = manager.executeQuerySql(sqlSB.toString(), new Object[]{organizationId});
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(result != null && result.size() > 0){
			return new String[]{result.get(0)[0].toString(),result.get(0)[1].toString()};
		}
		return new String[]{"",""};
	}
	
	/**
	 * 
	 * @description : 获取ObjectManager
	 * @date : 2015年3月26日下午3:26:34
	 * @author : 周强
	 * @param request
	 * @return
	 * @return : BusinessManager
	 */
	@SuppressWarnings("rawtypes")
	public static BusinessManager getManager(HttpSession session){
		ApplicationContext  ac = WebApplicationContextUtils.getWebApplicationContext(session.getServletContext());
		return (BusinessManager)ac.getBean("objectManager");
	}
	
}
