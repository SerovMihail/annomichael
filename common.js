$(function() {    

    function setCalendarStartYear(year, month) {
        var yearAndMonth = '00' + year + '-' + month;

        $(".calendar").attr("value", yearAndMonth);
    }    

    function updateTimer() { 
        var millisecondsOfLife = getLifeMilliseconds(new Date(1938, 1, 13), new Date());
        var zeroDate = getZeroDate();
        
        var date = new Date(zeroDate + millisecondsOfLife.getTime());

        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();

        var dayMonthYear =  dd + '/' + mm  + '/' + yyyy;
        var time = date.getHours() + ' : ' + date.getMinutes() + ' : ' + date.getSeconds();
        document.getElementsByClassName('time')[0].innerHTML = time;
        document.getElementsByClassName('date')[0].innerHTML = dayMonthYear;

        setCalendarStartYear(yyyy, mm);
    }

    /**
     * Get result in milliseconds between two dates
     * @param {Date} bornDate 
     * @param {Date} nowDate 
     */
    function getLifeMilliseconds(bornDate, nowDate) {
        // we have to multiply by -1 because bornDate before 1970
        return new Date(nowDate.getTime() + (bornDate.getTime() * -1)); 
    }

    /**
     * crutch ^^
     */
    function getZeroDate() {
        var stringDate ="Mon Jan 1 0000 00:00:00 GMT+0300 (MSK)"; // zero date
        var year=stringDate.split(' ')[3], 
            falseYear=5000+(+year);
        var date=new Date(stringDate.replace(year,falseYear));
        date.setFullYear(date.getFullYear() - 5000)
        var zeroDate =+ date;
        return zeroDate;
    }

    setInterval(updateTimer, 1000);
});