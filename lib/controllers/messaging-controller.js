'use strict'

const facebookController = require('./facebook-controller');
const trackingController = require('./tracking-controller');
const dictionary = require('../../dictionary').dictionary;

function handleEvent(event, sender) {
	let text = event.message.text;

	if (waitingforTrakking) {
		trackingData.push(text);
		trackingController.getTracking(trackingData, function(result) {
			facebookController.showCustomMessage(sender, result);
		});
	} else {
		//facebookController.startConversation(sender, dictionary.str_helloWorld);
		facebookController.whatYouWannaDo(sender);
	}



}

module.exports = {
	handleEvent: handleEvent
};