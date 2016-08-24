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

var url = process.env.IVQ_API_BASEURL;
request(url + 'questions', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var questions = JSON.parse(body);
    for (var i = 0; i < questions.length; i++) {
      var question = questions[i];
      console.log(question.id + ':' + question.question_title);
      firebase.database().ref('questions/' + question.id).set({
        title: question.question_title
      });
    }
  }
});
