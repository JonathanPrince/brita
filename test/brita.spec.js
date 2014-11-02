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
        var result = catchErr({func: brita, args: [randomStr, filterFunc]});
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
        var result = catchErr({func: brita, args: [testObj, str]});
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
        var result = catchErr({func: brita, args: [testObj, num]});
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

    describe('a filter object with key value pair valueType: string', function(){
      it('should return an object containing only string values', function(){
        //arrange
        var testObj = {
          one:   1,
          two:   '2',
          three: 3,
          four:  '4'
        };
        var filter = {
          valueType: 'string'
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

    describe('a filter object with key value pair valueType: number', function(){
      it('should return an object containing only number values', function(){
        //arrange
        var testObj = {
          one:   1,
          two:   '2',
          three: 3,
          four:  '4'
        };
        var filter = {
          valueType: 'number'
        };
        var expected = {
          one:   1,
          three: 3,
        };
        // act
        var result = brita(testObj, filter);
        // assert
        expect(result).to.eql(expected);
      });
    });

    describe('a filter object with key value pair valueType: boolean', function(){
      it('should return an object containing only boolean values', function(){
        //arrange
        var testObj = {
          one:   1,
          two:   true,
          three: 3,
          four:  false
        };
        var filter = {
          valueType: 'boolean'
        };
        var expected = {
          two: true,
          four: false,
        };
        // act
        var result = brita(testObj, filter);
        // assert
        expect(result).to.eql(expected);
      });
    });

    describe('a filter object with key keyFilter', function(){
      describe('with value: /abc/', function(){
        it('should return all key value pairs where key name contains abc', function(){
          var testObj = {
            abc: 'yes',
            dabc: 'yes',
            adbc: 'no',
            bcda: 'no'
          };
          var filter = {
            keyFilter: /abc/
          };
          var expected = {
            abc: 'yes',
            dabc: 'yes'
          };
          var result = brita(testObj, filter);
          expect(result).to.eql(expected);
        });
      });

      describe('with a value that is not a regular expression', function(){
        it('should throw an exception', function(){
          var testObj = {};
          var filter = {
            keyFilter: 'not a regular expression'
          };
          var result = catchErr({func: brita, args: [testObj, filter]});
          expect(result).to.be.an(Error);
        });
      });

    });
  });

});
