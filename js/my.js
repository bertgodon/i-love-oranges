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
  var $isRightMouseActive = false;
  var $mousedown = false;
  drawSquareBackground();
  var $coords = [];

  $colorPicker.dialog({
      autoOpen: false,
      resizable: false,
      show: {
        effect: "fade",
        duration: 1000
      },
      hide: {
        effect: "fade",
        duration: 1000
      },
      dialogClass: 'ui-dialog-osx',
      buttons: [
        {
          text : "Red",
          class : "red" ,
          click: function() {
              $color = "red";
              $( this ).dialog( "close" );
              $isRightMouseActive = false;
            }
        },
        {
          text : "Blue",
          class : "blue" ,
          click: function() {
              $color = "blue";
              $( this ).dialog( "close" );
              $isRightMouseActive = false;
            }
        },
        {
          text : "Green",
          class : "green" ,
          click: function() {
              $color = "green";
              $( this ).dialog( "close" );
              $isRightMouseActive = false;
            }
        },
        {
          text : "Yellow",
          class : "yellow" ,
          click: function() {
              $color = "yellow";
              $( this ).dialog( "close" );
              $isRightMouseActive = false;
            }
        },
        {
          text : "Orange",
          class : "orange" ,
          click: function() {
              $color = "orange";
              $( this ).dialog( "close" );
              $isRightMouseActive = false;
            }
        }
      ]
    } );

  function storeCoords (xVal, yVal) {
    if(!isSquarePainted(xVal, yVal)){
          $coords.push({x: xVal, y: yVal});
    }
  }

  function isSquarePainted(xVal, yVal){
    for (var i = 0; i < $coords.length; i++) {
      if( $coords[i].x == xVal && $coords[i].y == yVal ){
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
  $(document).mouseup(function(event) {
        $mousedown = false;
  });
  $(document).mousedown(function(event) {
    $mousedown = true;
    switch (event.which) {
        case 1:
            if (!$isRightMouseActive) {
              handleLeftMouseClick(event);
            };
            break;
        case 2:
            alert('Middle Mouse button pressed.');
            break;
        case 3:        
            $isRightMouseActive = true;
            handleRightMouseClick(event);
            break;
        default:
            alert('You have a strange Mouse!');
    }
});


  function handleRightMouseClick(e){
    $colorPicker.dialog( "option", "position", {at: "left top",my: "left top", of: event } );
    $colorPicker.dialog('open');
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
    findSquare(e.pageX, e.pageY, false);
  };

  function findSquare(x, y, drawing){
    var tickedSquareX = Math.floor(x/$squareSide);
    var tickedSquareY = Math.floor(y/$squareSide);
    if(isSquarePainted(tickedSquareX, tickedSquareY) && ! drawing){
        ctx.clearRect(tickedSquareX*$squareSide,tickedSquareY*$squareSide,$squareSide,$squareSide);
        ctx.strokeRect(tickedSquareX*$squareSide,tickedSquareY*$squareSide,$squareSide,$squareSide);
    } else {
      colorTickedSquare(tickedSquareX, tickedSquareY);
    }
 
  };


    $(document).mousemove(function (e) {
 
      
       if(!$isRightMouseActive && $mousedown ){
          findSquare(e.pageX, e.pageY, true);
    }

    });

  function colorTickedSquare(x, y){
    ctx.fillStyle= $color;
    ctx.fillRect(x*$squareSide,y*$squareSide,$squareSide,$squareSide);
    ctx.strokeRect(x*$squareSide,y*$squareSide,$squareSide,$squareSide);
    storeCoords(x, y);
  };
 

  $(document).contextmenu(function() {
    return false;
  });

  })(jQuery);