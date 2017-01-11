package com.lion.rpms.common.report.action;

import java.io.IOException;

import com.lion.rpms.common.report.manager.ReportManager;
import com.lion.system.common.action.BusinessAction;

public class ReportAction extends BusinessAction{
	
	private ReportManager reportManager;
	
	public void upreport() throws IOException{
		try {
			String result = this.reportManager.upreport();
			this.print(result);
		} catch (Exception e) {
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
		}
	}
	
	public void back() throws IOException{
		try {
			String result = this.reportManager.back();
			this.print(result);
		} catch (Exception e) {
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
		}
	}
	
	public void isUpreport() throws IOException{
		try {
			String result = this.reportManager.isUpreport();
			this.print(result);
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
		}
	}
	
	public void approve() throws IOException{
		try {
			String result = this.reportManager.approve();
			this.print(result);
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
		}
	}

	public ReportManager getReportManager() {
		return reportManager;
	}

	public void setReportManager(ReportManager reportManager) {
		this.reportManager = reportManager;
	}

}
