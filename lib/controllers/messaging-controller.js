'use strict'

const facebookController = require('./facebook-controller');
const trackingController = require('./tracking-controller');
const dictionary = require('../../dictionary').dictionary;

function handleEvent(event, sender) {
	let text = event.message.text;

	if (event.message.quick_reply && event.message.quick_reply.payload) {
		var payload = event.message.quick_reply.payload;
		waitingForTracking = true;
		var carrier = payload.split('-')[1];
		trackingData.push(carrier);
		facebookController.showCustomMessage(sender, dictionary.str_askTrackingNumber);
	} else if (waitingForTracking) {
		waitingForTracking = false;
		trackingData.push(text);
		trackingController.getTracking(trackingData, function(result) {
			facebookController.showCustomMessage(sender, result);
		});
	} else {
		resetBotStatus();
		facebookController.whatYouWannaDo(sender);
	}
}

module.exports = {
	handleEvent: handleEvent
};