$('.inner_cell').mouseenter(function() {
  $(this).addClass("change");
});

$('.inner_cell').mouseleave(colorRemove);

function colorRemove() {
  $('.inner_cell').removeClass("change");
}

$(".inner_cell").on("click", function() {
  let cellId = $(this).attr('value');
  $('.field').prepend(`<input type="hidden" id="dynamic_input" name="cellId" value=${cellId}>`);
  $(".popup-overlay, .popup-content").addClass("active");
  $(".table_body").addClass("background_change");
});

//removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
$(".close_button").on("click", function() {
  $(".popup-overlay, .popup-content").removeClass("active");
  $(".table_body").removeClass("background_change");
});