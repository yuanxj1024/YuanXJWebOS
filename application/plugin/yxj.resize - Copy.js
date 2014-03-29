/**
 * @private
 * @class 元素调整大小
 * @name winresize
 * @memberOf 
 * @author Aaron VK Yuan(袁旭佳) 
 *  xuanyuanziruo@gmail.com
 * http://wwww.yuanxj.net
 * 参考原文:http://www.cnblogs.com/cloudgamer/archive/2008/12/03/Resize.html
 * @version 1.0
 * @constructor
 * @param {$}container 父级容器对象
 * @description 
 * @example
 *  
 */

//定位元素
var $D = function (id) {
    return typeof id == "string" ? document.getElementById(id) : id;
};

//创建对象的封装
var Class = {
    create: function () {
        return function () { this.initialize.apply(this, arguments); }
    }
};

// 扩展
var Extend = function (destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
};

var Bind = function (object, fun) {
    return function () {
        return fun.apply(object, arguments);
    };
};

var BindAsEventLister = function (object, fun) {
    var args = Array.prototype.slice.call(arguments).slice(2);
    return function (event) {
        return fun.apply(object, [event || window.event].concat(args));
    };
};

var CurrentStyle = function (element) {
    return element.CurrentStyle || document.defaultView.getComputedStyle(element, null);
};

//绑定事件，兼容处理
function addEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false);
    } else if (oTarget.attachEvent) {
        oTarget.attachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = fnHandler;
    }
}

//解除事件
function removeEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = null;
    }
}

//元素缩放原理
var ElementResize = Class.create(1,2);

ElementResize.prototype = {
    initialize: function (obj, options) {
        this._container = $D(obj);
        this._fR = BindAsEventLister(this, this.Resize);
        this._fS = Bind(this, this.Stop);
        this._container.style.position = "absolute";
    },
    //8个方向 绑定事件
    Set: function (btn, side) {
        var btn = $D(btn),
            fun;
        if (!btn) return;
        switch (side.toLowerCase()) {
            case "up":
                fun = this.Up;
                break;
            case "down":
                fun = this.Down;
                break;
            case "left":
                fun = this.Left;
                break;
            case "right":
                fun = this.Right;
                break;
            case "left-up":
                fun = this.LeftUp;
                break;
            case "right-up":
                fun = this.RightUp;
                break;
            case "left-down":
                fun = this.LeftDown;
                break;
            case "right-down":
            default:
                fun = this.RightDown;
                break;
        }
        //绑定事件
        addEventHandler(btn, "mousedown", BindAsEventLister(this, this.Start, fun));
    },
    Start: function (e, fun) {
        this._fun = fun;
        //记录容器大小位置
        this._styleWidth = this._container.clientWidth;
        this._styleHeight = this._container.clientHeight;
        this._styleLeft = this._container.offsetLeft;
        this._styleTop = this._container.offsetTop;

        //容器距离四周的距离
        this._sideLeft = e.clientX - this._styleWidth;
        this._sideRight = e.clientX + this._styleWidth;
        this._sideUp = e.clientY - this._styleHeight;
        this._sideDown = e.clientY + this._styleHeight;

        //修正值
        this._fixLeft = this._styleWidth + this._styleLeft;
        this._fixTop = this._styleHeight + this._styleTop;

        addEventHandler(document, "mousemove", this._fR);
        addEventHandler(document, "mouseup", this._fS);
    },
    //缩放
    Resize: function (e) {
        //调用相应事件
        this._fun(e);
        with (this._container.style) {
            width = this._styleWidth < 500 ? 500 : this._styleWidth + "px";
            height = this._styleHeight < 400 ? 400 : this._styleHeight + "px";
            top = this._styleTop + "px";
            left = this._styleLeft + "px";
        }
    },
    Up: function (e) {
        this._styleHeight = Math.max(this._sideDown - e.clientY, 0);
        this._styleTop = this._fixTop - this._styleHeight;
    },
    Down: function (e) {
        var size = Math.max(e.clientY - this._sideUp, 0);
        this._styleHeight = size;
    },
    Right: function (e) {
        this._styleWidth = Math.max(e.clientX - this._sideLeft, 0);
    },
    Left: function (e) {
        this._styleWidth = Math.max(this._sideRight - e.clientX, 0);
        this._styleLeft = this._fixLeft - this._styleWidth;
    },
    RightDown: function (e) {
        this.Right(e);
        this.Down(e);
    },
    LeftDown: function (e) {
        this.Left(e);
        this.Down(e);
    },
    RightUp: function (e) {
        this.Right(e);
        this.Up(e);
    },
    LeftUp: function (e) {
        this.Left(e);
        this.Up(e);
    },
    Stop: function () {
        removeEventHandler(document, "mousemove", this._fR);
        removeEventHandler(document, "mouseup", this._fS);
    }
};