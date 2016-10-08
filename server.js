var express = require("express");
var bodyParser = require("body-parser");
var mongoskin = require("mongoskin");

var app = express();
var hostname = "0.0.0.0";
var port = 80;

var db = mongoskin.db('mongodb://verdin:nidrev@localhost:27017/verdin');

app.use(express.static('./public'));
app.use(bodyParser.json());
/* MAYBE USE THIS
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));
*/

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

app.get('/getSpecies', function(req, res) {
        db.collection('species').find().toArray(function(err, result) {
                if (result) {
                        res.send(result);
                } else {
                        res.send('0');
                }
        });
});

app.get('/addPlantation', function(req, res) {
        db.collection('plantations').findOne({name: req.query.name}, function(err, result) {
                if (result) {
                        res.send('-1');
                } else {
			var id  = decodeURIComponent(req.query.id);
			var name = decodeURIComponent(req.query.name);
			var species = JSON.parse(decodeURIComponent(req.query.species));
                    
			db.collection('plantations').insert({id: id, name: name, species: species}, function(err, result) {
                                if (err) {
                                        res.send('0');
                                } else {
                                        res.send('1');
                                }
                        });
                }
        });
});

app.get('/deletePlantation', function(req, res) {
        db.collection('plantations').findOne({id: req.query.id}, function(err, result) {
                if (result) {
                        db.collection('plantations').remove({id: req.query.id}, function(err, result) {
                                if (err) {
                                        res.send("0");
                                } else {
                                        res.send("1");
                                }
                        });
                } else {
                        res.send('-1');
                }
        });
});

app.get('/getPlantations', function(req, res) {
        db.collection('plantations').find().toArray(function(err, result) {
                if (result) {
                        res.send(result);
                } else {
                        res.send('0');
                }
        });
});

app.get('/addDevice', function(req, res) {
	db.collection('devices').findOne({ $or: [ {macAddress: req.query.macAddress}, {name: req.query.name} ] }, function(err, result) {
        	if (result) {
			res.send('-1');
		} else {
			db.collection('devices').insert(req.query, function(err, result) {
				if (err) {
					res.send('0');
				} else {
					res.send('1');
				}               
			});
		}
	});
});

app.get('/deleteDevice', function(req, res) {
	db.collection('devices').findOne({id: req.query.id}, function(err, result) {
                if (result) {
                        db.collection('devices').remove({id: req.query.id}, function(err, result) {
				if (err) {
					res.send("0");
				} else {
					res.send("1");
				}
			});
                } else {
			res.send('-1');	
		}
	});
});

app.get('/getDevices', function(req, res) {
	db.collection('devices').find().toArray(function(err, result) {
		if (result) {
			res.send(result);
		} else {
                        res.send("0");
                }       
        });
});

/*
app.get('/getSenAct', function(req, res) {
        db.collection('senAct').find().toArray(function(err, result) {
		if (result) {
                        res.send(result);
                } else {
                        res.send("0");
                }
        });
});
*/

app.get('/getSensors', function(req, res) {
        db.collection('senAct').find({io: "i"}).toArray(function(err, result) {
                if (result) {
                        res.send(result);
                } else {
                        res.send("0");
                }
        });
});

app.get('/getActuators', function(req, res) {
        db.collection('senAct').find({io: "o"}).toArray(function(err, result) {
                if (result) {
                        res.send(result);
                } else {
                        res.send("0");
                }
        });
});

app.get('/getPorts', function(req, res) {
        db.collection('ports').find().toArray(function(err, result) {
		if (result) {
                        res.send(result);
                } else {
                        res.send("0");
                }
        });
});

