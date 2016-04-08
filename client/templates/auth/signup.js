var ERRORS_KEY = 'signupErrors';

Template.signup.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.signup.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  },
  isCordova: function(){
    return Meteor.isCordova;
  }
});

Template.signup.events({
  'submit': function(event, template) {
    event.preventDefault();
    var username = template.$('[name=username]').val();
    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();
    var confirm = template.$('[name=password-again]').val();

    var errors = {};

    if (! email && ! username) {
      errors.email = 'Email or Username required';
    }

    if (! password) {
      errors.password = 'Password required';
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

    Accounts.createUser({
      username: username,
      email: email,
      password: password
    }, function(error, user) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }
      Meteor.setTimeout(function(){ FlowRouter.go('home'); }, 10);
    });


  }
});