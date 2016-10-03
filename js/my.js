(function($) { 
  var $orange = $("#orange");
  var $squareSide = 40;
  var $color = "red";
  var canvas=document.getElementById("myCanvas");
  var ctx=canvas.getContext("2d");
  var $windowWith = window.innerWidth;
  var $windowHight = window.innerHeight;
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  drawSquareBackground();
  var $coords = [];

  function storeCoords (xVal, yVal) {
    $coords.push({x: xVal, y: yVal});
  }
  function isSquarePainted(xVal, yVal){
    for (var i = 0; i < $coords.length; i++) {
      if( $coords[i].x == xVal && $coords[i].y == yVal ){
        console.log("square already painted");
        return true;
      }
    }
    return false;
  };


  $( window ).resize(function() {
      $windowWith = window.innerWidth;
      $windowHight = window.innerHeight;
  });

  $('body').mousedown(function(event) {
    switch (event.which) {
        case 1:
            handleLeftMouseClick(event);
            break;
        case 2:
            alert('Middle Mouse button pressed.');
            break;
        case 3:
            alert('Right Mouse button pressed.');
            break;
        default:
            alert('You have a strange Mouse!');
    }
});

  function drawSquareBackground(){
    var calculatedSquareSide = $windowWith/100;
    $squareSide = calculatedSquareSide; 
    for( start = 0; start <$windowWith; start+=calculatedSquareSide){
      drawLine(start, 0, start, $windowHight);
    }
    for( start = 0; start <$windowHight; start+=calculatedSquareSide){
      drawLine(0, start, $windowWith,start);
    }
  };

  function drawLine(x1, y1, x2, y2){
      ctx.beginPath();
      ctx.moveTo(x1, y1)  ;
      ctx.lineTo(x2, y2);
      ctx.stroke();
  }

  function handleLeftMouseClick(e){
    findSquare(e.pageX, e.pageY);
  };

  function findSquare(x, y){
    var tickedSquareX = Math.floor(x/$squareSide);
    var tickedSquareY = Math.floor(y/$squareSide);
    if(isSquarePainted(tickedSquareX, tickedSquareY)){
        ctx.clearRect(tickedSquareX*$squareSide,tickedSquareY*$squareSide,$squareSide,$squareSide);
        ctx.strokeRect(tickedSquareX*$squareSide,tickedSquareY*$squareSide,$squareSide,$squareSide);
    } else {
      console.log(tickedSquareX, tickedSquareX);
      colorTickedSquare(tickedSquareX, tickedSquareY);
    }
 
  };



  function colorTickedSquare(x, y){
    ctx.fillStyle= $color;

    console.log("square: " +x*$squareSide +";"+y*$squareSide),
    ctx.fillRect(x*$squareSide,y*$squareSide,$squareSide,$squareSide);
    storeCoords(x, y);
  };
 



  })(jQuery);