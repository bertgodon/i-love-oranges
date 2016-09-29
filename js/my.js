(function($) { 
   var $myCanvas = $('#myCanvas');
   var $offset = $myCanvas.offset();
   var $lineWidthVal = 10;
   var $lineColor = "red";

 var isMouseDown = false;
  var pos = {
    x: 0,
    y: 0
  };
  var lastPos = {
    x: 0,
    y: 0
  };
  $myCanvas.on('mousedown', function(e) {
    isMouseDown = true;
  });

  //On mouseup the painting functionality stops
  $myCanvas.on('mouseup', function() {
    isMouseDown = false;
    return;
  });

  //On mousemove store the mouse coordinates and 
  //use jCanvas drawLine() method
  $myCanvas.on('mousemove', function(e) {

    lastPos.x = pos.x;
    lastPos.y = pos.y;
    pos.x = e.pageX - $offset.left;
    pos.y = e.pageY - $offset.top;

    if (isMouseDown) {
      paintLine(lastPos.x, lastPos.y, pos.x, pos.y, $lineWidthVal, $lineColor);
    }
  });

  function paintLine(x1, y1, x2, y2, paintWidth, paintColor) {
    $myCanvas.drawLine({
      strokeStyle: paintColor,
      strokeWidth: paintWidth,
      rounded: true,
      strokeJoin: 'round',
      strokeCap: 'round',
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2
    });
  }

  })(jQuery);