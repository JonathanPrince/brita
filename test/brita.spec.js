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

    describe('passing a string as filter argument', function () {
      it('should throw an exception', function () {
        //arrange
        var testObj = {};
        var str = 'string';
        //act
        var result = catchErr(brita, testObj, str);
        //assert
        expect(result).to.be.an(Error);
      });
    });

    describe('passing a number as filter argument', function () {
      it('should throw an exception', function () {
        //arrange
        var testObj = {};
        var num = 5;
        //act
        var result = catchErr(brita, testObj, num);
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

  describe('when passing an object as the filter argument', function(){

    describe('a filter object with key value pair format: array', function(){
      it('should return an array', function(){
        //arrange
        var testObj = {
          one:   1,
          two:   2,
          three: 3,
          four:  4
        };
        var filter = {
          format: 'array'
        };
        // act
        var result = brita(testObj, filter);
        // assert
        expect(result).to.be.an('array');
      });
    });

    describe('a filter object with key value pair format: array', function(){
      it('should return an array with values from the testObj', function(){
        //arrange
        var testObj = {
          one:   1,
          two:   2,
          three: 3,
          four:  4
        };
        var filter = {
          format: 'array'
        };
        var expected = [1, 2, 3, 4];
        // act
        var result = brita(testObj, filter);
        // assert
        expect(result.length).to.equal(expected.length);
      });
    });

    describe('a filter object { format: array, filter: func() }', function(){
      it('should return a filtered array', function(){
        //arrange
        var testObj = {
          one:   1,
          two:   2,
          three: 3,
          four:  4
        };
        var filter = {
          format: 'array',
          filter: function(value){
            return (value === 3);
          }
        };
        var expected = [3];
        // act
        var result = brita(testObj, filter);
        // assert
        expect(result).to.eql(expected);
      });
    });

    describe('a filter object with key value pair filter: string', function(){
      it('should return an object containing only string values', function(){
        //arrange
        var testObj = {
          one:   1,
          two:   '2',
          three: 3,
          four:  '4'
        };
        var filter = {
          filter: 'string'
        };
        var expected = {
          two:  '2',
          four: '4'
        };
        // act
        var result = brita(testObj, filter);
        // assert
        expect(result).to.eql(expected);
      });
    });
  
  });

});
