

let  currentDate=()=>{
    let todayDefault = new Date();
    let year = todayDefault.getFullYear();
    let month = todayDefault.getMonth() + 1;
    let monthCustom = month < 10 ? '0' + month : month; 
    let day = todayDefault.getDate();
    let dayCustom = day < 10 ? '0' + day : day;
    let today = `${year}-${monthCustom}-${dayCustom}`;
    return today;

}
export function minDate(dateInput) {

    if (dateInput >= currentDate()) {
        return true;
    } else {
        return false;
    }

}