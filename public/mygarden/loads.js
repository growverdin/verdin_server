var addPlantation_speciesList;

var linkSensor_sensorList;
var linkSensor_plantationList;
var linkSensor_deviceList;
var linkSensor_readPortList;
var linkSensor_powerPortList;

var linkActuator_actuatorList;
var linkActuator_plantationList;
var linkActuator_deviceList;
var linkActuator_portList;
var linkActuator_linkedSensorList;

function load_linksPage() {
	var url;

	//get list of plantations
        url = "../getPlantations";
        loadURL(url, function(data) {
                var res = JSON.parse(data);
                var html = "";
                if (res.length == 0) {
                        html += "<h4>You have no Plantations!</h4>"
                } else {
                        html += "<table class='table'><thead><tr><th>Name</th><th>Species</th><th></th></thead></tr></tbody>"
                        for (i=0 ; i<res.length ; i++) {
                                html += "<tr><td>" + res[i].name + "</td><td>" + res[i].species.name + "</td><td><a class='btn btn-danger btn-xs' href='javascript: deletePlantation(\"" + res[i].id + "\")'>Delete</a></td></tr>";
                        }
                        html += "</body></table>"
                }
                document.getElementById('plantations').innerHTML = html;
        });

        //get list of verdin devices
        url = "../getDevices";
        loadURL(url, function(data) {
                var res = JSON.parse(data);
                var html = "";
                if (res.length == 0) {
                        html += "<h4>You have no Verdin devices!</h4>"
                } else {
                        html += "<table class='table'><thead><tr><th>Name</th><th>Mac Address</th><th></th></thead></tr></tbody>"
                        for (i=0 ; i<res.length ; i++) {
                                html += "<tr><td>" + res[i].name + "</td><td>" + res[i].macAddress + "</td><td><a class='btn btn-danger btn-xs' href='javascript: deleteDevice(\"" + res[i].id + "\")'>Delete</a></td></tr>";
                        }
                        html += "</body></table>"
                }
                document.getElementById('verdinDevices').innerHTML = html;
        });

        //get list of linked sensors
        url = "../getLinkedSensors";
        loadURL(url, function(data) {
                var res = JSON.parse(data);
                var html = "";
                if (res.length == 0) {
                        html += "<h4>You have no linked sensors!</h4>"
                } else {
                        html += "<table class='table'><thead><tr><th>Plantation</th><th>Device</th><th>Sensor</th><th>Read Port</th><th>Power Port</th><th></th></thead></tr></tbody>"
                        for (i=0 ; i<res.length ; i++) {
                                html += "<tr><td>" + res[i].plantation.name + "</td><td>" + res[i].device.name + "</td><td>" + res[i].senAct.name + "</td><td>" + res[i].readPort.name + "</td><td>" + res[i].powerPort.name + "</td><td><a class='btn btn-danger btn-xs' href='javascript: delinkDevices(\"" + res[i].id + "\")'>Delete</a></td></tr>";
                        }
                        html += "</body></table>"
                }
                document.getElementById('linkedSensors').innerHTML = html;
        });

	//get list of linked actuators
        url = "../getLinkedActuators";
        loadURL(url, function(data) {
                var res = JSON.parse(data);
                var html = "";
                if (res.length == 0) {
                        html += "<h4>You have no linked actuators!</h4>"
                } else {
                        html += "<table class='table'><thead><tr><th>Plantation</th><th>Device</th><th>Actuator</th><th>Port</th><th></th></thead></tr></tbody>"
                        for (i=0 ; i<res.length ; i++) {
                                html += "<tr><td>" + res[i].plantation.name + "</td><td>" + res[i].device.name + "</td><td>" + res[i].senAct.name + "</td><td>" + res[i].port.name + "</td><td><a class='btn btn-danger btn-xs' href='javascript: delinkDevices(\"" + res[i].id + "\")'>Delete</a></td></tr>";
                        }
                        html += "</body></table>"
                }
                document.getElementById('linkedActuators').innerHTML = html;
        });
}

function load_addPlantationPage() {
	var url;

	//get list of available species
        url = "../getSpecies";
        loadURL(url, function(data) {
                addPlantation_speciesList = JSON.parse(data);
                document.getElementById('addPlantationSpecies').innerHTML = "";
                for (i=0 ; i<addPlantation_speciesList.length ; i++) {
                        document.getElementById('addPlantationSpecies').innerHTML += "<option value='" + i + "'>" + addPlantation_speciesList[i].name + "</option>";
                }
        });
}

