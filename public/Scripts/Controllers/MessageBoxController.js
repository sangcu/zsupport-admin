Support.Me.MessageBoxController = Ember.ObjectController.extend({
    messageView: null,
    ShowMessage: function (title, message, buttons) {
        if (!buttons) {
            buttons = [{
                caption: "OK",
                isPrimary: true,
                class: 'info'
            }];
        }
        var controller = this;
        var view = this.get("messageView");
        if (view)
            view.remove();
        require(['view/messageboxview'], function () {
            view = Support.Me.MessageBoxView.create({
                buttons: buttons,
                message: message,
                labelTitle: title
            });
            controller.set("messageView", view);
            view.append();
        });
    }
});
