/*
* Model层，定义页面操作元素对象
*/

var YxjOSModes = {
    IconTemplate: '<div class="deskappIcon_block" style="left:{left}px; top:{top}px" url="{url}" appId="{appId}" name="{name}" type="{type}"><div class="deskappIcon"><img class="deskappIcon_Img" src="{src}" /></div><div class="deskappName"><div class="deskappName_inner">{name}</div></div></div>',
    WindowTemplate: '<div id="appWindow_{appId}" appId="{appId}" style="width: 700px; height: 500px; position: absolute; top: {top}px; left: {left}px; padding: 6px; z-index:{zindex}"><div id="window_warp_{appId}"><div id="window_body_{appId}"><div class="window_main"><div id="window_title_warp_{appId}" class="window_title_warp " style="height: 25px; line-height: 25px; width: 100%"><div id="window_title_bar_r_{appId}" style="height: 20px; position: absolute; top: 5px; z-index: 2;"><a href="##" class="win_icon win_titlebar_icon win_toolbar_home" style="display: block"></a><a href="##" class="win_icon win_titlebar_icon win_toolbar_like" style="display: block"></a><a href="##" class="win_icon win_titlebar_icon win_toolbar_good" style="display: block"></a></div><div id="window_title_bar_l_{appId}" style="right: 5px; position: absolute;"><a href="##" class="win_icon win_toolbar_icon win_toolbar_min" style="display: block"></a><a href="##" class="win_icon win_toolbar_icon win_toolbar_mid" style="display: block"></a><a href="##" class="win_icon win_toolbar_icon win_toolbar_close" style="display: block"></a></div><div id="window_title_bar_m_{appId}" class="titleText window_title_bar_m" style="height: 25px; text-align: center; letter-spacing: 1px;">{name}</div></div><div id="window_content_warp_{appId}" style="width: 100%; height: 100%;"><div id="window_content_area_{appId}" style="width: 100%; height: 475px; background-color: rgb(233, 233, 233);"><iframe style="width: 100%; height: 100%; border: 0px; margin: 0; padding: 0; right: 0px; border: solid 0px red;" src="{url}"></iframe></div></div></div><div id="window_{appId}_resize_t" style="position: absolute; height: 5px; width: 100%; overflow: hidden; cursor: n-resize; left: 0px; top: 0px; display: block;"></div><div id="window_{appId}_resize_r" style="position: absolute; width: 5px; height: 100%; overflow: hidden; cursor: e-resize; top: 0px; right: 0px; display: block;"></div><div id="window_{appId}_resize_b" style="position: absolute; height: 5px; width: 100%; overflow: hidden; cursor: s-resize; left: 0; bottom: 0px; display: block;"></div><div id="window_{appId}_resize_l" style="position: absolute; width: 5px; height: 100%; overflow: hidden; cursor: w-resize; top: 0px; left: 0px; display: block;"></div><div id="window_{appId}_resize_rt" class="win_resize_bline" style="position: absolute; overflow: hidden; cursor: ne-resize; top: 0px; right: 0px; display: block;"></div><div id="window_{appId}_resize_rb" class="win_resize_bline" style="position: absolute; overflow: hidden; cursor: se-resize; right: 0px; bottom: 0px; display: block;"></div><div id="window_{appId}_resize_lt" class="win_resize_bline" style="position: absolute; overflow: hidden; cursor: nw-resize; top: 0px; left: 0px; display: block;"></div><div id="window_{appId}_resize_lb" class="win_resize_bline" style="position: absolute; overflow: hidden; cursor: sw-resize; left: 0px; bottom: 0px; display: block;"></div></div></div></div>'
};

var IconModel = function (icon) {
    this.name = icon.name;
    this.appId = icon.appId;
    this.type = icon.type;
    this.src = icon.src;
    this.url = icon.url;
    this.left = icon.left;
    this.top = icon.top;

    this.HTML = YxjOSTools.replaceValue(YxjOSModes.IconTemplate, icon);

    //回调函数
    this.clickCallBack = null;
    this.rightClickCallBack = null;
    this.moveCallBack = null;
    //事件
    this.onClick = function () {

        if (typeof tihs.clickCallBack =="function") {
            this.clickCallBack.call(this.clickCallBack, icon);
        }
    };

    this.onRightClick = function () {

        if (typeof this.rightClickCallBack =="function") {
            this.rightClickCallBack.call(this.rightClickCallBack, icon);
        }
    };

    this.onMove = function () {

        if (typeof this.moveCallBack == "function") {
            this.moveCallBack.call(this.moveCallBack, icon);
        }
    };

    this.bind = function () {
        this.onClick();
        this.onRightClick();
    };


};