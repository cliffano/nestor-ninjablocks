var bag               = require('bagofcli');
var Jenkins           = require('nestor');
var NestorNinjaBlocks = require('./nestorninjablocks');
var querystring       = require('querystring');

function _run(args) {

  var ninjaBlocksOpts = {
    map: args.map ? querystring.parse(args.map, ',', '=') : undefined
  };

  var jenkinsOpts = {
    job     : args.job,
    view    : args.view,
    schedule: args.schedule
  };

  var jenkins = new Jenkins(process.env.JENKINS_URL);
  jenkins.monitor(jenkinsOpts, function (err, result) {
    if (err) {
      console.error(err.message);
      process.exit(1);
    } else {
      var nestorNinjaBlocks = new NestorNinjaBlocks(process.env.NINJABLOCKS_TOKEN, ninjaBlocksOpts);
      nestorNinjaBlocks.notify(result);
    }
  });
}

/**
 * Execute Nestor Ninja Blocks CLI.
 */
function exec() {

  var actions = {
    commands: {
      run: { action: _run }
    }
  };

  bag.command(__dirname, actions);
}

exports.exec = exec;
