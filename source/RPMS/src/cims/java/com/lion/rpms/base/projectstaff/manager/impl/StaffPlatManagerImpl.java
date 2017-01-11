package com.lion.rpms.base.projectstaff.manager.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.base.projectstaff.manager.StaffPlatManager;
import com.lion.rpms.base.projectstaff.model.StaffPlat;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.user.model.UserView;

/**
 * @description : 人员职责-平台管理业务实现类
 * @Author : 曹鹏程
 * @Date ： 2015-03-11 10:54:06
 */

public class StaffPlatManagerImpl extends BusinessManagerImpl<StaffPlat,String> implements StaffPlatManager {

    public StaffPlatManagerImpl(GenericDao<StaffPlat, String> dao) {
        super(dao);
    }
    
    public String saveStaffPlats(List<StaffPlat> staffPlatList,String staffId) throws Exception {
		String msg="";
		try{
			String sql = "delete from RPMS_STAFF_PLAT t where t.STAFF_ID=?";
			this.executeSql(sql, new Object[]{staffId});
			if(null==staffPlatList || staffPlatList.size()==0){
				return msg;
			}
			for(StaffPlat staffPlat : staffPlatList){
				this.save(staffPlat);
			}
		}catch (Exception e) {
			msg="保存失败!";
			e.printStackTrace();
			
		}
		
		return msg;
	}
    
    @SuppressWarnings("unchecked")
	public String getFirstCenter(HttpServletRequest request) throws Exception {
    	
    	UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
    	String sql = "select distinct rpl.id,rpl.plat_name  from RPMS_STAFF_PLAT plat,RPMS_STAFF_USER us,RPMS_PROJECT_STAFF staff ,rpms_research_plat rpl"
    			+ " where plat.staff_id = us.staff_id and plat.staff_id = staff.id and rpl.id = plat.plat_id and rpl.parent is null  and rownum=1 "
				+ " and us.user_id ='"+userView.getId()+"'";
    	List<Object[]> list =  this.executeQuerySql(sql,new Object[0]);
    	if(null != list && list.size()>0){
    		return "{success : true, id : \""+list.get(0)[0]+"\",name : \""+list.get(0)[1]+"\"}";
    	}else{
    		return "{success : true, id : \"\",name : \"\"}";
    	}
	}
     
}
