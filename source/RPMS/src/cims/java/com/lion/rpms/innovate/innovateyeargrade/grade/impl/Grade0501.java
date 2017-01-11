package com.lion.rpms.innovate.innovateyeargrade.grade.impl;

import com.lion.system.common.manager.BusinessManager;

/**
 * 
 * @description : 季检查情况打分
 * @date : 2015年3月26日下午4:43:40
 * @author : 周强
 */
public class Grade0501 extends AbstractGrade{

	@Override
	public Double grade(Double standar,String platId,String year,String code,BusinessManager manager) {
		if("1".equals(code)){   
			return grade1(standar,platId,year,manager);
		}
		return 0d;
	}
	
	private  Double grade1(Double standar,String platId,String year,BusinessManager manager){

		String maxSql = "SELECT\n" +
				"	SUM (grade.check_score) / 200\n" +
				"FROM\n" +
				"	RPMS_INNOVATE_QUARTER_GRADE grade\n" +
				"LEFT JOIN RPMS_INNOVATE_QUARTER_CHECK qcheck ON qcheck. ID = grade.check_item\n" +
				"WHERE\n" +
				"	qcheck.check_item = '9901'\n" +
				"AND grade.plat_center = '"+platId+"'\n" +
				"AND grade. YEAR = '"+year+"'";
		Double maxCount = this.excuteSql(maxSql, manager).get(0);
		return maxCount*standar;
		
	}
	
}
