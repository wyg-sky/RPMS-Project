package com.lion.base.attendance.action;

import com.lion.base.attendance.manager.AttendanceManager;
import com.lion.base.attendance.model.Attendance;
import com.lion.system.common.action.BusinessAction;
/**
 * @description : 班次信息Action
 * @date : 2013-9-25上午10:02:27
 * @author : 辛尔青
 */
@SuppressWarnings("unchecked")
public class AttendanceAction extends BusinessAction{

	private static final long serialVersionUID = -1867885015206683286L;

	public AttendanceAction(Attendance businessObject, AttendanceManager manager) {
		super(businessObject,manager);
	}

}
