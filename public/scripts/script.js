$('.saveMealDiv input').on('propertychange input', (doc)=>{
    let input = doc.target.value;
    let className = doc.currentTarget.attributes[0].textContent;
    className = className.replace(' ', '.');
    for(let i=0; i < input.length; i++){
        if (!$.isNumeric(input[i])){
            input = input.replace(input[i],'');
            $('.' + className).val(input);
        }
    }
});

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

//currentTarget.attributes[0].textContent