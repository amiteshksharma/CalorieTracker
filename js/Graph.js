window.onload = function () {
    const date = new Date();

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
        }]
    };

    var chart = new CanvasJS.Chart("chartContainer", graphObject);
    chart.render();

    var user = firebase.auth().currentUser;
    let list = firebase.database().ref('UserId/' + user.uid).once('value').then(function (snapshot) {
        var keyDate = Object.keys(snapshot.val());
        console.log(keyDate)
        keyDate.forEach(item => {
            const calorie = snapshot.child(`${item}/Calories`).val();
            const value = {
                x: formatToDate(item),
                y: calorie
            }
            graphObject.data[0].dataPoints.push(value);
            chart.render();
        });
    });
}

function formatToDate(date) {
    let day = date.substring(0, 2);
    let month = date.substring(2, 4);
    return new Date(2020, month-1, day);
}