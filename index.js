'use strict';
var auth = {};
var checkOptions = function(object, callback){
  if (Object.prototype.toString.call(object) !== '[object Object]') {
   callback({
     status: false,
     message: 'Invalid! Empty API Auth Options',
     code: 'ERR001'
   }, object)
  }
  else if (typeof object.token == 'undefined') {
    callback({
      status: false,
      message: 'Invalid! Token is not Specified',
      code: 'ERR002'
    }, object)
  }
  else if (typeof object.secret == 'undefined') {
    callback({
      status: false,
      message: 'Invalid! Secret is not Specified',
      code: 'ERR003'
    }, object)
  }
  else if (typeof object.identifier == 'undefined') {
    callback({
      status: false,
      message: 'Invalid! Identifier is not Specified',
      code: 'ERR003'
    }, object)
  }
  else {
    callback(null, object);
  }
}

Object.equals = function( x, y ) {

        if (isCyclic(x)) {
            throw new Error("Cyclical object passed, cannot compare for equality")
        }
        if (isCyclic(y)) {
            throw new Error("Cyclical object passed, cannot compare for equality")
        }
        // Keep track of objects we've seen to detect cyclical objects
        var seen = [];
        function equals() {


        }
        // If both x and y are null or undefined and exactly the same
        if ( x === y ) {
            return true;
        }

        // If they are not strictly equal, they both need to be Objects
        if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) {
            return false;
        }

        // They must have the exact same prototype chain, the closest we can do is
        // test the constructor.
        if ( x.constructor !== y.constructor ) {
            return false;
        }

        for ( var p in x ) {
            // Inherited properties were tested using x.constructor === y.constructor
            if ( x.hasOwnProperty( p ) ) {
                // Allows comparing x[ p ] and y[ p ] when set to undefined
                if ( ! y.hasOwnProperty( p ) ) {
                    return false;
                }

                // If they have the same strict value or identity then they are equal
                if ( x[ p ] === y[ p ] ) {
                    continue;
                }

                // Numbers, Strings, Functions, Booleans must be strictly equal
                if ( typeof( x[ p ] ) !== "object" ) {
                    return false;
                }

                // Objects and Arrays must be tested recursively
                if ( ! Object.equals( x[ p ],  y[ p ] ) ) {
                    return false;
                }
            }
        }

        for ( p in y ) {
            // allows x[ p ] to be set to undefined
            if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) {
                return false;
            }
        }
        return true;
    };


function isCyclic (obj) {
  var seenObjects = [];

  function detect (obj) {
    if (typeof obj === 'object') {
      if (seenObjects.indexOf(obj) !== -1) {
        return true;
      }
      seenObjects.push(obj);
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && detect(obj[key])) {
          return true;
        }
      }
    }
    return false;
  }

  return detect(obj);
}

var verify = function(incoming, header){

}
auth.secure = function(options){
  return function(req, res, next) {
    var incoming = {};
    incoming.token = req.headers['x-api-token'];
    incoming.secret = req.headers['x-api-secret'];
    incoming.identifier = req.headers['x-api-identifier'];
    checkOptions(options, function(err, options){
      if (err) {
        if (options.debug === true) {
          res.status(500).json(err);
        }
        else {
          res.status(500).json({
            status: false,
            message: "An Error Occured"
          });
        }
      }
      else {
        if (Object.equals(incoming, options)) {
          next();
        }
        else {
          res.status(500).json({status: false, message: 'Authentication Failed. Invalid Credientials Supplied'});
        }
      }
    });
  }
}

module.exports = auth;
