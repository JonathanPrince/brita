#brita

[![Build Status](https://travis-ci.org/JonathanPrince/brita.svg?branch=master)](https://travis-ci.org/JonathanPrince/brita)

[![NPM](https://nodei.co/npm/brita.png?downloads=true)](https://nodei.co/npm/brita/)

##Description
Object Filter Module for nodejs

###Syntax
`brita(object, filter)`

####Parameters
**object**

  Object to be filtered

**filter**

  Function or Object.

  A function to be used to filter the object, should return true or false.

  An object containing filter options.

##Usage
Install the brita module using npm
```
$ npm install brita
```
 Basic Example
```js
// require brita module
var brita = require('brita');

// object to be filtered
var myObject = {
    key1: 1,
    key2: 2,
    key3: 3,
    key4: 4
};

// filter function
var myFilter = function(value){

    // return true for values less than 3
    if (value < 3) {
        return true;
    } else {
        return false;
    }
};

// apply filter to create new object filtered by brita
var filteredObject = brita(myObject, myFilter);

// output from brita has been assigned to filteredObject
console.log(filteredObject)             //   returns { key1: 1, key2: 2 }

```

###Using built in filter options

Built-in filter options can be used by passing an object as the second parameter.

| Key     | value      | Description      |
|---------|------------|------------------|
| valueType   | 'string'   |returns all key value pairs with values that are strings |
| valueType   | 'number'   |returns all key value pairs with values that are numbers |
| valueType   | 'boolean'  |returns all key value pairs with values that are booleans |
| valueType   | 'array'    |returns all key value pairs with values that are arrays   |
| valueType   | 'regex'    |returns all key value pairs with values that are regular expressions |
| keyFilter   | RegExp     |returns all key value pairs with keys that match regular expression |


Example using built-in type filter
```js
// require brita module
var brita = require('brita');

// object to be filtered
var myObject = {
    key1: 1,
    key2: '2',
    key3: 3,
    key4: '4'
};

// apply filter to create new object filtered by brita
var filteredObject = brita(myObject, {valueType: 'string'});

// output from brita has been assigned to filteredObject
console.log(filteredObject);             //   returns { key2: '2', key4: '4' }

```

Example using regular expression to filter by key
```js
// require brita module
var brita = require('brita');

// object to be filtered
var myObject = {
  abc1: 'a',
  abc2: 'b',
  def1: 'c',
  def2: 'd'
};

//apply filter to create new object filter by brita
var filteredObject = brita(myObject, {keyFilter: /abc/});

// output from brita has been assigned to filteredObject
console.log(filteredObject);             //   returns { abc1: 'a', abc2: 'b' }

```
