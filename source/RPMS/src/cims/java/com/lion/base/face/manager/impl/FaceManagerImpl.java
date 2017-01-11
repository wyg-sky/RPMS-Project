package com.lion.base.face.manager.impl;

import java.lang.reflect.InvocationTargetException;
import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;

import com.lion.base.face.manager.FaceHistoryManager;
import com.lion.base.face.manager.FaceImportManager;
import com.lion.base.face.manager.FaceManager;
import com.lion.base.face.model.Face;
import com.lion.base.face.model.FaceHistory;
import com.lion.core.dao.GenericDao;
import com.lion.core.util.CnToSpell;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

/**
 * @description : 工作面信息业务处理实现
 * @date : 2013-9-16下午05:17:05
 * @author : 辛尔青
 */
public class FaceManagerImpl extends BusinessManagerImpl<Face,String> implements FaceManager {
	private FaceHistoryManager faceHistoryManager;
	private FaceImportManager faceImportManager;
	
	public FaceManagerImpl(GenericDao<Face, String> dao) {
		super(dao);
		this.setDataPower("400");
	}
	
	/**
	 * @description : 根据工作面名称自动设置工作面简拼
	 * @date : 2013-9-27下午02:06:49
	 * @author : 辛尔青
	 * @params : {
			HttpServletRequest request, 
			Face face
		}
	 * @return : String
	 */
	public boolean beforeSave(HttpServletRequest request, Face face) {
		CnToSpell.getFullSpell(face.getFaceName());
		face.setFaceSimp(CnToSpell.firstSpellStr);
		return true;
	}
	
	/**
	 * @description : 把工作面信息存到历史表中并设置有效期开始和结束
	 * @date : 2013-9-27下午02:06:49
	 * @author : 辛尔青
	 * @params : {
			HttpServletRequest request, 
			Face face
		}
	 * @return : String
	 */
	public boolean afterSave(HttpServletRequest request, Face face) throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		FaceHistory fh = new FaceHistory();
		try {
			BeanUtils.copyProperties(fh, face);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		fh.setId(null);
		fh.setEffectiveFrom(sdf.format(face.getCreateTime()));
		fh.setEffectiveTo("");
		String sql = "update base_face_history fh set fh.effective_to = '" +
				sdf.format(face.getCreateTime())  +
				"' where fh.face_cd = (select max(face_cd) from base_face_history)" +
				" and fh.create_time = (select max(create_time) from base_face_history)";
		executeSql(sql, new Object[0]);
		faceHistoryManager.save(request, fh);
		return true;
	}
	
	/**
	 * @description : 导入方法
	 * @date : 2013-10-18上午11:26:02
	 * @author : 辛尔青
	 * @params : {
			HttpServletRequest request
		}
	 * @return : String
	 */
	@Override
	public String importFace(HttpServletRequest request) {
		String importType = request.getParameter("importType");
		Organization organization = (Organization)request.getSession().getAttribute(Constants.USER_ORGANIZATION);
		UserView user = (UserView)request.getSession().getAttribute(Constants.USER_VIEW);
		String str = this.faceImportManager.importFace(importType, organization, user);
		return str;
	}

	public FaceHistoryManager getFaceHistoryManager() {
		return faceHistoryManager;
	}

	public void setFaceHistoryManager(FaceHistoryManager faceHistoryManager) {
		this.faceHistoryManager = faceHistoryManager;
	}
	
	public FaceImportManager getFaceImportManager() {
		return faceImportManager;
	}

	public void setFaceImportManager(FaceImportManager faceImportManager) {
		this.faceImportManager = faceImportManager;
	}
}
