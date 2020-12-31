const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); //used for user authentication
const session = require('express-session')
const MongoStore = require ('connect-mongo')(session);
const moment = require('moment');
const nodemailer = require("nodemailer");
const fs = require('fs');
const e = require('express');
const { resolve } = require('path');
const { json } = require('body-parser');
const { data } = require('jquery');
const request = require('request')

require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Settings for Mongoose
mongoose.set('useFindAndModify', false);

//settings for express-session module
app.use(session({
  cookie:{
    maxAge: 86400000, //24 hours
    path:'/'
  },
  resave: false,
  rolling: true, //renew session unless idle
  saveUninitialized: false,
  secret: 'DrPepper Cherries',
  store: new MongoStore({mongooseConnection:mongoose.connection})
}));

//settings for moment module
moment().format();

// Database ==========================================================
mongoose.connect(process.env.DB_URI2, {useNewUrlParser: true, useUnifiedTopology: true});

const foodItemSchema = new mongoose.Schema({
  "userId": String,
  "name": String,
  "caffeine": String,
  "calcium": String,
  "calories": Number,
  "carbs": Number,
  "chloride": Number,
  "choline": Number,
  "cholesterol": Number,
  "chromium": Number,
  "copper": Number,
  "fat": Number,
  "fiber": Number,
  "folic acid": Number,
  "histidine": Number,
  "iodine": Number,
  "iron": Number,
  "isoleucine": Number,
  "leucine": Number,
  "lysine": Number,
  "magnesium": Number,
  "manganese": Number,
  "methionine": Number,
  "molybdenum" :Number,
  "phenylalanine": Number,
  "phosphorus": Number,
  "potassium": Number,
  "protein": Number,
  "saturated Fat": Number,
  "selenium": Number,
  "sodium": Number,
  "sugar": Number,
  "trans Fat": Number,
  "threonine": Number,
  "tryptophan": Number,
  "valine": Number,
  "vitamin A": Number,
  "vitamin B1": Number,
  "vitamin B2": Number,
  "vitamin B3": Number,
  "vitamin B5": Number,
  "vitamin B6": Number,
  "vitamin B7": Number,
  "vitamin B9": Number,
  "vitamin B12": Number,
  "vitamin C": Number,
  "vitamin D2": Number,
  "vitamin D3": Number,
  "vitamin E": Number,
  "vitamin K": Number,
  "zinc": Number
});

const itemDiarySchema = new mongoose.Schema({
  "userId": String,
  "date": Date,
  "item":{
    "name": String,
    "caffeine": String,
    "calcium": String,
    "calories": Number,
    "carbs": Number,
    "chloride": Number,
    "choline": Number,
    "cholesterol": Number,
    "chromium": Number,
    "copper": Number,
    "fat": Number,
    "fiber": Number,
    "folic acid": Number,
    "histidine": Number,
    "iodine": Number,
    "iron": Number,
    "isoleucine": Number,
    "leucine": Number,
    "lysine": Number,
    "magnesium": Number,
    "manganese": Number,
    "methionine": Number,
    "molybdenum" :Number,
    "phenylalanine": Number,
    "phosphorus": Number,
    "potassium": Number,
    "protein": Number,
    "saturated Fat": Number,
    "selenium": Number,
    "sodium": Number,
    "sugar": Number,
    "trans Fat": Number,
    "threonine": Number,
    "tryptophan": Number,
    "valine": Number,
    "vitamin A": Number,
    "vitamin B1": Number,
    "vitamin B2": Number,
    "vitamin B3": Number,
    "vitamin B5": Number,
    "vitamin B6": Number,
    "vitamin B7": Number,
    "vitamin B9": Number,
    "vitamin B12": Number,
    "vitamin C": Number,
    "vitamin D2": Number,
    "vitamin D3": Number,
    "vitamin E": Number,
    "vitamin K": Number,
    "zinc": Number
  }
});

const userSchema = new mongoose.Schema({
  'name': String,
  'email': String,
  'password': String,
  'nutritionTopFour': Array,
  'nutritionOther': Array,
  'nutritionGoals':Object
});

