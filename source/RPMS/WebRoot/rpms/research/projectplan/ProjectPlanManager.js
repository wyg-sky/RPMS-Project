/**
 * @description ：项目规划Action类
 * @date ：2015-03-09
 * @author ：王圣磊
 */

Ext.lion.rpms.ProjectPlanManager = function(config) {
    Ext.apply(this,config);
    Ext.lion.rpms.ProjectPlanManager.superclass.constructor.call(this);
};

Ext.extend(Ext.lion.rpms.ProjectPlanManager, Ext.lion.LionBusinessManager, {
    bussinessInit : function() {
        this.on({
            'showedit' : {
                fn : function(){
                    this.beforChangePlanYear('edit');
                },
                scope: this
            },
            'showview' : {
                fn : function(){
                    this.beforChangePlanYear('view');
                },
                scope: this
            },
            'beforeedit' : {
                fn : function() {
                    var records = this.dataGrid.getSelections(true);
                    for (var i = 0; i < records.length; i++) {
                        var valid = records[0].get(this.dataGrid
                                .getFieldName('valid'));
                        if (valid != '1') {
                            Ext.MessageBox.alert("提示",
                                    " 只有“有效”的数据才可以修改！");
                            return false;
                        }
                    }
                },
                scope : this
            },
            'beforedelete' : {
                fn : function() {
                    var records = this.dataGrid.getSelections(true);
                    for (var i = 0; i < records.length; i++) {
                        var valid = records[0].get(this.dataGrid
                                .getFieldName('valid'));
                        if (valid != '0') {
                            Ext.MessageBox.alert("提示",
                                    " 只有“无效”的数据才可以删除！");
                            return false;
                        }
                    }
                },
                scope : this
            }
        });
        
         //双击弹出查看信息
        this.dataGrid.on('celldblclick', function() {
            this.viewObject();
        }, this);
        
         // 点击左侧平台树节点时方法   
        this.listPlatTree.items.items[0].on('click',this.onPlatTreeClick, this);
        
    },//bussinessInit-function-END
    
     /*
      *单击左侧平台树方法 
      */
    onPlatTreeClick : function(node, e) {
        this.clearQuery(this.queryForm, this.dataGrid, false);
        var params = {
                platId  : node.id
        };
        Ext.apply(this.dataGrid.store.baseParams,params);
        this.dataGrid.store.reload();
    },
    
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
    
    /*
     * 更改规划计划年月时间之前的方法
     * (当用户点击查看或者编辑时，获取3个参数：
     *                  1.planTypeValue :规划计划类型，
     *                  2.planYearValue : 规划计划年月时间,
     *                  3.optionType : 查看or编辑)
     * */
    beforChangePlanYear : function(optionType){
            var records = this.dataGrid.getSelections(true);
            var planTypeValue = records[0].get(this.dataGrid.getFieldName('planType'));
            var planYearValue = records[0].get(this.dataGrid.getFieldName('planYear'));
            this.editForm.on("load",function(e){
                this.changePlanYear(planYearValue,planTypeValue,optionType);
            },this);
    },
    /*
     * 更改规划计划年月时间
     * (当用户点击查看或者编辑时，获取3个参数：                  
     *                  1.planYearValue : 规划计划年月时间,
     *                  2.planTypeValue : 规划计划类型，
     *                  3.optionType : 查看or编辑or改变选项状态change)
     * */
    changePlanYear : function (planYearValue,planTypeValue,optionType){
        LableAsterisk = "<font color='red'>*</font>";
        yearLabelString = "规划计划年度:";
        yearMonthLabelString = "规划计划年月:";
        LableString = "";
        //var planYearMonth= this.editForm.findField('planYearMonth');
        var planYear= this.editForm.findField('planYear');
        if(planTypeValue == '0004'){//月度总结计划
                /*planYear.reset();
                planYear.allowBlank = true;
                planYear.hide();
                planYearMonth.show( );*/
            planYear.format = 'Y-m';
            planYear.blankText = '请选择规划计划年月'
            planYear.emptyText = '请选择规划计划年月';
            if(optionType == 'change'){
                LableString += LableAsterisk;
                planYear.reset();
            }else{
                if(optionType == 'view'){
                    planYear.disabled = true;
                }else{//edit
                    LableString += LableAsterisk;
                }
                planYear.setValue(planYearValue);
            }
            LableString += yearMonthLabelString;
            Ext.DomQuery.selectNode('label[for=planYearOrYearMonthLable]').innerHTML = LableString;
           }else{
                  /* planYearMonth.reset();
                   planYearMonth.allowBlank = true;
                   planYearMonth.hide();
                   planYear.show( );*/
                planYear.format = 'Y'
                planYear.blankText = '请选择规划计划年度';
                planYear.emptyText = '请选择规划计划年度';
                if(optionType == 'change'){
                    LableString += LableAsterisk;
                    planYear.reset();
                }else{
                    if(optionType == 'view'){
                        planYear.disabled = true;
                    }else{//edit
                        LableString += LableAsterisk;
                    }
                    planYear.setValue(planYearValue);
                }
               LableString += yearLabelString;
               Ext.DomQuery.selectNode('label[for=planYearOrYearMonthLable]').innerHTML = LableString;
           }
    }
});
