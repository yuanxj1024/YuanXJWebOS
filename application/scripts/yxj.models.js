/***
*2013-12-15
*Aaron VK Yuan(袁旭佳)
*496065812
*xuanyuanziruo@gmail.com
***/
/*
* Model层，定义页面操作元素对象
*/

var YxjOSModes = {
    //图标模板
    IconTemplate: '<div class="deskappIcon_block" id="deskappIcon_block_{appId}" style="left:{left}px; top:{top}px" url="{url}" appId="{appId}" name="{name}" type="{type}"><div class="deskappIcon"><img class="deskappIcon_Img" src="{src}" /></div><div class="deskappName"><div class="deskappName_inner">{name}</div></div></div>',
    //窗口模板
    WindowTemplate: '<div id="appWindow_{appId}" appId="{appId}" style="width: 700px; height: 500px; position: absolute; top: {top}px; left: {left}px; padding: 6px; z-index:{zindex}"><div id="window_warp_{appId}"><div id="window_body_{appId}"><div class="window_main"><div id="window_title_warp_{appId}" class="window_title_warp " style="height: 25px; line-height: 25px; width: 100%"><div id="window_title_bar_r_{appId}" style="height: 20px; position: absolute; top: 5px; z-index: 2;"><a href="##" class="win_icon win_titlebar_icon win_toolbar_home" style="display: block"></a><a href="##" class="win_icon win_titlebar_icon win_toolbar_like" style="display: block"></a><a href="##" class="win_icon win_titlebar_icon win_toolbar_good" style="display: block"></a></div><div id="window_title_bar_l_{appId}" style="right: 5px; position: absolute;"><a href="##" class="win_icon win_toolbar_icon win_toolbar_min" style="display: block"></a><a href="##" class="win_icon win_toolbar_icon win_toolbar_mid" style="display: block"></a><a href="##" class="win_icon win_toolbar_icon win_toolbar_close" style="display: block"></a></div><div id="window_title_bar_m_{appId}" class="titleText window_title_bar_m" style="height: 25px; text-align: center; letter-spacing: 1px;">{name}</div></div><div id="window_content_warp_{appId}" style="width: 100%; height: 100%;"><div id="window_content_area_{appId}" style="width: 100%; height: 475px; background-color: rgb(233, 233, 233);"><iframe style="width: 100%; height: 100%; border: 0px; margin: 0; padding: 0; right: 0px; border: solid 0px red;" src="{url}"></iframe><div id="window_content_bg_{appId}" style="z-index: 30;width: 100%;height: 50%;position: absolute;top: 30px;filter: alpha(opacity=100);display:block;"></div></div></div></div><div id="window_{appId}_resize_t" style="position: absolute; height: 5px; width: 100%; overflow: hidden; cursor: n-resize; left: 0px; top: 0px; display: block;"></div><div id="window_{appId}_resize_r" style="position: absolute; width: 5px; height: 100%; overflow: hidden; cursor: e-resize; top: 0px; right: 0px; display: block;"></div><div id="window_{appId}_resize_b" style="position: absolute; height: 5px; width: 100%; overflow: hidden; cursor: s-resize; left: 0; bottom: 0px; display: block;"></div><div id="window_{appId}_resize_l" style="position: absolute; width: 5px; height: 100%; overflow: hidden; cursor: w-resize; top: 0px; left: 0px; display: block;"></div><div id="window_{appId}_resize_rt" class="win_resize_bline" style="position: absolute; overflow: hidden; cursor: ne-resize; top: 0px; right: 0px; display: block;"></div><div id="window_{appId}_resize_rb" class="win_resize_bline" style="position: absolute; overflow: hidden; cursor: se-resize; right: 0px; bottom: 0px; display: block;"></div><div id="window_{appId}_resize_lt" class="win_resize_bline" style="position: absolute; overflow: hidden; cursor: nw-resize; top: 0px; left: 0px; display: block;"></div><div id="window_{appId}_resize_lb" class="win_resize_bline" style="position: absolute; overflow: hidden; cursor: sw-resize; left: 0px; bottom: 0px; display: block;"></div></div></div></div>',
    //任务栏图标模板
    TaskIconTemplate: '<div class="taskIcon" id="taskIcon_block_{appId}" appId="{appId}"><div class="taskIcon_warp"><div class="taskIcon_img"><img src="{src}" /></div><div class="taskIcon_name"><div>{name}</div></div></div></div>'
};

///
//图标对象
///
/*
icon = [{ name: "我的博客", appId: 1, type: 1, src: "imgs/1.png", url: "http://www.yuanxj.net" }]
*/
var IconModel = function (icon) {
    this.Icon = icon;
    this.HTML = YxjOSTools.replaceValue(YxjOSModes.IconTemplate, icon);

    //绑定事件，必须调用
    this.bind = function () {
        this.onClick();
        this.onRightClick();
    };

    //回调函数
    this.clickCallBack = function () { };
    this.rightClickCallBack = null;
    this.moveCallBack = null;
    var _self = this;
    //事件
    this.onClick = function () {
        $("#deskappIcon_block_" + icon.appId).on("click", function () {
            if (_self.clickCallBack) {
                _self.clickCallBack.call(_self.clickCallBack, icon);
            }
        });
    };

    this.onRightClick = function () {

        if (this.rightClickCallBack) {
            this.rightClickCallBack.call(this.rightClickCallBack, icon);
        }
    };

    this.onMove = function () {

        if (this.moveCallBack) {
            this.moveCallBack.call(this.moveCallBack, icon);
        }
    };
};

