//immediately send the user's offset to the server
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

//Logic for forgot password modal
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

        //if the email doesn't exist
        if(data.message === false){
            $('.emailSentNotification').text("A user with this email does not exist.") //change email sent text
            $('.emailSentNotification').removeClass('hideElement') //show "email sent" text
            $('#recoveryEmail').attr('disabled', false); //enable text box
            $('.sendEmailButton').attr('disabled', false).text("Try Again"); //enable send button
            return;
        }

        //if the email does exist
        $('.emailSentNotification').text("Please check your inbox and spam folder.") //change text back if changed
        $('.emailSentNotification').removeClass('hideElement') //show "email sent" text
        $('.countdown').removeClass('hideElement') //show "countdown" text
        let countdown = 30 //for tracking remaining time

        let myTimer = setInterval(()=>{ //set a 1 second timer (it will repeat)
            countdown --
            $('.countdown').text("You can send again in " + countdown + " seconds.") //update text each second
            if(countdown == 0){ //when timer ends
                $('.sendEmailButton').attr('disabled', false).text("Send Again"); //enable send button
                clearInterval(myTimer); //end the setInterval timer
            }
        }, 1000);
    })
})