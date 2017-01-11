package com.lion.rpms.innovate.innovateyeargrade.manager;

import com.lion.system.common.manager.BusinessManager;
import com.lion.rpms.innovate.innovateyeargrade.model.InnovateYearGrade;

/**
 * @description ：年度考核打分管理业务类
 * @date ： 2015-03-16 09:00:14
 * @author ：周强
 */
public interface InnovateYearGradeManager extends BusinessManager<InnovateYearGrade,String> {
	
	public void init(String year, String platCenter) throws Exception;
}
