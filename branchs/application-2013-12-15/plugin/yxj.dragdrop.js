/**
 * @private
 * @class 元素拖拽类
 * @name dragdrop
 * @memberOf alloy.rpcService
 * @author 袁家小黑球 
 *  xuanyuanziruo@gmail.com
 * http://wwww.yuanxj.net
 * @version 1.0
 * @constructor
 * @param {$}container 父级容器对象
 * @param {function} callback 元素移动时的回调函数
 * @param {function} direction 元素移动的方向, X: 仅x轴移动，Y：仅y轴移动，除此以外的任意值表示任何方向
 * @param {array} area 限制移动范围的整型数组[minX,maxX,minY,maxY]
 * @description 需要依赖jQuery 库
 * @example
 *  $("#subDiv").dragdrop({
        container:$("#parentDIv"),
        callback:null,
        direction:"all",
        area:[1,1000,200,700]
    });
 */

(function ($) {
    if ((typeof $) == "undefined" || !$) {
        throw "Please refer to jQuery file!";
    }
    var settings = {
        container: null, //父级容器对象
        callback: null,  //回调函数
        direction: null, //[null,'X','Y']
        area: []//[minX,maxX,minY,maxY]
    };
    //获取鼠标位置
    var getCursorPos = function (e) {        
        if (e.pageX || e.pageY) {
            return { x: e.pageX, y: e.pageY };
        }
        var _body = document.body;
        return {
            x: e.clientX + _body.scrollLeft - _body.clientLeft,
            y: e.clientY + _body.scrollTop - _body.clientTop
        };
    };

    $.fn.dragdrop = function (options) {
        var setting = $.extend({}, settings, options);

        //返回链式引用
        return this.each(function () {
            var canMoving = false,
                offset = { innerTop: 0, innerLeft: 0, offsetTop: 0, offsetLeft: 0 },
                container = null,
                _self = $(this);            
            container = setting.container ? $(setting.container, _self) : _self;
            container.css({ "position": "absolute" });

            //bind事件
            _self.on("mousedown", function (e) {
                canMoving = true;
                container.css("cursor", "move");
                var pos = getCursorPos(e),
                    temp = setting.container.position();
                if (container.get(0).setCapture) {
                    container.get(0).setCapture();
                }
                //记录鼠标按下时，鼠标相对于移动对象原点的距离.
                offset.innerLeft = pos.x - temp.left;
                offset.innerTop = pos.y - temp.top;
            });
            $(document).on("mousemove", function (e) {
                if (canMoving) {
                    var pos = getCursorPos(e);
                    //记录鼠标移动偏移量
                    offset.offsetLeft = pos.x - offset.innerLeft;
                    offset.offsetTop = pos.y - offset.innerTop;
                    //限制                    
                    if (setting.area != null && setting.area.length == 4) {
                        if (offset.offsetLeft < parseInt(setting.area[0])) {
                            offset.offsetLeft = parseInt(setting.area[0]);
                        }
                        else if (offset.offsetLeft > parseInt(setting.area[1])) {
                            offset.offsetLeft = parseInt(setting.area[1]);
                        }
                        else if (offset.offsetTop < parseInt(setting.area[2])) {
                            offset.offsetTop = parseInt(setting.area[2]);
                        }
                        else if (offset.offsetTop > parseInt(setting.area[3])) {
                            offset.offsetTop = parseInt(setting.area[3]);
                        }
                    }

                    switch (setting.direction) {
                        case "X":
                            container.css("left", offset.offsetLeft);
                            break;
                        case "Y":
                            container.css("top", offset.offsetTop);
                            break;
                        default:
                            container.css({ "top": offset.offsetTop, "left": offset.offsetLeft });
                            break;
                    }
                    if (setting.callback) {
                        setting.callback.call(setting.callback, offset);
                    }
                }
            });
            _self.on("mouseup", function () {
                canMoving = false;
                container.css("cursor", "default");
                if (container.get(0).releaseCapture) {
                    container.get(0).releaseCapture();
                }
            });

        });
    };

})(jQuery);