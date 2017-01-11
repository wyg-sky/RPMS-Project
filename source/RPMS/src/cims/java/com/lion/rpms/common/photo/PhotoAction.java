package com.lion.rpms.common.photo;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;

public class PhotoAction extends ActionSupport{
	
	private ByteArrayInputStream inputStream;  
    
	public ByteArrayInputStream getInputStream() {  
	    return inputStream;  
	}  
	public void setInputStream(ByteArrayInputStream inputStream) {  
	    this.inputStream = inputStream;  
	}  

	public String showPhoto() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		String path = request.getParameter("path");
		String realPath = ServletActionContext.getServletContext().getRealPath(path);
		
		ByteArrayOutputStream bos = new ByteArrayOutputStream();  
	    InputStream input = new BufferedInputStream(new FileInputStream(realPath));  
		try {  
	       
	        byte[] bt = new byte[1024];  
	        while (input.read(bt) > 0) {  
	            bos.write(bt);  
	        }  
	        this.inputStream = new ByteArrayInputStream(bos.toByteArray());
	    } catch (Exception e) {  
	        // TODO Auto-generated catch block  
	        e.printStackTrace();  
	    }  finally{
	    	 bos.close();  
		     input.close();
	    }
		
		return SUCCESS;
		
	}
}
