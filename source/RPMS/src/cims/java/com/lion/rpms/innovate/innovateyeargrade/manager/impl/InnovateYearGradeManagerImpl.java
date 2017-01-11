package com.lion.rpms.innovate.innovateyeargrade.manager.impl;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.rpms.common.PlatCenterUtil;
import com.lion.rpms.innovate.innovateyearcheck.model.InnovateYearCheck;
import com.lion.rpms.innovate.innovateyeargrade.grade.YearGrade;
import com.lion.rpms.innovate.innovateyeargrade.manager.InnovateYearGradeManager;
import com.lion.rpms.innovate.innovateyeargrade.model.InnovateYearGrade;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.user.model.UserView;

/**
 * @description ：年度考核打分管理业务实现类
 * @date ： 2015-03-16 09:00:14
 * @author ：周强
 */
public class InnovateYearGradeManagerImpl extends BusinessManagerImpl<InnovateYearGrade,String> implements InnovateYearGradeManager {
	
	private Map<String,YearGrade> gradeMap = new HashMap<String,YearGrade>();
	
	/**
	 * 是否启用系统打分
	 */
	private boolean enableSystemGrade = false;
	
	public InnovateYearGradeManagerImpl(GenericDao<InnovateYearGrade, String> dao) {
		super(dao);
	}
	
	/**
	 * 初始化打分表
	 * @description : 
	 * @date : 2015年3月13日上午11:22:33
	 * @author : 周强
	 * @params : {
			String year 年度
		}
	 * @return : void
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	public void init(String year, String platCenter) {
		
		String  checkHql = "from InnovateYearCheck where valid = '1'";
		List<InnovateYearCheck> checkList = null;
		try {
			checkList = (List<InnovateYearCheck>)this.executeQuery(checkHql, new Object[0]);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String  gradeHql = "from InnovateYearGrade obj where obj.year = ? and obj.platCenter.id = ? order by obj.checkItem.checkItem";
		ResearchPlat currentPlat = PlatCenterUtil.getCurrentPlatCenter(this);
		String platId = currentPlat.getId();
		
		//修改by:杨尚山,将平台的id有默认的当前登录用户所在平台id,改为获取查询条件中的分中心id
		ResearchPlat platTemp = new ResearchPlat();
		if(platCenter != null || !"".equals(platCenter)){
			platId = platCenter;
			platTemp.setId(platId);
			currentPlat = platTemp;
		}
		//修改end
		
		List<InnovateYearGrade> gradeList = null;
		
		try {
			gradeList = (List<InnovateYearGrade>)this.executeQuery(gradeHql, new Object[]{year,platId});
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if(gradeList == null || gradeList.size() == 0){
			for(InnovateYearCheck check:checkList){
				InnovateYearGrade grade = new InnovateYearGrade();
				grade.setCheckItem(check);
				grade.setYear(year); //年度
				grade.setPlatCenter(currentPlat);
				
				if(enableSystemGrade){
					this.gradeOne(grade);
				}
				this.save(grade);
			}
		} else {
			if(enableSystemGrade){
				this.gradeList(gradeList);
			}
		}
		
		this.sum(year, platId);
	}
	
	/**
	 * 
	 * @description : 打分表系统打分
	 * @date : 2015年3月27日上午9:00:09
	 * @author : 周强
	 * @param gradeList
	 * @param resultCache
	 * @return : void
	 */
	private void gradeList(List<InnovateYearGrade> gradeList){
		for(InnovateYearGrade grade:gradeList){
			this.gradeOne(grade);
		}
	}
	
	/**
	 * 
	 * @description : 每个大打分项系统打分
	 * @date : 2015年3月27日上午9:00:22
	 * @author : 周强
	 * @param grade
	 * @param resultCache
	 * @return : void
	 */
	private void gradeOne(InnovateYearGrade grade){
		InnovateYearCheck check = grade.getCheckItem();
		String checkItem = check.getCheckItem();//打分类别键值对  '0201'..
		String code = check.getCode(); //编码 却别重复键值对
		String platId = grade.getPlatCenter().getId();
		YearGrade yearGrade = gradeMap.get(checkItem);
		Double result = null;
		if(yearGrade != null){
			result = yearGrade.grade(Double.parseDouble(check.getStandarScore()), platId, grade.getYear(),code, this);
		}
		grade.setSystemScore(result);
	}
	
	/**
	 * 
	 * @description : 列表打分时防止附件丢失
	 * @date : 2015年3月27日上午9:04:01
	 * @author : 周强
	 * @param request
	 * @param businessObject
	 * @return
	 * @throws Exception
	 * @return : boolean
	 */
	@Override
	public boolean beforeSave(HttpServletRequest request, InnovateYearGrade businessObject) throws Exception {
		String self = request.getParameter("self");
		if(self !=null && self.equals("true")){
			InnovateYearGrade grade = this.get(businessObject.getId());
			businessObject.setDocuments(grade.getDocuments());
		}
		return super.beforeSave(request, businessObject);
	}
	
