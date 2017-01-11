package com.lion.rpms.common.report.manager.impl;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.common.report.manager.ReportManager;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

public class ReportManagerImpl extends BusinessManagerImpl<Object, Serializable>implements ReportManager {

	public ReportManagerImpl(GenericDao<Object, Serializable> dao) {
		super(dao);
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public String upreport() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String orgId = request.getParameter("organization.id");
		String year = request.getParameter("year");
		String tableName = request.getParameter("tableName");
		String halfYear = request.getParameter("halfYear");
		String sql = "SELECT\n" +
				"	COUNT (*)\n" +
				"FROM\n" +
				"	"+tableName+"\n" +
				"WHERE\n" +
				"	YEAR = ?\n" +
				"AND ORGANIZATION = ? and HALF_YEAR = ?";
		
		List<BigDecimal> list = (List<BigDecimal>)this.executeQuerySql(sql, new Object[]{year,orgId,halfYear});
		if(list.get(0).intValue() == 0){
			return "{success:false,msg:'该报表未保存数据，请先保存数据'}";
		}
		
		String status = this.getStatus();
		if("0002".equals(status) || "0004".equals(status)){
			return "{success:false,msg:'该报表已上报,不能重复上报'}";
		}
		
		sql = "UPDATE "+tableName+"\n" +
				"SET REPORT_STATUS = '0002'\n" +
				"WHERE\n" +
				"	YEAR = ?\n" +
				"AND ORGANIZATION = ? and HALF_YEAR = ?";
		this.executeSql(sql, new Object[]{year,orgId,halfYear});
		return "{success:true}";
	}

	@Override
	public String back() {
		String status = this.getStatus();
		if("0002".equals(status)){
			HttpServletRequest request = ServletActionContext.getRequest();
			String orgId = request.getParameter("organization.id");
			String year = request.getParameter("year");
			String tableName = request.getParameter("tableName");
			String halfYear = request.getParameter("halfYear");
			String sql = "UPDATE "+tableName+"\n" +
					"SET REPORT_STATUS = '0003'\n" +
					"WHERE\n" +
					"	YEAR = ?\n" +
					"AND ORGANIZATION = ? and HALF_YEAR = ?";
			this.executeSql(sql, new Object[]{year,orgId,halfYear});
			return "{success:true}";
		} else {
			return "{success:false,msg:'只能打回已上报报表'}";
		}
	}
	
	public String approve() {
		String status = this.getStatus();
		if("0002".equals(status)){
			HttpServletRequest request = ServletActionContext.getRequest();
			String orgId = request.getParameter("organization.id");
			String year = request.getParameter("year");
			String tableName = request.getParameter("tableName");
			String halfYear = request.getParameter("halfYear");
			String sql = "UPDATE "+tableName+"\n" +
					"SET REPORT_STATUS = '0004'\n" +
					"WHERE\n" +
					"	YEAR = ?\n" +
					"AND ORGANIZATION = ? and HALF_YEAR = ?";
			this.executeSql(sql, new Object[]{year,orgId,halfYear});
			return "{success:true}";
		} else {
			return "{success:false,msg:'只能审批已上报报表'}";
		}
	}
	
	private String getStatus(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String orgId = request.getParameter("organization.id");
		String year = request.getParameter("year");
		String tableName = request.getParameter("tableName");
		String halfYear = request.getParameter("halfYear");
		String sql = "SELECT\n" +
				"	REPORT_STATUS\n" +
				"FROM\n" +
				"	"+tableName+"\n" +
				"WHERE\n" +
				"	YEAR = ?\n" +
				"AND \"ORGANIZATION\" = ? and HALF_YEAR = ?";
		
		List<String> list = (List<String>)this.executeQuerySql(sql, new Object[]{year,orgId,halfYear});
		
		if(list == null || list.size() == 0){
			return null;
		} 
		
		return list.get(0);
		
	}
	
	@Override
	public String isUpreport() {
		String status = this.getStatus();
		if(status == null){
			return "{success:true}";
		} else {
			if("0002".equals(status) || "0004".equals(status)){
				return "{success:false,msg:'该报表已上报'}";
			} else {
				return "{success:true}";
			}
		}
	}
}
