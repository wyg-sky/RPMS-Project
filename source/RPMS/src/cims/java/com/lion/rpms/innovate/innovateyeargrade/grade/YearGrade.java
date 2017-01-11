package com.lion.rpms.innovate.innovateyeargrade.grade;

import java.util.Map;

import com.lion.system.common.manager.BusinessManager;

/**
 * 
 * @description : 打分接口 根据不同的打分项进行不同的实现
 * @date : 2015年3月26日下午4:10:19
 * @author : 周强
 */
public interface YearGrade {
	/**
	 * 
	 * @description : 
	 * @date : 2015年3月26日下午4:34:38
	 * @author : 周强
	 * @param max 标准分
	 * @param platId 平台ID（分中心）
	 * @param year 年度
	 * @return
	 * @return : Double
	 */
	public Double grade(Double max,String platId,String year,String code,BusinessManager manager);
}
