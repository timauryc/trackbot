'use strict'

function getTracking(trackingData, callback){
	console.log('carrier: ', trackingData[0]);
	console.log('trackingNo: ', trackingData[1]);
	return callback('result');
}

module.exports = {
	getTracking: getTracking
};