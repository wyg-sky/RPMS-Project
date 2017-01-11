package com.lion.rpms.innovate.innovateinstitution.manager.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.common.PlatCenterUtil;
import com.lion.rpms.innovate.innovateinstitution.manager.InnovateInstitutionManager;
import com.lion.rpms.innovate.innovateinstitution.model.InnovateInstitution;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.notice.manager.NoticeManager;
import com.lion.system.user.model.UserView;

/**
 * @description ：创新制度管理业务实现类
 * @date ：2015-03-19 12:33:07
 * @author ：周强
 */
public class InnovateInstitutionManagerImpl extends BusinessManagerImpl<InnovateInstitution,String> implements InnovateInstitutionManager {
	
	private NoticeManager noticeManager;
	
	public InnovateInstitutionManagerImpl(GenericDao<InnovateInstitution, String> dao) {
		super(dao);
		//this.setDataPower("500");
	}
	
	/**
	 * 检查文件是否需要修订
	 * @description : 
	 * @date : 2015年4月1日下午2:25:20
	 * @author : 周强
	 * @return : void
	 */
	public void checkOutDate(){
		String today = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		String hql = "from InnovateInstitution where reviseDate <=?";
		List<InnovateInstitution> result = this.find(hql, new Object[]{today});
		Map<String,String> userIdsCache = new HashMap<String,String>();//  key=中心ID，value = 用户IDS
		if(result != null && result.size() > 0){
			for(InnovateInstitution institution:result){
				String centerId = institution.getPlatCenter().getId();
				
				String userIds = userIdsCache.get(centerId);
				
				if(userIds == null){
					userIdsCache.put(centerId, this.getUserIds(centerId));
					userIds = userIdsCache.get(centerId);
				}
				
				String queryUserHql = " or (user.id in ("+userIds+"))";
				UserView user = new UserView();
				user.setId("00000000000000000000000000000001");
				noticeManager.sendNotice("institution_notice", "修订提醒", "<"+institution.getFileName()+">需要重新修订", user, queryUserHql);
			}
		}
	}
	
	/**
	 * 
	 * @description : 
	 * @date : 2015年4月1日下午3:15:03
	 * @author : 周强
	 * @param centerId
	 * @return
	 * @return : String
	 */
	private String getUserIds(String centerId){
		String sql ="SELECT\n" +
				"	DISTINCT us.id\n" +
				"FROM\n" +
				"	ITSM_USER us\n" +
				"LEFT JOIN ITSM_USER_ROLE ur ON ur.USER_ID = us.ID\n" +
				"LEFT JOIN ITSM_ROLE r on ur.role_id = r.id\n" +
				"LEFT JOIN RPMS_STAFF_USER stu on stu.user_id= us.id\n" +
				"LEFT JOIN RPMS_STAFF_PLAT stp on stp.staff_id = stu.staff_id\n" +
				"where r.code = '0004'\n" +  //分中心管理员
				"AND stp.plat_id = ?";
		List<Object> list = this.executeQuerySql(sql, new Object[]{centerId});
		return "'"+StringUtils.join(list, "','")+"'";
	}
	
	@Override
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
		// TODO Auto-generated method stub
		return PlatCenterUtil.addPlatCtrl(super.genListConditionHql(request), this);
	}

	public NoticeManager getNoticeManager() {
		return noticeManager;
	}

	public void setNoticeManager(NoticeManager noticeManager) {
		this.noticeManager = noticeManager;
	}
	
}
