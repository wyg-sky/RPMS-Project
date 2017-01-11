	function saveUsername(theForm) {
	    var expires = new Date();
	    expires.setTime(expires.getTime() + 24 * 30 * 60 * 60 * 1000); // sets it for approx 30 days.
	    setCookie("cmesUsername",document.getElementById("user.username").value,expires,"<c:url value="/"/>");//theForm.j_username
	}
	
	function savePassword(theForm) {
	    var expires = new Date();
	    expires.setTime(expires.getTime() + 24 * 30 * 60 * 60 * 1000); // sets it for approx 30 days.
	    setCookie("cmesPassword",document.getElementById("user.password").value,expires,"<c:url value="/"/>");//theForm.j_username
	}
	
	function saveRememberPassword(theForm) {
	    var expires = new Date();
	    expires.setTime(expires.getTime() + 24 * 30 * 60 * 60 * 1000); // sets it for approx 30 days.
	    setCookie("cmesRememberPassword",document.getElementById("rememberPassword").checked,expires,"<c:url value="/"/>");//theForm.j_username
	}
	
	function saveAutoLogin(theForm) {
	    var expires = new Date();
	    expires.setTime(expires.getTime() + 24 * 25 * 60 * 60 * 1000); // sets it for approx 30 days.
	    setCookie("cmesAutoLogin",document.getElementById("autoLogin").checked,expires,"<c:url value="/"/>");//theForm.j_username
	}
	
	function saveSystem(systemId) {
	    var expires = new Date();
	    expires.setTime(expires.getTime() + 24 * 30 * 60 * 60 * 1000); // sets it for approx 30 days.
	    setCookie("cmesSystem",systemId,expires,"<c:url value="/"/>");//theForm.j_username
	}
	
	function validateForm(form) {                                                               
	    return validateRequired(form); 
	} 
	
	function required () { 
	    this.aa = new Array("user.username", '登录名不能为空！', new Function ("varName", " return this[varName];"));//<s:text name="errors.requiredField"><s:param><s:text name="label.username"/></s:param></s:text>
	    this.ab = new Array("user.password", '密码不能为空！', new Function ("varName", " return this[varName];"));//<s:text name="errors.requiredField"><s:param><s:text name="label.password"/></s:param></s:text>
	} 
	
	// This function is used by the login screen to validate user/pass
	// are entered. 
	function validateRequired(form) {                                    
	    var bValid = true;
	    var focusField = null;
	    var i = 0;                                                                                          
	    var fields = new Array();                                                                           
	    oRequired = new required();                                                                         
	                                                                                                        
	    for (x in oRequired) {
	    	if(form[oRequired[x][0]])                                                                              
		        if ((form[oRequired[x][0]].type == 'text' || form[oRequired[x][0]].type == 'textarea' || form[oRequired[x][0]].type == 'select-one' || form[oRequired[x][0]].type == 'radio' || form[oRequired[x][0]].type == 'password') && form[oRequired[x][0]].value == '') {
		           if (i == 0)
		              focusField = form[oRequired[x][0]]; 
		              
		           fields[i++] = oRequired[x][1];
		            
		           bValid = false;                                                                             
		        }                                                                                               
	    }                                                                                                   
	                                                                                                       
	    if (fields.length > 0) {
	       focusField.focus();
	       alert(fields.join('\n'));                                                                      
	    }                                                                                                   
	                                                                                                       
	    return bValid;                                                                                      
	}
	function loginClick () {
		var form = document.loginForm;
		saveRememberPassword(this);
		saveAutoLogin(this);
		if(validateRequired(form)) {
			if(document.getElementById('rememberPassword').checked) {//保存cookie密码
		        saveUsername(this);
		        savePassword(this);
			} else {//删除cookie密码
				deleteCookie("cmesUsername","<c:url value="/"/>");
				deleteCookie("cmesPassword","<c:url value="/"/>");
			}
		    form.submit();
		}
	}
	function moduleClick(id) {
		clickOrNot = id;
		document.getElementById("top_bg").className="top_bg"+id;
		switch(id) {
			case 1 : document.loginForm.moduleId.value="'8a819eb730869d900130869fb1ed0001'";
			        document.loginForm.moduleTitle.value="生产调度管理系统";
			        document.loginForm.moduleJs.value="prod";break;
			case 2 : document.loginForm.moduleId.value="'8a81949d3030a54601303a77787c0004'";
			        document.loginForm.moduleTitle.value="安全管理系统";
			        document.loginForm.moduleJs.value="safe";break;
			case 3 : document.loginForm.moduleId.value="'8a819eb73043d3a3013043f1bb710001'";
			        document.loginForm.moduleTitle.value="设备管理系统";
			        document.loginForm.moduleJs.value="equi";break;
			case 4 : document.loginForm.moduleId.value="'8a819eab313ace7d01313ad0990b0003'";
			        document.loginForm.moduleTitle.value="BI分析系统";
			        document.loginForm.moduleJs.value="empty";break;
			case 5 : document.loginForm.moduleId.value="'8a819eab313ace7d01313ad076a40002'";
			        document.loginForm.moduleTitle.value="生产监测管理系统";
			        document.loginForm.moduleJs.value="spsm";break;
			case 6 : document.loginForm.moduleId.value="'8a819eab313ace7d01313ad0c15d0004'";
			        document.loginForm.moduleTitle.value="基础管理系统";
			        document.loginForm.moduleJs.value="system";break;
			case 7 : 
//			        document.loginForm.moduleId.value="'8a819eab313ace7d01313ad0c15d0004'";
//			        document.loginForm.moduleTitle.value="业务审批系统";
			        window.open('http://172.23.2.170');
			        break;
			case 8 : document.loginForm.moduleId.value="'2c97995c33f495b00133f71384ed0001'";
			        document.loginForm.moduleTitle.value="数据上报系统";
			        document.loginForm.moduleJs.value="mgdr";break;
			case 9 : document.loginForm.moduleId.value="'2c97995c33f495b00133f8dd52cd004d'";
			        document.loginForm.moduleTitle.value="罚款管理系统";
			        document.loginForm.moduleJs.value="fine";break;
			default : document.loginForm.moduleId.value="'8a819eb730869d900130869fb1ed0001'";
			        document.loginForm.moduleTitle.value="生产调度管理系统";
			        document.loginForm.moduleJs.value="prod";
			        document.getElementById("top_bg").className="top_bg1";break;
		}
		saveSystem(id);
		afterClick();
	}
