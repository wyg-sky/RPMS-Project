package com.lion.base.storage.manager.impl;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.struts2.ServletActionContext;

import com.lion.base.storage.manager.StorageImportManager;
import com.lion.base.storage.model.Storage;
import com.lion.core.dao.GenericDao;
import com.lion.core.util.JDBCUtil;
import com.lion.core.util.POIUtil;
import com.lion.core.util.Uuid;
import com.lion.system.codegenerator.manager.CodeGeneratorManager;
import com.lion.system.common.manager.impl.BusinessManagerImpl;
import com.lion.system.organization.model.Organization;
import com.lion.system.user.model.UserView;

@SuppressWarnings("unchecked")
public class StorageImportManagerImpl extends BusinessManagerImpl<Storage, String> implements StorageImportManager {
	JDBCUtil util = null;
	Connection con = null;
	private CodeGeneratorManager codeGeneratorManager;
	private String tempTable = "T_TEMP_EXCEL";
	private String tableName = "BASE_STORAGE";
	private String tablespace = "CIMSEQUI";
	private String fileName = "F:/test.xlsx";
	private int startR = 1;
	private int startC = 2;
	private int totalR = 0;
	private int totalC = 0;
	private int goOrNot = 1;
	private int args[] = {
			0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16
	};
	private StringBuilder msg = new StringBuilder();
	private String importType = "0";
	private String importCode = "1";
	private String importSysId = "2";
	@SuppressWarnings("unused")
	private String orgCode = "00";
	private UserView user = null;
	private Organization organization = null;
	
	public StorageImportManagerImpl(GenericDao<Storage, String> dao) {
		super(dao);
	}

	/**
	 * @description : 初始化
	 * @date : 2013-11-13下午01:26:02
	 * @author : 李超
	 * @params : {
			
		}
	 * @return : void
	*/
	@SuppressWarnings("deprecation")
	public void init() {
		try {
			util = new JDBCUtil();
			util.initJdbc();
			con = this.getCurrentSession().connection();
		} catch (Exception e) {
			goOrNot = 0;
			msg.append("msg数据库连接失败！，");
			msg.append(e.getMessage());
			e.printStackTrace();
		}
	}
	
	/*
	 * 获取编码
	 */
	private String getCode(String className, String codeProperty, int length, String prefix) throws Exception {
		return this.codeGeneratorManager.genOrderCode(className, codeProperty, length, null, null);
	}

	/**
	 * @description : 把excel数据导入到临时表
	 * @date : 2013-11-13下午01:26:02
	 * @author : 李超
	 * @params : {
			int num
		}
	 * @return : void
	*/
	public void createTempTable(int num) {
		int total = num;
		try {
			int hasOrNOt = JDBCUtil.executeQuery(con, "select count(1) from user_tables where table_name = upper('"+tempTable+"') or table_name = lower('"+tempTable+"')");
			if(hasOrNOt==1) {
				JDBCUtil.executeSql(con, "drop table "+tempTable);
			}
			StringBuilder sql = new StringBuilder();
			sql.append("create table ");
			sql.append(tempTable);
			sql.append("(");
			for(int i=0; i<total;i++) {
				sql.append("c");
				sql.append(i);
				sql.append(" VARCHAR2(3000)");
				if(i!=total-1) {
					sql.append(",");
				}
			}
				
			sql.append(") ");
			sql.append("tablespace ");
			sql.append(tablespace);
			sql.append(" pctfree 10 ");
			sql.append("initrans 1 ");
			sql.append("maxtrans 255 ");
			sql.append("storage ");
			sql.append("(");
			sql.append("initial 1024 ");
			sql.append("minextents 1 ");
			sql.append("maxextents unlimited");
			sql.append(")");
			JDBCUtil.executeSql(con, sql.toString());
		} catch (Exception e) {
			msg.append("msg创建模板失败,");
			msg.append(e.getMessage());
			goOrNot = 0;
			e.printStackTrace();
		}
	}

