package com.lion.rpms.innovate.innovatequartergrade.manager.impl;

import java.math.BigDecimal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.rpms.common.PlatCenterUtil;
import com.lion.rpms.innovate.innovatequartercheck.model.InnovateQuarterCheck;
import com.lion.rpms.innovate.innovatequartergrade.manager.InnovateQuarterGradeManager;
import com.lion.rpms.innovate.innovatequartergrade.model.InnovateQuarterGrade;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.user.model.UserView;

/**
 * @description ：季度检查打分管理业务实现类
 * @date ： 2015-03-13 11:05:31
 * @author ：周强
 */
public class InnovateQuarterGradeManagerImpl extends BusinessManagerImpl<InnovateQuarterGrade, String> implements
		InnovateQuarterGradeManager {
	public InnovateQuarterGradeManagerImpl(GenericDao<InnovateQuarterGrade, String> dao) {
		super(dao);
	}

	/**
	 * 初始化打分表
	 * 
	 * @description :
	 * @date : 2015年3月13日上午11:22:33
	 * @author : 周强
	 * @params : { String year 年度 String quarter 季度 }
	 * @return : void
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public void init(String year, String quarter, String platCenter) {

		String checkHql = "from InnovateQuarterCheck where valid = '1'";
		List<InnovateQuarterCheck> checkList = null;
		try {
			checkList = (List<InnovateQuarterCheck>) this.executeQuery(checkHql, new Object[0]);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String gradeHql = "from InnovateQuarterGrade where year = ? and quarter = ? and platCenter.id = ?";
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
		
		List<InnovateQuarterGrade> gradeList = null;
		try {
			gradeList = (List<InnovateQuarterGrade>) this.executeQuery(gradeHql, new Object[] { year, quarter, platId });
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		if (gradeList == null || gradeList.size() == 0) {

			for (InnovateQuarterCheck check : checkList) {
				InnovateQuarterGrade grade = new InnovateQuarterGrade();
				grade.setCheckItem(check);
				grade.setYear(year); // 年度
				grade.setQuarter(quarter);// 季度
				grade.setPlatCenter(currentPlat);
				// 分中心
				this.save(grade);
			}
		}
	}

	@Override
	public boolean beforeSave(HttpServletRequest request, InnovateQuarterGrade businessObject) throws Exception {
		String self = request.getParameter("self");
		if (self != null && self.equals("true")) {
			InnovateQuarterGrade grade = this.get(businessObject.getId());
			businessObject.setDocuments(grade.getDocuments());
		}
		return super.beforeSave(request, businessObject);
	}

	@SuppressWarnings("unchecked")
	@Override
	public boolean afterSave(HttpServletRequest request, InnovateQuarterGrade businessObject) throws Exception {
		String gradeHql = "from InnovateQuarterGrade where year = ? and quarter = ? and platCenter.id = ? and checkItem.type = '99'";
		List<InnovateQuarterGrade> gradeList = null;
		try {
			gradeList = (List<InnovateQuarterGrade>) this.executeQuery(gradeHql, new Object[] { businessObject.getYear(), businessObject.getQuarter(), businessObject.getPlatCenter().getId() });
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		if (gradeList == null || gradeList.size() > 1) {
			this.setMessage("合计项不存在或存在多个，请联系管理员调整数据");
			// throw new RuntimeException("合计项不存在或存在多个，请联系管理员调整数据");
			return false;
		}

		InnovateQuarterGrade grade = gradeList.get(0);
		Double[] sum = this.getSum(businessObject.getYear(), businessObject.getQuarter(), businessObject.getPlatCenter().getId());
		grade.setSelfCheckScore(sum[0]);
		grade.setCheckScore(sum[1]);

		return super.afterSave(request, businessObject);
	}

	private Double[] getSum(String year, String quarter, String centerId) {
		String sql = "SELECT\n" + "	SUM (SELF_CHECK_SCORE) SELFSCORES,\n" + "	SUM (CHECK_SCORE) CHECKSCORES\n" + "FROM\n" + "	RPMS_INNOVATE_QUARTER_GRADE GRADE\n" + "LEFT JOIN RPMS_INNOVATE_QUARTER_CHECK CHECKITEM ON GRADE. CHECK_ITEM = CHECKITEM.ID \n" + "WHERE\n" + "	GRADE. YEAR = ?\n" + "AND GRADE.QUARTER = ?\n" + "AND GRADE.PLAT_CENTER = ?\n" + "AND CHECKITEM. TYPE <> '99'";
		List<Object[]> list = this.executeQuerySql(sql, new Object[] { year, quarter, centerId });

		Double self = list.get(0)[0] == null ? 0d : (((BigDecimal) list.get(0)[0]).doubleValue());
		Double check = list.get(0)[1] == null ? 0d : (((BigDecimal) list.get(0)[1]).doubleValue());
		return new Double[] { self, check };
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

}
