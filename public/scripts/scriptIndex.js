//immediately send the user's offset to the server
$(document).ready(()=>{
    const offsetHours = (new Date().getTimezoneOffset())/60
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

//Logic for New Account modal Create Account button
$('#newUserForm').on("submit",(event)=>{
    event.preventDefault();
    const newName = $('#newName').val(); //store entered username
    const newEmail = $('#newEmail').val(); //store entered email
    const newPassword = $('#newPassword').val(); //store entered pass
    const confirmPassword = $('#confirmPassword').val(); //store confirm pass
    
    if(newPassword !== confirmPassword){
        $('#confirmPassword').addClass("highlight");
        $('.passwordsNotMatchingNotification').removeClass('hideElement');
        return
    }

    if(newPassword.length < 8){
        $('.passwordTooShortNotification').removeClass('hideElement');
        return
    }

    $.ajax({
        method: "POST",
        url: "./newUser",
        data: {
            newName: newName,
            newEmail: newEmail,
            newPassword: newPassword
        }
    }).done((data)=>{

        if(data.message === true){ //user already exists
            $('.accountExistsNotification').removeClass('hideElement');
        }else{ //new user was created
            window.location = '/accountCreated'; //redirect
        }
    });
});

//If confirm password is highlighted, un-highlight when matched
$('#newPassword, #confirmPassword').on("keyup", ()=>{
    newPassword = $('#newPassword').val();
    confirmPassword = $('#confirmPassword').val();
    
    if(newPassword === confirmPassword){ //if passwords match
        $('#confirmPassword').removeClass("highlight");
        $('.passwordsNotMatchingNotification').addClass('hideElement');

    }
    
    if(newPassword.length >= 8){
        $('.passwordTooShortNotification').addClass('hideElement');
    }
})

//Autofill username text box if username available
if (localStorage.username && localStorage.username !== undefined) {
    let username = localStorage.getItem("username");
    $("#inputEmail").val(username);
}

//Store sing-in email address for autofill
$("#button-signIn").on("click", ()=>{
    let userName = $("#inputEmail").val();
    localStorage.setItem('username', userName);
});

//Store signup email address for autofill
$(".createAccount").on("click", ()=>{
    let userName = $("#newEmail").val();
    localStorage.setItem('username', userName);
});

//Close toast on click
$(".toast").on("click", ()=>{
    $(".toast").addClass("hideElement");
})