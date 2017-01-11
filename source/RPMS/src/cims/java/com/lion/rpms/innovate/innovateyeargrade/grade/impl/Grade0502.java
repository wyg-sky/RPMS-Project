package com.lion.rpms.innovate.innovateyeargrade.grade.impl;

import com.lion.system.common.manager.BusinessManager;

/**
 * 
 * @description : 季度检查整改统计
 * @date : 2015年3月26日下午4:43:40
 * @author : 周强
 */
public class Grade0502 extends AbstractGrade{

	@Override
	public Double grade(Double standar,String platId,String year,String code,BusinessManager manager) {
		if("1".equals(code)){   
			return grade1(standar,platId,year,manager);
		}
		return 0d;
	}
	
	private  Double grade1(Double standar,String platId,String year,BusinessManager manager){

		String maxSql = "SELECT count(*)\n" +
				"FROM\n" +
				"	RPMS_INNOVATE_QUARTER_GRADE grade\n" +
				"WHERE\n" +
				"	grade.plat_center = '"+platId+"'\n" +
				"AND grade. YEAR = '"+year+"'\n" +
				"and grade.status='0002'";
		Double maxCount = this.excuteSql(maxSql, manager).get(0);
		Double result = standar-maxCount;
		return result<0?0:result;
		
	}
	
}
