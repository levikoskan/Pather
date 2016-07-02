
var fs = require( 'fs' );

module.exports = {
  read : function( path, callback ){
    // read file data synchronizely
    var data = fs.readFileSync( path );

    // execute the callback if there is one
    callback && callback( data.toString());
  },

};
