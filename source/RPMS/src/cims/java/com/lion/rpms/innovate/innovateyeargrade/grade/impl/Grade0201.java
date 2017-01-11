package com.lion.rpms.innovate.innovateyeargrade.grade.impl;

import java.math.BigDecimal;
import java.util.List;

import com.lion.system.common.manager.BusinessManager;

/**
 * 项目计划
 * @description : 
 * @date : 2015年3月26日下午4:43:40
 * @author : 周强
 */
public class Grade0201 extends AbstractGrade {

	@Override
	public Double grade(Double max,String platId,String year,String code,BusinessManager manager) {
		if("2".equals(code)){   //上级计划
			return grade1(max,platId,year,manager);
		} else if("1".equals(code)){  //集团公司项目
			return grade2(max,platId,year,manager);
		}
		return 0d;
	}
	
	private  Double grade2(Double max,String platId,String year,BusinessManager manager){
		/**
		 * 所有单位项目最多数量
		 */
		String sql = "SELECT\n" +
				"	MAX (procount) maxCount\n" +
				"FROM\n" +
				"	(\n" +
				"		SELECT\n" +
				"			PLAT_CENTER,\n" +
				"			COUNT (*) proCount\n" +
				"		FROM\n" +
				"			RPMS_PROJECT PROJECT\n" +
				"		WHERE\n" +
				"			PROJECT_STATUS > '0002'\n" +
				"		AND PROJECT_ANNUAL = '"+year+"'\n" +
				"		GROUP BY\n" +
				"			PLAT_CENTER\n" +
				"	)";
		Double maxCount = this.excuteSql(sql, manager).get(0);
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
		Double currCount = this.excuteSql(currentSql, manager).get(0);
		
		return this.getResult(currCount, maxCount, max);
	}
	
	private Double grade1(Double max,String platId,String year,BusinessManager manager){
		return 0d;
	}

}
