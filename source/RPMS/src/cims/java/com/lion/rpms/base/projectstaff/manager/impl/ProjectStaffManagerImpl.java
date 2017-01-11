package com.lion.rpms.base.projectstaff.manager.impl;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.base.projectstaff.manager.ProjectStaffManager;
import com.lion.rpms.base.projectstaff.model.ProjectStaff;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description : 人员职责管理业务实现类
 * @Author : 曹鹏程
 * @Date ： 2015-03-10 13:09:38
 */

public class ProjectStaffManagerImpl extends BusinessManagerImpl<ProjectStaff,String> implements ProjectStaffManager {

    public ProjectStaffManagerImpl(GenericDao<ProjectStaff, String> dao) {
        super(dao);
    }
    
    @Override
    public boolean beforeDelete(HttpServletRequest request, String[] ids) throws Exception {
    	
    	try {
    		if(null != ids){
        		for (String id : ids) {
        			String sqlplat = "delete from RPMS_STAFF_PLAT where STAFF_ID='"+id+"'";
        			String sqluser = "delete from RPMS_STAFF_USER where STAFF_ID='"+id+"'";
        	        this.executeSql(sqlplat,new Object[0]);
        	        this.executeSql(sqluser,new Object[0]);
        	    }
        	}
    		return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
      
    }
     
}
