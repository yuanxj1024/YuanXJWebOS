/***
*2013-12-12
*Aaron VK Yuan(袁旭佳)
*496065812
*xuanyuanziruo@gmail.com
***/

//命名空间: YxjOSName

//全局配置
var YxjOSConfig = {
    UI: {
        //页面上部留白
        GlobalTop: 46,
        //页面左侧留白
        GlobalLeft: 28,
        IconWidth: 95,
        IconHeight: 95,
        //全局z-index
        GZIndex: 10,
        setGZIndex: function (i) {
            return (YxjOSConfig.UI.GZIndex += (!isNaN(i)) ? Number(i) : 1);
        },
        //Desk层的高度
        GDeskHeight: 0,
        //底部任务栏高度
        TaskBarHeight: 65
    },
    Cache: {
        //缓存应用程序id,防止二次打开
        appWindowIdList: [-1]
    }
};

//核心操作
var YxjOSCore = {
    IconTemplate: '<div class="deskappIcon_block" style="left:{left}px; top:{top}px" url="{url}" appId="{appId}" name="{name}" type="{type}"><div class="deskappIcon"><img class="deskappIcon_Img" src="{src}" /></div><div class="deskappName"><div class="deskappName_inner">{name}</div></div></div>',
    WindowTemplate: '<div id="appWindow_{appId}" appId="{appId}" style="width: 700px; height: 500px; position: absolute; top: {top}px; left: {left}px; padding: 6px; z-index:{zindex}"><div id="window_warp_{appId}"><div id="window_body_{appId}"><div class="window_main"><div id="window_title_warp_{appId}" class="window_title_warp " style="height: 25px; line-height: 25px; width: 100%"><div id="window_title_bar_r_{appId}" style="height: 20px; position: absolute; top: 5px; z-index: 2;"><a href="##" class="win_icon win_titlebar_icon win_toolbar_home" style="display: block"></a><a href="##" class="win_icon win_titlebar_icon win_toolbar_like" style="display: block"></a><a href="##" class="win_icon win_titlebar_icon win_toolbar_good" style="display: block"></a></div><div id="window_title_bar_l_{appId}" style="right: 5px; position: absolute;"><a href="##" class="win_icon win_toolbar_icon win_toolbar_min" style="display: block"></a><a href="##" class="win_icon win_toolbar_icon win_toolbar_mid" style="display: block"></a><a href="##" class="win_icon win_toolbar_icon win_toolbar_close" style="display: block"></a></div><div id="window_title_bar_m_{appId}" class="titleText window_title_bar_m" style="height: 25px; text-align: center; letter-spacing: 1px;">{name}</div></div><div id="window_content_warp_{appId}" style="width: 100%; height: 100%;"><div id="window_content_area_{appId}" style="width: 100%; height: 475px; background-color: rgb(233, 233, 233);"><iframe style="width: 100%; height: 100%; border: 0px; margin: 0; padding: 0; right: 0px; border: solid 0px red;" src="{url}"></iframe></div></div></div><div id="window_{appId}_resize_t" style="position: absolute; height: 5px; width: 100%; overflow: hidden; cursor: n-resize; left: 0px; top: 0px; display: block;"></div><div id="window_{appId}_resize_r" style="position: absolute; width: 5px; height: 100%; overflow: hidden; cursor: e-resize; top: 0px; right: 0px; display: block;"></div><div id="window_{appId}_resize_b" style="position: absolute; height: 5px; width: 100%; overflow: hidden; cursor: s-resize; left: 0; bottom: 0px; display: block;"></div><div id="window_{appId}_resize_l" style="position: absolute; width: 5px; height: 100%; overflow: hidden; cursor: w-resize; top: 0px; left: 0px; display: block;"></div><div id="window_{appId}_resize_rt" class="win_resize_bline" style="position: absolute; overflow: hidden; cursor: ne-resize; top: 0px; right: 0px; display: block;"></div><div id="window_{appId}_resize_rb" class="win_resize_bline" style="position: absolute; overflow: hidden; cursor: se-resize; right: 0px; bottom: 0px; display: block;"></div><div id="window_{appId}_resize_lt" class="win_resize_bline" style="position: absolute; overflow: hidden; cursor: nw-resize; top: 0px; left: 0px; display: block;"></div><div id="window_{appId}_resize_lb" class="win_resize_bline" style="position: absolute; overflow: hidden; cursor: sw-resize; left: 0px; bottom: 0px; display: block;"></div></div></div></div>',
    createDesk: function (deskId) {
        var len = iconDatas.length,
            top = YxjOSConfig.UI.GlobalTop,
            left = YxjOSConfig.UI.GlobalLeft,
            screenHeight = $(window).height(),
            block = "";

        YxjOSConfig.UI.GDeskHeight = screenHeight - YxjOSConfig.UI.GlobalTop - YxjOSConfig.UI.TaskBarHeight;

        for (var i = 0; i < len; i++) {
            block = YxjOSTools.replaceValue(YxjOSCore.IconTemplate, iconDatas[i]);
            block = YxjOSTools.replaceValue(block, { left: left, top: top });
            $("#" + deskId).append(block);
            top = top + YxjOSConfig.UI.IconHeight;
            //如果即将到达底部，则换列
            if ((top + YxjOSConfig.UI.IconHeight) >= screenHeight) {
                top = YxjOSConfig.UI.GlobalTop;
                left = left + YxjOSConfig.UI.IconWidth;
            }
        }
        $("#" + deskId).css("height", YxjOSConfig.UI.GDeskHeight);
    },
    //窗口调整
    resizeDesk: function (deskId) {
        var h = $(window).height(),
            top = YxjOSConfig.UI.GlobalTop,
            left = YxjOSConfig.UI.GlobalLeft,
            icons = {};

        icons = $("#" + deskId).children("div");
        YxjOSConfig.UI.GDeskHeight = h - YxjOSConfig.UI.GlobalTop - YxjOSConfig.UI.TaskBarHeight;
        $("#" + deskId).css("height", YxjOSConfig.UI.GDeskHeight);
        icons.each(function () {
            $(this).css({ "top": top, "left": left });
            top = top + YxjOSConfig.UI.IconHeight;
            //换列
            if ((top + YxjOSConfig.UI.IconHeight) >= h) {
                top = YxjOSConfig.UI.GlobalTop;
                left += YxjOSConfig.UI.IconWidth;
            }
        });
    },
    //图表时间集合
    iconEvent: {
        onClick: function () {
            var _self = $(this);
            YxjOSCore.appWindow.create(_self);
        },
        onRightClick: function () {
        },
        onDrag: function () {
        }
    },
    //应用窗体相关
    appWindow: {
        create: function (icon) {
            var args = {},
                html = "";
            args = {
                appId: icon.attr("appId"),
                name: icon.attr("name"),
                url: icon.attr("url"),
                top: YxjOSTools.getRandowInt(300),
                left: YxjOSTools.getRandowInt(600),
            };
            if (YxjOSConfig.Cache.appWindowIdList.indexOf(Number(args.appId)) < 0) {
                YxjOSConfig.Cache.appWindowIdList.push(Number(args.appId));
                YxjOSConfig.UI.setGZIndex(YxjOSConfig.Cache.appWindowIdList.length + 1);
                args.zindex = YxjOSConfig.UI.GZIndex;
                html = YxjOSTools.replaceValue(YxjOSCore.WindowTemplate, args);
                $("#web_form_container").append(html);
                YxjOSCore.appWindow.bindTilteBarClick(args);
            }
            else {
                YxjOSConfig.UI.setGZIndex();
                $("#appWindow_" + args.appId).css("z-index", YxjOSConfig.UI.GZIndex);
            }
        },
        close: function () {
            var appWin = $(this).parents("div[id^='appWindow_']");
            appWin.remove();
            YxjOSConfig.Cache.appWindowIdList.pop(Number(appWin.attr("appId")));
        },
        resize: function () {
        },
        bindTilteBarClick: function (args) {
            var titlebar = $("#window_title_warp_" + args.appId),
                appWin = $("#appWindow_" + args.appId);

            $(".win_toolbar_close").on("click", YxjOSCore.appWindow.close);
            titlebar.dragdrop({ container: appWin });
            titlebar.on("click", function () {
                YxjOSConfig.UI.setGZIndex();
                appWin.css("z-index", YxjOSConfig.UI.GZIndex);
            });

        }
    }
};

//工具函数
var YxjOSTools = {
    replaceValue: function (s, o) {
        for (var k in o) {
            var reg = new RegExp("{" + k + "}", "g");
            s = s.replace(reg, o[k]);
        }
        return s;
    },
    getRandowInt: function (m) {
        m = isNaN(m) ? 10 : parseInt(m);
        return parseInt(Math.random() * m);
    }
};
