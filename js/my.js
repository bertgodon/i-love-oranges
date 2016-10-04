(function($) { 
  var $orange = $("#orange");
  var $squareSide = 40;
  var $color = "red";
  var canvas=document.getElementById("myCanvas");
  var ctx=canvas.getContext("2d");
  var $windowWith = window.innerWidth;
  var $windowHight = window.innerHeight;
  var $colorPicker = $("#color-dialog");
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  drawSquareBackground();
  var $coords = [];

  $colorPicker.dialog({
      modal: true,
      autoOpen: false,
      draggable: false,
      resizable: false,
      show: "fade",
      hide: 'fade',
      width: 400,
      dialogClass: 'ui-dialog-osx',
      buttons: [
        {
          text : "Red",
          class : "red" ,
          click: function() {
              $color = "red";
              $( this ).dialog( "close" );
            }
        },
        {
          text : "Blue",
          class : "blue" ,
          click: function() {
              $color = "blue";
              $( this ).dialog( "close" );
            }
        },
        {
          text : "Green",
          class : "green" ,
          click: function() {
              $color = "green";
              $( this ).dialog( "close" );
            }
        },
        {
          text : "Yellow",
          class : "yellow" ,
          click: function() {
              $color = "yellow";
              $( this ).dialog( "close" );
            }
        },
        {
          text : "Orange",
          class : "orange" ,
          click: function() {
              $color = "orange";
              $( this ).dialog( "close" );
            }
        }
      ]
    } );

  function storeCoords (xVal, yVal) {
    $coords.push({x: xVal, y: yVal});
  }

  function isSquarePainted(xVal, yVal){
    for (var i = 0; i < $coords.length; i++) {
      if( $coords[i].x == xVal && $coords[i].y == yVal ){
        console.log("square already painted");
            $coords.splice(i, 1);
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
            event.preventDefault();
            event.stopPropagation();
            handleRightMouseClick(event);
            break;
        default:
            alert('You have a strange Mouse!');
    }
});

  function handleRightMouseClick(event){
    var offest = event.clientX;
    var height = event.clientY;
    $colorPicker.dialog('open').dialog('option', 'position',[offest,height]);
  };

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
    ctx.fillRect(x*$squareSide,y*$squareSide,$squareSide,$squareSide);
    ctx.strokeRect(x*$squareSide,y*$squareSide,$squareSide,$squareSide);
    storeCoords(x, y);
  };
 

$(document).contextmenu(function () {
    return false;
});

  })(jQuery);