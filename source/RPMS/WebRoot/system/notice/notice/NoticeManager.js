 /**
 * @description : 消息管理
 * @date : 2013-04-01
 * @author : 周亚京
 */
Ext.lion.system.NoticeManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.system.NoticeManager.superclass.constructor.call(this);
	
	this.on('beforeedit',this.beforeEdit,this)
};

Ext.extend(Ext.lion.system.NoticeManager, Ext.lion.LionBusinessManager, {
	beforeEdit : function() {
		var records = this.dataGrid.getSelections(true);
		var status = records[0].get(this.dataGrid.getFieldName('status'));
		if(status == '0002'){
			Ext.MessageBox.alert("提示","已发送的消息不能再次编辑！");
			return false;
		}
		return true;
	},
	
	viewCondition : function() {
		var records = this.dataGrid.getSelections(true);
		var status = records[0].get(this.dataGrid.getFieldName('status'));
		if(status != '0002'){
			Ext.MessageBox.alert("提示","未发送和已撤销的消息不能查看阅读情况！");
			return;
		}
		this.noticeId = records[0].get(this.dataGrid.getFieldName('id'));
		this.showWin({title : '阅读情况'},'system/notice/usernotice/viewlist');
	}
});