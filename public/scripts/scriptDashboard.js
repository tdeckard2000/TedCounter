//######################## Dashboard Script ########################

//Variable for storing user nutrition and other defaults for use in script
let userPreferences = {};
const nutritionOptions = ["Caffeine", "Calcium", "Calories", "Carbs", "Chloride", "Choline", "Cholesterol", "Chromium", "Copper", "Fat", "Fiber", "Histidine",
"Iodine", "Iron","Isoleucine", "Leucine", "Lysine", "Magnesium", "Manganese", "Methionine", "Molybdenum","Phenylalanine", "Phosphorus", "Potassium", "Protein",
"Saturated Fat", "Selenium", "Sodium", "Sugar", "Trans Fat", "Threonine", "Tryptophan", "Valine", "Vitamin A", "Vitamin B1", "Vitamin B2", "Vitamin B3",
"Vitamin B5", "Vitamin B6", "Vitamin B7", "Vitamin B9", "Vitamin B12", "Vitamin C", "Vitamin D2", "Vitamin D3", "Vitamin E", "Vitamin K", "Zinc"]

//Store user nutrition info in window from DOM when page loads
$(window).on("load",()=>{
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
const checkForMatch = function(array){
    for(i=0; i<array.length; i++){
        let compare = array[i]
        for(e=1; e<array.length; e++){
            if(compare == array[i+e]){
                console.log(compare + array[i+e])
                return (true);
            }
        }
        console.log("no match")
        return(false);
    }
}

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
        $(".moreOptionsButton").text("fewer options")
    }else{
        $(".moreOptionsButton").text("more options")
    }
});

//Defaults Modal: Display if no Top Four data exists
$(window).on("load", ()=>{
    if(userPreferences.nutritionTopFour.length < 1){
        $("#userPreferencesModal").modal("toggle");
    }

    $(".modal-footer .back").prop("disabled", true)
    setTopFourDropdownOptions();
});

//Defaults Modal: Disable Next button if dropdown selections match
$(".topFourSelection").on("click", (data)=>{
    let selections = [];
    $(".topFourSelection").each(function(index, obj){
       selections.push($(this).val())
    })
    
    checkForMatch(selections);
})