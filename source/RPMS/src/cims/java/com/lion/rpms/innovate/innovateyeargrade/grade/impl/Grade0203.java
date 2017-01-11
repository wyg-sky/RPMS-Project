package com.lion.rpms.innovate.innovateyeargrade.grade.impl;

import com.lion.system.common.manager.BusinessManager;

/**
 * 
 * @description : 创新成果
 * @date : 2015年3月26日下午4:43:40
 * @author : 周强
 */
public class Grade0203 extends AbstractGrade{

	@Override
	public Double grade(Double standar,String platId,String year,String code,BusinessManager manager) {
		if("1".equals(code)){   //省部级
			return grade1(standar,platId,year,manager);
		} else if("2".equals(code)){  //地市级
			return grade2(standar,platId,year,manager);
		}
		return 0d;
	}
	
	private  Double grade2(Double standar,String platId,String year,BusinessManager manager){
		String maxSql = "SELECT max(count) from (\n" +
				"SELECT count(*) count from RPMS_RESEARCH_ACHIEVEMENT ACHIEVEMENT\n" +
				"where ACHIEVEMENT.GRADE ='0004'\n" +
				"and ACHIEVEMENT.CERTIFICATION_DATE like '"+year+"%'\n" +
				"GROUP BY ACHIEVEMENT.plat_center)";
		Double maxCount = this.excuteSql(maxSql, manager).get(0);
		
		String crrSql = "SELECT count(*) count from RPMS_RESEARCH_ACHIEVEMENT ACHIEVEMENT\n" +
				"where ACHIEVEMENT.GRADE = '0004'\n" +
				"and ACHIEVEMENT.CERTIFICATION_DATE like '"+year+"%'\n" +
				"and ACHIEVEMENT.plat_center = '"+platId+"'";
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
		
		String maxSql = "SELECT max(count) from (\n" +
				"SELECT count(*) count from RPMS_RESEARCH_ACHIEVEMENT ACHIEVEMENT\n" +
				"where ACHIEVEMENT.GRADE <='0003'\n" +
				"and ACHIEVEMENT.CERTIFICATION_DATE like '"+year+"%'\n" +
				"GROUP BY ACHIEVEMENT.plat_center)";
		Double maxCount = this.excuteSql(maxSql, manager).get(0);
		
		String crrSql = "SELECT count(*) count from RPMS_RESEARCH_ACHIEVEMENT ACHIEVEMENT\n" +
				"where ACHIEVEMENT.GRADE <='0003'\n" +
				"and ACHIEVEMENT.CERTIFICATION_DATE like '"+year+"%'\n" +
				"and ACHIEVEMENT.plat_center = '"+platId+"'";
		Double crr = this.excuteSql(crrSql, manager).get(0);
		return this.getResult(crr, maxCount, standar);
	}

}
