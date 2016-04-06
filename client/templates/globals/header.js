Template.header.helpers({
  username: function() {
    var username = Meteor.user().username;
    if(!username){
      username = Meteor.user().emails[0].address;
      username = username.substring(0, username.indexOf('@'));
    }
    return username;
  },

  currentRaceId: function() {
    return Meteor.user().currentRaceId;
  }
});