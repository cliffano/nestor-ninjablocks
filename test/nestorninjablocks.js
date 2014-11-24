var buster            = require('buster-node');
var NestorNinjaBlocks = require('../lib/nestorninjablocks');
var ninjaBlocks       = require('ninja-blocks');
var referee           = require('referee');
var assert            = referee.assert;

buster.testCase('nestorninjablocks - nestorninjablocks', {
  setUp: function () {
    this.mock({});
  },
  'should set opts to default when there is no customisation': function (done) {
    var nestor = new NestorNinjaBlocks('sometoken', {});
    assert.equals(nestor.token, 'sometoken');
    assert.equals(nestor.opts.map.OK, '00FF00');
    assert.equals(nestor.opts.map.FAIL, 'FF0000');
    assert.equals(nestor.opts.map.WARN, 'FFFF00');
    done();
  },
  'should set map opt when provided': function (done) {
    var nestor = new NestorNinjaBlocks('sometoken', { map: { OK: 'FFFF00', FAIL: 'FF00FF', WARN: '00FF00' }});
    assert.equals(nestor.token, 'sometoken');
    assert.equals(nestor.opts.map.OK, 'FFFF00');
    assert.equals(nestor.opts.map.FAIL, 'FF00FF');
    assert.equals(nestor.opts.map.WARN, '00FF00');
    done();
  }
});

buster.testCase('nestorninjablocks - notify', {
  setUp: function () {
    this.mockConsole = this.mock(console);
    this.mockNinjaBlocks = this.mock(ninjaBlocks);
    this.ninja = new NestorNinjaBlocks('sometoken', {});
  },
  'should log warning message when there is no rgbled device found': function () {
    this.mockConsole.expects('warn').once().withExactArgs('No rgbled device found');
    var mockApp = {
      devices: function (opts, cb) {
        assert.equals(opts.device_type, 'rgbled');
        assert.equals(opts.default_name, 'Nina\'s Eyes');
        cb(null, {});
      }
    };
    this.mockNinjaBlocks.expects('app').once().withExactArgs({ user_access_token: 'sometoken' }).returns(mockApp);
    this.ninja.notify('OK');
  },
  'should log error message when an error occurs while getting a device': function () {
    this.mockConsole.expects('error').once().withExactArgs('some error');
    var mockApp = {
      devices: function (opts, cb) {
        assert.equals(opts.device_type, 'rgbled');
        assert.equals(opts.default_name, 'Nina\'s Eyes');
        cb(new Error('some error'));
      }
    };
    this.mockNinjaBlocks.expects('app').once().withExactArgs({ user_access_token: 'sometoken' }).returns(mockApp);
    this.ninja.notify('OK');
  },
  'should actuate colour on ninjablocks device based on notification status': function (done) {
    this.mockConsole.expects('log').once().withExactArgs('Setting rgbled device colour to %s for status %s', '00FF00', 'OK');
    var mockApp = {
      devices: function (opts, cb) {
        assert.equals(opts.device_type, 'rgbled');
        assert.equals(opts.default_name, 'Nina\'s Eyes');
        cb(null, { guid1: {} });
      },
      device: function (key) {
        assert.equals(key, 'guid1');
        return {
          actuate: function (colour) {
            assert.equals(colour, '00FF00');
            done();
          }
        };
      }
    };
    this.mockNinjaBlocks.expects('app').once().withExactArgs({ user_access_token: 'sometoken' }).returns(mockApp);
    this.ninja.notify('OK');
  },
  'should actuate unknown colour on ninjablocks device when notification status is unsupported': function (done) {
    this.mockConsole.expects('log').once().withExactArgs('Setting rgbled device colour to %s for status %s', 'FFFFFF', 'SOMEUNKNOWNSTATUS');
    var mockApp = {
      devices: function (opts, cb) {
        assert.equals(opts.device_type, 'rgbled');
        assert.equals(opts.default_name, 'Nina\'s Eyes');
        cb(null, { guid1: {} });
      },
      device: function (key) {
        assert.equals(key, 'guid1');
        return {
          actuate: function (colour) {
            assert.equals(colour, 'FFFFFF');
            done();
          }
        };
      }
    };
    this.mockNinjaBlocks.expects('app').once().withExactArgs({ user_access_token: 'sometoken' }).returns(mockApp);
    this.ninja.notify('SOMEUNKNOWNSTATUS');
  }
});
