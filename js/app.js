//Add element to the list
let click = document.getElementById('add-button');
//The ul list 
let listItems = document.getElementById('list-items');
//The input for the food name
let itemName = document.getElementById('food-name');
//The input for the calories
let calories = document.getElementById('calories');

//The div and the list it contains
let nodeList = document.getElementById('list-display');
let nodeItemOrder = nodeList.getElementsByTagName("ul");

//The save button at the bottom of the page
let saveButton = document.getElementById('save-button');

//Keep track of the number of calories added
let totalCalorie = 0;
let totalCalorieCount = document.getElementById('total-count');

//Add item to the list on Home page
click.addEventListener("click", () => {
    let entry = document.createElement("li");
    let entryTwo = document.createElement("li");
    let div = document.createElement('div');

    if(isNaN(parseInt(calories.value))) {
        alert('Input a number for calories!');
    } else {
        entry.appendChild(document.createTextNode(itemName.value));
        entryTwo.appendChild(document.createTextNode(calories.value));

        totalCalorie += parseInt(calories.value);
        totalCalorieCount.textContent = "TOTAL: " + totalCalorie;
        
        div.appendChild(entry);
        div.appendChild(entryTwo);
        listItems.appendChild(div);
        entryTwo.setAttribute("value", calories.value);

        div.addEventListener('click', () => {
            div.parentNode.removeChild(div);
            totalCalorie -= parseInt(div.childNodes[1].getAttribute("value"));
            totalCalorieCount.textContent = "TOTAL: " + totalCalorie;

            if(totalCalorie === 0) {
                totalCalorieCount.textContent = "TOTAL:";   
            }
        });
    }

    itemName.value = "";
    calories.value = "";
});

//Save all data to Firebase Storage, and viewable from the Saved Page
saveButton.addEventListener("click", () => {
    console.log(totalCalorie);
});

//Login aspect of the home page
let loginButton = document.getElementById('login');
let credential = document.getElementById('login-password');
let loginForm = document.getElementById('login-password-form');

//Registration of user
let signupButton = document.getElementById('signup');
let signupCreds = document.getElementById('signup-info');
let signupForm = document.getElementById('signup-form');

//Login
let email = document.getElementById('email');
let password = document.getElementById('password');

//Registration 
let signEmail = document.getElementById('signup-email');
let signPassword = document.getElementById('signup-password');

signupButton.addEventListener('click', () => {
    changeDisplay(signupCreds)
});

loginButton.addEventListener('click', () => {
    changeDisplay(credential);
});

loginForm.addEventListener('keydown', (e) => {
    credentialForm(e, email, password);
});

signupForm.addEventListener('keydown', (e) => {
    credentialForm(e, signEmail, signPassword);
});

function changeDisplay(element) {
    if(element.style.display === 'none') {
        element.style.display = 'block';   
    } else {
        element.style.display = 'none';   
    }
}

function credentialForm(e, user, password) {
    if(e.keyCode === 13) {
        if(!user.value || !password.value) {
            alert('Enter credentials!');
            user.value = "";
            password.value = "";
        } else {
            console.log('login button works');
            writeUserData('Amitesh', 'Hello');
        }
    }
}

function writeUserData(name, email) {
    firebase.database().ref('test').set({
      username: name,
      email: email,
    });
  }




