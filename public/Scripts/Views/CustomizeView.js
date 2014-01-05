Support.Me.CustomizeView = Ember.View.extend({
	template:'Customize',			
	styleHeader:function(){
		var bk='background-color:'+this.get('controller.config.headerBackground');
		var fg=';color:' +this.get('controller.config.headerForeground');
		return bk + fg;
	}.property('controller.config.headerBackground','controller.config.headerForeground'),	
	styleTextColor:function(){
		return 'color:' + this.get('controller.config.textColor');
	}.property('controller.config.textColor'),
	styleGuest:function(){
		return 'background-color:' + this.get('controller.config.guestColor');
	}.property('controller.config.guestColor'),
	styleAgent:function(){
		return 'background-color:' + this.get('controller.config.agentColor');
	}.property('controller.config.agentColor'),
	styleBackgroundChatColor:function(){
		return 'background-color:' + this.get('controller.config.chatBackgroundColor');
	}.property('controller.config.chatBackgroundColor'),
	didInsertElement:function(){
		//$('#element').popover('show');
	}
});
Em.TEMPLATES["Customize"] = Em.Handlebars.compile(
	'<div>'+
	'<div class="container container-fluid">'+
	  '<div class="row-fluid">'+
	    '<div class="well span8">'+
	      '<form class="customizer form-horizontal span5">'+
			  '<fieldset>'+
			    '<legend>{{language.LayoutOption}}</legend>'+
			    '<div class="control-group">'+
			    	'<label class="control-label">{{language.HeaderBackground}}</label>'+			    
			    	'{{view ZSupport.ColorView selectedColorBinding="config.headerBackground"}}'+
			    '</div>'+
			    '<div class="control-group">'+
			    	'<label class="control-label">{{language.HeaderForeground}}</label>'+			    
			    	'{{view ZSupport.ColorView selectedColorBinding="config.headerForeground"}}'+
			    '</div>'+			    
			    '<div class="control-group">'+
			    	'<label class="control-label">{{language.TextColor}}</label>'+			    
			    	'{{view ZSupport.ColorView selectedColorBinding="config.textColor"}}'+
			    '</div>'+
			    '<div class="control-group">'+
			    	'<label class="control-label">{{language.AgentColor}}</label>'+			    
			    	'{{view ZSupport.ColorView selectedColorBinding="config.agentColor"}}'+
			    '</div>'+
			    '<div class="control-group">'+
			    	'<label class="control-label">{{language.GuestColor}}</label>'+			    
			    	'{{view ZSupport.ColorView selectedColorBinding="config.guestColor"}}'+
			    '</div>'+
			    '<div class="control-group">'+
			    	'<label class="control-label">{{language.BackgroundColor}}</label>'+			    
			    	'{{view ZSupport.ColorView selectedColorBinding="config.chatBackgroundColor"}}'+
			    '</div>'+			    
			    '<div class="control-group group-input">'+
			    	'<label class="control-label">{{language.Width}}</label>'+			    
			    	'<input type="text" class="input-small" type="number"">'+
			    '</div>'+
			    '<div class="control-group group-input">'+
			    	'<label class="control-label">{{language.Height}}</label>'+			    
			    	'<input type="text" class="input-small" type="number">'+
			    '</div>'+			    			    			    
			  '</fieldset>'+
			'</form>'+
			'<form class="customizer form-horizontal span5">'+
			  '<fieldset>'+
			    '<legend>{{language.LanguageAndConfig}}</legend>'+
				    '<ul class="nav nav-tabs" id="myTab">'+
					  '<li class="active"><a href="#online" data-toggle="tab">{{language.Online}}</a></li>'+
					  '<li><a href="#offline" data-toggle="tab">{{language.Offline}}</a></li>'+
					'</ul>'+
					'<div class="tab-content">'+
					  	'<div class="tab-pane active" id="online">'+
						    	'<label>{{language.HeaderText}}</label>'+			    
						    	'{{view Ember.TextField valueBinding="config.languageHeaderText"}}'+			    
							    '<label>{{language.InputInfoText}}</label>'+			    
							    '{{view Ember.TextField valueBinding="config.languageInputText"}}'+			    
							    '<label>{{language.EmptyMessage}}</label>'+			    
							    '{{view Ember.TextArea valueBinding="config.languageEmptyText"}}'+
							    '<label>{{language.ConnectingMessage}}</label>'+			    
							    '{{view Ember.TextField valueBinding="config.languageConnectingText"}}'+
							    '<label>{{language.ConntectedMessage}}</label>'+			    
							    '{{view Ember.TextField valueBinding="config.languageConnectedText"}}'+
				  		'</div>'+
				  		'<div class="tab-pane" id="offline">'+				  			
						    	'<label>{{language.HeaderText}} 2</label>'+
						    	'{{view Ember.TextField valueBinding="config.languageHeaderText"}}'+			    
							    '<label>{{language.InputInfoText}}</label>'+			    
							    '{{view Ember.TextField valueBinding="config.languageInputText"}}'+			    
							    '<label>{{language.EmptyMessage}}</label>'+			    
							    '{{view Ember.TextArea valueBinding="config.languageEmptyOfflineText"}}'+
							    '<label>{{language.Email}}</label>'+			    
							    '{{view Ember.TextField valueBinding="config.languageEmailText"}}'+
							    '<label>{{language.SentSuccessful}}</label>'+			    
							    '{{view Ember.TextField valueBinding="config.languageEmailSuccessful"}}'+
				  		'</div>'+
					'</div>'+			    			    
			  '</fieldset>'+
			'</form>'+			
			'<div class="row span12">'+
		  		'<button type="submit" class="btn btn-large btn-danger">{{language.Publish}}</button>'+
			'</div>'+
	    '</div>'+
	    '<div class="well span4">'+	      
	    '<div id="zs-chatbox">'+
		    '<div id="zs-chat-header" {{bindAttr style="view.styleHeader"}}>{{config.languageHeaderText}}</div>'+		    		    	
		    	'<div id="zs-control" {{bindAttr style="view.styleHeader"}}>'+
		    		'<span class="zs-ic-toogle" {{bindAttr style="view.styleHeader"}}></span>'+
	    		'</div>'+
				'<div id="zs-chat-lines" {{bindAttr style="view.styleBackgroundChatColor"}}>'+
						'<div id="zs-line">'+
							'<div id="zs-toash" {{bindAttr style="view.styleTextColor"}}>{{config.languageEmptyText}}</div>'+
							'<ul id="zs-msgs">'+
							'<li own="true" {{bindAttr style="view.styleAgent"}}>Xin chào!</li>'+
							'<li own="false" {{bindAttr style="view.styleGuest"}}>Xin chào!</li>'+
							'</ul>'+
						'</div>'+
				'</div>'+
				'<div id="zs-notify" {{bindAttr style="view.styleBackgroundChatColor"}}>'+
				'</div>'+
				'<input id="zs-chat-input" type="text" {{bindAttr placeholder="config.languageInputText"}}>'+
		    '</div>'+
		'</div>'+
	  '</div>'+
	'</div>'+
	'</div>'
);
