package com.lion.base.common;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import com.lion.core.manager.GenericManager;
import com.lion.core.webapp.action.BaseAction;
import com.lion.system.Constants;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.User;

/**
 * @description : 通用模块数据加载action
 * @date : 2013-5-16下午08:10:08
 * @author : 王绪乐
 */
@SuppressWarnings("unchecked")
public class CommonAction extends BaseAction {
	private static final long serialVersionUID = 2916498164664678849L;

	private GenericManager<List<?>, String> manager;

	private String limit = "15";
	private String start = "0";

	/**
	 * @description : 获取首页顶部页面信息
	 * @date : 2013-5-22上午11:55:45
	 * @author : 王绪乐
	 * @return : String
	*/
	public String genMainTop() {
		try {
			java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy年MM月dd日");
			Organization org = (Organization)getSession().getAttribute(Constants.USER_ORGANIZATION);
			List<Object[]> list = manager.executeQuerySql("select w.weather, w.temp, w.img_day, s.areaname from t_interface_weather_set s,t_interface_weather w where w.wt_set_id=s.id and s.sys_dep_id=?", new Object[]{org.getId()});
			String weather = "", temperature = "", weatherImg = "", areaName = "", modules = "";
			
			if(list!=null && list.size()>0) {
				weather = list.get(0)[0] == null ? "晴" : String.valueOf(list.get(0)[0]);
				temperature = list.get(0)[1] == null ? "23℃~14℃" : String.valueOf(list.get(0)[1]);
				weatherImg = list.get(0)[2] == null ? "d00.gif" : String.valueOf(list.get(0)[2]);
				areaName = list.get(0)[3] == null ? "济南" : String.valueOf(list.get(0)[3]);
			}
	
			//获取用户所有模块权限
			User user = (User)this.getSession().getAttribute(Constants.USER_AUTH);
			StringBuilder sqlSb = new StringBuilder();
			sqlSb.append("select wmsys.wm_concat(rm.module_id) from itsm_role_module rm where rm.role_id in");
			sqlSb.append(" (select r.role_id from itsm_user_role r where r.user_id=?) ");
			sqlSb.append(" and rm.module_id in (select m.id from itsm_module m where m.parent is null)");
			List<String> moduleId = manager.executeQuerySql(sqlSb.toString(), new Object[]{user.getId()});
			if(moduleId != null && moduleId.size() > 0) {
				if(moduleId.get(0) != null) {
					modules = moduleId.get(0);
				}
			}
			
			getRequest().setAttribute("modules", modules);
			getRequest().setAttribute("weather", weather);
			getRequest().setAttribute("temperature", temperature);
			getRequest().setAttribute("weatherImg", weatherImg);
			getRequest().setAttribute("areaName", areaName);
			getRequest().setAttribute("date", sdf.format(new Date()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/**
	 * @description : 公用的获取文件列表信息
	 * @date : 2013-5-22上午11:55:50
	 * @author : 王绪乐
	 * @return : String
	*/
	public String listFilesByPage() throws IOException {
		try {
			String businessId = (String) this.getRequest().getParameter("businessId");
			StringBuilder sbSql = new StringBuilder();StringBuilder tableSb = new StringBuilder();
			String fileType = "doc", fileName = "";
			
			sbSql.append("select f.id, f.DOC_DOWNLOAD_NAME, to_char(round(f.DOC_SIZE/1048576, 2), '99999990.99')||'M', u.username, to_char(f.CREATE_TIME, 'yyyy-MM-dd hh24:mi:ss'), f.LOAD_IP from ITSM_DOCUMENT f ");
			sbSql.append("left join itsm_user u on u.id = f.CREATE_USER ");
			sbSql.append("where f.DOC_FK = '");
			sbSql.append(businessId);
			sbSql.append("'");
			sbSql.append(" order by f.CREATE_TIME desc");
			
			List<Object[]> fileData = (List<Object[]>) manager.executeQuerySql(sbSql.toString(), new Object[0]);
			
			if(fileData != null && fileData.size() > 0) {
		   		int num=0;	
		   		
		   		tableSb.append("<tr class=\"thtitle\"><td >序号</td><td >文件名</td><td >大小</td><td >上传人</td><td >时间</td><td >下载</td></tr>");
				for(Object[] row : fileData) {
					num+=1;
					if (row[1] != null) {
						fileName = row[1].toString();
						fileType = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());
						if(fileName.length() > 40)
							fileName = fileName.substring(0, 40) + "." +  fileType;
					} else {
						row[1] = "";
					}
					
					tableSb.append("<tr class=");
					if (num % 2 != 0) {
						tableSb.append("\"shen\">");
					} else {
						tableSb.append("\"qian\">");
					}
					tableSb.append("<td width=\"40px\" align=\"center\">").append(num).append("</td>");
					
					tableSb.append("<td width=\"500px\" align=\"left\">");
					tableSb.append(fileName).append("</td>");
					
					tableSb.append("<td width=\"80px\" align=\"center\">").append(row[2]).append("</td>");
					tableSb.append("<td width=\"100px\" align=\"center\">").append(row[3]).append("</td>");
					tableSb.append("<td width=\"140px\" align=\"center\">").append(row[4]).append("</td>");
					
					tableSb.append("<td width=\"40px\" align=\"center\"><a href=\"");
					tableSb.append(row[5]).append("?id=").append(row[0]);
					tableSb.append("\" target=\"_blank\"> <img src=\"").append(getRequest().getContextPath()).append("/images/cmdb/download_file.gif\" border=\"0\" alt=\"下载\" title=\"下载\"></a></td>");
					tableSb.append("</tr>");
				}
			}
			
			this.print(tableSb.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	public GenericManager<List<?>, String> getManager() {
		return manager;
	}

	public void setManager(GenericManager<List<?>, String> manager) {
		this.manager = manager;
	}

	public String getLimit() {
		return limit;
	}
	
	public void setLimit(String limit) {
		this.limit = limit;
	}
	
	public String getStart() {
		return start;
	}
	
	public void setStart(String start) {
		this.start = start;
	}
}
