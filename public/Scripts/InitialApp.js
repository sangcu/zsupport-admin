var Support = {};
/*Base Class*/
Support.Base={};
Support.Base.Route=Ember.Route.extend({          
    redirect:function(){
        var login = this.controllerFor("login");
        if (!login.isLogin())
        {
            var app = this.controllerFor('application');
            app.set('loginReturnPath',this.get('routeName'));
            this.transitionTo("login");
            return false;
        }
        return true;
    },
});

Support.Me = Ember.Application.create({
    loginReturnPath:null,    
});
Support.Me.ApplicationController = Ember.Controller.extend({
    needs:['operator','login'],
    language: null,    
    totalTicketsBinding:'controllers.operator.tickets.length',
    ticketsBinding:'controllers.operator.tickets',
    realtime:null,
    ticketsCb:function(data){
        var app=Support.Me.Router.router.getHandler('application').controller;
        if(data && data.ticket&&app){
            app.set('totalTickets',app.get('totalTickets')+1);
            app.get('tickets').pushObject(Ember.Object.create(data));
        }
    },
    onRealtime:function(){
        var self=this;
        if(self){
            var realtime=self.get('realtime');
            var operator=self.get('controllers.operator');
            if(realtime){
                realtime.removeCbs('tickets','operticket');
                realtime.addCbs('tickets',self.ticketsCb,'operticket');
                operator.onPickOut(realtime);                
                operator.onPing(realtime);
            }
        }
    }.observes('realtime'),
    init: function () {
        this.set("language", Support.Me.NavLanguageModel.create());
        this.set("totalTickets", 0);
        var login = this.get('controllers.login');
        if(login.isLogin())
            this.startRealtime();
    },    
    startRealtime:function(){        
        this.set('realtime',new Support.Me.RealTimeService(ZProject.RServer,ZProject.Token,ZProject.AppId));
    },
    isSupport: null
});
Support.Me.ApplicationView = Ember.View.extend({    
});
var ZProject = {
    AppId: null,
    //RServer:'http://api.zsupport.me:8000/',
    //Server: 'http://api.zsupport.me/',
    RServer:'http://api.zsupport.me:8080/',
    Server: 'http://api.zsupport.me:8080/',
    xhrCrossdomain: null,
    ApiVersion: 'v01',
    Token: '',
    realtime:null,
    Init: function () {
        //init easyXDM here
        this.xhrCrossdomain = new easyXDM.Rpc({
            remote: this.Server + "/easyxdm/cors/index.html",
        }, {
            remote: {
                request: {}
            }
        });                
    }
};