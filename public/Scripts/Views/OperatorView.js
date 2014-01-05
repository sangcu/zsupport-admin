Support.Me.OperatorView = Ember.View.extend({
    templateName: "Operator",
    onNewTicket: function (event) {
        this.get("controller").OpenQueueTicket();
        return true;
    },
    onInProcess: function (event) {
        //this.get("controller").OpenInProcess();
        ZProject.App.get('router').send('gotoInProcess');
        return true;
    },
    onRearrangeLayout: function () {
        this.get("controller").ArrangeLayout();
    },
    onAdvancedLayout: function () {
        this.get("controller").AdvancedLayout();
    },
    didInsertElement: function ()
    {
        console.log("Main Operator View");
    }
});
Em.TEMPLATES["Operator"] = Em.Handlebars.compile(
'<div>'              +
    '<div id="left-menu"> '+
        '<div class="well sidebar-nav">'+
            '<ul id="main-nav" class="nav-list">					                    '+
                '<li class="active nav-header">'+
	                '{{#linkTo Operator/Queue}}<i class="icon-refresh"></i>{{controller.language.labelNewTicket}}{{/linkTo}} <span class="badge badge-warning">{{controller.ticketsWait}}</span>'+
                '</li>'+
                '<li>'+
                    '<div class="custom-tickets">'+
                            '<ul class="nav-pills">'+
                                '{{#if inProcess}}' +
                                    '{{#each ticket in inProcess}}' +                                    
                                    '<li>'+
                                        '{{#if ticket.hasMsg}}'+
                                            '{{#linkTo Board ticket.ticket}} <span class="badge badge-info">#{{ticket.ticket}}</span>{{/linkTo}}'+
                                        '{{else}}'+
                                            '{{#linkTo Board ticket.ticket}}#{{ticket.ticket}}{{/linkTo}}'+
                                        '{{/if}}'+
                                    '</li>'+
                                    '{{/each}}'+
                                '{{/if}}'                                                                +
                            '</ul>'+
                    '</div>'+
                '</li>'+
            '</ul>'+
        '</div>       '+
    '</div>            '+
    '<div class="right-operator">'+
    //<!--Body content-->
    '{{outlet content}}'+
    '</div>' +
'</div>'
);

