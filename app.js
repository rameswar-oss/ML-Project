//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//const _ = require("lodash");

const https = require('https')


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let posts = [];
var gender = 0
var hypertension = 0;
var heartpain = 0;
var everMaried = 0
var workType = 0;
var residenceType = 0
var avgGlucogeLevel = 0;
var smokingStatus = 0;
//var aboutContent=''





app.get("/", function(req, res) {
  res.render("home");
});
//Route for Random Forest Page GET
app.get('/RF', (req, res) => {
  res.render("RF");
});
//Route for Random Forest Page POST
app.post('/RF', (req, res) => {

  console.log(req.body);
  //gender decider
  if (req.body.gender === 'male') {
    gender = 1
  } else if (req.body.gender === 'female') {
    gender = 0
  } else {
    gender = 2
  }
  //hypertension decider
  if (req.body.hypertension === 'yes') {
    hypertension = 1
  } else {
    hypertension = 0
  }
  //heart disease decider
  if (req.body.HeartPain === 'yes') {
    heartpain = 1
  } else {
    heartpain = 0
  }
  //marriage decider
  if (req.body.married === 'yes') {
    everMaried = 1
  } else {
    everMaried = 0
  }
  //work type decider
  if (req.body.workType === 'Private') {
    workType = 2
  } else if (req.body.workType === 'Self-employed') {
    workType = 3
  } else if (req.body.workType === 'Govt job') {
    workType = 0
  } else if (req.body.workType === 'children') {
    workType = 4
  } else {
    workType = 1
  }
  //smoking decider
  if (req.body.smoker === 'formerlySmoked') {
    workType = 1
  } else if (req.body.smoker === 'neverSmoked') {
    workType = 2
  } else if (req.body.smoker === 'smokes') {
    workType = 3
  } else {
    workType = 0
  }
  //residence decider
  if (req.body.Residence === 'Urban') {
    residenceType = 1
  } else {
    everMaried = 0
  }

  //req.body.age req.body.avgGlucose
  var reqBody = {
    gender: gender,
    age: parseFloat(req.body.age),
    hypertension: hypertension,
    heart_disease: heartpain,
    ever_married: everMaried,
    work_type: workType,
    Residence_type: residenceType,
    avg_glucose_level: parseFloat(req.body.avgGlucose),
    bmi: parseFloat(req.body.BMI),
    smoking_status: smokingStatus,
  }
  console.log(reqBody);
  var jsonData = JSON.stringify(reqBody);
  console.log(jsonData);
  const url = "https://rf.onrender.com/RF";
  const options = {
    method: "POST"
  }

  var aboutContent = ''
  const request = https.request(url, options, function(response) {


    response.on('data', (data) => {
      console.log('ans= ' + JSON.parse(data))
      if (parseInt(JSON.parse(data)) == 0) {
        aboutContent = 'You have no chances of Heart Disease'
      }
      else if (parseInt(JSON.parse(data)) == 1) {
        aboutContent = 'You have moderate chances of Heart Disease'
      }
      else {
        aboutContent = 'You have high chances of Heart Disease'
      }
    })
    response.on('end', () => {
      res.render('resultRF', {
        aboutContent
      });
    })
  });
  request.on('error', (error) => {
    console.error(`Error calling API: ${error}`);
    var aboutContent = 'error'
    res.render('resultRF', {
      aboutContent
    });
  });
  request.write(jsonData)
  request.end()
  //res.render("RF", {aboutContent: aboutContent});
});
// gender: 'male',
//   age: '22',
//   hypertension: 'yes',
//   HeartPain: 'yes',
//   married: 'yes',
//   workType: 'Private',
//   Residence: 'Urban',
//   avgGlucose: '22',
//   BMI: '22',
//   smoker: 'formerlySmoked'
// }



