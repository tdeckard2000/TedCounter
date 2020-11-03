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

$('#forgotPasswordForm').on("submit",(event)=>{
    event.preventDefault();
    $('.sendEmailButton').attr('disabled', true).text("..wait"); //disable send button
    $('#recoveryEmail').attr('disabled', true); //disable text box
    const formData = $('#recoveryEmail').val(); //store entered email

    $.ajax({
        method: "POST",
        url: "./passwordRecovery",
        data: {email: formData}
    }).done((data)=>{
        console.log(data.message)
        $('.emailSentNotification').removeClass('hideElement') //show "email sent" text
        $('.countdown').removeClass('hideElement') //show "countdown" text

        let countdown = 30 //for tracking remaining time
        let myTimer = setInterval(()=>{ //set a 1 second timer (it will repeat)
            countdown --
            $('.countDown').text("You can send again in " + countdown + " seconds.") //update text each second
            if(countdown == 0){ //when timer ends
                clearInterval(myTimer)
                $('.sendEmailButton').attr('disabled', false).text("Send Again"); //enable send button
            }
        }, 1000);
    })
})