const passwordKeysSchema = new mongoose.Schema({
  createdAt:{
    type:String,
    default:Date.now,
    expires:'1m'
  },
  userEmail: String,
  passResetKey: String
});

const foodItem = mongoose.model('foodItem', foodItemSchema);
const itemDiary = mongoose.model('itemDiary', itemDiarySchema);
const user = mongoose.model('user', userSchema);
const passwordKey = mongoose.model('passwordKey', passwordKeysSchema);

const nutritionOptions = ["caffeine", "calcium", "calories", "carbs", "chloride", "choline", "cholesterol", "chromium", "copper", "fat", "fiber",
"folic acid", "histidine", "iodine", "iron","isoleucine", "leucine", "lysine", "magnesium", "manganese", "methionine", "molybdenum","phenylalanine",
"phosphorus", "potassium", "protein", "saturated fat", "selenium", "sodium", "sugar", "trans fat", "threonine", "tryptophan", "valine", "vitamin a",
"vitamin b1", "vitamin b2", "vitamin b3", "vitamin b5", "vitamin b6", "vitamin b7", "vitamin b9", "vitamin b12", "vitamin c", "vitamin d2",
"vitamin d3", "vitamin e", "vitamin k", "zinc"];

// Functions ==========================================================

const adjustTime = function(startDate, subtractHours){
  let adjustedTime = moment.utc(startDate).subtract(subtractHours,'hour');
  return(adjustedTime.toISOString());
}

const authenticateUser = function(email, password){
  email = email.toLowerCase();
  return new Promise((resolve, reject)=>{
    user.find({'email': email}, (err, doc)=>{
      if(doc.length > 0 && doc.length != undefined){
        const userHash = doc[0].password;
        bcrypt.compare(password, userHash, (err, result)=>{
          if(result === true){
            resolve([true, doc[0]]);
          }else if(err){
            console.warn('ERROR_TED0: ' + err);
            resolve([false]);
          }else{
            resolve([false]);
          }
       });

      }else if(err){
        console.warn('ERROR_TED1: ' + err);
        resolve([false]);
      }else{
        resolve([false]);
      }
    });
  });
}

// Calculate nutrition totals
const calculateNutritionTotals = function(foodDiary){
  let diaryTotals = {
    "caffeine": 0,
    "calcium": 0,
    "calories": 0,
    "carbs": 0,
    "chloride": 0,
    "choline": 0,
    "cholesterol": 0,
    "chromium": 0,
    "copper": 0,
    "fat": 0,
    "fiber": 0,
    "folicAcid": 0,
    "histidine": 0,
    "iodine": 0,
    "iron": 0,
    "isoleucine": 0,
    "leucine": 0,
    "lysine": 0,
    "magnesium": 0,
    "manganese": 0,
    "methionine": 0,
    "molybdenum": 0,
    "phenylalanine": 0,
    "phosphorus": 0,
    "potassium": 0,
    "protein": 0,
    "saturatedFat": 0,
    "selenium": 0,
    "sodium": 0,
    "sugar": 0,
    "transFat": 0,
    "threonine": 0,
    "tryptophan": 0,
    "valine": 0,
    "vitaminA": 0,
    "vitaminB1": 0,
    "vitaminB2": 0,
    "vitaminB3": 0,
    "vitaminB5": 0,
    "vitaminB6": 0,
    "vitaminB7": 0,
    "vitaminB9": 0,
    "vitaminB12": 0,
    "vitaminC": 0,
    "vitaminD2": 0,
    "vitaminD3": 0,
    "vitaminE": 0,
    "vitaminK": 0,
    "zinc": 0
  };

  //Loop through each item in diary
  foodDiary.forEach(diaryItem =>{
    //total each nutrition option
    nutritionOptions.forEach(nutrient =>{
      if(diaryItem.item[nutrient]){
        diaryTotals[nutrient] += diaryItem.item[nutrient];
      }
    });
  });

  return(diaryTotals);
}

