import ElementQueries from 'css-element-queries/src/ElementQueries';

import BigText from 'bigtext/dist/bigtext';

Template.board.helpers({
  "board": function(){
    var race = Races.findOne({"createdBy": Meteor.userId()});
    if(Meteor.isCordova && !race.runOnMobile){
      navigator.app.exitApp();
      return null;
    }
    else {
      return race.board;
    }
  },
  "halfBoards": function(){
    var board = Races.findOne({"createdBy": Meteor.userId()}).board;
    var leftBoard = board.splice(0, Math.ceil(board.length/2));
    var rightBoard = board;
    return [leftBoard, rightBoard];
  },
  "isPortrait": function(){
    return Session.get('isPortrait');
  },
  "shouldSplit": function(){
    return Session.get('shouldSplit');
  },
  "calcFontSize": function(linesCount){
    var fontSize = (Math.ceil(65/linesCount)) + "vh";
    return fontSize;
  }
});

var isPortrait = function(){
  return (window.innerHeight > window.innerWidth)? true : false;
}

var shouldSplit = function(){
  return false;
  // return ((FlowRouter.getRouteName() == 'board') && !Session.get('isPortrait'))? true : false;
}

Template.board.onRendered(function() {
  // ElementQueries.init();
  // $('#bigtext').bigtext();

  var supportsOrientationChange = "onorientationchange" in window;
  var orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

  $(window).on(orientationEvent, function(e){
    calculateFontSize();
  });

});

Template.board.onCreated(function() {
  var self = this;
  self.subscribe("races");
  self.subscribe('userData');
});

var calculateFontSize = function(){
  $.each($(".board-text"), function(index, value){
    $(value).css("font-size","20vh");
    while(value.getClientRects().length > 1 && parseInt($(value).css("font-size"), 10) > 5){
      var fontSize = parseInt($(value).css("font-size"), 10);
      $(value).css("font-size", fontSize - 1);
    }
  });
}