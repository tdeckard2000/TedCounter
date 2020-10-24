$(document).ready(()=>{
    console.log('here')
    $.ajax({
        contentType: "application/json",
        dataType:"json",
        method: "POST",
        url:'/',
        data: JSON.stringify({
            timezoneOffset:'thisIsATest'
            })
        })
})