let button = document.getElementById('back');
let calorieGoal = document.getElementById('calorie-goals');
let setGoal = document.getElementById('set-goal');
let successful = document.getElementById('successful');

button.addEventListener('click', () => {
    location.replace('../Index.html');
});

setGoal.addEventListener('click', () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            if(calorieGoal.value) {
                writeUserData(user.uid, calorieGoal.value);
                calorieGoal.value = '';

                $('#successful').fadeIn(2000);
                $('#successful').fadeOut(2000);
            } else {
                var popup = document.getElementById("myPopup");
                popup.classList.toggle("show");    
            }
        } else {
            // No user is signed in.
        }
    });
});

function writeUserData(user, calorie) {
    firebase.database().ref('UserId/' + user + '/Goals').set({
        CaloriesGoal: calorie
    });
}