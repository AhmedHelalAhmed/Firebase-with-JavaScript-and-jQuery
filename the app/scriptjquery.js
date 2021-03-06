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




//create firebase database reference
var dbRef = firebase.database();
var contactsRef = dbRef.ref('contacts');



//load older conatcts as well as any newly added one...
contactsRef.on("child_added", function(snap) {

    $('#contacts').append(contactHtmlFromObject(snap.val()));
});





//save contact
$('.addValue').on("click", function( event ) {
    event.preventDefault();
    if( $('#name').val() != '' || $('#email').val() != '' ){
        contactsRef.push({
                             name: $('#name').val(),
                             email: $('#email').val(),
                             location: {
                                 city: $('#city').val(),
                                 state: $('#state').val(),
                                 zip: $('#zip').val()
                             }
                         })
        contactForm.reset();
    } else {
        alert('Please fill atlease name or email!');
    }
});
//prepare conatct object's HTML
function contactHtmlFromObject(contact){
    console.log( contact );
    var html = '';
    html += '<li class="list-group-item contact">';
    html += '<div>';
    html += '<p class="lead">'+contact.name+'</p>';
    html += '<p>'+contact.email+'</p>';
    html += '<p><small title="'+contact.location.zip+'">'
        + contact.location.city + ', '
        + contact.location.state + '</small></p>';
    html += '</div>';
    html += '</li>';
    return html;
}