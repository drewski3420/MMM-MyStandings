/* MagicMirror²
 * Module: Standings
 *
 */
var NodeHelper = require('node_helper');
const axios = require("axios");
const dirTree = require("directory-tree");

module.exports = NodeHelper.create({
	start: function () {
		console.log('MMM-MyStandings helper started ...');
		
		this.localLogos = {};
		const fsTree = dirTree("./modules/MMM-MyStandings/logos", {
			extensions: /\.(svg|png)$/
		});
		fsTree.children.forEach( league => {
			if (league.children) {
				var logoFiles = [];
				league.children.forEach( logo => {
					logoFiles.push(logo.name);
				});
				this.localLogos[league.name] = logoFiles;
			}
		});

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
		} else if (notification == "MMM-MYSTANDINGS-GET-LOCAL-LOGOS") {
			this.sendSocketNotification("MMM-MYSTANDINGS-LOCAL-LOGO-LIST", {instanceId: payload.instanceId, index: payload.index, logos: this.localLogos});
	}
	}
});
