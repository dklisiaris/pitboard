if(Meteor.isCordova){
  Meteor.startup(function(){
    document.addEventListener("backbutton", onBackButtonDown, false);

    function onBackButtonDown(event) {
      event.preventDefault();
      event.stopPropagation();
      
      if(FlowRouter.getRouteName() === 'board' || FlowRouter.getRouteName() === 'login') {
        navigator.app.exitApp();
      }
      else {
        navigator.app.backHistory()
      }
    }
  });
}