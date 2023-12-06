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
