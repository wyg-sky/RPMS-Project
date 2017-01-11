package com.lion.rpms.innovate.innovateyeargrade.grade.impl;

import com.lion.system.common.manager.BusinessManager;

/**
 * 
 * @description : 标准制定统计
 * @date : 2015年3月26日下午4:43:40
 * @author : 周强
 */
public class Grade0206 extends AbstractGrade{

	@Override
	public Double grade(Double standar,String platId,String year,String code,BusinessManager manager) {
			return grade(standar,platId,year,manager);
	}
	
	private  Double grade(Double standar,String platId,String year,BusinessManager manager){

		String maxSql = "SELECT\n" +
				"	MAX (COUNT)\n" +
				"FROM\n" +
				"	(\n" +
				"		SELECT\n" +
				"			COUNT (*) COUNT\n" +
				"		FROM\n" +
				"			RPMS_STANDARD_ENACT obj\n" +
				"		WHERE\n" +
				"			obj.IS_ISSUE = '0001'\n" +
				"		AND obj.ISSUE_DATE LIKE '"+year+"%'\n" +
				"		GROUP BY\n" +
				"			OBJ.PLAT_CENTER\n" +
				"	)";
		Double maxCount = this.excuteSql(maxSql, manager).get(0);
		
		String crrSql = "SELECT\n" +
				"	COUNT (*)\n" +
				"FROM\n" +
				"	RPMS_STANDARD_ENACT obj\n" +
				"WHERE\n" +
				"	obj.IS_ISSUE = '0001'\n" +
				"AND OBJ.PLAT_CENTER = '"+platId+"'\n" +
				"AND obj.ISSUE_DATE LIKE '"+year+"%'";
		Double crr = this.excuteSql(crrSql, manager).get(0);
		return this.getResult(crr, maxCount, standar);
	}
	
}
