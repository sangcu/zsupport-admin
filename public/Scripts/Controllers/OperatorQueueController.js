Support.Me.OperatorQueueController = Ember.ArrayController.extend({
    needs:['operator','operatorInProcess','application'],
    ticketsBinding: Ember.Binding.oneWay('controllers.operator.tickets'),
    realtimeBinding:Ember.Binding.oneWay('controllers.application.realtime'), 
    language: null,
    errorMessage:null,
    isEmpty: Ember.computed(function () {
        var tickets = this.get("tickets");
        console.log(tickets);

        return (tickets != null ? tickets.length == 0 : true);
    }).property('tickets.length'),
    resetContent: function () {
        this.set("errorMessage", null);
    },
    pickItem: function (model,callback) {
        var self = this;
        var realtime=this.get('realtime');        

        if (!model || !realtime)
            return false;      

        $('#ticketQueue').showLoading();
        
        if(realtime){
            console.log('ah ha, realtime is available');
            
            realtime.emitEvent('pick',model,function(res){
                if(res && res.status===1){

                    $('#ticketQueue').hideLoading();        

                    var inprocess=self.get('controllers.operatorInProcess');
                    var ticket=Em.Object.create({
                        ticket:model.ticket,
                        messages:[],
                        timestamp:model.timestamp
                    });
                    if(inprocess)
                        inprocess.get('tickets').pushObject(ticket);

                    if(callback)
                        callback();
                }
            });
        }
    },
    /*This function will fire notify to update timer on queue's screen. Call in didInsertElement of View*/
    onRefresh:function(){
        console.log('refresh');
        var self=this;
        self.refreshKey = setInterval(function(){
            var tickets=self.get('tickets');
            if(tickets && tickets.length>0){
                for(var i=0;i<tickets.length;i++){
                    tickets[i].notifyPropertyChange('timestamp');
                }
            }
        },5000);
    },
    /*To release interval key, call in remove of View*/
    clearRefresh:function(){ 
        console.log('releae');
        clearInterval(this.refreshKey);
        this.set('refreshKey',0);
    }
    
});