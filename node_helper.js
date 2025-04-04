// const Log = require('logger') // Can't get log.log to work, so using console.log for the time being
const NodeHelper = require('node_helper')
const fs = require('node:fs')
const path = require('node:path')

module.exports = NodeHelper.create({
  start: function () {
    // Log.log('Starting node_helper for: ' + this.name);
    console.log('Starting node_helper for: ' + this.name)
  },

  getDirectoryTree(dirPath) {
    const result = []
    const files = fs.readdirSync(dirPath, { withFileTypes: true })

    files.forEach((file) => {
      const filePath = path.join(dirPath, file.name)
      if (file.name.endsWith('.svg') || file.name.endsWith('.png')) {
        result.push({ name: file.name })
      }
      else if (file.isDirectory()) {
        const children = this.getDirectoryTree(filePath)
        if (children.length > 0) {
          result.push({ name: file.name, children })
        }
      }
    })

    return result
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
      // Log.error('[MMM-MyStandings] Could not load data.', error)
      console.error('[MMM-MyStandings] Could not load data.', error)
    }
  },

  async getOlympicMedals(notification, payload) {
    var olyYear = new Date().getFullYear()
    if ((olyYear % 2) === 1) {
      olyYear = olyYear - 1
    }
    var standings = []
    while (standings.length === 0 && olyYear > 2020) {
      try {
        const response = await fetch(`${payload.url}${olyYear}`)
        // console.log(`${payload.url}${olyYear}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        standings = data['data']['teams']
        if (standings.length === 0) {
          olyYear = olyYear - 2
        }
      }
      catch (error) {
        console.error('[MMM-MyStandings] Could not load data.', error)
      }
    }
    this.sendSocketNotification(`STANDINGS_RESULT-${olyYear} Olympics`, {
      result: standings,
      uniqueID: payload.uniqueID,
    })
  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function (notification, payload) {
    if (notification.includes('Olympics')) {
      this.getOlympicMedals(notification, payload)
    }
    else if (notification.startsWith('STANDINGS_RESULT')) {
      this.getData(notification, payload)
    }
    else if (notification == 'MMM-MYSTANDINGS-GET-LOCAL-LOGOS') {
      this.localLogos = {}
      const fsTree = this.getDirectoryTree('./modules/MMM-MyStandings/logos')
      fsTree.forEach((league) => {
        if (league.children) {
          var logoFiles = []
          league.children.forEach((file) => {
            logoFiles.push(file.name)
          })
          this.localLogos[league.name] = logoFiles
        }
      })

      this.sendSocketNotification('MMM-MYSTANDINGS-LOCAL-LOGO-LIST', { uniqueID: payload.uniqueID, logos: this.localLogos })
    }
  },
})
