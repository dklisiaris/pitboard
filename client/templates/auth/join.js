var ERRORS_KEY = 'joinErrors';

Template.join.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.join.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.join.events({
  'submit': function(event, template) {
    event.preventDefault();
    
    var raceId = template.$('[name=race-id]').val();
    var code = template.$('[name=code]').val();
    
    var errors = {};

    if (! raceId) {
      errors.raceId = 'RaceId is required';
    }

    if (! code) {
      errors.code = 'Code is required';
    }
    
    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }
    console.log(raceId + " " + code);
    
    // Meteor.joinWithPassword(email, password, function(error) {
    //   if (error) {
    //     return Session.set(ERRORS_KEY, {'none': error.reason});
    //   }
      
    //   Meteor.setTimeout(function(){ FlowRouter.go('home'); }, 10);
    // });
  }
});