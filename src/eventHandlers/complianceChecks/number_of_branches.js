/**
 * @description Event Handler Class (TEMPLATE).
 * @param
 * PLEASE REPLACE ALL `change this!` MARKERS WITH YOUR OWN CODE 
 * (including this one)
 */

const Command = require('../common/command.js')
let instance = null


class number_of_branches extends Command {

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  /**
   * Singleton pattern
   */
  static getInstance() {
    if (!instance) {
      instance = new number_of_branches()
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

    context.log.info('number_of_branches.execute()')
    try {

      if (typeof data == 'undefined') {
        data = 'NA'
      }

      return {
        name: 'number_of_branches',
        score: 8,
        status: 'success',
        summary: 'The number of branches are < 5',
      }
    } catch (err) {
      context.log(err)
      return -1
    }
  }
}

module.exports = number_of_branches
