package com.lion.rpms.research.researchpatent.manager.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.research.researchpatent.manager.ResearchPatentManager;
import com.lion.rpms.research.researchpatent.model.ResearchPatent;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description ：专利管理
 * @date ：2015-03-09
 * @author ：王圣磊
 */
public class ResearchPatentManagerImpl extends BusinessManagerImpl<ResearchPatent,String> implements ResearchPatentManager {
	public ResearchPatentManagerImpl(GenericDao<ResearchPatent, String> dao) {
		super(dao);
		this.setDataPower("500");
	}
	
	private int aheadAlertMonth = 2;//提前提醒的月份
	
	@Override
	public void updateProtectStatus() {
		int alertProtectMonth = 3;//续费提醒月份
		int unProtectMonth = 4;//专利过期/无效月份
		
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		//续费提醒
		cal.add(Calendar.MONTH, alertProtectMonth);
		String sql = "update RPMS_RESEARCH_PATENT SET VALID = '0003' where PROTECT_DATE <= ? and PROTECT_DATE > ? and PROTECT_DATE is not null";
		this.executeSql(sql, new Object[]{sdf.format(cal.getTime()), sdf.format(new Date())});
		
		//专利过期
		cal.add(Calendar.MONTH, -alertProtectMonth-unProtectMonth);
		sql = "UPDATE RPMS_RESEARCH_PATENT SET VALID = '0002' WHERE	PROTECT_DATE < ? and PROTECT_DATE > ? and PROTECT_DATE is not null";
		this.executeSql(sql, new Object[]{sdf.format(new Date()), sdf.format(cal.getTime())});
		//无效专利
		sql = "UPDATE RPMS_RESEARCH_PATENT SET VALID = '0000' WHERE	PROTECT_DATE < ? and PROTECT_DATE < ? and PROTECT_DATE is not null";
		this.executeSql(sql, new Object[]{sdf.format(new Date()), sdf.format(cal.getTime())});
	}
	
	public void updateProtectAlert(){
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MONTH, this.aheadAlertMonth);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String alertDate = sdf.format(cal.getTime());
		String sql = "update RPMS_RESEARCH_PATENT SET PROTECTED_ALERT = '0001' where PROTECT_DATE <= '"+alertDate+"'";//0001需要提醒
		this.executeSql(sql, new Object[]{});
		sql = "update RPMS_RESEARCH_PATENT SET PROTECTED_ALERT = '0000' where PROTECT_DATE > '"+alertDate+"'";//0000不需要提醒
		this.executeSql(sql, new Object[]{});
	}
	
	@Override
	public boolean afterSave(HttpServletRequest request, ResearchPatent businessObject) throws Exception {
		this.getCurrentSession().flush();
		this.updateProtectStatus();
		this.updateProtectAlert();
		return super.afterSave(request, businessObject);
	}

	public int getAheadAlertMonth() {
		return aheadAlertMonth;
	}

	public void setAheadAlertMonth(int aheadAlertMonth) {
		this.aheadAlertMonth = aheadAlertMonth;
	}
	
	/*@Override
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
	    StringBuilder sbHql = new StringBuilder(" where 1=1 ");
	    
	    UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
	    //添加人员管理平台权限设置
	    UserToPlat  userToPlat = new UserToPlat();
	    String platStr = userToPlat.getPlatsStr(userView.getId(),this);
	    sbHql.append(" and obj.platInstitution.id in(");
	    sbHql.append(platStr);
	    sbHql.append(") ");
	    String[] queryFields = request.getParameterValues("queryFields");
	    String[] operatorValues = request.getParameterValues("operatorValues");
	    String hql = request.getParameter("hql");

	    if ((queryFields != null) && (queryFields.length > 0) && (operatorValues != null)) {
	      for (int i = 0; i < queryFields.length; i++) {
	        if ((queryFields[i] != null) && (!"".equals(queryFields[i]))) {
	          sbHql.append(" and ");
	          sbHql.append(queryFields[i]);
	          sbHql.append(" ");
	          sbHql.append(operatorValues[i]);
	          sbHql.append(" ? ");
	        } else {
	          System.err.println("查询字段不能为空!");
	          break;
	        }
	      }
	    }
	    sbHql.append(StringUtils.isEmpty(hql) ? "" : hql);
	    return sbHql;
	}*/
}
