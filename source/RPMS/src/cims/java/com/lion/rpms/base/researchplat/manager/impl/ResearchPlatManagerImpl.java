package com.lion.rpms.base.researchplat.manager.impl;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Filter;
import org.hibernate.Session;

import com.lion.core.dao.GenericDao;
import com.lion.core.util.ClassUtil;
import com.lion.core.util.PageBean;
import com.lion.core.util.json.JSONConfig;
import com.lion.core.util.json.JSONTreeConfig;
import com.lion.core.util.json.JSONUtil;
import com.lion.rpms.base.researchplat.manager.ResearchPlatManager;
import com.lion.rpms.base.researchplat.model.ResearchPlat;
import com.lion.rpms.base.specialtydictionary.model.SpecialtyDictionary;
import com.lion.rpms.common.ExcelOperation;
import com.lion.rpms.common.UserToPlat;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

/**
 * @description ：创新平台管理业务实现类
 * @date ： 2015-03-09 08:48:28
 * @author ：WangYG
 */
public class ResearchPlatManagerImpl extends BusinessManagerImpl<ResearchPlat, String> implements ResearchPlatManager {
	/**
	 * 构造函数
	 * 
	 * @param dao
	 */
	public ResearchPlatManagerImpl(GenericDao<ResearchPlat, String> dao) {
		super(dao);
	}

