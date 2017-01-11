package com.lion.rpms.innovate.innovateyeargrade.grade.impl;

import com.lion.system.common.manager.BusinessManager;

/**
 * 
 * @description :推广统计
 * @date : 2015年3月26日下午4:43:40
 * @author : 周强
 */
public class Grade0303 extends AbstractGrade{

	@Override
	public Double grade(Double standar,String platId,String year,String code,BusinessManager manager) {
		if("1".equals(code)){   
			return grade1(standar,platId,year,manager);
		}
		return 0d;
	}
	
	private  Double grade1(Double standar,String platId,String year,BusinessManager manager){

		String maxSql = "SELECT\n" +
				"	MAX (countSpread)\n" +
				"FROM\n" +
				"	(\n" +
				"		SELECT\n" +
				"			COUNT (*) countSpread\n" +
				"		FROM\n" +
				"			RPMS_PROJECT_SPREAD spread\n" +
				"		LEFT JOIN RPMS_PROJECT PROJECT ON spread.project_id = PROJECT . ID\n" +
				"		WHERE\n" +
				"			spread.report_time LIKE '"+year+"%'\n" +
				"		AND spread.status = '0003'\n" +
				"		GROUP BY\n" +
				"			PROJECT .plat_center\n" +
				"	)";
		Double maxCount = this.excuteSql(maxSql, manager).get(0);
		
		String crrSql = "SELECT\n" +
				"	count(*) countSpread\n" +
				"FROM\n" +
				"	RPMS_PROJECT_SPREAD spread\n" +
				"LEFT JOIN RPMS_PROJECT PROJECT ON spread.project_id = PROJECT . ID\n" +
				"WHERE\n" +
				"	PROJECT .plat_center = '"+platId+"'\n" +
				"AND spread.report_time LIKE '"+year+"%'\n" +
				"AND spread.status = '0003'";
		Double crr = this.excuteSql(crrSql, manager).get(0);
		return this.getResult(crr, maxCount, standar);
	}
	
}
