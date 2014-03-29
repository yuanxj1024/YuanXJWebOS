/***
*2013-12-12
*Aaron VK Yuan(袁旭佳)
*496065812
*xuanyuanziruo@gmail.com
***/
//icon 测试数据
var iconDatas = [
    { name: "我的博客", appId: 1, type: 1, src: "imgs/1.png", url: "http://www.yuanxj.net" },
    { name: "暴风影音", appId: 2, type: 1, src: "imgs/2.png", url: "http://www.baofeng.com/" },
    { name: "起点中文", appId: 3, type: 1, src: "imgs/3.png", url: "http://www.qidian.com" },
    { name: "爱奇艺", appId: 4, type: 1, src: "imgs/4.png", url: "http://www.iqiyi.com/" },
    { name: "魔兽世界", appId: 5, type: 1, src: "imgs/5.png", url: "http://www.warcraftchina.com/" },
    { name: "征途", appId: 6, type: 1, src: "imgs/6.png", url: "http://zt.ztgame.com/" },
    { name: "仙剑", appId: 7, type: 1, src: "imgs/7.png", url: "http://cmsimg.baiyou100.com/" },
    { name: "博客园", appId: 8, type: 1, src: "imgs/8.png", url: "http://www.cnblogs.com/" },
    { name: "扇贝", appId: 9, type: 1, src: "imgs/9.png", url: "http://www.shanbay.com/" },
    { name: "英雄联盟", appId: 10, type: 1, src: "imgs/10.png", url: "http://lol.qq.com/" },
    { name: "腾讯", appId: 11, type: 1, src: "imgs/11.png", url: "http://www.qq.com" },
    { name: "Bing", appId: 12, type: 1, src: "imgs/12.png", url: "http://www.bing.com/" }
];

//入口
$(function () {
    YxjOSManager.init();
});

//
var YxjOSManager = {
    init: function () {
        YxjOSCore.createDesk("appListContainerDiv");

        $(".deskappIcon_block").on("click", YxjOSCore.iconEvent.onClick);

        var resizeTimer = null;
        $(window).on("resize", function () {
            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }
            resizeTimer = setTimeout(YxjOSCore.resizeDesk, 450, "appListContainerDiv");
        });        
    }
};