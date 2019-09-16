$('.inner_cell').mouseenter(function() {
  $(this).addClass("change");
});

$('.inner_cell').mouseleave(function() {
  $(this).removeClass("change");
});

//dynamic_cell
$('.dynamic_cell').mouseenter(function() {
  $(this).css("cursor","pointer");
});

$('.dynamic_cell').mouseleave(function() {
  $(this).css("cursor","default");
});

//on click the cell
$(".inner_cell").on("click", function() {
  $('#dynamic_input').remove();  //popup창에 있는 이전 hidden value 삭제
  let cellId = $(this).attr('id');
  console.log(cellId);
  $('.field').prepend(`<input type="hidden" id="dynamic_input" name="cellId" value=${cellId}>`);
  
  $(".popup-overlay, .popup-content").addClass("active");
  $(".table-body, img").addClass("background_change");
});

//removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
$(".close_button").on("click", function() {
  $(".popup-overlay, .popup-content").removeClass("active");
  $(".table-body, img").removeClass("background_change");
});