app.get('/getAvailablePorts', function(req, res) {
	var deviceId = req.query.deviceId;
	var ad = req.query.ad;
       
	db.collection('ports').find({ad: ad}).toArray(function(err, result) {
		var allPorts = result;
                if (allPorts) {
			db.collection('linkedDevices').find({"device.id": deviceId}).toArray(function(err, result) {
				var linkedPorts = result;
				if (linkedPorts) {
					if (linkedPorts.length > 0) {
						var availablePorts = [];						
						for (var i=0 ; i<allPorts.length ; i++) {
							var alreadyLinked = false;
							for (var j=0 ; j<linkedPorts.length ; j++) {
								if (linkedPorts[j].hasOwnProperty("readPort")) {
									if (linkedPorts[j].readPort.value == allPorts[i].value) {
										alreadyLinked = true;
									}
								}
								if (linkedPorts[j].hasOwnProperty("powerPort")) {
									if (linkedPorts[j].powerPort.value == allPorts[i].value) {
                                                                                alreadyLinked = true;
                                                                        }
                                                                }
								if (linkedPorts[j].hasOwnProperty("port")) {
									if (linkedPorts[j].port.value == allPorts[i].value) {
                                                                                alreadyLinked = true;
                                                                        }
                                                                }
                                                	}
							if (!alreadyLinked) {
								availablePorts.push(allPorts[i]);
							}
						}
						res.send(availablePorts);
					} else {
						res.send(allPorts);
					}
				} else {
					res.send("0");
				}
			});
			
                } else {
                        res.send("0");
                }
        });
});

app.get('/linkDevices', function(req, res) {

	var id  = decodeURIComponent(req.query.id);
	var senAct = JSON.parse(decodeURIComponent(req.query.senAct));
	var plantation = JSON.parse(decodeURIComponent(req.query.plantation));
	var device = JSON.parse(decodeURIComponent(req.query.device));

	if (senAct.io == "i") {
		var readPort = JSON.parse(decodeURIComponent(req.query.readPort));
		var powerPort = JSON.parse(decodeURIComponent(req.query.powerPort));

		db.collection('linkedDevices').findOne(req.query, function(err, result) {
                        if (result) {
                                res.send('-1');
                        } else {
                                db.collection('linkedDevices').insert({id: id, senAct: senAct, plantation: plantation, device: device, readPort: readPort, powerPort: powerPort}, function(err, result) {
                                        if (err) {
                                                res.send('0');
                                        } else {
                                                res.send('1');
                                        }
                                });
                        }
                });
	} else if (senAct.io == "o") {
		var port = JSON.parse(decodeURIComponent(req.query.port));
		var wateringTime = decodeURIComponent(req.query.wateringTime);

		if (req.query.hasOwnProperty("period")) {
			var period = decodeURIComponent(req.query.period);

			db.collection('linkedDevices').findOne(req.query, function(err, result) {
				if (result) {
					res.send('-1');
				} else {
					db.collection('linkedDevices').insert({id: id, senAct: senAct, plantation: plantation, device: device, port: port, wateringTime: wateringTime, period: period}, function(err, result) {
						if (err) {
							res.send('0');
						} else {
							res.send('1');
						}
					});
				}
			});
		} else if (req.query.hasOwnProperty("linkedSensor")) {
			var linkedSensor = JSON.parse(decodeURIComponent(req.query.linkedSensor));
			var moistureLevel = decodeURIComponent(req.query.moistureLevel)

			db.collection('linkedDevices').findOne(req.query, function(err, result) {
                                if (result) {
                                        res.send('-1');
                                } else {
                                        db.collection('linkedDevices').insert({id: id, senAct: senAct, plantation: plantation, device: device, port: port, wateringTime: wateringTime, linkedSensor: linkedSensor, moistureLevel: moistureLevel}, function(err, result) {
                                                if (err) {
                                                        res.send('0');
                                                } else {
                                                        res.send('1');
                                                }
                                        });
                                }
                        });
		}
	}
});

app.get('/delinkDevices', function(req, res) {
	db.collection('linkedDevices').findOne(req.query, function(err, result) {
                if (result) {
                        db.collection('linkedDevices').remove(req.query, function(err, result) {
				if (err) {
					res.send('0');
				} else {
					res.send('1');
				}
			});
                } else {
			res.send('-1');	
		}
	});
});

app.get('/getLinkedDevices', function(req, res) {
        db.collection('linkedDevices').find().sort({"device.name": 1, "senAct.name": 1}).toArray(function(err, result) {
                if (result) {
                        res.send(result);
                } else {
			res.send('0');
		}
        });
});

app.get('/getLinkedSensors', function(req, res) {
	db.collection('linkedDevices').find({"senAct.io": "i"}).sort({"device.name": 1, "senAct.name": 1, "readPort.name": 1}).toArray(function(err, result) {
		if (result) {
			res.send(result);
		} else {
			res.send('0');
		}
	}); 
});

