var calendar = (function() {

    function drawCalendar(todayDay, todayMonth) {

        var freeMonth =  $('.free-month');
        var fourMonth =  $('.four-month');


        var dayOfYear = 1;
        family.forEach(function(item, index) {

            appendDiv = index > 2 ? fourMonth : freeMonth;

            var title = "<h1 class='calendar-title text-center'>" + item.name + "</h1>";

            var monthBody = "";
            for(var i = 1; i < item.daysWithoutPrecision + 1; i++ ) {

                if(index + 1 == todayMonth && dayOfYear == todayDay) {
                    monthBody += "<div class='calendar-day today'>" + i + "</div>";
                } else {
                    monthBody += "<div class='calendar-day'>" + i + "</div>";
                }
                

                dayOfYear++;
            }

            var month = "<div>"+ title +  "<div class='calendar-month'>" + monthBody + "</div></div>";

            appendDiv.append(month);
        });
    }

    return {
        "drawCalendar" : drawCalendar
    };

})();