// Return All User Food Items
const findFoodItems = function(userDocId){
    return new Promise((resolve, reject)=>{
      foodItem.find({userId:userDocId},(err, doc)=>{
      if(err){
        console.warn("ERROR at findFoodItems: " + err)
        reject(err);
      }else{
        resolve(doc);
      }
    });
  });
}

// Return user diary items based on day
const findDiaryItems = function(userDocId, usrDay, timezoneOffset, orderedObjects){
  usrDayAdj = adjustTime(usrDay, timezoneOffset); //adjust time to user's timezone to determine day.
  startOfDay = (moment(usrDayAdj).startOf('day')).toISOString(); //get beginning of day
  endOfDay = (moment(usrDayAdj).endOf('day')).toISOString(); //get end of day
  //add timezone offset to start and end of day, since DB times are UTC.
  startOfDay = (moment(startOfDay).add(timezoneOffset, 'hours')).toISOString();
  endOfDay = (moment(endOfDay).add(timezoneOffset, 'hours')).toISOString();

  if(userDocId == undefined){
    console.warn("ERR: No User ID")
    return(false);
  }
  return new Promise((resolve, reject)=>{
    itemDiary.find({ //find diary items within date range for usrId
      userId:userDocId, 
      date:{$gte:startOfDay, $lte:endOfDay}
    }, (err, doc)=>{
      
      if(err){
        console.warn("ERROR at findDiaryItems")
      }else{
        doc.forEach(element => {
          let utcDate = element.date;
          //convert UTC date to user's local date
          let timezoneAdjustedDate = (moment(utcDate).subtract(timezoneOffset, 'hours')).toISOString();
          //convert military time to 12 hour time
          let twelveHourDate = moment(timezoneAdjustedDate).format('YYYY-MM-DDThh:mm:ss.SSS')
          //update JSON object with converted date
          element.date = twelveHourDate;
        });
        //return all diary items with adjusted date
        resolve([doc, orderedObjects]);
      }
    })
  })
}

//Get Food Item Values
const getItemValues = function(itemId){
  return new Promise((resolve, reject)=>{
    foodItem.findById(itemId, (err, data)=>{
      if(data){
        resolve(data);
      }else{
        console.warn("Error getting values: " + err);
        resolve("error getting item values");
      }
    });
  });
}

//Order given array
const orderObjects = function(unorderedObjects){
  let valueChanged = false;

  if(unorderedObjects.length<0 || unorderedObjects == undefined){
    return []
  }

  while(valueChanged === false){
    valueChanged = true;
    for(let i=0; i<=unorderedObjects.length; i++){
      //end loop if nothing left to compare
      if(unorderedObjects[i+1] == undefined){
        break
      }
      let obj1 = unorderedObjects[i].name;
      let obj2 = unorderedObjects[i+1].name;

      if(obj1 > obj2){
        let item1 = unorderedObjects[i];
        let item2 = unorderedObjects[i+1];
        unorderedObjects.splice(i,2, item2, item1);
        valueChanged = false;
      }
    }
  } 
  return unorderedObjects; //this is now ordered
}

