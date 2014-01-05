Support.Me.Helper={};


Support.Me.Helper.LoadTemplate = function (templateName, loadCompletedCallback) {
    if (!Ember || !Ember.TEMPLATES) {
        if (loadCompletedCallback)
            loadCompletedCallback();
        return false;
    }

    if (!Ember.TEMPLATES[templateName]) {
        $.get("/Templates/" + templateName + "Template.html", function (response) {
            Ember.TEMPLATES[templateName] = Ember.Handlebars.compile(response);
            if (loadCompletedCallback)
                loadCompletedCallback();
        });
    } else {
        if (loadCompletedCallback)
            loadCompletedCallback();
    }
};
//structure define
/*
Input:
{
    SenderId:string,
    TicketId:string,
    Content:string,
    Timestamp:Date
}
Output:
array:[{
    isSupport:bool,
    Messages:[]
},]
*/
Support.Me.Helper.GroupMessageBySender = function (content,ticket,isGuest) {    
    if(!ticket.messages){
        ticket.messages=[];
        ticket.messages.pushObject( {isGuest:isGuest, lines:[content]});
    }
    var lastMsg=ticket.messages[ticket.messages.length-1];
    if(lastMsg){

        if(lastMsg.isGuest===isGuest)
            lastMsg.lines.pushObject(content);            
    }
    if(!lastMsg || lastMsg.isGuest !==isGuest ){

        ticket.messages.pushObject({isGuest:isGuest,lines:[content]});
    }    
    ticket.notifyPropertyChange('messages');
}
Support.Me.Helper.AddLinkToMessage = function (link,ticket) {    
    if(!ticket.messages){
        ticket.messages=[];        
    }   

    ticket.messages.pushObject( {isLink:true,link:link});
    ticket.notifyPropertyChange('messages');
}

Ember.Handlebars.registerHelper('timedisplay', function (path, options) {
    var value = '';
    if (path.indexOf('.') >= 0) {
        value = Ember.get(options.data.keywords, path);
    } else
        value = Ember.get(this, path);
    console.log(value);
    var result = $.format.date(value, "dd/MM/yyyy hh:mm");
    return result;
});
