MyDesktop = new Ext.app.App({
	init :function(){
		Ext.QuickTips.init();
	},

	getModules : function(){
		return [
			new MyDesktop.SimpleWindow(),
			new MyDesktop.EditWindow()
		];
	},

    // config for the start menu
    getStartConfig : function(){
        return {
            title: '<span onclick="javascript:FW.showOnlineUser()">欢迎您：' + FW.userName + '</span>',
            iconCls: 'user',
            toolItems: [{
                text:'刷新系统',
                iconCls:'refresh',
                handler: function() {
                	isRefresh =  true;
                	window.location.reload();
                },
                scope:this
            },'-',{
                text:'显示桌面',
                iconCls:'showdesktop',
                handler: function() {
                	this.desktop.getManager().hideAll();
                },
                scope:this
            },'-',{
                text:'个人信息',
                iconCls:'personinfo',
                handler: FW.showUserInfo,
                scope:this
            },'-',{
                text:'修改密码',
                iconCls:'modifypassword',
                handler: FW.changePassword,
                scope:this
            },'-',{
                text:'锁定屏幕',
                iconCls:'lockwindow',
                handler: FW.lockWindow,
                scope:this
            },'-',{
                text:'系统设置',
                iconCls:'settings',
                menu: {
                	items : [{
		                text:'快捷方式',
		                iconCls:'shortcut',
		                handler: FW.shortCutManager,
		                scope:this
		            }, {
		                text:'系统风格',
		                iconCls:'systemstyle',
		                handler: FW.systemThemeManager,
		                scope:this
		            }
                ]}
            },'-',{
                text:'退出系统',
                iconCls:'logout',
                handler: function() {
                	FW.logOut();
                },
                scope:this
            }]
        };
    }
});
	
/*
 * 通用 window
 */
