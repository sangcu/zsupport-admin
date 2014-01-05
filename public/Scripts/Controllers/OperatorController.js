/*OperatorController*/
Support.Me.OperatorController = Ember.ObjectController.extend({
    content:null,
    needs:['operatorInProcess','application','login'],
    timeoutInProcessKey: 0,
    refreshKey:0,
    inProcess:null,
    inProcessBinding:Ember.Binding.oneWay('controllers.operatorInProcess.tickets'),
    language:null,
    loadTicketInProcess: function () {
        var self=this;
        var inProcess=this.get('inProcess');
        Support.Me.OperatorService.GetInProcess({agent:this.get('controllers.login.loginUserId')},function(tickets){
            
            if(!tickets || tickets.length==0)
                return;

            if(!inProcess){
                inProcess=[];
                self.set('inProcess',inProcess);
            }
            for(var i=0;i<tickets.length;i++){
                var exist=inProcess.filterProperty('ticket',tickets[i].ticket);
                if(!exist || exist.length===0){
                    var newTicket=Em.Object.create(tickets[i]);
                    newTicket.reopen({                        
                        hasMsg:false,
                        onHasMsgChanged:function(){
                            var self=this;
                            setTimeout(function(){
                                self.set('hasMsg',false);
                            },3000);
                            self.set('hasMsg',true);
                        }.property('messages.length')
                    })
                    inProcess.pushObject(newTicket);
                }
            }

        });
    },
    getTicket: function (param) {
        var tickets = this.get("inProcess");
        if (tickets && tickets.length > 0) {
            var ticket = tickets.filterProperty("ticket", param);
            if (ticket && ticket.length > 0)
                return ticket[0];//actually, it just one item in this array (or I exptect :D ).
        }
        return null;
    },
    tickets:[],
    //ticketInQueueBinding:Ember.Binding.oneWay("controllers.application.tickets"),        
    ticketsWait:function(){
        return this.get('tickets').length;
    }.property('tickets.length'),
    onLoad:function(){

        var self=this;        
        
        self.loadTicketInProcess();        
    },
    onPickOut:function(realtime){
        var self=this;

        if(!realtime)
            realtime=this.get('controllers.application.realtime');

        if(realtime){
            realtime.addCbs('pickout',function(data){
                if(data && data.ticket){
                    var tickets= self.get('tickets');
                    if(tickets){
                        var deleted=null;
                        for (var i = tickets.length - 1; i >= 0; i--) {
                            if(tickets[i].ticket===data.ticket){
                                deleted= tickets[i];
                                break;
                            }
                        };
                        if(deleted)
                            tickets.removeObject(deleted);
                    }
                }
            },'ticket-pk');
        }
    },
    onLeave:function(realtime){        
        if(realtime)
            realtime.removeCbs('pickout','ticket-pk');        
    },
    onPing:function(realtime){
        var self=this;
        realtime.addCbs('ping',function(data){
            var tickets=self.get('tickets');
            var process=self.get('inProcess');
            
            if(!process)
                return;

            var result = process.filterProperty("ticket", data.ticket);

            //now we are working with it            
            if(!result){
                //if we don't working with it then add it to queue
                result = tickets.filterProperty("ticket", data.ticket);

            }
            //in here, ticket not in either process and queue then add it to Queue
            if(!result)
                tickets.pushObject(Ember.Object.create(data));

            var ticket=null;
            if(result && result.length>0)
                ticket=result[0];

            if(ticket)
                ticket.set('timestamp',data.timestamp);

        },'operdoping');
    }    
});