	/**
	 * @description : 把excel数据导入到临时表
	 * @date : 2013-11-13下午01:26:02
	 * @author : 李超
	 * @params : {
			
		}
	 * @return : void
	*/
	public void importBegin() {
		if (goOrNot == 0) {
			return;
		}
		int r = 0, c = 0;
		StringBuilder sql = new StringBuilder();
		try {
			POIUtil excel = new POIUtil();
			Sheet sheet = excel.getSheet(excel.readWorkbook(fileName), 0);

			if (totalR == 0) {
				totalR = sheet.getLastRowNum() + 1;
			}
			if (totalC == 0) {
				totalC = excel.getRow(sheet, 0).getLastCellNum();
				if (totalC == 0) {
					msg.append("Excel结构错误，请确认！");
					goOrNot = 0;
				}
			}
			
			List colList = JDBCUtil.getTableColumns(con, null, null, tableName);
			int tableCount  = colList.size();//表格列数-2
			createTempTable(colList.size());
			int count = tableCount - 1;
			if(tableCount>args.length) {//出现这情况，扩展args数组
				msg.append("表结构错误，请确认！");
				goOrNot = 0;
				return;
			}
			
			for (r = startR; r < totalR; r++) {
				Row row = excel.getRow(sheet, r);
				sql.setLength(0);
				sql.append("insert into ");
				sql.append(tempTable);
				sql.append(" values(");
				
				sql.append("'");
				if("2".equals(this.importSysId)) {
					Object id = getCellContent(row.getCell(0));
					if(id!=null && !"".equals(id)) {
						sql.append(id.toString());
					} else {//id为空
						msg.append("msg插入临时表失败,第"+(r+1));
						msg.append("行");
						msg.append("第一列序号为空");
						goOrNot = 0;
						break;
					}
				} else {
					sql.append(Uuid.genUuid());
				}
				sql.append("', ");
				
				String code = getCellContent(row.getCell(args[1])).toString();
				if("1".equals(this.importCode)) {
					code = getCode("Storage","storageCd",8,"CK");
				} else {
					if("".equals(code)) {
						msg.append("msg插入临时表失败,第"+(r+1));
						msg.append("行"+(2));
						msg.append("列编码错误");
						goOrNot = 0;
						break;
					}
				}
			
				sql.append("'");
				sql.append(code);
				sql.append("', ");
				
				for (c = startC; c < tableCount; c++) {
					JDBCUtil.Column col = (JDBCUtil.Column) colList.get(c);
					Object object = "";
					if (row != null) {
						object = getCellContent(row.getCell(args[c]));
					}
					
					if(col.getSqlType() == Types.DATE) {
						sql.append("to_char(to_date('");
						sql.append(object.toString().trim());
						sql.append("','yyyy/MM/dd hh24:mi:ss'),'yyyy-MM-dd')");
					} else {
						sql.append("'");
						sql.append(object.toString().trim());
						sql.append("'");
					}
					
					if (c != count) {
						sql.append(", ");
					}
				}
				sql.append(")");
				JDBCUtil.executeSql(con, sql.toString());
			}
			totalR = 0;
			totalC = 0;
		} catch (Exception e) {
			msg.append("msg插入临时表失败,第"+(r+1));
			msg.append("行数据格式有误，");
			msg.append(e.getMessage());
			goOrNot = 0;
			e.printStackTrace();
		}
	}

