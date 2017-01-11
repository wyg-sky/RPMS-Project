package com.lion.rpms.common.previewdoc.manager.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.ConnectException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

import com.artofsolving.jodconverter.DocumentConverter;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.connection.SocketOpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.converter.OpenOfficeDocumentConverter;
import com.linuxense.javadbf.DBFReader;
import com.lion.rpms.common.previewdoc.manager.PreviewdocManager;
import com.lion.system.document.manager.DocumentManager;
import com.lion.system.document.model.Document;

public class PreviewdocManagerImpl implements PreviewdocManager {
	
	private DocumentManager documentManager;
	private String imgFormat = "jpg,jpeg,bmp,gif,png";
	private String officeFormat = "doc,docx,xls,xlsx";
	private boolean enableCache = false;
	
	private String covertFilePath = "Cims-Files/rpms/preview/";
	public DocumentManager getDocumentManager() {
		return documentManager;
	}

	public void setDocumentManager(DocumentManager documentManager) {
		this.documentManager = documentManager;
	}
	
	public void deleteFileOrDir(File file){
		if(file.isFile()){
			file.delete();
		}else if(file.isDirectory()){
			File[] files = file.listFiles();
			for(File tmpFile : files){
				tmpFile.delete();
			}
			file.delete();
		}
	}
	
	
	public String documentConverter(String docId){
		Document document = documentManager.get(docId);
		
		File realFile = this.getRealFile(document);
		String extendName = this.getFileExtendNameLower(realFile);
		boolean isPic = this.isPic(extendName);
		String convertFileName =null;
		String displayName = document.getDocDownloadName();
		if(isPic ||extendName.equals("txt")){
			convertFileName = document.getId()+"."+extendName;
		} else if(this.isOfficeDoc(extendName)){
			convertFileName = document.getId()+".htm";
		} else if(extendName.equals("dbf")){
			convertFileName = document.getId()+".htm";
		}
		
		if(convertFileName == null){
			throw new RuntimeException("该文件格式不支持在线预览,请下载查看");
		}
		
		String previewPath = this.getPreviewPath(document, convertFileName);
		File previewFile = this.getPreviewFile(previewPath);
		if(enableCache && previewFile.exists()){  //如果文件
			return "{success:true, fileName:'"+displayName+"',isImg:"+isPic+",docViewPath : '" + previewPath + "'}";
		}
		
	
		if(isPic ||extendName.equals("txt")){
			convertPicOrTxt(realFile,previewFile);
		} else if(this.isOfficeDoc(extendName)){
			String basePath = this.getConvertPath(document.getDocType().getId());
			convertDocToHtml(realFile,previewFile,basePath);
		} else if(extendName.equals("dbf")){
			convertDBF2Htm(realFile,previewFile,displayName);
		}
		
		return "{success:true, fileName:'"+displayName+"',isImg:"+isPic+",docViewPath : '" + previewPath + "'}";
		
	}
	
	/**
	 * 
	 * @description : 转换图片或者txt
	 * @date : 2015年4月7日上午10:56:39
	 * @author : 周强
	 * @param realFile
	 * @param previewFile
	 * @return : void
	 */
	private void convertPicOrTxt(File realFile,File previewFile){
		try {
			FileUtils.copyFile(realFile, previewFile);
		} catch (IOException e) {
			throw new RuntimeException("文件转换失败");
		}
	}
	
	private File getPreviewFile(String previewPath){
		return new File(ServletActionContext.getServletContext().getRealPath(previewPath));
	}
	
	private String  getPreviewPath (Document document ,String convertFileName){
		return this.getConvertPath(document.getDocType().getId())+"/"+convertFileName;
	}
	
	/**
	 * 
	 * @description : 是否为图片
	 * @date : 2015年4月7日上午10:02:57
	 * @author : 周强
	 * @param extendName
	 * @return
	 * @return : boolean
	 */
	private boolean isPic(String extendName){
		return imgFormat.indexOf(extendName) >= 0 ;
	}
	
	private boolean isOfficeDoc(String extendName){
		return officeFormat.indexOf(extendName) >= 0 ;
	}
	
	private String getConvertPath(String docType){
		return covertFilePath+docType;
	}
	
	/**
	 * 
	 * @description : 获取实际保存的文件
	 * @date : 2015年4月7日上午9:59:05
	 * @author : 周强
	 * @param document
	 * @return
	 * @return : File
	 */
	private File getRealFile(Document document){
		String fileName = document.getDocName();
		String filePath = document.getDocPath();
		String fullRelativePath = filePath + "/" + fileName;
		String realPath = ServletActionContext.getServletContext().getRealPath(fullRelativePath);
		File realFile = new File(realPath);
		if(!realFile.exists()){
			throw new RuntimeException("文件不存在或已丢失，请联系系统管理员。");
		}
		return realFile;
	}
	
	/**
	 * 
	 * @description : 获取扩展名
	 * @date : 2015年4月7日上午9:58:55
	 * @author : 周强
	 * @param file
	 * @return
	 * @return : String
	 */
	public String getFileExtendNameLower(File file){
		String fileName = file.getName();
		return fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
	}


