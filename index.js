require('dotenv').config();
var firebase = require("firebase");

// Initialize Firebase
var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL
};
firebase.initializeApp(config);
var database = firebase.database();
console.log("hi");
