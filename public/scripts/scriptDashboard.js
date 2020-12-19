//######################## Dashboard Script ########################

//Variable for storing user nutrition and other defaults for use in script
let userPreferences = {};
const nutritionOptions = ["Caffeine", "Calcium", "Calories", "Carbs", "Chloride", "Choline", "Cholesterol", "Chromium", "Copper", "Fat", "Fiber", "Folic Acid", "Histidine",
"Iodine", "Iron","Isoleucine", "Leucine", "Lysine", "Magnesium", "Manganese", "Methionine", "Molybdenum","Phenylalanine", "Phosphorus", "Potassium", "Protein",
"Saturated Fat", "Selenium", "Sodium", "Sugar", "Trans Fat", "Threonine", "Tryptophan", "Valine", "Vitamin A", "Vitamin B1", "Vitamin B2", "Vitamin B3",
"Vitamin B5", "Vitamin B6", "Vitamin B7", "Vitamin B9", "Vitamin B12", "Vitamin C", "Vitamin D2", "Vitamin D3", "Vitamin E", "Vitamin K", "Zinc"]

//When page loads
$(window).on("load",()=>{
    //Store user nutrition info in window from DOM 
    userPreferences = $("#goals").data().userpreferences;
})

//######################## Functions ########################


//######################## Functions (Defaults Modal) ########################
//Populate top four dropdown lists on defaults modal
const setTopFourDropdownOptions = function (){
    nutritionOptions.forEach(element => {
        $("#topFourSelection1, #topFourSelection2, #topFourSelection3, #topFourSelection4")
        .append("<option value=" + element + ">" + element + "</option>");
    });

    //set default dropdown selections
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

//Populate Other Options check boxes for defaults modal
const setupDefaultsCheckboxes = function(){
    let allOptions = nutritionOptions;
    let topFourSelections = getTopFourSelection();

    //remove top four selections from "all options"
    topFourSelections.forEach(element => {
        let matchingIndex = allOptions.indexOf(element);
        //remove item at index position
        allOptions.splice(matchingIndex, 1);
    });

    //remove any existing checkboxes (if the user goes back a page)
    $(".otherFlexColumn1, .otherFlexColumn2").children("div").remove();

    for(i=0; i < allOptions.length; i=i+2){
        //add checkboxes to column 1
        $(".otherFlexColumn1").append("<div><input type='checkbox' id='" 
        + allOptions[i] + "'name='test'></input><label for='" + allOptions[i] + "'>" + allOptions[i] + "</label></div>");
        //add checkboxes to column 2
        if(allOptions[i+1] !== undefined){
            $(".otherFlexColumn2").append("<div><input type='checkbox' id='" + allOptions[i+1] 
            + "'name='test'></input><label for='" + allOptions[i+1] + "'>" + allOptions[i+1] + "</label></div>");
        }
    }
}

//Get top four selected items
const getTopFourSelection = function(){
    let selections = [];
    $(".topFourSelection").each(function(){
       selections.push($('option:selected', this).text());
    });
    return(selections);
}

//Get 'other' checkbox selections
const getOtherSelections = function(){
    let selections = [];
    $(".otherCheckBoxes :checked").each(function(){
        selections.push($(this).attr("id"));
    })
    return(selections);
}

//Get list of user 'top four' and 'other' selections
const getUserSelections = function(){
    let topFourSelections = getTopFourSelection();
    let otherSelections = getOtherSelections();
    let combinesSelections = topFourSelections.concat(otherSelections);
    return(combinesSelections);
}


//######################## Event Listeners (Filter and Quick Add) ########################

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

//######################## Event Listeners (Default Settings Modal) ########################

//Display defaults modal if no Top Four data exists
$(window).on("load", ()=>{
    if(userPreferences.nutritionTopFour.length < 1){
        $("#userPreferencesModal").modal("toggle");
        $("#defaultsBackButton").prop("disabled", true)
        setTopFourDropdownOptions();
    }
});

//Defaults Modal: Disable Next button if topFour dropdown selections match
$(".topFourSelection").on("change", ()=>{
        let selections = getTopFourSelection();
        console.log(selections)
    if(duplicateExists(selections) === true){
        $("#defaultsNextButton").prop("disabled", true);
        $(".duplicateSelectionWarning").removeClass('hidden');
    }else{
        $("#defaultsNextButton").prop("disabled", false);
        $(".duplicateSelectionWarning").addClass('hidden');

    }
})

//On Next button click, mimic next page
$("#defaultsNextButton").on("click", ()=>{
    let currentPageNumber = $(".defaultsModalBody").attr("data-page");

    if(currentPageNumber === "1"){
        //store page number in modal body
        $(".defaultsModalBody").attr("data-page", "2");
        //enable back button
        $("#defaultsBackButton").prop("disabled", false);
        //change page title
        $(".defaultsTitle").prop("textContent", "Anything else?");
        //change subtitle
        $(".defaultsSubTitle").prop("textContent", "These are optional.")
        //hide top four selectors
        $(".topFourFlexRow").addClass("hidden")
        //populate checkbox options
        setupDefaultsCheckboxes();
        //show checkboxes
        $(".otherItemsFlexRow").removeClass("hidden");

    }else if(currentPageNumber === "2"){
        //store page number in modal body
        $(".defaultsModalBody").attr("data-page", "3");
        //change page title
        $(".defaultsTitle").prop("textContent", "Let's talk goals.");
        //change subtitle
        $(".defaultsSubTitle").prop("innerHTML", "Everyone's goals are different! <br> Always consult your doctor.")
        //hide checkboxes from page 2
        $(".otherItemsFlexRow").addClass("hidden");
        //get array of user's selections from first two pages
        console.log(getUserSelections())
        //show goals input boxes
        $(".goalsFlexRow").removeClass("hidden")

}  
});

//On back button click, mimic previous page
$("#defaultsBackButton").on("click", ()=>{
    let currentPageNumber = $(".defaultsModalBody").attr("data-page");

    if(currentPageNumber === "2"){
        //store page number as class in modal body
        $(".defaultsModalBody").attr("data-page", "1");
        //disable back button
        $("#defaultsBackButton").prop("disabled", true);
        //change page title
        $(".defaultsTitle").prop("textContent", "Which nutrients are you most interested in?");
        //Change subtitle
        $(".defaultsSubTitle").prop("textContent", "These four will always be visible.")
        //show top four selectors
        $(".topFourFlexRow").removeClass("hidden")
        //hide checkboxes from page 2
        $(".otherItemsFlexRow").addClass("hidden");

    }else if(currentPageNumber === "3"){
        //store page number in modal body
        $(".defaultsModalBody").attr("data-page", "2");
        //enable back button
        $("#defaultsBackButton").prop("disabled", false);
        //change page title
        $(".defaultsTitle").prop("textContent", "Anything else?");
        //change subtitle
        $(".defaultsSubTitle").prop("textContent", "These are optional.")
        //hide top four selectors
        $(".topFourFlexRow").addClass("hidden")
        //populate checkbox options
        setupDefaultsCheckboxes();
        //show checkboxes
        $(".otherItemsFlexRow").removeClass("hidden");
        //hide goals input boxes
        $(".goalsFlexRow").addClass("hidden")
    }
});