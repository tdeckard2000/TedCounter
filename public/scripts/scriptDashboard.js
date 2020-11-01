//Not Needed?
// $('.saveMealDiv input').on('propertychange input', (doc)=>{
//     let input = doc.target.value;
//     let className = doc.currentTarget.attributes[0].textContent;
//     className = className.replace(' ', '.');
//     for(let i=0; i < input.length; i++){
//         if (!$.isNumeric(input[i])){
//             input = input.replace(input[i],'');
//             $('.' + className).val(input);
//         }
//     }
// });

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

//Below has been replaced with server-side code
//Calculate total of selected nutrition info
// const getTotal = function(tableRowPosition, tableColumnPosition){
//     numDiaryItems = $('.itemDropdownTable').length;
//     let totalValue = 0;
//     //loop through each diary item
//     for(i=0; i<numDiaryItems; i++){
//         //get specific diary item nutrition info based on position in table
//         itemNutritionInfo = $('.itemDropdownTable')[i].rows[tableRowPosition].cells[tableColumnPosition].innerHTML;
//         //get number from item string "cal:120" --> int 120
//         itemNutritionInfoValue = parseInt(itemNutritionInfo.split(': ')[1]);
//         //filter out empty values and add remaining numbers to total
//         if(itemNutritionInfoValue > 0){
//             totalValue+=itemNutritionInfoValue;
//         }
//     }
//     return totalValue;
// }

//Below has been replaced with server-side code
// //Update header counts with calculated total
// $(document).ready(()=>{
//     let totalCal = getTotal(0, 0);
//     let totalSdm = getTotal(0, 1);
//     let totalPro = getTotal(0,2);
//     let totalCrb = getTotal(0,3);
//     console.log(totalCal)
//     $('.topTotalCount')[0].innerHTML = totalCal;
//     $('.topTotalCount')[1].innerHTML = totalSdm;
//     $('.topTotalCount')[2].innerHTML = totalPro;
//     $('.topTotalCount')[3].innerHTML = totalCrb;
// })

//Below has been replaced with server-side code
// //Adjust Diary Item Times Based On Timezone Offset **This is being handled differently now.**
// $(function(){
//     $('.itemTime').text((i, oldTime)=>{
//         oldTime = oldTime.split(':');
//         let oldHour = oldTime[0];
//         const oldMinute = oldTime[1];
//         const timezoneOffset = (new Date().getTimezoneOffset()/60);
//         let newHour = 'err1';
//         if (timezoneOffset>0){
//             newHour = oldHour - timezoneOffset;
//         }else if (timezoneOffset<0){
//             newHour = oldHour + timezoneOffset;
//         }
//         if(newHour<0 && newHour!==-12){
//             newHour+=12;
//             console.log('added')
//         }else if(newHour>12){
//             newHour-=12;

//         }else if(newHour==0){
//             newHour=12;
//         }else{
//             $('.itemTime.'+i).css("text-decoration", "underline")
//         }
//         $('.itemTime').css("color", "#545454")
//         return (newHour+':'+oldMinute)
//     })
// })