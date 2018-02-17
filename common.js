$(function () {    
    'use strict';
    
    /** initialization */

    // $('#fullpage').fullpage({				
    //     navigation: true,
    //     navigationPosition: 'right'                
    // });  

       
    var data = {
        zeroDate : _.getZeroDate(),
        michaelBornDate: _.getMichaelBornDate(),
        currentDate : new Date(),
        michaelAge : family[0].age,        
        daysInYear : 0,
        totalPercentOfAges : 0,
        totalDaysWithoutCatharina : 0,
        currentYearIsLeap: undefined,
        oneDay: 1000 * 60 * 60 * 24       
    };

    data.currentYearIsLeap = _.IsLeapYear(data.currentDate.getFullYear());
    data.daysInYear = data.currentYearIsLeap ? 366 : 365;
    
    /** block of functions */
    function fillFamilyData() {

        /**
         * set ages and percent of Michael Ages plus summ all percents in one num. and find daysFromYearStart and Leap variant 
         */
        family.forEach(function (val) {
            val.age = data.currentDate.getFullYear() - val.born.year;
            val.percentOfMichaelAges = val.age / family[0].age; 

            data.totalPercentOfAges += val.percentOfMichaelAges;

            if(val.name != 'Michael') {
                var timeDiff = Math.abs(new Date(family[0].born.year, val.born.month - 1, val.born.day).getTime() - data.michaelBornDate.getTime());
                
                val.daysFromYearStart = Math.floor( timeDiff / data.oneDay);
                val.daysFromYearStartLeapYear = val.daysFromYearStart + 1;
            }                
        });

        /**
         * set days with and without precision
         */
        family.forEach(function (val) {             

            val.daysWithPrecision = data.daysInYear / data.totalPercentOfAges * val.percentOfMichaelAges;
            val.daysWithoutPrecision = Math.round(val.daysWithPrecision);

            if(val.name == 'Catharina') {
                val.daysWithoutPrecision = data.daysInYear - data.totalDaysWithoutCatharina;
            } else {
                data.totalDaysWithoutCatharina += val.daysWithoutPrecision;
            }

            if(val.name == 'Michael') {
                val.daysWithoutPrecision += data.currentYearIsLeap ? 1 : 0;
            }             
        });
    }     
    
    var calendarReady = false;

    function updateTimer() { 

        var currentDate = new Date();

        var currentYearAM = currentDate.getMonth() >= 1 && currentDate.getDate() >= 13 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;

        var millisecondsOfLife = _.getLifeMilliseconds(data.michaelBornDate, currentDate); 

        

        var startOfCurrentYEar = new Date(yeear, 1, 13);
        var millisecondsOfLifeFromYearStart = _.getLifeMilliseconds(new Date(1938, 1, 13), startOfCurrentYEar); 
        
        var date = new Date(data.zeroDate + millisecondsOfLife.getTime());
        var dateFromYearStart = new Date(data.zeroDate + millisecondsOfLifeFromYearStart.getTime());

        var ss = date - dateFromYearStart;

        var oneDay = 1000 * 60 * 60 * 24;
        var ddddday = Math.floor(ss / oneDay);

        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();
        
        var dayInMonthAndAliasAndMonthIndex = getDaysInMonthAndAliasAndMonthIndex(ddddday + 1, yyyy);
        var dayInMonth = dayInMonthAndAliasAndMonthIndex[0],
            alias = dayInMonthAndAliasAndMonthIndex[1],
            monthIndex = dayInMonthAndAliasAndMonthIndex[2];

        if(!calendarReady) {
            calendar.drawCalendar(ddddday + 1, monthIndex, startOfCurrentYEar.getDay());
            calendarReady = true;
        }        

        var dayInMonthString = dayInMonth.toString()
        while(dayInMonthString.length < 3){
            dayInMonthString='0'+dayInMonthString;
        }

        var dayMonthYear =   yyyy + ' ' + monthIndex  + ' '+ dayInMonthString ;

        var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"][date.getDay()];
        document.getElementsByClassName('time')[0].innerHTML = time;
        
        document.getElementsByClassName('date')[0].innerHTML = dayMonthYear;
        document.getElementsByClassName('alias')[0].innerHTML = alias;
        document.getElementsByClassName('yearLetters')[0].innerHTML = ' A.M.';        
    }

   

    function getDaysInMonthAndAliasAndMonthIndex(currentDay, year) {
            
        var M = family[0].daysWithoutPrecision,
            ME = M + family[1].daysWithoutPrecision,
            MES = ME + family[2].daysWithoutPrecision,
            MESE = MES + family[3].daysWithoutPrecision,
            MESEV = MESE + family[4].daysWithoutPrecision,
            MESEVL =  MESEV + family[5].daysWithoutPrecision,
            MESEVLC =  MESEVL + family[6].daysWithoutPrecision;

        if(currentDay > 0 && currentDay <= M) {
            return [family[0].daysWithoutPrecision , 'MICHAEL', 1];
        } else if (currentDay > M && currentDay <= ME) {
            return [family[1].daysWithoutPrecision , 'ELIA', 2];
        } else if (currentDay > ME && currentDay <= MES) {
            return [family[2].daysWithoutPrecision , 'SERGIUS', 3];
        } else if (currentDay > MES && currentDay <= MESE) {
            return [family[3].daysWithoutPrecision , 'EGOR', 4];
        } else if (currentDay > MESE && currentDay <= MESEV) {
            return [family[4].daysWithoutPrecision , 'VAN', 5];
        } else if (currentDay > MESEV && currentDay <= MESEVL) {
            return [family[5].daysWithoutPrecision , 'LEXIUS', 6];
        } else if (currentDay > MESEVL && currentDay <= MESEVLC) {
            return [family[6].daysWithoutPrecision , 'CATHARINA', 7];
        } else {
            console.log('Mistake in algorithm');
        }
    }    


    

    /** Start */

    fillFamilyData();

   

    


    /** test */
    var totalDays = family.reduce(add, 0);

    function add(a, b) {
        if(a == 0)
            return b.daysWithoutPrecision;

        return a + b.daysWithoutPrecision;
    }

    setInterval(updateTimer, 1000);

    
});