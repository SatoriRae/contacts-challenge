
let contacts = []

function addContact(event) {
  event.preventDefault()
  let form = event.target

  let contact = {
    id: generateId(),
    name: form.name.value,
    phone: form.phone.value,
    emergencyContact: form.emergencyContact.checked
  }

  contacts.push(contact)
  saveContacts()
  form.reset()
}

/* the contacts array data is stringifyed and saved into local storage when calling function saveContacts -- drawContacts takes everything that is in the contact-list from template and draws to the DOM*/
function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
  console.log("saved contact-list to local storage")
  /* this console.log happens when I push submit or delete*/
  drawContacts()
}

function loadContacts() {
  let storedContacts = JSON.parse(window.localStorage.getItem("contacts"))
  if (storedContacts) {
    contacts = storedContacts
  }
  console.log("brought contact-list data out of storage")
/* this console.log happens when I refresh page*/
}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */

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
  console.log ("template card added/deleted")
}

/**
 * @param {string} contactId 
 */

function removeContact(contactId) {
  let index = contacts.findIndex(contact => contact.id == contactId)
  if (index == -1) {
    throw new Error("Invalid Contact Id")
  }
  contacts.splice(index, 1)
  saveContacts()
}

function toggleAddContactForm() {
  document.getElementById('new-contact-form').classList.toggle("hidden")
}
/* toggleAddContactForm() listed on index.html submit button and shows full new-contact-form*/

function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}
/**
 * Math.floor - return the closest integer that is smaller or equal to given number
 * Math.random - range from 0 to less than 1
 * + "-" ???? plalceholder object?  parameter= special kind of variable */

loadContacts()
drawContacts()