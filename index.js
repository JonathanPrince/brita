'use strict';

var assert = require('assert');

module.exports = function(obj, filter){

  // check argument type
  assert.equal(typeof obj, 'object', 'first argument passed to brita should be an object');
  assert.ok(typeof filter === 'object' ||
            typeof filter === 'function', 'second argument passed to brita should be a function or an object');

  var objectFilter = function(value){

    switch(filter.valueType) {

      case 'string':
      case 'boolean':
      case 'number':
        return (typeof value === filter.valueType) ? true : false;

      case 'array':
        return (Array.isArray(value)) ? true : false;

      case 'regex':
        return (value instanceof RegExp) ? true : false;

      default:
        return false;

    }

  };

  var filterObjectByValue = function(objectToFilter, filterFunction){

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

  var filterObjectByKey = function(objectToFilter, keyFilter){

    var result = {};

    Object.keys(objectToFilter).forEach(function(key){
      if(keyFilter.test(key)){
        result[key] = objectToFilter[key];
      }
    });

    return result;
  };

  // if filter argument is a function apply with filterObjectByValue() and return
  if (typeof filter === 'function'){

    return filterObjectByValue(obj, filter);

  } else if (typeof filter === 'object') {

    if(filter.hasOwnProperty('keyFilter')){

      var keyFilter = filter.keyFilter;

      assert.ok(keyFilter instanceof RegExp, 'keyFilter should be a regular expresion');

      return filterObjectByKey(obj, keyFilter);

    }

    return filterObjectByValue(obj, objectFilter);

  }

};
