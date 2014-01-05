Support.Me.ChatBoxController = Ember.ObjectController.extend({
    //arrange items in chat box container    
    chatBoxContainerId: '#chat-box',
    chatBoxView: null,
    ticketModel: null,
    language:null,
    newMessage:'',    
    SentMessage: function () {
        var self = this;
        //sent message to server
        var msg = this.get("newMessage");
        if (msg && msg.length > 0) {
            var ticket = this.get("ticketModel");

            var message={
                SenderID: Support.Me.MainController.supportLogin.SupportId,
                TicketID:ticket.TicketID,
                Timestamp:new Date(),
                Content:msg,
                isSupport:true
            };
            ticket.Messages.pushObject(message);
            Support.Me.OperatorService.SentMessage(message, function (result) {
                if (result===false) {

                } else {
                    self.set("newMessage","");
                }
            });
        }
    },
    GetMessages: function () {
        var ticket = this.get("ticketModel");

    },
    ShowChatbox: function () {
        var view = this.get("chatBoxView");
        if (view)
        {
            view.remove();
            view.appendTo(this.get("chatBoxContainerId"));
        }
    },
    RemoveChatbox: function () {
        var childView = Support.Me.MainController.get("operatorController").chatBoxMgrView.get("childViews");
        childView.removeObject(this.get("chatBoxView"));
        Support.Me.MainController.get("operatorController.chatBoxMgrController.chatBoxControllers").removeObject(this);
        //sent command to server
        Support.Me.OperatorService.CloseSession(this.get("ticketModel").TicketID);

    }
});