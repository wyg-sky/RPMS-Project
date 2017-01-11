	function saveUsername(theForm) {
	    var expires = new Date();
	    expires.setTime(expires.getTime() + 24 * 30 * 60 * 60 * 1000); // sets it for approx 30 days.
	    setCookie("cmesUsername",document.getElementById("user.loginName").value,expires,"<c:url value="/"/>");//theForm.j_username
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
	    this.aa = new Array("user.loginName", '登录名不能为空！', new Function ("varName", " return this[varName];"));//<s:text name="errors.requiredField"><s:param><s:text name="label.username"/></s:param></s:text>
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
//		saveRememberPassword(this);
//		saveAutoLogin(this);
		if(validateRequired(form)) {
//			if(document.getElementById('rememberPassword').checked) {//保存cookie密码
//		        saveUsername(this);
//		        savePassword(this);
//			} else {//删除cookie密码
//				deleteCookie("cmesUsername","<c:url value="/"/>");
//				deleteCookie("cmesPassword","<c:url value="/"/>");
//			}
		    form.submit();
		}
	}
