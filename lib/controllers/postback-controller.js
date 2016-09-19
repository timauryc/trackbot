'use strict'

const facebookController = require('./facebook-controller');
const dictionary = require('../../dictionary').dictionary;


function handleEvent(event, sender) {
	var payload = event.postback.payload;
	facebookController.showOptions(sender, dictionary.str_options);
}


module.exports = {
	handleEvent: handleEvent
};