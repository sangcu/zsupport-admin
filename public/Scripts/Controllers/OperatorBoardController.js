Support.Me.OperatorBoardController = Ember.ObjectController.extend({        
    needs:['application','login','operatorInProcess'],    
    language:null,    
    realtime:null,
    realtimeBinding:Ember.Binding.oneWay('controllers.application.realtime'),    
    inProcess:null,
    inProcessBinding:Ember.Binding.oneWay('controllers.operatorInProcess.tickets'),
    chatLineMessage:'',
    zsSender:null,    
    zsReceiver:null,    
    ackFlag:true,
    ttlQueue:null,
    ttOut:0,
    redirectLink:'',
    clientAddress:'shop.masktour.com',
    fullRedirectAddr:function(){
        return 'http://'+ this.get('clientAddress')+'/'+this.get('redirectLink');
    }.property('redirectLink'),
    GetNewMessages: function (ticketId,appId) {        
        var self=this;
        //checking the new messages        
        Support.Me.OperatorService.GetTicketMessage({ticket:ticketId,appId:appId},function(ticketModel){
            if(ticketModel){
                if(ticketModel.messages){
                    var tickets =self.get('inProcess');
                    var groupMsg=function(tks){

                        if(!tks || tks.length===0)
                            return;

                        var ticket=tks[0];
                        ticket.set("messages",new Array());
                        for (var i = 0;i<ticketModel.messages.length; i++) {
                            if(ticketModel.messages[i]._type)
                                Support.Me.Helper.AddLinkToMessage(ticketModel.messages[i].content,ticket);
                            else
                                Support.Me.Helper.GroupMessageBySender(ticketModel.messages[i].content,ticket,ticketModel.messages[i].owner=='user');
                        };
                        self.set('content',ticket);
                    };
                    if(tickets && tickets.length>0)
                    {

                        groupMsg(tickets.filterProperty('ticket',ticketModel.ticket));
                    }else{
                        //if we're loading in process tickets, should be waiting in time and then keep going.
                        //if waiting more than 10 times we will exit.
                        var irun=0;
                        var runner=function () {
                            // body...
                            irun++;
                            console.log('irun, ' + irun);
                            if(irun>10)
                                return;

                            if(tickets && tickets.length>0)
                                groupMsg(tickets);
                            else
                                setTimeout(runner,500);
                        }
                        runner();
                    }
                        
                }                
            }
        });
    },    
    onMsgComming:function(realTime){

        var self=this;
        realTime.addCbs('msg',function(message){

            if(!message.ticket || !message.content ){
                return;
            }
            var receiver = self.get('zsReceiver');  
            if(receiver)
                receiver.addMesages(message);
            else{
                console.log('receiver null');
                console.log(self);
            }
            var ticket=self.get('content');

            if(!ticket || ticket.ticket!=message.ticket)
                return;

            Support.Me.Helper.GroupMessageBySender(message.content,ticket,true);
            
        },'tk-comming');
    },
    /*When agent visit board, we initial realtime services, receiver, sender for board*/
    InitBoard: function () {
        var self=this;
        var realTime = this.get('realtime');       

        var zsSender= new ZsSender();

        zsSender.setRealTime(realTime);        
        self.set('zsSender',zsSender);
        self.onMsgComming(realTime);

        var zsReceiver = new ZsReceiver();        
        console.log('init receiver');
        zsReceiver.setRealTime(realTime);

        self.set('zsReceiver',zsReceiver);
        
    },
    ReleaseBoard:function(){
        var self=this;
        var sender = self.get('zsSender');        
        if(sender)
            sender.dispose();
        self.get('zsSender',null);
        var realTime=self.get('realtime');
        
        if(realTime)
            realTime.removeCbs('msg','tk-comming');
       var receiver = self.get('zsReceiver');        
        if(receiver)
            receiver.dispose();

        self.get('zsReceiver',null);
    },
    SentMessage: function () {
        var self = this;        
        var sender=this.get('zsSender');        
        //sent message to server
        var msg = self.get("chatLineMessage");
        if (msg && msg.length > 0) {

            var ticket = self.get("content");
            if (ticket === null)
                return;
            var message = {
                sender: self.get('controllers.login.loginUserId'),
                ticket: ticket.ticket,
                timestamp: new Date().getTime(),
                content: msg,
                isSupport: true
            };           
           
            Support.Me.Helper.GroupMessageBySender(msg,ticket,false);

            console.log('message sent');
            self.set("chatLineMessage","");

            sender.SendMessage(message);
            //debugger;
            
        }
    },
    Close: function (callback)
    {
        var self = this;
        Support.Me.OperatorService.CloseSession(this.get("ticket").ticket, function () {
            self.StopQueue();
            callback();
        });
    },
    addRedirectLink:function(){

        var link=this.get('fullRedirectAddr');

        if(!link)
            return;

        var sender=this.get('zsSender');
        var ticket = this.get("content");
        var message = {
            sender: this.get('controllers.login.loginUserId'),
            ticket: ticket.ticket,
            timestamp: new Date().getTime(),
            content: link,
            type:'link',
            isSupport: true
        };
        Support.Me.Helper.AddLinkToMessage(link,ticket);
        sender.SendMessage(message);        
    }
});
Support.Me.OperatorHomeController = Ember.ObjectController.extend();
