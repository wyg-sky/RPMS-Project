package com.lion.rpms.innovate.innovateyeargrade.grade.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.lion.rpms.innovate.innovateyeargrade.grade.YearGrade;
import com.lion.system.common.manager.BusinessManager;

public abstract class AbstractGrade implements YearGrade {

	protected List<Double> excuteSql(String sql,BusinessManager manager){
		List<BigDecimal> sqlResult = (List<BigDecimal>)manager.executeQuerySql(sql, new Object[0]);
		List<Double> result = new ArrayList<Double>();
		for(BigDecimal dec:sqlResult){
			if(dec == null){
				result.add(0d);
			} else {
				result.add(dec.doubleValue());
			}
		}
		return result;
	}
	
	
	protected Double getResult(Double current,Double max,Double standar){
		if(max == 0d){
			return 0d;
		}
		Double result = current/max*standar;
		return result>standar?standar:result;
	}

}
