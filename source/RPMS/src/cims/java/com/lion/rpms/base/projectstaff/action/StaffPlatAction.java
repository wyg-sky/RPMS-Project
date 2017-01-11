package com.lion.rpms.base.projectstaff.action;

import java.util.List;

import com.lion.rpms.base.projectstaff.manager.StaffPlatManager;
import com.lion.rpms.base.projectstaff.model.StaffPlat;
import com.lion.system.common.action.BusinessAction;
import com.opensymphony.oscache.util.StringUtil;

/**
 * @description : 人员职责-平台管理Action类
 * @Author : 曹鹏程
 * @Date ：2015-03-11 10:54:06
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class StaffPlatAction extends BusinessAction {
	private List<StaffPlat> staffPlatList; 
    private static final long serialVersionUID = 1L;
	
	public StaffPlatAction(StaffPlat businessObject, StaffPlatManager manager) {
        super(businessObject, manager);
    }
	
	/**
	 * @description : 当前岗位管理所有创新平台
	 * @date : 2015年3月11日下午2:52:26
	 * @author : cpc
	 * @return : String
	*/
	public String saveStaffPlats() throws Exception {
		String staffId = getRequest().getParameter("staffId");
		
		StaffPlatManager staffPlatManager = (StaffPlatManager)this.manager;
		String msg = staffPlatManager.saveStaffPlats(this.staffPlatList,staffId);
		if(!StringUtil.isEmpty(msg)){
			this.print("{success:false,msg:\""+msg+"\"}");
		}else{
			this.print("{success:true}");
		}
		return NONE;
	}
	
	/**
	 * @description : 获得第一个分中心值
	 * @date : 2015年3月30日上午10:38:54
	 * @author : cpc
	 * @return : String
	*/
	public String getFirstCenter() throws Exception {
		StaffPlatManager staffPlatManager = (StaffPlatManager)this.manager;
		try {
			this.print(staffPlatManager.getFirstCenter(getRequest()));
		}catch (Exception e) {
			e.printStackTrace();
		}
		return NONE;
	}

	public List<StaffPlat> getStaffPlatList() {
		return staffPlatList;
	}

	public void setStaffPlatList(List<StaffPlat> staffPlatList) {
		this.staffPlatList = staffPlatList;
	}
	
}
