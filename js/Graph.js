window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Total Calories Per Day"
        },
        axisX:{
            valueFormatString: "MMM DD"
        },
        axisY: {
            title: "Total Calories in a day",
            includeZero: false,
            scaleBreaks: {
                autoCalculate: true
            }
        },
        data: [{
            type: "line",
            xValueFormatString: "MMM DD",
            color: "#000000",
            dataPoints: [
                { x: new Date(2017, 0, 1), y: 1500 },
                { x: new Date(2017, 0, 2), y: 1900 }
            ]
        }]
    });
    chart.render();
    
    }