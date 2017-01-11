package com.lion.rpms.innovate.innovateyeargrade.grade.impl;

import com.lion.system.common.manager.BusinessManager;

/**
 * 
 * @description : 科技论文打分
 * @date : 2015年3月26日下午4:43:40
 * @author : 周强
 */
public class Grade0205 extends AbstractGrade{

	@Override
	public Double grade(Double standar,String platId,String year,String code,BusinessManager manager) {
		if("1".equals(code)){   //发明专利
			return grade1(standar,platId,year,manager);
		} else if("2".equals(code)){  //实用新型专利
			return grade2(standar,platId,year,manager);
		}
		return 0d;
	}
	
	private  Double grade2(Double standar,String platId,String year,BusinessManager manager){

		String maxSql = "SELECT\n" +
				"	MAX (COUNT)\n" +
				"FROM\n" +
				"	(\n" +
				"		SELECT\n" +
				"			COUNT (*) COUNT\n" +
				"		FROM\n" +
				"			RPMS_RESEARCH_THESIS obj\n" +
				"		WHERE\n" +
				"			OBJ.grade = '0003'\n" +
				"		AND OBJ.PUBTIME LIKE '"+year+"%'\n" +
				"		GROUP BY OBJ.PLAT_CENTER\n" +
				"	)";
		Double maxCount = this.excuteSql(maxSql, manager).get(0);
		
		String crrSql = "SELECT\n" +
				"	COUNT (*) COUNT\n" +
				"FROM\n" +
				"	RPMS_RESEARCH_THESIS obj\n" +
				"WHERE\n" +
				"	OBJ.grade = '0003'\n" +
				"AND OBJ.PUBTIME LIKE '"+year+"%'\n" +
				"AND OBJ.PLAT_CENTER = '"+platId+"'";
		Double crr = this.excuteSql(crrSql, manager).get(0);
		return this.getResult(crr, maxCount, standar);
	}
	
	/**
	 *
	 * @description : 省部级以上打分
	 * @date : 2015年3月27日下午2:51:38
	 * @author : 周强
	 * @param standar
	 * @param platId
	 * @param year
	 * @param manager
	 * @return
	 * @return : Double
	 */
	private Double grade1(Double standar,String platId,String year,BusinessManager manager){
		
		String maxSql = "SELECT\n" +
				"	MAX (COUNT)\n" +
				"FROM\n" +
				"	(\n" +
				"		SELECT\n" +
				"			COUNT (*) COUNT\n" +
				"		FROM\n" +
				"			RPMS_RESEARCH_THESIS obj\n" +
				"		WHERE\n" +
				"			OBJ.grade <= '0002'\n" +
				"		AND OBJ.PUBTIME LIKE '"+year+"%'\n" +
				"		GROUP BY OBJ.PLAT_CENTER\n" +
				"	)";
		Double maxCount = this.excuteSql(maxSql, manager).get(0);
		
		String crrSql = "SELECT\n" +
				"	COUNT (*) COUNT\n" +
				"FROM\n" +
				"	RPMS_RESEARCH_THESIS obj\n" +
				"WHERE\n" +
				"	OBJ.grade <= '0002'\n" +
				"AND OBJ.PUBTIME LIKE '"+year+"%'\n" +
				"AND OBJ.PLAT_CENTER = '"+platId+"'";
		Double crr = this.excuteSql(crrSql, manager).get(0);
		return this.getResult(crr, maxCount, standar);
	}

}
