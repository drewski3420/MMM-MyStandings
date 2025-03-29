/* MagicMirror²
 * Module: Standings
 *
 */
const Log = require('logger')
const NodeHelper = require('node_helper')
const dirTree = require('directory-tree')

module.exports = NodeHelper.create({
  start: function () {
    Log.log('MMM-MyStandings helper started ...')

    this.localLogos = {}
    const fsTree = dirTree('./modules/MMM-MyStandings/logos', {
      extensions: /\.(svg|png)$/,
    })
    fsTree.children.forEach((league) => {
      if (league.children) {
        var logoFiles = []
        league.children.forEach((logo) => {
          logoFiles.push(logo.name)
        })
        this.localLogos[league.name] = logoFiles
      }
    })
  },

  async getData(notification, payload) {
    try {
      const response = await fetch(payload.url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      this.sendSocketNotification(notification, {
        result: data,
        uniqueID: payload.uniqueID,
      })
    }
    catch (error) {
      Log.error('[MMM-MyStandings] Could not load data.', error)
    }
  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function (notification, payload) {
    if (notification.startsWith('STANDINGS_RESULT')) {
      this.getData(notification, payload)
    }
    else if (notification == 'MMM-MYSTANDINGS-GET-LOCAL-LOGOS') {
      this.sendSocketNotification('MMM-MYSTANDINGS-LOCAL-LOGO-LIST', { instanceId: payload.instanceId, index: payload.index, logos: this.localLogos })
    }
  },
})
