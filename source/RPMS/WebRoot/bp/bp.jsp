<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<script language="JavaScript" type="text/javascript">
	Ext.onReady(function(){
	    Ext.QuickTips.init();
	   	
	    Ext.lion.ScriptLoader('ext/extension/ComboBoxTree.js',
							'ext/RowExpander.js',
							'ext/extension/AttachmentGrid.js',
							'ext/extension/RadioGroup.js',
							'ext/extension/FieldsSelectWin.js',
							'ext/extension/amchart/mediapanel.js',
							'ext/extension/ofc/uxofcpak.js',
							'scripts/GridPanel.js',
							'bp/scripts/BpNavTree.js',
							'bp/scripts/BpNavPanel.js',
							'bp/scripts/BpSearchPanel.js',
							'bp/scripts/BpViewPanel.js',
							'bp/scripts/BpWorkbenchPanel.js',
							'bp/scripts/BpFilterTreePanel.js',
							'bp/scripts/BpHelpPanel.js',
							'bp/scripts/BpReportPanel.js',
							'skmdb/scripts/component/SkmdbSeachFormPanel.js',
							'FVSD_RUNTIMESPACE/HOME/worktable_cfg.js'
							);
		var bp = ${bps};
		if(bp.length>0){
			var typeCode = '${typeCode}';//流程类别
			var uniqueSign = '${uniqueSign}';//过滤器唯一标识
			
			var bpViewPanel = new BpViewPanel(typeCode);
			var bpNavPanel = new BpNavPanel(typeCode,bpViewPanel,uniqueSign,${bps});
			var _container_bp_panel_${uuid} = new Ext.Panel({
		        el:'${uuid}',//此处el指向div id 必须唯一
		        bodyBorder:false,
		        layout:'border',
		        frame : false,
				plain : true,
		        items : [
		     	        bpNavPanel,
		     	        bpViewPanel
		     	]
		    });
			_container_bp_panel_${uuid}.render();
		}else{
			var _container_bp_panel_${uuid} = new Ext.Panel({
		        el:'${uuid}',//此处el指向div id 必须唯一
		        bodyBorder:false,
		        frame : false,
				plain : true,
				html : '流程未发布，请联系管理员，发布该流程'
		    });
			_container_bp_panel_${uuid}.render();
		}
		
	});
	
</script>

<div id='${uuid}'></div>