MyDesktop.SimpleWindow = Ext.extend(Ext.app.Module, {
    id:'mainWindow',
    init : function(){
        this.launcher = {
            text: '管理窗口',
            iconCls:'icon-module1',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var winId = 'mainWindow_'+this.moduleId;
        var win = desktop.getWindow(winId);
        if(!win){
//			if(FW.showX < 800) {
//				FW.showX = FW.showX + 25;
//				FW.showY = FW.showY + 25;
//			} else {
//				FW.showX = 180;
//				FW.showY = -10;
//			}
			
            win = desktop.createWindow({
                id : winId,
                title : this.moduleName,
                width : this.winWidth,
                height : this.winHeight,
                plain : true,
//                draggable : false,
                animCollapse : true,
                constrainHeader : true,
                iconCls : this.moduleImgUrl? null : 'icon-module1',
                moduleImgUrl : this.moduleImgUrl,
                items : null,
                layout: 'form',
	            tools:[{
		            id:'refresh',
		            qtip: '刷新',
		            scope : this,
		            handler : function(e, t, p, tc) {
		            	win.removeAll(true);
		            	win.resized = true;
		                win.load({url: win.moduleUrl + '?nodeName=' + win.moduleName, scope:this,scripts:true});
		            	win.doLayout();
		            }
		        }]
            });
            
            if (!win.maximized) {
            	win.setPagePosition(FW.showX, FW.showY);
            }
            
            win.moduleId = this.moduleId;
            win.moduleUrl = this.moduleUrl;
			win.moduleName = this.moduleName;
			win.resized = true;
			win.itemHeight = [];
			
            tabHeight = win.getHeight()-30;
	    	tabWidth = win.getWidth()-15;
	   		gridHeight = win.getHeight()-40;

	   		win.on('show', function() {
	        	if(win.items.items.length == 0) {
	        		win.load({url: this.moduleUrl, async : false, scope:this,scripts:true});
	        	}
	        	
	        	if(this.moduleImgUrl) {
	        		var hdspan = win.header.child('span.' + win.headerTextCls);
	                if (hdspan) {
	                    Ext.DomHelper.insertBefore(hdspan.dom, {
	                        tag:'img', alt: this.moduleName, title : this.moduleName, src: FW.rootUrl + this.moduleImgUrl, cls:'x-panel-inline-icon '
	                    });
	                }
	                this.moduleImgUrl = null;
	        	}
	        	
	        	var items = win.items.items;
	        	var length = items.length - 1;
	        	var panel = items[length];
	            if(panel){
	            	var height = 0;
	            	for (var i = 0; i < length; i++) {
		            	height = height + items[i].getHeight();
	                }
	                height = win.getHeight() - height - 30;
	                if(win.maximized) {
	                	height = height + 8;
	                }
		            panel.setHeight(height);
		            panel.doLayout(false);
	            }
	        },this);
	        
	        win.on('move', function() {
	        	if(win.getPosition()[1] <= 5) {
	        		win.maximize();
	        	}
	        },this);
	        
	        win.on('afterlayout', function() {
	        	var items = win.items.items;
	        	var length = items.length - 1;
	        	var panel = items[length];
	            if(panel){
	                if(win.resized) {
	                	var height = 0;
	                	if(win.itemHeight.length == 0) {
			            	for (var i = 0; i < length; i++) {
				            	win.itemHeight[i] = items[i].getHeight();
				            	height = height + win.itemHeight[i];
			                }
	                	} else {
	                		for (var i = 0; i < length; i++) {
	                			if(!items[i].hidden) {
				            		items[i].setHeight(win.itemHeight[i]);
				            		height = height + win.itemHeight[i];
	                			}
			                }
	                	}
	                	
		                height = win.getHeight() - height - 30;
		                
	                	if(win.maximized) {
		                	height = height + 8;
		                }
	                	
	                	panel.setHeight(height);
	                	panel.doLayout(false);
	                	win.resized = false;
	                }
	            }
	        },this);
	        
	        win.on('resize', function() {
	        	win.resized = true;
	        },this);
	        
        } else {
        	this.moduleImgUrl = null;
        }
        
        if(win.minimized || win.hidden){
            if(this.winTarget) {
	        	win.show(this.winTarget);
	        } else {
	        	win.show();
	        }
        } else if(win == win.manager.getActive()){
            win.minimize();
        } else {
            win.toFront();
        }
    }
});

MyDesktop.EditWindow = Ext.extend(Ext.app.Module, {
    id:'editWindow',
    init : function(){
        this.launcher = {
            text: '编辑窗口',
            iconCls:'icon-module1',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var winId = 'editWindow' + this.moduleId;
        var win = desktop.getWindow(winId);
        if(!win){
//			if(FW.showX < 800) {
//				FW.showX = FW.showX + 25;
//				FW.showY = FW.showY + 25;
//			} else {
//				FW.showX = 180;
//				FW.showY = -10;
//			}
			
            win = desktop.createWindow({
                id : winId,
                title : this.moduleName,
                width : this.winWidth,
                height : this.winHeight,
                plain : true,
                animCollapse : true,
                constrainHeader : true,
                iconCls : this.moduleImgUrl? null : 'icon-module1',
                moduleImgUrl : this.moduleImgUrl,
                items : null,
                layout: 'form',
	            tools:[{
		            id:'refresh',
		            qtip: '刷新',
		            scope : this,
		            handler : function(e, t, p, tc) {
		            	win.removeAll(true);
		            	win.resized = true;
		                win.load({url: win.moduleUrl, scope:this,scripts:true});
		            	win.doLayout();
		            }
		        }]
            });
            
            if (!win.maximized) {
            	win.setPagePosition(FW.showX, FW.showY);
            }
            
            win.moduleId = this.moduleId;
            win.moduleUrl = this.moduleUrl;
			win.moduleName = this.moduleName;
			win.resized = true;
			win.itemHeight = [];
			
            tabHeight = win.getHeight()-30;
	    	tabWidth = win.getWidth()-15;
	   		gridHeight = win.getHeight()-40;
	   		
	        win.on('show', function() {
	        	if(win.items.items.length == 0) {// + '?nodeName=' + this.moduleName
	        		win.load({url: this.moduleUrl, async : false, scope:this,scripts:true});
	        	}
	        	
	        	if(this.moduleImgUrl) {
	        		var hdspan = win.header.child('span.' + win.headerTextCls);
	                if (hdspan) {
	                    Ext.DomHelper.insertBefore(hdspan.dom, {
	                        tag:'img', alt: this.moduleName, title : this.moduleName, src: FW.rootUrl + this.moduleImgUrl, cls:'x-panel-inline-icon '
	                    });
	                }
	                this.moduleImgUrl = null;
	        	}
	        	
	        	var items = win.items.items;
	        	var length = items.length - 1;
	        	var panel = items[length];
	            if(panel){
	            	var height = 0;
	            	for (var i = 0; i < length; i++) {
		            	height = height + items[i].getHeight();
	                }
	                height = win.getHeight() - height - 30;
	                if(win.maximized) {
	                	height = height + 8;
	                }
		            panel.setHeight(height);
		            panel.doLayout(false);
	            }
	        },this);
	        
	        win.on('move', function() {
	        	if(win.getPosition()[1] <= 5) {
	        		win.maximize();
	        	}
	        },this);
	        
	        win.on('afterlayout', function() {
	        	var items = win.items.items;
	        	var length = items.length - 1;
	        	var panel = items[length];
	            if(panel){
	                if(win.resized) {
	                	var height = 0;
	                	if(win.itemHeight.length == 0) {
			            	for (var i = 0; i < length; i++) {
				            	win.itemHeight[i] = items[i].getHeight();
				            	height = height + win.itemHeight[i];
			                }
	                	} else {
	                		for (var i = 0; i < length; i++) {
	                			if(!items[i].hidden) {
				            		items[i].setHeight(win.itemHeight[i]);
				            		height = height + win.itemHeight[i];
	                			}
			                }
	                	}
	                	
		                height = win.getHeight() - height - 30;
		                
	                	if(win.maximized) {
		                	height = height + 8;
		                }
	                	
	                	panel.setHeight(height);
	                	panel.doLayout(false);
	                	win.resized = false;
	                }
	            }
	        },this);
	        
	        win.on('resize', function() {
	        	win.resized = true;
	        },this);
	        
        } else {
        	this.moduleImgUrl = null;
        }
        
        if(!win.hidden) {
        	win.hide();
        } else {
	        if(this.winTarget) {
	        	win.show(this.winTarget);
	        } else {
	        	win.show();
	        }
        }
    }
});

Ext.onReady(function(){
	var menuTree = new MenuTree({
		renderTo : 'menu-tree',
		url :'framework/loadModuleChildren.html?info.moduleId=' + FW.moduleId
	});
});

//界面初始化
var obj, objTimerLeft, objTimerRight, leftOrRight = 0, firstStatus = 0;
var win_width_show = 2000;
var win_width_hide = 0;
var win_width = 0, win_height = 0;
var desktopClock;

function init() {
	try {
		win_width = window.innerWidth ? window.innerWidth : document.body.clientWidth;
		win_height = window.innerHeight ? window.innerHeight : document.body.clientHeight;
		win_width_show = win_width - 50;
		win_width_hide = win_width - 180;
		obj = document.getElementById("menu-right");
		showClock();
		if(FW.devMode) {
			firstStatus = 1;
			showMenu();
		}
	} catch(e){}
}

//时钟
function showClock() {
//	desktopClock = new ygClock(win_width - 138, win_height-170, 
	desktopClock = new ygClock(win_width/2 - 100, win_height/2 - 100, 
	"framework/desktop/images/clock/clock.png","framework/desktop/images/clock/clock_mask.png", 
	"framework/desktop/images/clock/hourhand.png","framework/desktop/images/clock/minhand.png",
	"framework/desktop/images/clock/sechand.png",-7,-7);
};

function showRightMenu(e) {
	try {
		if(e.clientX > win_width_show) {
			showMenu();                  //设置定时器
		} else {
			if(e.clientX < win_width_hide) {
				hideMenu();
			}
    	}
	} catch(e){}
}

function showMenu() {
	try {
		if(leftOrRight == 0) {
			leftOrRight = 1;
			objTimerLeft = window.setInterval(moveDivLeft, 60);                  //设置定时器
		}
	} catch(e){}
}

function hideMenu() {
	try {
		if(leftOrRight == 0) {
			leftOrRight = -1;
			objTimerRight = window.setInterval(moveDivRight, 60);                  //设置定时器
		}
	} catch(e){}
}

function moveDivLeft() {
   	try {
		if (parseInt(obj.style.right,10) >= 0) {
			if(firstStatus == 0) {
				leftOrRight = 0;
			} else {
				leftOrRight = 1;
				firstStatus = 0;
			}
       		window.clearInterval(objTimerLeft);
 		} else {
 			var divRight = parseInt(obj.style.right,10);//获取X坐标
 			obj.style.right = (divRight + 30)+"px";//调整div的X坐标
 		}
   	} catch(e){}
}

function moveDivRight() {
   	try {
		if (parseInt(obj.style.right,10) <= -180) {
			leftOrRight = 0;
       		window.clearInterval(objTimerRight);
 		} else {
 			var divRight = parseInt(obj.style.right,10);//获取X坐标
 			obj.style.right = (divRight - 30)+"px";//调整div的X坐标
 		}
   	} catch(e){}
}
