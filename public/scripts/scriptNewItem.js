//########### New Item Script ###########

// Functions #############################################################################################


// Event Handlers #############################################################################################

$(".barcodeSearchButton").on("click",()=>{
    let barcodeNumber = $("#barcodeField").val();
    console.log(barcodeNumber)

    $.ajax({
        type: "GET",
        url: "./getBarcodeData",
        data: {barcodeNumber:barcodeNumber}
    }).done((data)=>{
        console.log(data);
    })
})
