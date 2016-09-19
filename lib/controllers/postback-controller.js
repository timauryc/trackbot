'use strict'

const facebookController = require('./facebook-controller');
const dictionary = require('../../dictionary').dictionary;


function handleEvent(event, sender) {
	var payload = event.postback.payload;

	if (payload === 'getTracking') {
		facebookController.showCarrierMenu(sender);
	} else if (payload === 'doNothing') {
		facebookController.showCustomMessage(sender, dictionary.str_doNothingResponse);
	} else if (payload.match(/^carrier*/)) {
		var carrier = payload.split('_')[1];
		trakkingData.push(carrier);
		waitingforTracking = true;
		facebookController.showCustomMessage(sender, dictionary.str_askTrackingNumber);

	}


}


module.exports = {
	handleEvent: handleEvent
};