/**
 * @description Event Handler Class (TEMPLATE).
 * @param
 * PLEASE REPLACE ALL `change this!` MARKERS WITH YOUR OWN CODE 
 * (including this one)
 */

const Command = require('../common/command.js')
let instance = null


class number_of_open_pr extends Command {

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  /**
   * Singleton pattern
   */
  static getInstance() {
    if (!instance) {
      instance = new number_of_open_pr()

    }

    return instance
  }

  /**
   * @description Main entry point for invocation from client
   * 
   * @param {*} context 
   * @param {*} data 
   */
  execute(context, data) {

    context.log.info('number_of_open_pr.execute()')
    try {

      if (typeof data == 'undefined') {
        data = 'NA'
      }


      return {
        name: 'number_of_open_pr',
        score: 2,
        status: 'failure',
        summary: 'The number of open PRs exceeds the limit of 20',
      }
    } catch (err) {
      context.log(err)
      return -1
    }
  }
}

module.exports = number_of_open_pr
