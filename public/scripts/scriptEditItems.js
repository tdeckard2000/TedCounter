//Edit Items Script

// Event Handlers ===============================

//Get Selected Item Info
$(".singleItem").on("click", (data)=>{
    let selectionName = data.currentTarget.innerHTML;
    let selectionId = data.currentTarget.dataset.itemid;
    setModalTitle(selectionName);
})

// Functions ===================================

//Set Item Name in Edit Modal
const setModalTitle = function(itemName){
    $("#nameOfItem").html(itemName)
}