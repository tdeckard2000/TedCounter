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
//   "name": '20 Grapes',
//   "calories": 25,
//   "protein": 1,
//   "carbs": .5,
//   "sugars": 1.5,
//   "sodium": 0
// })

// item.save((err, doc)=>{
//   console.log(err);
//   console.log(doc);
// })

// foodItem.find({},(err, doc)=>{
//   console.log(doc);
//   console.log(err);
// });

// Get Requests ==========================================================
app.get('/', (req, res)=>{
  res.render('index');
});

app.get('/dashboard', (req, res)=>{
  res.render('dashboard');
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
