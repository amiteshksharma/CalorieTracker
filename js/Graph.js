window.onload = function () {
    const date = new Date();
    const tableData = document.getElementById('table');

    const graphObject = {
        animationEnabled: true,
        title: {
            text: "Total Calories Per Day",
            fontColor: "#2b55e0"
        },
        axisX: {
            title: "Date",
            valueFormatString: "MMM DD",
            interlacedColor: "#deeafa",
            labelFontColor: "#e62226"
        },
        axisY: {
            title: "Total Calories in a day",
            includeZero: false,
            labelFontColor: "#e62226",
            scaleBreaks: {
                autoCalculate: true
            }
        },
        data: [{
            type: "line",
            lineThickness: 5,
            xValueFormatString: "MMM DD",
            color: "#3285a8",
            dataPoints: [
                {x: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`},
            ]
        }, 
        {
            type: "line",
            showInLegend: true,
            xValueFormatString: "MMM DD",
            color: "#A3558B",
            lineThickness: 5,
            name: "Calorie Goal",
            dataPoints: []
        }]
    };

    let chart = new CanvasJS.Chart("chartContainer", graphObject);
    chart.render();

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            let list = firebase.database().ref('UserId/' + user.uid + '/Dates').once('value').then(function (snapshot) {
                let keyDate = Object.keys(snapshot.val());
                keyDate.forEach(item => {
                    const calorie = snapshot.child(`${item}/Calories`).val();
                    const value = {
                        x: formatToDate(item),
                        y: calorie
                    }
                    graphObject.data[0].dataPoints.push(value);
                    chart.render();
        
                    let row = table.insertRow(1);
                    let cellDate = row.insertCell(0);
                    let cellCal = row.insertCell(1);
        
                    cellDate.innerHTML = formatToShorterDate(item);
                    cellCal.innerHTML = calorie;
                });
            });

            getGoalsData(user, graphObject, chart);
            getGoalsDataLoop(user, graphObject, chart);
            
        } else {
            // No user is signed in.
        }
    });
}

function formatToDate(date) {
    let day = date.substring(0, 2);
    let month = date.substring(2, 4);
    return new Date(2020, month-1, day);
}

function formatToShorterDate(date) {
    let day = date.substring(0, 2);
    let month = date.substring(2, 4);
    return month + "/" + day;
}

function getGoalsData(user, graphObject, chart) {
    let goal = firebase.database().ref('UserId/' + user.uid + '/Goals').once('value').then(function (snapshot) {
        let calorieGoal = snapshot.val();
        const value = {
            x: new Date(),
            y: parseInt(calorieGoal.CaloriesGoal)
        }

        graphObject.data[1].dataPoints.push(value);
        chart.render();
    });
}

function getGoalsDataLoop(user, graphObject, chart) {
    let goal = firebase.database().ref('UserId/' + user.uid + '/Goals').once('value').then(function (snapshot) {
        let calorieGoal = snapshot.val();

        var d = new Date();


        for(let i = 0; i < 30; i++) {
            const value = {
                x: new Date(2020, d.getMonth(), i),
                y: parseInt(calorieGoal.CaloriesGoal)
            }
            graphObject.data[1].dataPoints.push(value);
        }
        chart.render();
    });
}