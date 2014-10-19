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

###Options for filtering object

| Key     | Values | Description      |
|---------|--------|------------------|
| format  | array  | returns an array | 
|         |        |                  |