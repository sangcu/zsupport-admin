Support.Me.SettingView = Ember.View.extend({
	template:'Setting',			

	didInsertElement:function(){

	}
});
Em.TEMPLATES["Setting"] = Em.Handlebars.compile(
'<div>'+
	'<div class="container container-fluid">'+
	  	'<div class="row-fluid">'+
	    	'<div class="well span12">'+		    		
					  '<div class="span12">'+
					  '<form class="customizer form-horizontal">'+
	    				'<fieldset>'+
			    		'<legend>{{language.Settings}}</legend>'+
					  		'<div class="control-group">'+
						    '<label class="control-label" for="workingTime">{{language.WorkingTime}}</label>'+
						    '<div class="controls">'+
						      '<input type="text" id="workingTime" placeholder="Ex: 8 - 20">'+
						    '</div>'+
						  '</div>'+
						  '<div class="control-group">'+
						    '<label class="control-label" for="optionOffline">{{language.BehaviouWhenOffline}}</label>'+
						    '<div class="controls">'+
						      '{{view Ember.Select id="optionOffline" contentBinding="offlineOption"}}'+
						    '</div>'+
						  '</div>'+						  
						  '</fieldset>'+
						'</form>'+				
					  '</div>'+
					  
					  '<div class="span12 custom-span12">'+
					  	'<form class="customizer form-horizontal">'+
			    			'<fieldset>'+
					    		'<legend>{{language.Agents}}</legend>'+
					    		'<table class="table table-condensed">'+
					              '<thead>'+
					                '<tr>'+
					                  	'<th>#</th>'+
					                  	'<th>{{language.colName}}</th>'+
					                  	'<th>{{language.colRoles}}</th>'+
					                  	'<th>{{language.colAlias}}</th>'+
					                  	'<th>{{language.colAvatar}}</th>'+
					                  	'<th></th>'+
					                '</tr>'+
					              '</thead>'+
					              '<tbody>'	+				                
					                '<tr>'+
					                  '<td>2</td>'+
					                  '<td>Jes</td>'+
					                  '<td>Administrator</td>'+
					                  '<td>Jes Lam</td>'+
					                  '<td>a.v.t</td>'+
					                  '<td><button class="btn-mini btn btn-danger" type="button"><i class="icon-white icon-remove"></i>{{language.Delete}}</button> '+
					                  		'<button class="btn-mini btn btn-warning" type="button"><i class="icon-white icon-edit"></i>{{language.Edit}}</button>'+
					                  '</td>'+
					                '</tr>'+
					                '<tr>'+
					                  '<td>3</td>'+
					                  '<td>Alex</td>'+
					                  '<td>Agent</td>'+
					                  '<td>Alex</td>'+
					                  '<td>a.v.t</td>'+
					                  '<td><button class="btn-mini btn btn-danger" type="button"><i class="icon-white icon-remove"></i>{{language.Delete}}</button> '+
					                  		'<button class="btn-mini btn btn-warning" type="button"><i class="icon-white icon-edit"></i>{{language.Edit}}</button>'+
					                  '</td>'+
					                '</tr>'+
					              '</tbody>'+
					            '</table>'+
					            '<button class="btn btn-primary" type="button">{{language.AddAgent}}</button>'+
						  	'</fieldset>'+
						'</form>'+
					  '</div>'+				  	
	  		'</div>'+
		'</div>'+
	'</div>'+
'</div>'
);