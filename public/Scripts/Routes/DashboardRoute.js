Support.Me.DashboardRoute = Support.Base.Route.extend({
    setupController: function (controller) {
        controller.set('language',new Support.Me.DashboardLanguageModel());
    },
    activate: function () {
        
    },
    deactivate:function(){

    },
    events: {        
    }
});