package com.lion.rpms.base.specialtydictionary.manager.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Filter;
import org.hibernate.Session;

import com.lion.core.dao.GenericDao;
import com.lion.core.util.ClassUtil;
import com.lion.core.util.PageBean;
import com.lion.core.util.StringUtils;
import com.lion.core.util.json.JSONConfig;
import com.lion.core.util.json.JSONTreeConfig;
import com.lion.core.util.json.JSONUtil;
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.rpms.base.specialtydictionary.manager.SpecialtyDictionaryManager;
import com.lion.rpms.base.specialtydictionary.model.SpecialtyDictionary;
import com.lion.system.common.manager.impl.BusinessManagerImpl;

/**
 * @description ：专业词典业务实现类
 * @date ： 2015-03-10 09:05:39
 * @author ：周强
 */
public class SpecialtyDictionaryManagerImpl extends BusinessManagerImpl<SpecialtyDictionary,String> implements SpecialtyDictionaryManager {
	public SpecialtyDictionaryManagerImpl(GenericDao<SpecialtyDictionary, String> dao) {
		super(dao);
	}
	
	@SuppressWarnings("unchecked")
	public String list(HttpServletRequest request, SpecialtyDictionary businessObject) throws Exception {
		JSONConfig config = new JSONConfig();
		PageBean pageBean = new PageBean();
		String fieldValues[] = request.getParameterValues("fieldValues");
		StringBuilder hql = genListHeadHql(businessObject);
		hql.append(genListConditionHql(request).append(genListDataPowerHql(request)));
		if(null == fieldValues || fieldValues.length <= 0 ){
			String id = request.getParameter("id");
			if (StringUtils.isEmpty(id)) {
				hql.append(" and obj.parent is null ");
			} else {
				hql.append(" and obj.parent.id='" + id + "'");
			}
		}
		if(fieldValues != null){
			String id = request.getParameter("id");
			if (StringUtils.isEmpty(id)) {
				hql.append(" ");
			} else {
				hql.append(" and obj.parent.id='" + id + "'");
			}
		}
		hql.append(genListOrderHql(request));
		pageBean.setLimit(request.getParameter("limit"));
		pageBean.setStart(request.getParameter("start"));
		pageBean.setQueryHql(hql.toString());
		pageBean.setValues(fieldValues);
		findPageAll(pageBean);
		List<SpecialtyDictionary> types = (List<SpecialtyDictionary>) pageBean.getResult();
		config.setParentModel("parent", "id");
		config.setIterableAsSize(true);
		String json = JSONUtil.serializeForTreeGrid(types, "root", types.size(), config);
		return json;
	}
	
	/**
	 * @description : 加载指定id数据
	 * @date : 2013-9-23下午08:06:49
	 * @params : {
			HttpServletRequest request
		}
	 * @return : String
	 */
	public String load(HttpServletRequest request) throws Exception {
		String id = request.getParameter("id");
		if (!StringUtils.isEmpty(id)) {
			SpecialtyDictionary specialtyDictionary = this.get(id);
			JSONConfig config = new JSONConfig();
			config.setClosCollection(true);      //关闭集合
			String json = JSONUtil.serializeForForm(specialtyDictionary, "root", config);
			return json;
		} else {
			throw new Exception("id为空");
		}
	}
	
