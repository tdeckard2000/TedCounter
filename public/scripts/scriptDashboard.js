//############ Dashboard Scripts ############

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

//############ Event Listeners ############

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
})


//Tapping 'more options' changes text to 'fewer options'
$(".moreOptionsButton").on("click",()=>{
    if($(".moreOptionsButton").text() == "more options"){
        $(".moreOptionsButton").text("fewer options")
    }else{
        $(".moreOptionsButton").text("more options")
    }
});

//Open User Preferences Modal if No Top Four exists
$(window).on("load", ()=>{
    if(userPreferences.nutritionTopFour.length < 1){
        $("#userPreferencesModal").modal("toggle");
    }

    setTopFourDropdownOption();
})

const setTopFourDropdownOption = function (){
    nutritionOptions.forEach(element => {
        $("#topFourSelection1, #topFourSelection2, #topFourSelection3, #topFourSelection4")
        .append("<option value=" + element + ">" + element + "</option>")
    });
}