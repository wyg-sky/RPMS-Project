package com.lion.rpms.common;

import java.io.File;
import java.io.FileInputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;

import com.lion.system.common.manager.BusinessManager;

/**
* @ClassName: ExcelOperation 
* @Description:  读取Excel03文件内容
* @author zzm
* @date 2014-7-9 下午4:51:44
 */
@SuppressWarnings("rawtypes")
public class ExcelOperation{
	private HSSFWorkbook wb = null;// Excel文档对象
	private HSSFSheet sheet = null;// Excel表单对象
	private HSSFRow row = null;// Excel行
	private FileInputStream fis = null;
	private File file = null;
	SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
	/**
	* @Title: getImportData 
	* @Description: 得到上传文件的数据集合，为下一步处理提供数据
	* @author zzm
	* @date 2014-7-9 下午4:32:46 
	* @param file 文件对象
	* @param beginRow 从哪一行开始读取,0是指从第一行开始读取，1指从第二行开始读取，……
	* @return 返回数据集合List<String[]>
	* @throws Exception
	 */
	public List<String[]> getImportData(File file,int beginRow) throws Exception {
		this.file = file;
		
		this.open();
		
		int count = this.getRowCount(0);// 总行数
		if(beginRow>count){
			return null;
		}
		
		List<String[]> list = new ArrayList<String[]>();
		
		// i代表从哪一行执行
		for (int i = beginRow; i <= count; i++) {
			String[] rows = this.readExcelLine(0,i);
			list.add(rows);
		}
		
		return list;
	}
	
	/**
	* @Title: insertDataToTempTable 
	* @Description: 将数据插入临时表中。注意，执行完导入后操作后务必调用删除方法deleteTempTable删除临时表
	* @author zzm
	* @date 2014-7-11 下午2:31:48 
	* @param file
	* @param beginRow 从哪一行开始读取,0是指从第一行开始读取，1指从第二行开始读取，……
	* @param manager 操作数据库对象
	* @return 返回存储数据的临时表表名
	* @throws Exception 
	*/
	public String insertDataToTempTable(File file,int beginRow,BusinessManager manager) throws Exception{
		this.file = file;
		
		this.open();
		
		int count = this.getRowCount(0);// 总行数
		if(beginRow>count){
			throw new Exception("Excel总行数小于"+beginRow);
		}
		
		String tempTableName = "TEMP_TABLE_" + String.valueOf(System.currentTimeMillis());
		
		StringBuilder sql = new StringBuilder();
		sql.append("create table ");
		sql.append(tempTableName);
		sql.append("(");
		sql.append("c VARCHAR2(300),");
		for(int i=0; i<=100;i++) {
			sql.append("c").append(i);
			sql.append(" VARCHAR2(3000)");
			if(i!=100) {
				sql.append(",");
			}
		}
		sql.append(") ");
		sql.append("tablespace ");
		sql.append("CIMSOAMS");
		sql.append(" pctfree 10 ");
		sql.append("initrans 1 ");
		sql.append("maxtrans 255 ");
		sql.append("storage ");
		sql.append("(");
		sql.append("initial 1024 ");
		sql.append("minextents 1 ");
		sql.append("maxextents unlimited");
		sql.append(")");
		manager.executeSql(sql.toString(), null);
		
		// i代表从哪一行执行
		int k = 1;
		for (int i = beginRow; i <= count; i++) {
			String[] rows = this.readExcelLine(0,i);
			if(null!=rows && rows.length>0){
				if(rows.length>=100){
					throw new Exception("你导入的Excel表格有效列数应当小于100！");
				}
				
				StringBuilder insertSql = new StringBuilder();
				insertSql.append("insert into ").append(tempTableName).append("(");
				insertSql.append("c,");
				for(int j=0;j<=rows.length;j++){
					insertSql.append("c").append(j);
					if(j!=rows.length) {
						insertSql.append(",");
					}
				}
				insertSql.append(")").append(" values (sys_guid(),'").append(k).append("',");
				for(int j=0;j<rows.length;j++){
					insertSql.append("'").append(null==rows[j]?"":rows[j]).append("'");
					if(j!=rows.length-1) {
						insertSql.append(",");
					}
				}
				insertSql.append(")");
				manager.executeSql(insertSql.toString(), new Object[0]);
				k++;
			}
		}
			
		return tempTableName;
	}
	
	/**
	* @Title: deleteTempTable 
	* @Description: 删除临时表
	* @author zzm
	* @date 2014-7-11 下午3:40:37 
	* @param tempTableName 临时表名称
	* @param manager 数据库操作对象
	* @throws Exception
	*/
	public void deleteTempTable(String tempTableName,BusinessManager manager) throws Exception{
		manager.executeSql("drop table "+tempTableName, new Object[0]);
	}

	/**
	 * 读取excel文件获得HSSFWorkbook对象
	 */
	public void open() throws Exception {
		fis = new FileInputStream(this.file);
		wb = new HSSFWorkbook(new POIFSFileSystem(fis));
		fis.close();
	}
	
	/**
	 * 读取指定sheetNum的rowCount
	 * @param sheetNum
	 * @return int
	 */
	public int getRowCount(int sheetNum) throws Exception  {
		HSSFSheet sheet = wb.getSheetAt(sheetNum);
		int rowCount = -1;
		rowCount = sheet.getLastRowNum();
		return rowCount;
	}
	
