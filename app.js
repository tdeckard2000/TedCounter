const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

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

// const item = new foodItem({
//   "name": 'Peanuts Shelled Small Bowl',
//   "calories": 230,
//   "protein": 18,
//   "carbs": 23,
//   "sugars": 2,
//   "sodium": 1000
// })

// item.save((err, doc)=>{
//   console.log(err);
//   console.log(doc);
// })

let foodItemList = [0,1,2,3,4,5];

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



// Get Requests ==========================================================
app.get('/', (req, res)=>{
  res.render('index');
});

app.get('/dashboard', (req, res)=>{
  console.log(foodItemList);
  res.render('dashboard', {foodItemList: foodItemList});
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