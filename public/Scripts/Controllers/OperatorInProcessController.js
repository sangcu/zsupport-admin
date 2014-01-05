Support.Me.OperatorInProcessController = Ember.ObjectController.extend({
    language: null,
    errorMessage: null,
    tickets: [],
    selectedTicket:null,
    onInit: function () {
        var self = this;
    },   
    FindTicket: function (id) {
        var messages = this.get("tickets");

        if (!messages)
            return null;

        var msg = messages.filterProperty("ticket", id);
        return msg;
    },    
    resetContent: function () {
        this.set("errorMessage", null);
    },
    
    closeTicket: function () {
     
        var self = this;
        Support.Me.OperatorService.CloseSession(this.get("selectedTicket").TicketID, function () {
            self.set("selectedTicket", null);
        });
        
    },
    
    StartNewTicket: function (ticket) {
        var self = this;
        var load = function () {

            //init controller
            if (!ticket.Messages)
                ticket.Messages = [];

            //put the first message into Messages            
            ticket.Message.isSupport = false;
            ticket.Messages.pushObject(ticket.Message);
        };        
    }
});
