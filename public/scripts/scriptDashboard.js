//######################## Dashboard Script ########################

//Variable for storing user nutrition and other defaults for use in script
let userPreferences = {};

const nutritionOptions = ["caffeine", "calcium", "calories", "carbs", "chloride", "choline", "cholesterol", "chromium", "copper", "fat", "fiber", "folic acid", "histidine",
"iodine", "iron","isoleucine", "leucine", "lysine", "magnesium", "manganese", "methionine", "molybdenum","phenylalanine", "phosphorus", "potassium", "protein",
"saturated fat", "selenium", "sodium", "sugar", "trans fat", "threonine", "tryptophan", "valine", "vitamin a", "vitamin b1", "vitamin b2", "vitamin b3",
"vitamin b5", "vitamin b6", "vitamin b7", "vitamin b9", "vitamin b12", "vitamin c", "vitamin d2", "vitamin d3", "vitamin e", "vitamin k", "zinc"]

//Convert values to DB friendly format
const keyToDB = {
    "caffeine": "caffeine",
    "calcium": "calcium",
    "calories": "calories",
    "carbs": "carbs",
    "chloride": "chloride",
    "choline": "choline",
    "cholesterol": "cholesterol",
    "chromium": "chromium",
    "copper": "copper",
    "fat": "fat",
    "fiber": "fiber",
    "folic acid": "folicAcid",
    "histidine": "histidine",
    "iodine": "iodine",
    "iron": "iron",
    "isoleucine": "isoleucine",
    "leucine": "leucine",
    "lysine": "lysine",
    "magnesium": "magnesium",
    "manganese": "manganese",
    "methionine": "methionine",
    "molybdenum": "molybdenum",
    "phenylalanine": "phenylalanine",
    "phosphorus": "phosphorus",
    "potassium": "potassium",
    "protein": "protein",
    "saturated fat": "saturatedFat",
    "selenium": "selenium",
    "sodium": "sodium",
    "sugar": "sugar",
    "trans fat": "transFat",
    "threonine": "threonine",
    "tryptophan": "tryptophan",
    "valine": "valine",
    "vitamin a": "vitaminA",
    "vitamin b1": "vitaminB1",
    "vitamin b2": "vitaminB2",
    "vitamin b3": "vitaminB3",
    "vitamin b5": "vitaminB5",
    "vitamin b6": "vitaminB6",
    "vitamin b7": "vitaminB7",
    "vitamin b9": "vitaminB9",
    "vitamin b12": "vitaminB12",
    "vitamin c": "vitaminC",
    "vitamin d2": "vitaminD2",
    "vitamin d3": "vitaminD3",
    "vitamin e": "vitaminE",
    "vitamin k": "vitaminK",
    "zinc": "zinc"
}

//Convert values to human readable format
const keyToHuman = {
    "caffeine": "Caffeine mg",
    "calcium": "Calcium mg",
    "calories": "Calories",
    "carbs": "Carbs g",
    "chloride": "Chloride mg",
    "choline": "Choline mg",
    "cholesterol": "Cholesterol mg",
    "chromium": "Chromium mcg",
    "copper": "Copper %dv",
    "fat": "Fat g",
    "fiber": "Fiber g",
    "folicAcid": "Folic Acid mcg",
    "histidine": "Histidine mg",
    "iodine": "Iodine mcg",
    "iron": "Iron %dv",
    "isoleucine": "Isoleucine mg",
    "leucine": "Leucine mg",
    "lysine": "Lysine mg",
    "magnesium": "Magnesium mg",
    "manganese": "Manganese mg",
    "methionine": "Methionine mg",
    "molybdenum": "Molybdenum mcg",
    "phenylalanine": "Phenylalanine mg",
    "phosphorus": "Phosphorus mg",
    "potassium": "Potassium mg",
    "protein": "Protein g",
    "saturatedFat": "Saturated Fat g",
    "selenium": "Selenium mcg",
    "sodium": "Sodium mg",
    "sugar": "Sugar g",
    "transFat": "Trans Fat g",
    "threonine": "Threonine mg",
    "tryptophan": "Tryptophan mg",
    "valine": "Valine mg",
    "vitaminA": "Vitamin A %dv",
    "vitaminB1": "Vitamin B1 %dv",
    "vitaminB2": "Vitamin B2 %dv",
    "vitaminB3": "Vitamin B3 %dv",
    "vitaminB5": "Vitamin B5 %dv",
    "vitaminB6": "Vitamin B6 %dv",
    "vitaminB7": "Vitamin B7 %dv",
    "vitaminB9": "Vitamin B9 %dv",
    "vitaminB12": "Vitamin B12 %dv",
    "vitaminC": "Vitamin C %dv",
    "vitaminD2": "Vitamin D2 %dv",
    "vitaminD3": "Vitamin D3 %dv",
    "vitaminE": "Vitamin E %dv",
    "vitaminK": "Vitamin K %dv",
    "zinc": "Zinc %dv"
}

