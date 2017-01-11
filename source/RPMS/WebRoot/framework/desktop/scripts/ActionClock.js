yui = window.yui || {};
yui.CustomEvent = function(_1, _2) {
	this.type = _1;
	this.scope = _2 || window;
	this.subscribers = [];
	if (yui["Event"]) {
		yui.Event.regCE(this);
	}
};
yui.CustomEvent.prototype.subscribe = function(fn, _4) {
	this.subscribers.push(new yui.Subscriber(fn, _4));
};
yui.CustomEvent.prototype.unsubscribe = function(fn, _5) {
	for (var i = 0; i < this.subscribers.length; ++i) {
		var s = this.subscribers[i];
		if (s && s.contains(fn, _5)) {
			this._delete(i);
		}
	}
};
yui.CustomEvent.prototype.fire = function() {
	for (var i = 0; i < this.subscribers.length; ++i) {
		var s = this.subscribers[i];
		if (s) {
			s.fn.call(this.scope, this.type, arguments, s.obj);
		}
	}
};
yui.CustomEvent.prototype.unsubscribeAll = function() {
	for (var i = 0; i < this.subscribers.length; ++i) {
		this._delete(i);
	}
};
yui.CustomEvent.prototype._delete = function(_8) {
	var s = this.subscribers[_8];
	if (s) {
		delete s.fn;
		delete s.obj;
	}
	delete this.subscribers[_8];
};
yui.Subscriber = function(fn, _9) {
	this.fn = fn;
	this.obj = _9 || null;
};
yui.Subscriber.prototype.contains = function(fn, obj) {
	return (this.fn == fn && this.obj == obj);
};
yui = window.yui || {};
yui.Event = new function() {
	var _11 = this;
	this.loadComplete = false;
	this.listeners = [];
	this.delayedListeners = [];
	this.unloadListeners = [];
	this.customEvents = [];
	this.legacyEvents = [];
	this.legacyHandlers = [];
	this.EL = 0;
	this.TYPE = 1;
	this.FN = 2;
	this.WFN = 3;
	this.SCOPE = 3;
	this.isSafari = (navigator.userAgent.match(/safari/gi));
	this.isIE = (!this.isSafari && navigator.userAgent.match(/msie/gi));
	this.addListener = function(el, _13, fn, _14) {
		if (this._isValidCollection(el)) {
			for (var i = 0; i < el.length; ++i) {
				this.on(el[i], _13, fn, _14);
			}
			return;
		} else {
			if (typeof el == "string") {
				if (this.loadComplete) {
					el = this.getEl(el);
				} else {
					this.delayedListeners[this.delayedListeners.length] = [el,
							_13, fn, _14];
					return;
				}
			}
		}
		if (!el) {
			return;
		}
		if ("unload" == _13 && _14 !== this) {
			this.unloadListeners[this.unloadListeners.length] = [el, _13, fn,
					_14];
			return;
		}
		var _15 = function(e) {
			return fn.call(el, _11.getEvent(e), _14);
		};
		var li = [el, _13, fn, _15];
		var _18 = this.listeners.length;
		this.listeners[_18] = li;
		if (this.useLegacyEvent(el, _13)) {
			var _19 = this.getLegacyIndex(el, _13);
			if (_19 == -1) {
				_19 = this.legacyEvents.length;
				this.legacyEvents[_19] = [el, _13, el["on" + _13]];
				this.legacyHandlers[_19] = [];
				el["on" + _13] = function(e) {
					_11.fireLegacyEvent(_11.getEvent(e), _19);
				};
			}
			this.legacyHandlers[_19].push(_18);
		} else {
			if (el.addEventListener) {
				el.addEventListener(_13, _15, false);
			} else {
				if (el.attachEvent) {
					el.attachEvent("on" + _13, _15);
				}
			}
		}
	};
	this.on = this.addListener;
	this.fireLegacyEvent = function(e, _20) {
		var ok = true;
		var el = _11.legacyEvents[0];
		var le = _11.legacyHandlers[_20];
		for (i = 0; i < le.length; ++i) {
			var _23 = le[i];
			if (_23) {
				var ret = _11.listeners[_23][_11.WFN].call(el, e);
				ok = (ok && ret);
			}
		}
		return ok;
	};
	this.getLegacyIndex = function(el, _25) {
		for (var i = 0; i < this.legacyEvents.length; ++i) {
			var le = this.legacyEvents[i];
			if (le && le[0] == el && le[1] == _25) {
				return i;
			}
		}
		return -1;
	};
	this.useLegacyEvent = function(el, _26) {
		return ((!el.addEventListener && !el.attachEvent) || (_26 == "click" && this.isSafari));
	};
	this.removeListener = function(el, _27, fn) {
		if (typeof el == "string") {
			el = this.getEl(el);
		} else {
			if (this._isValidCollection(el)) {
				for (var i = 0; i < el.length; ++i) {
					this.removeListener(el[i], _27, fn);
				}
				return;
			}
		}
		var _28 = null;
		var _29 = this._getCacheIndex(el, _27, fn);
		if (_29 >= 0) {
			_28 = this.listeners[_29];
		}
		if (!el || !_28) {
			return false;
		}
		if (el.removeEventListener) {
			el.removeEventListener(_27, _28[this.WFN], false);
		} else {
			if (el.detachEvent) {
				el.detachEvent("on" + _27, _28[this.WFN]);
			}
		}
		delete this.listeners[_29][this.WFN];
		delete this.listeners[_29][this.FN];
		delete this.listeners[_29];
		return true;
	};
	this.getTarget = function(ev, _31) {
		var t = ev.target || ev.srcElement;
		if (_31 && t && "#text" == t.nodeName) {
			return t.parentNode;
		} else {
			return t;
		}
	};
	this.getPageX = function(ev) {
		var x = ev.pageX;
		if (!x && 0 !== x) {
			x = ev.clientX || 0;
			if (this.isIE) {
				x += this._getScrollLeft();
			}
		}
		return x;
	};
	this.getPageY = function(ev) {
		var y = ev.pageY;
		if (!y && 0 !== y) {
			y = ev.clientY || 0;
			if (this.isIE) {
				y += this._getScrollTop();
			}
		}
		return y;
	};
	this.getRelatedTarget = function(ev) {
		var t = ev.relatedTarget;
		if (!t) {
			if (ev.type == "mouseout") {
				t = ev.toElement;
			} else {
				if (ev.type == "mouseover") {
					t = ev.fromElement;
				}
			}
		}
		return t;
	};
	this.getTime = function(ev) {
		if (!ev.time) {
			var t = new Date().getTime();
			try {
				ev.time = t;
			} catch (e) {
				return t;
			}
		}
		return ev.time;
	};
	this.stopEvent = function(ev) {
		this.stopPropagation(ev);
		this.preventDefault(ev);
	};
	this.stopPropagation = function(ev) {
		if (ev.stopPropagation) {
			ev.stopPropagation();
		} else {
			ev.cancelBubble = true;
		}
	};
	this.preventDefault = function(ev) {
		if (ev.preventDefault) {
			ev.preventDefault();
		} else {
			ev.returnValue = false;
		}
	};
	this.getEvent = function(e) {
		var ev = e || window.event;
		if (!ev) {
			var c = this.getEvent.caller;
			while (c) {
				ev = c.arguments[0];
				if (ev && Event == ev.constructor) {
					break;
				}
				c = c.caller;
			}
		}
		return ev;
	};
	this.getCharCode = function(ev) {
		return ev.charCode || (ev.type == "keypress") ? ev.keyCode : 0;
	};
	this._getCacheIndex = function(el, _36, fn) {
		for (var i = 0; i < this.listeners.length; ++i) {
			var li = this.listeners[i];
			if (li && li[this.FN] == fn && li[this.EL] == el
					&& li[this.TYPE] == _36) {
				return i;
			}
		}
		return -1;
	};
	this._isValidCollection = function(o) {
		return (o && o.length && typeof o != "string" && !o.alert && !o.name
				&& !o.id && typeof o[0] != "undefined");
	};
	this.elCache = {};
	this.getEl = function(id) {
		return document.getElementById(id);
	};
	this.clearCache = function() {
		for (i in this.elCache) {
			delete this.elCache[i];
		}
	};
	this.regCE = function(ce) {
		this.customEvents.push(ce);
	};
	this._load = function(e) {
		_11.loadComplete = true;
	};
	this._tryPreloadAttach = function() {
		var _40 = !this.loadComplete;
		for (var i = 0; i < this.delayedListeners.length; ++i) {
			var d = this.delayedListeners[i];
			if (d) {
				var el = this.getEl(d[this.EL]);
				if (el) {
					this.on(el, d[this.TYPE], d[this.FN], d[this.SCOPE]);
					delete this.delayedListeners[i];
				}
			}
		}
		if (_40) {
			setTimeout("yui.Event._tryPreloadAttach()", 50);
		}
	};
	this._unload = function(e, me) {
		for (var i = 0; i < me.unloadListeners.length; ++i) {
			var l = me.unloadListeners[i];
			if (l) {
				l[me.FN](me.getEvent(e), l[me.SCOPE]);
			}
		}
		if (me.listeners && me.listeners.length > 0) {
			for (i = 0; i < me.listeners.length; ++i) {
				l = me.listeners[i];
				if (l) {
					me.removeListener(l[me.EL], l[me.TYPE], l[me.FN]);
				}
			}
			me.clearCache();
		}
		for (i = 0; i < me.customEvents.length; ++i) {
			me.customEvents[i].unsubscribeAll();
			delete me.customEvents[i];
		}
		for (i = 0; i < me.legacyEvents.length; ++i) {
			delete me.legacyEvents[i][0];
			delete me.legacyEvents[i];
		}
	};
	this._getScrollLeft = function() {
		return this._getScroll()[1];
	};
	this._getScrollTop = function() {
		return this._getScroll()[0];
	};
	this._getScroll = function() {
		var dd = document.documentElement;
		db = document.body;
		if (dd && dd.scrollTop) {
			return [dd.scrollTop, dd.scrollLeft];
		} else {
			if (db) {
				return [db.scrollTop, db.scrollLeft];
			} else {
				return [0, 0];
			}
		}
	};
};
if (document && document.body) {
	yui.Event._load();
} else {
	yui.Event.on(window, "load", yui.Event._load, yui.Event);
}
yui.Event.on(window, "unload", yui.Event._unload, yui.Event);
yui.Event._tryPreloadAttach();