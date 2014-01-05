Support.Me.RealTimeService=function(url,token,app){
	var self=this;
	self.socket=io.connect(url + 'liveserver?token='+token+'&app='+app,{resource:"channel"});	
	self.events=function(){
		self.socket.on('connect', function (){
	  		console.info('successfully established a working connection \o/');			  
	  		self.emitEvent('repick',{agent:$.cookie('oauthuz')})
	  		//join into app's room
	  		self.socket.emit('onJoin',{appid:app});
	  		self.fireEvents('connect');
		});
		self.fireEvents=function(event,data){
			console.log('fire event ' + event );
			if(self.connectCbs[event]){
	  			var leng=self.connectCbs[event].length;
		    	for(var i=0;i< leng;i++){
		    		
		    		var cbCaller = self.connectCbs[event][i];

		    		if(cbCaller && cbCaller.c)
		    			cbCaller.c(data);
		    	}
		    }
		    console.log(data);
		};
		self.socket.on('connect_failed', function (reason) {
		    self.fireEvents('connect_failed',data);
	  	});
	  	self.socket.on('connection', function (data) {
		    self.fireEvents('connection',data);
	  	});
	  	self.socket.on('msg',function(data,cb){
	  		//sent back to server
	  		if(cb)
	  			cb('true');
	  		self.fireEvents('msg',data);

	  	});	
	  	self.socket.on('tickets',function(data){
	  		self.fireEvents('tickets',data);
	  	});	
	  	self.socket.on('pickout',function(data){
	  		self.fireEvents('pickout',data);
	  	});		  	
	  	self.socket.on('ping',function(data){
	  		self.fireEvents('ping',data);
	  	});
	};
	self.connectCbs=new Array();

	self.addCbs=function(type,cb,key){
		if(self.connectCbs[type]){
			self.connectCbs[type].push({k:key,c:cb});
		}else{
			self.connectCbs[type] = new Array();
			self.connectCbs[type].push({k:key,c:cb});
		}
	};
	self.removeCbs=function(type,key){
		if(self.connectCbs[type]){
			var index=-1;
			for(var i=0;i<self.connectCbs[type].length;i++){
				if(self.connectCbs[type][i] && self.connectCbs[type][i].k===key){
					index=i;
					break;
				}
			}			
			if(index>=0)
				delete self.connectCbs[type][index];
		}
	}
	self.emitEvent=function(event,data,cb){
		self.socket.emit(event,data,cb);
	}	
	self.events();
}