package com.lion.rpms.base.projectstaff.manager.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.core.util.PageBean;
import com.lion.core.util.json.JSONConfig;
import com.lion.core.util.json.JSONUtil;
import com.lion.rpms.base.projectstaff.manager.StaffUserManager;
import com.lion.rpms.base.projectstaff.model.StaffUser;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description : 人员职责-用户管理业务实现类
 * @Author : 曹鹏程
 * @Date ： 2015-03-11 10:48:04
 */

public class StaffUserManagerImpl extends BusinessManagerImpl<StaffUser,String> implements StaffUserManager {

    public StaffUserManagerImpl(GenericDao<StaffUser, String> dao) {
        super(dao);
    }
    
    @Override
    public String list(HttpServletRequest request, StaffUser businessObject, JSONConfig config, String queryHql, String countHql, Object[] values) throws Exception {
        PageBean pageBean = new PageBean();
        pageBean.setLimit(request.getParameter("limit"));
        pageBean.setStart(request.getParameter("start"));
        pageBean.setCountHql(countHql);
        pageBean.setQueryHql(queryHql);
        pageBean.setValues(values);

        findPageAll(pageBean);
        config.setDepth(3);
        String json = JSONUtil.serializeForGrid(pageBean.getResult(), "root", pageBean.getTotalCount(), config);
        return json;
    }
    
    public String saveStaffUsers(List<StaffUser> staffUserList,String staffId) throws Exception {
		String msg="";
		try{
			String sql = "delete from RPMS_STAFF_USER t where t.STAFF_ID=?";
			this.executeSql(sql, new Object[]{staffId});
			if(null==staffUserList || staffUserList.size()==0){
				return msg;
			}
			
			for(StaffUser staffUser:staffUserList){
					this.save(staffUser);
			}
		}catch (Exception e) {
			msg="保存失败!";
			e.printStackTrace();
		}
		return msg;
	}
     
}
