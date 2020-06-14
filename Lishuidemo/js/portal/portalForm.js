define(['../views/Container','../portal/loginWindow', '../Util'],function(Container,SuperMapSSO, Utils){
    "use strict";
    var _ = require('underscore');
    var $ = require('jquery');
    var viewer;
    var htmlStr = [
        '<a id="home" class="btn btn-inverse" title="' + Resource.home + '" style="width : 32px;height : 32px;padding : 5px 8px;display: block; margin-bottom: 18px;">',
        '<span class="iconfont icon-side-toolbar_home"></span>',
        '</a>',
        '<a id="portalOpen" class="btn btn-inverse" title="' + Resource.storage + '" style="display: block; width : 32px;height : 32px;padding : 5px 8px; margin-bottom: 18px;">',
        '<span class="iconfont icon-side-toolbar_storage"></span>',
        '</a>',
        '<a id="portalShare" class="btn btn-inverse" title="' + Resource.share + '" style="display: none; width : 32px;height : 32px;padding : 5px 8px;margin-bottom: 18px;">',
        '<span class="iconfont icon-side-toolbar_share"></span>',
        '</a>',
        '<a id="login" class="btn btn-inverse" title="' + Resource.login + '" style="display: none; width : 32px;height : 32px;padding : 5px 8px;margin-bottom: 18px;">',
        '<span class="iconfont icon-side-toolbar_login"></span>',
        '</a>',
        '<a id="toggle-fullscreen-btn" class="btn btn-inverse" title="' + Resource.fullScreenToggle + '" style="width : 32px;height : 32px;padding : 5px 8px;">',
        '<span class="iconfont icon-side-toolbar_fullscreen"></span>',
        '</a>',
    ].join('');
    var portalForm = Container.extend({
        template : _.template(htmlStr),
        initialize : function(options) {
            this.model = options.sceneModel;
            this.isPCBroswer = options.isPCBroswer;
            viewer = options.sceneModel.viewer;
            this.render();
            this.on('componentAdded',function(parent){
                if(Window.isSuperMapOL === true){
                    $("#portalShare").css('display', 'block');
                    $("#login").css('display', 'block');
                }

                // 监听全屏切换事件
                document.addEventListener("fullscreenchange", function( event ) {
                    if (!document.fullscreenElement) { // fullscreenElement属性返回正处于全屏状态的Element节点，没有节点处于全屏状态返回null
                        $('#toggle-fullscreen-btn > span.iconfont').removeClass('icon-side-toolbar_cancel-fullscreen').addClass('icon-side-toolbar_fullscreen');
                    } else {
                        $('#toggle-fullscreen-btn > span.iconfont').removeClass('icon-side-toolbar_fullscreen').addClass('icon-side-toolbar_cancel-fullscreen');
                    }
                });
            });
        },
        render : function() {
            this.$el.html(this.template());
            return this;
        },
        events : {
            'click #home' : 'home',
            'click #portalOpen' : 'portalOpen',
            'click #portalShare' : 'portalShare',
            'click #login' : 'login',
            'click #toggle-fullscreen-btn': 'toggleFullscreen'
        },
        portalOpen : function() {
            var me = this;
            if(me.savePortalForm){
                $("#portalTab1").click();
                me.savePortalForm.$el.show();
                var promise = viewer.scene.outputSceneToFile();
                Cesium.when(promise,function (buffer) {
                    var canvas = document.getElementById("sceneCanvas");
                    var ctx = canvas.getContext("2d");
                    var img = new Image();
                    img.src = buffer;
                    img.onload = function () {
                        ctx.drawImage(img,0,0,298,150)
                    }
                    var sceneViewerUrl = window.location.href;
                    if(sceneViewerUrl.indexOf('?id=') !== -1) {
                        sceneViewerUrl = sceneViewerUrl.match(/id=(\S*)/);
                        sceneViewerUrl = sceneViewerUrl[1];
                        $.ajax({
                            type: "GET",
                            url: "../../web/scenes/" + sceneViewerUrl + ".json",
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            async: false,
                            success : function (json) {
                                var sceneName = json.name;
                                var sceneTag = json.tags[0];
                                var username = json.userName;
                                var description = json.description;
                                $("#scenePortalName").val(sceneName);
                                $("#scenePortalTages").val(sceneTag);
                                $("#scenePortalUser").val(username);
                                $("#scenePortalDescription").val(description);
                            }
                        })
                    }
                })
            } else {
                require(['./portal/savePortalForm'],function(savePortalForm){
                    var savePortalForm = new savePortalForm({
                        sceneModel : me.model,
                        isPCBroswer : me.isPCBroswer
                    });
                    me.parent.addComponent(savePortalForm);
                    me.savePortalForm = savePortalForm;
                    $("#portalTab1").click();
                    savePortalForm.$el.show();
                    var sceneViewerUrl = window.location.href;
                    if(sceneViewerUrl.indexOf('?id=') !== -1) {
                        sceneViewerUrl = sceneViewerUrl.match(/id=(\S*)/);
                        sceneViewerUrl = sceneViewerUrl[1];
                        $.ajax({
                            type: "GET",
                            url: "../../web/scenes/" + sceneViewerUrl + ".json",
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            async: false,
                            success : function (json) {
                                var sceneName = json.name;
                                var sceneTag = json.tags[0];
                                var username = json.userName;
                                var description = json.description;
                                $("#scenePortalName").val(sceneName);
                                $("#scenePortalTages").val(sceneTag);
                                $("#scenePortalUser").val(username);
                                $("#scenePortalDescription").val(description);
                            }
                        })
                    }
                });
            }

        },
        portalShare : function() {
            var me = this;
            if(me.sharePortalForm){
                $("#portalTab2").click();
                me.sharePortalForm.$el.show();
            } else {
                require(['./portal/sharePortalForm'],function(sharePortalForm){
                    var sharePortalForm = new sharePortalForm({
                        sceneModel : me.model,
                        isPCBroswer : me.isPCBroswer
                    });
                    me.parent.addComponent(sharePortalForm);
                    me.sharePortalForm = sharePortalForm;
                    $("#portalTab2").click();
                    sharePortalForm.$el.show();
                });
            }

        },
        home : function () {
            viewer.camera.flyTo({
                destination: new Cesium.Cartesian3.fromDegrees(110.60396458865515,34.54408834959379,30644793.325518917),
                duration: 5
            });
        },
        login : function (event) {
            window.reCallBack = function(){
                window.location.href = window.location.href;
            };

            var loginURL = "../../web/login?popup=true";
            SuperMapSSO.setLoginUrl(loginURL);
            SuperMapSSO.doSynchronize("reCallBack");
            SuperMapSSO.doLogin("reCallBack");
            if(event && event.preventDefault){
                event.preventDefault();
            }else{
                window.event.returnValue = false;
            }
            return false;
        },
        toggleFullscreen: function() {
            if (document.fullscreenElement) { // 存在全屏状态下的节点
                Utils.exitFullscreen();
            } else {
                Utils.launchFullscreen(document.documentElement);
            }
        }
    });
    return portalForm;
});
