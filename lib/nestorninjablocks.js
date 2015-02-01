var _           = require('lodash');
var ninjaBlocks = require('ninja-blocks');

/**
 * class NestorNinjaBlocks
 *
 * @param {String} token: Ninja Blocks API Access Token https://a.ninja.is/hacking
 * @param {String} opts: optional
 * - map: status-hexcolour map, defaults to { OK: '00FF00', FAIL: 'FF0000', WARN: 'FFFF00' }
 */
function NestorNinjaBlocks(token, opts) {
  this.token = token;
  this.opts  = opts;

  const MAP = {
    ok  : '00FF00',
    fail: 'FF0000',
    warn: 'FFFF00'
  };
  this.opts.map = this.opts.map || MAP;
}

/**
 * Notify build status as a colour on Ninja Blocks device LED.
 *
 * @param {String} status: build status
 */
NestorNinjaBlocks.prototype.notify = function (status) {
  const UNKNOWN = 'FFFFFF';

  var colour = this.opts.map[status] || UNKNOWN;

  var app = ninjaBlocks.app({ user_access_token: this.token });
  app.devices({ device_type: 'rgbled', default_name: 'Nina\'s Eyes' }, function(err, devices) {
    if (err) {
      // ninjablocks API passes the payload directly as error instead of a proper Error object
      // e.g. { statusCode: 200, error: 'Unauthorised' }
      console.error(err.error);
    } else if (!_.isEmpty(devices)) {
      Object.keys(devices).forEach(function (key) {
        console.log('Setting rgbled device colour to %s for status %s', colour, status);
        app.device(key).actuate(colour);
      });
    } else {
      console.warn('No rgbled device found');
    }
  });
};

module.exports = NestorNinjaBlocks;