	/**
	 * @description : 置为有效、置为无效
	 * @return : String
	 */
	public String changeStatus(HttpServletRequest request, String ids, String property, String value) throws Exception {
		if (!(StringUtils.isEmpty(ids))) {
			String idsString = ids;
			StringBuilder sbHql = new StringBuilder();
			if (("valid").equals(property)) {
				ids = "'" + ids.replaceAll(",", "','") + "'";
				String parentHql = "";
				//当把叶子节点置为有效时，同时把父节点也置为有效
		    	if("1".equals(value)){
					parentHql = "from SpecialtyDictionary c where c.parent.id in (" + ids + ") or c.id in (" + ids + ")" 
							+ "or id in (select p.parent from SpecialtyDictionary p where id in (" + ids + "))";
					List<SpecialtyDictionary> childens = this.find(parentHql, new Object[0]);
					if(null != childens && childens.size() > 0){
						sbHql.append("update ").append(ClassUtil.getGenericType(this, 0).getSimpleName());
						sbHql.append(" set ").append(property).append(" = '").append(value);
						sbHql.append("' where id in (").append(ids).append(")");
						sbHql.append(" or parent in (").append(ids).append(")");
						sbHql.append("or id in (select p.parent from SpecialtyDictionary p where id in (").append(ids).append("))");
						bulkUpdate(sbHql.toString(), new Object[0]);
					}
				} else {
					//当把父节点置为无效时，把子节点也置为无效
					parentHql = "from SpecialtyDictionary c where c.parent.id in (" + ids + ") or c.id in (" + ids + ")";
					List<SpecialtyDictionary> childens = find(parentHql.toString(), new Object[0]);
					if (null != childens && childens.size() > 0) {
						sbHql.append("update ").append(ClassUtil.getGenericType(this, 0).getSimpleName());
						sbHql.append(" set ").append(property).append(" = '").append(value);
						sbHql.append("' where id in (").append(ids).append(")");
						sbHql.append(" or parent in (").append(ids).append(")");
						bulkUpdate(sbHql.toString(), new Object[0]);
					} else {
						super.changeStatus(request, idsString, property, value);
					}
				}
			} else {
				super.changeStatus(request, idsString, property, value);
			}
		}
		return "{success : true, ids : \"" + ids + "\"}";
	}
	
	/**
	 * @description : 只有无效以及没有被引用的数据才能删除
	 * @date : 2013-9-23下午08:06:49
	 * @author : 辛尔青
	 * @params : {
			HttpServletRequest request, 
			String[] ids
		}
	 * @return : String
	 */
	public boolean beforeDelete(HttpServletRequest request, String[] ids){
		boolean flag =true;
		try {
			//查询需要删除的记录是否没有子节点且状态为无效 ，否则不能删除
			for (String id : ids ) {
				String parenthql = "from SpecialtyDictionary c where c.parent.id = '"+id+"' or c.id='"+id+"' and c.valid = '1'";
				List<SpecialtyDictionary> childens = this.find(parenthql, new Object[0]);
				if (null != childens && childens.size() >0) {
					flag = false;
				}
			}
			if(!flag) {
				this.setMessage("{success : false, msg : \"存在关联数据！\"}");
			}
		} catch (Exception e) {
			e.printStackTrace();
			this.setMessage("{success : false}");
			flag = false;
		}
		return flag;
	}

	@Override
	public String listSpecialtyDictionaryTree(HttpServletRequest request) throws Exception {

		String parentId = request.getParameter("parentId");
		String type = request.getParameter("type");
		String orgId = request.getParameter("orgId");
		StringBuilder sbHql = new StringBuilder("from SpecialtyDictionary where 1=1 ");
		JSONTreeConfig config = new JSONTreeConfig("id", "specialtyName");

		if (!(StringUtils.isEmpty(parentId))) {
			sbHql.append(" and parent.id = '");
			sbHql.append(parentId);
			sbHql.append("'");
		} else {
			if("yw".equals(type)){
				sbHql.append(" and parent is not null");
			}else{
				sbHql.append(" and parent is null");
			}
		}

		if (!(StringUtils.isEmpty(orgId))) {
			sbHql.append(" and organization = '");
			sbHql.append(orgId);
			sbHql.append("'");
		}

		sbHql.append(" and valid='1' order by specialtyCode asc");
		List<?> specialtyDictionarys = find(sbHql.toString(), new Object[0]);
        if("zy".equals(type) || "yw".equals(type)){
        	config.setDepth(1);
        }else{
        	config.setIncludeChildren("children.*");
        }
		Session session = this.getCurrentSession();
		Filter filter = session.enableFilter("specialtydictionaryFilter");
		filter.setParameter("valid", "1");
		String json = JSONUtil.serializeForTree(specialtyDictionarys, config);
		return json;
	}
}
