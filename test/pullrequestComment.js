/**
 * @description Event Handler Class to create an Issue comment in an Issue that triggered the event
 * @param
 *  comment: data
 */

const util = require('util')
const Command = require('./common/command.js')
let instance = null

class pullrequestComment extends Command {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  /**
   * Singleton pattern
   */
  static getInstance() {
    if (!instance) {
      instance = new pullrequestComment()
    }

    return instance
  }

  /**
   * 
   * @param {*} context 
   * @param {*} data 
   */
  execute(context, params) {
    context.log('pullrequestComment.execute()')
    let comment = params.comment

    try {
      if (typeof comment == 'undefined') {
        comment = 'Nothing to say...!'
      }

      const pullrequestComment = context.octokit.issues.createComment(        {
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        issue_number: context.payload.pull_request.number,
        body: comment
      })

      return pullrequestComment
    } catch (err) {
      context.log.error('pullrequestComment.execute() failed')
      context.log.error('err: ' + util.inspect(err))
      return Promise.resolve()
    }
  }
}

module.exports = pullrequestComment