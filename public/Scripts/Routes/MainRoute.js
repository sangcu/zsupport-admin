Support.Me.MainRoute = Support.Base.Route.extend({
    setupController:function(controller){        
    },
    activate: function (router) {                        
    },
    redirect:function(){
    	if(this._super())
    	{
    		this.transitionTo("Dashboard");
    	}
    },
    events: {
    }
});