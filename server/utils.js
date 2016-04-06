Accounts.onCreateUser(function(options, user) {
  Meteor.call("createRace", user._id, function(err, raceId) {      
    user.currentRaceId = raceId;
  });
  return user;
});