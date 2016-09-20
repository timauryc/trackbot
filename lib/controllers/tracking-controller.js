'use strict'

const API_URL = require('../../conf/track-bot').API.URL;
const request = require('request');

function getTracking(trackingData, callback) {
	console.log('carrier: ', trackingData[0]);
	console.log('trackingNo: ', trackingData[1]);

	var options = {
		url: API_URL + trackingData[0] + '/' + trackingData[1],
		headers: {
			'Authorization': 'ShippoToken 076238eef28040b233a1fb1976207e985a5a5dd4',
			'Content-Type': 'application/json'
		}
	};

	request.get(options, function(error, res, body) {
		console.log('WEEEEEEEE: ', body);
		if (error) {
			return callback(error);
		}
		try {
			var res = JSON.parse(body);
			return callback(null, res);
		} catch (e) {
			return callback(null);
		}
	});
}

module.exports = {
	getTracking: getTracking
};