/**
 * @description Event Handler Class to check for repository hygiene
 * @param
 *  body: data
 */
const util = require('util')
const Command = require('./common/command.js');
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

    const pr_sha = context.payload.pull_request.head.sha
    const reports = params['reports']

    try {
      // Here we do the actual hygiene work
      let all_check_results = []

      // does 'params' contain a list of checks to perform?
      if (typeof params['checks'] !== 'undefined') {
        const checks = params['checks']
        context.log.debug('checks: ' + util.inspect(checks))

        // iterate over the list of checks and invoke each one
        await checks.forEach(check => {
          context.log.debug('check name: ' + check.name)
          const displayName = check.name.toUpperCase().replace(/_/g, ' ')

          const check_run = context.octokit.checks.create({
            owner: context.payload.repository.owner.login,
            repo: context.payload.repository.name,
            name: '[Repo Hygiene] ' + displayName + ' ('+ params['name'] +')',
            head_sha: pr_sha,
            status: "in_progress"
          }).then(async (check_run) => {

            context.log.debug('check_run: ' + util.inspect(check_run))
            const CHECK_RUN_ID = check_run.data.id
            context.log.debug('CHECK_RUN_ID: ' + CHECK_RUN_ID)

            const cmd = require(process.cwd() + '/src/eventHandlers/complianceChecks/' + check.name + '.js')
            const command = cmd.getInstance()
            context.log.debug('Invoking check: ' + displayName + ' - ' + util.inspect(check))
            const check_result = await command.execute(context, check.params)

            // add the check result to the results array
            all_check_results.push(check_result)
            
            // if the number of keys equal the number of checks, then we're done
            // -----------------------------------------------------------------
            if ((all_check_results.length == checks.length) && (params['reports'] !== 'undefined')) {
              // run the reports
              reports.forEach(async report => {
                const cmd = require(process.cwd() + '/src/eventHandlers/complianceReports/' + report + '.js')
                const command = cmd.getInstance()
                context.log.debug('Invoking report: ' + report)
                const report_result = await command.execute(context, all_check_results, params)
              })
            }
            else {
              context.log.info('no report')
            }
            // -----------------------------------------------------------------

            context.log.debug("check_result: " + util.inspect(check_result))
            let CONCLUSION = 'failure'

            switch (check_result.status) {
              case 'failure': {
                context.log.debug('[' + check_result.name + '] check failed')
                CONCLUSION = 'failure'
                break
              }
              case 'success': {
                context.log.debug('[' + check_result.name + '] check succeeded')
                CONCLUSION = 'success'
                break
              }
              case 'timed_out': {
                context.log.debug('[' + check_result.name + '] check timed out')
                CONCLUSION = 'timed_out'
                break
              }
              default: {
                context.log.debug(' DEFAULT [' + check_result.name + '] check failed')
                CONCLUSION = 'failure'
                break
              }
            }

            const STATUS = 'completed'

            /**
             * @description Update the check run
             * Conclusion can be one of: 
             *    action_required, cancelled, failure, neutral, success, skipped, stale, timed_out
             */
            const checkRun = context.octokit.checks.update({
              owner: context.payload.repository.owner.login,
              repo: context.payload.repository.name,
              check_run_id: CHECK_RUN_ID,
              conclusion: CONCLUSION,
              status: STATUS,
              output: {
                title: displayName,
                summary: check_result.summary
              }
            })
          })
        })
      }
      return 0
    } catch (err) {
      context.log.error('repositoryHygiene.execute() failed')
      context.log.error('err: ' + util.inspect(err))
      return Promise.resolve()
    }
  }
} // end class repositoryHygiene

module.exports = repositoryHygiene