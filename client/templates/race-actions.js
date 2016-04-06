Template.raceActions.helpers({
  "race": function(){
    return Races.findOne({"createdBy": Meteor.userId()});
  },
  "commafy": function(num){
    return commafy(num);
  },
  "isOwner": function(){
    return isOwner();
  },
  "isChecked": function(runOnMobile){
    return runOnMobile ? "checked" : "";
  }
});

Template.raceActions.events({
  "click .reset-race-btn": function(event){
    if(Races.findOne(Meteor.user().currentRaceId).createdBy === Meteor.userId()){
      Meteor.call("resetRace", Meteor.user().currentRaceId, Meteor.userId());
    }
    else{
      Bert.alert( 'Race cannot reset because is not created by current user.', 'danger', 'growl-top-right' );
    }
  },
  "change .run-on-mobile-swtc": function(event){
    // event.target.value = !event.target.value;
    // console.log(event.target.value);
    if(isOwner()){
      Meteor.call("toggleMobile", Meteor.user().currentRaceId, function(err, isMobileOn){
        if(isMobileOn){
          Bert.alert( 'Mobile app is activated!', 'info', 'growl-top-right' );
        }
        else{
          if(Meteor.isCordova){
            Bert.alert('This app should close..', 'info', 'growl-top-right' ); 
          }
          else{
            Bert.alert('Mobile app killed!', 'info', 'growl-top-right' );
          }
        }
      });

    }
    else{
      Bert.alert( 'You dont have permission to kill this app.', 'danger', 'growl-top-right' );
    }
  }
});

Template.raceActions.onCreated(function() {
  var self = this;
  self.subscribe("races");
  self.subscribe('userData');
});

var commafy = function(num) {
  var str = num.toString().split('.');
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}

var isOwner = function(){
  if(Meteor.user() && Races.findOne(Meteor.user().currentRaceId).createdBy === Meteor.userId()){
    return true;
  } else return false;
}