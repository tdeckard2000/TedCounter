//Edit Items Script

// Event Handlers ===============================

//Respond to food item click
$(".singleItem").on("click", (data)=>{
    let selectionName = data.currentTarget.innerHTML;
    let itemId = data.currentTarget.dataset.itemid;
    //Disable text input and show loading indicator
    $(".editItemTextBox").prop("disabled", true)
    $(".loadingIndicatorDiv").removeClass("hideElement");
    setItemValues(itemId);
    setModalTitle(selectionName);
});

// Functions ===================================

//Set Item Name in Edit Modal
const setModalTitle = function(itemName){
    $("#nameOfItem").html(itemName)
}

//Get Item Values from DB
const getItemValues = function(itemId){
    return new Promise((resolve, reject)=>{
        $.ajax({
            method:"GET",
            url:"./getItemValues",
            data: {itemId: itemId},
            success: (data)=>{
                resolve(data.data);
            }
        }).done(()=>{
        });
    })
}

//Set Item Values in Edit Item Modal
const setItemValues = function(itemId){
    getItemValues(itemId).then((foodItemValues)=>{
        //Get list of all text boxes in modal
        let textBoxesArray = $(".editItemTextBox").toArray();

        textBoxesArray.forEach(element => {
            //Get id of each box element (fat, protein, etc)
            let itemId = element.id;
            //Update each text box value with value from DB
            $("#"+itemId).val(foodItemValues[itemId])
            //and the placeholder text
            .attr("placeholder",foodItemValues[itemId]);;
        });
        //hide loading indicator and enable text input
        //timeout to display indicator for minimum time
        setTimeout(function(){
            $(".loadingIndicatorDiv").addClass("hideElement");
            $(".editItemTextBox").prop("disabled", false)
        }, 500)
    });
}