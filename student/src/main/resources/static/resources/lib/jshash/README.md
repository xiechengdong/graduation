# jshash

This is a fork I've created of [Paul "Paj" Johnston's JavaScript hash functions](http://pajhome.org.uk/crypt/md5/).

## Motivation

I've created this fork because, although Paj's hash functions are [an order of magnitude faster than those of both CryptoJS and jsSHA](http://jsperf.com/crypto-js-x-johnston), they're far less prominent. I would attribute that to a few factors:

- Paj's functions haven't seen visible activity since 2009, wheras development on CryptoJS and jsSHA has been relatively active (each having their last revision sometime in early 2013 at time of writing).
- CryptoJS is on Google Code; jsSHA is on GitHub, and was on SourceForge before that. Conversely, Paj's functions have only ever been hosted via a subpage on his own personal website, with no visible source outside of zipped releases. Paj's functions have been missing from the social coding scene that has arisen in the last 4 years.
- While the functionality of Paj's algorithms may still be better than its competitors, its structure and methodology are still in need of an overhaul. There's no modularization, and configuration is handled through global variables, making them cumbersome to work into many use cases.
- The files are sequestered from the ecosystem of Javascript tools that have arisen in recent years, such as Node.js, Bower, and Grunt. There's no package manifest, no build system for concatenation/minification, and the test suite is an HTML file written by a Python script.

I'm looking to build from each of these.
