<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../init.jsp"%>
<style>
	.title{font: normal 13px 微软雅黑, arial, verdana, sans-serif;font-weight:bold; line-height:26px; color:#0000ff;}
	.introduction{height: 90px;border:1px solid #cccccc; border-left:none; border-right:none;font-size:11px; line-height:20px; color:#0000ff;}
	.bottom{height:72px; margin:1px;  }
	.bottom .copyright{height:65px; font-size:11px; text-align:center; line-height:20px; color:#0000ff;}
</style>
<div class="title">国家企业技术中心信息管理平台</div>
<div class="introduction">
<center>
	姓名：<%=user_name%><br>
	单位：<%=organization_name%><br>
	部门：<%=department_name%><br>
	IP：<%=request.getRemoteAddr()%></br>
</center>
</div>
<div class="bottom">
  <div class="copyright">
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">版权所有：山东能源新矿集团 </td>
      </tr>
      <tr>
        <td align="center">研发厂商：<a href="http://dhcc.com.cn" target="_blank">东华软件股份公司 </a></td>
      </tr>
      <tr>
        <td align="center">建议使用IE8.0或以上版本</td>
      </tr>
    </table>
  </div>
</div>
<center><img src="<%=request.getContextPath() %>/framework/desktop/images/sysicon.png" alt="" /></center>