	/**
	 * @description : 对导入数据的与数据库进行转换，例如把部门名称转化为ID
	 * @date : 2013-11-13下午01:26:02
	 * @author : 李超
	 * @params : {
			
		}
	 * @return : void
	*/
	public void importTransform() {
		if (goOrNot == 0) {
			return;
		}
		try {
			StringBuilder sql = new StringBuilder();
			// 仓库类型
			sql = new StringBuilder();
			sql.append("update ");
			sql.append(tempTable);
			sql.append(" t set t.c4=nvl(");
			sql.append("(select code.item_value ");
			sql.append("from v_itsm_code code ");
			sql.append("where code.code='equi_storage_type' ");
			sql.append("and t.c4=code.item_text),'0001')");
			JDBCUtil.executeSql(con, sql.toString());
			
			// 所属系统
			sql = new StringBuilder();
			sql.append("update ");
			sql.append(tempTable);
			sql.append(" t set t.c8=nvl(");
			sql.append("(select code.item_value ");
			sql.append("from v_itsm_code code ");
			sql.append("where code.code='sys_system_type' ");
			sql.append("and t.c8=code.item_text),'004')");
			JDBCUtil.executeSql(con, sql.toString());
			
			// 是否有效
			sql = new StringBuilder();
			sql.append("update ");
			sql.append(tempTable);
			sql.append(" t set t.c9=nvl(");
			sql.append("(select code.item_value ");
			sql.append("from v_itsm_code code ");
			sql.append("where code.code='cims_effective' ");
			sql.append("and t.c9=code.item_text),'1')");
			JDBCUtil.executeSql(con, sql.toString());
			// 锁定状态
			sql = new StringBuilder();
			sql.append("update ");
			sql.append(tempTable);
			sql.append(" t set t.c10=nvl(");
			sql.append("(select code.item_value ");
			sql.append("from v_itsm_code code ");
			sql.append("where code.code='cims_boolean' ");
			sql.append("and t.c10=code.item_text),'1')");
			JDBCUtil.executeSql(con, sql.toString());
			
			// 单位
			sql = new StringBuilder();
			sql.append("update ");
			sql.append(tempTable);
			sql.append(" t set t.c12=nvl(");
			sql.append("(select org.id ");
			sql.append("from ITSM_ORGANIZATION org ");
			sql.append("where org.name=t.c12),'");
			sql.append(this.organization.getId());
			sql.append("')");
			JDBCUtil.executeSql(con, sql.toString());

			// 创建人
			sql = new StringBuilder();
			sql.append("update ");
			sql.append(tempTable);
			sql.append(" t set t.c13='");
			sql.append(this.user.getUserName());
			sql.append("'");
			JDBCUtil.executeSql(con, sql.toString());
			
			// 创建时间
			sql = new StringBuilder();
			sql.append("update ");
			sql.append(tempTable);
			sql.append(" t set t.c14=to_char(sysdate,'yyyy-MM-dd hh24:mi:ss')");
			JDBCUtil.executeSql(con, sql.toString());
			
			// 修改人
			sql = new StringBuilder();
			sql.append("update ");
			sql.append(tempTable);
			sql.append(" t set t.c15='");
			sql.append(this.user.getUserName());
			sql.append("'");
			JDBCUtil.executeSql(con, sql.toString());
			
			// 修改时间
			sql = new StringBuilder();
			sql.append("update ");
			sql.append(tempTable);
			sql.append(" t set t.c16=to_char(sysdate,'yyyy-MM-dd hh24:mi:ss')");
			JDBCUtil.executeSql(con, sql.toString());
			
			
			// 删除空值
			sql = new StringBuilder();
			sql.append("delete from  ");
			sql.append(tempTable);
			sql.append(" where c1 is null");
			JDBCUtil.executeSql(con, sql.toString());
			
		} catch (Exception e) {
			msg.append("msg数据转换有误，");
			msg.append(e.getMessage());
			goOrNot = 0;
			e.printStackTrace();
		}
	}

	/**
	 * @description : 导入正式库，删除临时表，结束导入
	 * @date : 2013-11-13下午01:26:02
	 * @author : 李超
	 * @params : {
			
		}
	 * @return : void
	*/
	public void importEnd() {
		if(goOrNot==0) {
			return ;
		}
		try {
			StringBuilder sql = new StringBuilder();
			if("1".equals(this.importType)) {
				sql = new StringBuilder();
				
				sql.append("delete from ");
				sql.append(tableName);
				JDBCUtil.executeSql(con, sql.toString());
			}
			
			List colList = JDBCUtil.getTableColumns(con, null, null, tableName);
			int count = colList.size()-1;
			sql = new StringBuilder();
			sql.append("insert into ");
			sql.append(tableName);
			sql.append("(");
			for(int i=0; i<colList.size(); i++) {
				JDBCUtil.Column col = (JDBCUtil.Column) colList.get(i);
				sql.append(col.getName());
				if(i!=count) {
					sql.append(", ");
				}
			}
			sql.append(") select ");
			List colTempList = JDBCUtil.getTableColumns(con, null, null, tempTable);
			for(int i=0; i<colTempList.size(); i++) {
				JDBCUtil.Column colTemp = (JDBCUtil.Column) colTempList.get(i);
				JDBCUtil.Column col = (JDBCUtil.Column) colList.get(i);
				if(col.getSqlType() == Types.DATE) {
					sql.append("to_date(");
					sql.append(colTemp.getName());
					sql.append(",'yyyy/MM/dd hh24:mi:ss')");
				} else {
					sql.append(colTemp.getName());
				}
				if(i!=count) {
					sql.append(", ");
				}
			}
			sql.append(" from ");
			sql.append(tempTable);
			JDBCUtil.executeSql(con, sql.toString());

			//删除临时表
			JDBCUtil.executeSql(con, "drop table "+tempTable);
			//更新 system_type 为  015
			String updateSql = " update base_storage t set t.system_type ='015' ";
			JDBCUtil.executeSql(con, updateSql);
			
		} catch (Exception e) {
			msg.append("msg导入正式表有误，");
			msg.append(e.getMessage());
			goOrNot = 0;
			e.printStackTrace();
		}
	}
	
