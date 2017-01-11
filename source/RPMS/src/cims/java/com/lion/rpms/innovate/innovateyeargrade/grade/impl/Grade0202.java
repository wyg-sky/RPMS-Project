package com.lion.rpms.innovate.innovateyeargrade.grade.impl;

import com.lion.system.common.manager.BusinessManager;

/**
 * 项目指标
 * @description : 
 * @date : 2015年3月26日下午4:43:40
 * @author : 周强
 */
public class Grade0202 extends AbstractGrade{

	@Override
	public Double grade(Double max,String platId,String year,String code,BusinessManager manager) {
		if("2".equals(code)){   //报奖完成
			return grade1(max,platId,year,manager);
		} else if("1".equals(code)){  //项目完成
			return grade2(max,platId,year,manager);
		}
		return 0d;
	}
	
	/**
	 * 技术创新项目计划指标完成情况
	 * @description : 
	 * @date : 2015年3月27日下午3:54:59
	 * @author : 周强
	 * @param max
	 * @param platId
	 * @param year
	 * @param manager
	 * @return
	 * @return : Double
	 */
	private  Double grade2(Double max,String platId,String year,BusinessManager manager){
		String allCountsSql= 
				"SELECT\n" +
				"	count(*)\n" +
				"FROM\n" +
				"	RPMS_PROJECT_AWARD award\n" +
				"LEFT JOIN RPMS_PROJECT PROJECT ON award.PROJECT_ID = PROJECT . ID\n" +
				"where PROJECT.plat_center = '"+platId+"'\n" +
				"and PROJECT.PROJECT_ANNUAL = '"+year+"'\n" +
				"and award.STATUS='0003'";
		Double allResult = this.excuteSql(allCountsSql, manager).get(0);
		
		String honorSql = "SELECT\n" +
				"	COUNT (*)\n" +
				"FROM\n" +
				"	RPMS_RESEARCH_HONOR honor\n" +
				"WHERE\n" +
				"	honor.PLAT_CENTER = '"+platId+"'\n" +
				"AND honor.HONOR_DATE LIKE '"+year+"%'";
		Double honorResult = this.excuteSql(honorSql, manager).get(0);
		
		return this.getResult(honorResult, allResult, max);
	}
	
	/**
	 * 技术创新报奖计划指标完成情况
	 * @description : 
	 * @date : 2015年3月27日下午3:55:09
	 * @author : 周强
	 * @param max
	 * @param platId
	 * @param year
	 * @param manager
	 * @return
	 * @return : Double
	 */
	private Double grade1(Double max,String platId,String year,BusinessManager manager){
		/**
		 * 当前单位项目数量
		 */
		String currentSql = "SELECT\n" +
				"	COUNT (*) proCount\n" +
				"FROM\n" +
				"	RPMS_PROJECT PROJECT\n" +
				"WHERE\n" +
				"	PROJECT_STATUS > '0002'\n" +
				"AND PLAT_CENTER = '"+platId+"'\n" +
				"AND PROJECT_ANNUAL = '"+year+"'";
		Double proCounts = this.excuteSql(currentSql, manager).get(0);
		
		String completeSql = "SELECT\n" +
				"	count(*) count\n" +
				"FROM\n" +
				"	RPMS_PROJECT\n" +
				"WHERE\n" +
				"	PROJECT_STATUS in('0005','0006')\n" +
				"AND PROJECT_ANNUAL = '"+year+"'\n" +
				"AND PLAT_CENTER = '"+platId+"'";
		Double completeCounts = this.excuteSql(completeSql, manager).get(0);
		return this.getResult(completeCounts, proCounts, max);
	}

}
