$(function () {    
    'use strict';

    // function setCalendarStartYear(year, month) {
    //     var yearAndMonth = '00' + year + '-' + month;

    //     $(".calendar").attr("value", yearAndMonth);
    // }    

    

    var zeroDate = getZeroDate(),
        newDate = new Date(),
        MichaelAges = getLifeMilliseconds(new Date(
            family[0].born.year, 
            family[0].born.month - 1, 
            family[0].born.day), newDate),
        dayInYearWithoutMichael = 349,
        totalPercentOfAges = 0,
        totalRoundDays = 0;
      
    var date = new Date(zeroDate + MichaelAges.getTime());
    var yyyy = date.getFullYear();

    function getAges() {
        family.forEach(function (val) {
            var millisecondsOfLife = getLifeMilliseconds(new Date(
                val.born.year, 
                val.born.month - 1, 
                val.born.day), newDate);            
            
            var date = new Date(zeroDate + millisecondsOfLife.getTime());

            val.age = date.getFullYear();

            if(val.name != 'Michael') {
                val.percentOfMichaelAges = val.age / family[0].age;      
                totalPercentOfAges += val.percentOfMichaelAges;       
            }
        });
    }

    function daysWithAndWithoutPrecision() {
        family.forEach(function (val) {             

            if(val.name == 'Michael') {

                val.daysWithoutPrecision = IsLeapYear(yyyy) ? 16 : 17;
                val.daysWithPrecision =  val.daysWithoutPrecision;

            } else {

                val.daysWithPrecision = dayInYearWithoutMichael / totalPercentOfAges * val.percentOfMichaelAges;

                if (val.name != 'Elia') {
                    val.daysWithoutPrecision = Math.round(val.daysWithPrecision);
                    totalRoundDays += val.daysWithoutPrecision;                    
                }                 
            }
            
        });

        family[1].daysWithoutPrecision = dayInYearWithoutMichael - totalRoundDays;
    }

    getAges();
    daysWithAndWithoutPrecision();

    var totalDays = family.reduce(add, 0);

    function add(a, b) {
        if(a == 0)
            return b.daysWithoutPrecision;

        return a + b.daysWithoutPrecision;
    }


    function updateTimer() { 
        var millisecondsOfLife = getLifeMilliseconds(new Date(1938, 1, 13), new Date()); 
        var millisecondsOfLifeFromYearStart = getLifeMilliseconds(new Date(1938, 1, 13), new Date(2017, 1, 13)); 

        var zeroDate = getZeroDate();
        
        var date = new Date(zeroDate + millisecondsOfLife.getTime());
        var dateFromYearStart = new Date(zeroDate + millisecondsOfLifeFromYearStart.getTime());

        var ss = date - dateFromYearStart;

        var oneDay = 1000 * 60 * 60 * 24;
        var ddddday = Math.floor(ss / oneDay);

        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();

        var isLeap = IsLeapYear(yyyy);

        
        var dayInMonthAndAliasAndMonthIndex = getDaysInMonthAndAliasAndMonthIndex(ddddday, yyyy);
        var dayInMonth = dayInMonthAndAliasAndMonthIndex[0],
            alias = dayInMonthAndAliasAndMonthIndex[1],
            monthIndex = dayInMonthAndAliasAndMonthIndex[2];

        var dayInMonthString = dayInMonth.toString()
        while(dayInMonthString.length < 3){
            dayInMonthString='0'+dayInMonthString;
        }
            
            

        var dayMonthYear =   yyyy + ' ' + monthIndex  + ' '+ dayInMonthString ;

        var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"][date.getDay()];
        document.getElementsByClassName('time')[0].innerHTML = time;
        document.getElementsByClassName('yearLetters')[0].innerHTML = ' A.M.';
        document.getElementsByClassName('date')[0].innerHTML = dayMonthYear;
        document.getElementsByClassName('alias')[0].innerHTML = alias;

        //setCalendarStartYear(yyyy, mm);
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

    function getDaysInMonthAndAliasAndMonthIndex(currentDay, year) {
            
        var M = family[0].daysWithoutPrecision,
            ME = M + family[1].daysWithoutPrecision,
            MES = ME + family[2].daysWithoutPrecision,
            MESE = MES + family[3].daysWithoutPrecision,
            MESEV = MESE + family[4].daysWithoutPrecision,
            MESEVL =  MESEV + family[5].daysWithoutPrecision,
            MESEVLC =  MESEVL + family[5].daysWithoutPrecision;

        if(currentDay > 0 && currentDay <= M) {
            return [family[0].daysWithoutPrecision , 'Michael', 1];
        } else if (currentDay > M && currentDay <= ME) {
            return [family[1].daysWithoutPrecision , 'Elia', 2];
        } else if (currentDay > ME && currentDay <= MES) {
            return [family[2].daysWithoutPrecision , 'Sergius', 3];
        } else if (currentDay > MES && currentDay <= MESE) {
            return [family[3].daysWithoutPrecision , 'Egor', 4];
        } else if (currentDay > MESE && currentDay <= MESEV) {
            return [family[4].daysWithoutPrecision , 'Van', 5];
        } else if (currentDay > MESEV && currentDay <= MESEVL) {
            return [family[5].daysWithoutPrecision , 'Lexius', 6];
        } else if (currentDay > MESEVL && currentDay <= MESEVLC) {
            return [family[6].daysWithoutPrecision , 'Catharina', 7];
        } else {
            console.log('Mistake in algorithm');
        }
    }    

    setInterval(updateTimer, 1000);
});