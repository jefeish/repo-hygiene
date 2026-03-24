/**
 * @description This class checks if the repository contains blocked files.
 *              The list of blockes files is defined in the provided yaml data.
 * 
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
   * @description Generic function to check if a file exists at a location in 
   *              the repository 
   * @param {*} context
   * @param {*} fileName 
   * @returns status (200, 404 ...)
   */
  async checkContent(context, fileName) {
    context.log.debug("checkContent: >" + fileName + "<")
    let file

    try {
      file = await context.octokit.repos.getContent(
        {
          owner: context.payload.repository.owner.login,
          repo: context.payload.repository.name,
          path: fileName
        }
      );

    } catch (err) {
      context.log.error(err.status)
      context.log.info("File not found: " + fileName)
      return err.status
    }

    return file.status
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

      const result = this.checkForFiles(context, data)

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
