package com.lion.rpms.research.project.manager.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.lion.core.dao.GenericDao;
import com.lion.core.util.ClassUtil;
import com.lion.core.util.StringUtils;
import com.lion.core.util.json.JSONConfig;
import com.lion.core.util.json.JSONUtil;
import com.lion.rpms.common.UserToPlat;
import com.lion.rpms.research.project.manager.ProjectManager;
import com.lion.rpms.research.project.model.Project;
import com.lion.rpms.research.project.model.ProjectPartners;
import com.lion.system.Constants;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.framework.model.LoginInfo;
import com.lion.system.user.model.UserView;

/**
 * @description : 项目立项管理业务实现类
 * @Author : 曹鹏程
 * @Date ： 2015-03-10 13:59:17
 */

public class ProjectManagerImpl extends BusinessManagerImpl<Project,String> implements ProjectManager {

    public ProjectManagerImpl(GenericDao<Project, String> dao) {
        super(dao);
    }
    
    
	/**
	 * @description : 得到一个指定 projectId的 Project类实体信息(项目推广管理加载指定projectId项目时使用)
	 * @date : 2015-03-12 下午07:36:49
	 * @author : WangYG
	 * @params : { HttpServletRequest request }
	 * @return : String
	 */
	public String getProjectInfo(HttpServletRequest request) throws Exception {
		String projectId = request.getParameter("projectId");
		if (!StringUtils.isEmpty(projectId)) {
			Project project = this.get(projectId);
			JSONConfig config = new JSONConfig();
			config.setClosCollection(true); // 关闭集合
			String json = JSONUtil.serializeForForm(project, "root", config);
			return json;
		} else {
			throw new Exception("projectId为空");
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public StringBuilder genListConditionHql(HttpServletRequest request) throws Exception {
	    StringBuilder sbHql = new StringBuilder(" where 1=1 ");
	    
	    String platId = request.getParameter("platId");
	    if(!StringUtils.isBlank(platId)){
	    	String platArray  = "";
			String sql = "select id from rpms_research_plat t "
					+ "start with t.id = '"+platId+"' connect by prior t.id = t.parent";
			List<String> platlist = this.executeQuerySql(sql, new Object[0]);
			if (null != platlist && platlist.size()>0) {
				for (int i = 0; i < platlist.size(); i++) {
					platArray = platlist.get(i) +"','"+platArray.toString();
				}
				
			}
			if(!StringUtils.isBlank(platArray)){
				platArray = "'"+platArray.substring(0, platArray.length()-2);
			}else{
				platArray ="''";
			}
			sbHql.append(" and obj.platInstitution.id in(");
			sbHql.append(platArray);
			sbHql.append(") ");
		}
	    
	  //admin用户可以查看所有数据
		LoginInfo info = (LoginInfo)request.getSession().getAttribute("loginInfo");
		if (!((info != null) && (info.getIsAdmin()))) {
			UserView userView = (UserView) request.getSession().getAttribute(Constants.USER_VIEW);
		    //添加人员管理平台权限设置
		    UserToPlat  userToPlat = new UserToPlat();
		    String platStr = userToPlat.getPlatsStr(userView.getId(),this);
		    sbHql.append(" and obj.platInstitution.id in(");
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


	@SuppressWarnings({ "unchecked" })
	@Override
	public String createProjectCode(HttpServletRequest request) throws Exception {
		String projectAnnual = request.getParameter("projectAnnual");//年度
//		String projectLevel = request.getParameter("projectLevel");
		String platCenter = request.getParameter("platCenter");//分中心
//		String specialty = request.getParameter("specialty");
//		String proejctType = request.getParameter("proejctType");
		
		//根据分中心id获得编码
		List<String> platCenterList = this.executeQuerySql("select plat_code from rpms_research_plat where id =?", new Object[]{platCenter});
		//根据专业id获得编码
//		List<String> specialtyList = this.executeQuerySql("select t.specialty_code from rpms_specialty_dictionary t where id =?", new Object[]{specialty});
				
//		String code = projectAnnual + projectLevel.substring(2)+platCenterList.get(0).substring(0, 2)+specialtyList.get(0)+proejctType.substring(2);
		String code = projectAnnual + platCenterList.get(0);
		//根据生成的编号获取数据库中已存最大的在后三位的编号
		String sql = "select code from (select LPAD(to_char(to_number(substr(p.project_code,-3,3)))+1,3,'0') code from rpms_project p where p.project_code like '"+code+"%' order by p.project_code desc) where rownum=1";
	    List<String> codeList = this.executeQuerySql(sql, new Object[0]);
		if(null != codeList && codeList.size()>0){
			code = code + codeList.get(0);
		}else{
			code = code + "001";
		}			
		return "{success:true,code:\""+code+"\"}";
	}
	
	
	public String changeStatus(HttpServletRequest request, String ids, String property, String value) throws Exception {
	    if (!StringUtils.isEmpty(ids)) {
//	      String[] idarray = ids.split(",");
	      ids = "'" + ids.replaceAll(",", "','") + "'";
	      StringBuilder sbHql = new StringBuilder();
	      sbHql.append("update ").append(ClassUtil.getGenericType(this, 0).getSimpleName());
	      sbHql.append(" set ").append(property).append(" = '").append(value);
	      sbHql.append("' where id in (").append(ids).append(")");
	      bulkUpdate(sbHql.toString(), new Object[0]);
	      if(value.equals("0005")){
	    	  String sql =  "update rpms_Project t set  t.PROJECT_STATUS = '0002' where t.id in("+ids+")";
	    	  this.executeSql(sql, new Object[0]);
	      }
	      /**修改1:删除 更改状态为'立项完成'时插入记录到项目调度管理模块 的功能 by : 杨尚山 @date 2016-04-15*/
//	      if(value.equals("0004")){
//	    	  String sql =  "insert into RPMS_PROJECT_DISPATCH(id,PROJECT_ID,PROJECT_STAGE,STATUS,TYPE) select sys_guid(),id,'0001','0001','0001' from RPMS_PROJECT p where p.id in("+ids+")";
//	    	  this.executeSql(sql, new Object[0]);
//	      }
	      /**修改1 end*/
	    }
	    return "{success : true, ids : \"" + ids + "\"}";
	}


	@Override
	public String updateProjectBackMsg(HttpServletRequest request) throws Exception {
		String ids = request.getParameter("ids");
		String backMsg = request.getParameter("backMsg");
		String rkMsg = request.getParameter("rkMsg");
		String rkType = request.getParameter("rkType");
		if (!StringUtils.isEmpty(ids)) {
			if("0001".equals(rkType)){
				StringBuilder sbHql = new StringBuilder();
			    sbHql.append("update Project ");
			    sbHql.append(" set snrk = '");
			    sbHql.append(rkMsg);
			    sbHql.append("' where id in (").append(ids).append(")");
			    bulkUpdate(sbHql.toString(), new Object[0]);
			} else if("0002".equals(rkType)){
				StringBuilder sbHql = new StringBuilder();
			    sbHql.append("update Project ");
			    sbHql.append(" set swrk = '");
			    sbHql.append(rkMsg);
			    sbHql.append("' where id in (").append(ids).append(")");
			    bulkUpdate(sbHql.toString(), new Object[0]);
			} else {
				StringBuilder sbHql = new StringBuilder();
			    sbHql.append("update Project ");
			    sbHql.append(" set status ='0003' , backMsg = '");
			    sbHql.append(backMsg);
			    sbHql.append("' where id in (").append(ids).append(")");
			    bulkUpdate(sbHql.toString(), new Object[0]);
			}
	    }
	    return "{success : true, ids : \"" + ids + "\"}";
	}
	
	public Project save(Project object){
		object = changeProjectPartners(object);
	    return this.dao.save(object);
	}
	
	/**
	 * 处理合作协作单位可填写,可选择的方法
	 * 手动输入的合作单位id和name名称一致,故将ProjectPartners中的ResearchPlat对象设置为null
	 * 从而避免因查询不到对象值而引起的程序错误
	 * @param businessObject
	 * @return
	 */
	public Project changeProjectPartners(Project businessObject){
    	List<ProjectPartners> dataL = businessObject.getProjectPartners();
    	List<ProjectPartners> parL = new ArrayList<ProjectPartners>();
    	for(ProjectPartners p : dataL){
    		String ids = p.getResearchPlat().getId();
    		String name = p.getResearchPlat().getPlatName();
    		if(name.equals(ids)){
    			p.setResearchPlat(null);
    		}
    		parL.add(p);
    	}
    	businessObject.setProjectPartners(parL);
		return businessObject;
    }
	
}