	/**
	 * @description : 创新平台列表树形结构显示
	 * @date : 2015-03-10下午07:06:49
	 * @author : WangYG
	 * @params : { HttpServletRequest request, ResearchPlat businessObject }
	 * @return : String
	 */
	@SuppressWarnings("unchecked")
	public String list(HttpServletRequest request, ResearchPlat businessObject) throws Exception {
		JSONConfig config = new JSONConfig();
		PageBean pageBean = new PageBean();
		String fieldValues[] = request.getParameterValues("fieldValues");
		StringBuilder hql = genListHeadHql(businessObject);
	
		String all = request.getParameter("all");
		//如果要显示全部则显示所有有效的数据，否则根据权限来判断
		if (StringUtils.isNotEmpty(all)) {
			hql.append(" where 1=1 and  obj.valid='1' ");
		} else {
			// 加上人员管理平台权限设置
			hql.append(genListConditionHql(request).append(genListDataPowerHql(request)));
		}
		
		if (null == fieldValues || fieldValues.length <= 0) {
			String id = request.getParameter("id");
			if (StringUtils.isEmpty(id)) {
				hql.append(" and obj.parent is null ");
			} else {
				hql.append(" and obj.parent.id='" + id + "'");
			}
		}
		
		if (fieldValues != null) {
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
		List<ResearchPlat> types = (List<ResearchPlat>) pageBean.getResult();
		config.setParentModel("parent", "id");
		config.setIterableAsSize(true);
		String json = JSONUtil.serializeForTreeGrid(types, "root", types.size(), config);
		return json;
	}

	/**
	 * @description : 重写genListConditionHql 方法加上权限设置 也用于导出Excel表格使用
	 * @date : 2015-03-30上午08:35:18
	 * @author : WangYG
	 */
	@Override
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
		StringBuilder sbHql = new StringBuilder(" where 1=1 ");
		UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
		// 添加人员管理平台权限设置
		if(!(userView.getId().equals("00000000000000000000000000000001"))){//不是超级管理员时
			UserToPlat userToPlat = new UserToPlat();
			String platStr = userToPlat.getPlatsStr(userView.getId(), this);
			sbHql.append(" and obj.id in(");
			sbHql.append(platStr);
			sbHql.append(") ");
		}
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

	/**
	 * @description : 用于左侧树（下拉树）的展现
	 * @date : 2015-03-10上午09:45:30
	 * @author : WangYG
	 * @params : { HttpServletRequest request }
	 * @return : String
	 */
	public String listResearchPlatTree(HttpServletRequest request) throws Exception {
		String parentId = request.getParameter("parentId");
		StringBuilder sbHql = new StringBuilder("from ResearchPlat obj where 1=1 ");
		//JSONTreeConfig config = new JSONTreeConfig("id", "platName");
		//父节点为空的节点. 一级父节点
		if (StringUtils.isEmpty(parentId)) {
			sbHql.append(" and obj.parent is null ");
		} else {
			sbHql.append(" and obj.parent.id='" + parentId + "'");
		}
		// 添加人员管理平台权限设置
		UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
		UserToPlat userToPlat = new UserToPlat();
		String platStr = userToPlat.getPlatsStr(userView.getId(), this);
		sbHql.append(" and (obj.id in(");
		sbHql.append(platStr);
		sbHql.append(") )");
		sbHql.append(" and (obj.valid='1') order by obj.platCode asc");
		Session session = this.getCurrentSession();
		Filter filter = session.enableFilter("researchplatFilter");
		filter.setParameter("valid", "1");
		List<ResearchPlat> researchPlats = find(sbHql.toString(), new Object[0]);		
		/*config.setIncludeChildren("children.*");
		//树形列表显示
		config.setAutoLeaf(false);
		//此方法为树节点全部显示，无法控制子节点的显示与隐藏
		String json = JSONUtil.serializeForTree(researchPlats, config);*/
		String[] strArray = {""};
		if(StringUtils.isNotBlank(platStr)){
			String tempStr = platStr.substring(1, platStr.length() - 1);
			tempStr = tempStr.replace("','", ",");
			strArray = tempStr.split(",");
		}
		
		//根据管理员控制权限，控制子节点的显示与隐藏。序列化返回结果集中节点(父节点)，为平台树JSON
		String json = serializeForPlatTree(researchPlats, strArray);
		return json;
	}

	/**
	 * @description : 根据管理员控制权限，控制子节点的显示与隐藏。序列化返回结果集中节点(父节点)，为平台树JSON
	 * @param researchPlats 符合条件的结果集列表
	 * @param platStr 管理员权限ID
	 * @date : 2015-03-31上午09:20:23
	 * @author : WangYG
	 * @return
	 */
	public String serializeForPlatTree(List<ResearchPlat> researchPlats, String[] platStr) throws Exception {
		StringBuilder jsonbBuilder = new StringBuilder("[");
		StringBuilder json = new StringBuilder("");
		for (int i = 0; i < researchPlats.size(); i++) {
			ResearchPlat parent = researchPlats.get(i).getParent();//父节点
			String id = researchPlats.get(i).getId();//当前节点平台ID
			String text = researchPlats.get(i).getPlatName();//当前节点平台名称
			Set<ResearchPlat> childrens = researchPlats.get(i).getChildren();//当前节点下的子节点
			if (parent == null) {
				StringBuffer str = new StringBuffer();
				str.append("{");
				str.append("\"id\":\"").append(id).append("\",");
				str.append("\"text\":\"").append(text).append("\",");
				str.append("\"leaf\":");
				// 判断该节点是否有子节点需要显示
				boolean isLeaf = isLeaf(researchPlats.get(i), platStr);
				str.append(isLeaf);
				if (isLeaf == false) {// 显示子节点
					str.append(",\"children\":");
					str.append("[");
					StringBuffer tempStr = new StringBuffer();
					for (ResearchPlat plat : childrens) {
						String childrenId = plat.getId();
						for (int k = 0; k < platStr.length; k++) {
							if (childrenId.equals(platStr[k])) {// 当前节点ID与管理权限数组中ID比较
								tempStr.append("{");
								tempStr.append(serializeForChildrenPlatTree(plat, platStr));// 子节点拼接JSON方法
								tempStr.append("},");
							}
						}
					}
					if (tempStr.length() > 0) {
						str.append(tempStr.substring(0, tempStr.length() - 1));
					}
					str.append("]");
				}
				str.append("},");
				json.append(str);
			}
			/*else{//权限设置没有选中父节点的情况下 直接显示子节点平台
				boolean flag = true;
				String parentId = parent.getId();
				for (int j = 0; j < platStr.length; j++) {
					// 当前节点的父节点ID与管理权限数组中ID比较 如果包含父节点，标记为false，退出循环不做处理.
					if (parentId.equals(platStr[j])) {
						flag = false;
						break;
					}
				}
				//如果父节点不包含在管理权限数组中,则单独显示.
				if(flag){
					StringBuffer str = new StringBuffer();
					str.append("{");
					str.append("\"id\":\"").append(id).append("\",");
					str.append("\"text\":\"").append(text).append("\",");
					str.append("\"leaf\":");
					// 不包含子节点
					//str.append(true);
					// 判断该节点是否有子节点需要显示
					boolean isLeaf = isLeaf(researchPlats.get(i), platStr);
					str.append(isLeaf);
					if (isLeaf == false) {// 显示子节点
						str.append(",\"children\":");
						str.append("[");
						StringBuffer tempStr = new StringBuffer();
						for (ResearchPlat plat : childrens) {
							String childrenId = plat.getId();
							for (int k = 0; k < platStr.length; k++) {
								if (childrenId.equals(platStr[k])) {// 当前节点ID与管理权限数组中ID比较
									tempStr.append("{");
									tempStr.append(serializeForChildrenPlatTree(plat, platStr));// 子节点拼接JSON方法
									tempStr.append("},");
								}
							}
						}
						if (tempStr.length() > 0) {
							str.append(tempStr.substring(0, tempStr.length() - 1));
						}
						str.append("]");
					}
					str.append("},");
					json.append(str);
				}
			}*/
		}
		if (json.length() > 0) {
			jsonbBuilder.append(json.substring(0, json.length() - 1));
		}
		jsonbBuilder.append("]");
		return jsonbBuilder.toString();
	}
	
	/**
	 * @description : 判断该父节点下是否包含(管理员控制权限ID)需要显示的子节点
	 * @param researchPlat
	 * @param platStr
	 * @return
	 * @date : 2015-03-31上午09:45:30
	 * @author : WangYG
	 */
	public boolean isLeaf(ResearchPlat researchPlat, String[] platStr) throws Exception {
		Boolean leaf = true; // 不包含子节点
		Set<ResearchPlat> childrens = researchPlat.getChildren();
		if (childrens != null && childrens.size() > 0) {
			for (ResearchPlat plat : childrens) {
				String childrenId = plat.getId();
				for (int k = 0; k < platStr.length; k++) {
					if (childrenId.equals(platStr[k])) {
						leaf = false;// 包含子节点 下拉树
						break;
					}
				}
				if (leaf == false) {
					break;
				}
			}
		}
		return leaf;
	}

	/**
	 * @description : 根据管理员控制权限，序列化需要显示的子节点平台树JSON(属于管理员控制权限ID)
	 * @param childrenPlats
	 * @param platStr
	 * @date : 2015-03-31上午11:20:23
	 * @author : WangYG
	 * @return
	 */
	public String serializeForChildrenPlatTree(ResearchPlat childrenPlats, String[] platStr) throws Exception {
		StringBuilder jsonbBuilder = new StringBuilder("");
		StringBuffer str = new StringBuffer();
		String id = childrenPlats.getId();
		String text = childrenPlats.getPlatName();
		Set<ResearchPlat> childrens = childrenPlats.getChildren();
		str.append("\"id\":\"").append(id).append("\",");
		str.append("\"text\":\"").append(text).append("\",");
		str.append("\"leaf\":");
		str.append(isLeaf(childrenPlats, platStr));
		if (childrens != null && childrens.size() > 0) {
			str.append(",\"children\":");
			str.append("[");
			StringBuffer tempStr = new StringBuffer();
			for (ResearchPlat plat : childrens) {
				String childrenId = plat.getId();
				for (int k = 0; k < platStr.length; k++) {
					if (childrenId.equals(platStr[k])) {
						tempStr.append("{");
						tempStr.append(serializeForChildrenPlatTree(plat, platStr));
						tempStr.append("},");
					}
				}
			}
			if (tempStr.length() > 0) {
				str.append(tempStr.substring(0, tempStr.length() - 1));
			}
			str.append("]");
		}
		jsonbBuilder.append(str);
		return jsonbBuilder.toString();
	}

	/**
	 * @description : 加载指定id数据
	 * @date : 2015-03-10下午08:06:49
	 * @author : WangYG
	 * @params : { HttpServletRequest request }
	 * @return : String
	 */
	public String load(HttpServletRequest request) throws Exception {
		String id = request.getParameter("id");
		if (!StringUtils.isEmpty(id)) {
			ResearchPlat researchPlat = this.get(id);
			JSONConfig config = new JSONConfig();
			config.setClosCollection(true); // 关闭集合
			String json = JSONUtil.serializeForForm(researchPlat, "root", config);
			return json;
		} else {
			throw new Exception("id为空");
		}
	}

	/**
	 * @description : 当把节点置为有效时，把该节点的父节点和子节点也置为有效.当把节点置为无效时，把子节点也置为无效
	 * @date : 2015-03-10上午10:45:30
	 * @author : WangYG
	 * @params : { HttpServletRequest request, String ids, String property,
	 *         String value }
	 * @return : String
	 */
	public String changeStatus(HttpServletRequest request, String ids, String property, String value) throws Exception {
		if (!(StringUtils.isEmpty(ids))) {
			String idsString = ids;
			StringBuilder sbHql = new StringBuilder();
			if (("valid").equals(property)) {
				ids = "'" + ids.replaceAll(",", "','") + "'";
				String parentHql = "";
				//设为有效
		    	if("1".equals(value)){
					// 当把节点置为有效时，把该节点的父节点和子节点也置为有效
					parentHql = "from ResearchPlat c where c.parent.id in (" + ids + ") or c.id in (" + ids + ")" 
											+ "or id in (select p.parent from ResearchPlat p where id in (" + ids + "))";
					List<ResearchPlat> childens = find(parentHql.toString(), new Object[0]);
					if (null != childens && childens.size() > 0) {
						sbHql.append("update ").append(ClassUtil.getGenericType(this, 0).getSimpleName());
						sbHql.append(" set ").append(property).append(" = '").append(value);
						sbHql.append("' where id in (").append(ids).append(")");
						sbHql.append(" or parent in (").append(ids).append(")");
						sbHql.append("or id in (select p.parent from ResearchPlat p where id in (").append(ids).append("))");
						bulkUpdate(sbHql.toString(), new Object[0]);
					}
				} else {//设为无效时
					//当把节点置为无效时，把子节点也置为无效
					parentHql = "from ResearchPlat c where c.parent.id in (" + ids + ") or c.id in (" + ids + ")";
					List<ResearchPlat> childens = find(parentHql.toString(), new Object[0]);
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
	 * @date : 2015-03-10上午10:45:30
	 * @author : WangYG
	 * @params : { HttpServletRequest request, String[] ids }
	 * @return : boolean
	 */
	public boolean beforeDelete(HttpServletRequest request, String[] ids) {
		boolean flag = true;
		try {
			// 查询需要删除的记录是否没有子节点且状态为无效 ，否则不能删除
			for (String id : ids) {
				String parenthql = "from ResearchPlat c where c.parent.id = '" + id + "' or c.id='" + id + "' and c.valid = '1'";
				List<ResearchPlat> childens = this.find(parenthql, new Object[0]);
				if (null != childens && childens.size() > 0) {
					flag = false;
				}
			}
			if (!flag) {
				this.setMessage("{success : false, msg : \"存在关联数据！\"}");
			}
		} catch (Exception e) {
			this.setMessage("{success : false}");
			flag = false;
			e.printStackTrace();
		}
		return flag;
	}

	/**
	 * @description : 创新平台选择树(人员职责设置时使用)
	 * @date : 2015年3月11日下午2:22:18
	 * @author : cpc
	 * @return : String
	 */
	public String getStaffPlatTree(HttpServletRequest request) throws Exception {
		String id = request.getParameter("id");
		String depth = request.getParameter("depth");
		String parentId = request.getParameter("parentId");// 父节点
		StringBuilder sbHql = new StringBuilder("from ResearchPlat obj where 1=1 ");
		JSONTreeConfig config = new JSONTreeConfig("id", "platName");
		if (!StringUtils.isEmpty(id)) {
			sbHql.append(" and id = '");
			sbHql.append(id);
			sbHql.append("'");
		} else {
			if (!StringUtils.isEmpty(parentId)) {
				sbHql.append(" and parent.id = '");
				sbHql.append(parentId);
				sbHql.append("'");
			} else {
				sbHql.append(" and parent is null");
			}
		}
		
		if("1".equals(depth)){
			depth = "";
		}
		
		String checkBoxtree = request.getParameter("checkBoxtree");
		String json = "";
		if ("0".equalsIgnoreCase(checkBoxtree)) {
			sbHql.append(" order by  obj.platCode asc ");
			List<ResearchPlat> list = this.find(sbHql.toString(), new Object[0]);
			if (!StringUtils.isEmpty(depth)) {
				config.setDepth(Integer.parseInt(depth));
			} else {
				config.setIncludeChildren("children.*");
			}
			json = JSONUtil.serializeForTree(list, config);
			json = json.replaceAll("classType", "checked");
			json = json.replaceAll("\"com.lion.rpms.base.researchplat.model.ResearchPlat\"", "false");

			List<String> listObj = getListObject(json);
			for (String s : listObj) {
				json = json.replace("\"" + s + "\"", "false");
			}
		} else {
			sbHql.append(" and obj.valid='1'  ");
			// 添加人员管理平台权限设置
			UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
			UserToPlat userToPlat = new UserToPlat();
			String platStr = userToPlat.getPlatsStr(userView.getId(), this);
			sbHql.append(" and obj.id in(");
			sbHql.append(platStr);
			sbHql.append(") ");
			sbHql.append(" order by  obj.platCode asc ");
			List<ResearchPlat> list = this.find(sbHql.toString(), new Object[0]);
			if (!StringUtils.isEmpty(depth)) {
				config.setDepth(Integer.parseInt(depth));
			} else {
				config.setAutoLeaf(true);
				config.setIncludeChildren("children.*");
			}
			json = JSONUtil.serializeForTree(list, config);
		}
		return json;
	}

	/**
	 * @Description: 获得哪些含有“_$$_javassist_”等字段
	 * @return
	 * @throws Exception
	 */
	public List<String> getListObject(String json) throws Exception {
		List<String> list = new ArrayList<String>();

		String str = json.replaceAll("\\{", "").replaceAll("\\[", "").replaceAll("\\]", "").replaceAll("\\}", "").replaceAll("\"", "").replaceAll(":", ",");
		String[] array = str.split(",");
		for (String s : array) {
			if (s.contains("_$$_javassist_"))
				list.add(s);
		}
		return list;
	}

	/**
	 * 导入功能
	 */
	@SuppressWarnings({ "rawtypes", "unused" })
	@Override
	public String saveImportPlat(HttpServletRequest request, File file) throws Exception {
		String importType = request.getParameter("importType");
		UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
		SimpleDateFormat fm = new SimpleDateFormat("yyyy-MM-dd");
        ExcelOperation excelOperation = new ExcelOperation();
        List<String[]> list = excelOperation.getImportData(file, 1);
        if(null==list || list.size()==0){
        	throw new Exception("导入的表格有效数据为空！");
        }else{
        	if (importType.equals("1")) {
				String delsql =  "delete from rpms_research_plat ";
				this.executeSql(delsql, new Object[0]);
			}
        	ResearchPlat re;
        	int d=2;
        	List<ResearchPlat> platList = new ArrayList<ResearchPlat>();
        	for(String[] obj:list){
        		d++;
        		String sql = "";
        		List listArray = new ArrayList();
        		re = new ResearchPlat();
        		if(null==obj[0]){
        			continue;
        		}
        		String platCode = obj[0];//机构编号
        		if(StringUtils.isEmpty(platCode)){
        			throw new Exception("机构编号不能为空！");
        		}else{
        			sql = "select id from rpms_research_plat p where  p.plat_code ='"+platCode+"'";
        			listArray = this.executeQuerySql(sql, new Object[0]);
        			if (null != listArray && listArray.size() > 0) {
        				throw new Exception("机构编号"+platCode+"已存在不能重复！");
					} else {
						re.setPlatCode(platCode);
					}
        		}
        		String platName = obj[1];//机构名称
        		if(StringUtils.isEmpty(platName)){
        			throw new Exception("机构名称不能为空！");
        		}else{
        			re.setPlatName(platName);
        		}
        		
        		String organization = obj[2];//单位
        		if(StringUtils.isNotEmpty(organization)){
        			sql = "select id from itsm_organization t where t.name='"+organization.trim()+"'";
        			listArray = this.executeQuerySql(sql, new Object[0]);
        			if(null != listArray && listArray.size() > 0){
        				Organization org = new Organization();
        				org.setId(listArray.get(0).toString());
        				re.setOrganization(org);;
        			}else{
        				throw new Exception(organization+"单位不存在！");
        			}
        		}
        		
        		String grade = obj[3];// 等级
        		if(StringUtils.isNotEmpty(grade)){
        			sql = "select cl.item_value　from itsm_code c ,itsm_code_line cl "
        					+ " where c.id = cl.codeid and c.code = 'rpms_grade' and cl.item_text='"+grade+"'";
        			listArray = this.executeQuerySql(sql, new Object[0]);
        			if(null != listArray && listArray.size() > 0){
        				re.setGrade(listArray.get(0).toString());
        			}else{
        				throw new Exception("等级"+grade+"不存在！");
        			}
        		}
        		
        		String specialty = obj[4];//专业
        		if(StringUtils.isNotEmpty(specialty)){
        			sql = "select id from RPMS_SPECIALTY_DICTIONARY p where  p.SPECIALTY_NAME ='"+specialty+"' and p.parent is null";
        			listArray = this.executeQuerySql(sql, new Object[0]);
        			if(null != listArray && listArray.size() > 0){
        				SpecialtyDictionary sd = new SpecialtyDictionary();
        				sd.setId(listArray.get(0).toString());
        				re.setSpecialty(sd);
        			}else{
        				throw new Exception(specialty+"专业不存在！");
        			}
        		}
        		
        		String approvalDept = obj[5];//批准部门
        		if(StringUtils.isNotEmpty(approvalDept)){
        			re.setApprovalDept(approvalDept);
        		}
        		
        		String fileCode = obj[6];//文件名称编号
        		if(StringUtils.isNotEmpty(fileCode)){
        			re.setFileCode(fileCode);
        		}
        		
        		String approvalTime = obj[7];//批准时间
        		if(StringUtils.isNotEmpty(approvalTime)){
        			re.setApprovalTime(approvalTime);
        		}
        		
        		String platType = obj[8];//平台类型
        		if(StringUtils.isNotEmpty(platType)){
        			sql = "select cl.item_value　from itsm_code c ,itsm_code_line cl "
        					+ " where c.id = cl.codeid and c.code = 'rpms_plat_type' and cl.item_text='"+platType+"'";
        			listArray = this.executeQuerySql(sql, new Object[0]);
        			if(null != listArray && listArray.size() > 0){
        				re.setPlatType(listArray.get(0).toString());
        			}else{
        				throw new Exception("平台类型"+platType+"不存在！");
        			}
        		}
        		
        		String description = obj[9];//平台描述
        		if(StringUtils.isNotEmpty(description)){
        			re.setDescription(description);
        		}
        		
        		String remark = obj[10];//备注
        		if(StringUtils.isNotEmpty(remark)){
        			re.setRemark(remark);
        		}
        		sql = "select id from rpms_research_plat p where  p.plat_code ='"+platCode.substring(0, platCode.length()-2)+"'";
    			listArray = this.executeQuerySql(sql, new Object[0]);
    			if (null != listArray && listArray.size() > 0) {
    				ResearchPlat plat  = new ResearchPlat();
    				plat.setId(listArray.get(0).toString());
    				re.setParent(plat);
				}else{
//					for (int i = 0; i < platList.size(); i++) {
//						if(platList.get(i).getPlatCode().equals(platCode.substring(0, platCode.length()-2))){
//							ResearchPlat plat  = new ResearchPlat();
//		    				plat.setId(platList.get(i).getId());
//							re.setParent(platList.get(i));
//						}
//					}
				}
        		re.setValid("1");
        		re.setCreateUser(userView.getUserName());
        		re.setCreateTime(new Date());
        		platList.add(re);
        		this.save(re);
        	}
//        	for (int i = 0; i < platList.size(); i++) {
//        		this.save(platList.get(i));
//			}
//        	update rpms_research_plat p set p.parent=(select id from rpms_research_plat plat where plat.plat_code = SUBSTR(p.plat_code,0,length(p.plat_code)-2))

        }
		return null;
	}
	
	public boolean beforeSave(HttpServletRequest request, ResearchPlat businessObject) throws Exception {
		String actionM = businessObject.getActionM();
		this.getRequest().setAttribute("actionM", actionM);
		return true;
	}
	
	/**
	 * 重写方法,在保存后将新增平台插入到创建人所在的人员职责的平台设置里面
	 * @author yangss
	 */
	@SuppressWarnings("unchecked")
	@Override
	public boolean afterSave(HttpServletRequest request, ResearchPlat businessObject) throws Exception {
		String actionM = (String)request.getAttribute("actionM");
		if("1".equals(actionM)){
			String platId = businessObject.getId();
			UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
			String staffSql = "select staff_id from RPMS_STAFF_USER where user_id=?";
			List<String> staffList = this.executeQuerySql(staffSql, new Object[]{userView.getId()});
			for(String str : staffList){
				this.executeSql("insert into RPMS_STAFF_PLAT (id,staff_id,plat_id) values (sys_guid(),?,?)", new Object[]{str, platId});
			}
		}
		
		return true;
	}
}
