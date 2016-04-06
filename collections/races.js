Races = new Mongo.Collection('races');

RacesSchema = new SimpleSchema({
  raceId: {
    type: Number,
    label: "Secret code"
  },
  code: {
    type: Number,
    label: "Secret code"
  },
  board: {
    type: Array,
    label: "Pit board"
  },
  "board.$": {
    type: String,
    label: "Pit board line"
  },
  token: {
    type: String,
    label: "Secret token"
  },
  runOnMobile: {
    type: Boolean,
    label: "Can app run on mobile",
    defaultValue: true
  },
  createdBy: {
    type: String,
    label: "Race Owner"
  },
  createdAt: {
    type: Date,
    label: "Date of creation",
    autoValue: function() {
      if ( this.isInsert ) {
        return new Date();
      } 
    }
  }
});

Races.attachSchema(RacesSchema);

Meteor.methods({
  createRace: function(creatorId){
    return Races.insert(newRaceObject(creatorId));
  },
  updateRace: function(raceId, data) {
    Races.update(raceId, data);
  },
  resetRace: function(raceId, creatorId) {
    // Create a new race object
    var resetedRace = newRaceObject(creatorId);
    // Keep old race id
    resetedRace.raceId = Races.findOne(raceId).raceId;
    // Update race with new object
    return Races.update(raceId, {$set: resetedRace});
  },
  editBoard: function(raceId, board) {
    Races.update(raceId, {$set: {board: board}});
  },
  toggleMobile: function(raceId){
    var allowMobile = Races.findOne(raceId).runOnMobile;
    Races.update(raceId, {$set: {runOnMobile: !allowMobile}});
    return !allowMobile;
  }

});

var newRaceObject = function(creatorId){
  if(Meteor.userId()){
    creatorId = Meteor.userId();
  }

  do {
    var randomRaceId = Math.floor(Math.random() * 900000000) + 100000000;
  }
  while (Races.find({raceId: randomRaceId}).count() !== 0);

  var raceObject = {
    raceId: randomRaceId,
    code: Math.floor(Math.random() * 9000) + 1000,
    board: ['P 19','- 0.0','+ 0.0','L 01'], 
    token: Random.secret(),
    runOnMobile: true,
    createdBy: creatorId,
    createdAt: new Date()
  }

  return raceObject;
}