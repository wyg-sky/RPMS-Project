 /**
 * @description : 系统全局类
 * @date : 2012-12-21
 * @author : 王绪乐
 */
FrameWork = function(config) {
	Ext.apply(this, config);
};

Ext.extend(FrameWork, Object, {
	projectName : 'CIMS',
	rootUrl : '',//系统访问路径
	devMode : false, //是否开发模式
	loginMode : '1', //登录方式；1：正常登录，登录portal再进系统；2：单个系统登录，直接进入桌面；3：内部系统单点登录；4：单个模块登录；
	runMode : '1',//运行方式；1：桌面模式；2：树形菜单模式；
	tabHeight: 500,
    tabWidth : 600,
    gridHeight: 450,
    topHeight : 111,//顶部logo的高度
    viewHeight : 500,//可视界面高度
    
    userId	: '',//用户id
    userName	: '',//用户姓名
    loginName : '',//用户登录名
    isAdmin : false,//是否是管理员
    
    departmentId : '',//登录用户部门id
    departmentName : '',//登录用户部门名称
    departmentCode : '',//登录用户部门编码
    
    organizationId : '',//登录用户单位id
    organizationName : '',//登录用户单位名称
    organizationCode : '',//登录用户单位编码
    
    moduleId : '',//主模块id
    moduleCode : '',//主模块code
    moduleTitle: '',
    moduleJs: '',
    
    pageSize : 50,//默认分页条数
    
    systemBeginYear : 2010,//系统开始时间
    
    currentTime : '',//服务器时间
    currentDate : '',//服务器日期
    currentMonth : '',//服务器月份
    currentYear : '',//服务器年份
    
    formatMonth : 'Y-m',//默认的月份格式
    formatDate : 'Y-m-d',//默认的日期格式
    formatTime : 'Y-m-d H:i:s',//默认的时间格式
    
	mainPanel : null,
	
	winHeight : 0,//window高度
	winWidth : 0,//window宽度
	
	chatMain : null,//聊天主窗口
	onLineUsers : {},//在线用户
	
	//初始化数据
	init : function() {
		this.rootUrl = globalValue.rootUrl;
		this.userId	= globalValue.userId;
	    this.userName	= globalValue.userName;
	    this.loginName = globalValue.loginName;
    	this.isAdmin = globalValue.isAdmin;
	    
	    this.departmentId = globalValue.departmentId;
	    this.departmentName = globalValue.departmentName;
	    this.departmentCode = globalValue.departmentCode;
	    
	    this.organizationId = globalValue.organizationId;
	    this.organizationName = globalValue.organizationName;
	    this.organizationCode = globalValue.organizationCode;
	    
	    this.moduleId = globalValue.moduleId;
	    this.moduleCode = globalValue.moduleCode;
	    this.moduleTitle= globalValue.moduleTitle;
	    this.moduleJs= globalValue.moduleJs;
	    this.runMode= globalValue.runMode;
	    this.loginIp= globalValue.loginIp;
	    this.loginMode= globalValue.loginMode;
	    
	    this.pageSize = 50;
	    
	    this.currentTime = globalValue.currentTime;
	    this.currentDate = globalValue.currentDate;
	    this.currentMonth = globalValue.currentMonth;
	    this.currentYear = globalValue.currentYear;
	    
	    this.showX = 180;
	    this.showY = 10;
	    
	    this.winWidth = window.innerWidth ? window.innerWidth : (document.body.clientWidth?document.body.clientWidth:document.documentElement.clientWidth);
		this.winHeight = window.innerHeight ? window.innerHeight : (document.body.clientHeight?document.body.clientHeight:document.documentElement.clientHeight);
		if(this.runMode == '2' && this.loginMode != 4) {
			this.topHeight = 111;
		} else {
			this.topHeight = 0;
		}
		
		Ext.devMode = FW.devMode;
		
		isLoginOut = false;
		if(this.loginMode == '2') {
			window.onbeforeunload = function(ev) {
				var isIE = document.all? true : false;
			 	if(isIE) {
					if((window.event.screenX - window.screenLeft) > (document.documentElement.scrollWidth - 50) && window.event.clientY < 0 || window.event.altKey) {
						isLoginOut = true;
						return "您确定要退出系统？";
					}
			 	} else {
			 		if(!isRefresh) {
			 			isLoginOut = true;
						return "您确定要退出系统？";
			 		}
			 	}
			};
		}
		
		window.onunload = function() {
			if(isLoginOut) {
				Ext.Ajax.request({
					url : 'framework/out.html',
					method : 'post',
					async : false
				});
			} else {
				isLoginOut = false;
				isRefresh = false;
			}
		};
		
		isRefresh = false;
		window.onkeydown = function(e) {
			var e=e||event;
			var code=e.keyCode||e.which||e.charCode;
			
			if (code == 116) {
				isRefresh =  true;
			}
			FW.keydown(e);
		};
	},
	
	//加载js文件
	loadJs : function() {
		Ext.lion.ScriptLoader('ext/ext-widgets.js',
			'framework/desktop/scripts/MenuTree.js',
			'framework/menutree/scripts/MenuLeftTree.js',
			'framework/menutree/scripts/MenuPanel.js',
			'framework/menutree/scripts/TopPanel.js',
			//'framework/common/NoticeClickAction.js',
			//'framework/common/NoticeTip.js',
			'framework/common/ChatMain.js',
			'ext/cims/rpms/PlatTree.js',
			'ext/cims/rpms/MultiSelectComboBox.js',
			'framework/common/ChatWin.js',
			'scripts/fusionCharts/FusionCharts.js',
			'scripts/amchart/swfobject.js',
			'scripts/flexpaper/flexpaper_flash.js',
			'scripts/fileupload/file.js',//文件预览
			'ext/cims/rpms/PhotoPanel.js'//人员照片
		);
	},
	
	//加载css文件
	loadCss : function() {
//		Ext.lion.CssLoader(
//			'styles/treegrid.css'
//		);
	},
	
	//显示主界面
	show : function() {
		if(modules && modules.length > 0) {
			if(this.loginMode == '4') {
				this.mainPanel = new Ext.Panel({
					layout : 'form',
			        border : false,
       			 	autoDestroy : true,
			        items : null
				});
				
				var viewport = new Ext.Viewport({
			        layout:'fit',
			        border : false,
			        monitorResize : true,
			        hideBorders : true,
			        items:[this.mainPanel]
			    });
			    
				this.mainPanel.load({url: modules[0].url, scope:this ,scripts:true});
			} else {
				if(this.runMode == '2') {
					this.topPanel = new TopPanel({
						region : "north",
						layout : "fit",
						width : "auto",
						border : false
					});
					
					this.mainPanel = new Ext.Panel({
						region : "center",
						layout : 'form',
				        border : false
					});
					
			    	this.menuPanel = new MenuPanel({
						region : "west",
				        border : true,
						url :'framework/loadModuleChildren.html?info.moduleId=' + FW.moduleId
					});
					
					var container = new Ext.Panel({
				        layout : 'border',
				        border: true,
				        items : [this.topPanel, this.menuPanel, this.mainPanel]
				    });
					
					var viewport = new Ext.Viewport({
				        layout:'fit',
				        border : false,
				        monitorResize : true,
				        hideBorders : true,
				        items:[container]
				    });
				}
			}
			Ext.EventManager.onWindowResize(function(w,h){
				this.winHeight = window.innerHeight ? window.innerHeight : (document.body.clientHeight?document.body.clientHeight:document.documentElement.clientHeight);
				if(this.loginMode == '4') {
					this.viewHeight = this.winHeight;
				} else {
					this.viewHeight = this.winHeight - this.topHeight;
				}
		    }, this);
		    
			if(this.loginMode == '4' || this.runMode == '2') {
				this.mainPanel.on('afterlayout', function() {
		        	var items = this.mainPanel.items.items;
		        	var length = items.length - 1;
		        	var lastPanel = items[length];
		        	this.winHeight = window.innerHeight ? window.innerHeight : (document.body.clientHeight?document.body.clientHeight:document.documentElement.clientHeight);
		        	var winHeight = this.winHeight - this.topHeight;
		            if(lastPanel){
		            	var height = 0;
		            	for (var i = 0; i < length; i++) {
			            	height = height + items[i].getHeight();
		                }
		                
		                height = winHeight - height;
			            lastPanel.setHeight(height);
			            lastPanel.doLayout(false);
		            }
		        },this);
			}
		} else {
			Ext.MessageBox.show({
				title : '提示',
				msg : '没有权限访问系统，请重新登录。',
				buttons : Ext.MessageBox.OK,
				fn : function(){
					isRefresh = true;
    				window.location.href = 'framework/out.html';
				},
				icon : Ext.MessageBox.WARNING
			});
		}
	},
	
	//获取当前活动的window
	getActiveWin : function () {
		return MyDesktop.desktop.getManager().getActive();
	},
	
	//向window中添加panel
	addToWin : function (items) {
		if(this.runMode == '2' || this.loginMode == '4') {
			this.mainPanel.removeAll(true);
			this.mainPanel.add(items);
			
			this.mainPanel.doLayout(false);
			return this.mainPanel;
		}
		
		var win = MyDesktop.desktop.getManager().getActive();
		if(Ext.isArray(items)){
			Ext.each(items, function(c){
                win.items.add(c);
            }, this);
		} else {
			win.items.add(items);
		}
		win.doLayout();
		return win;
	},
	
	sendToModuleByUrl : function(name, url, params) {
		if(this.runMode == '2' || this.loginMode == '4') {
			var rightPanel = FW.mainPanel;
			rightPanel.title = name;
			if(rightPanel.body.first()){
	            var panelId = rightPanel.body.first().id+"Id";
	            if(Ext.getCmp(panelId))
	    		    Ext.getCmp(panelId).destroy();
	    		rightPanel.removeAll(true);
	    	}
	    	rightPanel.load({url: encodeURI(encodeURI(url)), scripts : true});
		} else {
			var module = MyDesktop.getModule('editWindow');
	        if (module) {
	        	module.moduleId = name;
	        	module.moduleName = (name ? name : '');
	        	module.moduleUrl = url;
	        	module.moduleImgUrl = this.getActiveWin().moduleImgUrl;
	        	Ext.apply(module, params);
	            module.createWindow();
	        }
		}
	},
	
	//创建新的window
	createWin : function(name, url, params) {
		var module = MyDesktop.getModule('editWindow');
        if (module) {
        	module.moduleId = this.getActiveWin().moduleName;
        	module.moduleName = this.getActiveWin().moduleName + (name ? name : '');
        	module.moduleUrl = url;
        	module.moduleImgUrl = this.getActiveWin().moduleImgUrl;
        	Ext.apply(module, params);
            module.createWindow();
        }
	},
	
	//window重新布局
	layoutWin : function (shallow) {
		if(this.loginMode == '4' || this.runMode == '2') {
			this.mainPanel.doLayout(shallow);
			return ;
		}
		
		if(MyDesktop) {
			var win = MyDesktop.desktop.getManager().getActive();
			if(win) {
				win.resized = true;
				win.doLayout(shallow);
			}
		}
	},
	
	//根据id加载模块
	loadModuleById : function (moduleId) {
		var leftPanel = this.mainPanel.leftPanel;
		var module = leftPanel.getNodeById(moduleId);
		
		if(module) {
			module.select();
	    	leftPanel.onClick(module);
		}
	},
	
	//根据url加载模块
	loadModuleByUrl : function (url) {
		var rightPanel = this.mainPanel.rightPanel;
		
		if(url) {
			if(rightPanel.body.first()){
	            var panelId = rightPanel.body.first().id+"Id";
	            if(Ext.getCmp(panelId))
	    		    Ext.getCmp(panelId).destroy();
	    		rightPanel.removeAll(true);
	    	}
	    	rightPanel.load({url: encodeURI(encodeURI(url)),scripts:true});
		}
	},
	
	//客户端加载键值对数据方法
	genGlobalCodeValue : function(type){
		if(type) {
	        var arrayData = globalCodeValue[type];
	        if(arrayData != null) {
	            var stringData = Ext.util.JSON.encode(arrayData);
	            stringData = stringData.replace("}","]]");
	            stringData = stringData.replace(/,/g,"],[");
	            stringData = stringData.replace(/:/g,",");
	            stringData = stringData.replace("{","[[\" \",\"请选择...\"],[");
	            return Ext.util.JSON.decode(stringData);
	        }
	        return [];
	    }
	},
	//客户端加载多选键值对数据方法
    genGlobalCodeValueNew : function(type){
        if(type) {
            var arrayData = globalCodeValue[type];
            if(arrayData != null) {
                var stringData = Ext.util.JSON.encode(arrayData);
                stringData = stringData.replace("}","]]");
                stringData = stringData.replace(/,/g,"],[");
                stringData = stringData.replace(/:/g,",");
                stringData = stringData.replace("{","[ [");
                return Ext.util.JSON.decode(stringData);
            }
            return [];
        }
    },
	
	//转换键值CodeValue
	genCodeText : function(type, value){
		if(value) {
			return globalCodeValue[type]&&globalCodeValue[type][value]?globalCodeValue[type][value]:value;
		} else {
			return "";
		}
	},
	
	//转换键值CodeColor
	genCodeColor : function(type, value){
		if(value) {
			return globalCodeColor[type]?globalCodeColor[type][value]:'#000000';
		} else {
			return "";
		}
	},
	
	getCurrentDate : function() {
		return new Date().format('Y-m-d');
	},
	
	getCurrentTime : function() {
		return new Date().format('Y-m-d H:i:s');
	},
	
	convertDate : function(value) {
		if(value) {
			return Date.parseDate(value, 'Y-m-d H:i:s').format('Y-m-d');
		} else {
			return '';
		}
	},
	
	renderRed : function(value, cell, record, rowindex, colIndex, store) {
		cell.attr = "style=color:#ff0000";
		return value;
	},
	
	renderBlue : function(value, cell, record, rowindex, colIndex, store) {
		cell.attr = "style=color:#420cf5";
		return value;
	},
	
	renderGreen : function(value, cell, record, rowindex, colIndex, store) {
		cell.attr = "style=color:#00ff00";
		return value;
	},
	
	//改变用户密码
	changePassword : function(t){
		Ext.lion.ScriptLoader("framework/common/ChgPwWin.js");
		var changePWFormWin = new ChangePWFormWin({id : globalValue.userId});
		changePWFormWin.show();
	},
	
	expandLeftPanel : function() {
		this.menuPanel.collapse();
	},
	
	//显示用户信息
	showUserInfo : function(t){
		Ext.lion.ScriptLoader('system/user/UserManager.js', false);
		var userManager = new Ext.lion.system.UserManager({
			showByMain : false,
			userInfo : true,
			winTitle : '个人信息',
			editable : true,
			viewPath : 'system/user/edit'
		});
		
		userManager.dataLineGrid.getStore().on('beforeload', function() {
			userManager.setQueryCondition(userManager.dataLineGrid, [userManager.dataLineGrid.fkName], ['='], [FW.userId]);
		}, this);
	},
	
	//显示即时通讯窗口
	showChatWin : function(autoShow){
		if(!FW.chatMain) {
			FW.chatMain = new ChatMain();
			FW.chatMain.setPosition(FW.winWidth - 190, 10);
			if(autoShow != false) {
				FW.chatMain.show('chat_id');
			} else {
				FW.chatMain.refreshOnLine();
			}
		} else {
			if(autoShow != false) {
				if(FW.chatMain.hidden) {
					FW.chatMain.show('chat_id');
				} else {
					FW.chatMain.hide();
				}
			}
		}
	},
	
	//显示在线用户列表
	showOnlineUser : function(){
		Ext.lion.ScriptLoader('system/user/UserManager.js', false);
		var userManager = new Ext.lion.system.UserManager({
			showByMain : false,
			listType : 'online',
			winTitle : '在线用户列表',
			winHeight : 450,
			winWidth : 900,
			runMode : '2',
			viewPath : 'system/user/list'
		});
	},
	
	//显示portal
	showPortal:function(){
		isRefresh = true;
		window.location.href = 'framework/portal.html';
	},
//	
//	//显示通知
//	showNotince:function(){
//	
//	},
//	
//	//系统帮助
//	help : function(t){
//	},
//	
	//系统退出
	logOut : function(){
		isRefresh =  true;
//		PL.publish('system_logout', 'userId=' + globalValue.userId + '&userName=' + encodeURI(encodeURI(globalValue.userName))+ '&loginName=' + encodeURI(encodeURI(globalValue.loginName)) + '&loginIp=' + globalValue.loginIp);
		window.location.href = 'framework/out.html?autoLogin=0';
	},
	
	//键盘事件响应
	keydown : function (e){
		if((e.ctrlKey)) {
			switch(e.keyCode)    
			{
				case Ext.EventObject.ONE : this.expandLeftPanel();break;
				case Ext.EventObject.TWO : this.showUserInfo();break;
				case Ext.EventObject.THREE : this.changePassword();break;
				case Ext.EventObject.FOUR : this.shortCutManager();break;
				case Ext.EventObject.FIVE : this.showChatWin();break;
				case Ext.EventObject.SIX : this.systemThemeManager();break;
				case Ext.EventObject.SEVEN : this.fullWindow();break;
				case 192: this.lockWindow();break;
				case Ext.EventObject.Q : this.logOut();break;
			}
		}
	},
	
	openWindow : function (url, name, iWidth, iHeight) {
		var iTop = (window.screen.availHeight-30-iHeight)/2;
		var iLeft = (window.screen.availWidth-10-iWidth)/2;
		window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
	},
	
	fullWindow : function() {
		if(FW.menuPanel.collapsed) {
			if(FW.topPanel.tbarCollapsed) {
//				FW.topPanel.expand();
			}
			FW.menuPanel.expand();
		} else {
			if(!FW.topPanel.tbarCollapsed) {
//				FW.topPanel.collapse();
			}
			FW.menuPanel.collapse();
		}
	},
	
	lockWindow : function() {
		if(Ext.isEmpty(FW.showLockWindow)) {
			FW.showLockWindow = true;
			var loginLabel = new Ext.form.Label({
				columnWidth : 1,
				style : 'margin: 0 0;width:220px;height:40px;border:0;text-align:center;color:#ffffff;font-size:18px',
			    listeners : {
		            'render' : function(field) {
						field.getEl().dom.innerHTML = "&nbsp;&nbsp;&nbsp;" + FW.userName + "&nbsp;已锁定&nbsp;";
					},
					scope : this
			    }
			});
			
			var loginPassword = new Ext.form.TextField({
				id : 'loginPassword_id',
				inputType : 'password',
				style : 'width:180px;height:26px;line-height:30px;vertical-align: middle;',
			    listeners:{
			    	'afterrender' : function() {
			    		loginPassword.focus();
			    	},
					'specialkey' : function(field,e){   
			    		if (e.getKey()==Ext.EventObject.ENTER){ 
							FW.unLockWindow(field.getValue());
			    		}
					},
					scope : this
				}
			});
			
			var loginButton = new Ext.form.TextField({
				inputType : 'image',
		        style : 'width:26px;height:30px;vertical-align: middle;padding-left:5px',
			    listeners : {
		            'render' : function(field) {
						field.getEl().dom.src = FW.rootUrl + 'framework/desktop/images/login_botton.gif';
					},
					'focus' : function(field) {
						field.onBlur();
						FW.unLockWindow(loginPassword.getValue());
					},
					scope : this
			    }
			});
			
			var loginChangeUser = new Ext.Button({
				text : '切换用户',
				anchor : '50%',
				width : 110,
				height : 25,
				style : 'margin-top: 25px;margin-left: 40px;',
	            handler : function() {
	            	window.location.href = FW.rootUrl + 'login.jsp';
	            }
			});
			
			var loginPanel = new Ext.Container({
				renderTo: 'desktop-body-login',
				style : 'margin: 320px auto;width:220px;height:200px;border:0;',
		        layout: 'column',
		        items: [loginLabel, loginPassword, loginButton, loginChangeUser]
			});
		}
		
		Ext.Ajax.request({
			url : 'framework/lockWindow.html',
			method : 'post',
			scope : this,
			success : function(response,options) {
	            var desktop = document.getElementById("desktop-body");
	            var password = document.getElementById("loginPassword_id");
	            password.value = '';
	            window.setTimeout("document.getElementById('loginPassword_id').focus()", 1000);
				desktop.style.display = "block";
				if(FW.runMode == '1') {
					desktopClock.setPosition(FW.winWidth/2 - 85, 168, 20000);
				}
			},
			failure : function() {
				Ext.MessageBox.show({
					title : '提示',
					msg : '锁定用户失败 !',
					width : 180,
					icon : Ext.MessageBox.INFO,
					buttons : Ext.MessageBox.OK
				});
			}
		});
	},

	unLockWindow : function(password) {
		if(Ext.isEmpty(password)) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '密码不能为空 !<br>',
				width : 180,
				icon : Ext.MessageBox.INFO,
				buttons : Ext.MessageBox.OK,
				fn : function() {
	  				window.setTimeout("document.getElementById('loginPassword_id').focus()", 500);
				}
			});
			return;
		}
		
		Ext.Ajax.request({
			url : 'framework/unLockWindow.html',
			method : 'post',
			params : {
				"user.loginName" : FW.loginName,
				"user.password" : password,
				"info.moduleId" : FW.moduleId,
				"info.moduleTitle" : FW.moduleTitle,
				"info.moduleJs" : FW.moduleJs,
				"info.loginMode" : FW.loginMode,
				"info.runMode" : FW.runMode
			},
			scope : this,
			success : function(response,options) {
				var json = Ext.util.JSON.decode(response.responseText || "{}");
				if (json.success) {
					var desktop = document.getElementById("desktop-body");
					desktop.style.display = "none";
					if(FW.runMode == '1') {
						desktopClock.setPosition(win_width/2 - 100, win_height/2 - 100, 20000);
					}
				} else {
					Ext.MessageBox.show({
						title : '提示',
						msg : '密码错误，解锁失败 !',
						width : 220,
						icon : Ext.MessageBox.INFO,
						buttons : Ext.MessageBox.OK,
						fn : function() {
	          				window.setTimeout("document.getElementById('loginPassword_id').focus()", 500);
						}
					});
				}
	            
			},
			failure : function() {
				Ext.MessageBox.show({
					title : '提示',
					msg : '解锁失败 !',
					width : 180,
					icon : Ext.MessageBox.INFO,
					buttons : Ext.MessageBox.OK,
					fn : function() {
		  				window.setTimeout("document.getElementById('loginPassword_id').focus()", 500);
					}
				});
			}
		});
	},

	shortCutManager : function() {
	    Ext.lion.ScriptLoader('framework/common/ShortCutCustomWindow.js',false);
		var shortCutCustomWindow = new ShortCutCustomWindow({
			userId : FW.userId,
			userName : FW.userName,
			systemId : FW.moduleId
		});
		
		shortCutCustomWindow.show();
	},

	systemThemeManager : function() {
	    Ext.lion.ScriptLoader('framework/common/SystemThemeWindow.js',false);
		var systemThemeWindow = new SystemThemeWindow({
			userId : FW.userId,
			userName : FW.userName
		});
		
		systemThemeWindow.show();
	}
});

var FW = new FrameWork();
//界面生成入口函数
Ext.onReady(function(){
	Ext.QuickTips.init();
	FW.init();
	FW.loadJs();
	FW.loadCss();
	FW.show();
	FW.topPanel.collapse();
});
