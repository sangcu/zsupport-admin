Support.Me.OperatorBoardRedirectView = Ember.View.extend({
	templateName:'BoardRedirect'
});
Em.TEMPLATES['BoardRedirect']=Em.Handlebars.compile(
	'<div id="ticketInProcess" class="modal" data-backdrop="static">'+
		'<div class="modal-header">'+
    		'<button {{action "onClose"}} type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
    		'<h3>Redirect</h3>'+
  		'</div>'+
	  	'<div class="modal-body">'+
	  	'</div>'+
	  	'<div class="modal-footer">'+
	    '<a href="#" class="btn btn-success" {{action "onAdd"}}>Add</a>'+
  	'</div>'
);