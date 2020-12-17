//######################## Dashboard Script ########################

//Variable for storing user nutrition and other defaults for use in script
let userPreferences = {};
const nutritionOptions = ["Caffeine", "Calcium", "Calories", "Carbs", "Chloride", "Choline", "Cholesterol", "Chromium", "Copper", "Fat", "Fiber", "Histidine",
"Iodine", "Iron","Isoleucine", "Leucine", "Lysine", "Magnesium", "Manganese", "Methionine", "Molybdenum","Phenylalanine", "Phosphorus", "Potassium", "Protein",
"Saturated Fat", "Selenium", "Sodium", "Sugar", "Trans Fat", "Threonine", "Tryptophan", "Valine", "Vitamin A", "Vitamin B1", "Vitamin B2", "Vitamin B3",
"Vitamin B5", "Vitamin B6", "Vitamin B7", "Vitamin B9", "Vitamin B12", "Vitamin C", "Vitamin D2", "Vitamin D3", "Vitamin E", "Vitamin K", "Zinc"]

//When page loads
$(window).on("load",()=>{
    //Store user nutrition info in window from DOM 
    userPreferences = $("#goals").data().userpreferences;
})

//######################## Functions ########################

//Populate top four dropdown lists and set default selection for each
const setTopFourDropdownOptions = function (){
    nutritionOptions.forEach(element => {
        $("#topFourSelection1, #topFourSelection2, #topFourSelection3, #topFourSelection4")
        .append("<option value=" + element + ">" + element + "</option>");
    });

    $("#topFourSelection1").val('Calories');
    $("#topFourSelection2").val('Protein');
    $("#topFourSelection3").val('Sodium');
    $("#topFourSelection4").val('Carbs');
}

//Check for match in given array
const duplicateExists = function(array){
    let item = ""
    while(array.length > 1){
        //Remove last array item and store in item variable
        item = array.pop()
        if($.inArray(item, array) !== -1){
            return (true)
        }
    }
    //if while loop completes, no matches were found
    return(false)
}

//Initialize bootstrap duplicate items selected warning toast
// const initializeDefaultsWarningToast = function(){
//     var toastElList = [].slice.call(document.querySelectorAll('.toast'))
//     var toastList = toastElList.map(function (toastEl) {
//       return new bootstrap.Toast(toastEl)
//     })
// }

//######################## Event Listeners ########################

//Filter list items from meal selector modal based on text input.
$('#foodItemFilter').on('keyup', (doc)=>{
    let textEntered = doc.target.value;
    textEntered = textEntered.toLowerCase();
    numListItems = $('.selectableItem').length

    //If list item doesn't match inputted text, hide and remove from document flow.
    for(i=0; i<numListItems; i++){
        let singleListItem = $('#listItem'+i).text();
        singleListItem = singleListItem.toLowerCase();
        if (singleListItem.search(textEntered) == -1){
            $('#listItem'+i).css({'position':'absolute', 'visibility':'hidden'})
            //Else, place back into flow and un-hide. Handles backspace events.
        }else{
            $('#listItem'+i).css({'position':'relative', 'visibility':'visible'})
        }
    }
});


//Quick Add: Tapping 'more options' changes text to 'fewer options'
$(".moreOptionsButton").on("click",()=>{
    if($(".moreOptionsButton").text() == "more options"){
        $(".moreOptionsButton").text("fewer options");
    }else{
        $(".moreOptionsButton").text("more options");
    }
});

//Display defaults modal if no Top Four data exists
$(window).on("load", ()=>{
    if(userPreferences.nutritionTopFour.length < 1){
        $("#userPreferencesModal").modal("toggle");
    }

    $("#userBackButton").prop("disabled", true)
    setTopFourDropdownOptions();
});

//Defaults Modal: Disable Next button if topFour dropdown selections match
$(".topFourSelection").on("click", (data)=>{
    let selections = [];
    $(".topFourSelection").each(function(){
       selections.push($(this).val())
    })
    
    if(duplicateExists(selections) === true){
        $("#defaultsNextButton").prop("disabled", true);
        $(".duplicateSelectionWarning").removeClass('hidden');
    }else{
        $("#defaultsNextButton").prop("disabled", false);
        $(".duplicateSelectionWarning").addClass('hidden');

    }
})