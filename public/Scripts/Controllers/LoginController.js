/*StartupController*/
Support.Me.LoginController = Ember.ObjectController.extend({
    loginUserId:null,
    mainController:null,
    language: null,
    isRememberPassword: true,
    password: '',
    userName: '',
    errorMsg: null,
    isValid: true,
    isLoading: false,
    init: function () {
        this.set("isLoading", false);
    },
    showLogin: function () {
        //ZProject.Token = null;
        //Support.Me.MainController.supportLogin.SupportId = null;
        var self = this;
        Support.Me.Helper.LoadTemplate("Login", function () {
            var view = self.get("view");
            if (!view) {
                view = Support.Me.LoginView.create({ controller: self });
                self.set("view", view);
            }
            view.append();
        });

        
    },
    closeLogin: function () {
        if (ZProject.Token && Support.Me.MainController.supportLogin.SupportId)
        {
            this.get("view").remove();
        }
    },
    isLogin: function () {
        var isAuth = false;
        if ($.cookie('oauthzs'))
        {                                       
            ZProject.Token = $.cookie('oauthzs');
            isAuth = true;
        }
        if ($.cookie('oauthuz')) {
            this.set("loginUserId", $.cookie('oauthuz'));
            ZProject.AppId = $.cookie('oapp');
            isAuth = isAuth && true;
        }
        return isAuth;
    },
    Login: function (callback) {

        var username = this.get("userName");
        var password = this.get("password");

        if (!username || username.length == 0 || !password || password.length == 0) {
            this.set("isValid", false);
            return;
        }

        this.set("isValid", true);
        this.set("isLoading", true);
        var ctr = this;
        var failed = function (message) {

            ctr.set("errorMsg", message);
            ctr.set("isLoading", false);
            callback(false, message);
        };
        var susses = function (auth) {
            ctr.set("isLoading", false);
            if (auth) {
                ZProject.Token = auth.token;
                ctr.set("loginUserId", $.cookie('oauthuz'));
                ZProject.AppId=auth.appId;
                //start App
                ctr.get("mainController").StartApp();                
                if (ctr.get("isRememberPassword")) {
                    //set token/userid to cookie
                    $.cookie('oauthzs', auth.token, { expires: 7,path:'/' });
                    $.cookie('oauthuz', auth.supportId, { expires: 7,path:'/' });
                    $.cookie('oapp',auth.appid,{expires:7,path:'/'});
                }
                callback(true);                
            } else {                                
                callback(false);
            }            
        };
        
        Support.Me.ApplicationService.Login(username, password, susses, failed);
    }
});
