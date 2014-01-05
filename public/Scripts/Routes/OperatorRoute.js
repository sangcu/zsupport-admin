Support.Me.OperatorRoute = Support.Base.Route.extend({
    setupController: function (controller) {

        if (controller) {
            controller.set("language", Support.Me.NavMenuOperatorLanguageModel.create());
            
        }
    },
    activate: function () {        
        console.log("enter Operator ");
        //start listening from API
        var appC = this.controllerFor("application");
        appC.set("isSupport", true);        
        var operator = this.controllerFor('operator');
        operator.onLoad();
    },    
    deactivate: function () {
        console.log("exit Operator ");
        //exit listening from API
        var app = this.controllerFor("application");
        var operator = this.controllerFor("operator");

        app.set("isSupport", false);        
        
        if(app.get('realtime'))
            operator.onLeave(app.get('realtime'));
    },
    events: {
        openTicket: function (ticket)
        {
            this.transitionTo("operator.Board", ticket.ticket);
            return false;
        }
    }
});

Support.Me.BoardRoute = Support.Base.Route.extend({
    setupController: function (controller, params) {
        controller=this.controllerFor('operatorBoard');
        controller.set("language", Support.Me.OperatorBoardLanguageModel.create());
        //debugger;
        if (params)
        {
            //internal working to set data for content
            if(params){    
                //Why not params || params.Id
                //Because what we want here is Id of param so that if we got params first, it will be object
                //that is not what we want.
                //don't worries about null exception here, we checked above.

                controller.GetNewMessages(params.Id || params,ZProject.AppId);
            }
        }
        console.log('setup route for board');
        controller.ReleaseBoard();
        controller.InitBoard();
    },    
    activate: function () {
        console.log("Operator Board");
        //start listening from API
    },
    deactivate: function () {
        //exit listening from API
        this.controllerFor('operatorBoard').ReleaseBoard();
        console.log("Deactive Board");
    },
    renderTemplate: function () {        
        this.render("OperatorBoard", { outlet: "content",controller:this.controllerFor('operatorBoard') });
    },
    events: {
        onSentMessage: function ()
        {
            var controller = this.controllerFor("operatorBoard");
            controller.SentMessage();            
        },
        onBlockTicket: function () {
            alert('block');
        },
        onMarkCompleted: function () {
            var controller = this.controllerFor("OperatorBoard");
            var self = this;
            controller.Close(function () {
                self.transitionTo("operator.Home");
            });
        },
        onMoreInfo: function ()
        {
            alert('More Info');
        },
        onRedirect:function(){
            var controller = this.controllerFor('operatorBoard');
            controller.set('isRedirect',true);
            //this.transitionTo("Board.Redirect",controller.get('content.ticket'));
        },
        onCloseRedirect:function(){
            var controller = this.controllerFor('operatorBoard');
            controller.set('isRedirect',false);    
        },
        onAddRedirect:function(){
          var controller = this.controllerFor('operatorBoard');
            controller.set('isRedirect',false);      
            controller.addRedirectLink();
        }
    }
});

Support.Me.OperatorInProcessRoute = Support.Base.Route.extend({
    setupController: function () {

        var controller=this.controllerFor("operatorInProcess");
        controller.set("language", Support.Me.OperatorInProcessLanguageModel.create());
        controller.set("operatorController",this.controllerFor("operator"));
        
    },
    enter: function () {
        console.log("Operator InProcess");
        //start listening from API
    },
    exit: function () {
        //exit listening from API
    },
    renderTemplate: function () {
        var self = this;
        //load templates        
        Support.Me.Helper.LoadTemplate("OperatorInProcess", function () {
            self.render("operatorInProcess", {outlet:"content"});
        });
    },
    events: {
        onHideDialog: function () {
            this.transitionTo('operator.Home');
        }
    }
});


Support.Me.OperatorQueueRoute = Support.Base.Route.extend({
    setupController: function () {
        var controller=this.controllerFor("OperatorQueue");      
        var operator = this.controllerFor("Operator");
        controller.set("language", Support.Me.OperatorQueueLanguageModel.create());
        controller.set("operatorController", operator);
    },
    activate: function () {
        console.log("Operator Queue");
        //start listening from API
    },
    deactivate: function () {
        //exit listening from API
    },
    renderTemplate: function () {
        var self = this;
        //load templates        
        Support.Me.Helper.LoadTemplate("OperatorQueue", function () {
            self.render("OperatorQueue", { outlet: "content" });
        });
    },
    events: {
        onHideDialog: function () {
            this.transitionTo('Operator.Home');
        },
        onPickItem: function (ticket) {
            var self = this;
            console.log("pick ticket");
            var controller = this.controllerFor("OperatorQueue");
            if (controller) {
                var request = {
                    ticket: ticket.ticket,
                    agent: this.controllerFor("login").get("loginUserId"),
                    timestamp: new Date().getTime()
                };
                controller.pickItem(request, function () {                    
                    self.transitionTo("Board", ticket.ticket);
                });
            }
        }
    }
});


Support.Me.OperatorHomeRoute = Support.Base.Route.extend({
    activate: function () {
        console.log("Operator Home");        
    },
    exit: function () {
        //exit listening from API
    },
    renderTemplate: function () {
        var self = this;
        self.render("OperatorHome", { outlet: "content" });
    }
});
