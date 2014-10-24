'use strict';

var assert = require('assert');

module.exports = function(obj, filter){

  // check argument type
  assert.equal(typeof obj, 'object', 'first argument passed to brita should be an object');
  assert.ok(typeof filter === 'object' ||
            typeof filter === 'function', 'second argument passed to brita should be a function or an object');

  var objectFilter = function(value){

    // check filter string
    if (typeof filter.filter !== 'string') {
      return true;
    }
    var typeFilter = filter.filter;
    if (typeof value === typeFilter) {
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

    var filterFunction = (typeof filter.filter !== 'function')? objectFilter : filter.filter;

    var filteredObject = filterObject(obj, filterFunction);

    // check if format option is set to array else return filtered object
    if (filter.format === 'array') {

      var arr = [];

      Object.keys(filteredObject).forEach(function(key){

        // add values to array
        arr.push(filteredObject[key]);

      });

      return arr;

    } else {

      return filteredObject;

    }

  }

};
