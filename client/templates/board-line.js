Template.boardLine.onRendered(function(){

  var el = this.$('.board-text')[0],
      textRectangles = el.getClientRects(),
      container = el.getBoundingClientRect(),
      lineHeight = container.height / textRectangles.length,
      $el = this.$('.board-text');

  while(this.$('.board-text')[0].getClientRects().length > 1 && parseInt($el.css("font-size"), 10) > 5){
    var fontSize = parseInt($el.css("font-size"), 10);
    $el.css("font-size", fontSize - 1);
  }
});
