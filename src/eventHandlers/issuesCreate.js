/**
 * @description Event Handler Class to create an Issue in a Repo that triggered the event
 * @param
 *  title: string
 *  body: data
 */

const util = require('util')
const Command = require('./common/command.js')
let instance = null

class issuesCreate extends Command {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  /**
   * Singleton pattern
   */
  static getInstance() {
    if (!instance) {
      instance = new issuesCreateComment()
    }

    return instance
  }

  /**
   * 
   * @param {*} context 
   * @param {*} data 
   */
  execute(context, params) {
    context.log('createIssue.execute()')
    let title = params.title
    let body = params.body

    try {
      if (typeof body == 'undefined') {
        body = 'Nothing to say...!'
      }

      const issue = context.octokit.issues.create(        {
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        title: title,
        body: body
      })

      return issue
    } catch (err) {
      context.log.error('createIssue.execute() failed')
      context.log.error('err: ' + util.inspect(err))
      return Promise.resolve()
    }
  }
}

module.exports = issuesCreate