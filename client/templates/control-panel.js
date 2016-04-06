Template.controlPanel.events({
  "submit .save-race-data": function(event){
    event.preventDefault();
    
    var inputLines = event.target.elements['line[]'];
    var boardLines = [];

    for (var i = 0; i < inputLines.length; i++) {
      boardLines.push(inputLines[i].value);
    }
    Meteor.call("editBoard", Meteor.user().currentRaceId, boardLines);

    return false;
  }
});

Template.controlPanel.helpers({
  "board": function(){
    var race = Races.findOne({"createdBy": Meteor.userId()});
    if(Meteor.isCordova && !race.runOnMobile){
      navigator.app.exitApp();
      return null;
    }
    else
      return race.board;
  }
});

Template.controlPanel.onCreated(function() {
  var self = this;
  self.subscribe("races");
  self.subscribe('userData');
});