//Save New Item to Database
const addNewItem = function(newItems, userDocId){
  const item = new foodItem({
    "userId":userDocId,
    "name": newItems.itemName,
    "caffeine": newItems.caffeine,
    "calcium": newItems.calcium,
    "calories": newItems.calories,
    "carbs": newItems.carbs,
    "chloride": newItems.chloride,
    "choline": newItems.choline,
    "cholesterol": newItems.cholesterol,
    "chromium": newItems.chromium,
    "copper": newItems.copper,
    "fat": newItems.fat,
    "fiber": newItems.fiber,
    "folicAcid": newItems.folicAcid,
    "histidine": newItems.histidine,
    "iodine": newItems.iodine,
    "iron": newItems.iron,
    "isoleucine": newItems.isoleucine,
    "leucine": newItems.leucine,
    "lysine": newItems.lysine,
    "magnesium": newItems.magnesium,
    "manganese": newItems.manganese,
    "methionine": newItems.methionine,
    "molybdenum": newItems.molybdenum,
    "phenylalanine": newItems.phenylalanine,
    "phosphorus": newItems.phosphorus,
    "potassium": newItems.potassium,
    "protein": newItems.protein,
    "saturatedFat": newItems.saturatedFat,
    "selenium": newItems.selenium,
    "sodium": newItems.sodium,
    "sugar": newItems.sugar,
    "transFat": newItems.transFat,
    "threonine": newItems.threonine,
    "tryptophan": newItems.tryptophan,
    "valine": newItems.valine,
    "vitaminA": newItems.vitaminA,
    "vitaminB1": newItems.vitaminB1,
    "vitaminB2": newItems.vitaminB2,
    "vitaminB3": newItems.vitaminB3,
    "vitaminB5": newItems.vitaminB5,
    "vitaminB6": newItems.vitaminB6,
    "vitaminB7": newItems.vitaminB7,
    "vitaminB9": newItems.vitaminB9,
    "vitaminB12": newItems.vitaminB12,
    "vitaminC": newItems.vitaminC,
    "vitaminD2": newItems.vitaminD2,
    "vitaminD3": newItems.vitaminD3,
    "vitaminE": newItems.vitaminE,
    "vitaminK": newItems.vitaminK,
    "zinc": newItems.zinc
  });

  return new Promise((resolve, reject)=>{
    item.save((err, doc)=>{
      if(err){
        reject(err);
      }else{
        resolve(doc);
      }
    });
  })
};

//Update Food Item Data
const updateFoodItem = function(itemId, itemData){
  return new Promise((resolve, reject)=>{

    foodItem.findOneAndUpdate({_id:itemId}, itemData, (err, data)=>{
      if(data){
        resolve(true);
      }else{
        resolve(false);
      }
    });
  });
}

//Delete Food Item from Database
const deleteFoodItem = function(itemId){
  return new Promise((resolve, reject)=>{
    foodItem.findOneAndDelete({_id:itemId},(err, data)=>{
      if(data){
        resolve(true);
      }else{
        resolve(err);
      }
    });
  })
}

//Check for Existing User
const checkForExistingUser = function(email){
  email = email.toLowerCase();
  return new Promise((resolve, reject)=>{
    user.find({email:email}, (err, result)=>{
      if(result.length){
        resolve(true)
      }else if(err){
        console.warn("error checking for user: " + err);
      }else{
        resolve(false);
      }
    })
  })
}

//Create New User
const addNewUser = function(name, email, pHashed){
  email = email.toLowerCase();
  const newUser = new user({
    "name": name,
    "email": email,
    "password": pHashed
  });

  newUser.save((err,doc)=>{
    if(err){
      console.warn('Error Saving User: ' + err);
    }
  });
}

//Update user defaults
const updateUserDefaults = function(userId, topFourSelections, otherSelections, userGoals){
  const updates = {
    nutritionTopFour: topFourSelections,
    nutritionOther: otherSelections,
    nutritionGoals: userGoals
  }

  return new Promise((resolve, reject)=>{
    user.updateOne({_id:userId}, updates, (err, doc)=>{
      if(doc){
        resolve(true);
      }else{
        resolve(false);
      }
    })
  })
}

