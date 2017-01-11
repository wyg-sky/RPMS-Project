
/**
 * <p>Title:  </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) itsm.name 2006</p>
 * @author itsm
 */
function TransitionCompass() {
}
TransitionCompass.getOffset = function (fromMetaNodeModel, toMetaNodeModel) {
    if ((!fromMetaNodeModel) || (!toMetaNodeModel)) {
        return null;
    }
	//alert(fromMetaNodeModel.type);
    //
    ///节点上连线端随连线上折点的位置而移动
    var fromPoint = fromMetaNodeModel.type=='RETANGLE'?new Point(fromMetaNodeModel.getLeftBase(),fromMetaNodeModel.getTopBase()):fromMetaNodeModel.getPosition();///
    //var fromPoint = fromMetaNodeModel.getPosition();
    var fromX = fromPoint.getX();
    var fromY = fromPoint.getY();
    
    var fromSize = fromMetaNodeModel.type=='RETANGLE'?null:fromMetaNodeModel.getSize();///
    var fromWidth = fromMetaNodeModel.type=='RETANGLE'?0:fromSize.getWidth();///
    var fromHeight = fromMetaNodeModel.type=='RETANGLE'?0:fromSize.getHeight();///
    
    //var fromSize = fromMetaNodeModel.getSize();
    //var fromWidth = fromSize.getWidth();
    //var fromHeight = fromSize.getHeight();
    var fromMinX = fromX;
    var fromMinY = fromY;
    var fromMaxX = fromX + fromWidth;
    var fromMaxY = fromY + fromHeight;

    /////
    var toPoint = toMetaNodeModel.type=='RETANGLE'?new Point(toMetaNodeModel.getLeftBase(),toMetaNodeModel.getTopBase()):toMetaNodeModel.getPosition();///
    //var toPoint = toMetaNodeModel.getPosition();
    
    var toX = toPoint.getX();
    var toY = toPoint.getY();
    ///
    var toSize = toMetaNodeModel.type=='RETANGLE'?null:toMetaNodeModel.getSize();
    var toWidth = toMetaNodeModel.type=='RETANGLE'?0:toSize.getWidth();
    var toHeight = toMetaNodeModel.type=='RETANGLE'?0:toSize.getHeight();
    //var toWidth = toSize.getWidth();
    //var toHeight = toSize.getHeight();
    var toMinX = toX;
    var toMinY = toY;
    var toMaxX = toX + toWidth;
    var toMaxY = toY + toHeight;

	//
    if (fromMaxY <= toMinY) {
        if ((fromMaxX >= toMinX) && (fromMinX <= toMaxX)) {
            var min = Math.max(fromMinX, toMinX);
            var max = Math.min(fromMaxX, toMaxX);
            var x = Math.round((min + max) / 2);
            return [new Point(x - fromX, fromMaxY - fromY), new Point(x - toX, toMinY - toY)];
        } else {
            if (fromMinX > toMaxX) {
                return [new Point(fromMinX - fromX, fromMaxY - fromY), new Point(toMaxX - toX, toMinY - toY)];
            } else {
                if (fromMaxX < toMinX) {
                    return [new Point(fromMaxX - fromX, fromMaxY - fromY), new Point(toMinX - toX, toMinY - toY)];
                }
            }
        }
    }

    //
    if (fromMinY >= toMaxY) {
        if ((fromMaxX >= toMinX) && (fromMinX <= toMaxX)) {
            var min = Math.max(fromMinX, toMinX);
            var max = Math.min(fromMaxX, toMaxX);
            var x = Math.round((min + max) / 2);
            return [new Point(x - fromX, fromMinY - fromY), new Point(x - toX, toMaxY - toY)];
        } else {
            if (fromMinX > toMaxX) {
                return [new Point(fromMinX - fromX, fromMinY - fromY), new Point(toMaxX - toX, toMaxY - toY)];
            } else {
                if (fromMaxX < toMinX) {
                    return [new Point(fromMaxX - fromX, fromMinY - fromY), new Point(toMinX - toX, toMaxY - toY)];
                }
            }
        }
    }

    //
    if ((fromMaxY > toMinY) && (fromMinY < toMaxY)) {
        var min = Math.max(fromMinY, toMinY);
        var max = Math.min(fromMaxY, toMaxY);
        var y = Math.round((min + max) / 2);
        if ((fromMaxX >= toMinX) && (fromMinX <= toMaxX)) {
            var min = Math.max(fromMinX, toMinX);
            var max = Math.min(fromMaxX, toMaxX);
            var x = Math.round((min + max) / 2);
            return [new Point(x - fromX, y - fromY), new Point(x - toX, y - toY)];
        } else {
            if (fromMinX > toMaxX) {
                return [new Point(fromMinX - fromX, y - fromY), new Point(toMaxX - toX, y - toY)];
            } else {
                if (fromMaxX < toMinX) {
                    return [new Point(fromMaxX - fromX, y - fromY), new Point(toMinX - toX, y - toY)];
                }
            }
        }
    }

    //
    return [new Point(Math.round(fromWidth / 2), fromHeight), new Point(Math.round(toWidth / 2), 0)];
};
TransitionCompass.getFromOffset = function (fromMetaNodeModel, toMetaNodeModel) {
    if ((!fromMetaNodeModel) || (!toMetaNodeModel)) {
        return null;
    }

    //
    var size = fromMetaNodeModel.getSize();
    return new Point(size.getWidth() / 2, size.getHeight());
};
TransitionCompass.getToOffset = function (fromMetaNodeModel, toMetaNodeModel) {
    if ((fromMetaNodeModel == null) || (toMetaNodeModel == null)) {
        return null;
    }
    var size = toMetaNodeModel.getSize();
    return new Point(size.getWidth() / 2, 0);
};
TransitionCompass.convertOffsetToPoint = function (metaNodeModel, offset) {
    var point = metaNodeModel.getPosition();
    return new Point(point.getX() + offset.getX(), point.getY() + offset.getY());
};

