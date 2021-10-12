export default function formatLongDate (date){
    let myyear = date.getFullYear();
    let mymonth = date.getMonth() + 1;
    let myweekday = date.getDate();
    let myHour = date.getHours();
    let myMin = date.getMinutes();
    let mySec = date.getSeconds();

    if (mymonth < 10) {
        mymonth = '0' + mymonth;
    }
    if (myweekday < 10) {
        myweekday = '0' + myweekday;
    }
    // if (myHour < 10) {
    //     myHour = '0' + myHour;
    // }
    // if (myMin < 10) {
    //     myMin = '0' + myMin;
    // }
    // if (mySec < 10) {
    //     mySec = '0' + mySec;
    // }
    return (myyear + '-' + mymonth + '-' + myweekday);
}