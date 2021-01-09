//########### New Item Script ###########

// Functions #############################################################################################


// Event Handlers #############################################################################################

$(".barcodeSearchButton").on("click",()=>{
    let barcodeNumber = $("#barcodeField").val();

    $.ajax({
        type: "GET",
        url: "./getBarcodeData",
        data: {barcodeNumber:barcodeNumber}
    }).done((data)=>{
        $("#itemData0").text(data.data.productName);
        $("#itemData1").text("Calories: " + data.data.productNutrition.energy)
        $("#itemData2").text("Protein: " + data.data.productNutrition.protein)
        $("#itemData3").text(data.data.servingSize)
    })
})
