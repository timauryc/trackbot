'use strict'

const API_URL = require('../../conf/track-bot').API.URL;
const request = require('request');

function getTracking(trackingData, callback) {
	var carrier = trackingData[0];
	var trackingNo = trackingData[1];

	var options = {
		url: API_URL + carrier + '/' + trackingNo,
		headers: {
			'Authorization': 'ShippoToken 076238eef28040b233a1fb1976207e985a5a5dd4',
			'Content-Type': 'application/json'
		}
	};

	request.get(options, function(error, res, body) {
		if (error) {
			return callback(error);
		}
		try {
			var result = JSON.parse(body);
			return callback(processTracking(carrier, result));
		} catch (e) {
			return callback(null);
		}
	});
}

function processTracking(carrier, json) {
	var status = json.tracking_status.status_details;
	var date = json.tracking_status.status_date;
	var city = json.tracking_status.location.city;
	var country = json.tracking_status.location.country;

	return 'your package status is ' + status + ' on ' + toHumanDate(date) + ' in ' + city + ', ' + country;
}


function toHumanDate(date){
	var d = new Date(date);
	return d.getDate() + ' ' + (d.getMonth()+1) + ' ' + d.getFullYear()
}

module.exports = {
	getTracking: getTracking
};