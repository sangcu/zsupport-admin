Support.Me.CustomizeRoute = Support.Base.Route.extend({
	setupController:function(controller)    {
		if(controller)
			controller.set('language',Support.Me.CustomizeLanguageModel.create());
	}
});

Support.Me.SettingRoute = Ember.Route.extend({
	setupController:function(controller)    {
		
		if(controller)
			controller.set('language',Support.Me.SettingLanguageModel.create());

	}
});

Support.Me.CustomizeGalleryRoute = Support.Base.Route.extend({

});
Support.Me.CustomizeCustomRoute = Support.Base.Route.extend({

});