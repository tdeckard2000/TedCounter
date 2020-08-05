const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database ==========================================================
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});

const foodItemSchema = new mongoose.Schema({
  "name": String,
  "calories": Number,
  "protein": Number,
  "carbs": Number,
  "sugars": Number,
  "sodium": Number
});

const itemDiarySchema = new mongoose.Schema({
  "date": Date,
  "userId": String,
  "itemId": String
});

const foodItem = mongoose.model('foodItem', foodItemSchema);

const itemDiary = mongoose.model('itemDiary', itemDiarySchema);


// Return All Food Items
let findFoodItems = function(){
    return new Promise((resolve, reject)=>{
      foodItem.find({},(err, doc)=>{
      if(err){
        console.log("ERROR at findFoodItems")
        reject(err);
      }else{
        resolve(doc);
      }
    });
  });
}

//Save New Item to Database
const addNewItem = function(name, calories, protein, carbs, sodium){
  const item = new foodItem({
    "name": name,
    "calories": calories,
    "protein": protein,
    "carbs": carbs,
    "sodium": sodium
  });

  return new Promise((resolve, reject)=>{
    item.save((err, doc)=>{
      if(err){
        reject(err);
      }else{
        resolve(doc);
      }
    });
  })};

// Get Requests ==========================================================
app.get('/', (req, res)=>{
  res.render('index');
});

app.get('/dashboard', (req, res)=>{
  findFoodItems()
  .then(function(foodItemList){
    res.render('dashboard', {foodItemList: foodItemList});
  });
});

app.get('/newitem', (req, res)=>{
  res.render('newitem')
});

// Post Requests ==========================================================
app.post('/newitem', (req, res)=>{
  addNewItem(
    req.body.itemName, 
    req.body.calories, 
    req.body.protein, 
    req.body.carbs, 
    req.body.sodium)
    .then(function(){
      res.redirect('/dashboard');  
    });
});

// Server ==========================================================
let port = process.env.PORT;
if (port == null || port == "") {
  app.listen('3000', ()=>{
    console.log('Listening on Port 3000') 
  });
}else{
  app.listen(port);
  console.log('Listening on Port 5000') 
}


//Getting the date to string:
// > myday = new Date();
// 2020-06-10T03:03:41.952Z
// > myday = myday.toString()
// 'Tue Jun 09 2020 21:03:41 GMT-0600 (Mountain Daylight Time)'
// > myday = new Date();
// 2020-06-10T03:04:21.850Z
// > myday = myday.toISOString()
// '2020-06-10T03:04:21.850Z'
// > typeof(myday)
// 'string'
// >