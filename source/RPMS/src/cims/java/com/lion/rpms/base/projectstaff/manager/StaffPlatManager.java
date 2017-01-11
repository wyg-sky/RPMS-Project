package com.lion.rpms.base.projectstaff.manager;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.lion.rpms.base.projectstaff.model.StaffPlat;
import com.lion.system.common.manager.BusinessManager;

/**
 * @description : 人员职责-平台管理业务类
 * @Author : 曹鹏程
 * @Date ： 2015-03-11 10:54:06
 */

public interface StaffPlatManager extends BusinessManager<StaffPlat,String> {
	
	/**
	 * @description : 当前岗位管理所有创新平台
	 * @date : 2015年3月11日下午2:55:54
	 * @author : cpc
	 * @return : String
	*/
	public String saveStaffPlats(List<StaffPlat> staffPlatList,String staffId) throws Exception;
	
	public String getFirstCenter(HttpServletRequest request) throws Exception;
	
}
