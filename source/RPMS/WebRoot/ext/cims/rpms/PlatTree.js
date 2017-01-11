Ext.lion.LionPlatTree = function(config) {
    Ext.apply(this, config);
    if (!this.tree) Ext.apply(this, {
        tree: {
            loader: new Ext.tree.TreeLoader({
                dataUrl: this.dataUrl
            }),
            root: new Ext.tree.AsyncTreeNode({
                id: "root_plat_" + Ext.id(),
                text: "所有平台"
            })
        }
    });
    Ext.lion.LionPlatTree.superclass.constructor.call(this)
};
Ext.extend(Ext.lion.LionPlatTree, Ext.lion.LionComboBoxTree, {
    fieldLabel: "平台",
    hiddenName: "plat_" + Ext.id(),
    hiddenDisplayName: "plat_" + Ext.id(),
    displayField: "name",
    valueField: "id",
    allowBlank: false,
    dataUrl: "rpms/getStaffPlatTree.html",
    currentOrg: true,
    initInner: function() {
        if (this.currentOrg && !this.tree.loader.baseParams.parentId && !this.tree.loader.baseParams.parentId && !this.tree.loader.baseParams.id) Ext.apply(this.tree.loader.baseParams, {
            parentId : ""
        });
        Ext.lion.LionPlatTree.superclass.initInner.call(this)
    },
    cascadePlatTree: function(args) {
    	if (typeof args == "object") args = args.getValue();
        if (this.tree.loader.baseParams.parentId != "") {
            Ext.apply(this.tree.loader.baseParams, {
                depth : args
            });
            if (this.tree.root.loaded) this.tree.root.reload()
        }
    }
});
Ext.reg("plattree", Ext.lion.LionPlatTree);