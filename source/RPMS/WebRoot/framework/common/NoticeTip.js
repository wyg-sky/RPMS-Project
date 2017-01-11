	/**
	 * 消息提醒
	 */
	PL._init();
	PL.setDebug(false);
	var noticeTypeCode = globalDataPower.noticeTypeCode;
	var listenSubjects = '/pushlet/ping,system_online,system_logout,system_chat,system_notice,';
	for(var code in noticeTypeCode) {
		listenSubjects = listenSubjects + noticeTypeCode[code].code + ',';
	}
	listenSubjects = listenSubjects.substring(0, listenSubjects.length - 1);
	PL.joinListen(listenSubjects, 'userId=' + globalValue.userId);
	PL.sessionId = globalValue.userId;
	
	var last_time;
//	PL.publish('system_online', 'userId=' + globalValue.userId + '&userName=' + encodeURI(encodeURI(globalValue.userName))+ '&loginName=' + encodeURI(encodeURI(globalValue.loginName)) + '&loginIp=' + globalValue.loginIp);
	
	function onData(event) {
		if(event.getSubject() != '/pushlet/ping') {
			if(event.getSubject() == 'system_online') {
				systemOnline(event);
			} else {
				if(event.getSubject() == 'system_logout') {
					systemLogout(event);
				} else {
					if(event.getSubject() == 'system_chat') {
						systemChat(event);
					} else {
						if(event.getSubject() == 'system_notice') {
							systemNotice(event);
						} else {
							if(globalDataPower.noticeTypeCode[event.getSubject()]['point']) {
								eval(globalDataPower.noticeTypeCode[event.getSubject()]['point'] + ".call(window, event)");
							}
						}
					}
				}
			}
		}
	}
	
	function onRefreshAck(event) {
		if(last_time && (event.get('p_time')- last_time) > 20) {
			PL.publish('/pushlet/ping', 'userId=' + globalValue.userId);
		}
		last_time = event.get('p_time');
	}
	
	function noticeAction(id, type) {
		if(msgWin && !msgWin.hidden) {
			msgWin.hide();
		}
		if(globalDataPower.noticeTypeCode[type]['point']) {
			Ext.Ajax.request({
				url : 'system/changeUserNoticeStatus.html',
				method : 'post',
				params : {
					ids : id,
					property : "viewOrNot",
					value : "0002"
				},
				scope : this,
				success : function(response,options) {
					var json = Ext.util.JSON.decode(response.responseText || "{}");
					var msg = json.msg || '<br>';
				},
				failure : function() {
					var json = Ext.util.JSON.decode(response.responseText || "{}");
				    var msg = json.msg || '<br>';
					Ext.MessageBox.show({
						title : '提示',
						msg : '设置失败！' + msg,
						buttons : Ext.MessageBox.OK,
						fn : function(){},
						icon : Ext.MessageBox.ERROR,
						scope : this
					});
				}
			});
			eval(globalDataPower.noticeTypeCode[type]['point'] + ".call(window)");
		}
	}
	
	var divTop,divLeft,divWidth,divHeight,docHeight,docWidth,objTimer,i = 0,topHeight,liveTime = 5000;//关于位置的相关变量
	var msgWin = null;
	
	function createMsgWin(params) {
		if(!msgWin) {
			var winParams = {
				id : 'shortMessage',
				el : 'shortMessageDiv',
			    title : '消息提醒',
				iconCls : 'icon-notice',
				constrain : true,
			    width: 250,
		        height: 180,
		        closeAction : 'hide',
		        html:"<embed src='" + FW.rootUrl + "images/sound/msg.wav' width='0px' height='0px' loop='0' autostart='true' hidden='true'></embed>"
			};
			Ext.apply(winParams, params);
			msgWin = new Ext.Window(winParams);
			msgWin.show();
			if (self.innerHeight) {
		        docWidth = self.innerWidth;
		        docHeight = self.innerHeight;
		    } else if (document.documentElement && document.documentElement.clientHeight) {
		        docWidth = document.documentElement.clientWidth;
		        docHeight = document.documentElement.clientHeight;
		    } else if (document.body) {
		        docWidth = document.body.clientWidth;
		        docHeight = document.body.clientHeight;
		    }
			msgWin.setPagePosition(docWidth-msgWin.width-3,docHeight);
			msgWin.hide();
		}
	}
	
	function showMsgWin(content) {
		if(!msgWin) {
			msgWin = new Ext.Window({
				id : 'shortMessage',
				el : 'shortMessageDiv',
			    title : '消息提醒',
				iconCls : 'icon-notice',
			    width: 250,
		        height: 180,
		        closeAction : 'hide'
		    });
			msgWin.show();
			
			msgWin.setPagePosition(docWidth-msgWin.width -3, docHeight);
			viewMsg(true);
		} else {
			if(msgWin.hidden) {
				msgWin.setPagePosition(docWidth-msgWin.width -3, docHeight);
				msgWin.body.update("<embed src='" + FW.rootUrl + "images/sound/msg.wav' width='0px' height='0px' loop='0' autostart='true' hidden='true'></embed>" + (content?content:''));
				viewMsg(true);
				msgWin.show();
			} else {
				viewMsg(false);
				msgWin.setPagePosition(docWidth-msgWin.width -3, topHeight - 5);
				msgWin.body.update((content?content:''));
			}
		}
	}
	
	function hideMsg() {
		if(msgWin) {
			msgWin.hide();
			clearTimeout();
		}
	}
	
	function viewMsg(isMove) {
		try {
			divTop = parseInt(document.getElementById("shortMessageDiv").style.top,10)     //div的x坐标
		    divLeft = parseInt(document.getElementById("shortMessageDiv").style.left,10)   //div的y坐标
		    divHeight = parseInt(document.getElementById("shortMessageDiv").offsetHeight,10)//div的高度
		    divWidth = parseInt(document.getElementById("shortMessageDiv").offsetWidth,10)   //div的宽度
		    if(FW.runMode == "1") {
				topHeight = parseInt((docHeight - divHeight - 27),10);
			} else {
				topHeight = parseInt((docHeight - divHeight + 2),10);
			}
			if(isMove) {
				objTimer = window.setInterval(moveDiv,7)                  //设置定时器
			}
		} catch(e){}
	}
	
	function moveDiv() {
	   	try {
			if (parseInt(document.getElementById("shortMessageDiv").style.top,10) <= topHeight) {
	       		window.clearInterval(objTimer);
	       		if(liveTime > 0) {
	       			setTimeout(hideMsg, liveTime);
	       		}
     		}
     		divTop = parseInt(document.getElementById("shortMessageDiv").style.top,10)//获取y坐标
	    	document.getElementById("shortMessageDiv").style.top = (divTop - 4)+"px"//调整div的Y坐标
	   	} catch(e){}
	}
	
	function systemOnline(event) {
		FW.onLineUsers[event.get('userId')] = {
			userId : event.get('userId'),
			userName : decodeURI(decodeURI(event.get('userName'))),
			loginName : decodeURI(decodeURI(event.get('loginName'))),
			loginIp : event.get('loginIp')
		};
		
		if(event.get('userId') != globalValue.userId) {
			if(FW.chatMain) {
				FW.chatMain.refreshOnLine();
			}
			
			if(msgWin) {
				msgWin.setTitle("<font color='red'>" + decodeURI(decodeURI(event.get('userName'))) + "</font>上线提醒");
				msgWin.setWidth(200);
				msgWin.setHeight(130);
			} else {
				createMsgWin({
					title : "<font color='red'>" + decodeURI(decodeURI(event.get('userName'))) + "</font>上线提醒",
					width : 200,
					height : 130
				});
			}
			
			liveTime = 5000;
			showMsgWin("<center><font size='3' color='blue'>姓名：" + decodeURI(decodeURI(event.get('userName'))) + "<br/>用户名：" + decodeURI(decodeURI(event.get('loginName'))) + "<br/>登录IP：" + event.get('loginIp') + "<br/>上线了...</font></center>");
		}
	}
	
	function systemChat(event) {
		if(event.get('userId') != globalValue.userId) {
			if(!FW.chatMain) {
				FW.showChatWin();
			}
			
			var activeWin = FW.chatMain.windows.getActive();
			if(activeWin && activeWin.getId() == event.get('userId')) {
				activeWin.showMsg(decodeURI(decodeURI(event.get('userName'))), decodeURI(decodeURI(event.get('message'))));
			} else {
				if(msgWin) {
					msgWin.setTitle("来自<font color='red'>" + decodeURI(decodeURI(event.get('userName'))) + "</font>的消息");
					msgWin.setWidth(200);
					msgWin.setHeight(130);
				} else {
					createMsgWin({
						title : "来自<font color='red'>" + decodeURI(decodeURI(event.get('userName'))) + "</font>的消息",
						width : 200,
						height : 130
					});
				}
				liveTime = 0;
				showMsgWin("<center><font size='3' color='blue'><a href='javascript:hideMsg();FW.chatMain.showChatWin({id:\"" + event.get('userId') + "\", text: \"" + decodeURI(decodeURI(event.get('userName'))) + "\"}, \"" + decodeURI(decodeURI(event.get('message'))) + "\");'>" + decodeURI(decodeURI(event.get('message'))) + "<br/></font></center></a>");
			}
		}
	}
	
	function systemLogout(event) {
		if(FW.chatMain) {
			FW.chatMain.refreshOnLine();
		}
		
		if(event.get('userId') != globalValue.userId) {
			if(msgWin) {
				msgWin.setTitle("<font color='red'>" + decodeURI(decodeURI(event.get('userName'))) + "</font>上线提醒");
				msgWin.setWidth(200);
				msgWin.setHeight(130);
			} else {
				createMsgWin({
					title : "<font color='red'>" + decodeURI(decodeURI(event.get('userName'))) + "</font>上线提醒",
					width : 200,
					height : 130
				});
			}
			liveTime = 5000;
			showMsgWin("<center><font size='3' color='blue'>姓名：" + decodeURI(decodeURI(event.get('userName'))) + "<br/>用户名：" + decodeURI(decodeURI(event.get('loginName'))) + "<br/>登录IP：" + event.get('loginIp') + "<br/>下线了...</font></center>");
		}
	}
	
	function systemNotice(event) {
		var notice = eval(decodeURI(decodeURI(event.get('message'))));
		var content = "", title= "",style="notice-tip-border";
		if(notice && notice.length > 0) {
			if(notice.length == 1) {
				title = notice[0].title;
				content = "<div class='notice-tip' onclick=\"javascript:noticeAction('" + notice[0].id + "','" + notice[0].type + "')\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + notice[0].content + "</div>";
			} else {
				title = "您有" + notice.length + "条新消息";
				for(var i = 0; i < notice.length; i ++) {
					if(notice[i].userId == globalValue.userId) {
						if(i == notice.length -1) {
							style="notice-tip";
						}
						content = content + "<div class='" + style + "' onclick=\"javascript:noticeAction('" + notice[0].id + "','" + notice[i].type + 
									"')\"><span class='notice-tip-title'>(" + (i + 1) + ")" + notice[i].title + 
									"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + notice[i].content + "</div>";
					}
				}
			}
			
			liveTime = 0;
			var winHeight = 90 + notice.length * 40;
			if(msgWin) {
				msgWin.setTitle("<font color='red'>" + title + "</font>");
				msgWin.setWidth(200);
				msgWin.setHeight(winHeight);
			} else {
				createMsgWin({
					title : "<font color='red'>" + title + "</font>",
					autoScroll : true,
					constrain : true,
					width : 200,
					height : winHeight
				});
			}
			showMsgWin(content);
		} else {
			if(msgWin && !msgWin.hidden) {
				msgWin.hide();
			}
		}
	}
