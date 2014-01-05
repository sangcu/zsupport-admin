//Begin routing application
Support.Me.Router.map(function () {
    var self = this;
    this.resource("Operator", function () {        
        this.route("InProcess");
        this.route("Queue");
        this.route("Home");
        this.resource("Board", { path: '/Board/:Id' },function(){
        });      
    });
    
    this.resource("Customize", function () {
        this.route("Board");
        this.route("Gallery");
        this.route("Custom");
    });  
    this.route("Main", { path: "/" });
    this.route("login");    
    this.route('Dashboard',{path:"/Dashboard"});
    this.route('Setting');
});
Support.Me.Router.reopen({
    location:'history'
});
moment.lang('vi',{relativeTime:Support.Me.MomentLanguageModel});
ZProject.Init();

