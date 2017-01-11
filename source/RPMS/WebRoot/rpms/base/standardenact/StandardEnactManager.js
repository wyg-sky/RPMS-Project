/**
 * @description : 标准制定管理
 * @date : 2015-03-13 11:06:28
 * @author : WangYG
 */

Ext.lion.rpms.StandardEnactManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.StandardEnactManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.StandardEnactManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
		'showedit' : {
			fn : Ext.emptyFn,
			scope: this
		}
		});
		
		this.dataGrid.on('celldblclick', function() {
			this.viewObject();
		}, this);
	},
	/**
	 * @description : 将选中的记录插入到标准库中
	 * @author : WangYG
	 * @date : 2015-03-15下午19:15:26
	 */
	 insertStandar : function() {
			var records = this.dataGrid.getSelections(true);
			var ids = "";
			if(records && records.length > 0) {
				for(var i = 0; i < records.length ; i++) {
					var isIssue =  records[i].get('isIssue');
					var standardNum =  records[i].get('standardNum');
					var standardName =  records[i].get('standardName');
					var valid =  records[i].get('valid');
					if(valid == '0'){
						Ext.MessageBox.alert("提示","状态为无效的记录，不允许加入标准库！");
					    return false; 
					} else  if(isIssue == '0001') {
						Ext.MessageBox.alert("提示","颁布状态相同，无需修改！");
						return false; 
					} else if(standardNum==null || standardNum == undefined || standardNum.trim() == '' || standardNum.length<=0){
						Ext.MessageBox.show({
                                    title : '提示信息',
                                    msg :  "标准名称为“"+standardName+"”的标准,"+"其“颁布编号”为空，不允许加入标准库！",
                                    buttons : Ext.MessageBox.OK,
                                    icon : Ext.MessageBox.WARNING,
                                    scope : this
                                });
                        return false; 
					}else{
						ids += records[i].get('id') + ',';
					}
				}
				ids = ids.substring(0, ids.length- 1);
				var msg = '条';
				if(records.length > 1) {
					msg = '<font color="red"> ' + records.length + ' </font>' + msg;
				}
				Ext.MessageBox.minWidth = 230;
				Ext.MessageBox.confirm("提示",
					"插入标准库之前请先确认好标准信息的完整性与正确性.<br>"
					+"插入标准库之后，[颁布状态为：是] 的记录不允许操作.<br>"
					+"请到“标准管理”进行操作！<br><br><br>"
							+ "<b>确定要将这" + msg + "记录“颁布并加入标准库”吗？</b>", function(ret) {
				if(ret == "yes"){
					Ext.Ajax.request({
						url : 'rpms/insertStandar.html',
						params : {
							ids : ids
						},
						scope : this,
						waitTitle : '请稍候',
						waitMsg : '设置中...',
						success:function(response){
							var json = Ext.util.JSON.decode(response.responseText || "{}");	
	                        if(json.success == true) {
								Ext.MessageBox.show({
									title : '成功',
									//msg : '插入标准库成功！<br>',
									msg : json.msg,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.INFO,
									scope : this
								});
	                        } else{
	                        	Ext.MessageBox.show({
									title : '提示信息',
									msg :  '颁布并添加到标准库失败！<br>',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.WARNING,
									scope : this
								});
	                        }
							this.dataGrid.store.load();
						},
						failure : function(response,options) {
							Ext.MessageBox.show({
								title : '失败',
								msg : '加入标准库失败！<br>',
								buttons : Ext.MessageBox.OK,
								fn : function(){},
								icon : Ext.MessageBox.ERROR,
								scope : this
							});
						}
					});//Ajax request end
				  }
				},this);//MessageBox.confirm end
			}//if(records.length>0) end
		}
});
