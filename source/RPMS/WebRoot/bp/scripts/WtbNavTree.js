/**
 * 
 * @param {} config
 */
WtbNavTree = function(config) {
	config = config || {};
	Ext.apply(this,config);
    
    WtbNavTree.superclass.constructor.call(this); 
    
};

Ext.extend(WtbNavTree, Ext.tree.TreePanel);
