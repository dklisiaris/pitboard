const publicRoutes = FlowRouter.group({
  name: 'public'
});

publicRoutes.route('/login', {
  name: 'login',
  action: function(params, queryParams) {
    BlazeLayout.render('cleanLayout', {yield: "login"});
  }
});

publicRoutes.route('/signup', {
  name: 'signup',
  action: function(params, queryParams) {
    BlazeLayout.render('cleanLayout', {yield: "signup"});
  }
});

// publicRoutes.route('/join', {
//   name: 'join',
//   action: function(params, queryParams) {
//     BlazeLayout.render('cleanLayout', {yield: "join"});
//   }
// });