function load_linkSensorPage() {
	var url;
	
	//get list of available sensors
        url = "../getSensors";
        loadURL(url, function(data) {
                linkSensor_sensorList = JSON.parse(data);
                document.getElementById('linkSensorSensor').innerHTML = "";
                for (i=0 ; i<linkSensor_sensorList.length ; i++) {
                        document.getElementById('linkSensorSensor').innerHTML += "<option value='" + i + "'>" + linkSensor_sensorList[i].name + "</option>";
                }
        });

	//get registered plantation list
        url = "../getPlantations";
        loadURL(url, function(data) {
                linkSensor_plantationList = JSON.parse(data);
                document.getElementById('linkSensorPlantation').innerHTML = "";
                for (i=0 ; i<linkSensor_plantationList.length ; i++) {
                        document.getElementById('linkSensorPlantation').innerHTML += "<option value='" + i + "'>" + linkSensor_plantationList[i].name + "</option>";
                }
        });

        //get registered devices list
        url = "../getDevices";
        loadURL(url, function(data) {
                linkSensor_deviceList = JSON.parse(data);
                document.getElementById('linkSensorDevice').innerHTML = "";
                for (i=0 ; i<linkSensor_deviceList.length ; i++) {
                        document.getElementById('linkSensorDevice').innerHTML += "<option value='" + i + "'>" + linkSensor_deviceList[i].name + " (" + linkSensor_deviceList[i].macAddress + ")" + "</option>";
                }

		//get list of available ports
        	linkSensorDeviceChanged();
        });
}

function load_linkActuatorPage() {
	var url;

	//get list of available actuators
        url = "../getActuators";
        loadURL(url, function(data) {
                linkActuator_actuatorList = JSON.parse(data);
                document.getElementById('linkActuatorActuator').innerHTML = "";
                for (i=0 ; i<linkActuator_actuatorList.length ; i++) {
                        document.getElementById('linkActuatorActuator').innerHTML += "<option value='" + i + "'>" + linkActuator_actuatorList[i].name + "</option>";
                }
        });

	//get registered plantation list
        url = "../getPlantations";
        loadURL(url, function(data) {
                linkActuator_plantationList = JSON.parse(data);
                document.getElementById('linkActuatorPlantation').innerHTML = "";
                for (i=0 ; i<linkActuator_plantationList.length ; i++) {
                        document.getElementById('linkActuatorPlantation').innerHTML += "<option value='" + i + "'>" + linkActuator_plantationList[i].name + "</option>";
                }

		//get list of sensors for water pump actuator
        	linkActuatorPlantationChanged();
        });

        //get registered devices list
        url = "../getDevices";
        loadURL(url, function(data) {
                linkActuator_deviceList = JSON.parse(data);
                document.getElementById('linkActuatorDevice').innerHTML = "";
                for (i=0 ; i<linkActuator_deviceList.length ; i++) {
                        document.getElementById('linkActuatorDevice').innerHTML += "<option value='" + i + "'>" + linkActuator_deviceList[i].name + " (" + linkActuator_deviceList[i].macAddress + ")" + "</option>";
                }

		//get list of available ports
	        linkActuatorDeviceChanged();
        });
}

function load_measurementsPage() {
	//get todays date
	var today = new Date();
	var dateString = (today.getMonth()+1 < 10) ? "0" + (today.getMonth()+1) : "" + (today.getMonth()+1);
	dateString += "/" + (today.getDate() < 10 ? "0" + today.getDate() : "" + today.getDate());
	dateString += "/" + today.getFullYear();
	document.getElementById('measurementsDate').value = dateString;
	
	//intanciate datepicker
	$('.datepicker').datepicker();

	//draw measurements charts
	drawMeasurementsCharts();

	/*
	var url;

	//get list of measurements
        url = "../getMeasurements";
        loadURL(url, function(data) {
                var res = JSON.parse(data);
                var html = "";
                var date;
                var dateString;
                
		if (res.length == 0) {
                        html += "<h4>You have no measurements!</h4>"
                } else {
                        html += "<table class='table'><thead><tr><th>Device</th><th>Sensor</th><th>Port</th><th>Value</th><th>Time</th></thead></tr><tbody>"
                        for (i=0 ; i<res.length ; i++) {
                                date = new Date(parseInt(res[i].date));
                                dateString = (date.getMonth()+1 < 10) ? "0" + (date.getMonth()+1) : "" + (date.getMonth()+1);
                                dateString += "/" + (date.getDate() < 10 ? "0" + date.getDate() : "" + date.getDate());
                                dateString += "/" + date.getFullYear();
                                dateString += " " + (date.getHours() < 10 ? "0" + date.getHours() : "" + date.getHours());
                                dateString += ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : "" + date.getMinutes());
                                dateString += ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : "" + date.getSeconds());
                                html += "<tr><td>" + res[i].linkedSensor.device.name + "</td><td>" + res[i].linkedSensor.senAct.name + "</td><td>" + res[i].linkedSensor.readPort.name + "</td><td>" + res[i].value + "</td><td>" + dateString + "</td></tr>";
                        }
                        html += "</tbody></table>"
                }
                document.getElementById('measurements').innerHTML = html;
		

		//get todays date
		var today = new Date();
		dateString = (today.getMonth()+1 < 10) ? "0" + (today.getMonth()+1) : "" + (today.getMonth()+1);
		dateString += "/" + (today.getDate() < 10 ? "0" + today.getDate() : "" + today.getDate());
		dateString += "/" + today.getFullYear();
		document.getElementById('measurementsDate').value = dateString;
        	
		//intanciate datepicker
                $('.datepicker').datepicker();
		//$('.datepicker').datepicker("option", "defaultDate", new Date(2008,9,3));
		//autoclose: true
		$('.datepicker').datepicker({
			startDate: '-3d'
		});

		//draw measurements charts
		drawMeasurementsCharts();
        });
	*/
}

