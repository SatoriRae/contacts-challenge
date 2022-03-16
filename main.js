

/**
 * DIRECTIONS: Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 */

/*CONTACTS gets an array*/
let contacts = []

/* function to add a contact from the event (which is a form) without having a default that reloads page */
/* form gets the event.target information  */
function addContact(event) {
  event.preventDefault()
  let form = event.target

/* CONTACT gets an object with data strings */
/* an id is generated for each object */
/* name, form, and emergencyContact status is pulled from form with event targets*/
  let contact = {
    id: generateId(),
    name: form.name.value,
    phone: form.phone.value,
    emergencyContact: form.emergencyContact.checked
  }
/* we add the new contact (push) to the array contacts*/
/* we save the new contacts array (is it updated on the screen then??) */
/* everything is added so we form.reset to clear the form  */
  contacts.push(contact)
  saveContacts()
  form.reset()
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 


/* the contacts array data is stringifyed and saved into local storage when calling function saveContacts -- drawContacts takes everything that is in the contact-list from template and draws to the DOM*/
function saveContacts() {
window.localStorage.setItem("contacts", JSON.stringify(contacts)) 
console.log("saved contact-list to local storage")
drawContacts()
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */

/*to load the contacts data, we get the object data from contacts in the array that is parked in local storage. Loading (displaying?) the contact as long as its an offical stored contact (eliminating the mock up in html?-not sure) */

function loadContacts() {
  let storedContacts = JSON.parse(window.localStorage.getItem("contacts"))
  if (storedContacts){
    contacts = storedContacts
  }  
  console.log ("brought contact-list data out of storage")
}


/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
/* we have a contacts array. we put it in a template. for each contact we make a div with the specified information  rigtht? */

 function drawContacts() {
  let contactListElement = document.getElementById("contact-list")
  let contactsTemplate = ""
  contacts.forEach(contact => {
     contactsTemplate += `
     <div class="contact card mt-1 mb-1 ${contact.emergencyContact ? 'emergency-contact' : ''}">
         <h3 class="mt-1 mb-1">${contact.name}</h3>
         <div class="d-flex space-between">
           <p>
             <i class="fa fa-fw fa-phone"></i>
             <span>${contact.phone}</span>
           </p>
           <i class="action fa fa-trash text-danger" onclick="removeContact('${contact.id}')"></i>
         </div>
       </div>
     `
  })
  contactListElement.innerHTML = contactsTemplate
 }

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * @param {string} contactId 
 */
function removeContact(contactId) {
let index = contacts.findIndex(contact => contact.id == contactId)
if (index == -1) {
  throw new Error("Invalid Contact Id")
}
contacts.splice(index, 1)
saveContacts ()

}

/** Toggles the visibility of the AddContact Form*/

/* when I push the cancel button this seems to work but not when I push the submit button*/

function toggleAddContactForm() {
  document.getElementById('new-contact-form').classList.toggle("hidden")
}

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
  console.log ("return")
}


loadContacts()
drawContacts()