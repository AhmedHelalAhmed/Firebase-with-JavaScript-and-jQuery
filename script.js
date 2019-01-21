// file: scriptjs.js
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDZqm2JBXxeaM05SoVP3Y-9pBIUUScJ0wk",
    authDomain: "realtimecrud-36fb7.firebaseapp.com",
    databaseURL: "https://realtimecrud-36fb7.firebaseio.com",
    projectId: "realtimecrud-36fb7",
    storageBucket: "realtimecrud-36fb7.appspot.com",
    messagingSenderId: "648153450588"
};
firebase.initializeApp(config);
// ... rest of the code


var dbRef = firebase.database();
var contactsRef = dbRef.ref('contacts');

let new_data = {
    name: 'Time to Hack',
    email: 'thetime2hack@gmail.com',
    location: {
        city: 'The Internet',
        state: 'The Internet',
        zip: '127.0.0.1'
    }
};
contactsRef.push(new_data);

contactsRef.on("child_added", function (snap)
{
    console.log(snap.val());
    snap.forEach(function (childSnapshot)
                 {
                     var key = childSnapshot.key();
                     var childData = childSnapshot.val();
                 });
});

let data = {
    "email": "wrongemail@gmail.com",
    "location": {
        "city": "Gurgaon",
        "state": "Haryana",
        "zip": "122001"
    },
    "name": "Pankaj Patel"
};
contactsRef.push(data);
contactsRef.on("child_added", function (snap)
{
    //set the new value after 10 seconds
    setTimeout(function ()
               {
                   let addData = {
                       "email": "morewrongemail@gmail.com",
                       "location": {
                           "city": "Mumbai",
                           "state": "Maharashtra",
                           "zip": "452001"
                       },
                       "name": "Pankaj"
                   };
                   contactsRef.child(snap.key()).set(addData);
               }, 10 * 1000);
    //delete the object after 20 seconds
    setTimeout(function ()
               {
                   contactsRef.child(snap.key()).remove();
               }, 20 * 1000);
});
