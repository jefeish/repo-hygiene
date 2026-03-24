/**
 * @description This class provides Repo metrics including an overall health score, 
 *              the repository description, the presence of documentation, 
 *              the detected code of conduct, the detected license, 
 *              and the presence of ISSUE_TEMPLATE, PULL_REQUEST_TEMPLATE, 
 *              README, and CONTRIBUTING files.
 * @param
 */

const Command = require('./common/command.js')
let instance = null


class check_community_profile_metrics extends Command {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    }

    /**
     * Singleton pattern
     */
    static getInstance() {
        if (!instance) {
            instance = new check_community_profile_metrics()
        }

        return instance
    }

    /**
     * @description Main entry point for invocation from client
     * 
     * @param {*} context 
     * @param {*} data 
     */
    execute(context, params) {

        try {

            if (typeof params == 'undefined') {
                params = 'NA'
            }

            const owner = context.payload.repository.owner.login
            const repo = context.payload.repository.name

            result = context.octokit.repos.getCommunityProfileMetrics({
                owner,
                repo,
            });

            return 0
        } catch (err) {
            context.log(err)
            return -1
        }
    }
}

module.exports = check_community_profile_metrics