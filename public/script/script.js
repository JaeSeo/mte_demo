$('.inner_cell').mouseenter(function() {
  $(this).addClass("change");
  let cellNum = $(this).attr('cellNum');
  
  if (cellNum == 1) {
    time = '10:00AM - 11:00AM';
  } else if (cellNum == 2) {
    time = '1:00PM - 2:00PM';
  } else if (cellNum == 3) {
    time = '2:00PM - 3:00PM';
  } else if (cellNum == 4) {
    time = '3:00PM - 4:00PM';
  } else if (cellNum == 5) {
    time = '4:00PM - 5:00PM';
  } else if (cellNum == 6) {
    time = '5:00PM - 6:00PM';
  }
  $(this).append(`<div class="dynamicTime">${time}</div>`);
  // $(this).html(time);
});

$('.inner_cell').mouseleave(function() {
  $(this).removeClass("change");
  $(".dynamicTime").remove();
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

  $('#meeting-room').after(`<br class="dynamic_br"><span class="outler-box-left time-box">Start:<input type="text" name="startTime" class="text-field field_second time-box" value="${startingTime}" required="required"></span>
  <span class="outler-box-right time-box">End:<input type="text" name="endTime" class="text-field time-box" value="${endingTime}" required="required"></span>`);

  $(".popup-overlay, .popup-content").addClass("active");
  $(".table-body, img").addClass("background_change");
});

//on click the scheduled cell
$(".dynamic_cell").on("click", function() {
  $('#dynamic_input').remove();  //popup창에 있는 이전 hidden value 삭제
  let cellId = $(this).attr('cellId');
  let monthId = $(this).attr('monthId');
  let yearId = $(this).attr('yearId');

  let account = $(this).attr('account');
  let sales = $(this).attr('sales');
  let sa = $(this).attr('sa');
  let startTime = $(this).attr('startTime');
  let endTime = $(this).attr('endTime');
  let room = $(this).attr('room')
  console.log(cellId);
  $('.field').prepend(`<input type="hidden" class="dynamic_input" name="cellId" value=${cellId}>`);
  $('.field').prepend(`<input type="hidden" class="dynamic_input" name="monthId" value=${monthId}>`);
  $('.field').prepend(`<input type="hidden" class="dynamic_input" name="yearId" value=${yearId}>`);
  
  $('.scheduled-info').append(`
    <div class="dynamic_info_outline">
      <div type="text" class="dynamic_info">
        <div class="dynamic_info_content"> Account : ${account} </div>
        <div class="dynamic_info_content"> AM/TM : ${sales} </div>
        <div class="dynamic_info_content"> SA : ${sa} </div>
      </div>
      <div type="text" class="dynamic_info">
        <div class="dynamic_info_content"> Meeting Room : ${room} </div>
      </div>
      <div type="text" class="dynamic_info">
        <div class="dynamic_info_content"> Start : ${startTime} </div>
        <div class="dynamic_info_content"> End : ${endTime} </div>
      </div>
    </div>
  `);
  $('.scheduled-info').append(`
  <form action="/download" class="dynamic_info dynamic_button" method="POST">
    <input type="hidden" name="cellId" value=${cellId}>
    <button class="submit_button download-button" type="submit">File Download</button>
  </form>
  <form action="/delete" class="dynamic_info dynamic_button" method="POST">
    <input type="hidden" name="cellId" value=${cellId}>
    <button class="submit_button button" id="delete-button" type="submit">Delete</button>
  </form>`);

  $(".scheduled-popup-overlay, .scheduled-popup-content").addClass("active");
  $(".table-body, img").addClass("background_change");
});

//removes the "active" class to pop-ups when the "Close" button is clicked 
$(".close_button").on("click", function() {
  $(".popup-overlay, .popup-content, .scheduled-popup-overlay, .scheduled-popup-content").removeClass("active");
  $(".table-body, img").removeClass("background_change");
  $(".dynamic_input").remove();
  $(".dynamic_info_outline").remove();
  $(".dynamic_info").remove();
  $(".time-box").remove();
  $(".dynamic_br").remove();
});