//Add Food Item to Diary
const addToDiary = function(userId, itemInfo){
  return new Promise((resolve, reject)=>{
    const item = new itemDiary({
      "userId": userId,
      "date": new Date().toISOString(),
      "item":{
        "name": itemInfo.name,
        "caffeine": itemInfo.caffeine,
        "calcium": itemInfo.calcium,
        "calories": itemInfo.calories,
        "carbs": itemInfo.carbs,
        "chloride": itemInfo.chloride,
        "choline": itemInfo.choline,
        "cholesterol": itemInfo.cholesterol,
        "chromium": itemInfo.chromium,
        "copper": itemInfo.copper,
        "fat": itemInfo.fat,
        "fiber": itemInfo.fiber,
        "folicAcid": itemInfo.folicAcid,
        "histidine": itemInfo.histidine,
        "iodine": itemInfo.iodine,
        "iron": itemInfo.iron,
        "isoleucine": itemInfo.isoleucine,
        "leucine": itemInfo.leucine,
        "lysine": itemInfo.lysine,
        "magnesium": itemInfo.magnesium,
        "manganese": itemInfo.manganese,
        "methionine": itemInfo.methionine,
        "molybdenum": itemInfo.molybdenum,
        "phenylalanine": itemInfo.phenylalanine,
        "phosphorus": itemInfo.phosphorus,
        "potassium": itemInfo.potassium,
        "protein": itemInfo.protein,
        "saturatedFat": itemInfo.saturatedFat,
        "selenium": itemInfo.selenium,
        "sodium": itemInfo.sodium,
        "sugar": itemInfo.sugar,
        "transFat": itemInfo.transFat,
        "threonine": itemInfo.threonine,
        "tryptophan": itemInfo.tryptophan,
        "valine": itemInfo.valine,
        "vitaminA": itemInfo.vitaminA,
        "vitaminB1": itemInfo.vitaminB1,
        "vitaminB2": itemInfo.vitaminB2,
        "vitaminB3": itemInfo.vitaminB3,
        "vitaminB5": itemInfo.vitaminB5,
        "vitaminB6": itemInfo.vitaminB6,
        "vitaminB7": itemInfo.vitaminB7,
        "vitaminB9": itemInfo.vitaminB9,
        "vitaminB12": itemInfo.vitaminB12,
        "vitaminC": itemInfo.vitaminC,
        "vitaminD2": itemInfo.vitaminD2,
        "vitaminD3": itemInfo.vitaminD3,
        "vitaminE": itemInfo.vitaminE,
        "vitaminK": itemInfo.vitaminK,
        "zinc": itemInfo.zinc
      }
    });
      item.save((err, doc)=>{
        if(err){
          console.warn('Failed to save new diary item to DB');
          reject(err);
        }else if(doc){
          resolve("cats");
        }
      });
  }).catch((err)=>{
    console.warn("Error saving item to DB #2: " + err);
  })
}

//Make Copy of Food Item in Diary
const duplicateDiaryItem = function(itemString){
  let parsedItem = JSON.parse(itemString);
  return new Promise((resolve, reject)=>{
    addToDiary(parsedItem.userId, parsedItem.item)
    .then(()=>{
      resolve();
    })
    .catch((err)=>{
      console.warn("Error adding to diary: " + err);
    });
  });
}

//Remove Item from Diary
const removeFromDiary = function(itemId){
  return new Promise((resolve, reject)=>{
    itemDiary.deleteOne({_id:itemId}, (err)=>{
      if(err){
      reject("error removing item from diary: "+err);
      }else()=>{
        resolve();
      }
    })
  })
}

//Check if a name was provided for new account
const checkForNewName = function(newName){
  if(newName != null && newName != 'undefined'){
    return newName;
  }else{
    return null
  }
}

//Save password reset key to db
const savePassKey = function(emailAddress, passResetKey){
  const newKey = new passwordKey({
    passResetKey: passResetKey,
    userEmail: emailAddress
  });

  newKey.save((err, data)=>{
    if(err){
      console.warn(err);
      return
    }else{
      return
    }
  });
}

//Check if reset password key is valid
const validatePassKey = function(key){
  return new Promise((resolve, reject)=>{
    passwordKey.find({passResetKey: key}, (err, data)=>{
      if(!data.length || err){
        resolve()
      }else{ //remove the key so it can't be reused
        const userEmailAddress = data[0].userEmail;
        passwordKey.deleteOne({passResetKey:key}, (err)=>{
          if(err){
            console.warn("Couldn't Delete Key " + err)
          }
        })
        resolve(userEmailAddress);
      }
    })
  })
}

//Change user password
const changePassword = function(emailAddress, newPassword){

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);
  return new Promise((resolve, reject)=>{
    user.findOneAndUpdate({email:emailAddress}, {password:hashedPassword}, ()=>{
      resolve()
    })

  })
}

