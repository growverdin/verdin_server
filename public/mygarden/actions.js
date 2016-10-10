function addPlantation() {
        var name = document.getElementById('addPlantationName').value;
        var speciesIndex = document.getElementById('addPlantationSpecies').value;
	var species = JSON.stringify(addPlantation_speciesList[speciesIndex]);
 
        var url = "../addPlantation?id=" + getUniqueId() + "&name=" + encodeURIComponent(name) + "&species=" + encodeURIComponent(species);
        var callback = function(data) {
                var res = data;
                if (res == "1") {
                        load_linksPage();
                        displayPage("linksPage");
                } else if (res == "0") {
                        alert("Error adding plantation!");
                } else if (res == "-1") {
                        alert("This plantation is already added!");
                }
        }
        loadURL(url, callback);
}

function deletePlantation(id) {
        var url = "../deletePlantation?id=" + encodeURIComponent(id);
        var callback = function(data) {
                var res = data;
                if (res == "1") {
                        load_linksPage();
                        displayPage("linksPage");
                } else if (res == "0") {
                        alert("Error deleting plantation!");
                } else if (res == "-1") {
                        alert("There is no plantation with this id!");
                }
        }
        loadURL(url, callback);
}

function addDevice() {
	var name = document.getElementById('addDeviceName').value;
	var macAddress = document.getElementById('addDeviceMacAddress').value;

	var url = "../addDevice?id=" + getUniqueId() + "&name=" + encodeURIComponent(name) + "&macAddress=" + encodeURIComponent(macAddress);
	var callback = function(data) {
		var res = data;
		if (res == "1") {
			load_linksPage();
			displayPage("linksPage");
		} else if (res == "0") {
			alert("Error adding device!");
		} else if (res == "-1") {
			alert("This device is already added!");
		}
	}
	loadURL(url, callback);
}

function deleteDevice(id) {
        var url = "../deleteDevice?id=" + encodeURIComponent(id);
        var callback = function(data) {
                var res = data;
                if (res == "1") {
                        load_linksPage();
                        displayPage("linksPage");
                } else if (res == "0") {
                        alert("Error deleting device!");
                } else if (res == "-1") {
                        alert("There is no device with this id!");
                }
        }
        loadURL(url, callback);
}


function linkSensor() {
	var sensorIndex = document.getElementById('linkSensorSensor').value;
	var sensor = JSON.stringify(linkSensor_sensorList[sensorIndex]);
	var plantationIndex = document.getElementById('linkSensorPlantation').value;
	var plantation = JSON.stringify(linkSensor_plantationList[plantationIndex]);
	var deviceIndex = document.getElementById('linkSensorDevice').value;
	var device = JSON.stringify(linkSensor_deviceList[deviceIndex]);
	var readPortIndex = document.getElementById('linkSensorReadPort').value;
	var readPort = JSON.stringify(linkSensor_readPortList[readPortIndex]);
	var powerPortIndex = document.getElementById('linkSensorPowerPort').value;
	var powerPort = JSON.stringify(linkSensor_powerPortList[powerPortIndex]);

        var url = "../linkDevices?id=" + getUniqueId() + "&device=" + encodeURIComponent(device) + "&plantation=" + encodeURIComponent(plantation) + "&senAct=" + encodeURIComponent(sensor) + "&readPort=" + encodeURIComponent(readPort) + "&powerPort=" + encodeURIComponent(powerPort);
        var callback = function(data) {
                var res = data;
                if (res == "1") {
                        load_linksPage();
                        displayPage('linksPage')
                } else if (res == "0") {
                        alert("Error linking the sensor!");
                } else if (res == "-1") {
                        alert("This sensor is already linked!");
                }
        }
        loadURL(url, callback);
}

function linkActuator() {
        var actuatorIndex = document.getElementById('linkActuatorActuator').value;
	var actuator = JSON.stringify(linkActuator_actuatorList[actuatorIndex]);
	var plantationIndex = document.getElementById('linkActuatorPlantation').value;
	var plantation = JSON.stringify(linkActuator_plantationList[plantationIndex]);
        var deviceIndex = document.getElementById('linkActuatorDevice').value;
	var device = JSON.stringify(linkActuator_deviceList[deviceIndex]);
	var portIndex = document.getElementById('linkActuatorPort').value;
	var port = JSON.stringify(linkActuator_portList[portIndex]);
	var wateringTime = document.getElementById('linkActuatorWateringRange').value;

	var url;
	if (document.getElementById('linkActuatorBasedonRadio0').checked) {
		var period = document.getElementById('linkActuatorPeriod').value;
		var startDate = new Date(document.getElementById('actuatorStartDate').value);
		var startDateTimestamp = startDate.getTime().toString();

		url = "../linkDevices?id=" + getUniqueId() + "&device=" + encodeURIComponent(device) + "&plantation=" + encodeURIComponent(plantation) + "&senAct=" + encodeURIComponent(actuator) + "&port=" + encodeURIComponent(port) + "&wateringTime=" + encodeURIComponent(wateringTime) + "&period=" + encodeURIComponent(period) + "&startDate=" + encodeURIComponent(startDateTimestamp);
		loadURL(url, function(data) {
			var res = data;
			if (res == "1") {
				load_linksPage();
				displayPage('linksPage')
			} else if (res == "0") {
				alert("Error linking the actuator!");
			} else if (res == "-1") {
				alert("This actuator is already linked!");
			}
		});
	} else if (document.getElementById('linkActuatorBasedonRadio1').checked) {
		var linkedSensorIndex = document.getElementById('linkActuatorSensor').value;
		var linkedSensor = JSON.stringify(linkActuator_linkedSensorList[linkedSensorIndex]);
		var moistureLevel = document.getElementById('linkActuatorMoistureLevel').value;

		url = "../linkDevices?id=" + getUniqueId() + "&device=" + encodeURIComponent(device) + "&plantation=" + encodeURIComponent(plantation) + "&senAct=" + encodeURIComponent(actuator) + "&port=" + encodeURIComponent(port) + "&wateringTime=" + encodeURIComponent(wateringTime) + "&linkedSensor=" + encodeURIComponent(linkedSensor) + "&moistureLevel=" + encodeURIComponent(moistureLevel);
                loadURL(url, function(data) {
                        var res = data;
                        if (res == "1") {
                                load_linksPage();
                                displayPage('linksPage')
                        } else if (res == "0") {
                                alert("Error linking the actuator!");
                        } else if (res == "-1") {
                                alert("This actuator is already linked!");
                        }
                });
	} else {
		alert("You need to select the behavior of the Actuator!");
	}	
}

function delinkDevices(id) {
	var url = "../delinkDevices?id=" + encodeURIComponent(id);
	var callback = function(data) {
		var res = data;
		if (res == "1") {
			load_linksPage();
			displayPage('linksPage')
		} else if (res == "0") {
			alert("Error delinking the devices!");
		} else if (res == "-1") {
			alert("These devices are not linked!");
		}
	}
	loadURL(url, callback);
}

