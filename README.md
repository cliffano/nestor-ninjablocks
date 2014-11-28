<img align="right" src="https://raw.github.com/cliffano/nestor-ninjablocks/master/avatar.jpg" alt="Avatar"/>

[![Build Status](https://secure.travis-ci.org/cliffano/nestor-ninjablocks.png?branch=master)](http://travis-ci.org/cliffano/nestor-ninjablocks)
[![Dependencies Status](https://david-dm.org/cliffano/nestor-ninjablocks.png)](http://david-dm.org/cliffano/nestor-ninjablocks)
[![Coverage Status](https://coveralls.io/repos/cliffano/nestor-ninjablocks/badge.png?branch=master)](https://coveralls.io/r/cliffano/nestor-ninjablocks?branch=master)
[![Published Version](https://badge.fury.io/js/nestor-ninjablocks.png)](http://badge.fury.io/js/nestor-ninjablocks)
<br/>
[![npm Badge](https://nodei.co/npm/nestor-ninjablocks.png)](http://npmjs.org/package/nestor-ninjablocks)

Nestor Ninja Blocks
-------------------

Nestor Ninja Blocks is CLI for Jenkins Ninja Blocks notifier.

This is handy for monitoring Jenkins build status on a [Ninja Blocks](http://ninjablocks.com) device.

Installation
------------

    npm install -g nestor-ninjablocks

Usage
-----

Monitor build status and notify Ninja Blocks device:

    nestor-ninjablocks run

Monitor build status of a job:

    nestor-ninjablocks run --job <job>

Monitor build status of a view:

    nestor-ninjablocks run --view <view>

To customise status-hexcolour map:

    nestor-ninjablocks run --scheme red,blue,yellow --map FAIL=FF0000,OK=00FF00,WARN=FFFF00

If your team keeps ignoring failure notifications, you can blink the build light on failure (WARNING: this will annoy your team, and someone will either go berserk or fix the build a.s.a.p):

    nestor-ninjablocks run --blink-on-failure

Configuration
-------------

Set Ninja Blocks API token in NINJABLOCKS_TOKEN environment variable:

(*nix)

    export NINJABLOCKS_TOKEN=<token_from_https://a.ninja.is/hacking>

(Windows)

    set NINJABLOCKS_TOKEN=<token_from_https://a.ninja.is/hacking>

Set Jenkins URL in JENKINS_URL environment variable (defaults to http://localhost:8080):

(*nix)

    export JENKINS_URL=http://user:pass@host:port/path

(Windows)

    set JENKINS_URL=http://user:pass@host:port/path

As an alternative to password, you can use Jenkins API token instead. Jenkins API token can be found on Jenkins user configuration page.

Colophon
--------

[Developer's Guide](http://cliffano.github.io/developers_guide.html#nodejs)

Articles:

* [Jenkins Build Status On Ninja Blocks RGB LED](http://blog.cliffano.com/2013/04/08/jenkins-build-status-on-ninja-blocks-rgb-led/)
