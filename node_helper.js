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
		axios
			.get(payload.url)
			.then((response) => {
				self.sendSocketNotification(notification, {
					result: response.data,
					uniqueID: payload.uniqueID
				});
			  })
			.catch( function(r_err) {
				console.log( "MMM-MyStandings : Could not load data." );      
			});
	},

	//Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		if (notification.startsWith("STANDINGS_RESULT")) {
			this.getData(notification, payload);
		}
	}
});
