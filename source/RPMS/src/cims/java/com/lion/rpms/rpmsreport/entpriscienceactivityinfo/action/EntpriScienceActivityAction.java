package com.lion.rpms.rpmsreport.entpriscienceactivityinfo.action;

import java.io.IOException;

import com.lion.rpms.rpmsreport.entpriscienceactivityinfo.manager.EntpriScienceActivityManager;
import com.lion.system.common.action.BusinessAction;

public class EntpriScienceActivityAction extends BusinessAction{
	
	private EntpriScienceActivityManager activityManager;
	
	public void upreport() throws IOException{
		try {
			String result = this.activityManager.upreport();
			this.print(result);
		} catch (Exception e) {
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
		}
	}
	
	public void back() throws IOException{
		try {
			String result = this.activityManager.back();
			this.print(result);
		} catch (Exception e) {
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
		}
	}
	
	public void isUpreport() throws IOException{
		try {
			String result = this.activityManager.isUpreport();
			this.print(result);
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
		}
	}
	
	public void approve() throws IOException{
		try {
			String result = this.activityManager.approve();
			this.print(result);
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
		}
	}

	public EntpriScienceActivityManager getActivityManager() {
		return activityManager;
	}

	public void setActivityManager(EntpriScienceActivityManager activityManager) {
		this.activityManager = activityManager;
	}
	
}
