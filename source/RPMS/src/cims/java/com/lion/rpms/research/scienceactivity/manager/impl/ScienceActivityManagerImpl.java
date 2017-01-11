package com.lion.rpms.research.scienceactivity.manager.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.research.scienceactivity.manager.ScienceActivityManager;
import com.lion.rpms.research.scienceactivity.model.ScienceActivity;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description ：科技活动费用
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public class ScienceActivityManagerImpl extends BusinessManagerImpl<ScienceActivity,String> implements ScienceActivityManager {
	public ScienceActivityManagerImpl(GenericDao<ScienceActivity, String> dao) {
		super(dao);
		this.setDataPower("100");
	}
	
	@Override
	@SuppressWarnings({"unchecked"})
	public String changeReportStatus(HttpServletRequest request) {
		String costsMonths = "";
		if(!"".equals(request.getParameter("costsMonths")) 
				&& request.getParameter("costsMonths") != null){
			costsMonths = request.getParameter("costsMonths");
		}
		String organization = "";
		if(!"".equals(request.getParameter("organization")) 
				&& request.getParameter("organization") != null){
			organization = request.getParameter("organization");
		}
		String status = "";
		if(!"".equals(request.getParameter("status")) 
				&& request.getParameter("status") != null){
			status = request.getParameter("status");
		}
		
		String sql = "select distinct sa.status"+
					 " from RPMS_SCIENCE_ACTIVITY sa"+
					 " where sa.years = '"+costsMonths+"'"+
					 "   and sa.dept = '"+organization+"'";
		
		List list = this.executeQuerySql(sql, new String[0]);
		if(list != null && list.size() >0){
			String sta = list.get(0).toString();
			if(status.equals(sta)){
				return  "{success:false,msg:'状态相同，无需修改！'}";
			}else if("0002".equals(status) && !"0001".equals(sta) && !"0004".equals(sta)){
				return  "{success:false,msg:'只有未上报或已打回的数据才可以上报！'}";
			}else if("0003".equals(status) && !"0002".equals(sta)){
				return  "{success:false,msg:'只有已上报的数据才可以审批！'}";
			}else if("0004".equals(status) && !"0002".equals(sta)){
				return  "{success:false,msg:'只有已上报的数据才可以退回！'}";
			}else if("0000".equals(status) && !"0001".equals(sta)&& !"0004".equals(sta)){
				return  "{success:false,msg:'只有未上报或已打回的数据才可以填报！'}";
			}else{
				if(!"0000".equals(status)){
					String sqlup = "update RPMS_SCIENCE_ACTIVITY sa "+
								 "   set sa.status = '"+status+"' "+
								 " where sa.years = '"+costsMonths+"'"+
								 "   and sa.dept = '"+organization+"'";
					this.executeSql(sqlup, new String[0]);
					return  "{\"success\":true,\"msg\":'操作成功！'}";
				}else{
					return  "{\"success\":true}";
				}
			}
		}else{
			if(!"0000".equals(status)){
				return  "{\"success\":false,msg:'数据错误，请联系管理员！'}";
			}else{
				return  "{\"success\":true}";
			}
		}
	}
}
