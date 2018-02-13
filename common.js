$(function () {    
    'use strict';
    
    /** initialization */

    $('#fullpage').fullpage({				
        navigation: true,
        navigationPosition: 'right'                
    });  

       
    var data = {
        zeroDate : _.getZeroDate(),
        newDate : new Date(),
        MichaelAges : _.getLifeMilliseconds(new Date(
            family[0].born.year, 
            family[0].born.month - 1, 
            family[0].born.day), new Date()),
        
        dayInYearWithoutMichael : 349,
        totalPercentOfAges : 0,
        totalRoundDays : 0
    };

    var date = new Date(data.zeroDate + data.MichaelAges.getTime());
    var yyyy = date.getFullYear();

    /** block of functions */

    function fillFamilyData() {

        /**
         * set ages and percent of Michael Ages plus summ all percents in one num
         */
        family.forEach(function (val) {
            var millisecondsOfLife = _.getLifeMilliseconds(new Date(
                val.born.year, 
                val.born.month - 1, 
                val.born.day), data.newDate);            
            
            var dateA = new Date(data.zeroDate + millisecondsOfLife.getTime());

            val.age = dateA.getFullYear();

            if(val.name != 'Michael') {
                val.percentOfMichaelAges = val.age / family[0].age;      
                data.totalPercentOfAges += val.percentOfMichaelAges;       
            }
        });

        /**
         * set days with and without precision
         */
        family.forEach(function (val) {             

            if(val.name == 'Michael') {

                val.daysWithoutPrecision = _.IsLeapYear(yyyy) ? 17 : 16;
                val.daysWithPrecision =  val.daysWithoutPrecision;

            } else {

                val.daysWithPrecision = data.dayInYearWithoutMichael / data.totalPercentOfAges * val.percentOfMichaelAges;

                if (val.name != 'Elia') {
                    val.daysWithoutPrecision = Math.round(val.daysWithPrecision);
                    data.totalRoundDays += val.daysWithoutPrecision;                    
                }                 
            }
            
        });

        family[1].daysWithoutPrecision = data.dayInYearWithoutMichael - data.totalRoundDays;
    }     
    


    function updateTimer() { 
        var millisecondsOfLife = _.getLifeMilliseconds(new Date(1938, 1, 13), new Date()); 

        var yeear = data.newDate.getMonth() >= 1 && data.newDate.getDate() >= 13 ? data.newDate.getFullYear() : data.newDate.getFullYear() - 1;

        var millisecondsOfLifeFromYearStart = _.getLifeMilliseconds(new Date(1938, 1, 13), new Date(yeear, 1, 13));         
        
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

    calendar.drawCalendar();


    /** test */
    var totalDays = family.reduce(add, 0);

    function add(a, b) {
        if(a == 0)
            return b.daysWithoutPrecision;

        return a + b.daysWithoutPrecision;
    }

    setInterval(updateTimer, 1000);

    
});