//Route for Deciosion Tree Page
app.get('/DT', (req, res) => {
  res.render('DT');
});
app.post('/DT',(req,res)=>{
  console.log(req.body);
  //gender decider
  if (req.body.gender === 'male') {
    gender = 1
  } else if (req.body.gender === 'female') {
    gender = 0
  } else {
    gender = 2
  }
  //hypertension decider
  if (req.body.hypertension === 'yes') {
    hypertension = 1
  } else {
    hypertension = 0
  }
  //heart disease decider
  if (req.body.HeartPain === 'yes') {
    heartpain = 1
  } else {
    heartpain = 0
  }
  //marriage decider
  if (req.body.married === 'yes') {
    everMaried = 1
  } else {
    everMaried = 0
  }
  //work type decider
  if (req.body.workType === 'Private') {
    workType = 2
  } else if (req.body.workType === 'Self-employed') {
    workType = 3
  } else if (req.body.workType === 'Govt job') {
    workType = 0
  } else if (req.body.workType === 'children') {
    workType = 4
  } else {
    workType = 1
  }
  //smoking decider
  if (req.body.smoker === 'formerlySmoked') {
    workType = 1
  } else if (req.body.smoker === 'neverSmoked') {
    workType = 2
  } else if (req.body.smoker === 'smokes') {
    workType = 3
  } else {
    workType = 0
  }
  //residence decider
  if (req.body.Residence === 'Urban') {
    residenceType = 1
  } else {
    everMaried = 0
  }

  //req.body.age req.body.avgGlucose
  var reqBody = {
    gender: gender,
    age: parseFloat(req.body.age),
    hypertension: hypertension,
    heart_disease: heartpain,
    ever_married: everMaried,
    work_type: workType,
    Residence_type: residenceType,
    avg_glucose_level: parseFloat(req.body.avgGlucose),
    bmi: parseFloat(req.body.BMI),
    smoking_status: smokingStatus,
  }
  console.log(reqBody);
  var jsonData = JSON.stringify(reqBody);
  console.log(jsonData);
  const url = "https://rf.onrender.com/RF";
  const options = {
    method: "POST"
  }

  var aboutContent = ''
  const request = https.request(url, options, function(response) {


    response.on('data', (data) => {
      console.log('ans= ' + JSON.parse(data))
      if (parseInt(JSON.parse(data)) == 0) {
        aboutContent = 'You have no chances of Heart Disease'
      }
      else if (parseInt(JSON.parse(data)) == 1) {
        aboutContent = 'You have moderate chances of Heart Disease'
      }
      else {
        aboutContent = 'You have high chances of Heart Disease'
      }
    })
    response.on('end', () => {
      res.render('resultDT', {
        aboutContent
      });
    })
  });
  request.on('error', (error) => {
    console.error(`Error calling API: ${error}`);
    var aboutContent = 'error'
    res.render('resultDT', {
      aboutContent
    });
  });
  request.write(jsonData)
  request.end()
})
//Routefor Classifier KNN
app.get('/KNN', (req, res) => {
  res.render('KNN');
});
app.post('/KNN',(req,res)=>{
  console.log(req.body);
  //gender decider
  if (req.body.gender === 'male') {
    gender = 1
  } else if (req.body.gender === 'female') {
    gender = 0
  } else {
    gender = 2
  }
  //hypertension decider
  if (req.body.hypertension === 'yes') {
    hypertension = 1
  } else {
    hypertension = 0
  }
  //heart disease decider
  if (req.body.HeartPain === 'yes') {
    heartpain = 1
  } else {
    heartpain = 0
  }
  //marriage decider
  if (req.body.married === 'yes') {
    everMaried = 1
  } else {
    everMaried = 0
  }
  //work type decider
  if (req.body.workType === 'Private') {
    workType = 2
  } else if (req.body.workType === 'Self-employed') {
    workType = 3
  } else if (req.body.workType === 'Govt job') {
    workType = 0
  } else if (req.body.workType === 'children') {
    workType = 4
  } else {
    workType = 1
  }
  //smoking decider
  if (req.body.smoker === 'formerlySmoked') {
    workType = 1
  } else if (req.body.smoker === 'neverSmoked') {
    workType = 2
  } else if (req.body.smoker === 'smokes') {
    workType = 3
  } else {
    workType = 0
  }
  //residence decider
  if (req.body.Residence === 'Urban') {
    residenceType = 1
  } else {
    everMaried = 0
  }

  //req.body.age req.body.avgGlucose
  var reqBody = {
    gender: gender,
    age: parseFloat(req.body.age),
    hypertension: hypertension,
    heart_disease: heartpain,
    ever_married: everMaried,
    work_type: workType,
    Residence_type: residenceType,
    avg_glucose_level: parseFloat(req.body.avgGlucose),
    bmi: parseFloat(req.body.BMI),
    smoking_status: smokingStatus,
  }
  console.log(reqBody);
  var jsonData = JSON.stringify(reqBody);
  console.log(jsonData);
  const url = "https://rf.onrender.com/RF";
  const options = {
    method: "POST"
  }

  var aboutContent = ''
  const request = https.request(url, options, function(response) {


    response.on('data', (data) => {
      console.log('ans= ' + JSON.parse(data))
      if (parseInt(JSON.parse(data)) == 0) {
        aboutContent = 'You have no chances of Heart Disease'
      }
      else if (parseInt(JSON.parse(data)) == 1) {
        aboutContent = 'You have moderate chances of Heart Disease'
      }
      else {
        aboutContent = 'You have high chances of Heart Disease'
      }
    })
    response.on('end', () => {
      res.render('resultKNN', {
        aboutContent
      });
    })
  });
  request.on('error', (error) => {
    console.error(`Error calling API: ${error}`);
    var aboutContent = 'error'
    res.render('resultKNN', {
      aboutContent
    });
  });
  request.write(jsonData)
  request.end()
})

app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
