const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); //used for user authentication

require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database ==========================================================
mongoose.connect(process.env.DB_URI2, {useNewUrlParser: true, useUnifiedTopology: true});

const foodItemSchema = new mongoose.Schema({
  "name": String,
  "calories": Number,
  "sodium": Number,
  "protein": Number,
  "carbs": Number,
  "fat": Number,
  "cholesterol": Number,
  "fiber": Number,
  "sugar": Number,
  "iron": Number,
  "vitA": Number,
  "vitC": Number,
  "vitD": Number,
  "vitE": Number,
  "calcium": Number,
  "potassium": Number,
  "zinc": Number
});

const itemDiarySchema = new mongoose.Schema({
  "date": Date,
  "userId": String,
  "item":{
    "name": String,
    "calories": Number,
    "sodium": Number,
    "protein": Number,
    "carbs": Number,
    "fat": Number,
    "cholesterol": Number,
    "fiber": Number,
    "sugar": Number,
    "iron": Number,
    "vitA": Number,
    "vitC": Number,
    "vitD": Number,
    "vitE": Number,
    "calcium": Number,
    "potassium": Number,
    "zinc": Number
  }
});

const userSchema = new mongoose.Schema({
  'name': String,
  'email':String,
  'password': String
})

const foodItem = mongoose.model('foodItem', foodItemSchema);
const itemDiary = mongoose.model('itemDiary', itemDiarySchema);
const user = mongoose.model('user', userSchema);

// Functions ==========================================================
// Return All Food Items
const findFoodItems = function(){
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

const findDiaryItems = function(user, day, orderedData){
  return new Promise((resolve, reject)=>{
    itemDiary.find({}, (err, doc)=>{
      if(err){
        console.log("ERROR at findDiaryItems")
      }else{
        resolve([doc, orderedData]);
      }
    })
  })
}

//Order given array
const orderObjects = function(unorderedObjects, fieldName){
  fieldName = 'name'
  let valueChanged = false;
  while(valueChanged === false){
    valueChanged = true;
    for(let i=0; i<=unorderedObjects.length; i++){
      //end loop if nothing left to compare
      if(unorderedObjects[i+1] == undefined){
        break
      }
      let obj1 = unorderedObjects[i][fieldName];
      let obj2 = unorderedObjects[i+1].name;
      if(obj1 > obj2){
        let item1 = unorderedObjects[i];
        let item2 = unorderedObjects[i+1];
        unorderedObjects.splice(i,2, item2, item1);
        valueChanged = false;
      }
    }
  } 
  return unorderedObjects;
}

//Save New Item to Database
const addNewItem = function(name, calories, sodium, protein, carbs, fat, 
  cholesterol, fiber, sugar, iron, vitA, vitC, vitD, vitE, calcium, potasium, zinc){
  const item = new foodItem({
    "name": name,
    "calories": calories,
    "sodium": sodium,
    "protein": protein,
    "carbs": carbs,
    "fat": fat,
    "cholesterol": cholesterol,
    "fiber": fiber,
    "sugar": sugar,
    "iron": iron,
    "vitA": vitA,
    "vitC": vitC,
    "vitD": vitD,
    "vitE": vitE,
    "calcium": calcium,
    "potassium": potasium,
    "zinc": zinc
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

  const addNewUser = function(name, email, passwordHashed){
    const newUser = new user({
      "name": name,
      "email": email,
      "password": passwordHashed
    });
    newUser.save((err,doc)=>{
      if(err){
        console.log('Error Saving User: ' + err);
      }
    });
  }

  const addToDiary =function(userId, itemInfo){
    return new Promise((resolve, reject)=>{
      const item = new itemDiary({
        "date": new Date().toISOString(),
        "userId": userId,
        "item":{
          "name": itemInfo.name,
          "calories": itemInfo.calories,
          "sodium": itemInfo.sodium,
          "protein": itemInfo.protein,
          "carbs": itemInfo.carbs,
          "fat": itemInfo.fat,
          "cholesterol": itemInfo.cholesterol,
          "fiber": itemInfo.fiber,
          "sugar": itemInfo.sugar,
          "iron": itemInfo.iron,
          "vitA": itemInfo.vitA,
          "vitC": itemInfo.vitC,
          "vitD": itemInfo.vitD,
          "vitE": itemInfo.vitE,
          "calcium": itemInfo.calcium,
          "potassium": itemInfo.potassium,
          "zinc": itemInfo.zinc
        }
      });
        item.save((err, doc)=>{
          if(err){
            console.log('Failed to save new diary item to DB');
            reject(err);
          }else if(doc){
            resolve("cats");
          }
        });
    })
  }

  const checkForNewName = function(newName){
    if(newName != null && newName != 'undefined'){
      return newName;
    }else{
      return null
    }
  }


// Get Requests ==========================================================
app.get('/', (req, res)=>{
  res.render('index');
});

app.get('/dashboard', (req, res)=>{
  let foodItemList = {} //stored here to avoid passing it through .then chain.
  findFoodItems()
  .then((foodItemData)=>orderObjects(foodItemData, 'name'))
  .then((orderedData)=>findDiaryItems("need user", "need day", orderedData)).then((bothResults)=>{
    foodDiary = bothResults[0];
    foodItemList = bothResults[1];
    res.render('dashboard', {foodItemList: foodItemList, foodDiary:foodDiary});
  }).catch(()=>{console.log("Error getting to Dashboard: ")})
});

app.get('/newitem', (req, res)=>{
  res.render('newitem')
});

// Post Requests ==========================================================
app.post('/newitem', (req, res)=>{
  addNewItem(
    req.body.itemName, 
    req.body.calories, 
    req.body.sodium, 
    req.body.protein, 
    req.body.carbs,
    req.body.fat,
    req.body.cholesterol,
    req.body.fiber,
    req.body.sugar,
    req.body.iron,
    req.body.vitA,
    req.body.vitC,
    req.body.vitD,
    req.body.vitE,
    req.body.calcium,
    req.body.potassium,
    req.body.zinc
    ).then(function(){
      res.redirect('/dashboard');  
    });
});

app.post('/addToDiary',(req, res)=>{
  let bodyData = (req.body.foodItem)
  let jsonedData = JSON.parse(bodyData);
  addToDiary('test@email.com', jsonedData).then(()=>{
    res.redirect('/dashboard')
  })
})

app.post('/newUser', (req, res)=>{
  const name = checkForNewName(req.body.newName);
  const newEmail = req.body.newEmail
  const newPassword = req.body.newPassword
  console.log(name);
  //const confirmPassword = (req.body.confirmPassword);
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);
  addNewUser(name, newEmail, hashedPassword);
  res.redirect('/')
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


//tests only