//Sends password reset email
const sendPassResetEmail = function(emailAddress, resetPassKey){
  //email host information
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
      user: process.env.gmailUsr,
      pass: process.env.gmailPass
    }
  });

  fs.readFile('./emails/passwordReset.html', {encoding: 'utf-8'}, (err, data)=>{
    let htmlFile = data;
    htmlFile = htmlFile.replace(/#replaceWithLink#/g, resetPassKey); //uses regex to replace all instances

    if(err){
      console.warn("Error getting password reset template: " + err);
    }else{
      transporter.sendMail({
        from:'"TedCounter :)"<tedcounter@gmail.com>',
        to: emailAddress,
        subject:"Ted Counter",
        html: htmlFile
      });
    }
  });
}

const sendSignInEmail = function(userId){
  //email host information
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
      user: process.env.gmailUsr,
      pass: process.env.gmailPass
    }
  });

    transporter.sendMail({
      from:'"TedCounter"<tedcounter@gmail.com>',
      to: process.env.alertCenter,
      subject: "TedCounter Sign In",
      html: userId
    });
}

//Make API request to "OFF" Open Food Facts
const openFoodFactsRequest = function(barcodeNumber){
//DONT FORGET TO INCLUDE A HEADER
  return new Promise((resolve, reject)=>{
    request('https://world.openfoodfacts.org/api/v0/product/' + barcodeNumber + '.json', (err, res, body)=>{
      const productInfo = JSON.parse(body);

      let productSearchResult = null;
      let productName = null;
      let productNutrition = null;
      let servingSize = null;

      if(productInfo && productInfo.status){
        productSearchResult = productInfo.status;
      }else{
        productSearchResult = null;
      }

      if(productInfo && productInfo.product && productInfo.product.product_name_en){
        productName = productInfo.product.product_name_en;
      }else{
        productName = null;
      }

      if(productInfo && productInfo.product && productInfo.product.nutriments){
        productNutrition = productInfo.product.nutriments;
      }else{
        productNutrition = null;
      }

      if(productInfo && productInfo.product && productInfo.product.serving_size){
        servingSize = productInfo.product.serving_size;
      }else{
        servingSize = null;
      }
      
  
      const productDetails = {
        productSearchResult:productSearchResult,
        productName:productName,
        productNutrition:productNutrition,
        servingSize:servingSize
      }
  
      resolve(productDetails);
    });
  })
}

//Convert string key values to integers
const convertToInt = function(jsonObject){
  for(const [key, value] of Object.entries(jsonObject)){
    jsonObject[key] = parseInt(value, 10);
  }

  return jsonObject;
}

// Get Requests ==========================================================
app.get(['/','/oops', '/accountCreated', '/passwordChanged'], (req, res)=>{
  if(req.originalUrl === '/oops'){
    res.render('index', {toastAction: "showFailedToast"})
  }else if(req.originalUrl === '/accountCreated'){
    res.render('index', {toastAction: "showAccountCreatedToast"});
  }else if(req.originalUrl === '/passwordChanged'){
    res.render('index', {toastAction: "showNewPasswordToast"})
  }else{
    res.render('index', {toastAction:"hideToast"});
  }
});

app.get('/dashboard', (req, res)=>{
  const userDocId = req.session.userDocId;
  const userName = req.session.userName;
  const timezoneOffset = req.session.timezoneOffset;
  const usrDay = new Date().toISOString(); //using today's day for now
  const nutritionTopFour = req.session.nutritionTopFour;
  const nutritionOther = req.session.nutritionOther;
  const nutritionGoals = req.session.nutritionGoals;
  const userPreferences = JSON.stringify({nutritionTopFour, nutritionOther, nutritionGoals});

  if(!req.session.userDocId){
    res.redirect('/');
  }else{
    findFoodItems(userDocId)
    .then((foodItemData)=>orderObjects(foodItemData))
    .then((orderedObjects)=>findDiaryItems(userDocId, usrDay, timezoneOffset, orderedObjects))
    .then((bothResults)=>{
      const foodDiary = bothResults[0];
      const foodItemList = bothResults[1];
      const nutritionTotals = calculateNutritionTotals(foodDiary);

      res.render('dashboard', {
        foodItemList: foodItemList,
        foodDiary: foodDiary,
        nutritionOther: nutritionOther,
        nutritionGoals: nutritionGoals,
        nutritionTopFour: nutritionTopFour,
        nutritionTotals: nutritionTotals,
        userName: userName,
        userPreferences: userPreferences
      });
    }).catch((error)=>{console.warn("Error getting to Dashboard: " + error.message)})
  }
});

