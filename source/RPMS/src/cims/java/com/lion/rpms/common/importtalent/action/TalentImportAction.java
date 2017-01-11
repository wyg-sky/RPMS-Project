package com.lion.rpms.common.importtalent.action;

import java.io.File;
import java.io.IOException;

import com.lion.rpms.common.importtalent.manager.TalentImportManager;
import com.lion.system.common.action.BusinessAction;

public class TalentImportAction extends BusinessAction{
	private TalentImportManager manager;
	private File importFile;
	public TalentImportAction(TalentImportManager manager) {
		this.manager = manager;
	}
	
	public void importTalent() throws IOException{
		try {
			this.print(this.manager.importTalent());
		} catch (Exception e) {
			System.out.println(e.getMessage());
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
			e.printStackTrace();
		}
	}
	
	public void importSysUser() throws IOException{
		try {
			String result = this.manager.importSysUser();
			this.print(result);
		} catch (Exception e) {
			this.print("{success:false,msg:'"+e.getMessage()+"'}");
			e.printStackTrace();
		}
	}

	public File getImportFile() {
		return importFile;
	}

	public void setImportFile(File importFile) {
		this.importFile = importFile;
	}
	
}
