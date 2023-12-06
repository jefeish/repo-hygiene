/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
const init = require('./init.js')
const ui = require('./ui/appUI.js')

/**
 * This is the main entrypoint to your Probot app 
 * @param {import('probot').Application} app
 */
module.exports = (app, { getRouter }) => {

  app.log('Starting the Repo Hygiene - App!')
  init.registerEventHandlers(app)
  
  webUI = new ui(getRouter('/repo-hygiene'))
  webUI.start()
}
