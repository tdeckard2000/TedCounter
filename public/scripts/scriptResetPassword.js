//Check that newly entered password meets standards
// $('#inputNewPassword').on()

$('#button-save').on("click",(data)=>{
    data.preventDefault();
    let newPassword = $('#inputNewPassword').val();
    let retypePassword = $('#retypePassword').val();
    $('.passwordTooShortAlert').addClass("hideElement")
    $('.passwordsNotMatchingAlert').addClass("hideElement")
    
    if(newPassword !== retypePassword){
        $('.passwordsNotMatchingAlert').removeClass("hideElement")
        return
    }else{
        console.log("match")
    }

    if(newPassword.length < 8){
        $('.passwordTooShortAlert').removeClass("hideElement")
    }else{
        $.ajax({
            method: "POST",
            url: "./newPassword",
            data: {
                newPassword: newPassword
            }
        }).done((data)=>{
    
            if(data.message === true){ //reset key doesn't exist
                $('.resetKeyExpired').removeClass('hideElement');
            }else{ //new user was created
                window.location = '/accountCreated'; //redirect
            }
        });
    }
});