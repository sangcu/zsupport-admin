Support.Me.ApplicationService = {
   
    Login: function (userName,password, successCallback, errorCallback) {
        var request = {
        	username: userName,
            password: password
        };
        ZProject.Common.PostAjax('/login', request, successCallback, errorCallback);
    }    
};