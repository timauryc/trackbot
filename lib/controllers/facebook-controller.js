'use strict'

const request = require('request');
const pageToken = require('../../conf/track-bot').MESSENGER.PAGE_ACCESS_TOKEN;
const dictionary = require('../../dictionary').dictionary;
const async = require('async');

function showCustomMessage(user, message) {
	let messageData = {
		text: message
	}
	makeRequest(user, messageData, (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log('request ok');
		}
	});
}

function makeRequest(user, messageData, callback) {
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {
			access_token: pageToken
		},
		method: 'POST',
		json: {
			recipient: {
				id: user
			},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			callback('Error sending message: ', error);
		} else if (response.body.error) {
			callback('Body Error: ', response.body.error);
		} else {
			callback(null);
		}
	});
}

module.exports = {
	showCustomMessage: showCustomMessage
};