$(document).ready(()=>{
    const offsetHours = (new Date().getTimezoneOffset())/60
    console.log(offsetHours)
    $.ajax({
        contentType: "application/json",
        dataType:"json",
        method: "POST",
        url:'/',
        data: JSON.stringify({
            timezoneOffset: offsetHours
            })
        })
})