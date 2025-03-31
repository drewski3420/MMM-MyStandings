/* MagicMirror²
 * Module: Standings
 *
 */
var NodeHelper = require('node_helper');
const dirTree = require("directory-tree");

module.exports = NodeHelper.create({
	start: function () {
		console.log('Starting node_helper for module [MMM-MyStandings]');
		
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

	async getData (notification, payload) {
		var self = this;
		const url = payload.url;
		const response = await fetch(url);
		const body = await response.json();
		self.sendSocketNotification(notification, {
			result: body,
			uniqueID: payload.uniqueID
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
