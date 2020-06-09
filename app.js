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
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

const foodItemSchema = new mongoose.Schema({
  "name": String,
  "calories": Number,
  "protein": Number,
  "carbs": Number,
  "sugars": Number,
  "sodium": Number
});

const foodItem = mongoose.model('foodItem', foodItemSchema);

let foodItemList = [0,1,2,3,4,5];

// Save All Food Items To foodItemList
function findFoodItems(){
  foodItem.find({},(err, doc)=>{
    if(err){
      console.log("ERROR at findFoodItems")
      console.log(err);
    }else{
      foodItemList = (doc);
    }
  });
}

findFoodItems();

//Save New Item to Database
function addNewItem(name, calories, protein, carbs, sodium){
  const item = new foodItem({
    "name": name,
    "calories": calories,
    "protein": protein,
    "carbs": carbs,
    "sodium": sodium
  });

  item.save((err, doc)=>{
    if(err){
      console.log(err);
    }else{
      console.log(doc);
    }
  });
}

// Get Requests ==========================================================
app.get('/', (req, res)=>{
  res.render('index');
});

app.get('/dashboard', (req, res)=>{
  findFoodItems();
  res.render('dashboard', {foodItemList: foodItemList});
});

app.get('/newitem', (req, res)=>{
  res.render('newitem', {foodItemList: foodItemList})
});

// Post Requests ==========================================================
app.post('/newitem', (req, res)=>{
  addNewItem(
    req.body.itemName, 
    req.body.calories, 
    req.body.protein, 
    req.body.carbs, 
    req.body.sodium);
    
  res.redirect('/dashboard');
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

// Mongo Scripts ==========================================================