package com.lion.rpms.rpmsreport.entpriscienceinfo.action;

import java.io.IOException;

import com.lion.rpms.rpmsreport.entpriscienceinfo.manager.EntpriScienceInfoManager;
import com.lion.system.common.action.BusinessAction;

public class EntpriScienceInfoAction extends BusinessAction{
	
	private EntpriScienceInfoManager infoManager;
	
	public void upreport() throws IOException{
		try {
			String result = this.infoManager.upreport();
			this.print(result);
		} catch (Exception e) {
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
		}
	}
	
	public void back() throws IOException{
		try {
			String result = this.infoManager.back();
			this.print(result);
		} catch (Exception e) {
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
		}
	}
	
	public void isUpreport() throws IOException{
		try {
			String result = this.infoManager.isUpreport();
			this.print(result);
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
		}
	}
	public void approve() throws IOException{
		try {
			String result = this.infoManager.approve();
			this.print(result);
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
		}
	}

	public EntpriScienceInfoManager getInfoManager() {
		return infoManager;
	}

	public void setInfoManager(EntpriScienceInfoManager infoManager) {
		this.infoManager = infoManager;
	}

}
