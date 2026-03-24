/**
 * @description A very simple UI interface, nothing is optimized.
 */

const api = require('../api.js')
const fs = require('fs')
const util = require('util')
// const favicon = require('serve-favicon');

let path = require('path');
const express = require('express')

class appUI {

    // eslint-disable-next-line no-useless-constructor
    constructor(app, router, webPath) {
        console.log("appUI: " + webPath)
        // Get an express router to expose new HTTP endpoints
        this.router = router;
        this.webPath = webPath
        this.app = app
    }

    start() {
        console.log("appUI: " + this.webPath)
        console.log("router: " + util.inspect(this.router))
            
        this.router.use(express.static(path.join(__dirname, './build')));
        // this.router.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
        this.router.use('/static', express.static(path.join(__dirname, './build/static')))
        this.router.use('/images', express.static(path.join(__dirname, './build/images')))
        // this.router.use('/static/js', express.static(path.join(__dirname, './build/static/js')))
        // this.router.use('/static/media', express.static(path.join(__dirname, './build/static/media')))
        // this.router.use('/static/css', express.static(path.join(__dirname, './build/static/css')))

        // ----------------------------------------------------
        // create routes for the UI
        // ----------------------------------------------------
        this.router.get('/', (req, res) => {
            console.log("...appUI: " + req.url)
            const index = fs.readFileSync(__dirname + '/build/index.html', 'utf8');
            res.send(index);
        });

        this.router.get('/api/checks', (req, res) => {
            const files = api.healthChecks()
            const message = JSON.stringify(files)
            res.send(message);
        })

        this.router.get('/api/docs', (req, res) => {
            const markdown = api.apiGetDocumentation()
            const message = JSON.stringify(markdown)
            res.send(message);
        })

        this.router.get('/api/reports', (req, res) => {
            const reports = api.apiGetReports()
            const message = JSON.stringify(reports)
            console.log('reports: ' + util.inspect(message))
            res.send(message);
        })
    }
}
module.exports = appUI
