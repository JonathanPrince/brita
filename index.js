'use strict';

var assert = require('assert');

module.exports = function(obj, filter){

  // check argument type
  assert.equal(typeof obj, 'object', 'first argument passed to brita should be an object');
  assert.equal(typeof filter, 'function', 'second argument passed to brita should be a function');

  var filteredObject = {};

  Object.keys(obj).forEach(function(key){
  	
  	var value = obj[key];
  	
  	// check if filter function returns true for value
  	if (filter.call(null, value) === true){

  		// add key value pair to filtered obj
  		filteredObject[key] = obj[key];
  	}

  });

  return filteredObject;

};
