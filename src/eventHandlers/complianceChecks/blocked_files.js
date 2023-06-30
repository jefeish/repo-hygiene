/**
 * @description Event Handler Class (TEMPLATE).
 * @param
 * PLEASE REPLACE ALL `change this!` MARKERS WITH YOUR OWN CODE 
 * (including this one)
 */

const Command = require('../common/command.js')
let instance = null


class blocked_files extends Command {

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  /**
   * Singleton pattern
   */
  static getInstance() {
    if (!instance) {
      instance = new blocked_files()
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

    context.log.info('blocked_files.execute()')
    try {

      if (typeof data == 'undefined') {
        data = 'NA'
      }

      return {
        name: 'blocked_files',
        score: 8,
        status: 'success',
        summary: 'No blocked files found',
      }
    } catch (err) {
      context.log(err)
      return -1
    }
  }
}

module.exports = blocked_files