//Convert Values to original format
const keyToNormal = {
    "caffeine": "Caffeine",
    "calcium": "Calcium",
    "calories": "Calories",
    "carbs": "Carbs",
    "chloride": "Chloride",
    "choline": "Choline",
    "cholesterol": "Cholesterol",
    "chromium": "Chromium",
    "copper": "Copper",
    "fat": "Fat",
    "fiber": "Fiber",
    "folicAcid": "Folic Acid",
    "histidine": "Histidine",
    "iodine": "Iodine",
    "iron": "Iron",
    "isoleucine": "Isoleucine",
    "leucine": "Leucine",
    "lysine": "Lysine",
    "magnesium": "Magnesium",
    "manganese": "Manganese",
    "methionine": "Methionine",
    "molybdenum": "Molybdenum",
    "phenylalanine": "Phenylalanine",
    "phosphorus": "Phosphorus",
    "potassium": "Potassium",
    "protein": "Protein",
    "saturatedFat": "Saturated Fat",
    "selenium": "Selenium",
    "sodium": "Sodium",
    "sugar": "Sugar",
    "transFat": "Trans Fat",
    "threonine": "Threonine",
    "tryptophan": "Tryptophan",
    "valine": "Valine",
    "vitaminA": "Vitamin A",
    "vitaminB1": "Vitamin B1",
    "vitaminB2": "Vitamin B2",
    "vitaminB3": "Vitamin B3",
    "vitaminB5": "Vitamin B5",
    "vitaminB6": "Vitamin B6",
    "vitaminB7": "Vitamin B7",
    "vitaminB9": "Vitamin B9",
    "vitaminB12": "Vitamin B12",
    "vitaminC": "Vitamin C",
    "vitaminD2": "Vitamin D2",
    "vitaminD3": "Vitamin D3",
    "vitaminE": "Vitamin E",
    "vitaminK": "Vitamin K",
    "zinc": "Zinc"
}

const keyGoalDefaults = {
    "caffeine": 400,
    "calcium": 2500,
    "calories": 2000,
    "carbs": 300,
    "chloride": 2300,
    "choline": 450,
    "cholesterol": 300,
    "chromium": 30,
    "copper": 100,
    "fat": 55,
    "fiber": 30,
    "folicAcid": 400,
    "histidine": 14,
    "iodine": 150,
    "iron": 19,
    "isoleucine": 19,
    "leucine": 14,
    "lysine": 1000,
    "magnesium": 360,
    "manganese": 2,
    "methionine": 1400,
    "molybdenum": 90,
    "phenylalanine": 150,
    "phosphorus": 700,
    "potassium": 3600,
    "protein": 70,
    "saturatedFat": 16,
    "selenium": 55,
    "sodium": 2300,
    "sugar": 36,
    "transFat": 2,
    "threonine": 500,
    "tryptophan": 300,
    "valine": 1700,
    "vitaminA": 100,
    "vitaminB1": 100,
    "vitaminB2": 100,
    "vitaminB3": 100,
    "vitaminB5": 100,
    "vitaminB6": 100,
    "vitaminB7": 100,
    "vitaminB9": 100,
    "vitaminB12": 100,
    "vitaminC": 100,
    "vitaminD2": 100,
    "vitaminD3": 100,
    "vitaminE": 100,
    "vitaminK": 100,
    "zinc": 100
}

//When page loads
$(window).on("load",()=>{
    //Store user nutrition info in window from DOM 
    userPreferences = $("#goals").data().userpreferences;
})

//######################## Functions ########################

