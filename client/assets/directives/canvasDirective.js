app.directive('canvasDirective', CanvasDirective)

function CanvasDirective() {
    return {
        restrict: "A",
        link: function (scope, element) {
            // get canvas context
            var ctx = element[0].getContext('2d');
            // capture drawing modus
            var isDrawing = false;
            // last mouse coordinates
            var lastMouse = {
                x: 0,
                y: 0
            }
            var background = new Image();

            scope.$watch("imageLink", function (val) {
                background.src = val;
                background.onload = function () {
                    ctx.drawImage(background, 0, 0, 900, 500);
                }
            });

            scope.$watch("penColor", function (val) {
                pen_color = '#' + val;
            });

            // mouse down handler
            element.bind('mousedown', function (event) {
                if (scope.pen || scope.eraser) {

                    // save last mouse position
                    lastMouse.x = event.offsetX;
                    lastMouse.y = event.offsetY;

                    // begins new line
                    ctx.beginPath();
                    // set is drawing
                    isDrawing = true;

                    scope.start(lastMouse.x, lastMouse.y, isDrawing, 'mousedown', background.src, 1, pen_color);
                }


            });

            // mouse move handler
            element.bind('mousemove', function (event) {
                if (isDrawing && scope.pen) {
                    // draw
                    ctx.moveTo(lastMouse.x, lastMouse.y);
                    ctx.lineTo(event.offsetX, event.offsetY);
                    ctx.strokeStyle = pen_color;
                    ctx.stroke();
                    // save last mouse
                    lastMouse.x = event.offsetX;
                    lastMouse.y = event.offsetY;

                    scope.start(lastMouse.x, lastMouse.y, isDrawing, 'mousemove', background.src, 1, pen_color);
                } else if (isDrawing && scope.eraser) {
                    ctx.clearRect(0, 0, 900, 500);
                    ctx.drawImage(background, 0, 0, 900, 500);
                    scope.start(lastMouse.x, lastMouse.y, isDrawing, 'mouseerase', background.src, 1, pen_color);
                }

            });

            // mouse up handler
            element.bind('mouseup', function (event) {
                if (scope.pen || scope.eraser) {
                    isDrawing = false;
                    scope.start(lastMouse.x, lastMouse.y, isDrawing, 'mouseup', background.src, 1, pen_color);
                }
            });

            // capture drawing modus
            scope.$watch("obj", function (val) {

                if (val.event == 'mouseerase') {
                    ctx.clearRect(0, 0, 900, 500);
                    ctx.drawImage(background, 0, 0, 900, 500);
                }

                //                if (val.event == 'mousedown' && val.source == 1) {
                if (val.event == 'mousedown') {
                    lastMouse.x = val.x;
                    lastMouse.y = val.y;

                    ctx.beginPath();
                }

                //                if (val.event == 'mousemove' && val.source == 1) {
                if (val.event == 'mousemove') {
                    if (val.mouse) {
                        ctx.moveTo(lastMouse.x, lastMouse.y);
                        ctx.lineTo(val.x, val.y);
                        ctx.strokeStyle = val.color;
                        ctx.stroke();
                        lastMouse.x = val.x;
                        lastMouse.y = val.y;
                    }
                }

            });

        }
    };
};
