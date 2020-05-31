const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.render('index');
});

let port = process.env.PORT;
if (port == null || port == "") {
  app.listen('3000', ()=>{
    console.log('Listening on Port 3000') 
  });
}else{
  app.listen(port);  
}
