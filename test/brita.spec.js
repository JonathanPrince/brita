'use strict';
var expect = require('expect.js')
  , brita  = require('../index')
  , catchErr = require('catch-error');

describe('brita module', function(){
  describe('passing an object and filter function to the module', function(){
    // setup a test object
    it('should return an object', function(){

      //arrange
      var testObj = {
        one:   '',
        two:   '',
        three: '',
        four:  ''
      };
      var filterFunc = function(){};

      //act
      var result = brita(testObj, filterFunc);

      //assert
      expect(result).to.be.an('object');
    });

    describe('passing an invalid object argument', function () {
      it('should throw an exception', function () {
        //arrange
        var randomStr = 'random';
        var filterFunc = function(){};
        //act
        var result = catchErr(brita, randomStr, filterFunc);
        //assert
        expect(result).to.be.an(Error);
      });
    });

    describe('passing an invalid filter function argument', function () {
      it('should throw an exception', function () {
        //arrange
        var testObj = {};
        var filterFunc = 'function(){}';
        //act
        var result = catchErr(brita, testObj, filterFunc);
        //assert
        expect(result).to.be.an(Error);
      });
    });

    describe('when passing a filter function that always returns true', function(){
      it('should return an obj equal to the original object', function(){
        //arrange
        var testObj = {
          one:   '1',
          two:   '2',
          three: '3',
          four:  '4'
        };
        var truthyFilter = function(){
          return true;
        };
        // act
        var result = brita(testObj, truthyFilter);
        // assert
        expect(result).to.eql(testObj);
      });
    });

    describe('when passing a filter function that always returns false', function(){
      it('should return an empty object', function(){
        //arrange
        var testObj = {
          one:   '1',
          two:   '2',
          three: '3',
          four:  '4'
        };
        var falsyFilter = function(){
          return false;
        };
        // act
        var result = brita(testObj, falsyFilter);
        // assert
        expect(result).to.eql({});
      });
    });

    describe('when passing a filter function that return true for values less than 3', function(){
      it('should return filtered object with key value pairs where the value is less than 3', function(){
        //arrange
        var testObj = {
          one:   '1',
          two:   '2',
          three: '3',
          four:  '4'
        };
        var filteredObj = {
          one:   '1',
          two:   '2'
        };
        var filter = function(value){
          if (value < 3) {
            return true;
          }
          return false;
        };
        // act
        var result = brita(testObj, filter);
        // assert
        expect(result).to.eql(filteredObj);
      });
    });

    describe('when passing a filter function that return true for a given string', function(){
      it('should return filtered object with key value pairs where the value equal given string', function(){
        //arrange
        var testObj = {
          one:   'one',
          two:   'two',
          three: 'three',
          four:  'four'
        };
        var filteredObj = {
          three:   'three'
        };
        var filter = function(value){
          if (value === 'three') {
            return true;
          }
          return false;
        };
        // act
        var result = brita(testObj, filter);
        // assert
        expect(result).to.eql(filteredObj);
      });
    });

    describe('when passing a filter function that return true for a given string', function(){
      it('should return an empty object if the object has no string values', function(){
        //arrange
        var testObj = {
          one:   1,
          two:   2,
          three: 3,
          four:  4
        };
        var filter = function(value){
          if (value === 'three') {
            return true;
          }
          return false;
        };
        // act
        var result = brita(testObj, filter);
        // assert
        expect(result).to.eql({});
      });
    });

  });
});
