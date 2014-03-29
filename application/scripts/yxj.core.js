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
        TaskIconSize: 65,
        //全局z-index
        GZIndex: 10,
        // 窗体高度修正值
        FixHeight: 60,
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
        appWindowIdList: [0],
        appWindowPosition: [],
        checkMaxScreen: function (id) {
            if (YxjOSConfig.Cache.appWindowPosition.length == 0) return false;
            for (var i = YxjOSConfig.Cache.appWindowPosition.length; i >= 1; i--) {
                if (YxjOSConfig.Cache.appWindowPosition[i - 1].Id == id) {
                    return true;
                }
            }
            return false;
        },
        deletePosition: function (id) {
            var index = 0,
                pos = {};
            for (index = 0; index < YxjOSConfig.Cache.appWindowPosition.length; index++) {
                if (YxjOSConfig.Cache.appWindowPosition[index].Id == id) {
                    pos = YxjOSConfig.Cache.appWindowPosition[index];
                    break;
                }
            }
            YxjOSConfig.Cache.appWindowPosition.splice(index, 1);
            return pos;
        }
    }
};

//核心操作
var YxjOSCore = {
    createDesk: function (deskId) {

        iconDatas.push({ name: "添加", appId: 901, type: 2, src: "imgs/addnew.png", url: "javascript:void();" });

        var len = iconDatas.length,
            top = YxjOSConfig.UI.GlobalTop,
            left = YxjOSConfig.UI.GlobalLeft,
            screenHeight = $(window).height(),
            icon = {};

        YxjOSConfig.UI.GDeskHeight = screenHeight - YxjOSConfig.UI.GlobalTop - YxjOSConfig.UI.TaskBarHeight - YxjOSConfig.UI.FixHeight;

        for (var i = 0; i < len; i++) {
            iconDatas[i].left = left;
            iconDatas[i].top = top;
            icon = new IconModel(iconDatas[i]);
            $("#" + deskId).append(icon.HTML);

            icon.clickCallBack = YxjOSCore.appWindow.create;
            icon.bind();

            top = top + YxjOSConfig.UI.IconHeight;
            //如果即将到达底部，则换列
            if ((top + YxjOSConfig.UI.IconHeight + YxjOSConfig.UI.FixHeight) >= screenHeight) {
                top = YxjOSConfig.UI.GlobalTop;
                left = left + YxjOSConfig.UI.IconWidth;
            }
        }
        $("#" + deskId).css("height", YxjOSConfig.UI.GDeskHeight);
    },
    //窗口调整
    resizeDesk: function () {
        
        var h = $(window).height(),
            top = YxjOSConfig.UI.GlobalTop,
            left = YxjOSConfig.UI.GlobalLeft,
            icons = $("[id^='deskappIcon_block_']"),
            container = $("#appListContainerDiv");

        YxjOSConfig.UI.GDeskHeight = h - YxjOSConfig.UI.GlobalTop - YxjOSConfig.UI.TaskBarHeight - YxjOSConfig.UI.FixHeight;
        container.css("height", YxjOSConfig.UI.GDeskHeight);
        icons.each(function (i) {
            $(this).css({ "top": top, "left": left});
            top = top + YxjOSConfig.UI.IconHeight;
            //换列
            if ((top + YxjOSConfig.UI.IconHeight + YxjOSConfig.UI.FixHeight) >= h) {
                top = YxjOSConfig.UI.GlobalTop;
                left += YxjOSConfig.UI.IconWidth;
            }            
        });
    },
    //应用窗体相关
    appWindow: {
        create: function (args) {
            if (args.type != 1) return;
            args.top = YxjOSTools.getRandowInt(300);
            args.left = YxjOSTools.getRandowInt(600);

            if (YxjOSConfig.Cache.appWindowIdList.indexOf(Number(args.appId)) < 0) {
                YxjOSConfig.Cache.appWindowIdList.push(Number(args.appId));
                args.zindex = YxjOSConfig.UI.setGZIndex(YxjOSConfig.Cache.appWindowIdList.length + 1);

                var win = new WindosModel(args);

                //创建任务栏图标
                YxjOSCore.createTaskIcon(args);

                var er = new ElementResize("appWindow_" + args.appId);

                er.Set("window_" + args.appId + "_resize_t", "up");
                er.Set("window_" + args.appId + "_resize_b", "down");

                er.Set("window_" + args.appId + "_resize_rb", "right-down");
                er.Set("window_" + args.appId + "_resize_lb", "left-down");

                er.Set("window_" + args.appId + "_resize_rt", "right-up");
                er.Set("window_" + args.appId + "_resize_lt", "left-up");

                er.Set("window_" + args.appId + "_resize_r", "right");
                er.Set("window_" + args.appId + "_resize_l", "left");
            }
            else {
                $("#appWindow_" + args.appId).css("z-index", YxjOSConfig.UI.setGZIndex()).show();
            }            
        }
    },
    //任务栏
    createTaskIcon: function (args) {        
        var task = new TaskIconModel(args);        
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

