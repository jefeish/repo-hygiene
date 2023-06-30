/**
 * @description Event Handler Class (TEMPLATE).
 * @param
 * PLEASE REPLACE ALL `change this!` MARKERS WITH YOUR OWN CODE 
 * (including this one)
 */
const util = require('util')
const Command = require('../common/command.js')
let instance = null

class scorecard_markdown extends Command {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    }

    /**
     * Singleton pattern
     */
    static getInstance() {
        if (!instance) {
            instance = new scorecard_markdown()
        }
        return instance
    }

    /**
     * @description Add a Markdown formatted scorecard as a Pull Request comment
     * 
     * @param {*} context 
     * @param {*} data 
     */
    async execute(context, report_summary, params) {
        context.log.info('scorecard_markdown.execute()')
        
        try {
            let score_calculation_details = ''
            const number_of_checks = report_summary.length
            let full_score = 0
            let comment = '## Scorecard\n\n### Hygiene Rule: '+ params['name'] +'\n\n'
            

            Object.keys(report_summary[0]).forEach(header => {
                comment += '|' + header
            })
            comment += '|\n'

            Object.keys(report_summary[0]).forEach(header => {
                comment += '|---'
            })
            comment += '|\n'
            console.log('headers: ' + util.inspect(comment))

            // iterate over the report_summary and create a comment
            Object.keys(report_summary).forEach(item => {
                comment += '|' + report_summary[item].name + '|' + report_summary[item].score + '|' + report_summary[item].status + '|' + report_summary[item].summary + '|\n'
                // get an object from params.checks array that matches the name of the check and extract the `weight` property
                const check_weight = params.checks.find(check => check.name === report_summary[item].name).weight
                full_score += report_summary[item].score * check_weight
                score_calculation_details += report_summary[item].name + ' (score:' + report_summary[item].score + ' * weight:' + check_weight + ') + '
            })

            // replace the last '+' charater of 'score_calculation_details' with the number of checks
            score_calculation_details = score_calculation_details.replace(/ \+ $/," / number_of_checks("+ number_of_checks +")")

            // round up the result
            full_score = Math.abs(full_score / number_of_checks)
            comment += '\n\n' + '### Full Score: ' + full_score + '\n\n'
            comment += '\n\n' + '<details><summary>Score Calcuation</summary><p>\n\n```\nScore = ' + score_calculation_details + '\n```\n\n</p></details>'

            const pullrequestComment = context.octokit.issues.createComment({
                owner: context.payload.repository.owner.login,
                repo: context.payload.repository.name,
                issue_number: context.payload.pull_request.number,
                body: comment
            })
        } catch (err) {
            context.log(err)
            return -1
        }
    }
}

module.exports = scorecard_markdown