//alphabetically order given array
const orderAlphabetically = function(startingPoint, unorderedArray){
    let valueChanged = false;
    while(valueChanged === false){
        valueChanged = true;
        for(let i=startingPoint; i<=unorderedArray.length; i++){
            //end loop if nothing left to compare
            if(unorderedArray[i+1] == undefined){
            break
            }
            let obj1 = unorderedArray[i];
            let obj2 = unorderedArray[i+1];

            if(obj1 > obj2){
            let item1 = unorderedArray[i];
            let item2 = unorderedArray[i+1];
            unorderedArray.splice(i, 2, item2, item1);
            valueChanged = false;
            }
        }
    }
    return unorderedArray //now ordered alphabetically
}

//disable or enable all elements on settings modal
const settingsModalElementsDisabled = function(Boolean){
    $("#usernameInput").attr("disabled", Boolean);
    $("#currentPasswordInput").attr("disabled", Boolean);
    $("#newPasswordInput").attr("disabled", Boolean);
    $("#buttonLogout").attr("disabled", Boolean);
    $("#checkboxAutoKeyboard").attr("disabled", Boolean);
    $("#settingsCancelButton").attr("disabled", Boolean);
    $("#topFourButton").attr("disabled", Boolean);
    $("#otherNutritionButton").attr("disabled", Boolean);
}

//clear text fields on settings modal
const settingsModalClearText = function(){
    $("#usernameInput").val("");
    $("#currentPasswordInput").val("");
    $("#newPasswordInput").val("");
}

