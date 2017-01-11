package com.lion.rpms.innovate.innovateyeargrade.action;

import java.io.IOException;

import com.lion.rpms.innovate.innovateyeargrade.manager.InnovateYearGradeManager;
import com.lion.rpms.innovate.innovateyeargrade.model.InnovateYearGrade;
import com.lion.system.common.action.BusinessAction;

/**
 * @description ：年度考核打分管理action
 * @date ： 2015-03-16 09:00:14
 * @author ：周强
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class InnovateYearGradeAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	
	private String year;
	private String platCenter;
	
	
	public InnovateYearGradeAction(InnovateYearGrade businessObject, InnovateYearGradeManager manager) {
		super(businessObject, manager);
	}
	
	public void init() throws IOException{
		try {
			((InnovateYearGradeManager)this.manager).init(year, platCenter);
			this.print("{success:true}");
		} catch (Exception e) {
			e.printStackTrace();
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
		}
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getPlatCenter() {
		return platCenter;
	}

	public void setPlatCenter(String platCenter) {
		this.platCenter = platCenter;
	}
	
}
