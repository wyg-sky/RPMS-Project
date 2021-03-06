package com.lion.rpms.innovate.innovateyeargrade.grade.impl;

import com.lion.system.common.manager.BusinessManager;

/**
 * 
 * @description : 荣誉统计
 * @date : 2015年3月26日下午4:43:40
 * @author : 周强
 */
public class Grade0301 extends AbstractGrade{

	@Override
	public Double grade(Double standar,String platId,String year,String code,BusinessManager manager) {
		if("1".equals(code)){   //省部级以上
			return grade1(standar,platId,year,manager);
		} else if("2".equals(code)){  //地市级
			return grade2(standar,platId,year,manager);
		}
		return 0d;
	}
	
	private  Double grade1(Double standar,String platId,String year,BusinessManager manager){

		String maxSql = "SELECT\n" +
				"	MAX (COUNT)\n" +
				"FROM\n" +
				"	(\n" +
				"		SELECT\n" +
				"			COUNT (*) COUNT\n" +
				"		FROM\n" +
				"			RPMS_RESEARCH_HONOR obj\n" +
				"		WHERE\n" +
				"			obj.HONOR_TYPE <> '0003'\n" +
				"		AND obj.HONOR_DATE LIKE '"+year+"%'\n" +
				"		AND obj.GRADE <='0003'\n" +
				"		GROUP BY\n" +
				"			OBJ.PLAT_CENTER\n" +
				"	)";
		Double maxCount = this.excuteSql(maxSql, manager).get(0);
		
		String crrSql = "SELECT\n" +
				"	COUNT (*)\n" +
				"FROM\n" +
				"	RPMS_RESEARCH_HONOR obj\n" +
				"WHERE\n" +
				"	obj.HONOR_TYPE <> '0003'\n" +
				"AND OBJ.PLAT_CENTER = '"+platId+"'\n" +
				"AND obj.HONOR_DATE LIKE '"+year+"%'\n" +
				"AND obj.GRADE <='0003'";
		Double crr = this.excuteSql(crrSql, manager).get(0);
		return this.getResult(crr, maxCount, standar);
	}
	
	private  Double grade2(Double standar,String platId,String year,BusinessManager manager){

		String maxSql = "SELECT\n" +
				"	MAX (COUNT)\n" +
				"FROM\n" +
				"	(\n" +
				"		SELECT\n" +
				"			COUNT (*) COUNT\n" +
				"		FROM\n" +
				"			RPMS_RESEARCH_HONOR obj\n" +
				"		WHERE\n" +
				"			obj.HONOR_TYPE <> '0003'\n" +
				"		AND obj.HONOR_DATE LIKE '"+year+"%'\n" +
				"		AND obj.GRADE ='0004'\n" +
				"		GROUP BY\n" +
				"			OBJ.PLAT_CENTER\n" +
				"	)";
		Double maxCount = this.excuteSql(maxSql, manager).get(0);
		
		String crrSql = "SELECT\n" +
				"	COUNT (*)\n" +
				"FROM\n" +
				"	RPMS_RESEARCH_HONOR obj\n" +
				"WHERE\n" +
				"	obj.HONOR_TYPE <> '0003'\n" +
				"AND OBJ.PLAT_CENTER = '"+platId+"'\n" +
				"AND obj.HONOR_DATE LIKE '"+year+"%'\n" +
				"AND obj.GRADE ='0004'";
		Double crr = this.excuteSql(crrSql, manager).get(0);
		return this.getResult(crr, maxCount, standar);
	}
	
}