	/**
	 * 指定工作表和行的内容
	 * @param sheetNum
	 * @param lineNum
	 * @return String[]
	 */
	public String[] readExcelLine(int sheetNum, int lineNum)  throws Exception {
		if (sheetNum < 0 || lineNum < 0)
			return null;
		String[] strExcelLine = null;
		try {
			sheet = wb.getSheetAt(sheetNum);
			row = sheet.getRow(lineNum);
			int cellCount = 0;
			if (!isBlankRow(row)) {
				cellCount = row.getLastCellNum();// 获得最后一个单元格的索引
			}
			strExcelLine = new String[cellCount + 1];
			for (int i = 0; i < cellCount; i++) {
				strExcelLine[i] = readStringExcelCell(0,lineNum, i);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return strExcelLine;
	}
	
	/**
	 * 指定工作表、行、列下的内容
	 * @param sheetNum
	 * @param rowNum
	 * @param cellNum
	 * @return String
	 */
	public String readStringExcelCell(int sheetNum, int rowNum, int cellNum)  throws Exception {
		if (sheetNum < 0 || rowNum < 0)
			return "";
		String strExcelCell = "";
		try {
			sheet = wb.getSheetAt(sheetNum);
			row = sheet.getRow(rowNum);
			if (row.getCell(cellNum) != null) {
				Cell cell = row.getCell(cellNum);
				Object object = new Object();
				switch (cell.getCellType()) {
					case HSSFCell.CELL_TYPE_FORMULA:// 如果是公式型
						strExcelCell = String.valueOf(cell.getNumericCellValue());
						break;
					case HSSFCell.CELL_TYPE_NUMERIC: // 如果是数字型
						if (DateUtil.isCellDateFormatted(cell)) {
							Date date = cell.getDateCellValue();
							strExcelCell = sf.format(date);
						} else {
							object = Double.valueOf(cell.getNumericCellValue());
							strExcelCell = String.valueOf(object);
						}
						break;
					case HSSFCell.CELL_TYPE_STRING:// 如果是字符串型
						strExcelCell = cell.getStringCellValue();
						break;
					case HSSFCell.CELL_TYPE_BOOLEAN:// 如果是布尔型
						strExcelCell = String.valueOf(cell.getBooleanCellValue());
						break;
					case HSSFCell.CELL_TYPE_BLANK:// 如果是空串
						strExcelCell = "";
						break;
					case HSSFCell.CELL_TYPE_ERROR:// 如果是错误型
						strExcelCell = String.valueOf(cell.getErrorCellValue());
						break;
					default:
						strExcelCell = "";
						break;
				}
			} else {
				strExcelCell = "";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return strExcelCell;
	}
	
	// 判断指定行单元格是否为空
	public boolean isBlankRow(HSSFRow row) throws Exception  {
		if (row == null)
			return true;
		boolean result = true;
		for (int i = row.getFirstCellNum(); i < row.getLastCellNum(); i++) {
			HSSFCell cell = row.getCell(i);
			String value = "";
			if (cell != null) {
				switch (cell.getCellType()) {
					case HSSFCell.CELL_TYPE_STRING:// 如果是字符串型
						value = cell.getStringCellValue();
						break;
					case HSSFCell.CELL_TYPE_NUMERIC:// 如果是数字型
						value = String.valueOf((int) cell.getNumericCellValue());
						break;
					case HSSFCell.CELL_TYPE_BOOLEAN:// 如果是布尔型
						value = String.valueOf(cell.getBooleanCellValue());
						break;
					case HSSFCell.CELL_TYPE_FORMULA:// 如果是公式型
						value = String.valueOf(cell.getCellFormula());
						break;
					case HSSFCell.CELL_TYPE_BLANK:// 如果是空串
						value = "";
						break;
					case HSSFCell.CELL_TYPE_ERROR:// 如果是错误型
						value = String.valueOf(cell.getErrorCellValue());
						break;
					default:// 其他类型
						value = "";
						break;
				}
			}
			if (!value.trim().equals("")) {
				result = false;
				break;
			}
		}
		return result;
	}
	
	/**
	* @Description: 验证日期格式YYYY-MM-DD
	* @author zzm
	* @date 2014-9-12 上午10:06:54 
	* @param sDate
	* @return 正确true,错误false
	 */
	public boolean isValidDate(String sDate) throws Exception {
	     String datePattern1 = "\\d{4}-\\d{2}-\\d{2}";
	     String datePattern2 = "^((\\d{2}(([02468][048])|([13579][26]))"
	             + "[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|"
	             + "(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?"
	             + "((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?("
	             + "(((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?"
	             + "((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))";
	     if ((sDate != null)) {
	         Pattern pattern = Pattern.compile(datePattern1);
	         Matcher match = pattern.matcher(sDate);
	         if (match.matches()) {
	             pattern = Pattern.compile(datePattern2);
	             match = pattern.matcher(sDate);
	             return match.matches();
	         }
	         else {
	             return false;
	         }
	     }
	     return false;
	 }
	 
	/**
	* @Description: 判断是否是有效数字
	* @author zzm
	* @date 2014-9-17 下午7:06:37 
	* @param sNumber
	* @return 正确true,错误false
	* @throws Exception
	 */
	 public boolean isValidNumber(String sNumber) throws Exception{
			try{
				new BigDecimal(sNumber);
				return true;
			}catch (Exception e) {
				return false;
			}
	 }
}
