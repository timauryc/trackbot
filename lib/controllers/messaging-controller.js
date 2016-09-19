'use strict'

const facebookController = require('./facebook-controller');
const dictionary = require('../../dictionary').dictionary;

function handleEvent(event, sender) {
	let text = event.message.text;
	facebookController.showCustomMessage(sender, dictionary.str_options);
}

module.exports = {
	handleEvent: handleEvent
};