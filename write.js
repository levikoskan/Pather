
var fs = require( 'fs' );

module.exports = {
  write : function( filename, data ){
    // write to file synchronizely
    fs.writeFileSync( filename, data );
  }
};
