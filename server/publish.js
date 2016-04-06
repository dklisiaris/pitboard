Meteor.publish('races', function() {  
  return Races.find({});
});

Meteor.publish('userData', function() {
  if(this.userId) {
    return Meteor.users.find(this.userId);
  }
});