app.get('/getLinkedSensorsOfPlantation', function(req, res) {
	var plantationId = req.query.plantationId;
	var sensorId = req.query.sensorId;

	db.collection('linkedDevices').find({"plantation.id": plantationId, "senAct.id": sensorId}).sort({"device.name": 1, "senAct.name": 1, "readPort.name": 1}).toArray(function(err, result) {
                if (result) {
                        res.send(result);
                } else {
                        res.send('0');
                }
        });
});

app.get('/getLinkedActuators', function(req, res) {
	db.collection('linkedDevices').find({"senAct.io": "o"}).sort({"device.name": 1, "senAct.name": 1, "readPort.name": 1}).toArray(function(err, result) {
                if (result) {
                        res.send(result);
                } else {
                        res.send('0');
                }
        });
});

app.get('/getLinkedActuatorsActions', function(req, res) {
        db.collection('linkedDevices').find({"senAct.io": "o"}).sort({"device.name": 1, "senAct.name": 1, "readPort.name": 1}).toArray(function(err, result) {
                if (result) {
			var linkedDevices = result;
			var linkedActuatorsActions = [];

			db.collection('measurements').aggregate({$sort: {date: 1}}, {$group: {_id: "$linkedSensor.id", value: {$last: "$value"}}}, function(err, result) {
				if (result) {
					var lastMeasurements = result;
					for (var i=0 ; i<linkedDevices.length ; i++) {
						if (linkedDevices[i].hasOwnProperty('linkedSensor')) {
							for (var j=0 ; j<lastMeasurements.length ; j++) {
								if (linkedDevices[i].linkedSensor.id == lastMeasurements[j]._id) {

									//if actuator is a water pump
									if (linkedDevices[i].senAct.id == "2") {
										if (linkedDevices[i].moistureLevel > lastMeasurements[j].value) {
											var linkedActuatorAction = {
												linkedActuator: linkedDevices[i],
												value: linkedDevices[i].wateringTime*1000
											};

											linkedActuatorsActions.push(linkedActuatorAction);
										}
									}

									break;
								}
							}
						} else if (linkedDevices[i].hasOwnProperty('period')) {
							//FAZER BASEADO NAS ULTIMAS ACOES
						}

					}
					res.send(linkedActuatorsActions);
				} else {
					res.send('0');
				}
			});
                } else {
                        res.send('0');
                }
        });
});

app.get('/addMeasurement', function(req, res) {
	var linkedSensor = JSON.parse(decodeURIComponent(req.query.linkedSensor));
	var value = parseInt(req.query.value);
	var date = parseInt(req.query.date);

        db.collection('measurements').insert({linkedSensor: linkedSensor, value: value, date: date}, function(err, result) {
                if (err) {
                        res.send('0');
                } else {
                        res.send('1');
                }
        });
});

//POST addMeasurement for JSON
app.post('/addMeasurement', function(req, res) {

	var measurementObj = req.body;
	measurementObj.value = parseFloat(measurementObj.value);
	if (isNaN(measurementObj.value)) {
		res.send('0');
	} else {
		measurementObj.date = Date.now();
		db.collection('measurements').insert(measurementObj, function(err, result) {
			if (err) {
				res.send('0');
			} else {
				res.send('1');
			}
		});
	}
});

app.get('/getMeasurements', function(req, res) {
        db.collection('measurements').find().sort({date: 1}).toArray(function(err, result) {
                if (result) {
                        res.send(result);
                } else {
                        res.send('0');
                }
        });
});

app.get('/getMeasurementsByPlantation', function(req, res) {
	var start = parseInt(req.query.timestampStart);
	var end = parseInt(req.query.timestampEnd);

	db.collection('measurements').aggregate({$match: {date: {$gt: start, $lt: end}}}, {$sort: {"date": 1}}, {$group: {_id: {id: "$linkedSensor.id", plantation: "$linkedSensor.plantation.name", sensor: "$linkedSensor.senAct.name", port: "$linkedSensor.readPort.name"}, value: {$push: "$value"}, date: {$push: "$date"}}}, function(err, result) {
                if (result) {
                        res.send(result);
                } else {
                        res.send('0');
                }
        });
});

console.log("Verdin Server is listening at http://" + hostname + ":" + port);

console.log("\nDate: " + Date.now());

app.listen(port, hostname);
