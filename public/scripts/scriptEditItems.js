//Edit Items Script

// Event Handlers ===============================

//Get Selected Item Info
$(".singleItem").on("click", (data)=>{
    let selectionName = data.currentTarget.innerHTML;
    let itemId = data.currentTarget.dataset.itemid;
    let itemValues = getItemValues(itemId);

    setModalTitle(selectionName);
})

// Functions ===================================

//Set Item Name in Edit Modal
const setModalTitle = function(itemName){
    $("#nameOfItem").html(itemName)
}

//Get Item Values from DB
const getItemValues = function(itemId){
    $.ajax({
        method:"GET",
        url:"./getItemValues",
        data: {itemId: itemId},
        success: (data)=>{
            console.log(data);
        }
    }).done(()=>{
        console.log("Ajax Finished")
    });
}