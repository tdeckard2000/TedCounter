const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); //used for user authentication
const session = require('express-session')
const MongoStore = require ('connect-mongo')(session);

require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
  cookie:{
    maxAge: 60000,
    path:'/'
  },
  resave: false,
  saveUninitialized: false,
  secret: 'DrPepper Cherries',
  store: new MongoStore({mongooseConnection:mongoose.connection})
}));

// Database ==========================================================
mongoose.connect(process.env.DB_URI2, {useNewUrlParser: true, useUnifiedTopology: true});

const foodItemSchema = new mongoose.Schema({
  "userId": String,
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
  "userId": String,
  "date": Date,
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
  'email': String,
  'password': String
})

const foodItem = mongoose.model('foodItem', foodItemSchema);
const itemDiary = mongoose.model('itemDiary', itemDiarySchema);
const user = mongoose.model('user', userSchema);

// Functions ==========================================================

const authenticateUser = function(email, password){
  return new Promise((resolve, reject)=>{
    user.find({'email': email}, (err, doc)=>{
      if(doc.length > 0 && doc.length != undefined){
        const userHash = doc[0].password;
        bcrypt.compare(password, userHash, (err, result)=>{
          if(result === true){
            resolve([true, doc[0].name, doc[0].id]);

          }else if(err){
            console.warn('ERROR_TED: ' + err);
            resolve([false]);
          }else{
            resolve([false]);
          }
       });

      }else{
        resolve([false]);
      }
    });
  });
}


// Return All Food Items
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

const findDiaryItems = function(userDocId, day, orderedData){
  if(userDocId == undefined){
    console.warn("ERR: No User ID")
    let doc = {};
    return(false);
  }
  return new Promise((resolve, reject)=>{
    itemDiary.find({userId:userDocId}, (err, doc)=>{
      if(err){
        console.warn("ERROR at findDiaryItems")
      }else{
        resolve([doc, orderedData]);
      }
    })
  })
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
    "calories": newItems.calories,
    "sodium": newItems.sodium,
    "protein": newItems.protein,
    "carbs": newItems.carbs,
    "fat": newItems.fat,
    "cholesterol": newItems.cholesterol,
    "fiber": newItems.fiber,
    "sugar": newItems.sugar,
    "iron": newItems.iron,
    "vitA": newItems.vitA,
    "vitC": newItems.vitC,
    "vitD": newItems.vitD,
    "vitE": newItems.vitE,
    "calcium": newItems.calcium,
    "potassium": newItems.potassium,
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
  })};

  const addNewUser = function(name, email, pHashed){
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

  const addToDiary = function(userId, itemInfo){
    return new Promise((resolve, reject)=>{
      const item = new itemDiary({
        "userId": userId,
        "date": new Date().toISOString(),
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
            console.warn('Failed to save new diary item to DB');
            reject(err);
          }else if(doc){
            resolve("cats");
          }
        });
    })
  }

  const duplicateDiaryItem = function(itemString){
    let parsedItem = JSON.parse(itemString);
    return new Promise((resolve, reject)=>{
      addToDiary(parsedItem.userId, parsedItem.item).then(()=>{
        resolve();
      })
    })
  }

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

  const checkForNewName = function(newName){
    if(newName != null && newName != 'undefined'){
      return newName;
    }else{
      return null
    }
  }


// Get Requests ==========================================================
app.get(['/','/oops'], (req, res)=>{
  if(req.originalUrl === '/oops'){
    res.render('index', {failedLogin:1})
  }else{
    res.render('index', {failedLogin:0});
  }
});

app.get('/dashboard', (req, res)=>{
  const userDocId = req.session.userDocId
  const userName = req.session.userName

  if(!req.session.userDocId){
    res.redirect('/');
  }else{
    findFoodItems(req.session.userDocId)
    .then((foodItemData)=>orderObjects(foodItemData))
    .then((orderedData)=>findDiaryItems(userDocId, "need day", orderedData))
    .then((bothResults)=>{
      const foodDiary = bothResults[0];
      const foodItemList = bothResults[1];
      res.render('dashboard', {foodItemList: foodItemList, foodDiary:foodDiary});
    }).catch((error)=>{console.warn("Error getting to Dashboard: " + error.message)})
  }
});

app.get('/newitem', (req, res)=>{
  if(!req.session.userDocId){
    res.redirect('/');
  }else{
    res.render('newitem')
  }
});

// Post Requests ==========================================================
app.post('/signIn', (req, res)=>{
  req.session.data = null //remove old session data
  const email = req.body.email
  const password = req.body.password

  authenticateUser(email, password).then((result)=>{
    if(result[0] === false){
      res.redirect('/oops')
    }else if(result[0] === true){
      req.session.userName = result[1];
      req.session.userDocId = result[2];
      res.redirect('/dashboard')
    }else{
      console.warn('Error During Sign In')
    }
  })

})

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
  console.warn(name);
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
    console.warn('Listening on Port 3000') 
  });
}else{
  app.listen(port);
  console.warn('Listening on Port 5000') 
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