function loadPage() {
	load_measurementsPage();
	measurementsLinkClick();
}

function displayPage(page) {
	var pages = document.getElementsByClassName('page');
	for (var i=0 ; i<pages.length ; i++) {
		pages[i].style.display = "none";
	}
	document.getElementById(page).style.display = "initial";
}

function measurementsLinkClick() {
	var navBarLinks = document.getElementById('navBarLinks').getElementsByTagName('li');
	for (var i=0 ; i<navBarLinks.length ; i++) {
		if (navBarLinks[i].id == "measurementsLink") {
			navBarLinks[i].className = "active";
		} else {
			navBarLinks[i].className = "";
		}
	}
	
	displayPage('measurementsPage');
}

function linksLinkClick() {
	var navBarLinks = document.getElementById('navBarLinks').getElementsByTagName('li');
	for (var i=0 ; i<navBarLinks.length ; i++) {
		if (navBarLinks[i].id == "linksLink") {
			navBarLinks[i].className = "active";
		} else {
			navBarLinks[i].className = "";
		}
	}

	displayPage('linksPage');
}

function linkActuatorBasedonRadioChanged() {
	if (document.getElementById('linkActuatorBasedonRadio0').checked) {
		document.getElementById('linkActuatorSensorRow').style.display = "none";
                document.getElementById('linkActuatorMoistureLevelRow').style.display = "none";
                document.getElementById('linkActuatorPeriodRow').style.display = "";
	} else if (document.getElementById('linkActuatorBasedonRadio1').checked) {
		document.getElementById('linkActuatorSensorRow').style.display = "";
                document.getElementById('linkActuatorMoistureLevelRow').style.display = "";
                document.getElementById('linkActuatorPeriodRow').style.display = "none";
	}
}

function linkSensorDeviceChanged() {
	var deviceIndex = document.getElementById('linkSensorDevice').value;
	var device = linkSensor_deviceList[deviceIndex];
	var url;

	url = "../getAvailablePorts?deviceId=" + device.id + "&ad=a";
        loadURL(url, function(data) {
                linkSensor_readPortList = JSON.parse(data);
                document.getElementById('linkSensorReadPort').innerHTML = "";
                for (i=0 ; i<linkSensor_readPortList.length ; i++) {
                        document.getElementById('linkSensorReadPort').innerHTML += "<option value='" + i + "'>" + linkSensor_readPortList[i].name + "</option>";
                }
        });

	url = "../getAvailablePorts?deviceId=" + device.id + "&ad=d";
        loadURL(url, function(data) {
                linkSensor_powerPortList = JSON.parse(data);
                document.getElementById('linkSensorPowerPort').innerHTML = "";
                for (i=0 ; i<linkSensor_powerPortList.length ; i++) {
                        document.getElementById('linkSensorPowerPort').innerHTML += "<option value='" + i + "'>" + linkSensor_powerPortList[i].name + "</option>";
                }       
        }); 	
}

function linkActuatorDeviceChanged() {
	var deviceIndex = document.getElementById('linkActuatorDevice').value;
	var device = linkActuator_deviceList[deviceIndex];
	var url;

        url = "../getAvailablePorts?deviceId=" + device.id + "&ad=d";
        loadURL(url, function(data) {
                linkActuator_portList = JSON.parse(data);
                document.getElementById('linkActuatorPort').innerHTML = "";
                for (i=0 ; i<linkActuator_portList.length ; i++) {
                        document.getElementById('linkActuatorPort').innerHTML += "<option value='" + i + "'>" + linkActuator_portList[i].name + "</option>";
                }
        });
}

function linkActuatorPlantationChanged() {
	var plantationIndex = document.getElementById('linkActuatorPlantation').value;
	var plantation = linkActuator_plantationList[plantationIndex];
        var url;

        url = "../getLinkedSensorsOfPlantation?plantationId=" + plantation.id + "&sensorId=1";
        loadURL(url, function(data) {
                linkActuator_linkedSensorList = JSON.parse(data);
                document.getElementById('linkActuatorSensor').innerHTML = "";
                for (i=0 ; i<linkActuator_linkedSensorList.length ; i++) {
                        document.getElementById('linkActuatorSensor').innerHTML += "<option value='" + i + "'>" + linkActuator_linkedSensorList[i].senAct.name + " / " + linkActuator_linkedSensorList[i].readPort.name + " / " + linkActuator_linkedSensorList[i].device.name +  "</option>";
                }
        });
}

window.addEventListener("load", loadPage);
