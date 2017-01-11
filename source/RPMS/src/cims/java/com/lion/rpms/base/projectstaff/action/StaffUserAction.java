package com.lion.rpms.base.projectstaff.action;

import java.util.List;

import com.lion.rpms.base.projectstaff.manager.StaffUserManager;
import com.lion.rpms.base.projectstaff.model.StaffUser;
import com.lion.system.common.action.BusinessAction;
import com.opensymphony.oscache.util.StringUtil;

/**
 * @description : 人员职责-用户管理Action类
 * @Author : 曹鹏程
 * @Date ：2015-03-11 10:48:04
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class StaffUserAction extends BusinessAction {
	private List<StaffUser> staffUserList;
    private static final long serialVersionUID = 1L;
	
	public StaffUserAction(StaffUser businessObject, StaffUserManager manager) {
        super(businessObject, manager);
    }
	
	/**
	 * @description : 当前岗位下所有人员保存
	 * @date : 2015年3月11日下午2:52:26
	 * @author : cpc
	 * @return : String
	*/
	public String saveStaffUsers() throws Exception {
		String staffId = getRequest().getParameter("staffId");
		
		StaffUserManager staffUserManager = (StaffUserManager)this.manager;
		String msg=staffUserManager.saveStaffUsers(this.staffUserList,staffId);
		if(!StringUtil.isEmpty(msg)){
			this.print("{success:false,msg:\""+msg+"\"}");
		}else{
			this.print("{success:true}");
		}
		return NONE;
	}

	public List<StaffUser> getStaffUserList() {
		return staffUserList;
	}

	public void setStaffUserList(List<StaffUser> staffUserList) {
		this.staffUserList = staffUserList;
	}
	
}
