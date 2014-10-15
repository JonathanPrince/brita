'use strict';

var assert = require('assert');

module.exports = function(obj, filter){

  // check argument type
  assert.equal(typeof obj, 'object', 'first argument passed to brita should be an object');
  assert.equal(typeof filter, 'function', 'second argument passed to brita should be a function');

  if (filter() === false) {
    return {};
  }

  return obj;

};
