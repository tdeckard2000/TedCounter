$('.saveMealDiv input').on('propertychange input', (doc)=>{
    let input = doc.target.value;
    let className = doc.currentTarget.attributes[0].textContent;
    className = className.replace(' ', '.');
    for(let i=0; i < input.length; i++){
        if (!$.isNumeric(input[i])){
            input = input.replace(input[i],'');
            $('.' + className).val(input);
        }}});
//currentTarget.attributes[0].textContent