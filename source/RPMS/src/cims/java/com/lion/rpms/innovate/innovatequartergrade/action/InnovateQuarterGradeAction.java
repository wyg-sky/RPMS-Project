package com.lion.rpms.innovate.innovatequartergrade.action;

import java.io.IOException;

import com.lion.rpms.innovate.innovatequartergrade.manager.InnovateQuarterGradeManager;
import com.lion.rpms.innovate.innovatequartergrade.model.InnovateQuarterGrade;
import com.lion.system.common.action.BusinessAction;

/**
 * @description ：季度检查打分管理action
 * @date ： 2015-03-13 11:05:31
 * @author ：周强
 */

@SuppressWarnings({ "unchecked", "rawtypes" })
public class InnovateQuarterGradeAction extends BusinessAction {
	private static final long serialVersionUID = 1L;
	private String year;
	private String quarter;
	private String platCenter;
	
	public InnovateQuarterGradeAction(InnovateQuarterGrade businessObject, InnovateQuarterGradeManager manager) {
		super(businessObject, manager);
	}
	
	public void init() throws IOException{
		try {
			((InnovateQuarterGradeManager)this.manager).init(year, quarter, platCenter);
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

	public String getQuarter() {
		return quarter;
	}

	public void setQuarter(String quarter) {
		this.quarter = quarter;
	}

	public String getPlatCenter() {
		return platCenter;
	}

	public void setPlatCenter(String platCenter) {
		this.platCenter = platCenter;
	}
	
}
