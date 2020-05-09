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
let credential = document.getElementById('login-div');
let loginForm = document.getElementById('login-form');

//Registration of user
let signupButton = document.getElementById('signup');
let signupCreds = document.getElementById('signup-div');
let signupForm = document.getElementById('signup-form');

//Login
let email = document.getElementById('email');
let password = document.getElementById('password');

//Registration 
let signEmail = document.getElementById('signup-email');
let signPassword = document.getElementById('signup-password');

//Logout
let logoutButton = document.getElementById('logout');

signupButton.addEventListener('click', () => {
    changeDisplay(signupCreds)
});

loginButton.addEventListener('click', () => {
    changeDisplay(credential);
});

logoutButton.addEventListener('click', () => {
    logout();
});

loginForm.addEventListener('keydown', (e) => {
    login(e);
});

signupForm.addEventListener('keydown', (e) => {
    register(e);   
});

function changeDisplay(element) {
    if(element.style.display === 'none') {
        element.style.display = 'block';   
    } else {
        element.style.display = 'none';   
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('User is in!');
      loginButton.style.display = 'none';
      signupButton.style.display = 'none';
      logoutButton.style.display = 'block';
      credential.style.display = 'none';
      signupCreds.style.display = 'none';
    } else {
      // No user is signed in.
      console.log('User is not in!');
    }
  });

function login(e) {
    if(e.keyCode === 13) {
        if(!email.value || !password.value) {
            alert('Enter credentials!');
            email.value = "";
            password.value = "";
        } else {
            firebase.auth().signInWithEmailAndPassword(email.value, password.value).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorMessage);
              });
        }
    }
}

function register(e) {
    let email = signEmail;
    let password = signPassword;
    
    if(e.keyCode === 13) {
        if(!email.value || !password.value) {
            alert('Enter credentials!');
            email.value = "";
            password.value = "";
        } else {
            firebase.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorMessage);
              });
        }
    }
}

function logout() {
    firebase.auth().signOut().then(function() {
        loginButton.style.display = 'block';
        signupButton.style.display = 'block';
        logoutButton.style.display = 'none';
      }).catch(function(error) {
        // An error happened.
      });
}

function writeUserData(name, email) {
    firebase.database().ref('test').set({
      username: name,
      email: email,
    });
  }




