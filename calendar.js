var calendar = (function () {

    function drawCalendar(todayDay, todayMonth, startDayOfWeek, currentYearIsLeap) {

        var freeMonth = $('.free-month');
        var fourMonth = $('.four-month');

        var birthdays = currentYearIsLeap ?
            family.map(function (elem) { return elem.daysFromYearStartLeapYear; }) :
            family.map(function (elem) { return elem.daysFromYearStart; })


        var dayOfYear = 1;
        family.forEach(function (item, index) {

            appendDiv = index > 2 ? fourMonth : freeMonth;

            var weeks = "";
            var days = "";

            if (startDayOfWeek > 7)
                startDayOfWeek = 1;

            for (var f = 1; f < startDayOfWeek; f++) {
                days += "<td></td>";
            }

            for (var i = 1; i < item.daysWithoutPrecision + 1; i++) {


                if (startDayOfWeek > 7) {
                    startDayOfWeek = 1;
                    weeks += "<tr>" + days + "</tr>"
                    days = "";
                }

                if (index + 1 == todayMonth && dayOfYear == todayDay) {
                    days += "<td class='today' title='Сегодня'>" + i + "</td>";
                } else if (birthdays.indexOf(dayOfYear - 1) != -1) {
                    var birthdayPerson = family.find(function (val) {

                        if (currentYearIsLeap) {
                            return val.daysFromYearStartLeapYear == dayOfYear - 1;
                        } else {
                            return val.daysFromYearStart == dayOfYear - 1;
                        }

                    });

                    days += "<td class='" + birthdayPerson.name + "-color' title='День рождения " + birthdayPerson.name + "'>" + i + "</td>";
                } else {
                    days += "<td>" + i + "</td>";
                }

                startDayOfWeek++;
                dayOfYear++;
            }

            weeks += "<tr>" + days + "</tr>"
            days = "";

            var tbody = "<tbody>" + weeks + "</tbody>"

            var dayOfWeeks = "<tr><th>ПН</th><th>ВТ</th><th>СР</th><th>ЧТ</th><th>ПТ</th><th>СБ</th><th>ВС</th></tr>";
            var monthTitle = "<tr><th colspan='7' class='calendar-month-title " + item.name + "-color'>" + item.name + "</th></tr>"

            var thead = "<thead>" + monthTitle + dayOfWeeks + "</thead>";
            var table = "<table>" + thead + tbody + "</table>";

            appendDiv.append(table);
        });

        tippy('[title]', {
            trigger: "mouseenter focus",
            distance: "1px"
        });

        //window.touchmove = function() { alert("Scrolled"); };

        window.addEventListener('touchstart', () => {
            for (const popper of document.querySelectorAll('.tippy-popper')) {
              const instance = popper._tippy
          
              if (instance.state.visible) {
                instance.popperInstance.disableEventListeners()
                instance.hide()
              }
            }
          });   
    }

    return {
        "drawCalendar": drawCalendar
    };

})();