//######################## Functions (Defaults Modal) ########################
//Populate top four dropdown lists on defaults modal
const setTopFourDropdownOptions = function (){
    nutritionOptions.forEach(element => {
        $("#topFourSelection1, #topFourSelection2, #topFourSelection3, #topFourSelection4")
        .append("<option value='" + element + "'>" + element + "</option>");
    });

    //set default dropdown selections
    $("#topFourSelection1").val('calories');
    $("#topFourSelection2").val('protein');
    $("#topFourSelection3").val('sodium');
    $("#topFourSelection4").val('carbs');
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

//Populate 'Other Options' check boxes for defaults modal
const setupDefaultsCheckboxes = function(){
    //Array.from creates a copy of the array, otherwise it's just a reference
    let allOptions = Array.from(nutritionOptions);
    let topFourSelections = getTopFourSelections();

    //remove top four selections from 'allOptions' array
    topFourSelections.forEach(element => {
        element = keyToNormal[element]; //convert element to human readable version
        element = element.toLowerCase(); //allOptions are lowercase, make element lowercase too

        let matchingIndex = allOptions.indexOf(element);

        if(matchingIndex !== -1){
        allOptions.splice(matchingIndex, 1);
        }
    });

    //remove any existing checkboxes (if the user toggles pages)
    $(".otherFlexColumn1, .otherFlexColumn2").children("div").remove();

    //populate checkboxes split into two columns
    for(i=0; i < allOptions.length; i=i+2){
        $(".otherFlexColumn1").append("<div><input type='checkbox' id='" 
        + allOptions[i] + "'name='test'></input><label for='" + allOptions[i] + "'>" + allOptions[i] + "</label></div>");

        if(allOptions[i+1] !== undefined){
            $(".otherFlexColumn2").append("<div><input type='checkbox' id='" + allOptions[i+1] 
            + "'name='test'></input><label for='" + allOptions[i+1] + "'>" + allOptions[i+1] + "</label></div>");
        }
    }
}

//Populate 'Goals' text input boxes
const setupDefaultsGoalsTextBoxes = function(){
    let list = getUserSelections();
    //order list alphabetically (keeping top four intact)
    list = orderAlphabetically(4, list);

    //remove any existing input boxes (if user toggles pages)
    $(".goalsFlexColumn1, .goalsFlexColumn2").children("div").remove();

    //populate input boxes split into two columns
    for(i=0; i < list.length; i = i+2){
        $(".goalsFlexColumn1").append("<div><label for='" + list[i] + "'>" + keyToHuman[list[i]] +
         "</label><input placeholder=" + keyGoalDefaults[list[i]] + " id='" + list[i] + "'type='number' inputmode='numeric' maxlength='4' min='1' pattern= '[0-9]*' required></div>")

         if(list[i+1] !== undefined){
            $(".goalsFlexColumn2").append("<div><label for='" + list[i+1] + "'>" + keyToHuman[list[i+1]] +
            "</label><input placeholder=" + keyGoalDefaults[list[i]] + " id='" + list[i+1] + "'type='number' inputmode='numeric' maxlength='4' min='1' pattern= '[0-9]*' required></div>")
         }

    }

}

//Get top four selected items
const getTopFourSelections = function(){
    let selections = [];
    let i = 1;
    while(i < 5){
        //get value of each dropdown box
        let selection = ($("#topFourSelection" + i).find('option:selected').val());
        //convert the value using keyToDB & save to array
        selections.push(keyToDB[selection]);
        i++;
    }
    return(selections);
}

//Get 'other' checkbox selected items
const getOtherSelections = function(){
    let selections = [];
    $(".otherCheckBoxes :checked").each(function(){
        let selection = ($(this).attr("id")); //get selection
        selections.push(keyToDB[selection]); //convert selection to DB friendly format
    })
    return(selections);
}

//Get combined list of user 'top four' and 'other' selected items
const getUserSelections = function(){
    let topFourSelections = getTopFourSelections();
    let otherSelections = getOtherSelections();
    let combinesSelections = topFourSelections.concat(otherSelections);
    return(combinesSelections);
}

//Disable or enable next button on first page of defaults modal
const toggleDefaultsNextButton = function(){
    let topFourSelections = getTopFourSelections();
    let disclaimerChecked = $("#disclaimerCheckbox").prop("checked");

    //Check if disclaimer box is checked & if top four selections match
    if(duplicateExists(topFourSelections) === true || disclaimerChecked === false){
        $("#defaultsNextButton").prop("disabled", true);
    }else if(duplicateExists(topFourSelections) === false && disclaimerChecked === true){
        $("#defaultsNextButton").prop("disabled", false);
    }
}

//Get goals from text inputs
const getUserGoals = function(){
    let userGoals = {};
    let itemName = "";
    let itemValue = 0;

    $(".goalsFlexRow input").each(function(data){
            itemName = this.id;
            itemValue = $(this).val();
            userGoals[itemName] = itemValue;
    });


    return userGoals;
}

//Send user goals to server to be saved
const postDefaultSelections = function(){
    let topFourSelections = JSON.stringify(getTopFourSelections());
    let otherSelections = JSON.stringify(getOtherSelections());
    let userGoals = JSON.stringify(getUserGoals());

    $(".loadingIndicatorDiv").removeClass("hidden"); //show loading icon
    $(".defaultsTitle").prop("textContent", "Saving your preferences.");
    $(".defaultsSubTitle").prop("textContent", "Please wait...");
    $("#defaultsNextButton").prop("disabled", true);
    $("#defaultsBackButton").prop("disabled", true);

    $.ajax({
        type: 'POST',
        url: '/updateUserGoals',
        data: {
            topFourSelections: topFourSelections,
            otherSelections: otherSelections,
            userGoals: userGoals
        }

    }).done((data)=>{

        if(data.result === true){
            setTimeout(()=>{
                $(".defaultsTitle").prop("textContent", "Saved!");
            }, 3000);
            setTimeout(()=>{
                $(".defaultsTitle").prop("textContent", "Getting your account ready.");
                $(".defaultsSubTitle").prop("textContent", "Adding some food items to get you started.");
            }, 3000);
            setTimeout(()=>{
                $(".defaultsTitle").prop("textContent", "All done!");
                $(".defaultsSubTitle").prop("textContent", "What would you like to do now?");
                $(".loadingIndicatorDiv").addClass("hidden");
                //show quick tips button & get started button
                $(".defaultsFinalOptionsDiv").removeClass("hidden");
                $("#defaultsNextButton").prop("disabled", false);
                $("#defaultsBackButton").prop("disabled", false);
            }, 8000);

        }else{
            console.warn("Error saving user preferences at AJAX. - Done Catch")
            $(".loadingIndicatorDiv").addClass("hidden");
            $(".defaultsTitle").prop("textContent", "Error saving.. dang!");
            $(".defaultsSubTitle").prop("textContent", "Tap the Back button, then Submit again.");
            $("#defaultsBackButton").prop("disabled", false);
        }

    }).fail(()=>{
        console.warn("Error saving user preferences at AJAX. - Fail Catch")
        $(".loadingIndicatorDiv").addClass("hidden");
        $(".defaultsTitle").prop("textContent", "Error reaching server.. dang!");
        $(".defaultsSubTitle").html("Tap the Back button, then Submit again. <br/> Be sure to check your internet connection.");
        $("#defaultsBackButton").prop("disabled", false);
    });
}

//######################## Event Listeners (Filter and Quick Add) ########################

//Filter list items from meal selector modal based on text input.
$('#foodItemFilter').on('keyup', (doc)=>{
    let textEntered = doc.target.value;
    textEntered = textEntered.toLowerCase();
    numListItems = $('.selectableItem').length

    //if list item doesn't match inputted text, hide and remove from document flow.
    for(i=0; i<numListItems; i++){
        let singleListItem = $('#listItem'+i).text();
        singleListItem = singleListItem.toLowerCase();
        if (singleListItem.search(textEntered) == -1){
            $('#listItem'+i).addClass("hidden").removeClass("visible");
            //else, place back into flow and un-hide. Handles backspace events.
        }else{
            //visible class is used for determining enter key selection
            $('#listItem'+i).removeClass("hidden").addClass("visible");
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

//Disclaimer checkbox -> enable Next button if no top four matches and disclaimer checked
$("#disclaimerCheckbox").on("click", function(){
    toggleDefaultsNextButton();
});

//Top Four drop-down -> enable Next button if no matches or disclaimer unchecked
$(".topFourSelection").on("change", ()=>{
    let topFourSelections = getTopFourSelections();
    toggleDefaultsNextButton();
    
    if(duplicateExists(topFourSelections) === true){
        $(".duplicateSelectionWarning").removeClass('hidden');
    }else{
        $(".duplicateSelectionWarning").addClass('hidden');
    }
})

//On Next button click, mimic next page
$("#defaultsNextButton").on("click", function(){
    let currentPageNumber = $(".defaultsModalBody").attr("data-page");

    if(currentPageNumber === "1"){
        //store page number in modal body
        $(".defaultsModalBody").attr("data-page", "2");
        //enable back button
        $("#defaultsBackButton").prop("disabled", false);
        //change page title
        $(".defaultsTitle").prop("textContent", "Anything else?");
        //change subtitle
        $(".defaultsSubTitle").prop("textContent", "These are optional.");
        //hide top four selectors
        $(".topFourFlexRow").addClass("hidden");
        //hide disclaimer checkbox and link
        $(".disclaimerDiv, .disclaimerLink").addClass("hidden");
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
        $(".defaultsSubTitle").prop("innerHTML", "Values provided are for reference only. <br> Always consult your doctor.");
        //hide checkboxes from page 2
        $(".otherItemsFlexRow").addClass("hidden");
        //get array of user's selections from first two pages
        setupDefaultsGoalsTextBoxes();
        //show goals input boxes
        $(".goalsFlexRow").removeClass("hidden");
        //change Next button text to 'Submit'
        $("#defaultsNextButton").addClass("hidden");
        $("#defaultsSubmitButton").removeClass("hidden");
        
    }else if(currentPageNumber === "4"){ //3 is handled at submit event below
        location.reload();
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
        $(".defaultsSubTitle").prop("textContent", "These four will always be visible.");
        //show top four selectors
        $(".topFourFlexRow").removeClass("hidden");
        //show disclaimer link and checkbox
        $(".disclaimerDiv, .disclaimerLink").removeClass("hidden");
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
        $(".defaultsSubTitle").prop("textContent", "These are optional.");
        //hide top four selectors
        $(".topFourFlexRow").addClass("hidden");
        //populate checkbox options
        // setupDefaultsCheckboxes();
        //show checkboxes
        $(".otherItemsFlexRow").removeClass("hidden");
        //hide goals input boxes
        $(".goalsFlexRow").addClass("hidden");
        //show Next button
        $("#defaultsNextButton").removeClass("hidden");
        //hide submit button
        $("#defaultsSubmitButton").addClass("hidden")

    }else if(currentPageNumber === "4"){
        //store page number in modal body
        $(".defaultsModalBody").attr("data-page", "3");
        //change page title
        $(".defaultsTitle").prop("textContent", "Let's talk goals.");
        //change subtitle
        $(".defaultsSubTitle").prop("innerHTML", "Everyone's goals are different! <br> Always consult your doctor.");
        //show goals input boxes
        $(".goalsFlexRow").removeClass("hidden");
        //update & show Next button
        $("#defaultsNextButton").text("Next").attr("data-dismiss", "").addClass("hidden").prop("disabled", false);
        //show submit button
        $("#defaultsSubmitButton").removeClass("hidden");
        //hide quick tips and get started buttons
        $(".defaultsFinalOptionsDiv").addClass("hidden");
    }
});

//Validate 'Submit' action on page 3 'goal' inputs
$(".defaultsForm").on("submit", (e)=>{
    e.preventDefault();
     //store page number in modal body
     $(".defaultsModalBody").attr("data-page", "4");
     //change page title
     $(".defaultsTitle").prop("textContent", "All done!");
     //change subtitle
     $(".defaultsSubTitle").prop("innerHTML", "What would you like to do now?");
    //hide goal input boxes
     $(".goalsFlexRow").addClass("hidden");
    //update next button
    $("#defaultsNextButton").removeClass("hidden");
    $("#defaultsSubmitButton").addClass("hidden");
    $("#defaultsNextButton").text("Close").prop("type", "button").attr("data-dismiss", "modal");
    //send selections to server to be saved
     postDefaultSelections();
});

$("#buttonCloseDefaults").on("click", ()=>{
    location.reload();
})

//(dev) Re-open defaults modal
$("#buttonOpenDefaultsModal").on("click", ()=>{
    $("#userPreferencesModal").modal("toggle");
    $("#defaultsBackButton").prop("disabled", true)
    setTopFourDropdownOptions();
});

//######################## Event Listeners (Main Settings Modal) ########################

//Highlight tab when clicked
$("#tabCharts, #tabPreferences, #tabProfile").on("click",function(){
    $("#tabCharts, #tabPreferences, #tabProfile").removeClass("active");
    $(this).addClass("active");
});

//Show content in modal based on selected tab
$("#tabCharts, #tabPreferences, #tabProfile").on("click",function(){
    $(".chartsPage, .preferencesPage, .profilePage").addClass("hidden");

    let selectedTab = $(this).attr("id");
    if(selectedTab === "tabCharts"){
        $(".chartsPage").removeClass("hidden");

    }else if(selectedTab == "tabPreferences"){
        $(".preferencesPage").removeClass("hidden");

    }else if(selectedTab === "tabProfile"){
        $(".profilePage").removeClass("hidden");
    }
});

//######################## Event Listeners (other) ########################

//Autofocus cursor on Add Item modal
$('#itemAdd').on('shown.bs.modal', ()=>{
    $('.filterInput').trigger('focus');
});

//Autofocus cursor on Quick Add modal
$('#quickAdd').on('shown.bs.modal', ()=>{
    $('input.topFour').first().trigger('focus');
});

//If item selector open, handle enter key
$("#foodItemFilter").on("keydown", (event)=>{
    let key = event.key;

    //enter key "clicks" first item in list, ignoring items filtered out
    if (key === "Enter"){
        event.preventDefault();
        let firstRemainingItem = $(".selectableItem .visible").first();
        console.log(firstRemainingItem)
        firstRemainingItem.trigger("click");
    }
});

//Handle click of Save button on settings modal
$("#settingsSaveButton").on("click", function(){

    $(this).prop("innerText", "Saving...");
    $("#settingsSaveButton").attr("disabled", true)
    settingsModalElementsDisabled(true);

    //get checkbox and text selections
    let checkboxAutoOpen = $("#checkboxAutoKeyboard").prop("checked");
    let newUsername = $("#usernameInput").val();
    let currentPassword = $("#currentPasswordInput").val();
    let newPassword = $("#newPasswordInput").val();

    $.ajax({
        method:"POST",
        url: "/updateUserPreferences",
        data: {
            checkboxAutoOpen: checkboxAutoOpen,
            newUsername: newUsername,
            currentPassword: currentPassword,
            newPassword: newPassword
        }
    }).done((data)=>{

        setTimeout(()=>{

            //If save is successful
            if(data.result === true){
                $(this).prop("innerText", "Saved!");
                settingsModalElementsDisabled(false);

                //update username on modal
                if(newUsername){
                    $("#usernameInput").prop("placeholder", newUsername);
                    $("#settingsModal .modal-title").prop("innerText", "Hello, " + newUsername)
                }

                //clear text fields
                settingsModalClearText();

            }else{
                $(this).prop("innerText", "Unable to Save");
                settingsModalElementsDisabled(false);
            }

            setTimeout(()=>{
                $(this).prop("innerText", "Save");
            }, 3000)
        }, 5000)
    })
});