Support.Me.OperatorQueueView = Ember.View.extend({
    templateName: "OperatorQueue",
    didInsertElement:function(){
    	this.get('controller').onRefresh();
    },
    remove:function(){
    	this._super();
    	this.get('controller').clearRefresh();	
    }

});