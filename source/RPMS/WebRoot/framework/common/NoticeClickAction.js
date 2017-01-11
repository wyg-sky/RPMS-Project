	/**
	 * 消息提醒处理方法
	 */
	 //设备油脂化验提醒
	function noticeOfEquiOiltest() {
		Ext.lion.ScriptLoader('system/notice/usernotice/UserNoticeManager.js', false);
		new Ext.lion.system.UserNoticeManager({
			showByMain : false,
			winHeight : 450,
			winWidth : 680,
			viewPath : 'system/notice/usernotice/list'
		});
	}
	
	//设备油脂化验提醒
	function noticeOfEquiAppraisal() {
		Ext.lion.ScriptLoader('system/notice/usernotice/UserNoticeManager.js', false);
		new Ext.lion.system.UserNoticeManager({
			showByMain : false,
			winHeight : 450,
			winWidth : 680,
			viewPath : 'system/notice/usernotice/list'
		});
	}
	
	//设备油脂化验提醒
	function noticeOfEquiLubricate() {
		Ext.lion.ScriptLoader('system/notice/usernotice/UserNoticeManager.js', false);
		new Ext.lion.system.UserNoticeManager({
			showByMain : false,
			winHeight : 450,
			winWidth : 680,
			viewPath : 'system/notice/usernotice/list'
		});
	}
