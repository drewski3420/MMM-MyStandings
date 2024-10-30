/* MagicMirror²
 * Module: Standings
 *
 */
var NodeHelper = require('node_helper');
//var request = require('request');
const axios = require("axios");

module.exports = NodeHelper.create({
	start: function () {
		console.log('MMM-MyStandings helper started ...');
	},

	getData: function (notification, payload) {
		var self = this;
		//console.log('requesting:' + payload.url);
		// request({ url: payload.url, method: 'GET' }, function (error, response, body) {
		// 	if (!error && response.statusCode == 200) {
		// 		var result = JSON.parse(body);
		// 		self.sendSocketNotification(notification, {
		// 			result: result,
		// 			uniqueID: payload.uniqueID
		// 		});
		// 	} else {
		// 		console.log("MMM-MyStandings : Could not load data.");
		// 	}
		// });
		axios
			.get(payload.url)
			// .then( function(response) {
			// 	var result = JSON.parse(response.data);
			// 	self.sendSocketNotification(notification, {
			// 		result: result,
			// 		uniqueID: payload.uniqueID
			// 	});
			// })
			.then((response) => {
			    console.log(response.data);
			    console.log(response.status);
			    console.log(response.statusText);
			    console.log(response.headers);
			    console.log(response.config);
			  });
			.catch( function(r_err) {
				console.log( "MMM-MyStandings : Could not load data." );      
			})
	},

	//Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		if (notification.startsWith("STANDINGS_RESULT")) {
			this.getData(notification, payload);
		}
	}
});
