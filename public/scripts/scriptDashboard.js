//######################## Dashboard Script ########################

//Variable for storing user nutrition and other defaults for use in script
let userPreferences = {};

//All nutrition options
const nutritionOptions = ["caffeine", "calcium", "calories", "carbs", "chloride", "choline", "cholesterol", "chromium", "copper", "fat", "fiber", "folic acid", "histidine",
"iodine", "iron","isoleucine", "leucine", "lysine", "magnesium", "manganese", "methionine", "molybdenum","phenylalanine", "phosphorus", "potassium", "protein",
"saturated fat", "selenium", "sodium", "sugar", "trans fat", "threonine", "tryptophan", "valine", "vitamin a", "vitamin b1", "vitamin b2", "vitamin b3",
"vitamin b5", "vitamin b6", "vitamin b7", "vitamin b9", "vitamin b12", "vitamin c", "vitamin d2", "vitamin d3", "vitamin e", "vitamin k", "zinc"]

//For tracking date shown in diary; starts with today
let currentDay = new Date();

//Const for comparing dates
const todayStr = new Date().toDateString();

//Number of milliseconds in a day
const day = 86400000;

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

//Default goals for defaults modal
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

//Nutrition short for key
const keyShortForm = {
    "caffeine": "caff",
    "calcium": "ca",
    "calories": "cal",
    "carbs": "carb",
    "chloride": "cl",
    "choline": "cho",
    "cholesterol": "chol",
    "chromium": "Cr",
    "copper": "Cu",
    "fat": "fat",
    "fiber": "fibr",
    "folicAcid": "fa",
    "histidine": "his",
    "iodine": "iodi",
    "iron": "iron",
    "isoleucine": "ile",
    "leucine": "leu",
    "lysine": "lys",
    "magnesium": "Mg",
    "manganese": "Mn",
    "methionine": "M",
    "molybdenum": "Mo",
    "phenylalanine": "Phe",
    "phosphorus": "P",
    "potassium": "K",
    "protein": "prot",
    "saturatedFat": "sf",
    "selenium": "Se",
    "sodium": "sdm",
    "sugar": "sug",
    "transFat": "sf",
    "threonine": "thr",
    "tryptophan": "trp",
    "valine": "val",
    "vitaminA": "vA",
    "vitaminB1": "vB1",
    "vitaminB2": "vB2",
    "vitaminB3": "vB3",
    "vitaminB5": "vB5",
    "vitaminB6": "vB6",
    "vitaminB7": "vB7",
    "vitaminB9": "vB9",
    "vitaminB12": "vB12",
    "vitaminC": "vC",
    "vitaminD2": "vD2",
    "vitaminD3": "vD3",
    "vitaminE": "vE",
    "vitaminK": "vK",
    "zinc": "Zn"
  };

//When page loads
$(window).on("load",()=>{
    //store user nutrition info in window from DOM 
    userPreferences = $("#goals").data().userpreferences;
    //set user defined settings
    setAutoKeyboardSettings();

})

//######################## Functions (Other)########################

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

//######################## Functions (Settings Modal)########################


