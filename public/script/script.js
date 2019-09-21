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
  let cellNum = $(this).attr('cellNum');
  let monthId = $(this).attr('monthId');
  let yearId = $(this).attr('yearId');
  console.log(cellId);
  $('.field').prepend(`<input type="hidden" class="dynamic_input" name="cellId" value=${cellId}>`);
  $('.field').prepend(`<input type="hidden" class="dynamic_input" name="monthId" value=${monthId}>`);
  $('.field').prepend(`<input type="hidden" class="dynamic_input" name="yearId" value=${yearId}>`);

  let startingTime = '';
  let endingTime = '';

  if (cellNum == 1) {
    startingTime = '10:00';
    endingTime = '11:00';
  } else if (cellNum == 2) {
    startingTime = '13:00';
    endingTime = '14:00';
  } else if (cellNum == 3) {
    startingTime = '14:00';
    endingTime = '15:00';
  } else if (cellNum == 4) {
    startingTime = '15:00';
    endingTime = '16:00';
  } else if (cellNum == 5) {
    startingTime = '16:00';
    endingTime = '17:00';
  } else if (cellNum == 6) {
    startingTime = '17:00';
    endingTime = '18:00';
  }

  $('#account-name').after(`<br class="dynamic_br"><input type="text" name="startTime" class="text-field field_second time-box" value="${startingTime}">
  <input type="text" name="endTime" class="text-field field_second time-box" value="${endingTime}">`);

  $(".popup-overlay, .popup-content").addClass("active");
  $(".table-body, img").addClass("background_change");
});

//on click the scheduled cell
$(".dynamic_cell").on("click", function() {
  $('#dynamic_input').remove();  //popup창에 있는 이전 hidden value 삭제
  let cellId = $(this).attr('id');
  let monthId = $(this).attr('monthId');
  let yearId = $(this).attr('yearId');

  let account = $(this).attr('account');
  let sales = $(this).attr('sales');
  let sa = $(this).attr('sa');
  let startTime = $(this).attr('startTime');
  let endTime = $(this).attr('endTime');
  console.log(cellId);
  $('.field').prepend(`<input type="hidden" class="dynamic_input" name="cellId" value=${cellId}>`);
  $('.field').prepend(`<input type="hidden" class="dynamic_input" name="monthId" value=${monthId}>`);
  $('.field').prepend(`<input type="hidden" class="dynamic_input" name="yearId" value=${yearId}>`);
  
  $('.scheduled-info').append(`<div type="text" class="dynamic_info">Account: ${account}</div>`);
  $('.scheduled-info').append(`<div type="text" class="dynamic_info">AM/TM: ${sales}</div>`);
  $('.scheduled-info').append(`<div type="text" class="dynamic_info">SA: ${sa}</div>`);
  $('.scheduled-info').append(`<div type="text" class="dynamic_info">Start: ${startTime}</div>`);
  $('.scheduled-info').append(`<div type="text" class="dynamic_info">End: ${endTime}</div>`);


  $(".scheduled-popup-overlay, .scheduled-popup-content").addClass("active");
  $(".table-body, img").addClass("background_change");
});

//removes the "active" class to pop-ups when the "Close" button is clicked 
$(".close_button").on("click", function() {
  $(".popup-overlay, .popup-content, .scheduled-popup-overlay, .scheduled-popup-content").removeClass("active");
  $(".table-body, img").removeClass("background_change");
  $(".dynamic_input").remove();
  $(".dynamic_info").remove();
  $(".time-box").remove();
  $(".dynamic_br").remove();
});