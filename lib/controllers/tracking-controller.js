'use strict'

const API_URL = require('../../conf/track-bot').API.URL;
const request = require('request');
const dictionary = require('../../dictionary').dictionary;
const countries = require('country-data').countries

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
			console.log(error);
			return callback(dictionary.str_trackingNotFound);
		}
		try {
			console.log('body: ', body);
			var result = JSON.parse(body);
			return callback(processTracking(carrier, result));
		} catch (e) {
			console.log(e);
			return callback(dictionary.str_trackingNotFound);
		}
	});
}

function processTracking(carrier, json) {

	if (carrier === 'dhl_express') {
		var status = json.tracking_status.status ? json.tracking_status.status : '';
	} else {
		var status = json.tracking_status.status_details ? json.tracking_status.status_details : '';
	}

	var date = json.tracking_status.status_date ? json.tracking_status.status_date : '';
	var city = json.tracking_status.location ? json.tracking_status.location.city : '';
	var country = json.tracking_status.location ? json.tracking_status.location.country : '';


	var response = 'Your package status is ' + status;

	if (date) {
		response += ' on ' + toHumanDate(date);
	}

	if (city) {
		response += ' in ' + city;
	}

	if (country) {
		response += ', ' + countries[country]['name'];
	}

	console.log('response is: ', response);
	return response;
}


function toHumanDate(date) {
	var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";

	var d = new Date(date);
	return d.getDate() + ' ' + month[d.getMonth()] + ' ' + d.getFullYear()
}

module.exports = {
	getTracking: getTracking
};