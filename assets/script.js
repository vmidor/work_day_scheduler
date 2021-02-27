// Current date and time
var currentDate = moment().format('MMMM Do, YYYY, h:mm a');
var now = moment();
var schedule = {};
$("#currentDay").text(currentDate);

//Event for saveBtn

$('.saveBtn').on('click', function () {

  var text = $(this).siblings(".col-8").val()
  var time = $(this).parent().attr("data-time")

  schedule[time] = text;
  var schedString = JSON.stringify(schedule);
  localStorage.setItem('schedule', schedString)
});

//Json parse data back to the textarea if storage contains anything.
//Its not gonna work if textarea is empty

var storageSchedule = localStorage.getItem('schedule');

if (storageSchedule) {
  schedule = JSON.parse(storageSchedule);
}
else {
  for (let i = 0; i <= 16; i++) {
    schedule[i] = ''
    console.log("Local storage is empty.")
  }
};
//Color of the textarea would be change depending on the time: past, present and future

for (var key in schedule) {
  console.log(key, schedule[key])

  if (moment(key, 'H').isBefore(now, 'hour')) {
    $("[data-time=" + key + "]")
      .find('.col-8')
      .val(schedule[key])
      .addClass("past");
  }
  else if (moment(key, 'H').isAfter(now, 'hour')) {
    $("[data-time=" + key + "]")
      .find('.col-8')
      .val(schedule[key])
      .addClass("future");
  }
  else if (moment(key, 'H').isSame(now, 'hour')) {
    $("[data-time=" + key + "]")
      .find('.col-8')
      .val(schedule[key])
      .addClass("present")
  }
}
