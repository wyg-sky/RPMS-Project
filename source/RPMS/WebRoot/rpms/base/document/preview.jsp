<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%
	String swfpath = request.getParameter("swfpath");
%>
<html>
<head></head>
<body>
	<div style="position: absolute; left: 50px; top: 10px;">
		<a id="viewerPlaceHolder" style="width: 650px; height: 600px; display: block"></a>
		<script type="text/javascript">
			var fp = new FlexPaperViewer("viewerPlaceHolder",{
				SwfFile : escape("<%=swfpath%>"),//编码设置
				Scale : 0.6,
				ZoomTransition : 'easeOut',//变焦过渡
				ZoomTime : 0.5,
				ZoomInterval : 0.2,//缩放滑块-移动的缩放基础[工具栏]
				FitPageOnLoad : true,//自适应页面
				FitWidthOnLoad : true,//自适应宽度
				FullScreenAsMaxWindow : false,//全屏按钮-新页面全屏[工具栏]
				ProgressiveLoading : false,//分割加载
				MinZoomSize : 0.2,//最小缩放
				MaxZoomSize : 3,//最大缩放
				SearchMatchAll : true,
				InitViewMode : 'Portrait',//初始显示模式(SinglePage,TwoPage,Portrait)
				ViewModeToolsVisible : true,//显示模式工具栏是否显示
				ZoomToolsVisible : true,//缩放工具栏是否显示
				NavToolsVisible : true,//跳页工具栏
				CursorToolsVisible : false,
				SearchToolsVisible : true,
				PrintPaperAsBitmap:false,
				localeChain: 'zh_CN'
			});
        </script>
	</div>
</body>
</html>