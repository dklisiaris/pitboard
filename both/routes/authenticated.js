const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [
    checkLoggedIn
  ]
});

authenticatedRoutes.route('/logout',{
  name: 'logout',
  action: function(){
    Meteor.logout();  
    Meteor.setTimeout(function(){ FlowRouter.redirect('/login'); }, 10);
  }
});

authenticatedRoutes.route('/reset-password',{
  name: 'resetPassword',
  action: function(params, queryParams) {
    BlazeLayout.render('cleanLayout', {yield: "resetPassword"});
  }
});

authenticatedRoutes.route('/', {
  name: 'home',
  triggersEnter: [
    checkLoggedIn
  ],
  action: function(params, queryParams) {
    if(Meteor.isCordova)
      FlowRouter.go('board');
    else
      FlowRouter.go('race');
  }
});

authenticatedRoutes.route('/race', {
  name: 'race',
  action: function(params, queryParams) {
    BlazeLayout.render('twoSided', {left: "controlPanel", right: "board"});
  }
});

authenticatedRoutes.route('/board', {
  name: 'board',
  action: function(params, queryParams) {
    BlazeLayout.render('default', {yield: "board"});
  }
});

function checkLoggedIn(context, redirect){
    if (!Meteor.userId()) {
      redirect('/login');
  }
}