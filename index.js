require('dotenv').config();
var firebase = require("firebase");
var request = require('request');

var firebaseAuth = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL
};
firebase.initializeApp(firebaseAuth);
var database = firebase.database();

var baseUrl = process.env.IVQ_API_BASEURL;
var questionsUrl = baseUrl + 'questions?filter[posts_per_page]=50';

request(questionsUrl + 'questions', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log('\n***Importing questions:');
    var questions = JSON.parse(body);
    for (var i = 0; i < questions.length; i++) {
      var question = questions[i];
      console.log(question.id + ':' + question.question_title);
      firebase.database().ref('questions/q' + question.id).set({
        title: question.question_title,
        category: question.categories[0]
      });        
    }
  }
});

request(baseUrl + 'categories', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log('\n***Importing categories:');
    var categories = JSON.parse(body);
    var category;
    for (var i = 0; i < categories.length; i++) {
      category = categories[i];
      console.log(category.id + ':' + category.name);
      firebase.database().ref('categories/c' + category.id).set({
        name: category.name
      });        
    }
  }
});