app.get('/newitem', (req, res)=>{
  if(!req.session.userDocId){
    res.redirect('/');
  }else{
    const nutritionTopFour = req.session.nutritionTopFour;
    const nutritionOther = req.session.nutritionOther;
    res.render('newitem', {
      nutritionTopFour:nutritionTopFour,
      nutritionOther:nutritionOther
    })
  }
});

app.get('/resetPassword', (req, res)=>{
  const passResetKey = req.query.resetKey; //store key from email
  // testPasswordResetKey(passResetKey);
  res.render('resetPassword')
})

app.get('/editItem', (req, res)=>{
  userDocId = req.session.userDocId
  
  if(userDocId == undefined || userDocId.length<10){
    res.redirect('/')
  }else{
    findFoodItems(userDocId).then((docs)=>{
      const nutritionTopFour = req.session.nutritionTopFour;
      const nutritionOther = req.session.nutritionOther;
      const allFoodItems = orderObjects(docs);

      res.render('editItem', {
        allFoodItems:allFoodItems, 
        nutritionTopFour:nutritionTopFour, 
        nutritionOther:nutritionOther
      });
    });
  }
});

//Returns food item values from DB
app.get('/getItemValues', (req, res)=>{
  if(req.query.itemId != null){
    const itemId = req.query.itemId;
    getItemValues(itemId).then((itemValues)=>{
      res.json({data:itemValues});
    });
  }else{
    res.json({data:"Error"});
  }

})

//Get barcode data from Open Food Facts
app.get('/getBarcodeData', (req, res)=>{
  barcodeNumber = req.query.barcodeNumber;
  openFoodFactsRequest(barcodeNumber).then((data)=>{
    res.json({data:data});
  });
})

//Get disclaimer page
app.get('/disclaimer', (req, res)=>{
  res.render("disclaimer")
})

// Post Requests ==========================================================
app.post('/signIn', (req, res)=>{
  req.session.data = null; //remove old session data
  const email = req.body.email;
  const password = req.body.password;

  authenticateUser(email, password).then((result)=>{
    if(result[0] === false){
      //username or password didn't match
      res.redirect('/oops')
    }else if(result[0] === true){
      //successful sign-in
      sendSignInEmail(email);
      req.session.userName = result[1].name;
      req.session.userDocId = result[1]._id;
      req.session.nutritionTopFour = result[1].nutritionTopFour;
      req.session.nutritionOther = result[1].nutritionOther;
      req.session.nutritionGoals = result[1].nutritionGoals;
      res.redirect('/dashboard')
    }else{
      console.warn('Error During Sign In')
    }
  })

})

app.post('/', (req, res)=>{
  const timezoneOffset = req.body.timezoneOffset;
  req.session.timezoneOffset = timezoneOffset;
  res.send();
});

app.post('/newItem', (req, res)=>{
  if(!req.session.userDocId){
    res.redirect('/');
  }else{
    for (const key in req.body) {//set zero default
      if(req.body[key] == ''){
        req.body[key]=0
      }
    }
    addNewItem(req.body, req.session.userDocId)
    .then(function(){
        res.redirect('/dashboard');  
      });
  }
});

app.post('/addToDiary',(req, res)=>{
  if(!req.session.userDocId){
    res.redirect('/');
  }else{
    let bodyData = (req.body.foodItem)
    let jsonData = JSON.parse(bodyData);
    addToDiary(req.session.userDocId, jsonData).then(()=>{
      res.redirect('/dashboard')
    })
  }
})

