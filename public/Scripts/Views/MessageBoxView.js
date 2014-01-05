Support.Me.MessageBoxView = Ember.View.extend({
    templateName:"MessageBox",
    buttons: null,
    message: '',
    labelTitle: '',
    didInsertElement: function () {
        $('#msgBoxId').modal('show');
    },
    remove: function () {
        $('#msgBoxId').modal('hide');
        this._super();
    },
    onClick: function (event) {
        if (event.context && event.context.callback) {
            event.context.callback();
            if (!event.context.isRemove || event.context.isRemove)
                this.remove();
        } else {
            this.remove();
        }
        
    }
});
Em.TEMPLATES["MessageBox"] = Em.Handlebars.compile(
'<div id="msgBoxId" data-backdrop="static" class="modal fade">'+
  '<div class="modal-header">'+
    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
    '<h3>{{labelTitle}}</h3>'+
  '</div>'+
  '<div class="modal-body">'+
    '<p>{{message}}</p>'+
  '</div>'+
  '<div class="modal-footer">'+
      '{{#each buttons}}'+
        '{{#if isPrimary}}'+
            '<a href="#" {{action onClick this}} class="btn btn-{{unbound class}}">{{caption}}</a>'+
        '{{else}}'+
            '<a href="#" {{action onClick this}} class="btn">{{caption}}</a>'+
        '{{/if}}'+
      '{{/each}}'+
  '</div>'+
'</div>'
);