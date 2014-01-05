Support.Me.LoginRoute = Ember.Route.extend({
    setupController: function (controller) {
        this.controllerFor("login").set("language", Support.Me.LoginLanguageModel.create());
        this.controllerFor("login").set("mainController", this.controllerFor("main"));
    },
    activate: function () {        
    },
    events: {
        onLogin: function () {

            var router = this;
            var login = this.controllerFor("login");

            login.Login(function (result) {
                if (result){
                    var app =router.controllerFor('application');
                    router.transitionTo(app.get('loginReturnPath'));
                    app.startRealtime();
                }
            });

        }
    }
});