var _ = (function() {

     /**
     * Get result in milliseconds between two dates
     * @param {Date} bornDate 
     * @param {Date} nowDate 
     */
    function getLifeMilliseconds(bornDate, nowDate) {
        // we have to multiply by -1 because bornDate before 1970
        return new Date(nowDate.getTime() - bornDate.getTime()); 
    }

    /**
     * crutch ^^
     */
    function getZeroDate() {
        // var stringDate ="Mon Jan 1 0000 00:00:00 GMT+0300 (MSK)"; // zero date
        // var year=stringDate.split(' ')[3], 
        //     falseYear=5000+(+year);
        // var date=new Date(stringDate.replace(year,falseYear));
        // date.setFullYear(date.getFullYear() - 5000)
        // var zeroDate =+ date;
        // return zeroDate;

        return new Date(1938, 1, 13);
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
        "IsLeapYear": IsLeapYear
    }
  
  })();