	/**
	 * @description : 转换单元格
	 * @date : 2013-11-13下午01:26:02
	 * @author : 李超
	 * @params : {
			Cell cell
		}
	 * @return : Object
	*/
	public Object getCellContent(Cell cell) {
		Object object = cell;
		if(cell!=null) {
			switch (cell.getCellType()) {
				case XSSFCell.CELL_TYPE_BLANK:
					object = "";
					break;
				case XSSFCell.CELL_TYPE_ERROR:
					object = "";
					break;
				case XSSFCell.CELL_TYPE_BOOLEAN:
					object = cell.getBooleanCellValue();
					break;
				case XSSFCell.CELL_TYPE_FORMULA:// 公式
					object = cell.getNumericCellValue();
					break;
				case XSSFCell.CELL_TYPE_NUMERIC:
					if (DateUtil.isCellDateFormatted(cell)) {
						object = cell.getDateCellValue();
					} else {
						object = Double.valueOf(cell.getNumericCellValue()).longValue();
					}
					break;
				case XSSFCell.CELL_TYPE_STRING:
					object = cell.getRichStringCellValue();
					break;
				default:
					object = cell;
			}
		} else {
			object = "";
		}
		return object;
	}
	
	/**
	 * @description : 导入数据的main方法
	 * @date : 2013-11-13下午01:26:02
	 * @author : 李超
	 * @params : {
			String importType, 
			String mainId, 
			String fileName
		}
	 * @return : String
	*/
	public String importToDb(String orgCode, String importType, String importCode, String importSysId,Organization organization, UserView user, String fileName) {
		this.fileName = fileName;
		this.goOrNot = 1;
		this.user = user;
		this.organization = organization;
		this.importType = importType;
		this.importCode = importCode;
		this.importSysId = importSysId;
		this.msg.setLength(0);
		this.orgCode = orgCode;

		init();
		importBegin();
		importTransform();
		importEnd();
		destory();
		return msg.toString();
	}
	
	/**
	 * @description : 回收内存
	 * @date : 2013-11-13下午01:26:02
	 * @author : 李超
	 * @params : {
			
		}
	 * @return : void
	*/
	public void destory() {
		try {
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	
	/**
	 * @description : action调用导入方法
	 * @date : 2013-11-13下午01:26:02
	 * @author : 李超
	 * @params : {
			String importType, 
			String mainId
		}
	 * @return : String
	*/
	@Override
	public String importStorage(String importType, String importCode, String importSysId,Organization organization, UserView user) {
		String message = "";
		List fileList = executeQuerySql("select t.doc_path,t.doc_name from itsm_document t where t.doc_fk='6ab680b58df24711badae71a6adf46bb' order by t.create_time desc",new Object[0]);
		if (fileList.size() > 0) {
			Object[] obj = (Object[]) fileList.get(0);
			String realPath = ServletActionContext.getServletContext().getRealPath(obj[0] + "")+ "/" + obj[1];
			String orgCode = "";
			if (organization != null && !"".equals(organization.getCode())) {
				orgCode = organization.getCode();
				String msg = this.importToDb(orgCode,importType, importCode, importSysId,organization, user, realPath);
				if ("".equals(msg)) {
					message = "{success:true}";
				} else {
					int begin = msg.lastIndexOf(":") + 1;
					int end = msg.length() - 1;
					if (begin < end) {
						msg = msg.substring(msg.lastIndexOf("msg") + 3, msg
								.length() - 1);
					}
					message = "{success:false,msg:\"" + msg + "\"}";
				}
			}else{
				message = "{success:false,msg:\"组织单位为空！\"}";
			}
			
		} else {
			message = "{success:false,msg:\"未上传excel表格！\"}";
		}
		return message;
	}

	public CodeGeneratorManager getCodeGeneratorManager() {
		return codeGeneratorManager;
	}

	public void setCodeGeneratorManager(CodeGeneratorManager codeGeneratorManager) {
		this.codeGeneratorManager = codeGeneratorManager;
	}

}
