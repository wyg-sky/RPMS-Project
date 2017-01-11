/**
 * @description : 专利申请管理
 * @date : 2015-03-10 13:19:19
 * @author : 周强
 */
Ext.lion.rpms.PatentApplicationManager = function(config) {
	Ext.apply(this,config);
	Ext.lion.rpms.PatentApplicationManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.PatentApplicationManager, Ext.lion.LionBusinessManager, {
	bussinessInit : function() {
		this.on({
		'showedit' : {
			fn : Ext.emptyFn,
			scope: this
		},
		'beforeedit' : {
			fn : function() {
				var roleCode = "false";
				Ext.Ajax.request({
					url : 'rpms/isAllRole.html',
					params : { 
						loginame : FW.userId
					},
					async : false,
					scope : this,
					success : function(response){
						var json = Ext.util.JSON.decode(response.responseText || "{}");
						roleCode = json.code;
					}});
				var t = roleCode.indexOf('PATENT');//判断字符串中是否包含某字符
				if(!(t >= 0)){
					var records = this.dataGrid.getSelections(true);
					for (var i = 0; i < records.length; i++) {
						var status = records[0].get(this.dataGrid.getFieldName('status'));
						if (status == '0002' || status ==  '0003' || status ==  '0006' || status ==  '0005') {
							Ext.MessageBox.alert("提示",
									" 状态为“已上报或审批通过”的记录不允许编辑!");
							return false;
						}
					}
				}
			},
			scope : this
		}
		});
		//this.listPlatTree.items.items[0].on('click',this.onPlatTreeClick, this);
	},
	
	/*
	 * 点击平台树
	 */
	/*onPlatTreeClick : function(node, e) {
		if(node.parentNode.parentNode ===null){  //如果为分中心
			this.queryForm.findField("platCenter.id").setValue({value:node.id,text:node.text});
			this.queryForm.findField("platInstitution.id").clearValue();
		} else {
			this.queryForm.findField("platCenter.id").setValue({value:node.parentNode.id,text:node.parentNode.text});
			this.queryForm.findField("platInstitution.id").setValue({value:node.id,text:node.text});
		}
		this.query();
	},*/
	
	changeStatus:function(property,value,tip){
		var selected = this.dataGrid.getSelections(true);
		var length = selected.length;
		if(!selected || length == 0){
			return;
		}
		if(value ==='0002'){  //上报
			for(index =0;index < length; index++){
				var status = selected[index].get('status');
				if(status > '0002' &&  status!='0004'){
					Ext.Msg.alert("提示","数据已上报,无法重上报");
					return;
				}
			}
		} else if(value ==='0003'){  //审批
			for(index =0;index < length; index++){
				var status = selected[index].get('status');
				if(status === '0004'){
					Ext.Msg.alert("提示","打回的数据无法审批");
					return;
				}
				
				if(status > '0003' &&  status!='0004'){
					Ext.Msg.alert("提示","数据已审批,不能重复审批");
					return;
				}
			}
		}else if(value ==='0004'){  //打回
			for(index =0;index < length; index++){
				var status = selected[index].get('status');
				if(status > '0003' && status!=="0004"){
					Ext.Msg.alert("提示","已批准的数据无法打回");
					return;
				}
			}
		}else if(value ==='0007'){  //批准
			for(index =0;index < length; index++){
				var status = selected[index].get('status');
				if(status === '0004'){
					Ext.Msg.alert("提示","打回的数据无法审批");
					return;
				}
				
				if(status!='0003'){
					Ext.Msg.alert("提示","只能批准审批通过的数据!");
					return;
				}
			}
		}
		
		Ext.lion.rpms.PatentApplicationManager.superclass.changeStatus.call(this,property,value,tip);
	},

	/**
	 * 显示受理form
	 */
	acceptShow:function(){
		this.actionMode = "2";
		this.editable = true;
		var selected = this.dataGrid.getSelections(true);
		
		if(!selected || selected.length == 0){
			return;
		}
		if(selected[0].get("status")!=="0007"){
			Ext.Msg.alert("提示","只能受理已批准的项目");
			return;
		}
		var mainId = selected[0].get(this.dataGrid.getFieldName("id"));
		if(selected && selected.length > 0){
			this.showWin({title:'受理'},"rpms/patent/patentapplication/acceptedit");
			this.accepteditForm.loadFormData({
				id : mainId
			});
		};
	},
	/**
	 * 受理操作
	 */
	accept:function(){
		var statusField = this.accepteditForm.findField("status");
		  //0005已受理
		//statusField.setValue("0005");
		
		if(this.accepteditForm.getForm().isValid()){
			this.accepteditForm.on("aftersave", function () {
				this.manager.dataGrid.getStore().reload();
				this.findParentByType("window").close();
			});
			this.accepteditForm.save();
		};	
	},
	
	/**
	 * 授权form
	 */
	accreditShow:function(){
		this.actionMode = "2";
		this.editable = true;
		var selected = this.dataGrid.getSelections(true);
		if(!selected || selected.length == 0){
			return;
		}
		if(selected[0].get("status")==="0006"){
			Ext.Msg.alert("提示","该专利已被授权，如需修改授权信息，请到专利管理模块");
			return;
		}
		
		if(selected[0].get("status")!=="0005"){
			Ext.Msg.alert("提示","该专利未被受理，请先受理");
			return;
		}
		
		var mainId = selected[0].get(this.dataGrid.getFieldName("id"));
		this.mainId = mainId;
		if(selected && selected.length > 0){
			this.showWin({title:'授权'},"rpms/patent/patentapplication/accredit");
			this.accreditForm.loadFormData({
				id : mainId
			});
			//加载子表中的数据
			if (this.lineGrids && this.lineGrids.length > 0) {
					var _;
					for (var D = 0; D < this.lineGrids.length; D++) {
						_ = this.lineGrids[D];
						if (_ && _.getStore().autoLoad)
							this.setQueryCondition(_, [_.fkName], ["="], [mainId])
					}
			}
		};
	},
	/**
	 * 授权
	 */
	accredit:function(){
		var statusField = this.accreditForm.findField("status");
			statusField.setValue("0006");//0006  已授权
		if(this.accreditForm.getForm().isValid()){
			Ext.Msg.confirm("提示","授权成功后，专利授权信息将被添加到专利管理中，如需修改专利授权信息请到专利管理模块中<br>",
				function(btn){
					if(btn==="yes"){
						this.accreditForm.on("aftersave", function () {
							this.manager.dataGrid.getStore().reload();
							this.findParentByType("window").close();
						});
						//保存提交
						this.accreditForm.save(this.getLineGrids());
					}
			},this);
			
		} else {
			console.log("请输入完整数据");
			return;
		}
	},
	
	getLineGrids:function(){
		/**
		 * 以下代码拷贝自Ext.lion.LionBusinessManager saveObject 提交子表数据
		 */
		var D = {};
			if (this.lineGrids && this.lineGrids.length > 0) {
				var _;
				for (var B = 0; B < this.lineGrids.length; B++) {
					_ = this.lineGrids[B];
					var E = _.getStore().getRange();
					if (E.length > 0 && !_.isValid()) {
						Ext.MessageBox.show({
							title : "提示",
							msg : "子表数据输入不完整！<br>",
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.WARNING,
							scope : this
						});
						return
					}
					var C = [];
					for (var F = 0; F < E.length; F++) {
						if (this.accreditForm.runMode == "3") {
							E[F].set(_.getFieldName("id"), null);
							E[F].set(_.getFieldName(_.fkName), null)
						}
						C.push(E[F].data)
					}
					var A = _.lineName;
					if (_.autoMain != false)
						A = this.objectName + "." + A;
					Ext.apply(D, Ext.lion.LionParamsConvert(C, A))
				}
		}
		return D;
	},
	
	/**
	* 新增子表的方法
	*/
	addLineObject:function(){

		var selectWin = new Ext.lion.LionSelectWindow({
			width : 900,
			height : 550,
			viewPathOfUi : 'rpms/base/researchtalent/list',
			title : '人员选择'
		});
		
		selectWin.on('after_comfirm_click', function(records) {
			var RecordType = this.dataLineGrid.getRecordType();
			var str = ""; //记录重复添加的人员
			for(var i = 0; i< records.length; i++) {
				var bool = false;
				var recordstemp = this.dataLineGrid.getStore().getRange();
				for(var k = 0; k < recordstemp.length; k++){
					var str1 = "";
					if(recordstemp[k].get('talentId.id') == records[i].get('id')){
						bool = true;
						str1 = recordstemp[k].get('talentId.talentName');
						str += str1 + ',';
					}
				}
				if(!bool){
					var r = new RecordType({
						'mainId' : this.mainId,
						'talentId.id' : records[i].get('id'),
						'talentId.talentName' : records[i].get('talentName'),
						'talentId.position' : records[i].get('position'),
						'talentId.grade' : records[i].get('grade'),
						'talentId.title' : records[i].get('title'),
						'talentId.discipline' : records[i].get('discipline')
					});
					this.dataLineGrid.store.add(r);
				}
			}
			if(str.length>1){
				str = str.substring(0,str.length-1);
				var st = "姓名为‘ "+str+" ’已经存在不能再重复添加!";
				Ext.MessageBox.show({
					title : '提示',
					msg : st+'<br>',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.INFO,
					scope : this
				});
			}
				
		}, this);
	
	}
	
});
