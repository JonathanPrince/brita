'use strict';

var assert = require('assert');

module.exports = function(obj, filter){

  // check argument type
  assert.equal(typeof obj, 'object', 'first argument passed to brita should be an object');
  assert.ok(typeof filter === 'object' ||
            typeof filter === 'function', 'second argument passed to brita should be a function or an object');

  var objectFilter = function(value){

    if (typeof value === filter.valueType) {

      return true;

    } else {

      return false;

    }
  };

  var filterObject = function(objectToFilter, filterFunction){

    var result = {};

    Object.keys(objectToFilter).forEach(function(key){

      var value = objectToFilter[key];

      // check if filter function returns true for value
      if (filterFunction.call(null, value) === true){

        // add key value pair to filtered obj
        result[key] = value;
      }

    });

    return result;

  };

  // if filter argument is a function apply with filterObject() and return
  if (typeof filter === 'function'){

    return filterObject(obj, filter);

  } else if (typeof filter === 'object') {

    return filterObject(obj, objectFilter);

  }

};
