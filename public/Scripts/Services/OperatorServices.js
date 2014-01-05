Support.Me.OperatorService = {
    LoadTicketsInQueue: function (callback) {
        ZProject.Common.GetAjax('Operators/Queues', callback);
    },
    PickTicket: function (request, successCallback, errorCallback) {        
        ZProject.Common.PostAjax('Operators/Pick', request, successCallback, errorCallback);
    },
    SentMessage: function (message, successCallback, errorCallback) {
        ZProject.Common.PostAjax('Tickets/Sent', message, successCallback, errorCallback);
    },
    GetTicketMessage: function (tickets, successCallback, errorCallback) {
        ZProject.Common.PostAjax('/ticket', tickets, successCallback, errorCallback);
    },
    CloseSession: function (ticketId,successCallback,errorCallback) {
        ZProject.Common.PostAjax('Operators/Session/Close', ticketId, successCallback, errorCallback);
    },
    GetInProcess: function (data,successCallback, errorCallback) {
        ZProject.Common.PostAjax('/actives',data, successCallback, errorCallback);
    },
    GetMessages: function (ticket, successCallback, errorCallback) {
        ZProject.Common.PostAjax('Tickets/Messages', ticket, successCallback, errorCallback);
    }
};