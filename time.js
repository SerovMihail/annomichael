var _ = (function() {

     /**
     * Get result in milliseconds between two dates
     * @param {Date} bornDate 
     * @param {Date} nowDate 
     */
    function getLifeMilliseconds(bornDate, nowDate) {
        // bornDate before 1970 therefore we have to multiply by -1 
        return new Date((bornDate * -1) + nowDate.getTime()); 
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

    function getMichaelBornDate() {
        return new Date(family[0].born.year, family[0].born.month - 1, family[0].born.day);
    }

    /**
     * Is leap or not year
     * @param {Num} year 
     */
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
  
    return {
        "getLifeMilliseconds" : getLifeMilliseconds,
        "getZeroDate": getZeroDate,
        "IsLeapYear": IsLeapYear,
        "getMichaelBornDate": getMichaelBornDate
    }
  
  })();