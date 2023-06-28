/**
 * @description Event Handler Class to check for repository hygiene
 * @param
 *  body: data
 */
const { exec } = require('child_process');
const util = require('util')
const Command = require('./common/command.js')
let instance = null

class repositoryHygiene extends Command {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  /**
   * Singleton pattern
   */
  static getInstance() {
    if (!instance) {
      instance = new repositoryHygiene()
    }

    return instance
  }

  /**
   * 
   * @param {*} context 
   * @param {*} data 
   */
  async execute(context, params) {
    context.log('repositoryHygiene.execute()')
    let comment = params.comment
    const pr_sha = context.payload.pull_request.head.sha

    context.log.debug('pr_sha: ' + pr_sha)

    try {
      if (typeof comment == 'undefined') {
        comment = 'Nothing to say here...!'
      }

      const check_run = await context.octokit.checks.create({
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        name: "Repository Hygiene",
        head_sha: pr_sha,
        status: "in_progress"
      })

      console.log('check_run: ' + util.inspect(check_run))
      const CHECK_RUN_ID = check_run.data.id
      context.log.debug('CHECK_RUN_ID: ' + CHECK_RUN_ID)

      // Here we do the actual hygiene work
      let result = null

      // does 'params' contain a list of checks to perform?
      if (typeof params['checks'] !== 'undefined') {
        const checks = params['checks']
        context.log.debug('checks: ' + util.inspect(checks))

        // iterate over the list of checks
        checks.forEach(check => {
          const m = new check()
          context.log.info('Invoking check: ' + check + '(' + context + ',' + check.params + ')')
          m.execute(context, check.params)
        })
          context.log.debug('check name: ' + check.name)
          // switch (check.name) {
          //   case 'repo-size':
          //     context.log.debug('repo-size check')
          //     result = check_repo_size(context, check)
          //     break
          //   case 'number-of-branches':
          //     context.log.debug('number-of-branches check')
          //     result = check_number_of_branches(context, check)
          //     break
          //   case 'number-of-stale-branches':
          //       context.log.debug('number-of-stale-branches check')
          //       result = check_number_of_stale_branches(context, check)
          //       break
          //   case 'file-types':
          //     context.log.debug('file-types check')
          //     result = check_file_types(context, check)
          //     break
          //   case 'large-files':
          //     context.log.debug('large-files check')
          //     result = check_large_files(context, check)
          //     break
          //   case 'number-of-dependabot-alerts':
          //     context.log.debug('number-of-dependabot-alerts check')
          //     result = check_number_of_dependabot_alerts(context, check)
          //     break
          //   default:
          //     context.log.debug('unknown check')
          // }
        })
      }

      const CONCLUSION = 'success'
      const STATUS = 'completed'

      /**
       * @description Update the check run
       * Conclusion can be one of: 
       *    action_required, 
       *    cancelled, 
       *    failure, 
       *    neutral, 
       *    success, 
       *    skipped, 
       *    stale, 
       *    timed_out
       */
      const checkRun = context.octokit.checks.update({
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        check_run_id: CHECK_RUN_ID,
        conclusion: CONCLUSION,
        status: STATUS
      });

      const pullrequestComment = context.octokit.issues.createComment(        {
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        issue_number: context.payload.pull_request.number,
        body: comment
      })

      return pullrequestComment
    } catch (err) {
      context.log.error('repositoryHygiene.execute() failed')
      context.log.error('err: ' + util.inspect(err))
      return Promise.resolve()
    }
  }
} // end class repositoryHygiene


/**
 * @description Clone the repository
 * @param {#} context 
 * @returns 
 */
function cloneRepo(context) {

  const fs = require('fs')
  const path = require('path')
  let repoDir = null

  try{
    const repoName = context.payload.repository.name
    const repoUrl = context.payload.repository.clone_url
    repoDir = path.join(__dirname, '..', '..', repoName)
    context.log.info('repoDir: ' + repoDir)
    const repoDirExists = fs.existsSync(repoDir)

    if (!repoDirExists) {
      exec('git clone '+ repoUrl)
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

/**
 * @description 
 * @param {*} check 
 * @returns 
 */
function check_repo_size(context, check) {
  const repoDir = cloneRepo(context)
  const repoSize = exec('du -sh '+ repoDir)
  context.log.info('check_repo_size(): '+ repoDir)
  context.log.info('repo_size(): '+ util.inspect(repoSize))
  return "repo-size"
}

/**
 * @description
 * @param {*} check 
 * @returns 
 */
function check_number_of_branches(context, check) {
  return "number-of-branches"
}

/**
 * @description
 * @param {*} check 
 * @returns 
 */
function check_file_types(context, check) {
  return "check-file-types"
}

/**
 * @description
 * @param {*} check 
 * @returns 
 */
function check_large_files(context, check) {
  return "large-files"
}

/**
 * @description
 * @param {*} check 
 * @returns 
 */
function check_number_of_dependabot_alerts(context, check) {
  return "number-of-dependabot-alerts"
}

/**
 * @description
 * @param {*} check 
 * @returns 
 */
function check_number_of_stale_branches(context, check) {
  return "number-of-stale-branches"
}

module.exports = repositoryHygiene