	/**
	 * 
	 * @description : 每项打分后 更改合计分数
	 * @date : 2015年3月27日上午9:03:41
	 * @author : 周强
	 * @param request
	 * @param businessObject
	 * @return
	 * @throws Exception
	 * @return : boolean
	 */
	@SuppressWarnings("unchecked")
	@Override
	public boolean afterSave(HttpServletRequest request, InnovateYearGrade businessObject) throws Exception {
		if(!this.sum(businessObject.getYear(), businessObject.getPlatCenter().getId())){
			return false;
		}
		return super.afterSave(request, businessObject);
	}
	
	@SuppressWarnings("unchecked")
	private boolean sum(String year,String platId){
		String  gradeHql = "from InnovateYearGrade where year = ? and platCenter.id = ? and checkItem.type = '99'";
		List<InnovateYearGrade> gradeList = null;
		try {
			gradeList = (List<InnovateYearGrade>)this.executeQuery(gradeHql, new Object[]{year,platId});
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if(gradeList == null || gradeList.size() > 1  || gradeList.size() == 0 ){
			this.setMessage("合计项不存在或存在多个，请联系管理员调整数据");
			//throw new RuntimeException("合计项不存在或存在多个，请联系管理员调整数据");
			return false;
		}
		
		InnovateYearGrade grade = gradeList.get(0);
		Double[] sum = this.getSum(year, platId);
		grade.setSelfCheckScore(sum[0]);
		grade.setCheckScore(sum[1]);
		grade.setSystemScore(sum[2]);
		
		return true;
	}
	
	/**
	 * 
	 * @description : 分数合计
	 * @date : 2015年3月27日上午9:02:17
	 * @author : 周强
	 * @param year
	 * @param centerId
	 * @return
	 * @return : Double[]   [0]自查分数  [1]检查分数
	 */
	private Double[] getSum(String year,String centerId){
		String sql = "SELECT\n" +
				"	SUM (SELF_CHECK_SCORE) SELFSCORES,\n" +
				"	SUM (CHECK_SCORE) CHECKSCORES,\n" +
				"	SUM (SYSTEM_SCORE) SYSCORES\n" +
				"FROM\n" +
				"	RPMS_INNOVATE_YEAR_GRADE GRADE\n" +
				"LEFT JOIN RPMS_INNOVATE_YEAR_CHECK CHECKITEM ON GRADE.CHECK_ITEM = CHECKITEM.ID\n" +
				"WHERE\n" +
				"	GRADE. YEAR = ?\n" +
				"AND GRADE.PLAT_CENTER = ?\n" +
				"AND CHECKITEM. TYPE <> '99'";
		List<Object[]> list = this.executeQuerySql(sql, new Object[]{year,centerId});
		
		Double self = list.get(0)[0]==null?0d:(((BigDecimal)list.get(0)[0]).doubleValue());
		Double check =list.get(0)[1]==null?0d:(((BigDecimal)list.get(0)[1]).doubleValue());
		Double sys =list.get(0)[2]==null?0d:(((BigDecimal)list.get(0)[2]).doubleValue());
		return new Double[]{self,check,sys};
	}
	
	@Override
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {

		StringBuilder sb = super.genListConditionHql(request);
		UserView user = (UserView)ServletActionContext.getRequest().getSession().getAttribute(Constants.USER_VIEW);
		String userId =user.getId();
		// 系统管理员登录不加控制
		if ("00000000000000000000000000000001".equals(userId)) {
			return sb;
		}

		String sql = "select distinct plat.plat_id from RPMS_STAFF_PLAT plat,RPMS_STAFF_USER us,RPMS_PROJECT_STAFF staff" + " where plat.staff_id = us.staff_id and plat.staff_id = staff.id" + " and us.user_id ='" + userId + "'";
		List<String> plateList = this.executeQuerySql(sql, new Object[0]);
		String pladIds = StringUtils.join(plateList, "','");
		sb.append(" and(( obj.platInstitution.id in('");
		sb.append(pladIds);
		sb.append("') or obj.platInstitution.id is null)");
		sb.append(" and obj.platCenter.id in('");
		sb.append(pladIds);
		sb.append("'))");
		// TODO Auto-generated method stub
		return sb;
	
	}

	public Map<String, YearGrade> getGradeMap() {
		return gradeMap;
	}

	public void setGradeMap(Map<String, YearGrade> gradeMap) {
		this.gradeMap = gradeMap;
	}

	public boolean isEnableSystemGrade() {
		return enableSystemGrade;
	}

	public void setEnableSystemGrade(boolean enableSystemGrade) {
		this.enableSystemGrade = enableSystemGrade;
	}
}
