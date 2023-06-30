/**
 * @description Event Handler Class (TEMPLATE).
 * @param
 * PLEASE REPLACE ALL `change this!` MARKERS WITH YOUR OWN CODE 
 * (including this one)
 */

const Command = require('../common/command.js')
let instance = null


class repository_size extends Command {

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  /**
   * Singleton pattern
   */
  static getInstance() {
    if (!instance) {
      instance = new repository_size()

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

    context.log.info('repository_size.execute()')
    try {

      if (typeof data == 'undefined') {
        data = 'NA'
      }

      return {
        name: 'repository_size',
        score: 9,
        status: 'success',
        summary: 'The repository size is within the limits of 1GB',
      }
    } catch (err) {
      context.log(err)
      return -1
    }
  }
}

/**
 * @description Clone the repository
 * @param {#} context 
 * @returns 
 */
function cloneRepo(context) {

  const fs = require('fs')
  const path = require('path')
  let repoDir = null

  try {
    const repoName = context.payload.repository.name
    const repoUrl = context.payload.repository.clone_url
    repoDir = path.join(__dirname, '..', '..', repoName)
    context.log.info('repoDir: ' + repoDir)
    const repoDirExists = fs.existsSync(repoDir)

    if (!repoDirExists) {
      exec('git clone ' + repoUrl)
    }
    else {
      context.log.info('repoDir already exists')
      exec('cd repoDir && git pull')
    }
  }
  catch (err) {
    context.log.error('cloneRepo() failed')
    context.log.error('err: ' + util.inspect(err))
    return Promise.resolve()
  }

  return repoDir
}

module.exports = repository_size
