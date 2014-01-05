Support.Me.OperatorInProcessLanguageModel = Ember.Object.extend({
    labelDialogTitle: 'Tickets In Process',
    labelCloseButton: 'Close',
    labelTime: 'Start Time',
    labelMessage: 'Message',
    labelSelect: 'Select',
    labelInforCaption: 'Information',
    labelInforContent: "We don't have any ticket in queue",
    labelAction: "Action",
    labelMenuClose: "Close Ticket",
    labelMenuOpen:"Open Ticket"
});
Support.Me.OperatorQueueLanguageModel = Ember.Object.extend({
    labelDialogTitle: 'Tickets Incoming',
    labelCloseButton: 'Close',
    labelTime: 'Start Time',
    labelMessage: 'Message',
    labelSelect: 'Select',
    labelInforCaption: 'Information',
    labelInforContent: "We don't have any tickets in queue"
});
Support.Me.OperatorBoardLanguageModel = Ember.Object.extend({
    CurrentPage:'Guest is surfing on',
    MarkCompleted:'Mark Completed',
    MoreInfo:'More Info',
    BlockUser:'Block User',
    EmailSupport:'Reply by Email',
    Redirect:'Redirect',
    Send:'Sent',
    AddLink:'Add Link',
    TestLink:'Validate Link',
    Activity:'Activity'
});
Support.Me.DashboardLanguageModel = Ember.Object.extend({
    title:"Fucking Framework",
    TrafficMonitor:'Traffics Monitoring',
    TicketStatus:"Ticket\'s Status",
    EmployeeStatistic:'Employee Statistic',
    Connected:'Connected',
    Drop:'Disconnect',
    Completed:'Sucessful',
    Traffic:'Traffic',
    Year:'Year',
    Day:'Day'
});


Support.Me.CustomizeLanguageModel = Ember.Object.extend({    
    LayoutOption:"Layout Option",
    LanguageAndConfig:"Language and Configuration",
    HeaderBackground:"Header Background",
    HeaderForeground:"Header Foreground",
    TextColor:"Text Color",
    AgentColor:"Agent Color",
    GuestColor:"Guest Color",
    BackgroundColor:"Background Color",
    Width:"Width",
    Height:"Height",
    HeaderText:"Header Text",
    InputInfoText:"Input Info Text",
    EmptyMessage:"Empty Message",
    ConnectingMessage:"Connecting",
    ConntectedMessage:"Connected to ",
    Publish:"Publish"

});

Support.Me.SettingLanguageModel = Ember.Object.extend({    
   Setting:'Settings',
   Agents:'Agents',
   colName:'Name',
   colRoles:'Roles',
   colAlias:'Alias',
   colAvatar:'Avartar',
   Delete:'Delete',
   Edit:'Edit',
   AddAgent:'Add Agent',
   WorkingTime:'Working Time',
   BehaviouWhenOffline:'Behavious when offline'
});
Support.Me.MomentLanguageModel={
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        };