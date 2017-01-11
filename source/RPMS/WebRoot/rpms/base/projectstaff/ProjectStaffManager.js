/**
 * @description : 人员职责管理
 * @date : 2015-03-10 13:09:38
 * @author : 曹鹏程
 */

Ext.lion.rpms.ProjectStaffManager = function(config) {
    Ext.apply(this,config);
    Ext.lion.rpms.ProjectStaffManager.superclass.constructor.call(this);
    this.dataGrid.on('cellclick', function(grid, rowIndex, columnIndex, e) {
        var record = this.dataGrid.getSelectionModel().getSelected();
        var id = record.get(this.dataGrid.getFieldName('id'));
        var name = record.get(this.dataGrid.getFieldName('staffName'));
        this.staffId = id;
        this.staffName= name;
        var fieldName = grid.getDataIndex(columnIndex);
        if(fieldName == grid.getFieldName('setUserId')){
            this.setUserId(id);//人员设置
        }else if(fieldName == grid.getFieldName('setPlatId')){
            this.setPlatId(id,name);//平台设置
        }
    }, this);
    
    this.myMask = new Ext.LoadMask(Ext.getBody(), {
        msg: '请稍等，数据处理中......',
        removeMask: true 
    });
};

Ext.extend(Ext.lion.rpms.ProjectStaffManager, Ext.lion.LionBusinessManager, {
    bussinessInit : function() {
        this.on({
            'showedit' : {
                fn : Ext.emptyFn,
                scope: this
            }
        });
    },
    
    /**
     * 设置人员信息
     * staffId:岗位id
     */
    setUserId : function(staffId){
        this.setUserWin = this.showWin({title:'人员设置'}, 'rpms/base/projectstaff/setUser');
        var params = {
            hql  : " and obj.staffId='"+staffId+"'"
        };
        Ext.apply(this.userIddata.store.baseParams,params);
        this.setUserWin.resizer.enabled = false;//设置窗口大小不可拉伸
    },
    
    /**
     * 人员设置
     * 新增按钮
     */
    addUserIds : function(){
        var selectWin = new Ext.lion.LionSelectWindow({
            viewPathOfUi : 'rpms/base/projectstaff/userList',
            height : 550,
            width : 800,
            title : '人员选择'
        });
        selectWin.on('after_comfirm_click', function(records) {
            var RecordType = this.userIddata.getRecordType();
            var str = "";
            var str2 = "";
            for(var i = 0; i< records.length; i++) {
                var bool = false;
                var recordstemp = this.userIddata.getStore().getRange();
                for(var k = 0; k < recordstemp.length; k++){
                    var str1 = "";
                    var str4 = "";
                    if(recordstemp[k].get('userId.code') == records[i].get('code')){
                        bool = true;
                        str1 = recordstemp[k].get('userId.code');
                        str += str1 + ',';
                    }
                }
                if(!bool ){
                    var r = new RecordType({
                        'staffId' : this.staffId,
                        'userId.id' : records[i].get('id'),
                        'userId.userName' : records[i].get('userName'),
                        'userId.code' : records[i].get('code'),
                        'userId.loginName' : records[i].get('loginName'),
                        'userId.department.name' : records[i].get('department.name')
                    });
                    this.userIddata.store.add(r);
                    
                }
            }
            if(str.length>1){
                str = str.substring(0,str.length-1);
                var st = "工号为‘ "+str+" ’已经存在不能再重复添加!";
                Ext.MessageBox.alert("提示",st);
            }
        }, this);
    },
    
    /**
     * 人员设置
     * 保存按钮
     */
    saveUserIds : function(){
        var paramsOne = [];
        var records = this.userIddata.getStore().getRange();
        if(this.userIddata) {//保存子表信息
            var records = this.userIddata.getStore().getRange();
            for(var i=0;i<records.length;i++){
                    paramsOne.push(records[i].data);
            }
        }
        var params = Ext.lion.LionParamsConvert(paramsOne, "staffUserList");
        this.setUserWin.close();
        this.myMask.show();
        Ext.Ajax.request({
            url : 'rpms/saveStaffUsers.html?staffId='+this.staffId,
            method : 'post',
            params : params,
            scope : this,
            success : function(response,options) {
            	    this.myMask.hide();
                    var json = Ext.util.JSON.decode(response.responseText || "{}");
                    if(json.success==false){
                        Ext.MessageBox.alert("提示", json.msg);
                    }else{
                        this.dataGrid.store.load(); 
                        Ext.MessageBox.alert("提示", "保存成功！");
                    }
            },
            failure : function() {
            	this.myMask.hide();
                Ext.MessageBox.show({
                    title : '失败',
                    msg : '保存失败 !<br>',
                    buttons : Ext.MessageBox.OK,
                    fn : function(){},
                    icon : Ext.MessageBox.ERROR,
                    scope : this
                });
            }
        });
    },
    
    /**
     * 人员设置
     * 删除按钮
     */
    deleteUserIds: function(){
        var records = this.userIddata.getSelectionModel().getSelections();
        if(records.length==0){
            Ext.MessageBox.alert("提示", "请先选择数据！");
            return;
        }
        var ids ='';
        var flag = false;
        for(var i=0;i<records.length;i++){
            if(records[i].get('id') ==null || records[i].get('id') ==''){
                this.userIddata.store.remove(records[i]);
                flag =true;
            }else{
                ids += records[i].get('id')+",";
                this.userIddata.store.remove(records[i]);
            }
        }
        
        if(ids.length>0){
            ids = ids.substring(0,ids.length-1);
            Ext.Ajax.request({
                url : 'rpms/deleteStaffUser.html',
                method : 'post',
                params : {ids : ids},
                scope : this,
                async : false,
                success : function(response,options) {
                        flag=true;
                },
                failure : function() {
                    Ext.MessageBox.show({
                        title : '失败',
                        msg : '删除失败 !<br>',
                        buttons : Ext.MessageBox.OK,
                        fn : function(){},
                        icon : Ext.MessageBox.ERROR,
                        scope : this
                    });
                }
            });
        }
        if(flag){
            Ext.MessageBox.alert("提示", "删除成功！");
        }   
    },
    
    /**
     * 人员设置
     * 关闭按钮
     */
    closeClickSetUser : function(){
        this.setUserWin.close();
    },
    
    /**
    * 平台设置
    * 功能设置
    */
    setPlatId : function(staffId,staffName){
        this.platWin = this.showWin({title:'平台设置'}, 'rpms/base/projectstaff/platlist');
        this.platWin.resizer.enabled = false;//设置窗口大小不可拉伸
        
        this.platTree.items.items[0].on('load',function(node){
            node.expand();
            node.cascade(function(child) {
                var subjectId = child.attributes.id;
                if(this.isOrNotExistSubject(subjectId)){
//                	this.platTree.items.items[0].checkModel='multiple';
                	child.attributes.checked = true;
                    child.getUI().toggleCheck(true);
                }else{
                	node.expand();
                }
//                this.platTree.items.items[0].checkModel='cascadeChildren';
            },this);
        }, this);
        if(this.platTree && this.platTree.items && this.platTree.items.items[0]) {
            var params = {
                hql  : " and obj.staffId.id='"+staffId+"'"
        };
        Ext.apply(this.platTemp.store.baseParams,params);
            
        this.platTemp.store.load({
            callback : function(){
                this.platTree.items.items[0].root.expand(true, true);
            },
            scope : this
        });
        this.platTree.items.items[0].on('checkchange',this.checkchangeMethodPlat, this);
        }
    },
    
    /**
     * 判断平台是否已经在列表中存在
     * @param {} id
     * @return {Boolean}
     */
    isOrNotExistSubject : function(id){
        var records = this.platTemp.getStore().getRange();
        for(var i=0;i<records.length;i++){
            var platId = records[i].get("platId.id");
            if(id==platId){
                return true;
            }
        }
        return false;
    },
    
    /**
     * 平台设置
     * 创新平台选择树
     * 点击复选框时
     */
    checkchangeMethodPlat : function(node, checked){
//        node.expand();
//        node.attributes.checked = checked;
        this.getcheckedPlat(node, checked);
//        node.cascade(function(child) {
//            this.getcheckedPlat(child, checked);
//        },this);
    },
    
    /**
     * 平台设置
     * 创新平台选择树
     * 得到勾选数据或者取消勾选的数据,联动到右侧列表中（创新平台）
     */
    getcheckedPlat : function(node,checked){
        var id = node.id;
        var text = node.text;
        if('root' == node.id){
            return;
        }
        var RecordType = this.platTemp.getRecordType();
        var r = new RecordType({
            'id' : null,
            'staffId.id' : this.staffId,
            'staffId.staffName' : this.staffName,
            'platId.id' : id ,
            'platId.platName' : text
        });
        
        if(checked){
            var bln = true;
            var records = this.platTemp.getStore().getRange();
            for(var i=0;i<records.length;i++){
                var platId = records[i].get("platId.id");
                if(id==platId){
                    bln = false;
                }
            }
            if(bln){
                this.platTemp.store.add(r);
            }
        }else{
            var records = this.platTemp.getStore().getRange();
            for(var i=0;i<records.length;i++){
                var platId = records[i].get("platId.id");
                if(id==platId){
                    this.platTemp.store.remove(records[i]);
                }
            }
        }
    },
    
    /**
     * 平台设置
     * 保存按钮
     */
    saveStaffPlats : function(){
        var paramsOne = [];
        var records = this.platTemp.getStore().getRange();
        for(var i=0;i<records.length;i++){
            paramsOne.push(records[i].data);
        }
        var params = Ext.lion.LionParamsConvert(paramsOne, "staffPlatList");
        this.myMask.show();
        this.platWin.close();
        Ext.Ajax.request({
            url : 'rpms/saveStaffPlats.html?staffId='+this.staffId,
            method : 'post',
            params : params,
            scope : this,
            success : function(response,options) {
            	    this.myMask.hide();
                    this.dataGrid.store.load(); 
                    Ext.MessageBox.alert("提示", "保存成功！");
            },
            failure : function() {
            	this.myMask.hide();
                Ext.MessageBox.show({
                    title : '失败',
                    msg : '保存失败 !<br>',
                    buttons : Ext.MessageBox.OK,
                    fn : function(){},
                    icon : Ext.MessageBox.ERROR,
                    scope : this
                });
            }
        });
    },
    
    /**
     * 平台设置
     * 关闭按钮
     */
    closeClickPlat : function(){
        this.platWin.close();
    }
    
});
