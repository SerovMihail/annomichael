$(function () {    
    'use strict';

    // function setCalendarStartYear(year, month) {
    //     var yearAndMonth = '00' + year + '-' + month;

    //     $(".calendar").attr("value", yearAndMonth);
    // }    

    function updateTimer() { 
        var millisecondsOfLife = getLifeMilliseconds(new Date(1938, 1, 13), new Date());
        var zeroDate = getZeroDate();
        
        var date = new Date(zeroDate + millisecondsOfLife.getTime());

        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();

        var isLeap = IsLeapYear(yyyy);
        var dayInMonthAndAlias = getDaysInMonth(isLeap, dd * mm);
        var dayInMonth = dayInMonthAndAlias[0],
            alias = dayInMonthAndAlias[1];

        var dayMonthYear =   yyyy + ' ' + mm  + ' '+ dayInMonth ;

        var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"][date.getDay()];
        document.getElementsByClassName('time')[0].innerHTML = time;
        document.getElementsByClassName('yearLetters')[0].innerHTML = ' A.M.';
        document.getElementsByClassName('date')[0].innerHTML = dayMonthYear;
        document.getElementsByClassName('alias')[0].innerHTML = alias;

        setCalendarStartYear(yyyy, mm);
    }

    /**
     * Get result in milliseconds between two dates
     * @param {Date} bornDate 
     * @param {Date} nowDate 
     */
    function getLifeMilliseconds(bornDate, nowDate) {
        // we have to multiply by -1 because bornDate before 1970
        return new Date((bornDate.getTime() * -1) + nowDate.getTime()); 
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

    function IsLeapYear(year) { 
        if(year%4 == 0) { 
            if(year%100 == 0) { 
                if(year%400 == 0) { 
                    return true; 
                } 
                else 
                    return false; 
            } 
            else 
                return true; 
        } 
        return false; 
    };

    function getDaysInMonthAndAlias(isLeap, currentDay) {
        
        var MichaelDays = isLeap ? 17 : 16;
        var EliaDays = 105,
            SergiusDays = 99,
            EgorDays = 48,
            VanDays = 48,
            LexiusDays = 31,
            CatharinaDays = 18;
            
        var ME = MichaelDays + EliaDays,
            MES = MichaelDays + EliaDays + SergiusDays,
            MESE = MichaelDays + EliaDays + SergiusDays + EgorDays,
            MESEV = MichaelDays + EliaDays + SergiusDays + EgorDays + VanDays,
            MESEVL =  MichaelDays + EliaDays + SergiusDays + EgorDays + VanDays + LexiusDays,
            MESEVLC =  MichaelDays + EliaDays + SergiusDays + EgorDays + VanDays + LexiusDays + CatharinaDays;

        if(currentDay > 0 && currentDay <= MichaelDays) {
            return [MichaelDays , 'Michael'];
        } else if (currentDay > MichaelDays && currentDay <= ME) {
            return [EliaDays , 'Elia'];
        } else if (currentDay > ME && currentDay <= MES) {
            return [SergiusDays , 'Sergius'];
        } else if (currentDay > MES && currentDay <= MESE) {
            return [EgorDays , 'Egor'];
        } else if (currentDay > MESE && currentDay <= MESEV) {
            return [VanDays , 'Van'];
        } else if (currentDay > MESEV && currentDay <= MESEVL) {
            return [LexiusDays , 'Lexius'];
        } else if (currentDay > MESEVL && currentDay <= MESEVLC) {
            return [CatharinaDays , 'Catharina'];
        } else {
            console.log('Mistake in algorithm');
        }
    }    

    setInterval(updateTimer, 1000);
});