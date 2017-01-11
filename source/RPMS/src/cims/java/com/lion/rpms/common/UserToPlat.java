package com.lion.rpms.common;

import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.lion.system.common.manager.BusinessManager;

/**
 * @description : 根据人员查询人员管理平台
 * @date : 2015年3月23日下午3:42:33
 * @author : cpc
 */
public class UserToPlat {

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getPlatsStr(String userId,BusinessManager manager) throws Exception {
		
		String platStr = "";
		String sql = "";
		if(userId.equals("00000000000000000000000000000001")){
			sql = "select id from RPMS_RESEARCH_PLAT";
		}else{
			sql = "select distinct plat.plat_id from RPMS_STAFF_PLAT plat,RPMS_STAFF_USER us,RPMS_PROJECT_STAFF staff"
			+ " where plat.staff_id = us.staff_id and plat.staff_id = staff.id"
			+ " and us.user_id ='"+userId+"'";
		}
				
		List<String> plateList = manager.executeQuerySql(sql, new Object[0]);
		if(null != plateList){
			for (int i = 0; i < plateList.size(); i++) {
				platStr = plateList.get(i) +"','"+platStr.toString();
			}
		}
		if(StringUtils.isNotEmpty(platStr)){
			platStr = "'"+platStr.substring(0, platStr.length()-2);
		}else{
			platStr ="''";
		}
		return platStr;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getSpecialtyStr(String userId,BusinessManager manager) throws Exception {
		
		String platStr = "";
		StringBuilder sql = new StringBuilder();
		sql.append(" select distinct sd.id from RPMS_SPECIALTY_DICTIONARY sd ");
		sql.append(" left join ITSM_ROLE_ORGANIZATION ro on ro.organization_id=sd.check_organization ");
		sql.append(" left join ITSM_USER_ROLE ur on ur.role_id=ro.role_id ");
		sql.append(" where ur.user_id='").append(userId).append("' ");
				
		List<String> plateList = manager.executeQuerySql(sql.toString(), new Object[0]);
		if(null != plateList){
			for (int i = 0; i < plateList.size(); i++) {
				platStr = plateList.get(i) +"','"+platStr.toString();
			}
		}
		if(StringUtils.isNotEmpty(platStr)){
			platStr = "'"+platStr.substring(0, platStr.length()-2);
		}else{
			platStr ="''";
		}
		return platStr;
	}

}
