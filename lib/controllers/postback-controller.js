'use strict'

const facebookController = require('./facebook-controller');
const dictionary = require('../../dictionary').dictionary;


function handleEvent(event, sender) {
	var payload = event.postback.payload;
	facebookController.showCustomMessage(sender, dictionary.str_helloWorld);
}


module.exports = {
	handleEvent: handleEvent
};