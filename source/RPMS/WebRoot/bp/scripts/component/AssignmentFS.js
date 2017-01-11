Ext.namespace('Ext.ux.AssignmentFS');

/**
 * @class Ext.ux.AssignmentFS
 * @extends Ext.form.FieldSet
 * @constructor
 * 
 * @param {Object} config The configuration options
 */
Ext.ux.AssignmentFS = function(config) {
	Ext.apply(this,config);
	Ext.ux.AssignmentFS.superclass.constructor.call(this, config);
	//TODO construction
}

Ext.extend(Ext.ux.AssignmentFS, Ext.form.FieldSet, {
	autoHeight: true,
	title : $lang('component.assignmentFS.assignInformation'),
	border : true,
	autoScroll : true,
	initComponent : function(){
        Ext.ux.AssignmentFS.superclass.initComponent.call(this);
        this.assignmentType = new Ext.ux.RadioGroup({
            fieldLabel : $lang('component.assignmentFS.assignmentType'),
            name : "assignmentType",
            allowBlank : false,
            horizontal : true,
            radios : [{
	            value: assignmentTypeCons.TYPE_ROLE,
	            boxLabel: $lang('component.role')
            }, {
            	value : assignmentTypeCons.TYPE_GROUP,
            	boxLabel : $lang('component.group')
            }, {
            	value : assignmentTypeCons.TYPE_DEPARTMENT, 
				boxLabel : $lang('component.department')
            }, {
            	value : assignmentTypeCons.TYPE_USER, 
				boxLabel :  $lang('component.user')
            }, {
            	value : assignmentTypeCons.TYPE_JOBTITLE, 
				boxLabel :  $lang('component.position')
            }]

        });
        
        this.assignmentType.on('change',this.onAssignmentTypeChange,this);
        this.add(this.assignmentType);
	},
	
	onAssignmentTypeChange : function(r,oldType,newType){
		var item = null;
		switch (newType) {
			case assignmentTypeCons.TYPE_ROLE :
				
    		case assignmentTypeCons.TYPE_GROUP :
    			//item = new PerfProcessGrid({setId:"",imgPanel:imgPanel,ess:ess});
				//break;
    		case assignmentTypeCons.TYPE_DEPARTMENT:
    			item = new Ext.form.Label({
					html : $lang('component.assignmentFS.htmlInformation')
				});
				break;
		}
		this.add(item);
		this.doLayout();
	}
	
});

Ext.reg('assignmentfs', Ext.ux.AssignmentFS);
