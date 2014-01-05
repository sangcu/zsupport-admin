/*!
Common function in client
*/
ZProject.Common = {
    DeleteAjax: function (url, successCallback, errorCallback) {
        this.ajaxRequest(url, 'DELETE',null, successCallback, errorCallback);
    },
    GetAjax: function (url, successCallback, errorCallback) {
        this.ajaxRequest(url, 'GET', null, successCallback, errorCallback);
    },
    PostAjax: function (url,data,successCallback, errorCallback) {
        this.ajaxRequest(url, 'POST', data, successCallback, errorCallback);
    },
    PutAjax: function (url, data, successCallback, errorCallback) {
        this.ajaxRequest(url, 'PUT', data, successCallback, errorCallback);

    },
    ajaxRequest: function (url, method, data, successCallback, errorCallback) {

        var link = ZProject.Server + ZProject.ApiVersion + url;
        //var contentType = "application/json";

        
        var config = {
            url: link,
            method: method,
            //headers: { "Content-Type": contentType, "otoken": ZProject.Token }, //just work with json data            
        };

        if (data) {
            //data = JSON.stringify(data);
            config.data = data;
        }

        ZProject.xhrCrossdomain.request(config, function (rpcdata) {
            if (rpcdata.status != 200 && errorCallback)
                errorCallback();
            var objData=JSON.parse(rpcdata.data);
            if(objData.status===0){
                errorCallback(objData.data.msg);
            }
            else if (successCallback)
                successCallback(objData.data);
        }, function (error) {
            if (error && error.data && error.data.status)
            {
                if (error.data.status == 401)//unauthentication
                {
                    //move router to login
                    Support.Me.Router.router.transitionTo("Login");
                }
            }
            if (errorCallback)
                errorCallback(error.data != null ? error.data.data : 'An network connection timeout error. Please try again or contact to support');
        }
        );
    }
};
ZsQueue=function(){
    var self=this;
    self.bracket=[];
    self.indexPop=-1;
    this.push=function(item){
        self.bracket.push(item);
    }
    this.deletePop=function(){
        delete self.bracket[self.indexPop];
    }
    this.pop=function(){
        var i=0;
        while(i<self.bracket.length){
            if(self.bracket[i]){
                var rtnObj=self.bracket[i];
                self.indexPop=i;
                return rtnObj
            }else
                i++;
        }        
    }
    this.clear=function(){
        for(var i=0;i<self.bracket.length;i++){
            delete self.bracket[i];    
        }
        self.bracket=[];        
        self.indexPop=-1;
    }
};

var ZsSender=function(){

    var self=this;

    self.messagesQueue=new ZsQueue();
    self.realTime=null;
    self.ackFlag=true;
    self.ttlQueue=null;
    self.ttOut=-1;
    self.SendMessage=function(message){
        self.messagesQueue.push(message);
        self.Runner();
    };
    self.Runner=function(){
        if(!self.ttlQueue || self.ttlQueue<0){
            self.ttlQueue = setInterval(function(){
                    if(self.ttOut>60000){
                        //try to reset counter when timeout
                        self.ttOut=0;
                        self.ackFlag=true;
                    }

                    if(self.ackFlag){
                        var msg=self.messagesQueue.pop();
                        if(!msg){
                            console.log('out of ttl');
                            clearInterval(self.ttlQueue);
                            self.ttlQueue=-1;
                        }else{
                            console.log('pop and sent');
                            console.log(msg);
                            self.realSent(msg);
                        }
                    }else{
                        self.ttOut = self.ttOut+200;
                    }

                },200);
        }
    }
    self.setRealTime=function(realTime){
        self.realTime=realTime;
        self.realTime.addCbs('connect',function(){

            self.ackFlag=true;

        },'operatorboard');
    }
    self.realSent=function(msg){

        if(!msg)
            return;
        // body...
        self.ackFlag=false;
        self.realTime.emitEvent('msg',msg,function(status){
            self.ackFlag=true;
            self.ttOut=0;
            self.messagesQueue.deletePop();
            console.log('get ack');
        });
    }

    self.dispose=function(){
        if(self.messagesQueue){
            self.messagesQueue.clear();
            self.messagesQueue=null;       
        }
        if(self.realTime){
            self.realTime.removeCbs('connect','operatorboard');
            self.realTime=null;
        }
        if(self.ttlQueue>=0)
            clearInterval(self.ttlQueue);

        //what happen here?
        delete this;
    }
};

ZsReceiver=function(ticket){
    var self=this;
    self.ticket=ticket;
    self.messageBracket=[];
    self.ttl=-1;
    self.realTime=null;

    self.setRealTime=function(realTime){
        self.realTime=realTime;
    };

    self.addMesages=function(msg){

        if(msg && msg.timestamp)
            self.messageBracket.push({ticket:msg.ticket,timestamp:msg.timestamp});

        self.Runner();
    };

    self.buildBody=function(){
        
        if(self.messageBracket){
            return self.messageBracket;
        }   
        
        return null;
    };

    self.updateMessage=function(){
        var body=self.buildBody();
        if(body && body.length>0){
            if(self.realTime.emitEvent)
                self.realTime.emit=self.realTime.emitEvent;
                    
            self.realTime.emit('mr',body,function(feedback){
                if(feedback){
                    self.cleanMessages();
                }
            });
        }
    };
    self.cleanMessages=function(){

        if(!self.messageBracket)
            return false;

        for (var i = 0; i < self.messageBracket.length; i++) {
            delete self.messageBracket[i];
        };

        delete self.messageBracket;
        //reset value for bracket
        self.messageBracket=[];
        clearInterval(self.ttl);
        self.ttl=-1;
    };

    self.Runner=function(){
        if(self.ttl<0){
            self.ttl=setInterval(function(){
                self.updateMessage();
            },5000);
        }
    };

    self.dispose=function(){
        clearInterval(self.ttl);
        self.cleanMessages();
        self.realTime=null;
    }
};