app.post('/dashboard/modifyDiary', (req, res)=>{
  if(!req.session.userDocId){
    res.redirect('/');
  }else{
    let toDuplicate = (req.body.duplicateItem);
    let toRemove = (req.body.removeItem);
    if(toDuplicate){
      duplicateDiaryItem(toDuplicate).then(()=>{
        res.redirect('/dashboard');
      })
    }else if(toRemove){
      removeFromDiary(toRemove).then(()=>{
        res.redirect('/dashboard');
      }).catch(()=>{console.warn("error deleting item at POST")})
    }
    res.redirect('/dashboard');
  }
})

app.post('/newUser', (req, res)=>{
  const name = checkForNewName(req.body.newName);
  const newEmail = req.body.newEmail
  const newPassword = req.body.newPassword

  checkForExistingUser(newEmail).then((result)=>{
    if(result === false){
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
      addNewUser(name, newEmail, hashedPassword);
      res.send({message: '/accountCreated'})
    }else{

      //email already exists
      res.status(200).send({message: true});
    }
  })

});

app.post('/quickAdd', (req, res)=>{
  if(!req.session.userDocId){
    res.redirect('/');
  }else{
    let bodyData = (req.body)
    bodyData.name = '✓'
    addToDiary(req.session.userDocId, bodyData).then(()=>{
      res.redirect('/dashboard')
    })
  }
});

app.post('/passwordRecovery', (req, res)=>{
  let emailAddress = req.body.email;
  emailAddress = emailAddress.toLowerCase();

  checkForExistingUser(emailAddress).then((result)=>{

    if(result === true){
      //generate key to later validate password reset
      resetPassKey = bcrypt.genSaltSync(10)
      //store key in db (no need to wait)
      savePassKey(emailAddress, resetPassKey);
      //send the email
      sendPassResetEmail(emailAddress, resetPassKey);
      res.status(200).send({message: true})
    }else{
      res.status(200).send({message: false});
    }
  })
})

app.post('/newPassword', (req, res)=>{
  const newPassword = req.body.newPassword;
  const passwordKey = req.body.key; //authentication key

  if(newPassword.length && passwordKey.length){
    validatePassKey(passwordKey)

    .then((userEmailAddress)=>{

      if(userEmailAddress !== undefined && userEmailAddress.length){

        changePassword(userEmailAddress, newPassword)
        .then(()=>{
          res.status(200).send({message:true})
        })
      }else{
        res.status(200).send({message:false})
      }
    })
  }
})

app.post('/updateFoodItem', (req, res)=>{
  itemData = JSON.parse(req.body.itemData);
  itemId = (req.body.itemId);

  updateFoodItem(itemId, itemData).then((data)=>{
    if(data === true){
      res.send({result:true})
    }else{
      res.send({result:false})
    }
  });
});

app.post('/deleteFoodItem', (req,res)=>{
  const itemId = req.body.itemId;

  deleteFoodItem(itemId).then((data)=>{
    //Check if deletion was successful
    if(data === true){
      res.send({result:true})
    }else{
      res.send({result:false})
    }
  })
})

app.post('/updateUserGoals', (req, res)=>{
  const topFourSelections = JSON.parse(req.body.topFourSelections);
  const otherSelections = JSON.parse(req.body.otherSelections);
  const userGoalsRaw = JSON.parse(req.body.userGoals);
  const userGoals = convertToInt(userGoalsRaw); //convert object value strings to numbers
  const userId = (req.session.userDocId);

  updateUserDefaults(userId, topFourSelections, otherSelections, userGoals).then((data)=>{
    
    if(data === true){ //successful update
      req.session.nutritionTopFour = topFourSelections;
      req.session.nutritionOther = otherSelections;
      req.session.nutritionGoals = userGoals;
      res.status(200).send({result:true});
    }else{
      res.status(200).send({result:false});
    }
  });
});

// Server ==========================================================
let port = process.env.PORT;
if (port == null || port == "") {
  app.listen('3000', ()=>{
    console.warn('Listening on Port 3000') 
  });
}else{
  app.listen(port);
  console.warn('Listening on Port 5000') 
}