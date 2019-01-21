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
    console.log("added", snap.key(), snap.val());
    document.querySelector('#contacts')
        .innerHTML += contactHtmlFromObject(snap.val());
});
//save contact
document.querySelector('.addValue')
        .addEventListener("click", function( event ) {
            event.preventDefault();
            if( document.querySelector('#name').value != ''
                || document.querySelector('#email').value != '' ){
                contactsRef.push({
                                     name: document.querySelector('#name').value,
                                     email: document.querySelector('#email').value,
                                     location: {
                                         city: document.querySelector('#city').value,
                                         state: document.querySelector('#state').value,
                                         zip: document.querySelector('#zip').value
                                     }
                                 });
                contactForm.reset();
            } else {
                alert('Please fill atlease name or email!');
            }
        }, false);
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