	/**
	 * @description 转换DBF文档到htm以实现在线预览
	 * @dependent com.linuxense.javadbf.DBFReader
	 * @author LY
	 * @param outFileRelativePath
	 * @throws IOException 
	 * @date 2014-06-08
	 */
	private void convertDBF2Htm(File fileObject, File outFile, String fileDisplayName) {
		StringBuilder sb = new StringBuilder();
		sb.append("<html><head>\n");
		sb.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n");
		sb.append("<style type=\"text/css\"> \n");
		sb.append("td{ \n");
		sb.append("\tborder-right: 1px solid #C1DAD7; \n");
		sb.append("\tborder-bottom: 1px solid #C1DAD7; \n");
		sb.append("\tbackground: #fff; \n");
		sb.append("\tfont-size:12px; \n");
		sb.append("\tpadding: 6px 6px 6px 12px; \n");
		sb.append("\tcolor: #4f6b72; \n");
		sb.append("}\n");

		sb.append("th { \n");
		sb.append("\tfont: bold 12px \"Trebuchet MS\", Verdana, Arial, Helvetica, sans-serif; \n");
		sb.append("\tcolor: #4f6b72; \n");
		sb.append("\tborder-right: 1px solid #C1DAD7; \n");
		sb.append("\tborder-bottom: 1px solid #C1DAD7; \n");
		sb.append("\tborder-top: 1px solid #C1DAD7; \n");
		sb.append("\tletter-spacing: 2px; \n");
		sb.append("\ttext-transform: uppercase; \n");
		sb.append("\ttext-align: left; \n");
		sb.append("\tpadding: 6px 6px 6px 12px; \n");
		sb.append("\tbackground: #CAE8EA; \n");
		sb.append("} \n");
		sb.append("html>body td{ font-size:12px;} \n");
		sb.append("</style> \n");
		sb.append("<title>DBF预览&nbsp;-&nbsp;").append(fileDisplayName).append("</title>\n");
		sb.append("</head>");
		sb.append("<body>\n");
		
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(fileObject);
			DBFReader dbfReader = new DBFReader(fis);
			int fieldCount = dbfReader.getFieldCount();
			sb.append("<table><tr>").append(fileDisplayName).append("</tr><tr>");
			for (int i = 0; i < fieldCount; i++) {
				sb.append("<th>").append(dbfReader.getField(i).getName()).append("</th>");
			}
			sb.append("</tr>\n");
			Object[] rowObjects = null;
			while ((rowObjects = dbfReader.nextRecord()) != null) {
				sb.append("<tr>");
				for (int i = 0; i < rowObjects.length; i++) {
					if (null != rowObjects[i] && rowObjects[i].getClass().getName().equals((new Date()).getClass().getName())) {
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // "yyyy-MM-dd HH:mm:ss"
						sb.append("<td>").append(sdf.format(rowObjects[i])).append("</td>");
					} else {
						sb.append("<td>").append(rowObjects[i]).append("</td>");
					}
				}
				sb.append("</tr>\n");
			}
			sb.append("</table></body></html>");
			FileUtils.writeByteArrayToFile(outFile, sb.toString().getBytes("UTF-8"));
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("dbf文件转换失败");
		} finally{
			if(fis != null){
				try {
					fis.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}

	public void convertDocToHtml(File inFile, File outFile,String basePath) {
		OpenOfficeConnection con = null;
		try {
			
			File htmlFile = new File(outFile.getPath().replaceAll(".htm", ".html"));
			
			// 创建Openoffice连接
			con = new SocketOpenOfficeConnection(8100);
			// 连接
			con.connect();
			// 创建转换器
			DocumentConverter converter = new OpenOfficeDocumentConverter(con);
			// 转换文档问html
			converter.convert(inFile, htmlFile);
			// 关闭openoffice连接
			con.disconnect();

			// 获取OS编码，进行文件编码转换。
			if ("GBK".equals(System.getProperties().getProperty("sun.jnu.encoding"))) {
				List<String> list = FileUtils.readLines(htmlFile, "GBK");
				list.add("<base href=\""+basePath+"/\"/>");
				FileUtils.writeLines(htmlFile, "UTF-8" ,list);
			} else {
				List<String> list = FileUtils.readLines(htmlFile);
				list.add("<base href=\""+basePath+"/\"/>");
				FileUtils.writeLines(htmlFile, "UTF-8" ,list);
			}

			// 变更文件名，消除与Action后缀冲突的.html
			File jspOutFile = new File(htmlFile.getPath().replaceAll(".html", ".htm"));
			htmlFile.renameTo(jspOutFile);

		} catch (ConnectException e) {
			e.printStackTrace();
			throw new RuntimeException("请在服务器端安装OpenOffice并启用文件转换端口");
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException("Office文件转换失败");
		} finally {
			try {
				if (con != null) {
					con.disconnect();
					con = null;
				}
			} catch (Exception e) {
			} 
		}
	}

	public boolean isEnableCache() {
		return enableCache;
	}

	public void setEnableCache(boolean enableCache) {
		this.enableCache = enableCache;
	}

	public String getImgFormat() {
		return imgFormat;
	}

	public void setImgFormat(String imgFormat) {
		this.imgFormat = imgFormat;
	}

	public String getOfficeFormat() {
		return officeFormat;
	}

	public void setOfficeFormat(String officeFormat) {
		this.officeFormat = officeFormat;
	}
	
}