///
//窗体对象
///
/*
args = {appId:1, name:"", url:"", top:0, left:0};
*/
var WindosModel = function (args) {
    var _self = this;
    _self.Item = { appId: args.appId, name: args.name, top: args.top, left: args.left, zindex: args.zindex, url: args.url };

    _self.HTML = YxjOSTools.replaceValue(YxjOSModes.WindowTemplate, this.Item);

    _self.bind = function () {
        $("#web_form_container").append(_self.HTML);
        this.onControlBarClick();
        this.onMove();
        this.onTitleBarClick();
    };


    _self.controlBarCallBack = null;
    _self.moveCallBack = null;

    this.onControlBarClick = function () {
        var appWin = $("#appWindow_" + _self.Item.appId);
        $("#window_title_bar_l_" + _self.Item.appId + " .win_toolbar_close").on("click", function (e) {
            //e.preventDefault();
            appWin.remove();
            $("#taskIcon_block_" + _self.Item.appId).remove();

            YxjOSConfig.Cache.appWindowIdList.pop(Number(_self.Item.appId));
            if (_self.closeCallBack) {
                _self.closeCallBack.call(_self.closeCallBack, _self.Item);
            }
        });
        $("#window_title_bar_l_" + _self.Item.appId + " .win_toolbar_mid").on("click", function (e) {
            //e.preventDefault();
            resizeWindow();
        });
        $("#window_title_bar_l_" + _self.Item.appId + " .win_toolbar_min").on("click", function (e) {
           // e.preventDefault();
            appWin.hide();
        });
    };

    this.onMove = function () {
        var appWin = $("#appWindow_" + _self.Item.appId),
            warp = $("#window_title_warp_" + _self.Item.appId);
        warp.dragdrop({ container: appWin });
        warp.on("click", function () {
            appWin.css("z-index", YxjOSConfig.UI.setGZIndex());

            if (_self.moveCallBack) {
                _self.moveCallBack.call(_self.moveCallBack, _self.Item);
            }
        }).on("mousedown", function () {
            $("#window_content_bg_" + _self.Item.appId).show();
        }).on("mouseup", function () {
            $("#window_content_bg_" + _self.Item.appId).hide();
        });
    };

    this.onTitleBarClick = function () {
        $("#window_title_warp_" + _self.Item.appId).on("dblclick", function () {
            resizeWindow();
        });
    };

    var resizeWindow = function () {
        var appWin = $("#appWindow_" + _self.Item.appId);
        var screen = { width: $(window).width() - 13, height: $(window).height() - 35 - YxjOSConfig.UI.FixHeight-10, top: 0, left: 0 },
                isMax = YxjOSConfig.Cache.checkMaxScreen(_self.Item.appId),
                pos = {},
                titleBar = $("#window_title_warp_" + _self.Item.appId);
        if (isMax) {
            pos = YxjOSConfig.Cache.deletePosition(_self.Item.appId);
            appWin.css({ width: pos.width, height: pos.height, left: pos.left, top: pos.top });
            $("#window_content_area_" + _self.Item.appId).css({ width: pos.width, height: pos.height });
            titleBar.dragdrop({ container: appWin });
        }
        else {
            YxjOSConfig.Cache.appWindowPosition.push({ Id: _self.Item.appId, left: appWin.offset().left, top: appWin.offset().top, width: appWin.width(), height: appWin.height() });
            appWin.css(screen);
            $("#window_content_area_" + _self.Item.appId).css({ width: screen.width, height: screen.height });
            titleBar.off("mousedown");
        }
    };
    //八个方向调整窗口大小
    this.onSideBarResizeWin = function () {
        var ids = "#window_{appId}_resize_t,#window_{appId}_resize_r,#window_{appId}_resize_b,#window_{appId}_resize_l,#window_{appId}_resize_rt,#window_{appId}_resize_rb,#window_{appId}_resize_lt,#window_{appId}_resize_lb",
            canResize = false;
        ids = YxjOSTools.replaceValue(ids, { appId: _self.Item.appId });
        $(ids).on("mousedown", function () {
        }).on("mousemove", function () {
        }).on("mouseup", function () {
        });

    };

    //调用绑定
    _self.bind();

}; // end window

///
//任务栏图标对象
///
// Item:{appId:0, src:'1.jpg', name:'me'}
var TaskIconModel = function (arg) {
    var _self = this;
    _self.Item = { appId: arg.appId, src: arg.src, name: arg.name };
    _self.HTML = YxjOSTools.replaceValue(YxjOSModes.TaskIconTemplate, _self.Item);

    //绑定事件，必须调用
    _self.bind = function () {
        $("#foot_bar_container").append(_self.HTML);
        onClick();
    };
    // 左键单击
    var onClick = function () {
        var current = $("#taskIcon_block_" + _self.Item.appId),
            appWin = $("#appWindow_" + _self.Item.appId);

        current.on("click", function () {
            if (appWin.css("display") == "none") {
                appWin.css("z-index", YxjOSConfig.UI.setGZIndex());
                appWin.show();
            }
            else {
                appWin.hide();
            }
        });
    };
    //右键单击
    var onRightClick = function () {

    };

    //调用绑定
    _self.bind();
}; // end TaskItem