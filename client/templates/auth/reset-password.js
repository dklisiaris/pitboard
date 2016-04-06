var ERRORS_KEY = 'resetPasswordErrors';

Template.resetPassword.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.resetPassword.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.resetPassword.events({
  'submit': function(event, template) {
    event.preventDefault();
    
    var oldPassword = template.$('[name=old-password]').val();
    var password = template.$('[name=password]').val();
    var confirm = template.$('[name=password-again]').val();
    
    var errors = {};

    if (! password) {
      errors.password = 'Password is required';
    }

    if (! oldPassword) {
      errors.oldPassword = 'Old Password is required';
    }

    if (confirm !== password) {
      errors.confirm = 'Passwords do not match';
    }

    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.'
    }
    
    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }
    
    
    Accounts.changePassword(oldPassword, password, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }
      
      Bert.alert('Password Changed!', 'success', 'growl-top-right' );
      Meteor.setTimeout(function(){ FlowRouter.go('home'); }, 10);
    });
  }
});