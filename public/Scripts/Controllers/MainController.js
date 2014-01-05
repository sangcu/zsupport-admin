Support.Me.MainController = Ember.ObjectController.extend({    
    needs:['application'],
    msgBoxController: null,    
    operatorController: null,
    navMenuController: null,
    loginController:null,    
    StartView: function () {
        var self = this;        
    },
    StartApp: function () {        
        this.LoadBaseLibrary();                                
    },
    StartOperator: function () {
        var self = this;
        require(['controller/operatorcontroller'], function (operator) {
            self.set("operatorController", operator);
            self.get("operatorController").Start();
        });
    },
    LoadBaseLibrary: function () {
        //load message box templates
    }
});