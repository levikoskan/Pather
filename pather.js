var reader = require( './read' ),
    writer = require( './write' );

reader.read( process.argv[2], function( data ){
  var input = data.split('\n');
  var changed = pather(input).join('\n');

  writer.write( process.argv[3], changed );
});


function pather (maze){
  var hashTotalCount = pathMarkers(maze);
  var hashLocation;
  var completedMaze = [];

  maze.map(function(level){
    var nextHashLocation,
      hashesOnALine = 0,
      l = level.length,
      string = level,
      firstHash,
      endHash,
      centerLine;

    // horizontal
    for(var i = 0; i < l; i++){
      if(!hashLocation && level[i] === '#'){
        hashLocation = i;
        firstHash = i;
        hashesOnALine ++;
      }else if(level[i] === '#'){
        nextHashLocation = i;
        hashesOnALine ++
        if(hashesOnALine === 1){
          firstHash = i;
        }
      }
    }

    if(hashesOnALine > 1){
      if(nextHashLocation > hashLocation){
        endHash = nextHashLocation;
      }else{
        endHash = hashLocation;
      }
      while(endHash >= firstHash){
        if(level[endHash] === '#'){
          endHash --;
          hashTotalCount --;
        }else{
          string = replaceAt(string, endHash, '*')
          endHash --;

        }
      }
    }else{
      endHash = hashLocation;

      if (endHash >= firstHash){
        while(endHash >= firstHash){
          if(level[endHash] === '#'){
            endHash --;
            hashTotalCount --;
          }else{
            string = replaceAt(string, endHash, '*')
            endHash --;
          }
        }
      }else if (endHash < firstHash){
          while(endHash <= firstHash){
          if(level[endHash] === '#'){
            endHash ++;
            hashTotalCount --;
          }else{
            string = replaceAt(string, endHash, '*')
            endHash ++;
          }
        }
      }
    }
    // end horizontal

    // vertical
    if(hashesOnALine === 0){
      for(var j = 0; j < l; j++){
        if(j === hashLocation && hashTotalCount > 0 && level[j] !== '#'){
          string = replaceAt(string, hashLocation, '*')
        }
      }
    }
     // end vertical
     centerLine = (firstHash + nextHashLocation)/2;
    if(hashLocation > centerLine && hashLocation !== undefined){
      hashLocation = firstHash;

    }else{
      if(hashesOnALine > 0){
        hashLocation = nextHashLocation || hashLocation;
        console.log()
      }

    }
    return completedMaze.push(string)
  });

  return completedMaze;
}

function pathMarkers(course){
  var markerCount = 0;
  course.map(function(string){
    for(var i = 0, l = string.length; i < l; i++){
      if(string[i] === '#'){
        markerCount ++
      }
    }
  })
  return markerCount;
}

function replaceAt(string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 1);
}
