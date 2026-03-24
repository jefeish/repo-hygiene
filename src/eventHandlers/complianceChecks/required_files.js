/**
 * @description Event Handler Class (TEMPLATE).
 * @param
 * PLEASE REPLACE ALL `change this!` MARKERS WITH YOUR OWN CODE 
 * (including this one)
 */

const Command = require('../common/command.js')
let instance = null


class required_files extends Command {

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  /**
   * Singleton pattern
   */
  static getInstance() {
    if (!instance) {
      instance = new required_files()
    }

    return instance
  }

  /** 
  * @description This function checks if the repository has the required files
  * @param {*} context
  * @param {*} files 
  */
  async checkForFiles(context, files) {
    context.log.info("checkForFiles")
    let jsonSectionReport = JSON.parse("{}")
    let response
    let compliant
    jsonSectionReport.files = []

    for (let i = 0; i < files.length; i++) {
      let fileObject = JSON.parse("{}")

      // Check if the file exists in the 'root' location
      response = await checkContent(app, context, files[i])

      if (response == 200) {
        compliant = true
      } else {
        // Check if the file exists in the '.github' location
        response = await checkContent(app, context, ".github/" + files[i])

        if (response == 200) {
          compliant = true
        } else {
          compliant = false
        }
      }
      fileObject.name = files[i]
      fileObject.compliant = compliant
      jsonSectionReport.files[i] = fileObject
    }
    context.log.debug("checkForFiles: " + JSON.stringify(jsonSectionReport))
    return jsonSectionReport
  }

  /**
   * @description Main entry point for invocation from client
   * 
   * @param {*} context 
   * @param {*} data 
   */
  async execute(context, data) {

    context.log.info('required_files.execute()')
    try {

      if (typeof data == 'undefined') {
        data = 'NA'
      }

      return {
        name: 'required_files',
        score: 10,
        status: 'success',
        summary: 'All files found',
      }
    } catch (err) {
      context.log(err)
      return -1
    }
  }
}

module.exports = required_files
