package com.lion.rpms.base.standardenact.manager.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;

import com.lion.core.dao.GenericDao;
import com.lion.rpms.base.standardenact.manager.StandardEnactManager;
import com.lion.rpms.base.standardenact.model.StandardEnact;
import com.lion.rpms.common.UserToPlat;
import com.lion.rpms.research.researchstandar.manager.ResearchStandarManager;
import com.lion.rpms.research.researchstandar.model.ResearchStandar;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.document.model.Document;
import com.lion.system.user.model.UserView;

/**
 * @description ：标准制定管理业务实现类
 * @date ： 2015-03-13 11:06:28
 * @author ：WangYG
 */
public class StandardEnactManagerImpl extends BusinessManagerImpl<StandardEnact, String> implements StandardEnactManager {
	private ResearchStandarManager researchStandarManager;

	public StandardEnactManagerImpl(GenericDao<StandardEnact, String> dao) {
		super(dao);
	}

	/**
	 * @description ：将用户选中的标准制定记录置为颁布，并添加到标准库[标准管理].
	 * @date ： 2015-03-13 13:30:28
	 * @author ：WangYG
	 */
	public String insertStandar(HttpServletRequest request) throws Exception {
		String ids = getRequest().getParameter("ids");
		try {
			String[] idArray = ids.split(",");
			for (int i = 0; i < idArray.length; i++) {
				StandardEnact standardEnact = this.get(idArray[i]);
				ResearchStandar researchStandar = new ResearchStandar();
				BeanUtils.copyProperties(standardEnact, researchStandar);
				researchStandar.setId(null);
				researchStandar.setStandarName(standardEnact.getStandardName());
				researchStandar.setStandarNum(standardEnact.getStandardNum());
				researchStandar.setRealeaseDate(standardEnact.getIssueDate());
				researchStandar.setCreateTime(standardEnact.getCreateTime());
				researchStandar.setModifyTime(standardEnact.getModifyTime());
				List<Document> documents = standardEnact.getDocuments(); // 取得文档列表集合
				List<Document> tempDocuments = new ArrayList<Document>();
				if (documents != null && documents.size() > 0) {
					for (Document doc : documents) {
						Document tempDoc = new Document();
						BeanUtils.copyProperties(doc, tempDoc);
						tempDoc.setId(null);// 置空文档ID
						tempDoc.setDocFk(null);// 关联外键ID
						tempDocuments.add(tempDoc);
					}
					researchStandar.setDocuments(tempDocuments);
				}
				standardEnact.setIsIssue("0001");
				researchStandarManager.save(request, researchStandar);
			}
		} catch (Exception e) {
			this.setMessage("{success : false,msg : \"颁布并添加到标准库失败!\"}");
			e.printStackTrace();
		}
		return "{success : true,msg : \"颁布并添加到标准库成功!<br>如需修改请到“标准管理”进行操作！\"}";
	}

	@Override
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
		StringBuilder sbHql = new StringBuilder(" where 1=1 ");
		UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
		// 添加人员管理平台权限设置
		UserToPlat userToPlat = new UserToPlat();
		String platStr = userToPlat.getPlatsStr(userView.getId(), this);
		sbHql.append(" and obj.platInstitution.id in(");
		sbHql.append(platStr);
		sbHql.append(") ");
		String[] queryFields = request.getParameterValues("queryFields");
		String[] operatorValues = request.getParameterValues("operatorValues");
		String hql = request.getParameter("hql");

		if ((queryFields != null) && (queryFields.length > 0) && (operatorValues != null)) {
			for (int i = 0; i < queryFields.length; i++) {
				if ((queryFields[i] != null) && (!"".equals(queryFields[i]))) {
					sbHql.append(" and ");
					sbHql.append(queryFields[i]);
					sbHql.append(" ");
					sbHql.append(operatorValues[i]);
					sbHql.append(" ? ");
				} else {
					System.err.println("查询字段不能为空!");
					break;
				}
			}
		}
		sbHql.append(StringUtils.isEmpty(hql) ? "" : hql);
		return sbHql;
	}

	public ResearchStandarManager getResearchStandarManager() {
		return researchStandarManager;
	}

	public void setResearchStandarManager(ResearchStandarManager researchStandarManager) {
		this.researchStandarManager = researchStandarManager;
	}

}
