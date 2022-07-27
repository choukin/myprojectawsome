#!/usr/bin/env node
const argv = require('argv')
const echo = require('../lib/index')
const args = argv.run()
console.log(echo(args.targets.join(' ')));