Support.Me.LoginView = Ember.View.extend({
    templateName: "Login",    
    passwordBinding: 'controller.password',
    userNameBinding: 'controller.userName',
    errorMsgBinding: 'controller.errorMsg',
    isRememberPasswordBinding: 'controller.isRememberPassword',
    didInsertElement: function () {
        this.addObserver('controller.isValid', this.onLoginValidator);
    },
    remove: function () {
        this._super();
        this.removeObserver('controller.isValid', this.onLoginValidator);
    },
    onLoginValidator: function () {
        //we force template render error when data invalid        
        $('#frmlogin input[type!=checkbox]').valid();
    }
});
Em.TEMPLATES["Login"] = Em.Handlebars.compile(
'<div id="login-bk">'+    
'    <h1>'+
 '   <p>   '     +
        
 '   </p>'+
 '   </h1>'+
'<div id="login-screen">   '+
    '<form id="frmlogin" class="form-horizontal">'+
        '<p><span class="error">{{view.errorMsg}}</span></p>'+
      '<div class="control-group">'+
        '<label class="control-label" for="inputEmail">{{language.labelEmail}}</label>'+
        '<div class="controls">'+
            '{{view Ember.TextField valueBinding="view.userName" placeholderBinding="language.labelEmail" name="inputEmail" class="required email"}}'+
        '</div>'+
      '</div>'+
      '<div class="control-group">'+
        '<label class="control-label" for="inputPassword">{{language.labelPassword}}</label>'+
        '<div class="controls">'+
          '{{view Ember.TextField action="onLogin" valueBinding="view.password" name="inputPassword" type="password" placeholderBinding="language.labelPassword" class="required password"}}'+
        '</div>'+
      '</div>'+
      '<div class="control-group">'+
        '<div class="controls">'+
          '<label class="checkbox">'+
            '{{view Ember.Checkbox checkedBinding="view.isRememberPassword"}} {{language.labelRememberMe}}'+
          '</label>'+
            '{{#if controller.isLoading}}'+
            '<button type="button" disabled="disabled" class="btn btn-success" {{action onLogin}}>{{language.labelSignIn}} <img src="../themes/bootstrap/img/38-1.gif" /></button>'+
            '{{else}}'+
            '<button type="button" class="btn btn-success" {{action onLogin}}>{{language.labelSignIn}}</button>'+
            '{{/if}}'+
'        </div>'+
      '</div>'+
    '</form>'+
'</div>'+
'</div>');