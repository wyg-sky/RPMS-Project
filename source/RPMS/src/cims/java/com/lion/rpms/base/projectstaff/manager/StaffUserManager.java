package com.lion.rpms.base.projectstaff.manager;

import java.util.List;

import com.lion.rpms.base.projectstaff.model.StaffUser;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description : 人员职责-用户管理业务类
 * @Author : 曹鹏程
 * @Date ： 2015-03-11 10:48:04
 */

public interface StaffUserManager extends BusinessManager<StaffUser,String> {
     
	/**
	 * @description : 当前岗位下所有人员保存
	 * @date : 2015年3月11日上午11:18:07
	 * @author : cpc
	 * @return : String
	*/
	public String saveStaffUsers(List<StaffUser> staffdutyUserList,String staffId) throws Exception;
	
}
