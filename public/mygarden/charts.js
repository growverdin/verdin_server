google.charts.load('current', {'packages':['corechart']});
//google.charts.setOnLoadCallback(drawChart);


function drawMeasurementsCharts() {
	var day = new Date(document.getElementById('measurementsDate').value);
	var timestampStart = day.getTime();
	day.setHours(23);
	day.setMinutes(59);
	day.setSeconds(59);
	day.setMilliseconds(999);
	var timestampEnd = day.getTime();
	var url;
	document.getElementById('measurementsCharts').innerHTML = "";

        //get list of measurements by plantation
        url = "../getMeasurementsByPlantation?timestampStart=" + timestampStart.toString() + "&timestampEnd=" + timestampEnd.toString();
        loadURL(url, function(data) {
		var measurements = JSON.parse(data);
		if (measurements.length == 0) {
			document.getElementById('measurementsCharts').innerHTML += "<h4>You have no measurements for this date!</h4>";
		} else {
			var dataArray;

			for (var i=0 ; i<measurements.length ; i++) {
				dataArray = [];
				dataArray.push(['Time', 'Moisture (%)']);

				for (var j=0 ; j<measurements[i].date.length ; j++) {
					var date = new Date(parseInt(measurements[i].date[j]));
					var time = parseFloat(date.getHours()) + parseFloat(date.getMinutes()/60);
					dataArray.push([time, parseInt(measurements[i].value[j])]);
				}

				var data = google.visualization.arrayToDataTable(dataArray);
				
				var options = {
					title: 'Plantation: ' + measurements[i]._id.plantation + ' / Device: ' + measurements[i]._id.device + ' / Sensor: ' + measurements[i]._id.sensor + ' / Port: ' + measurements[i]._id.port,
					hAxis: {viewWindow: {min: 0.0, max: 24.0}, ticks: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], title: 'Time',  titleTextStyle: {color: '#333'}},
					vAxis: {viewWindow: {min: 0, max: 100}}
				};

				document.getElementById('measurementsCharts').innerHTML += "<div id='chart_div" + i + "'></div>";

				var chart = new google.visualization.AreaChart(document.getElementById('chart_div' + i));
				chart.draw(data, options);
			}	
		}				
	});

/*
	var data = google.visualization.arrayToDataTable([
		['Year', 'Sales', 'Expenses'],
		['2013',  1000,      400],
		['2014',  1170,      460],
		['2015',  660,       1120],
		['2016',  1030,      540]
	]);

	var options = {
		title: 'Company Performance',
		hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
		vAxis: {minValue: 0}
	};


	document.getElementById('measurementsCharts').innerHTML = "<div id='chart_div'></div><div id='chart_div2'></div>";

	var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
	chart.draw(data, options);
	var chart = new google.visualization.AreaChart(document.getElementById('chart_div2'));
        chart.draw(data, options);
*/

}
