PhotoPanel = function(config) {
    Ext.apply(this, config);
    if (!this.uploadImagePath || this.uploadImagePath == "") this.uploadImagePath = "../../../Cims-Files/images/uploadImage/";
    
    this.PhotoView = new Ext.BoxComponent({
            autoEl : {
                tag : 'div',
                autoScroll: true,
                html: this.value == "" ? '暂无图片' : ("<img style='width:160px;height:180px'  src='base/showPhoto.html?path=" + this.value + "'/>")
            }
        });
        
        this.photoPath = new Ext.form.TextField({
        	  fieldLabel : "人才照片路径",
              hidden : true,
              name: this.name,
              value : this.value
        });
        
        this.photoButton = new Ext.Button({  
             text : '上传照片',
             iconCls: "upload-icon",
             handler : this.uploadImage,
             scope : this
        });  
        
        PhotoPanel.superclass.constructor.call(this,{
            width : this.width,
            height : this.height,
            bodyBorder : false,
            border : false,
            //frame:true,
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            buttonAlign : "center",
            items:[this.PhotoView,this.photoPath],
            buttons:[this.photoButton]
        });  
};

Ext.extend(PhotoPanel,Ext.Panel,{
    
    uploadImage : function(){
        var photoWindow = new LionUpLoadImageWindow({
            PhotoPanel : this,
            photoPath : this.photoPath,
            upLoadImageField: this.PhotoView,
            imageRealPath: this.value,
            uploadImagePath: this.uploadImagePath
        });
        photoWindow.show();
    },
    getValue:function(){
        return typeof this.value != "undefined" ? this.value : "";
    },
    setValue:function(imagePath){  
        if (imagePath) {
            this.value = imagePath;
        } else {
            this.value = "";
        }
    }
});

LionUpLoadImageWindow = function(config) {
    Ext.apply(this, config);
    if (!this.flag) this.flag = false;
    if (!this.imageRealPath) this.imageRealPath = "";
    if (!this.uploadImagePath || this.uploadImagePath == "") this.uploadImagePath = "../../../Cims-Files/images/uploadImage/";
    this.fileObject = new Ext.form.TextField({
        fieldLabel: "选择图片",
        name: "fileObject",
        inputType: "file"
    });
    var upLoadButton = new Ext.Button({
        text: "上传",
        iconCls: "upload-icon",
        width: 60,
        handler: this.upLoad,
        scope: this
    });
    this.imageView = new Ext.Panel({
        fieldLabel: "图片预览",
        width: 260,
        height: 200,
        autoScroll: true,
        name: "imageView",
        html: this.imageRealPath == "" ? "" : ("<img src='base/showPhoto.html?path=" + this.imageRealPath + "' width='240'/>")
    });
    this.upLoadImageForm = new Ext.FormPanel({
        fileUpload: true,
        bodyStyle: "padding:5px 5px 5px 5px",
        labelWidth: 70,
        labelAlign: "right",
        defaults: {
            border: false,
            layout: "column",
            labelAlign: "right"
        },
        items: [{
            defaults: {
                border: false,
                layout: "form",
                columnWidth: 0.9,
                labelAlign: "right"
            },
            items: [{
                columnWidth: 0.8,
                items: [this.fileObject]
            }, {
                columnWidth: 0.2,
                items: [upLoadButton]
            }]
        },
        this.imageView]
    });
    LionUpLoadImageWindow.superclass.constructor.call(this, {
        title: "上传图片",
        height: 300,
        width: 370,
        closable: true,
        autoScroll: false,
        constrain: true,
        resizable: false,
        closeAction: "close",
        modal: true,
        typeOfWin: "attachments",
        items: [this.upLoadImageForm],
        buttonAlign: "center",
        buttons: [{
            text: "完成",
            iconCls: "save-icon",
            width: 60,
            handler: this.complete,
            scope: this
        }, {
            text: "关闭",
            iconCls: "close-icon",
            width: 60,
            handler: this.closeWin,
            scope: this
        }]
    })
};
Ext.extend(LionUpLoadImageWindow, Ext.Window, {
    closeWin: function() {
        this.upLoadImageForm.getForm().reset();
        this.close()
    },
    upLoad: function() {
        this.upLoadImageForm.form.submit({
            url: "system/upLoadImage.html",
            method: "post",
            waitTitle: "请稍等",
            waitMsg: "上传图片中.....",
            params: {
                fileName: this.fileObject.getValue(),
                uploadImagePath: this.uploadImagePath
            },
            scope: this,
            success: function(form, action) {
                var json = Ext.util.JSON.decode(action.response.responseText || "{}");
                this.imageRealPath = json.imageRealPath;
                this.imageView.body.update("<img src='base/showPhoto.html?path=" + json.imageRealPath + "' width='240'/>");
                this.flag = true;
            },
            failure: function(form, action) {
                Ext.MessageBox.show({
                    title: "提示",
                    msg: "上传图片失败！",
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING,
                    scope: this
                })
            }
        })
    },
    complete: function() {
        if(this.flag){
           if (this.imageRealPath && this.imageRealPath != "") {
                if (this.upLoadImageField){
                	this.upLoadImageField.autoEl.html = "<img style='width:160px;height:180px' src='base/showPhoto.html?path="+this.imageRealPath+"'/>";
                    this.upLoadImageField.el.dom.innerHTML = "<img style='width:160px;height:180px' src='base/showPhoto.html?path="+this.imageRealPath+"'/>";
                    this.PhotoPanel.setValue(this.imageRealPath);
                    this.photoPath.setValue(this.imageRealPath);
                }
                this.close();
            } else Ext.MessageBox.show({
                title: "提示",
                msg: "尚未上传图片，无法完成！",
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING,
                scope: this
            })
        }else{
           Ext.MessageBox.show({
                title: "提示",
                msg: "尚未上传图片，请点击上传！",
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.QUESTION,
                scope: this
            })
        }
    }
});
Ext.reg('photopanel', PhotoPanel);