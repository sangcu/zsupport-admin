Support.Me.OperatorBoardView = Ember.View.extend({
    templateName:'OperatorBoard',
    onAddLine:function(){        
        
        Ember.run.scheduleOnce('afterRender', this, 'processLayout');

    }.observes('controller.content.messages.@each.lines.length'),
    processLayout:function(){
        $('.chat-content')[0].scrollTop=$('.chat-content')[0].scrollHeight - $('.chat-content')[0].clientHeight;        
    }
});

Support.Me.OperatorHomeView = Ember.View.extend({
    templateName:'OperatorHome'    
});
Em.TEMPLATES["OperatorHome"] = Em.Handlebars.compile("<center><h3 class='warn-text'>You haven't tickets now!</h3></center>");
Em.TEMPLATES["OperatorBoard"]=Em.Handlebars.compile(
'<div class="well board">'+
    '<ul class="breadcrumb">'+      
      '<li><span>ID#{{content.ticket}}</span><span class="divider">|</span><a href="#" {{action onMarkCompleted this}}>{{language.MarkCompleted}}</a> <span class="divider">|</span></li>'+
      '<li><a href="#">{{language.MoreInfo}}</a> <span class="divider">|</span></li>'+
      '<li><a target="_blank" href="http://zsupport.me/GraphicsCard/NVIDIA/GT6200/">{{language.CurrentPage}} <b>Sony PX11</b> </a></li>'+
    '</ul>'+
'<ul class="chat-content">'+
    '{{#each item in messages}}'+
        '{{#if item.isGuest}}'+
            '<li class="guest">'+                
                '<ul>'+
                    '{{#each msg in item.lines}}'+
                        '<li>{{msg}}</li>'+
                    '{{/each}}'+
                '</ul>'+
            '</li>'+
        '{{/if}}'+
        '{{#unless item.isGuest}}'+
            '<li class="owner">'+                
                '<ul>'+
                    '{{#each msg in item.lines}}'+
                        '<li>{{msg}}</li>'+
                    '{{/each}}'+
                '</ul>'+
            '</li>'+
        '{{/unless}}'+
        '{{#if item.isLink}}'+
            '<li class="redirect-link">'+                
                '<a target="_blank" {{bindAttr href=item.link}}>{{item.link}}</a>'+
            '</li>'+
        '{{/if}}'+
    '{{/each}}'+
'</ul>'+
'<div class="input-append">'+
    '{{view Em.TextField action="onSentMessage" valueBinding="controller.chatLineMessage" class="span4" type="text"}}'+
    '<a href="#" {{action onSentMessage this}}><button class="btn" type="button">{{language.Send}}</button></a>'+
     '<div class="btn-group">'+
        '<button class="btn dropdown-toggle" data-toggle="dropdown" tabindex="-1">'+
            '<span class="caret"></span>'+
        '</button>'+
        '<ul class="dropdown-menu">'+
        '<li><a href="#" {{action onRedirect this}}>{{language.Redirect}}</a></li>'+                        
            '<li><a href="#" {{action onEmailSupport this}}>{{language.EmailSupport}}</a></li>'+            
            '<li><a href="#" {{action onBlockTicket this}}>{{language.BlockUser}}</a></li>'+
            
        '</ul>'+
    '</div>'+
'</div>'+
'</div>'+        
'<div class="board-activity well">'+
    '<ul class="breadcrumb">'+      
      '<li>{{language.Activity}}</li>'+
    '</ul>'+
    '<ul class="">'+      
      '<li>Ticket#24 có phản hồi</li>'+
      '<li>Ticket#23 có phản hồi</li>'+
      '<li>Ticket#17 có phản hồi</li>'+
      '<li>Ticket#05 bị ngắt kết nối</li>'+
      '<li>Ticket#05 được kết nối</li>'+
    '</ul>'+
'</div>'+
'</div>'+
//'{{outlet redirect}}'+
'{{#if controller.isRedirect}}'+
    '<div>'+
    '<div id="ticketInProcess" class="modal" data-backdrop="static">'+
        '<div class="modal-header">'+
            '<button {{action "onCloseRedirect"}} type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
            '<h3>{{language.Redirect}}</h3>'+
        '</div>'+
        '<div class="modal-body">'+
        '<span class="readonly-link">http://{{controller.clientAddress}}/</span>'+
        '{{view Ember.TextField valueBinding="controller.redirectLink" class="tb-redirect"}}'+
        '<span class="exam-link"><a target="_blank" {{bindAttr href=controller.fullRedirectAddr}}>{{controller.fullRedirectAddr}}</a></span>'+
        '</div>'+
        '<div class="modal-footer">'+
        '<a href="#" class="btn btn-success" {{action "onAddRedirect"}}>{{language.AddLink}}</a>'+
    '</div>'+
    '</div>'+
'{{/if}}'
);