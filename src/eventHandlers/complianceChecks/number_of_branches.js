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

      // List all branches of a repository
      result = await context.octokit.request('GET /repos/:owner/:repo/branches', {
        owner: 'owner_username',
        repo: 'repository_name'
      })
        .then(response => {
          const openBranches = response.data.filter(branch => branch.protected === false);
          console.log(openBranches.map(branch => branch.name));
        })
        .catch(error => {
          console.error('Error:', error);
        });

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