//disable or enable all elements on settings modal
const settingsModalElementsDisabled = function(Boolean){
    $("#usernameInput").attr("disabled", Boolean);
    $("#currentPasswordInput").attr("disabled", Boolean);
    $("#newPasswordInput").attr("disabled", Boolean);
    $("#buttonLogout").attr("disabled", Boolean);
    $("#checkboxAutoKeyboardItemSelector").attr("disabled", Boolean);
    $("#checkboxAutoKeyboardQuickAdd").attr("disabled", Boolean);
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

const setAutoKeyboardSettings = function(){
    //Autofocus cursor on Add Item modal (based on user settings)
    if(userPreferences.settings && userPreferences.settings.autoKeyboardItemSelect === true){
        $('#itemAdd').on('shown.bs.modal', ()=>{
            $('.filterInput').trigger('focus');
        });
        //check settings checkbox
        $("#checkboxAutoKeyboardItemSelector").prop("checked", true);
    }else{
        $('#itemAdd').off('shown.bs.modal');
        //uncheck settings checkbox
        $("#checkboxAutoKeyboardItemSelector").prop("checked", false);
    };

    //Autofocus cursor on Quick Add modal (based on user settings)
    if(userPreferences.settings && userPreferences.settings.autoKeyboardQuickAdd === true){
        $('#quickAdd').on('shown.bs.modal', ()=>{
            $('input.topFour').first().trigger('focus');
        });
        //Check settings checkbox
        $("#checkboxAutoKeyboardQuickAdd").prop("checked", true);
    }else{
        $('#quickAdd').off('shown.bs.modal');
        $("#checkboxAutoKeyboardQuickAdd").prop("checked", false);
    };
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
    $("#topFourSelection3").val('carbs');
    $("#topFourSelection4").val('fat');
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
            "</label><input placeholder=" + keyGoalDefaults[list[i+1]] + " id='" + list[i+1] + "'type='number' inputmode='numeric' maxlength='4' min='1' pattern= '[0-9]*' required></div>")
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

        //convert value using keyToDB & save to array
        //skip "---" selections
        if(selection !== "none"){
            selections.push(keyToDB[selection]);
        };

        i++
    }
    return(selections);
};

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

    $("#loadPreferences").removeClass("hidden"); //show loading icon
    $(".defaultsTitle").prop("textContent", "Getting your profile ready.");
    $(".defaultsSubTitle").prop("textContent", "Please wait...");
    $("#defaultsNextButton").prop("disabled", true);
    $("#defaultsBackButton").prop("disabled", true);

    $.ajax({
        type: 'POST',
        url: '/newUserGoals',
        data: {
            topFourSelections: topFourSelections,
            otherSelections: otherSelections,
            userGoals: userGoals
        }

    }).done((data)=>{

        if(data.result === true){
            setTimeout(()=>{
                $(".defaultsSubTitle").prop("textContent", "Adding some food items to get you started.");
            }, 3000);
            setTimeout(()=>{
                $(".defaultsTitle").prop("textContent", "All done!");
                $(".defaultsSubTitle").prop("textContent", "What would you like to do now?");
                $("#loadPreferences").addClass("hidden");
                //show quick tips button & get started button
                $(".defaultsFinalOptionsDiv").removeClass("hidden");
                $("#defaultsNextButton").prop("disabled", false);
                $("#defaultsBackButton").prop("disabled", false);
            }, 8000);

        }else{
            console.warn("Error saving user preferences at AJAX. - Done Catch")
            $("#loadPreferences").addClass("hidden");
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

//######################## Functions (Diary) ########################
const updatePastDiary = async function(diaryDate){
    $(".pastView").empty(); //clear any pastDiary elements
    let pastDiary =  await getDiary(diaryDate); //get diary elements
    foodDiary = pastDiary.diaryList;
    const nutritionTopFour = userPreferences.nutritionTopFour;
    const nutritionOther = userPreferences.nutritionOther;

    //loop through each item and create diary tile for each
    for(let i = 0; i < foodDiary.length; i++){

        //if null, blank, or undefined = 0
        for(let a = 0; a < 4; a++){
            foodDiary[i].item[nutritionTopFour[a]] = foodDiary[i].item[nutritionTopFour[a]] || 0;
        };

        let wholeISODate = foodDiary[i].date;
        let hour = new Date(wholeISODate).getUTCHours();
        let minutes = new Date(wholeISODate).getUTCMinutes();
        
        minutes = (minutes < 10) ? "0" + minutes : minutes;

        $(".pastView").append(
            "<div class='container itemRowContainer'>" +
                "<div class='row itemRow collapsed' value='" + foodDiary[i]._id + "' data-toggle='collapse' data-target='#id" + foodDiary[i]._id + "'>" +
                    "<div class='col-9 itemTimeNameDiv'>" +
                        "<h2 class='itemTime'" + i + "'>" + hour + ":" + minutes  +"</h2>" +
                        "<h2 class='itemName'>" + foodDiary[i].item.name + "</h2>" +
                    "</div>" +
                    "<div class='col-3 itemValueDiv'>" +
                        "<h6 class='itemValue'>" + foodDiary[i].item[nutritionTopFour[0]] + ' ' + keyShortForm[nutritionTopFour[0]] + "</h6>" +
                        "<h6 class='itemValue'>" + foodDiary[i].item[nutritionTopFour[1]] + ' ' + keyShortForm[nutritionTopFour[1]] + "</h6>" +
                        "<h6 class='itemValue'>" + foodDiary[i].item[nutritionTopFour[2]] + ' ' + keyShortForm[nutritionTopFour[2]] + "</h6>" +
                        "<h6 class='itemValue'>" + foodDiary[i].item[nutritionTopFour[3]] + ' ' + keyShortForm[nutritionTopFour[3]] + "</h6>" +
                    "</div>" +
                "</div>" +
                "<div class='collapse itemDropdownBox' id='id" + foodDiary[i]._id + "'>" +
                    "<table class='itemDropdownTable'>"+
                    //table items are appended here later
                    "<tr class='tr1 " + foodDiary[i]._id + "'></tr>" +
                    "<tr class='tr2 " + foodDiary[i]._id + "'></tr>" +
                    "<tr class='tr3 " + foodDiary[i]._id + "'></tr>" +
                    "<tr class='tr4 " + foodDiary[i]._id + "'></tr>" +
                    "<tr class='tr5 " + foodDiary[i]._id + "'></tr>" +
                    "</table>" +
                    "<div class='itemDropdownButtons'>" +
                        "<form action='/dashboard/modifyDiary' method='POST'>" +
                            "<button name='duplicateItem' class='buttonNoFormat' value='" + JSON.stringify(foodDiary[i]) + "'>" +
                                "<img style='padding-right: 15px' class='itemDuplicateIcon' src='./files/todayPurpleButton.svg' alt='duplicateItem'>" +
                            "</button>" +
                        "</form>" +
                    "</div>" +
                "</div>" +
            "</div>"
        );

        for(e = 0; e < 5 && e < nutritionOther.length; e++){

            //if blank, null, or undefined = 0
            foodDiary[i].item[nutritionOther[e]] = foodDiary[i].item[nutritionOther[e]] || 0;

            $(".itemDropdownTable .tr1." + foodDiary[i]._id).append(
                        '<td>' + keyShortForm[nutritionOther[e]] + ':' + foodDiary[i].item[nutritionOther[e]] + '</td>'
            );
        };

        for(e = 5; e < 10 && e < nutritionOther.length; e++){

            foodDiary[i].item[nutritionOther[e]] = foodDiary[i].item[nutritionOther[e]] || 0;

            $(".itemDropdownTable .tr2." + foodDiary[i]._id).append(
                        '<td>' + keyShortForm[nutritionOther[e]] + ':' + foodDiary[i].item[nutritionOther[e]] + '</td>'
            );
        };

        for(e = 10; e < 15 && e < nutritionOther.length; e++){

            foodDiary[i].item[nutritionOther[e]] = foodDiary[i].item[nutritionOther[e]] || 0;

            $(".itemDropdownTable .tr3." + foodDiary[i]._id).append(
                        '<td>' + keyShortForm[nutritionOther[e]] + ':' + foodDiary[i].item[nutritionOther[e]] + '</td>'
            );
        };

        for(e = 15; e < 20 && e < nutritionOther.length; e++){

            foodDiary[i].item[nutritionOther[e]] = foodDiary[i].item[nutritionOther[e]] || 0;

            $(".itemDropdownTable .tr4." + foodDiary[i]._id).append(
                        '<td>' + keyShortForm[nutritionOther[e]] + ':' + foodDiary[i].item[nutritionOther[e]] + '</td>'
            );
        };

        for(e = 20; e < 25 && e < nutritionOther.length; e++){

            foodDiary[i].item[nutritionOther[e]] = foodDiary[i].item[nutritionOther[e]] || 0;

            $(".itemDropdownTable .tr5." + foodDiary[i]._id).append(
                        '<td>' + keyShortForm[nutritionOther[e]] + ':' + foodDiary[i].item[nutritionOther[e]] + '</td>'
            );
        };
    };
};

const getDiary = function(diaryDate){
    diaryDate = diaryDate.toISOString();
    return new Promise((resolve, reject)=>{
        $.ajax({
            type: 'GET',
            url: "./getDiary",
            data: {diaryDate: diaryDate}
        }).done((diaryList)=>{
            resolve(diaryList);
        });
    })
};


//######################## Event Listeners (Select Item Modal and Quick Add modal) ########################

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

//If item selector open, handle enter key
$("#foodItemFilter").on("keydown", (event)=>{
    let key = event.key;

    //enter key "clicks" first item in list, ignoring items filtered out
    if (key === "Enter"){
        event.preventDefault();
        let firstRemainingItem = $(".selectableItem .visible").first();
        firstRemainingItem.trigger("click");
    }
});

//Highlight selected item in item selector
$(".selectableItem").on("click", function(){
    $(this).css("background-color", "#e7f3ff")
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
        $(".defaultsSubTitle").prop("textContent", "If there are other nutrients you would like to track, select them here.");
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
        $(".defaultsSubTitle").prop("innerHTML", "Enter your goals for each nutrient. <br> Values provided are for reference only. <br> Always consult your doctor.");
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
        $(".defaultsSubTitle").prop("textContent", "These will always be visible at the top of the page, so select your favorites.");
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
        $(".defaultsSubTitle").prop("textContent", "If there are other nutrients you would like to track, select them here.");
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
        $(".defaultsSubTitle").prop("innerHTML", "Enter your goals for each nutrient. <br> Values provided are for reference only. <br> Always consult your doctor.");
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
$("#buttonOpenQuickTipsModal").on("click", ()=>{
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

//Handle click of Save button on settings modal
$("#settingsSaveButton").on("click", function(){

    $(this).prop("innerText", "Saving...");
    $("#settingsSaveButton").attr("disabled", true)
    settingsModalElementsDisabled(true);
    
    //show loading icon
    $("#loadSettings").removeClass("hidden");

    //get checkbox and text selections
    let checkboxAutoOpenItemSelector = $("#checkboxAutoKeyboardItemSelector").prop("checked");
    let checkboxAutoOpenQuickAdd = $("#checkboxAutoKeyboardQuickAdd").prop("checked");
    let newUsername = $("#usernameInput").val();
    let currentPassword = $("#currentPasswordInput").val();
    let newPassword = $("#newPasswordInput").val();

    $.ajax({
        method:"POST",
        url: "/updateUserPreferences",
        data: {
            checkboxAutoOpenItemSelector: checkboxAutoOpenItemSelector,
            checkboxAutoOpenQuickAdd: checkboxAutoOpenQuickAdd,
            newUsername: newUsername,
            currentPassword: currentPassword,
            newPassword: newPassword
        }
    }).done((data)=>{

        setTimeout(()=>{

            //if save is successful
            if(data.settingsChanged === true){

                //if attempted password change failed
                if(data.passwordChanged != null && data.passwordChanged == false){
                    $(".changePasswordError").removeClass("hidden");
                    $(".changePasswordSuccess").addClass("hidden");
                }else if(data.passwordChanged != null){
                    $(".changePasswordError").addClass("hidden");
                    $(".changePasswordSuccess").removeClass("hidden");
                }

                $(this).prop("innerText", "Done!");
                settingsModalElementsDisabled(false);

                //hide loading icon
                $("#loadSettings").addClass("hidden");

                //update username on modal if changed
                if(newUsername){
                    $("#usernameInput").prop("placeholder", newUsername);
                    $("#settingsModal .modal-title").prop("innerText", "Hello, " + newUsername)
                };

                //update auto open keyboard settings
                userPreferences.settings.autoKeyboardItemSelect = checkboxAutoOpenItemSelector;
                userPreferences.settings.autoKeyboardQuickAdd = checkboxAutoOpenQuickAdd;
                setAutoKeyboardSettings();

                //clear text fields
                settingsModalClearText();

            }else{
                $(this).prop("innerText", "Unable to Save");
                settingsModalElementsDisabled(false);

                //hide loading icon
                $("#loadSettings").addClass("hidden");
            };

            setTimeout(()=>{
                $(this).prop("innerText", "Save");
            }, 2500)
        }, 4000)
    });
});

//Enable save button on checkbox toggle
$("#checkboxAutoKeyboardQuickAdd, #checkboxAutoKeyboardItemSelector").on("click", ()=>{
    $("#settingsSaveButton").prop("disabled", false);
});

//Enable save button on new password text boxes use
$("#usernameInput, #newPasswordInput").on("keyup", ()=>{
    if($("#newPasswordInput").val().length >= 8 && $("#currentPasswordInput").val().length >= 8){
        $("#settingsSaveButton").prop("disabled", false);
    };
});

//Enable save button on new username text box use
$("#usernameInput").on("keyup", ()=>{
    $("#settingsSaveButton").prop("disabled", false);
});

//######################## Event Listeners (Diary List) ########################
//Darken diary title when open
$(".itemRow").on("click", function(){
    if($(this).hasClass("collapsed")){
        $(this).css("background-color", "#fcfcfc");
    }else{
        $(this).css("background-color", "#FFFFFF");
    }
});

//Darken duplicate icon on select
$(".itemDuplicateIcon").on("click", function(){
    console.log("here")
    $(this).css("filter", "saturate(0)");
});

//Darken trash icon on select
$(".itemTrashIcon").on("click", function(){
    $(this).css("filter", "saturate(0)");
});

//Darken purple today button on select
$(".pastView").on("click", "button", function(){
    console.log("here2")
    $(this).css("filter", "saturate(0)")
});

//Darken Profile, Quick, and Add buttons on mouse down
$(".buttonQuickAdd, .buttonAddItem, .buttonSettings, .buttonToday").on("mousedown", function(){
    // $(this).css("filter", "brightness(0.7)");
    $(this).css("opacity", ".55");
    $(this).css("border", "5px solid #404040");
});

//Un-darken Profile, Quick, and Add buttons on mouseup
$(".buttonQuickAdd, .buttonAddItem, .buttonSettings, .buttonToday").on("mouseup", function(){
    $(this).animate({
        borderWidth: 0,
        opacity: .7
    }, 120);
});

//Un-darken Profile, Quick, and Add buttons if mouse leaves button
$(".buttonQuickAdd, .buttonAddItem, .buttonSettings, .buttonToday").on("mouseleave", function(){
    $(this).animate({
        borderWidth: 0,
        opacity: .7
    }, 120);
});

//######################## Event Listeners (Bottom Date Selector) ########################

//Back button click
$("#diaryBackButton").on("click", ()=>{

    currentDay = new Date(currentDay - day); //subtract a day from currentDay

    //update displayed date
    let dateText = (currentDay.toDateString()).slice(0, 10);
    $("#diaryTodayButton").text(dateText);
    
    //show forward button, hide item select buttons & main diary
    $("#diaryForwardButton").css("opacity", 1);
    $("#diaryForwardButton").attr("disabled", false);
    $("#diaryForwardButton").css("cursor", "pointer");
    $(".buttonAddItem").addClass("hidden");
    $(".buttonQuickAdd").addClass("hidden");
    $(".todayView").addClass("hidden");
    $(".buttonToday").removeClass("hidden");
    $(".pastView").removeClass("hidden");

    //update pastDiary view
    updatePastDiary(currentDay);

});

//Forward button click
$("#diaryForwardButton").on("click", ()=>{

    let milliseconds = (currentDay.getTime() + day); //add a day (in ms)
    currentDay = new Date(milliseconds); //convert ms to date

    //if past date is currently selected
    if(Date.parse(currentDay.toDateString()) < Date.parse(todayStr)){

        //update displayed date
        let dateText = (currentDay.toDateString()).slice(0, 10);
        $("#diaryTodayButton").text(dateText);
            //update pastDiary view
            updatePastDiary(currentDay);

    }else{
        //hide forward button, show select buttons, show present diary
        $("#diaryForwardButton").css("opacity", 0);
        $("#diaryForwardButton").css("cursor", "default");
        $("#diaryTodayButton").text("Today");
        $(".buttonAddItem").removeClass("hidden");
        $(".buttonQuickAdd").removeClass("hidden");
        $(".todayView").removeClass("hidden");
        $(".buttonToday").addClass("hidden");
        $(".pastView").addClass("hidden");
    };
});

//Cancel button click
$(".buttonToday").on("click", ()=>{
    //hide forward button, show select buttons, show present diary
    $("#diaryForwardButton").css("opacity", 0);
    $("#diaryForwardButton").css("cursor", "default");
    $("#diaryTodayButton").text("Today");
    $(".buttonAddItem").removeClass("hidden");
    $(".buttonQuickAdd").removeClass("hidden");
    $(".todayView").removeClass("hidden");
    $(".buttonToday").addClass("hidden");
    $(".pastView").addClass("hidden");
    currentDay = new Date();
});