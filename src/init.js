/**
 * This code maps the 'eventHandler' classes 
 * 
 * 
 */

const fs = require('fs')
const yaml = require('js-yaml')
const path_module = require('path');

/**
 * @description This function reads the eventHandlers.yml file and registers the event handlers
 *              with the app. EventHandlers are classes that execute a specific action when a
 *              GitHub WebHook event is triggered.
 *              The eventHandlers.yml file is a map of GitHub WebHook events
 *              to 'eventHandler' classes. 
 * 
 * | @param app
 */
exports.registerEventHandlers = app => {
  app.log('registerEventHandlers')

  try {
    // read the eventHandlers.yml file
    const fileContents = fs.readFileSync('./src/eventHandlers.yml', 'utf8')
    const events = yaml.safeLoad(fileContents)
    let handlers = []
    let eventRegistry = {}

    // iterate through the eventHandlers.yml file and register the event handlers.
    // For each WebHook event, map the event to an 'eventHandler' class
    Object.keys(events).forEach(event => {
      events[event].forEach(handler => {
        // instantiate the 'eventHandler' class
        const cmd = require(process.cwd() + '/src/eventHandlers/' + handler + '.js')
        const command = cmd.getInstance()
        // create a list of handler names for logging
        handlers.push(handler);
        // register the WebHook event and map it to an 'eventHandler' class
        app.on(event, async (context, data) => command.execute(context, data))
      })

      // create a map of event names to handler names
      if (handlers.length) {
        eventRegistry[event] = handlers
        handlers = []
      }
    })

    // write the event registry to the log
    if (eventRegistry) {
      Object.keys(eventRegistry).forEach(event => {
        app.log.debug( "Registered "+ event +', '+ JSON.stringify(eventRegistry[`${event}`])
      )})
    }
  } catch (handler) {
    app.log.error(handler)
  }
}
