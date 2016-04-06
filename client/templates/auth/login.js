var ERRORS_KEY = 'loginErrors';

Template.login.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.login.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.login.events({
  'submit': function(event, template) {
    event.preventDefault();
    
    var user = template.$('[name=user]').val();
    var password = template.$('[name=password]').val();
    
    var errors = {};

    if (! user) {
      errors.user = 'Email or Username is required';
    }

    if (! password) {
      errors.password = 'Password is required';
    }
    
    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }
    
    
    Meteor.loginWithPassword(user, password, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }
      
      Meteor.setTimeout(function(){ FlowRouter.go('home'); }, 10);
    });
  }
});